# Day 8 – Voice Game Master (D&D-Style Adventure) 🎲🐉

A voice-powered D&D-style Game Master that runs interactive fantasy adventures with stateful world tracking, character sheets, and dice mechanics.

## 🎯 Overview

This agent acts as a **Game Master** running a fantasy adventure in the realm of **Eldoria**. It uses voice AI to:
- Guide players through an interactive story
- Track character stats, inventory, and HP
- Maintain a JSON world state (characters, locations, events, quests)
- Perform dice rolls for skill checks
- Remember past decisions and consequences
- Support multiple universe presets

## ✨ Features

### Primary Goal ✅
- ✅ **Clear GM Persona** - Fantasy Game Master with dramatic tone
- ✅ **Interactive Story** - Voice-driven narrative with player choices
- ✅ **Chat History Continuity** - Remembers past decisions and events
- ✅ **Mini-Arc Sessions** - 8-15 turn adventures with meaningful outcomes
- ✅ **Clean UI** - Shows GM messages, player transcriptions, restart option

### Advanced Goals ✅
- ✅ **JSON World State** - Tracks characters, locations, events, quests
- ✅ **Character Sheet** - HP, stats (Strength, Intelligence, Luck), inventory
- ✅ **Dice Mechanics** - D20 rolls with stat modifiers for skill checks
- ✅ **Multiple Universes** - Fantasy, Cyberpunk, Space Opera presets
- ✅ **Save/Load Game** - Export and import game state as JSON

## 🚀 Quick Start

### Prerequisites

- Python 3.9+
- Node.js 18+
- LiveKit Server
- API Keys: Google Gemini, AssemblyAI, Murf AI

### 1. Start LiveKit Server

```bash
livekit-server --dev
```

### 2. Start Backend Agent

```bash
cd Day8/backend

# Install dependencies
uv sync

# Configure environment
cp .env.example .env
# Edit .env with your API keys

# Run agent
uv run python src/agent.py dev
```

### 3. Start Frontend

```bash
cd Day8/frontend

# Install dependencies
pnpm install

# Run frontend
pnpm dev
```

### 4. Open Browser

Navigate to: http://localhost:3000

## 🎮 How to Play

### Starting Your Adventure

1. **Click** "Start Adventure" to connect
2. **Choose Universe** (optional): Fantasy (default), Cyberpunk, or Space Opera
3. **Listen** to the GM's opening scene
4. **Speak** your actions and decisions
5. **Watch** your character sheet update in real-time

### Sample Playthrough

```
GM: "Welcome, brave adventurer! You stand at the gates of Eldoria, 
     a realm of magic and mystery. What is your name?"

You: "I am Thorin"

GM: "Greetings, Thorin! You are a warrior with great strength. 
     You find yourself in the village of Millhaven. The innkeeper 
     rushes to you: 'Please help! Goblins have stolen our sacred 
     crystal!' What do you do?"

You: "I'll track the goblins"

GM: "Roll for tracking! *rolls d20* You rolled a 15 plus your 
     Intelligence of 12... that's 27! Success! You spot goblin 
     tracks leading into the dark forest..."
```

## 🎲 Game Mechanics

### Character Stats

Each character has:
- **HP (Hit Points)**: 100 (Healthy), 50-99 (Injured), 1-49 (Critical)
- **Strength**: Physical power and combat (10-20)
- **Intelligence**: Problem-solving and magic (10-20)
- **Luck**: Fortune and chance (10-20)

### Dice Rolls

When attempting risky actions:
- Roll d20 (1-20)
- Add relevant stat modifier
- **Result < 10**: Failure
- **Result 10-19**: Partial success
- **Result 20+**: Full success

### Inventory

Track items like:
- Weapons (sword, bow, staff)
- Potions (health, mana)
- Quest items (keys, crystals, maps)
- Gold and supplies

## 🌍 Universe Presets

### 1. Classic Fantasy (Default)
- **Setting**: Eldoria - realm of dragons and magic
- **Tone**: Epic and dramatic
- **Quests**: Rescue missions, dungeon crawls, dragon slaying

### 2. Cyberpunk City
- **Setting**: Neo-Tokyo 2099 - neon-lit megacity
- **Tone**: Gritty and tech-noir
- **Quests**: Corporate espionage, hacking, street survival

### 3. Space Opera
- **Setting**: Galactic Federation - star systems and alien worlds
- **Tone**: Sci-fi adventure
- **Quests**: Space exploration, alien diplomacy, ship combat

## 🛠️ Tech Stack

### Backend
- **Python** - Core language
- **LiveKit Agents** - Voice AI framework
- **Google Gemini 2.5 Flash** - LLM for storytelling
- **AssemblyAI** - Speech-to-text
- **Murf AI** - Text-to-speech (en-US-marcus - dramatic narrator voice)
- **JSON State Management** - In-memory world tracking

### Frontend
- **Next.js 15** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **LiveKit Components** - Voice interface
- **Framer Motion** - Animations

## 📁 Project Structure

