"""
Health & Wellness Voice Companion Agent.
Conducts daily check-ins, tracks mood and intentions, and provides supportive guidance.
"""

import logging
import os
from datetime import datetime
from typing import Optional, List

import httpx
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
from livekit.plugins import murf, silero, google, deepgram, noise_cancellation
from livekit.plugins.turn_detector.multilingual import MultilingualModel

from wellness_storage import WellnessStorage

logger = logging.getLogger("wellness-agent")
load_dotenv(".env")

# Notion configuration
NOTION_API_KEY = os.getenv("NOTION_API_KEY")
NOTION_DATABASE_ID = os.getenv("NOTION_DATABASE_ID")
NOTION_TODO_PAGE_ID = os.getenv("NOTION_TODO_PAGE_ID")

# Initialize wellness storage
wellness_storage = WellnessStorage()


class WellnessCompanion(Agent):
    """A supportive wellness companion that conducts daily check-ins."""
    
    def __init__(self, agent_session: AgentSession) -> None:
        # Get context from previous sessions
        last_session = wellness_storage.get_last_session()
        recent_sessions = wellness_storage.get_recent_sessions(limit=3)
        session_count = wellness_storage.get_session_count()
        streak = wellness_storage.get_streak()
        
        # Build context for the agent
        context = self._build_context(last_session, recent_sessions, session_count, streak)
        
        super().__init__(
            instructions=f"""You are a warm, supportive wellness companion. Your role is to conduct brief daily check-ins to help users reflect on their wellbeing and set intentions.

**Your Approach:**
- Be genuinely caring but realistic and grounded
- Listen actively and reflect back what you hear
- Ask open-ended questions, one at a time
- Keep responses concise and natural (2-3 sentences max)
- Never diagnose, prescribe, or give medical advice
- Offer simple, practical suggestions when appropriate

**Conversation Flow:**
1. Greet warmly and reference past sessions if available
2. Ask about mood and how they're feeling today
3. Ask about energy levels
4. Gently explore any stress or challenges (optional)
5. Ask about 1-3 intentions or goals for today
6. **IMPORTANT: After user states intentions, ask: "Would you like me to add these to your Notion database so you can track them?"**
7. If user says yes, call add_to_notion() with the intentions, mood, and energy level
8. Offer brief, practical reflection or encouragement
9. Recap what you heard and confirm accuracy
10. Call save_wellness_checkin() to save the session

**Notion Integration:**
- When user confirms they want to add to Notion, call add_to_notion(intentions, mood, energy_level)
- The function will create tasks in both the Wellness Database AND To Do List page
- Confirm when complete: "Done! I've added [X] tasks to your Notion database."

**Viewing Tasks:**
- When user asks about their tasks (e.g., "What are my tasks?", "What do I need to do?"), call get_notion_tasks()
- You can filter by status: get_notion_tasks(status="Todo") for pending tasks
- Available statuses: "Todo", "In Progress", "Done"

**Task Completion:**
- When user says they completed a task (e.g., "I finished going to the gym"), ask: "Would you like me to mark that as complete in Notion?"
- If yes, call complete_notion_task(task_name) with the task name
- The function will update the Status to "Done" in the database AND check off the item in the To Do List page

**Important Boundaries:**
- This is a supportive check-in, not therapy or medical consultation
- If user mentions serious mental health concerns, acknowledge with care and suggest professional support
- Keep advice simple: breaks, walks, small steps, self-compassion
- Don't make assumptions or push too hard

**Tone:**
- Warm but not overly enthusiastic
- Patient and non-judgmental
- Conversational, like a supportive friend
- Authentic, not robotic

{context}

Remember: You're here to listen, reflect, and support - not to fix or diagnose.""",
        )
        
        self._agent_session = agent_session
        self._session_id = f"session_{datetime.now().strftime('%Y%m%d_%H%M%S')}"
        self._check_in_complete = False
    
    def _parse_energy(self, energy_str: str) -> int:
        """Parse energy level from string to number."""
        # Try direct conversion
        if energy_str.isdigit():
            return int(energy_str)
        
        # Handle word numbers
        word_to_num = {
            "one": 1, "two": 2, "three": 3, "four": 4, "five": 5,
            "six": 6, "seven": 7, "eight": 8, "nine": 9, "ten": 10
        }
        
        energy_lower = energy_str.lower().strip()
        if energy_lower in word_to_num:
            return word_to_num[energy_lower]
        
        # Try to extract number from string
        import re
        numbers = re.findall(r'\d+', energy_str)
        if numbers:
            return int(numbers[0])
        
        # Default fallback
        return 5
    
    def _build_context(
        self,
        last_session: Optional[dict],
        recent_sessions: List[dict],
        session_count: int,
        streak: int
    ) -> str:
        """Build context string from previous sessions."""
        context_parts = []
        
        if session_count == 0:
            context_parts.append("**Context:** This is the user's first check-in. Welcome them warmly!")
        else:
            context_parts.append(f"**Context:** This user has completed {session_count} check-in(s).")
            
            if streak > 1:
                context_parts.append(f"They're on a {streak}-day streak! Acknowledge this positively.")
            
            if last_session:
                last_date = datetime.fromisoformat(last_session["timestamp"]).strftime("%B %d")
                context_parts.append(f"\n**Last Check-in ({last_date}):**")
                context_parts.append(f"- Mood: {last_session.get('mood', 'not recorded')}")
                context_parts.append(f"- Energy: {last_session.get('energy_level', 'not recorded')}")
                
                if last_session.get('intentions'):
                    intentions_str = ", ".join(last_session['intentions'][:2])
                    context_parts.append(f"- Intentions: {intentions_str}")
                
                context_parts.append("\nReference this naturally in your greeting (e.g., 'Last time you mentioned feeling tired...')")
        
        return "\n".join(context_parts) if context_parts else ""
    
    @function_tool
    async def save_wellness_checkin(
        self,
        context: RunContext,
        mood: str,
        energy_level: str,
        intentions: List[str],
        stress_factors: Optional[List[str]] = None,
        agent_summary: Optional[str] = None
    ):
        """
        Save the wellness check-in session after confirming details with the user.
        
        Call this function ONLY after:
        1. You've asked about mood, energy, and intentions
        2. You've provided a brief recap
        3. The user has confirmed the recap is accurate
        
        Args:
            mood: User's reported mood (e.g., "tired but optimistic", "energized", "stressed")
            energy_level: Energy level (e.g., "high", "medium", "low", "very low")
            intentions: List of 1-3 goals or intentions for the day
            stress_factors: Optional list of stress factors mentioned
            agent_summary: Optional brief summary of the session
        """
        
        if self._check_in_complete:
            return "Check-in already saved for this session."
        
        # Get reference to previous session
        last_session = wellness_storage.get_last_session()
        previous_reference = None
        if last_session:
            previous_reference = f"Previous: {last_session.get('mood')} mood, {last_session.get('energy_level')} energy"
        
        # Generate summary if not provided
        if not agent_summary:
            agent_summary = f"User feeling {mood} with {energy_level} energy. Focusing on: {', '.join(intentions[:2])}"
        
        # Save to storage
        success = wellness_storage.save_session(
            session_id=self._session_id,
            mood=mood,
            energy_level=energy_level,
            stress_factors=stress_factors or [],
            intentions=intentions,
            agent_summary=agent_summary,
            previous_reference=previous_reference
        )
        
        if success:
            self._check_in_complete = True
            streak = wellness_storage.get_streak()
            
            logger.info(f"✅ Wellness check-in saved: {self._session_id}")
            logger.info(f"   Mood: {mood} | Energy: {energy_level}")
            logger.info(f"   Intentions: {intentions}")
            logger.info(f"   Current streak: {streak} days")
            
            return f"Check-in saved successfully! Current streak: {streak} days. Great job showing up for yourself today."
        else:
            logger.error("Failed to save wellness check-in")
            return "I had trouble saving that. Let's try again."
    
    @function_tool
    async def add_to_notion(
        self,
        context: RunContext,
        intentions: List[str],
        mood: str,
        energy_level: str
    ):
        """
        Add user's intentions to their Notion database AND to-do list.
        
        Call this ONLY after user confirms they want to add to Notion.
        
        Args:
            intentions: List of intentions/goals to add as tasks
            mood: User's current mood
            energy_level: User's energy level
        """
        if not NOTION_API_KEY or not NOTION_DATABASE_ID:
            logger.error("Notion credentials not configured")
            return "I'm having trouble connecting to Notion. Please check the configuration."
        
        try:
            headers = {
                "Authorization": f"Bearer {NOTION_API_KEY}",
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            }
            
            tasks_created = 0
            async with httpx.AsyncClient() as client:
                for intention in intentions:
                    # 1. Create in Wellness Database (with mood, energy, etc.)
                    database_data = {
                        "parent": {"database_id": NOTION_DATABASE_ID},
                        "properties": {
                            "Name": {
                                "title": [{"text": {"content": intention}}]
                            },
                            "Status": {
                                "select": {"name": "todo"}
                            },
                            "Date": {
                                "date": {"start": datetime.now().isoformat()}
                            },
                            "Mood": {
                                "select": {"name": mood.capitalize()}
                            },
                            "Energy": {
                                "number": self._parse_energy(energy_level)
                            }
                        }
                    }
                    
                    db_response = await client.post(
                        "https://api.notion.com/v1/pages",
                        headers=headers,
                        json=database_data,
                        timeout=10.0
                    )
                    
                    if db_response.status_code == 200:
                        logger.info(f"✅ Created in Wellness Database: {intention}")
                        
                        # 2. Also create a simple to-do item (checkbox) in To Do List page
                        if NOTION_TODO_PAGE_ID:
                            todo_block = {
                                "children": [
                                    {
                                        "object": "block",
                                        "type": "to_do",
                                        "to_do": {
                                            "rich_text": [{"type": "text", "text": {"content": intention}}],
                                            "checked": False,
                                            "color": "default"
                                        }
                                    }
                                ]
                            }
                            
                            todo_response = await client.patch(
                                f"https://api.notion.com/v1/blocks/{NOTION_TODO_PAGE_ID}/children",
                                headers=headers,
                                json=todo_block,
                                timeout=10.0
                            )
                            
                            if todo_response.status_code == 200:
                                logger.info(f"✅ Added to To Do List page: {intention}")
                                tasks_created += 1
                            else:
                                logger.error(f"Failed to add to To Do List: {todo_response.status_code} - {todo_response.text}")
                                logger.info(f"Make sure 'To Do List' page is shared with the integration!")
                        
                        tasks_created += 1
                    else:
                        logger.error(f"Failed to create Notion task: {db_response.text}")
            
            if tasks_created > 0:
                return f"Done! I've added {tasks_created} task{'s' if tasks_created > 1 else ''} to your Notion database and to-do list."
            else:
                return "I had trouble adding tasks to Notion. Please try again."
                
        except Exception as e:
            logger.error(f"Error adding to Notion: {e}")
            return "I encountered an error while adding to Notion. Please try again."
    
    @function_tool
    async def complete_notion_task(
        self,
        context: RunContext,
        task_name: str
    ):
        """
        Mark a task as complete in Notion database.
        
        Use this when user says they completed a task or wants to mark something as done.
        
        Args:
            task_name: Name of the task to mark as complete
        """
        if not NOTION_API_KEY or not NOTION_DATABASE_ID:
            return "I'm having trouble connecting to Notion."
        
        try:
            headers = {
                "Authorization": f"Bearer {NOTION_API_KEY}",
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            }
            
            async with httpx.AsyncClient() as client:
                # Search for the task in database (database_id goes in URL, not body)
                query_data = {
                    "filter": {
                        "property": "Name",
                        "title": {
                            "contains": task_name
                        }
                    }
                }
                
                search_response = await client.post(
                    f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query",
                    headers=headers,
                    json=query_data,
                    timeout=10.0
                )
                
                if search_response.status_code == 200:
                    results = search_response.json().get("results", [])
                    
                    # Filter for non-completed tasks
                    pending_tasks = []
                    for result in results:
                        status_prop = result.get("properties", {}).get("Status", {})
                        status = status_prop.get("select", {}).get("name", "").lower() if status_prop.get("select") else ""
                        if status not in ["done", "completed"]:
                            pending_tasks.append(result)
                    
                    if pending_tasks:
                        # Update the first matching pending task
                        page_id = pending_tasks[0]["id"]
                        
                        update_data = {
                            "properties": {
                                "Status": {
                                    "select": {"name": "Done"}
                                }
                            }
                        }
                        
                        update_response = await client.patch(
                            f"https://api.notion.com/v1/pages/{page_id}",
                            headers=headers,
                            json=update_data,
                            timeout=10.0
                        )
                        
                        if update_response.status_code == 200:
                            logger.info(f"✅ Marked as complete in database: {task_name}")
                            
                            # Also try to check off the to-do item in the To Do List page
                            if NOTION_TODO_PAGE_ID:
                                try:
                                    # Get all blocks from the To Do List page
                                    blocks_response = await client.get(
                                        f"https://api.notion.com/v1/blocks/{NOTION_TODO_PAGE_ID}/children",
                                        headers=headers,
                                        timeout=10.0
                                    )
                                    
                                    if blocks_response.status_code == 200:
                                        blocks = blocks_response.json().get("results", [])
                                        
                                        # Find matching to-do block
                                        for block in blocks:
                                            if block.get("type") == "to_do":
                                                todo_content = block.get("to_do", {}).get("rich_text", [])
                                                if todo_content:
                                                    text = todo_content[0].get("text", {}).get("content", "")
                                                    if task_name.lower() in text.lower():
                                                        # Update the to-do block to checked
                                                        block_id = block["id"]
                                                        check_data = {
                                                            "to_do": {
                                                                "checked": True
                                                            }
                                                        }
                                                        
                                                        check_response = await client.patch(
                                                            f"https://api.notion.com/v1/blocks/{block_id}",
                                                            headers=headers,
                                                            json=check_data,
                                                            timeout=10.0
                                                        )
                                                        
                                                        if check_response.status_code == 200:
                                                            logger.info(f"✅ Checked off in To Do List: {task_name}")
                                                        break
                                except Exception as e:
                                    logger.warning(f"Could not update To Do List page: {e}")
                            
                            return f"Great job! I've marked '{task_name}' as complete in your Notion database."
                        else:
                            logger.error(f"Failed to update task: {update_response.text}")
                            return "I had trouble updating that task."
                    else:
                        return f"I couldn't find a task called '{task_name}' in your todo list. Could you try rephrasing?"
                else:
                    logger.error(f"Failed to search tasks: {search_response.text}")
                    return "I had trouble searching for that task."
                    
        except Exception as e:
            logger.error(f"Error completing task: {e}")
            return "I encountered an error while updating the task."
    
    @function_tool
    async def get_notion_tasks(
        self,
        context: RunContext,
        status: Optional[str] = None
    ):
        """
        Fetch tasks from the Notion database.
        
        Use this when user asks about their tasks, to-do list, or what they need to do.
        
        Args:
            status: Optional filter by status ("Todo", "In Progress", "Done"). If not provided, returns all tasks.
        """
        if not NOTION_API_KEY or not NOTION_DATABASE_ID:
            return "I'm having trouble connecting to Notion. Please check the configuration."
        
        try:
            headers = {
                "Authorization": f"Bearer {NOTION_API_KEY}",
                "Content-Type": "application/json",
                "Notion-Version": "2022-06-28"
            }
            
            async with httpx.AsyncClient() as client:
                # Build query (database_id goes in URL, not body)
                query_data = {
                    "sorts": [
                        {
                            "property": "Date",
                            "direction": "descending"
                        }
                    ]
                }
                
                # Add status filter if provided (case-insensitive)
                if status:
                    # Try to match the status case-insensitively
                    status_lower = status.lower()
                    query_data["filter"] = {
                        "property": "Status",
                        "select": {
                            "equals": status_lower if status_lower in ["todo", "in progress", "done"] else status
                        }
                    }
                
                response = await client.post(
                    f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query",
                    headers=headers,
                    json=query_data,
                    timeout=10.0
                )
                
                if response.status_code == 200:
                    results = response.json().get("results", [])
                    
                    if not results:
                        if status:
                            return f"You don't have any tasks with status '{status}' in your Notion database."
                        else:
                            return "Your Notion database is empty. Would you like to add some tasks?"
                    
                    # Format tasks for response
                    tasks = []
                    for page in results:
                        props = page.get("properties", {})
                        
                        # Get task name
                        name_prop = props.get("Name", {})
                        title = name_prop.get("title", [])
                        task_name = title[0].get("text", {}).get("content", "Untitled") if title else "Untitled"
                        
                        # Get status
                        status_prop = props.get("Status", {})
                        task_status = status_prop.get("select", {}).get("name", "Unknown") if status_prop.get("select") else "Unknown"
                        
                        # Get energy if available
                        energy_prop = props.get("Energy", {})
                        energy = energy_prop.get("number") if energy_prop else None
                        
                        # Get mood if available
                        mood_prop = props.get("Mood", {})
                        mood = mood_prop.get("select", {}).get("name") if mood_prop.get("select") else None
                        
                        task_info = f"• {task_name} [{task_status}]"
                        if energy:
                            task_info += f" (Energy: {energy}/10)"
                        if mood:
                            task_info += f" (Mood: {mood})"
                        
                        tasks.append(task_info)
                    
                    # Build response
                    if status:
                        response_text = f"Here are your {status} tasks:\n\n" + "\n".join(tasks[:10])
                    else:
                        response_text = f"Here are your tasks:\n\n" + "\n".join(tasks[:10])
                    
                    if len(results) > 10:
                        response_text += f"\n\n...and {len(results) - 10} more tasks."
                    
                    return response_text
                else:
                    logger.error(f"Failed to fetch tasks: {response.status_code} - {response.text}")
                    return "I had trouble fetching your tasks from Notion. Please make sure the database is shared with the integration."
                    
        except Exception as e:
            logger.error(f"Error fetching tasks: {e}")
            return "I encountered an error while fetching tasks from Notion."


