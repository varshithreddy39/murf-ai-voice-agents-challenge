import logging
from pathlib import Path
from typing import Optional

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

from game_state import GameState
from universes import get_universe

logger = logging.getLogger("game_master")
load_dotenv(".env")

# Save directory
SAVED_GAMES_DIR = Path(__file__).parent.parent / "saved_games"
SAVED_GAMES_DIR.mkdir(exist_ok=True)


class GameMasterAgent(Agent):
    def __init__(self, universe: str = "fantasy") -> None:
        self.game_state = GameState(universe=universe)
        self.universe_config = get_universe(universe)
        
        instructions = f"""You are an epic Game Master running a {self.universe_config['name']} adventure!

🎭 YOUR ROLE:
You are the Game Master (GM) for an interactive voice adventure set in {self.universe_config['setting']}.
Your tone is {self.universe_config['tone']}.

🎯 YOUR MISSION:
- Guide the player through an exciting story with meaningful choices
- Describe scenes vividly and dramatically
- Ask the player what they do after each scene
- Use your tools to track the game state
- Perform dice rolls for risky actions
- Make the player feel like a hero

📋 GAME FLOW:

1. OPENING:
   - Start with: "{self.universe_config['opening']}"
   - Wait for their name
   - Call create_character(name, class) to initialize them
   - Describe their character stats enthusiastically
   - Call update_location() to set starting location

2. THE ADVENTURE:
   - Present an exciting scenario or quest hook
   - Call add_quest() when a quest begins
   - Describe the scene with sensory details (sights, sounds, smells)
   - End EVERY message with: "What do you do?"
   - Listen to their action
   - When they attempt something risky, call roll_dice() to determine outcome
   - Update HP with update_character_hp() when they take damage or heal
   - Give them items with add_to_inventory() when they find/earn things
   - Call update_location() when they move to new places
   - Record important moments with add_event()

3. DICE MECHANICS:
   - When player attempts risky actions (combat, persuasion, sneaking, etc.):
     * Call roll_dice(action, stat_type)
     * Announce the roll dramatically: "Let's see... *rolls dice* You rolled a 15 plus your Strength of 18... that's 33! Amazing success!"
     * Describe outcome based on result:
       - Failure (< 10): Something goes wrong, but story continues
       - Partial (10-19): Success with a complication
       - Success (20+): Full success, player feels awesome
   - Use appropriate stats:
     * strength: Combat, physical feats, breaking things
     * intelligence: Magic, puzzles, knowledge, investigation
     * luck: Chance, finding things, avoiding traps

4. INVENTORY & HP:
   - Track items the player finds or uses
   - When asked "What do I have?" or "Check inventory", list their items
   - Update HP when they take damage or use healing items
   - When asked "How's my health?" or "Check HP", report their status
   - If HP reaches 0, describe a dramatic (but not permanent) defeat

5. QUEST PROGRESSION:
   - Guide player through a mini-arc (8-15 exchanges)
   - Build tension with obstacles and challenges
   - Provide satisfying resolution
   - Offer rewards (items, gold, story progression)
   - Ask if they want to continue or end session

6. SAVE/LOAD:
   - If player says "save game" or "save progress", call save_game()
   - If player says "load game" or "continue from save", help them load_game()

⚠️ CRITICAL RULES:
- ALWAYS end your messages with "What do you do?" or similar prompt
- ALWAYS call create_character() after learning player's name
- ALWAYS call roll_dice() for risky actions - don't just narrate success
- ALWAYS update game state with your tools (location, inventory, HP, events)
- Keep responses conversational and exciting for voice
- Be dramatic and engaging - you're telling an epic story!
- Make the player feel powerful and heroic
- Never let the story stall - always push forward
- If player seems stuck, offer 2-3 action suggestions

🎲 YOUR TOOLS:
You have powerful tools to manage the game:
1. create_character(name, class) - Initialize player with stats
2. update_character_hp(amount, reason) - Modify HP (+heal, -damage)
3. add_to_inventory(item, description) - Give player an item
4. remove_from_inventory(item) - Remove an item
5. update_location(location, description) - Move to new place
6. add_event(description) - Record important story moment
7. add_quest(name, description, status) - Track objectives
8. roll_dice(action, stat_type) - Perform skill check
9. save_game() - Export game to JSON file
10. load_game(filename) - Import saved game

🎬 EXAMPLE FLOW:
GM: "Welcome! You stand at the gates of Eldoria. What is your name?"
Player: "I am Thorin"
GM: *calls create_character("Thorin", "Warrior")*
GM: "Greetings, Thorin the Warrior! You have Strength 18, Intelligence 12, and Luck 14. You're a mighty fighter! *calls update_location("Millhaven Village")* You arrive in Millhaven Village. The innkeeper rushes to you: 'Goblins stole our sacred crystal!' What do you do?"
Player: "I'll track the goblins"
GM: *calls roll_dice("track goblins", "intelligence")*
GM: "Let's see if you can find their trail... You rolled 16 plus Intelligence 12, that's 28! Success! You spot muddy goblin tracks leading into the dark forest. What do you do?"

Remember: You're creating an unforgettable adventure! Be dramatic, exciting, and always keep the story moving forward! 🎲🐉✨"""

        super().__init__(instructions=instructions)

    @function_tool
    async def create_character(self, context: RunContext, name: str, character_class: str = "Adventurer"):
        """Create a new player character with random stats.
        
        Args:
            name: The player's character name
            character_class: The character class (Warrior, Mage, Rogue, etc.)
        """
        logger.info(f"🎭 Creating character: {name} ({character_class})")
        
        char = self.game_state.create_character(name, character_class)
        
        return f"Character created! {name} the {character_class} - HP: {char['hp']}, Strength: {char['stats']['strength']}, Intelligence: {char['stats']['intelligence']}, Luck: {char['stats']['luck']}. You have {char['gold']} gold pieces."

    @function_tool
    async def update_character_hp(self, context: RunContext, amount: int, reason: str):
        """Update character HP (positive for healing, negative for damage).
        
        Args:
            amount: HP change (positive = heal, negative = damage)
            reason: Description of why HP changed
        """
        logger.info(f"💔 HP change: {amount:+d} - {reason}")
        
        result = self.game_state.update_hp(amount, reason)
        
        if "error" in result:
            return result["error"]
        
        return f"HP updated: {result['change']:+d}. Now at {result['hp']}/{result['max_hp']} HP. Status: {result['status']}"

    @function_tool
    async def add_to_inventory(self, context: RunContext, item: str, description: str = ""):
        """Add an item to the player's inventory.
        
        Args:
            item: Name of the item
            description: Optional description of the item
        """
        logger.info(f"🎒 Adding to inventory: {item}")
        
        success = self.game_state.add_to_inventory(item, description)
        
        if success:
            return f"Added to inventory: {item}"
        return "Could not add item - no character created"

    @function_tool
    async def remove_from_inventory(self, context: RunContext, item: str):
        """Remove an item from the player's inventory.
        
        Args:
            item: Name of the item to remove
        """
        logger.info(f"🗑️ Removing from inventory: {item}")
        
        success = self.game_state.remove_from_inventory(item)
        
        if success:
            return f"Removed from inventory: {item}"
        return f"Item not found in inventory: {item}"

    @function_tool
    async def update_location(self, context: RunContext, location_name: str, description: str = ""):
        """Update the player's current location.
        
        Args:
            location_name: Name of the new location
            description: Optional description of the location
        """
        logger.info(f"📍 Moving to: {location_name}")
        
        location = self.game_state.update_location(location_name, description)
        
        return f"Now at: {location['name']}"

    @function_tool
    async def add_event(self, context: RunContext, event_description: str):
        """Record an important story event.
        
        Args:
            event_description: Description of what happened
        """
        logger.info(f"📝 Event: {event_description}")
        
        self.game_state.add_event(event_description)
        
        return f"Event recorded: {event_description}"

    @function_tool
    async def add_quest(self, context: RunContext, quest_name: str, description: str, status: str = "active"):
        """Add or update a quest.
        
        Args:
            quest_name: Name of the quest
            description: Quest description
            status: Quest status (active, completed, failed)
        """
        logger.info(f"📜 Quest: {quest_name} - {status}")
        
        quest = self.game_state.add_quest(quest_name, description, status)
        
        return f"Quest {status}: {quest_name}"

    @function_tool
    async def roll_dice(self, context: RunContext, action: str, stat_type: str = "luck"):
        """Perform a skill check with d20 + stat modifier.
        
        Args:
            action: What the player is attempting
            stat_type: Which stat to use (strength, intelligence, or luck)
        """
        logger.info(f"🎲 Rolling for: {action} ({stat_type})")
        
        result = self.game_state.perform_skill_check(action, stat_type)
        
        if "error" in result:
            return result["error"]
        
        return f"Rolled {result['roll']} + {result['stat_used'].title()} {result['stat_value']} = {result['total']}. Result: {result['description']}!"

    @function_tool
    async def save_game(self, context: RunContext):
        """Save the current game state to a JSON file."""
        logger.info("💾 Saving game...")
        
        try:
            filepath = self.game_state.save_to_file(SAVED_GAMES_DIR)
            logger.info(f"✅ Game saved to: {filepath}")
            return f"Game saved successfully! File: {Path(filepath).name}"
        except Exception as e:
            logger.error(f"❌ Save failed: {e}")
            return f"Failed to save game: {str(e)}"

    @function_tool
    async def load_game(self, context: RunContext, filename: str):
        """Load a saved game from a JSON file.
        
        Args:
            filename: Name of the save file to load
        """
        logger.info(f"📂 Loading game: {filename}")
        
        filepath = SAVED_GAMES_DIR / filename
        
        if not filepath.exists():
            return f"Save file not found: {filename}"
        
        try:
            success = self.game_state.load_from_file(filepath)
            if success:
                logger.info(f"✅ Game loaded from: {filepath}")
                summary = self.game_state.get_state_summary()
                return f"Game loaded successfully! {summary}"
            else:
                return "Failed to load game file"
        except Exception as e:
            logger.error(f"❌ Load failed: {e}")
            return f"Failed to load game: {str(e)}"


def prewarm(proc: JobProcess):
    proc.userdata["vad"] = silero.VAD.load()


async def entrypoint(ctx: JobContext):
    ctx.log_context_fields = {
        "room": ctx.room.name,
    }

    # Get universe from room metadata (default to fantasy)
    universe = ctx.room.metadata.get("universe", "fantasy") if ctx.room.metadata else "fantasy"
    logger.info(f"🌍 Starting game in universe: {universe}")

    session = AgentSession(
        stt=assemblyai.STT(),
        llm=google.LLM(model="gemini-2.5-flash"),
        tts=murf.TTS(
            voice="en-US-marcus",  # Dramatic male narrator voice
            style="Narration",  # Epic storytelling style
            tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
            text_pacing=True
        ),
        turn_detection=MultilingualModel(),
        vad=ctx.proc.userdata["vad"],
        preemptive_generation=True,
    )

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
        agent=GameMasterAgent(universe=universe),
        room=ctx.room,
        room_input_options=RoomInputOptions(
            noise_cancellation=noise_cancellation.BVC(),
        ),
    )

    await ctx.connect()


if __name__ == "__main__":
    cli.run_app(WorkerOptions(entrypoint_fnc=entrypoint, prewarm_fnc=prewarm))