```
Day8/
├── backend/
│   ├── src/
│   │   ├── agent.py              # Main GM agent with tools
│   │   ├── game_state.py         # JSON world state manager
│   │   └── universes.py          # Universe preset definitions
│   ├── saved_games/              # Exported game saves
│   ├── pyproject.toml            # Python dependencies
│   └── .env.example              # Environment template
├── frontend/
│   ├── app/                      # Next.js app
│   ├── components/               # React components
│   │   ├── CharacterSheet.tsx    # Character stats display
│   │   ├── WorldState.tsx        # World info panel
│   │   └── UniverseSelector.tsx  # Universe picker
│   └── package.json              # Node dependencies
└── README.md                     # This file
```

## 🎯 Agent Tools

The GM uses 8 function tools:

### Character Management
1. **create_character(name, character_class)** - Initialize player character
2. **update_character_hp(amount, reason)** - Modify HP (damage/healing)
3. **add_to_inventory(item, description)** - Give player an item
4. **remove_from_inventory(item)** - Remove an item

### World State
5. **update_location(location_name, description)** - Move to new location
6. **add_event(event_description)** - Record important story event
7. **add_quest(quest_name, description, status)** - Track objectives

### Mechanics
8. **roll_dice(action, stat_type)** - Perform skill check with d20 + stat

### Save/Load
9. **save_game()** - Export world state to JSON file
10. **load_game(filename)** - Import saved game state

## 💾 Save/Load System

### Saving Your Game

Say: "Save my game" or "Save progress"
- GM calls `save_game()`
- Creates JSON file in `backend/saved_games/`
- Filename: `game_YYYYMMDD_HHMMSS.json`

### Loading a Game

Say: "Load my game" or "Continue from save"
- GM shows available save files
- You specify which one
- GM calls `load_game(filename)`
- Restores full world state

### Save File Contents

```json
{
  "timestamp": "2025-11-29T10:30:00",
  "universe": "fantasy",
  "character": {
    "name": "Thorin",
    "class": "Warrior",
    "hp": 85,
    "max_hp": 100,
    "stats": {
      "strength": 18,
      "intelligence": 12,
      "luck": 14
    },
    "inventory": ["Iron Sword", "Health Potion", "Sacred Crystal"]
  },
  "world": {
    "current_location": "Dark Forest",
    "locations_visited": ["Millhaven", "Dark Forest"],
    "events": [
      "Accepted quest to retrieve sacred crystal",
      "Tracked goblins into forest"
    ],
    "quests": [
      {
        "name": "Retrieve Sacred Crystal",
        "status": "in_progress"
      }
    ]
  }
}
```

## 🎬 Sample Adventure Flow

### Act 1: The Call to Adventure
1. GM introduces the world and asks your name
2. You introduce yourself
3. GM creates your character with stats
4. GM presents the inciting incident (quest hook)

### Act 2: The Journey
5. You make decisions (explore, fight, negotiate)
6. GM performs dice rolls for risky actions
7. Your HP and inventory change based on outcomes
8. Events are recorded in world state

### Act 3: The Resolution
9. You reach the quest objective
10. GM describes the outcome
11. You receive rewards (items, XP)
12. GM offers to continue or end session

## 🎤 Voice Tips

### Good Commands
- "I search the room"
- "I attack the goblin"
- "I try to persuade the guard"
- "What's in my inventory?"
- "Check my health"
- "Save my game"

### The GM Responds To
- Direct actions ("I do X")
- Questions ("What do I see?")
- Inventory queries ("What do I have?")
- Meta commands ("Roll for strength", "Save game")

## 🐛 Troubleshooting

### Agent Not Responding
- Ensure LiveKit server is running: `livekit-server --dev`
- Check backend logs for errors
- Verify API keys in `.env`

### Dice Rolls Not Working
- Make sure you're attempting a risky action
- GM will automatically roll when needed
- Check logs for roll results

### Save/Load Issues
- Ensure `saved_games/` directory exists
- Check file permissions
- Verify JSON format is valid

## 📚 Resources

- [LiveKit Agents Documentation](https://docs.livekit.io/agents/)
- [Google Gemini API](https://ai.google.dev/)
- [AssemblyAI Docs](https://www.assemblyai.com/docs)
- [Murf AI Voices](https://docs.livekit.io/agents/models/tts/murf/)

## ✅ Feature Checklist

### Primary Goal
- [x] Clear GM persona with universe and tone
- [x] Interactive voice-driven story
- [x] Continuity with chat history
- [x] 8-15 turn mini-arc sessions
- [x] Clean UI with transcriptions

### Advanced Goals
- [x] JSON world state (characters, locations, events, quests)
- [x] Character sheet (HP, stats, inventory)
- [x] Dice mechanics (d20 + stat modifiers)
- [x] Multiple universe presets
- [x] Save/load game system

## 🚀 Future Enhancements

- [ ] Multi-player co-op adventures
- [ ] Combat system with turn-based battles
- [ ] Leveling and XP progression
- [ ] More universe presets (Horror, Western, etc.)
- [ ] Visual map of locations
- [ ] NPC relationship tracking
- [ ] Persistent database for campaigns

---

**Built with ❤️ for Day 8 of the Murf AI Voice Agent Challenge**

🎲 Roll for initiative! 🐉

