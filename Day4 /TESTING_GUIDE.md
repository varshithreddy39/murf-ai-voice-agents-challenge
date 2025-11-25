# Day 4 Testing Guide - Teach the Tutor

## 🚀 Application is Running!

- **Frontend**: http://localhost:3000
- **Backend**: Agent system with 4 agents
- **LiveKit**: Development server on port 7880

---

## ✅ What's Working

1. **Multi-Agent System**
   - Coordinator Agent (Matthew voice)
   - Learn Agent (Matthew voice)
   - Quiz Agent (Alicia voice)
   - Teach Back Agent (Ken voice)

2. **Content**
   - 8 programming concepts loaded
   - Variables, Loops, Functions, Conditionals, Arrays, Objects, Scope, Debugging

3. **UI**
   - Professional welcome screen with animations
   - Learning status bar (changes color per mode)
   - Minimal, clean design

---

## 🧪 Quick Test Script

### Step 1: Start Conversation
**Say**: "Hello" or "Hi"
- Agent should greet you
- Explain 3 learning modes
- Ask which mode you want

### Step 2: Choose Learn Mode
**Say**: "I want to learn" or "Let's start with learn mode"
- Should transfer to Learn Agent
- Status bar turns BLUE
- Matthew's voice

### Step 3: Learn a Concept
**Say**: "Teach me about variables"
- Agent explains variables
- Gives examples
- Asks if you understand

### Step 4: Switch to Quiz
**Say**: "I'm ready for quiz mode"
- Should transfer to Quiz Agent
- Status bar turns ORANGE
- Alicia's voice
- Asks quiz questions

### Step 5: Try Teach Back
**Say**: "I want to teach you now"
- Should transfer to Teach Back Agent
- Status bar turns GREEN
- Ken's voice
- Asks you to explain

---

## 🎯 Testing Checklist

- [ ] Welcome screen loads with animations
- [ ] Can start voice session
- [ ] Coordinator greets and explains modes
- [ ] Can switch to Learn mode
- [ ] Can switch to Quiz mode
- [ ] Can switch to Teach Back mode
- [ ] Status bar updates correctly
- [ ] Different voices for each mode
- [ ] Can learn different concepts
- [ ] Progress is tracked

---

## 🐛 Troubleshooting

**Agent not responding?**
- Check backend logs (process 5)
- Make sure microphone permissions are granted
- Try refreshing the page

**Voice not working?**
- Click "Start Audio" if prompted
- Check browser audio permissions
- Make sure speakers/headphones are connected

**Status bar not updating?**
- This is normal - it detects mode from conversation
- Will update when agent mentions mode names

---

## 📝 Sample Conversation Flow

```
You: "Hello"
Agent: "Welcome! I'm your learning coordinator..."

You: "I want to learn"
Agent: [Transfers to Learn Mode]

You: "Teach me about loops"
Agent: "Loops are programming structures that repeat..."

You: "Let's try quiz mode"
Agent: [Transfers to Quiz Mode]

Agent: "Great! Let me ask you some questions..."

You: "Now I want to teach you"
Agent: [Transfers to Teach Back Mode]

Agent: "Perfect! Explain loops to me..."
```

---

## 🎨 UI Features

**Welcome Screen:**
- Animated gradient background
- Rotating glow effects
- 3 mode cards with hover effects
- Smooth transitions
- Feature pills at bottom

**Status Bar (During Session):**
- Blue = Learn Mode (📚)
- Orange = Quiz Mode (❓)
- Green = Teach Back Mode (🎯)
- Purple = Coordinator (🎓)

---

## 🔧 Technical Details

**Backend:**
- 4 agents with handoff system
- Content loaded from JSON
- Progress tracking in progress/user_progress.json
- Murf Falcon TTS with 3 voices

**Frontend:**
- Next.js 15 with Turbopack
- Framer Motion animations
- Real-time status updates
- Minimal, professional design

---

Ready to test! Open http://localhost:3000 and say "Hello"! 🎓
