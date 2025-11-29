# Next Steps - Getting Started with Day 8

## 🚀 You're Ready to Go!

I've created a complete **Voice Game Master** application for Day 8. Here's what you need to do next:

## 📋 Immediate Actions

### 1. Install Backend Dependencies (2 minutes)

```bash
cd Day8/backend
uv sync
```

This will install all Python dependencies including LiveKit Agents, Google Gemini, AssemblyAI, and Murf AI plugins.

### 2. Configure API Keys (3 minutes)

```bash
cd Day8/backend
cp .env.example .env
```

Then edit `.env` and add your API keys:
- `GOOGLE_API_KEY` - Get from https://ai.google.dev/
- `ASSEMBLYAI_API_KEY` - Get from https://www.assemblyai.com/
- `MURF_API_KEY` - Get from your Murf AI account

### 3. Install Frontend Dependencies (2 minutes)

```bash
cd Day8/frontend
pnpm install
```

### 4. Test the Backend (1 minute)

```bash
cd Day8/backend
uv run python test_game_state.py
```

You should see: ✅ All tests passed!

## 🎮 Running the Application

### Option A: Use the Startup Script

```bash
cd Day8
./start_app.sh
```

This will:
1. Check if LiveKit server is running
2. Start the backend agent
3. Start the frontend
4. Open your browser

### Option B: Manual Start (Recommended for First Time)

**Terminal 1 - LiveKit Server:**
```bash
livekit-server --dev
```

**Terminal 2 - Backend Agent:**
```bash
cd Day8/backend
uv run python src/agent.py dev
```

**Terminal 3 - Frontend:**
```bash
cd Day8/frontend
pnpm dev
```

**Browser:**
Open http://localhost:3000

## 🎲 Testing Your Game Master

### Quick Test (2 minutes)

1. Click "🎲 Start Adventure"
2. Say: "I am Thorin"
3. Listen to GM create your character
4. Say: "I accept the quest"
5. Say: "I search for clues"
6. Watch the dice roll!

### Full Test (5 minutes)

Follow the script in `DEMO_SCRIPT.md` for a complete adventure.

## 📹 Recording Your Demo

### Preparation

1. **Close unnecessary apps** - Clean desktop
2. **Test your microphone** - Make sure it's working
3. **Test your speakers** - Verify audio output
4. **Have script ready** - Open `DEMO_SCRIPT.md`
5. **Start recording software** - QuickTime, OBS, or similar

### Recording Tips

- **Keep it short** - 2-3 minutes is perfect
- **Show key features** - Character creation, dice rolls, inventory
- **Be enthusiastic** - You're playing D&D!
- **Speak clearly** - For both the agent and viewers
- **Show the UI** - Zoom in on character sheet and world info

### What to Show

1. Welcome screen (5 seconds)
2. Start adventure (5 seconds)
3. Character creation (30 seconds)
4. First quest (45 seconds)
5. Dice roll (20 seconds)
6. Inventory update (15 seconds)
7. Save game (10 seconds)
8. Wrap up (20 seconds)

## 📱 LinkedIn Post

### Template

```
🎲 Day 8 of the #MurfAIVoiceAgentsChallenge! 

I built a voice-powered D&D Game Master that runs interactive fantasy adventures! 🐉✨

Key Features:
✅ Fully voice-controlled gameplay
✅ Real-time character stats & inventory
✅ Dice roll mechanics (d20 + modifiers)
✅ Complete world state tracking
✅ Save/load game system
✅ Multiple universe presets (Fantasy, Cyberpunk, Space Opera)

The agent acts as a Game Master, guiding players through epic quests with 
dramatic narration. It tracks your character's HP, stats, inventory, and 
quest progress - all through natural voice conversation!

This is the future of interactive storytelling! 🎮

Built with @Murf AI's Falcon TTS - the fastest voice API for real-time gaming.

#10DaysofAIVoiceAgents #AI #VoiceAI #GameDev #DnD #InteractiveStory

[Attach your video here]
```

### Publishing Checklist

- [ ] Video is attached
- [ ] Murf AI is tagged
- [ ] Hashtags are included:
  - #MurfAIVoiceAgentsChallenge
  - #10DaysofAIVoiceAgents
- [ ] Post is engaging and clear
- [ ] Video plays correctly

## 🎯 What You've Built

### Primary Goal ✅
- Clear GM persona with universe and tone
- Interactive voice-driven story
- Chat history continuity
- 8-15 turn mini-arc sessions
- Clean UI with transcriptions

### Advanced Goals ✅
- JSON world state tracking
- Character sheet with HP, stats, inventory
- Dice mechanics (d20 + stat modifiers)
- Multiple universe presets
- Save/load game system

### Bonus Features ✅
- Character sheet UI panel
- World info UI panel
- Animated backgrounds
- Status indicators
- Professional polish

## 📚 Documentation Available

- **README.md** - Complete project documentation
- **QUICK_START.md** - 5-minute setup guide
- **DEMO_SCRIPT.md** - Video recording guide
- **TESTING_GUIDE.md** - Testing procedures
- **FEATURES.md** - Complete feature list
- **PROJECT_SUMMARY.md** - Technical overview
- **COMPLETION_CHECKLIST.md** - Step-by-step completion guide

## 🐛 Troubleshooting

### Backend Issues

**"uv: command not found"**
```bash
# Install uv
curl -LsSf https://astral.sh/uv/install.sh | sh
```

**"No module named 'livekit'"**
```bash
cd Day8/backend
uv sync
```

**"Connection refused"**
- Make sure LiveKit server is running: `livekit-server --dev`

### Frontend Issues

**"pnpm: command not found"**
```bash
# Install pnpm
npm install -g pnpm
```

**"Cannot find module"**
```bash
cd Day8/frontend
rm -rf node_modules
pnpm install
```

### Voice Issues

**"Microphone not working"**
- Check browser permissions
- Try Chrome (recommended)
- Test microphone in system settings

**"Agent not responding"**
- Check backend logs for errors
- Verify API keys in .env
- Check internet connection

## 🎓 Learning Resources

### LiveKit Agents
- Docs: https://docs.livekit.io/agents/
- Examples: https://github.com/livekit/agents

### Murf AI
- Docs: https://docs.livekit.io/agents/models/tts/murf/
- Voices: https://murf.ai/voices

### Google Gemini
- Docs: https://ai.google.dev/
- API: https://ai.google.dev/gemini-api

### AssemblyAI
- Docs: https://www.assemblyai.com/docs
- Dashboard: https://www.assemblyai.com/app

## 🚀 Ready to Start?

1. **Install dependencies** (5 minutes)
2. **Configure API keys** (3 minutes)
3. **Test the system** (2 minutes)
4. **Run the application** (1 minute)
5. **Play an adventure** (5 minutes)
6. **Record your demo** (15 minutes)
7. **Post on LinkedIn** (10 minutes)

**Total time: ~40 minutes**

## 🎉 You've Got This!

Everything is set up and ready to go. Just follow the steps above and you'll have an amazing voice-powered D&D Game Master running in no time!

If you get stuck, check:
1. TESTING_GUIDE.md for troubleshooting
2. Backend logs for error messages
3. Browser console for frontend issues

**Good luck, and have fun adventuring! 🗡️🛡️🐉**

---

**Questions?** Check the documentation files or review the code comments.

**Ready?** Let's roll for initiative! 🎲