def prewarm(proc: JobProcess):
    """Prewarm models for faster startup."""
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    """Main entry point for the wellness companion agent."""
    
    # Logging setup
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }
    
    logger.info("🌱 Starting Wellness Companion Agent")
    
    # Log session stats
    session_count = wellness_storage.get_session_count()
    streak = wellness_storage.get_streak()
    logger.info(f"📊 Total sessions: {session_count} | Current streak: {streak} days")
    
    # Set up voice AI pipeline
    session = AgentSession(
        # Speech-to-text
        stt=deepgram.STT(model="nova-3"),
        
        # Large Language Model
        llm=google.LLM(model="gemini-2.5-flash"),
        
        # Text-to-speech with warm, conversational voice
        tts=murf.TTS(
            voice="en-US-matthew",  # Warm, friendly voice
            style="Conversation",
            tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
            text_pacing=True
        ),
        
        # Turn detection
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        
        # Allow preemptive generation for faster responses
        preemptive_generation=True,
    )
    
    # Metrics collection
    usage_collector = metrics.UsageCollector()
    
    @session.on("metrics_collected")
    def _on_metrics_collected(ev: MetricsCollectedEvent):
        metrics.log_metrics(ev.metrics)
        usage_collector.collect(ev.metrics)
    
    async def log_usage():
        summary = usage_collector.get_summary()
        logger.info(f"Usage: {summary}")
    
    ctx.add_shutdown_callback(log_usage)
    
    # Start the session
    await session.start(
        agent=WellnessCompanion(session),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )
    
    # Join the room
    await ctx.connect()
    
    logger.info("✅ Wellness Companion connected and ready")


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
