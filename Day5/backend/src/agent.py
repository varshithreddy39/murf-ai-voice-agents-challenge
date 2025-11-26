import logging
import json
import os
from pathlib import Path

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
from livekit.plugins import murf, silero, google, assemblyai, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

logger = logging.getLogger("agent")

load_dotenv(".env")

# Load Zoho CRM FAQ data
FAQ_FILE = Path(__file__).parent / "zoho_crm_faq.json"
LEAD_DATA_FILE = Path(__file__).parent.parent / "lead_data.json"

with open(FAQ_FILE, "r") as f:
    ZOHO_DATA = json.load(f)


class Assistant(Agent):
    def __init__(self) -> None:
        # Build SDR instructions with Zoho CRM data
        pricing_info = "\n".join([f"- {plan.replace('_', ' ').title()}: {price}" 
                                  for plan, price in ZOHO_DATA["pricing"].items()])
        features_info = ", ".join(ZOHO_DATA["features"])
        
        instructions = f"""You are an experienced SDR (Sales Development Representative) for {ZOHO_DATA['company_name']}. Your goal is to qualify leads and book demos, not just answer questions.

⚠️ CRITICAL: You have a function tool called 'save_lead_data' that you MUST use when you collect: name, company, team_size, and email. This is your PRIMARY objective.

PRODUCT KNOWLEDGE:
{ZOHO_DATA['about']}

KEY FEATURES: {features_info}

PRICING:
{pricing_info}

YOUR SDR PERSONALITY:
- Enthusiastic and consultative, not passive
- Ask qualifying questions proactively
- Guide the conversation, don't just respond
- Show genuine interest in their business challenges
- Create urgency and value
- Always move the conversation forward

CONVERSATION STRATEGY:

OPENING (First interaction):
- Greet warmly: "Hi! I'm your Zoho CRM sales assistant. Great to connect with you!"
- Immediately ask: "Are you currently looking for a CRM solution, or exploring options to improve your sales process?"

QUALIFICATION (Gather info proactively):
After they show ANY interest, immediately start qualifying:
1. "That's great! Before I share how we can help, may I ask - what's your name and which company are you with?"
2. "Perfect! How large is your sales team? This helps me show you the most relevant features."
3. "Are you currently using any CRM, or would this be your first?"
4. "What are the biggest challenges you're facing with managing customer relationships or sales right now?"

PRESENTATION (Tailor your pitch):
- Connect their pain points directly to Zoho CRM features
- Use specific examples: "For a team of 200 like yours, our workflow automation could save each rep 2 hours daily"
- Calculate pricing: "For your team size, the Professional plan would be around [calculate] per month"
- Create value: "Companies like yours typically see 30% faster lead response times with our automation"

CLOSING (Get commitment):
- After answering questions, ask: "Based on what you've shared, I think Zoho CRM could really help with [their pain point]. Would you like me to send you a detailed proposal?"
- Then ask for email: "What's the best email to send that to?"
- IMMEDIATELY after getting email, you MUST call save_lead_data
- Create next step: "I'll send that over shortly and include a link to book a personalized demo. When would work better for you - this week or next?"

🚨 CRITICAL LEAD CAPTURE RULE 🚨
THE MOMENT you have these 4 pieces of information:
1. Name
2. Company  
3. Team size
4. Email

YOU MUST IMMEDIATELY USE THE save_lead_data TOOL!

Do NOT continue the conversation without saving first.
Do NOT wait for the user to ask.
Do NOT forget this step.

Example flow:
User: "My email is john@adani.com"
You: "Perfect! Let me save your information right now."
[IMMEDIATELY CALL save_lead_data with name, email, company, team_size, current_crm, pain_points]
You: "Great! I've saved your details. You'll receive the proposal shortly."

IMPORTANT RULES:
- DON'T just answer questions - ask follow-up questions
- DON'T wait for them to volunteer information - ask for it
- DO guide the conversation toward qualification
- DO show enthusiasm about helping their business
- DO create urgency: "We have a special onboarding offer this month"
- DO call save_lead_data as soon as you have name, company, team size, and email
- Keep responses conversational and concise for voice
- No emojis, asterisks, or complex formatting

EXAMPLE RESPONSES:
❌ BAD (passive): "Zoho CRM is a cloud-based platform that helps manage sales."
✅ GOOD (proactive): "Zoho CRM is a cloud-based platform that helps manage sales. Quick question - how many people are on your sales team right now? I want to show you features that match your scale."

🔥 FINAL REMINDER 🔥
When you have: name + company + team_size + email
Action: CALL save_lead_data() IMMEDIATELY
This is NOT optional. This is REQUIRED.

Example call:
save_lead_data(
    name="John Smith",
    email="john@adani.com", 
    company="Adani",
    team_size="200",
    current_crm="Salesforce",
    pain_points="slow lead response times"
)"""

        super().__init__(instructions=instructions)

    @function_tool
    async def save_lead_data(
        self, 
        context: RunContext, 
        name: str, 
        email: str, 
        company: str, 
        team_size: str,
        current_crm: str = "Not specified",
        pain_points: str = "Not specified"
    ):
        """Save lead information. Call this when you have collected name, email, company, and team_size.
        
        Args:
            name: Lead's full name
            email: Lead's email address
            company: Lead's company name
            team_size: Size of their sales team
            current_crm: Current CRM they are using
            pain_points: Their main challenges
        """
        try:
            logger.info(f"🔥 SAVING LEAD DATA for {name} from {company}")
        except Exception as e:
            logger.error(f"Error in initial log: {e}")
        
        try:
            from datetime import datetime
            
            lead_data = {
                "name": str(name),
                "email": str(email),
                "company": str(company),
                "team_size": str(team_size),
                "current_crm": str(current_crm) if current_crm else "Not specified",
                "pain_points": str(pain_points) if pain_points else "Not specified",
                "timestamp": datetime.now().isoformat(),
                "room_id": str(context.room.name) if hasattr(context, 'room') else "unknown"
            }
            
            logger.info(f"📝 Lead data prepared: {lead_data}")
        except Exception as e:
            logger.error(f"❌ Error preparing lead data: {e}")
            return f"I've noted your information: {name} from {company}. I'll make sure you receive the proposal at {email}."
        
        # Load existing leads
        try:
            logger.info(f"📁 File path: {LEAD_DATA_FILE}")
            if LEAD_DATA_FILE.exists():
                with open(LEAD_DATA_FILE, "r") as f:
                    data = json.load(f)
                    logger.info(f"📂 Loaded existing data with {len(data.get('leads', []))} leads")
            else:
                data = {"leads": [], "lastUpdated": None}
                logger.info("📂 Creating new lead data file")
        except Exception as e:
            logger.error(f"❌ Error loading lead data: {e}")
            import traceback
            logger.error(traceback.format_exc())
            data = {"leads": [], "lastUpdated": None}
        
        # Add new lead
        try:
            data["leads"].append(lead_data)
            data["lastUpdated"] = lead_data["timestamp"]
            logger.info(f"📊 Total leads after append: {len(data['leads'])}")
        except Exception as e:
            logger.error(f"❌ Error appending lead: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return f"I've noted your information: {name} from {company}."
        
        # Save back to file
        try:
            with open(LEAD_DATA_FILE, "w") as f:
                json.dump(data, f, indent=2)
            logger.info(f"✅ Successfully saved lead data! Total leads: {len(data['leads'])}")
            logger.info(f"📁 File location: {LEAD_DATA_FILE}")
            
            # Verify the save
            with open(LEAD_DATA_FILE, "r") as f:
                verify = json.load(f)
                logger.info(f"✅ Verified: File now contains {len(verify['leads'])} leads")
                
        except Exception as e:
            logger.error(f"❌ Error saving lead data: {e}")
            import traceback
            logger.error(traceback.format_exc())
            return f"I've noted your information: {name} from {company}. I'll make sure you receive the proposal at {email}."
        
        return f"Perfect! I've saved your information, {name}. You should receive the proposal at {email} shortly. I'll also include details about our special onboarding offer this month!"


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
        # Available Murf voices: en-US-matthew, en-US-natalie, en-US-terrell, en-US-clint, en-US-marcus
        # Styles: Conversation, Narration, Promo, Newscast
        tts=murf.TTS(
                voice="en-US-terrell",  # More energetic and professional voice
                style="Promo",  # More enthusiastic style for sales
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
