import logging

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
    RunContext
)
from livekit.plugins import murf, silero, google, deepgram, assemblyai, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

try:
    from .cart_manager import CartManager
except ImportError:
    from cart_manager import CartManager

logger = logging.getLogger("agent")

load_dotenv(".env")

# Global cart manager instance
cart_manager = CartManager()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""You are a friendly food and grocery ordering assistant for QuickBasket. You help users:
            - Order groceries, snacks, and simple prepared foods
            - Add items and quantities to their cart
            - Add ingredients for simple recipes based on a recipes list
            - Review and update their cart
            - Place orders and save them

            Rules:
            - Greet the user warmly and explain briefly what you can do
            - Ask clarifying questions when size, brand, or quantity are ambiguous
            - Confirm major cart updates verbally
            - If the user asks for ingredients for a dish, use the add_ingredients_for_dish tool
            - Before placing an order, always read back the final cart and total
            - Only talk about items that exist in the catalog
            - When the user says "That's all", "Place my order", "I'm done", or "Checkout", finalize and save the order
            - Keep responses concise and natural, like a real ordering assistant
            - Do not use emojis, asterisks, or complex formatting in your speech
            - Always confirm what you've added to the cart""",
        )

    @function_tool
    async def add_to_cart(self, context: RunContext, item_name: str, quantity: int = 1):
        """Add an item to the shopping cart.

        Args:
            item_name: Name of the item to add (e.g. "bread", "milk", "eggs")
            quantity: Number of items to add (default: 1)
        """
        logger.info(f"🛒 Adding to cart: {quantity}x {item_name}")
        
        # Find item by name
        item = cart_manager.find_item_by_name(item_name)
        if not item:
            return f"Sorry, I couldn't find {item_name} in our catalog. Could you try a different name?"
        
        result = cart_manager.add_to_cart(item["id"], quantity)
        return result

    @function_tool
    async def remove_from_cart(self, context: RunContext, item_name: str):
        """Remove an item from the shopping cart.

        Args:
            item_name: Name of the item to remove
        """
        logger.info(f"🗑️ Removing from cart: {item_name}")
        
        item = cart_manager.find_item_by_name(item_name)
        if not item:
            return f"I couldn't find {item_name} in your cart."
        
        result = cart_manager.remove_from_cart(item["id"])
        return result

    @function_tool
    async def update_cart_quantity(self, context: RunContext, item_name: str, quantity: int):
        """Update the quantity of an item in the cart.

        Args:
            item_name: Name of the item to update
            quantity: New quantity (use 0 to remove)
        """
        logger.info(f"📝 Updating cart: {item_name} to {quantity}")
        
        item = cart_manager.find_item_by_name(item_name)
        if not item:
            return f"I couldn't find {item_name} in your cart."
        
        result = cart_manager.update_quantity(item["id"], quantity)
        return result

    @function_tool
    async def list_cart(self, context: RunContext):
        """Get the current cart contents and total price."""
        logger.info("📋 Listing cart contents")
        
        cart_data = cart_manager.list_cart()
        
        if not cart_data["items"]:
            return "Your cart is empty."
        
        items_text = []
        for item in cart_data["items"]:
            items_text.append(f"{item['quantity']} {item['name']} at rupees {item['unit_price']} each")
        
        summary = f"You have {cart_data['item_count']} items in your cart: " + ", ".join(items_text)
        summary += f". Your total is rupees {cart_data['total']}."
        
        return summary

    @function_tool
    async def add_ingredients_for_dish(self, context: RunContext, dish_name: str, servings: int = 1):
        """Add ingredients for a recipe to the cart.

        Args:
            dish_name: Name of the dish (e.g. "peanut butter sandwich", "pasta", "maggi")
            servings: Number of servings (default: 1)
        """
        logger.info(f"📖 Adding ingredients for: {dish_name} (servings: {servings})")
        
        result = cart_manager.add_ingredients_for_dish(dish_name, servings)
        return result

    @function_tool
    async def place_order(self, context: RunContext, customer_name: str, customer_address: str = "", delivery_instructions: str = ""):
        """Place the order and save it to the system.

        Args:
            customer_name: Customer's name
            customer_address: Delivery address (optional)
            delivery_instructions: Special delivery notes (optional)
        """
        logger.info(f"💾 Placing order for: {customer_name}")
        
        # Get cart summary first
        cart_data = cart_manager.list_cart()
        
        if not cart_data["items"]:
            return "Your cart is empty. Please add some items before placing an order."
        
        # Save order
        order = cart_manager.save_order(customer_name, customer_address, delivery_instructions)
        
        if "error" in order:
            return f"Sorry, there was an error placing your order: {order['error']}"
        
        return f"Your order {order['order_id']} has been placed successfully! Total: rupees {order['order_total']}. Thank you for shopping with QuickBasket!"

    @function_tool
    async def clear_cart(self, context: RunContext):
        """Clear all items from the cart."""
        logger.info("🗑️ Clearing cart")
        result = cart_manager.clear_cart()
        return result


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    # Logging setup
    # Add any other context you want in all log entries here
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Set up a voice AI pipeline using OpenAI, Cartesia, AssemblyAI, and the LiveKit turn detector
    session = AgentSession(
        # Speech-to-text (STT) is your agent's ears, turning the user's speech into text that the LLM can understand
        # See all available models at https://docs.livekit.io/agents/models/stt/
        stt=assemblyai.STT(),
        # A Large Language Model (LLM) is your agent's brain, processing user input and generating a response
        # See all available models at https://docs.livekit.io/agents/models/llm/
        llm=google.LLM(
                model="gemini-2.5-flash",
            ),
        # Text-to-speech (TTS) is your agent's voice, turning the LLM's text into speech that the user can hear
        # See all available models as well as voice selections at https://docs.livekit.io/agents/models/tts/
        tts=murf.TTS(
                voice="en-US-matthew", 
                style="Conversation",
                tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
                text_pacing=True
            ),
        # VAD and turn detection are used to determine when the user is speaking and when the agent should respond
        # See more at https://docs.livekit.io/agents/build/turns
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        # allow the LLM to generate a response while waiting for the end of turn
        # See more at https://docs.livekit.io/agents/build/audio/#preemptive-generation
        preemptive_generation=True,
    )

    # To use a realtime model instead of a voice pipeline, use the following session setup instead.
    # (Note: This is for the OpenAI Realtime API. For other providers, see https://docs.livekit.io/agents/models/realtime/))
    # 1. Install livekit-agents[openai]
    # 2. Set OPENAI_API_KEY in .env.local
    # 3. Add `from livekit.plugins import openai` to the top of this file
    # 4. Use the following session setup instead of the version above
    # session = AgentSession(
    #     llm=openai.realtime.RealtimeModel(voice="marin")
    # )

    # Metrics collection, to measure pipeline performance
    # For more information, see https://docs.livekit.io/agents/build/metrics/
    usage_collector = metrics.UsageCollector()

    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)

    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")

    ctx.add_shutdown_callback(log_usage)

    # # Add a virtual avatar to the session, if desired
    # # For other providers, see https://docs.livekit.io/agents/models/avatar/
    # avatar = hedra.AvatarSession(
    #   avatar_id="...",  # See https://docs.livekit.io/agents/models/avatar/plugins/hedra
    # )
    # # Start the avatar and wait for it to join
    # await avatar.start(session, room=ctx.room)

    # Start the session, which initializes the voice pipeline and warms up the models
    await session.start(
        agent=Assistant(),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            # For telephony applications, use `BVCTelephony` for best results
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    # Join the room and connect to the user
    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
