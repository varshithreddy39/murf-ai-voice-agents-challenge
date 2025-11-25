# Day 4: Teach-the-Tutor - Active Recall Coach 🎓

> **Challenge:** Build an AI tutor that teaches programming concepts through active recall - where learning happens by teaching back to the AI!

[![Day 4](https://img.shields.io/badge/Day-4%2F10-blue?style=for-the-badge)](https://murf.ai)
[![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)](.)
[![Voice AI](https://img.shields.io/badge/Voice-AI-purple?style=for-the-badge)](.)

## 🎯 Challenge Overview

Create an AI programming tutor that helps users learn through three distinct modes:
- **Learn Mode**: AI explains concepts clearly
- **Quiz Mode**: AI tests your understanding with questions
- **Teach Back Mode**: You explain concepts to the AI (active recall!)

The best way to learn is to teach - and this AI makes that possible through voice!

## ✨ What's New in Day 4

### Backend Features
- **Multi-Mode Learning System**: Three distinct teaching modes with different voices
- **Dynamic Voice Switching**: Matthew (Learn), Alicia (Quiz), Ken (Teach Back)
- **Function Tools**: 
  - `select_topic()` - Choose from 5 programming concepts
  - `set_learning_mode()` - Switch between Learn/Quiz/Teach Back
  - `evaluate_teaching()` - Get feedback on your explanations
- **Content Management**: Auto-generates content.json with programming concepts
- **State Management**: Tracks current topic and mode across conversation
- **AssemblyAI Integration**: Accurate speech-to-text for better recognition

### Frontend Features
- **Dynamic Status Bar**: Changes color based on learning mode
  - 🔵 Blue for Learn Mode
  - 🟠 Orange for Quiz Mode
  - 🟢 Green for Teach Back Mode
- **Professional Welcome Screen**: Animated gradient background with mode cards
- **Real-time Mode Detection**: UI updates as you switch modes
- **Minimal, Clean Design**: Focus on learning, not distractions
- **Smooth Animations**: Framer Motion for delightful transitions

### Learning Concepts
- ✅ Variables - Data storage fundamentals
- ✅ Loops - Repetition structures (for, while)
- ✅ Functions - Reusable code blocks
- ✅ Conditionals - Decision making (if/else)
- ✅ Arrays - Collections and lists

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Port 3000)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Learning Interface                                  │  │
│  │  • Dynamic Status Bar (mode indicator)              │  │
│  │  • Voice Chat Interface                             │  │
│  │  • Real-time Transcript                             │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ WebRTC + LiveKit Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Python AI Tutor Agent                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  TutorAgent (Multi-Mode)                            │  │
│  │  • Learn Mode: Explains concepts (Matthew)          │  │
│  │  • Quiz Mode: Tests knowledge (Alicia)              │  │
│  │  • Teach Back: Listens & evaluates (Ken)            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Function Tools                                      │  │
│  │  • select_topic() - Choose concept                  │  │
│  │  • set_learning_mode() - Switch mode & voice        │  │
│  │  • evaluate_teaching() - Score explanations         │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Content System (content.json)                      │  │
│  │  • 5 programming concepts                           │  │
│  │  • Summaries & sample questions                     │  │
│  │  • Auto-generated on first run                      │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+ with uv
- Node.js 18+ with pnpm
- LiveKit Server
- API Keys:
  - [AssemblyAI](https://www.assemblyai.com/) (Speech-to-text)
  - [Google AI Studio](https://aistudio.google.com/) (Gemini LLM)
  - [Murf AI](https://murf.ai/) (Text-to-speech)

### Installation

1. **Clone and navigate**
```bash
cd Day4
```

2. **Backend setup**
```bash
cd backend
uv sync
cp .env.example .env
# Edit .env and add your API keys
```

3. **Frontend setup**
```bash
cd ../frontend
pnpm install
cp .env.example .env.local
# Add LiveKit credentials to .env.local
```

### Running the App

**Option 1: Run all services together**
```bash
chmod +x start_app.sh
./start_app.sh
```

**Option 2: Run services individually**
```bash
# Terminal 1 - LiveKit Server
livekit-server --dev

# Terminal 2 - Backend Agent
cd backend
uv run python src/agent.py dev

# Terminal 3 - Frontend
cd frontend
pnpm dev
```

Open http://localhost:3000 and start learning! 🎓

## 🎭 How It Works

### Three Learning Modes

#### 1. Learn Mode (Matthew's Voice - Blue) 📚
The AI explains programming concepts clearly with examples.

**Example:**
```
You: "I want to learn about variables"
AI: "Variables are like labeled containers that store values..."
```

#### 2. Quiz Mode (Alicia's Voice - Orange) ❓
The AI tests your understanding with questions.

**Example:**
```
You: "Quiz me on loops"
AI: "Great! Explain the difference between a for loop and a while loop..."
```

#### 3. Teach Back Mode (Ken's Voice - Green) 🎯
You explain the concept to the AI, and it evaluates your understanding.

**Example:**
```
You: "Let me teach you about functions"
AI: "Perfect! I'm ready to learn. Explain functions to me..."
You: [Explain the concept]
AI: "Great explanation! I'd give you 8/10. You covered..."
```

### Voice Commands

**Selecting Topics:**
- "I want to learn about variables"
- "Teach me loops"
- "Let's study functions"

**Switching Modes:**
- "I want to learn" → Learn Mode (Blue)
- "Quiz me" → Quiz Mode (Orange)
- "Let me teach you" → Teach Back Mode (Green)

**Example Conversation:**
```
You: "Hello"
AI: "Hi! What programming concept would you like to study today?"

You: "I want to learn about variables"
AI: "Great choice! Would you like to Learn, be Quizzed, or Teach it back?"

You: "Let's start with learning"
AI: [Switches to Matthew's voice, status bar turns blue]
    "Variables are like labeled containers..."

You: "Now quiz me"
AI: [Switches to Alicia's voice, status bar turns orange]
    "Perfect! What is a variable and why is it useful?"

You: "Let me teach you now"
AI: [Switches to Ken's voice, status bar turns green]
    "I'm ready to learn! Explain variables to me..."
```

## 📁 Project Structure

```
Day4/
├── backend/
│   ├── src/
│   │   ├── agent.py              # Main AI tutor with 3 modes
│   │   ├── content.json          # Auto-generated concepts
│   │   └── __init__.py
│   ├── .env                      # API keys
│   └── pyproject.toml            # Python dependencies
├── frontend/
│   ├── app/
│   │   ├── (app)/page.tsx        # Main page
│   │   └── api/                  # API routes
│   ├── components/
│   │   ├── app/
│   │   │   ├── learning-status.tsx    # Dynamic status bar
│   │   │   ├── welcome-view.tsx       # Animated welcome
│   │   │   └── session-view.tsx       # Learning interface
│   │   └── livekit/              # LiveKit components
│   └── styles/                   # Global styles
├── start_app.sh                  # Launch script
└── README.md                     # This file
```

## 🎨 Key Features Explained

### 1. Dynamic Voice Switching

The agent changes its voice based on the learning mode:

```python
if state.mode == "learn":
    agent_session.tts.update_options(voice="en-US-matthew", style="Promo")
elif state.mode == "quiz":
    agent_session.tts.update_options(voice="en-US-alicia", style="Conversational")
elif state.mode == "teach_back":
    agent_session.tts.update_options(voice="en-US-ken", style="Promo")
```

### 2. Function Tools

**select_topic()**: Choose what to learn
```python
@function_tool
async def select_topic(ctx: RunContext[Userdata], topic_id: str) -> str:
    state = ctx.userdata.tutor_state
    success = state.set_topic(topic_id.lower())
    return f"Topic set to {state.current_topic_data['title']}"
```

**set_learning_mode()**: Switch modes and voices
```python
@function_tool
async def set_learning_mode(ctx: RunContext[Userdata], mode: str) -> str:
    state.mode = mode.lower()
    # Updates voice based on mode
    return f"Switched to {state.mode} mode"
```

**evaluate_teaching()**: Score user explanations
```python
@function_tool
async def evaluate_teaching(ctx: RunContext[Userdata], user_explanation: str) -> str:
    return "Analyze the user's explanation. Give them a score out of 10..."
```

### 3. Auto-Generated Content

On first run, the agent creates `content.json` with 5 programming concepts:

```json
[
  {
    "id": "variables",
    "title": "Variables",
    "summary": "Variables are like labeled containers...",
    "sample_question": "What is a variable and why is it useful?"
  }
]
```

### 4. Dynamic UI Status Bar

The status bar changes color based on detected mode:

- **Blue**: Learn Mode detected
- **Orange**: Quiz Mode detected
- **Green**: Teach Back Mode detected

## 🎯 Learning Outcomes

### Skills Developed
- ✅ Multi-agent voice systems with mode switching
- ✅ Dynamic TTS voice changes during conversation
- ✅ Function tools for interactive learning
- ✅ State management across conversation turns
- ✅ Active recall teaching methodology
- ✅ Real-time UI updates based on conversation
- ✅ Content management and auto-generation

### Technologies Mastered
- LiveKit Agents with function tools
- AssemblyAI for accurate STT
- Murf Falcon TTS with multiple voices
- Google Gemini for natural conversations
- React state management
- Framer Motion animations
- TypeScript for type safety

## 🐛 Troubleshooting

**Agent not responding?**
- Check backend logs for errors
- Verify all API keys in `.env`
- Make sure microphone permissions are granted

**Voice not changing between modes?**
- Check console logs for mode detection
- Say mode names explicitly: "quiz mode", "learn mode"
- Refresh the page and try again

**Status bar not updating?**
- Open browser console (F12) to see detection logs
- Make sure you're saying mode keywords clearly
- The bar updates based on conversation context

**Content.json not found?**
- The file auto-generates on first run
- Check `backend/src/content.json`
- If missing, restart the backend

## 📚 Resources

- [LiveKit Agents Documentation](https://docs.livekit.io/agents/)
- [AssemblyAI API](https://www.assemblyai.com/docs)
- [Murf AI Voices](https://murf.ai/voices)
- [Google Gemini](https://ai.google.dev/)

## 🚀 Future Enhancements

### Potential Additions
- 📊 Progress tracking and analytics
- 🏆 Achievement system for completed concepts
- 📝 Persistent user profiles
- 🎨 More programming concepts (OOP, Recursion, etc.)
- 🌍 Multi-language support
- 📱 Mobile-optimized interface
- 🔊 Adjustable speech rate
- 💾 Save learning history

## 📝 License

MIT License - See [LICENSE](./LICENSE) file

## 🙏 Acknowledgments

Built for the **Murf AI Voice Agents Challenge**
- Day 4 Challenge: Teach-the-Tutor Active Recall System
- Powered by: Murf Falcon TTS, LiveKit, Google Gemini, AssemblyAI

---

<div align="center">

### 🎓 Learn by Teaching - Master by Doing 🎓

**Previous:** [Day 3 - Wellness Companion](../Day3/) | **Next:** Day 5 (Coming Soon)

⭐ **Star this repo if you're following along!** ⭐

</div>
