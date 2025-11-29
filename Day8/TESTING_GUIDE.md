# Testing Guide - Voice Game Master

## 🧪 Backend Testing

### Test Game State System

```bash
cd Day8/backend
uv run python test_game_state.py
```

**Expected Output:**
- ✓ Lists all available universes
- ✓ Creates a character with random stats
- ✓ Updates location
- ✓ Adds quests
- ✓ Manages inventory
- ✓ Performs dice rolls
- ✓ Updates HP
- ✓ Records events
- ✓ Saves and loads game state

### View Saved Games

```bash
cd Day8/backend
python view_saved_games.py
```

Shows all saved game files with character info, location, quests, and events.

### Test Agent Locally

```bash
cd Day8/backend

# Make sure .env is configured
uv run python src/agent.py dev
```

**Check for:**
- ✓ Agent starts without errors
- ✓ Connects to LiveKit server
- ✓ Loads universe configuration
- ✓ Initializes game state
- ✓ Tools are registered

## 🎮 Frontend Testing

### Start Development Server

```bash
cd Day8/frontend
pnpm dev
```

Open http://localhost:3000

### Visual Checks

**Welcome Screen:**
- ✓ "🎲 Start Adventure" button visible
- ✓ Purple/pink gradient background
- ✓ Smooth animations

**Session View:**
- ✓ Character sheet on left (initially empty)
- ✓ World info on right (initially empty)
- ✓ Status indicator at top ("🎲 Game Master")
- ✓ Control bar at bottom
- ✓ Animated background effects

### Interaction Testing

1. **Click "Start Adventure"**
   - ✓ Connects to LiveKit room
   - ✓ Agent starts speaking
   - ✓ Microphone activates

2. **Say your name**
   - ✓ Speech is transcribed
   - ✓ Agent responds with character creation
   - ✓ Character sheet appears (mock data)

3. **Continue conversation**
   - ✓ Agent asks "What do you do?"
   - ✓ Your responses are heard
   - ✓ Agent continues story

## 🎯 End-to-End Testing

### Full Adventure Flow

1. **Start all services:**
   ```bash
   # Terminal 1: LiveKit
   livekit-server --dev
   
   # Terminal 2: Backend
   cd Day8/backend
   uv run python src/agent.py dev
   
   # Terminal 3: Frontend
   cd Day8/frontend
   pnpm dev
   ```

2. **Test character creation:**
   - Say: "I am [Name]"
   - Verify: Agent creates character with stats
   - Check: Character sheet updates (in future version)

3. **Test quest acceptance:**
   - Say: "I accept the quest"
   - Verify: Agent acknowledges
   - Check: Quest appears in world info (in future version)

4. **Test dice rolls:**
   - Say: "I search for clues"
   - Verify: Agent performs dice roll
   - Check: Roll result is announced
   - Check: Event is recorded

5. **Test inventory:**
   - Say: "I pick up the sword"
   - Verify: Agent adds item
   - Check: Inventory updates (in future version)

6. **Test HP:**
   - Say: "I take damage"
   - Verify: Agent updates HP
   - Check: HP bar changes (in future version)

7. **Test save/load:**
   - Say: "Save my game"
   - Verify: Agent confirms save
   - Check: File appears in `backend/saved_games/`
   - Say: "Load my game"
   - Verify: Agent loads state

## 🐛 Common Issues

### Backend Issues

**"No module named 'game_state'"**
- Solution: Make sure you're in the `backend` directory
- Run: `uv sync` to install dependencies

**"Connection refused to LiveKit"**
- Solution: Start LiveKit server first
- Run: `livekit-server --dev`

**"API key not found"**
- Solution: Check `.env` file exists and has all keys
- Copy from `.env.example` if needed

### Frontend Issues

**"Cannot connect to agent"**
- Solution: Ensure backend agent is running
- Check backend logs for errors

**"Microphone not working"**
- Solution: Check browser permissions
- Allow microphone access when prompted

**"Character sheet not updating"**
- Note: This is expected in current version
- Full state sync requires additional implementation

### Voice Issues

**"Agent not responding"**
- Check: Microphone is working
- Check: Backend logs show transcription
- Try: Speaking louder or clearer

**"Agent cuts me off"**
- This is normal: VAD (Voice Activity Detection) is sensitive
- Try: Pausing briefly before speaking

**"Delayed responses"**
- Check: Internet connection
- Check: API rate limits
- Note: First response may be slower (model loading)

## ✅ Pre-Demo Checklist

Before recording your demo:

- [ ] LiveKit server running
- [ ] Backend agent running without errors
- [ ] Frontend loads at http://localhost:3000
- [ ] Microphone permissions granted
- [ ] Audio output working
- [ ] Screen recording software ready
- [ ] Demo script prepared
- [ ] Browser window sized appropriately
- [ ] No sensitive info visible (API keys, etc.)

## 📊 Performance Benchmarks

**Expected Response Times:**
- First response: 2-4 seconds (model loading)
- Subsequent responses: 0.5-1.5 seconds
- Dice roll: < 1 second
- State update: < 0.5 seconds

**Resource Usage:**
- Backend: ~200-500 MB RAM
- Frontend: ~100-200 MB RAM
- LiveKit: ~50-100 MB RAM

## 🔍 Debugging Tips

### Enable Verbose Logging

Backend:
```python
# In agent.py, add at top:
import logging
logging.basicConfig(level=logging.DEBUG)
```

Frontend:
```typescript
// In browser console:
localStorage.setItem('livekit-debug', 'true')
```

### Check Agent State

```bash
# View saved games
cd Day8/backend
python view_saved_games.py

# Test game state
uv run python test_game_state.py
```

### Monitor LiveKit

```bash
# Check LiveKit logs
livekit-server --dev --verbose
```

---

**Happy testing! 🧪🎲**
