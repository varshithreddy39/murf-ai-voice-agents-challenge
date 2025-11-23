import logging
import json
import os
import re
from datetime import datetime
from typing import Optional
from dataclasses import dataclass

from dotenv import load_dotenv
from livekit.agents import (
    Agent,
    AgentSession,
    JobContext,
    JobProcess,
    MetricsCollectedEvent,
    RoomInputOptions,
    WorkerOptions,
    cli,
    metrics,
    tokenize,
    function_tool,
)
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("barista-agent")
load_dotenv(".env")

ORDERS_DIR = "orders"
os.makedirs(ORDERS_DIR, exist_ok=True)


@dataclass
class OrderState:
    drinkType: Optional[str] = None
    size: Optional[str] = None
    milk: Optional[str] = None
    extras: Optional[list[str]] = None
    name: Optional[str] = None
    
    def is_complete(self) -> bool:
        return all([self.drinkType, self.size, self.milk, self.name])
    
    def to_dict(self):
        return {
            "drinkType": self.drinkType,
            "size": self.size,
            "milk": self.milk,
            "extras": self.extras or [],
            "name": self.name
        }


class BaristaAgent(Agent):
    def __init__(self, agent_session: AgentSession) -> None:
        super().__init__(
            instructions="""You are a friendly barista at Byte & Brew Cafe.

Take coffee orders by asking for:
1. Drink type (latte, cappuccino, americano, mocha, espresso, etc.)
2. Size (small, medium, large)
3. Milk (whole, skim, oat, almond, soy, coconut)
4. Extras (whipped cream, extra shot, caramel drizzle, etc.) - optional
5. Customer name

When you have ALL information, call save_order() to finalize.
The receipt will automatically open for the customer.

Be friendly, concise, and natural.""",
        )
        self.order = OrderState()
        self._agent_session = agent_session
        self._last_transcript = ""
        self._order_confirmed = False
        self._order_id = None
    
    @function_tool
    async def save_order(
        self,
        drink_type: str,
        size: str,
        milk: str,
        name: str,
        extras: Optional[list[str]] = None
    ):
        """Save the complete order when you have all information."""
        self.order.drinkType = drink_type
        self.order.size = size
        self.order.milk = milk
        self.order.name = name
        self.order.extras = extras or []
        
        # Save to JSON
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        order_id = f"order_{timestamp}_{name.replace(' ', '_')}"
        filename = f"{ORDERS_DIR}/{order_id}.json"
        
        order_data = {
            **self.order.to_dict(),
            "timestamp": datetime.now().isoformat(),
            "status": "completed"
        }
        
        with open(filename, 'w') as f:
            json.dump(order_data, f, indent=2)
        
        # Store order ID and automatically show receipt
        self._order_id = order_id
        self._order_confirmed = True
        
        # Automatically send receipt display command
        await self._send_receipt_display()
        
        logger.info(f"✅ Order saved: {filename}")
        logger.info(f"🧾 Receipt URL: /receipt/{order_id}")
        logger.info(f"📤 Receipt display command sent automatically")
        
        return f"Perfect! Your order for a {size} {drink_type} with {milk} is confirmed. Opening your receipt now. Thank you for visiting Byte & Brew Cafe!"
    
    @function_tool
    async def show_receipt(self):
        """Show the receipt to the customer when they request it."""
        logger.info(f"🧾 show_receipt() called!")
        logger.info(f"   - Order confirmed: {self._order_confirmed}")
        logger.info(f"   - Order ID: {self._order_id}")
        
        if not self._order_confirmed or not self._order_id:
            logger.warning("⚠️ No order to show receipt for")
            return "Please complete your order first."
        
        # Send receipt display command to frontend
        await self._send_receipt_display()
        
        logger.info(f"✅ Receipt display command sent for: {self._order_id}")
        return "Great! Opening your receipt now. Thank you for visiting Byte & Brew Cafe!"
    
    async def _send_update(self, complete: bool = False, order_id: Optional[str] = None):
        """Send order update to frontend"""
        try:
            message = {
                "type": "order_update",
                "order": self.order.to_dict(),
                "complete": complete
            }
            
            if order_id:
                message["order_id"] = order_id
            
            await self._agent_session.room.local_participant.publish_data(
                json.dumps(message).encode('utf-8'),
                topic="order-updates"
            )
            
            logger.info(f"📤 Sent to frontend: {message}")
        except Exception as e:
            logger.error(f"Failed to send update: {e}")
    
    async def _send_receipt_display(self):
        """Send command to display receipt"""
        try:
            message = {
                "type": "show_receipt",
                "order_id": self._order_id,
                "order": self.order.to_dict()
            }
            
            await self._agent_session.room.local_participant.publish_data(
                json.dumps(message).encode('utf-8'),
                topic="order-updates"
            )
            
            logger.info(f"🧾 Sent receipt display command: {message}")
        except Exception as e:
            logger.error(f"Failed to send receipt display: {e}")
    
    async def on_agent_speech(self, text: str):
        """Called when agent speaks - parse for order info"""
        await self._parse_and_update(text)
    
    async def on_user_speech(self, text: str):
        """Called when user speaks - parse for order info"""
        await self._parse_and_update(text)
    
    async def _parse_and_update(self, text: str):
        """Parse text and extract order information"""
        text_lower = text.lower()
        updated = False
        
        # Extract drink type
        drinks = ['latte', 'cappuccino', 'americano', 'mocha', 'espresso', 'macchiato', 'flat white', 'cold brew']
        for drink in drinks:
            if drink in text_lower and not self.order.drinkType:
                self.order.drinkType = drink
                updated = True
                logger.info(f"🔍 Found drink: {drink}")
        
        # Extract size
        if not self.order.size:
            if 'small' in text_lower:
                self.order.size = 'small'
                updated = True
            elif 'medium' in text_lower:
                self.order.size = 'medium'
                updated = True
            elif 'large' in text_lower:
                self.order.size = 'large'
                updated = True
        
        # Extract milk
        milks = ['oat', 'almond', 'soy', 'coconut', 'whole', 'skim', '2%', 'nonfat']
        for milk_type in milks:
            if milk_type in text_lower and not self.order.milk:
                self.order.milk = milk_type + (' milk' if milk_type in ['oat', 'almond', 'soy', 'coconut'] else '')
                updated = True
                logger.info(f"🔍 Found milk: {milk_type}")
        
        # Extract extras
        extras_keywords = ['whipped cream', 'extra shot', 'caramel', 'vanilla', 'chocolate']
        for extra in extras_keywords:
            if extra in text_lower:
                if self.order.extras is None:
                    self.order.extras = []
                if extra not in self.order.extras:
                    self.order.extras.append(extra)
                    updated = True
                    logger.info(f"🔍 Found extra: {extra}")
        
        # Extract name (look for "my name is X" or "for X")
        name_patterns = [
            r"my name is (\w+)",
            r"name is (\w+)",
            r"for (\w+)",
            r"i'm (\w+)",
            r"this is (\w+)"
        ]
        for pattern in name_patterns:
            match = re.search(pattern, text_lower)
            if match and not self.order.name:
                self.order.name = match.group(1).capitalize()
                updated = True
                logger.info(f"🔍 Found name: {self.order.name}")
                break
        
        # Check if order is complete and not yet confirmed
        if self.order.is_complete() and not self._order_confirmed:
            logger.info("🎯 Order is complete! Preparing receipt...")
            
            # Save order to JSON
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            order_id = f"order_{timestamp}_{self.order.name.replace(' ', '_')}"
            filename = f"{ORDERS_DIR}/{order_id}.json"
            
            order_data = {
                **self.order.to_dict(),
                "timestamp": datetime.now().isoformat(),
                "status": "completed"
            }
            
            with open(filename, 'w') as f:
                json.dump(order_data, f, indent=2)
            
            # Store order ID and mark as confirmed
            self._order_id = order_id
            self._order_confirmed = True
            
            # Send receipt display command
            await self._send_receipt_display()
            
            logger.info(f"✅ Order saved: {filename}")
            logger.info(f"🧾 Receipt URL: /receipt/{order_id}")
            logger.info(f"📤 Receipt display command sent!")
            
            updated = True
        
        # Send update if anything changed
        if updated:
            await self._send_update(complete=self._order_confirmed)


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    ctx.log_context_fields = {"room": ctx.room.name}
    
    session = AgentSession(
        stt=deepgram.STT(model="nova-3"),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(
            voice="en-US-matthew",
            style="Conversation",
            tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
            text_pacing=True
        ),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        preemptive_generation=True,
    )
    
    agent = BaristaAgent(agent_session=session)
    
    # Hook into transcription events
    @session.on("user_speech_committed")
    def on_user_speech(ev):
        if ev.alternatives and len(ev.alternatives) > 0:
            text = ev.alternatives[0].text
            logger.info(f"👤 User: {text}")
            # Schedule the async call
            import asyncio
            asyncio.create_task(agent.on_user_speech(text))
    
    @session.on("agent_speech_committed")
    def on_agent_speech(ev):
        text = ev.text
        logger.info(f"🤖 Agent: {text}")
        import asyncio
        asyncio.create_task(agent.on_agent_speech(text))
    
    usage_collector = metrics.UsageCollector()
    
    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)
    
    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")
    
    ctx.add_shutdown_callback(log_usage)
    
    await session.start(
        agent=agent,
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )
    
    await ctx.connect()
    logger.info("☕ Byte & Brew Cafe barista ready!")


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
