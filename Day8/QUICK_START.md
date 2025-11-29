# Quick Start Guide - Day 8 Voice Game Master

## 🚀 Fast Setup (5 minutes)

### 1. Start LiveKit Server
```bash
livekit-server --dev
```

### 2. Configure Backend
```bash
cd Day8/backend
cp .env.example .env
# Edit .env with your API keys:
# - GOOGLE_API_KEY
# - ASSEMBLYAI_API_KEY
# - MURF_API_KEY
```

### 3. Start Backend
```bash
uv sync
uv run python src/agent.py dev
```

### 4. Start Frontend (new terminal)
```bash
cd Day8/frontend
pnpm install
pnpm dev
```

### 5. Play!
Open http://localhost:3000 and click "🎲 Start Adventure"

## 🎮 Quick Demo Script (2 minutes)

1. **Click** "Start Adventure"
2. **Say:** "I am Thorin"
3. **Listen** to GM describe your character
4. **Say:** "I accept the quest"
5. **Say:** "I search for clues"
6. **Watch** dice rolls and character sheet update!

## 🎲 Sample Commands

- "I attack the goblin"
- "I try to persuade the guard"
- "What's in my inventory?"
- "Check my health"
- "I use a health potion"
- "Save my game"

## 🌍 Try Different Universes

Edit `backend/src/agent.py` line 234 to change universe:
- `"fantasy"` - Classic D&D (default)
- `"cyberpunk"` - Neo-Tokyo 2099
- `"space_opera"` - Galactic Federation

## 🐛 Troubleshooting

**Agent not responding?**
- Check LiveKit server is running
- Verify API keys in `.env`
- Check backend logs for errors

**No voice?**
- Click "Start Audio" if prompted
- Check browser microphone permissions
- Ensure speakers/headphones are connected

**Character sheet not updating?**
- This is a demo - full state sync coming soon
- Check browser console for errors

## 📹 Recording Your Demo

1. Start screen recording
2. Show the welcome screen
3. Start adventure and introduce yourself
4. Make 3-4 decisions
5. Show character sheet and inventory
6. End recording (keep under 2 minutes!)

## 🎯 LinkedIn Post Template

```
🎲 Day 8 of the #MurfAIVoiceAgentsChallenge! 

Built a voice-powered D&D Game Master that:
✅ Runs interactive fantasy adventures
✅ Tracks character stats, HP, and inventory
✅ Performs dice rolls for skill checks
✅ Maintains world state with quests and events
✅ Supports multiple universe presets

This is the future of interactive storytelling! 🐉✨

Built with @Murf AI's Falcon TTS - the fastest voice API for real-time adventures.

#10DaysofAIVoiceAgents #AI #VoiceAI #GameDev #DnD

[Your video here]
```

---

**Have fun adventuring! 🗡️🛡️**
