# Day 3: Health & Wellness Voice Companion with Notion Integration 🌱

> **Challenge:** Build a supportive daily wellness companion that conducts check-ins, tracks mood and intentions, integrates with Notion for task management, and remembers past conversations

[![Day 3](https://img.shields.io/badge/Day-3%2F10-blue?style=for-the-badge)](https://murf.ai)
[![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)](.)
[![Notion](https://img.shields.io/badge/Notion-Integrated-black?style=for-the-badge&logo=notion)](.)

## 🎯 Challenge Overview

Create a health and wellness voice companion that:
- Conducts supportive daily check-ins via voice
- Tracks mood, energy levels, and daily intentions
- **NEW:** Integrates with Notion for task management
- **NEW:** Fetches and completes tasks via voice commands
- Persists data in JSON for continuity across sessions
- References past check-ins to provide context
- Offers grounded, practical wellness suggestions

**Important:** This is a supportive companion, not a therapist or medical professional.

## ✨ What's New in Day 3

### Backend Features
- **Wellness Companion Persona**: Warm, supportive, but realistic and grounded
- **Conversation Flow**: Structured check-in (mood → energy → stress → intentions → recap)
- **JSON Persistence**: All sessions saved to `wellness_log.json`
- **Memory & Context**: Agent references previous check-ins naturally
- **Function Tools**: 
  - `save_wellness_checkin()` - Save check-in sessions
  - `add_to_notion()` - Create tasks in Notion database
  - `get_notion_tasks()` - Fetch tasks from Notion
  - `complete_notion_task()` - Mark tasks as complete
- **Streak Tracking**: Calculates consecutive days of check-ins
- **Wellness Storage Utility**: Clean, reusable storage layer
- **Notion API Integration**: Direct API calls with httpx

### Frontend Features
- **Session Notes Component**: Live capture of mood, energy, and intentions
- **Wellness Dashboard**: Stats cards showing total sessions, streak, last check-in
- **Enhanced Chat Bubbles**: Modern design with gradient backgrounds
- **Notion Keyword Highlighting**: Keywords like "notion", "task", "complete" highlighted in green
- **Professional UI**: Clean, polished design with smooth animations
- **Real-time Stats**: Session count updates every 3 seconds
- **Calming Theme**: Soft greens and professional color scheme
- **Welcome Screen**: Shows stats and streak before starting
- **Empty States**: Encouraging messages for first-time users

### Notion Integration Features
- ✅ Create tasks from wellness intentions
- ✅ Fetch all tasks or filter by status (Todo, In Progress, Done)
- ✅ Complete tasks via voice commands
- ✅ Tasks include mood and energy level metadata
- ✅ Case-insensitive status handling
- ✅ Error handling and user-friendly messages

### UI/UX Highlights
- 🌱 Professional wellness-themed colors
- 💬 Modern chat bubbles with gradients
- 🎨 Keyword highlighting for Notion operations
- 📊 Real-time session data capture
- 🔥 Streak counter for motivation
- 💭 Mood tracking
- ⚡ Energy level tracking
- 🎯 Intentions list display
- 📅 Smart date formatting ("earlier today", "yesterday")
- 📱 Fully responsive design
- ✨ Smooth hover effects and transitions

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Port 3000)                      │
│  ┌──────────────────┐  ┌──────────────────────────────┐   │
│  │  Chat Interface  │  │  Session Notes (Live)        │   │
│  │  • Voice input   │  │  • Mood: Neutral             │   │
│  │  • Transcript    │  │  • Energy: 9/10              │   │
│  │  • Agent msgs    │  │  • Intentions: [2 items]     │   │
│  │  • Notion tasks  │  │  • Progress: 3/3 ✓           │   │
│  └──────────────────┘  └──────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Wellness Dashboard                                  │  │
│  │  • Total: 6 check-ins                               │  │
│  │  • Streak: 1 day                                    │  │
│  │  • Last: earlier today                              │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ WebRTC + LiveKit Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Python Wellness Agent                          │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Wellness Companion                                  │  │
│  │  • Loads past sessions on init                      │  │
│  │  • References previous check-ins                    │  │
│  │  • Conducts structured conversation                 │  │
│  │  • Integrates with Notion API                       │  │
│  │  • Offers grounded suggestions                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Notion Integration (httpx)                         │  │
│  │  • Create tasks with mood/energy metadata          │  │
│  │  • Query tasks by status                            │  │
│  │  • Update task status to "Done"                     │  │
│  │  • Case-insensitive status matching                 │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Wellness Storage (wellness_storage.py)             │  │
│  │  • save_session()                                   │  │
│  │  • get_recent_sessions()                            │  │
│  │  • get_streak()                                     │  │
│  │  • Atomic file writes                               │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTPS API Calls
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                    Notion API                               │
│  • Wellness Database (with Status, Mood, Energy)           │
│  • To Do List Page (optional checkbox items)               │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.9+ with uv
- Node.js 18+ with pnpm
- LiveKit Server
- **Notion Account** with API integration

### Notion Setup

1. **Create Notion Integration**
   - Go to https://www.notion.so/my-integrations
   - Click "New integration"
   - Name it "Wellness Companion"
   - Copy the API key

2. **Create Wellness Database**
   - Create a new database in Notion
   - Add these properties:
     - `Name` (Title)
     - `Status` (Select: todo, In Progress, Done)
     - `Date` (Date)
     - `Mood` (Select: add mood options)
     - `Energy` (Number)
   - Share the database with your integration
   - Copy the database ID from the URL

3. **Optional: Create To Do List Page**
   - Create a new page called "To Do List"
   - Share it with your integration
   - Copy the page ID from the URL

### Setup & Run

```bash
# Navigate to Day 3
cd Day3

# Backend setup
cd backend
uv sync
cp .env.example .env

# Edit .env and add:
# - Your API keys (Murf, Deepgram, Google)
# - NOTION_API_KEY=your_notion_api_key
# - NOTION_DATABASE_ID=your_database_id
# - NOTION_TODO_PAGE_ID=your_page_id (optional)

uv run python src/agent.py download-files

# Frontend setup
cd ../frontend
pnpm install
cp .env.example .env.local
# Add LiveKit credentials to .env.local

# Run everything (from Day3 directory)
cd ..
chmod +x start_app.sh
./start_app.sh
```

Or run services individually:
```bash
# Terminal 1 - LiveKit Server
livekit-server --dev

# Terminal 2 - Wellness Agent
cd Day3/backend
uv run python src/agent.py dev

# Terminal 3 - Frontend
cd Day3/frontend
pnpm dev
```

Open http://localhost:3000 and start your wellness journey! 🌱

## 🎭 How It Works

### Conversation Flow

1. **Greeting + Context**
   - Agent greets warmly
   - References last check-in if available
   - Acknowledges streak if > 1 day

2. **Mood Check**
   - "How are you feeling today?"
   - Open-ended, non-judgmental
   - Captures mood description

3. **Energy Level**
   - "What's your energy like?"
   - Numeric scale (1-10) or descriptive
   - Handles word numbers ("nine" → 9)

4. **Stress Exploration (Optional)**
   - "Anything stressing you out?"
   - Gentle, not pushy
   - Captures stress factors

5. **Daily Intentions**
   - "What are 1-3 things you'd like to accomplish?"
   - Practical, achievable goals
   - Encourages self-care items

6. **Notion Integration**
   - "Would you like me to add these to your Notion database?"
   - If yes, creates tasks with mood/energy metadata
   - Confirms creation

7. **Reflection & Advice**
   - Brief, grounded suggestions
   - Small, actionable steps
   - Non-medical, supportive

8. **Recap & Confirmation**
   - Agent summarizes what they heard
   - User confirms accuracy
   - Calls `save_wellness_checkin()` function

9. **Completion**
   - Session saved to JSON
   - Streak updated
   - Encouraging message

### Voice Commands for Notion

**View Tasks:**
- "What are my tasks?"
- "Show me my to-do list"
- "What do I need to do?"

**Complete Tasks:**
- "Mark 'go to the gym' as complete"
- "I finished studying"
- "Complete the meeting task"

**Add Tasks:**
- During check-in, when stating intentions
- Agent asks if you want to add to Notion
- Confirm with "yes"

### Example Conversation

```
Agent: "Good morning! Welcome back. Last time you mentioned feeling 
        neutral with high energy. How are things today?"

You: "I have a headache but my energy is still good, about 8 out of 10."

Agent: "I'm sorry to hear about the headache. What are your intentions 
        for today?"

You: "I want to go to the gym at 6 PM and study for my exam at 8 PM."

Agent: "Would you like me to add these to your Notion database so you 
        can track them?"

You: "Yes, please."

Agent: "Done! I've added 2 tasks to your Notion database."

[Later in the day]

You: "I finished going to the gym."

Agent: "That's great! Would you like me to mark that as complete in Notion?"

You: "Yes."

Agent: "Great job! I've marked 'Go to the gym at 6 PM' as complete in 
        your Notion database."
```

## 📁 Project Structure

```
Day3/
├── backend/
│   ├── src/
│   │   ├── agent.py                  # Wellness companion with Notion
│   │   └── wellness_storage.py       # JSON storage utility
│   ├── wellness_log.json             # Persistent session data
│   ├── test_notion.py                # Notion connection test
│   └── .env                          # API keys + Notion credentials
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   └── wellness-sessions/   # Fetch sessions API
│   │   └── page.tsx                 # Main page
│   ├── components/
│   │   ├── app/
│   │   │   ├── session-notes.tsx    # Live session capture
│   │   │   ├── welcome-view.tsx     # Enhanced welcome screen
│   │   │   └── chat-transcript.tsx  # Chat display
│   │   └── livekit/
│   │       ├── chat-entry.tsx       # Enhanced chat bubbles
│   │       └── agent-control-bar/   # Control bar
│   └── .env.local                   # LiveKit config
├── NOTION_TROUBLESHOOTING.md        # Notion setup help
├── UI_IMPROVEMENTS.md               # UI enhancement docs
└── README.md                        # This file
```

## 🎨 Key Features Explained

### 1. Notion Integration

**Create Tasks:**
```python
@function_tool
async def add_to_notion(intentions, mood, energy_level):
    # Creates tasks in Wellness Database
    # Includes mood and energy metadata
    # Returns confirmation message
```

**Fetch Tasks:**
```python
@function_tool
async def get_notion_tasks(status=None):
    # Queries Notion database
    # Filters by status if provided
    # Returns formatted task list
```

**Complete Tasks:**
```python
@function_tool
async def complete_notion_task(task_name):
    # Searches for task by name
    # Updates status to "Done"
    # Returns success message
```

### 2. Enhanced Chat UI

**Modern Chat Bubbles:**
- Gradient backgrounds (purple for user, muted for agent)
- Rounded corners with tail indicators
- Hover effects with shadow transitions
- Larger, more prominent avatars

**Keyword Highlighting:**
- Automatically highlights Notion-related words
- Green color for emphasis
- Makes task operations visible

### 3. Session Tracking

**Real-time Updates:**
- Stats refresh every 3 seconds
- Shows total check-ins
- Displays current streak
- Shows last check-in time

**Data Structure:**
```json
{
  "sessions": [
    {
      "session_id": "session_20251124_130905",
      "timestamp": "2025-11-24T13:10:53.749665",
      "mood": "Neutral",
      "energy_level": "9/10",
      "stress_factors": [],
      "intentions": [
        "Work on a project",
        "Go to the gym at 6 PM"
      ],
      "agent_summary": "User reported neutral mood...",
      "previous_session_reference": "Previous: Tense mood, 8/10 energy"
    }
  ]
}
```

### 4. Professional UI Design

**Color Scheme:**
- Primary: Green gradient (wellness theme)
- User messages: Purple/pink gradient
- Agent messages: Muted background
- Notion keywords: Green accent

**Typography:**
- Clean, bold headings
- Readable body text
- Professional spacing
- Smooth animations

## 🛠️ Technical Implementation

### Backend: Notion Integration

```python
# Direct API calls with httpx
async with httpx.AsyncClient() as client:
    response = await client.post(
        f"https://api.notion.com/v1/databases/{NOTION_DATABASE_ID}/query",
        headers={
            "Authorization": f"Bearer {NOTION_API_KEY}",
            "Notion-Version": "2022-06-28"
        },
        json=query_data
    )
```

### Frontend: Enhanced Chat

```typescript
// Keyword highlighting
const highlightNotionKeywords = (text: string) => {
  const keywords = ['notion', 'task', 'complete', 'done', 'todo'];
  // Highlights keywords in green
};

// Modern bubble design
<div className="px-4 py-2.5 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10">
  {highlightNotionKeywords(message)}
</div>
```

### Frontend: Stats Polling

```typescript
useEffect(() => {
  const fetchStats = () => {
    fetch('/api/wellness-sessions')
      .then(res => res.json())
      .then(data => setStats(data.stats));
  };
  
  fetchStats();
  const interval = setInterval(fetchStats, 3000);
  return () => clearInterval(interval);
}, []);
```

## 🎯 Learning Outcomes

### Skills Developed
- ✅ Building empathetic AI personas
- ✅ Structured conversation design
- ✅ JSON-based data persistence
- ✅ **Notion API integration**
- ✅ **Task management via voice**
- ✅ **Direct HTTP API calls with httpx**
- ✅ Context management across sessions
- ✅ Streak calculation algorithms
- ✅ Real-time data extraction
- ✅ **Professional UI design**
- ✅ **Keyword highlighting**
- ✅ **Modern chat interfaces**

### Technologies Mastered
- LiveKit Agents function tools
- Notion REST API
- httpx for async HTTP requests
- File-based persistence
- Context injection in prompts
- React state management
- Next.js API routes
- Framer Motion animations
- Professional UI/UX patterns

## 🐛 Troubleshooting

### Notion Integration Issues

**"I had trouble fetching tasks"**
- Check if database is shared with integration
- Verify `NOTION_DATABASE_ID` in `.env`
- Run `python test_notion.py` to test connection

**"Failed to create task"**
- Ensure database has required properties (Name, Status, Date, Mood, Energy)
- Check property types match (Status = Select, Energy = Number)
- Verify API key has write permissions

**"Couldn't find task to complete"**
- Task name must match (case-insensitive)
- Task must have Status = "todo" or "In Progress"
- Try rephrasing the task name

### General Issues

**Session not saving?**
- Check backend logs for `save_wellness_checkin()` call
- Verify file permissions on `wellness_log.json`

**Stats not updating?**
- Check browser console for API errors
- Verify `/api/wellness-sessions` route is accessible
- Refresh the page

**UI looks broken?**
- Clear browser cache
- Check for console errors
- Verify all dependencies installed (`pnpm install`)

## 📚 Resources

- [Notion API Documentation](https://developers.notion.com/reference/intro)
- [LiveKit Function Tools](https://docs.livekit.io/agents/build/tools/)
- [httpx Documentation](https://www.python-httpx.org/)
- [Framer Motion](https://www.framer.com/motion/)

## 🚀 Future Enhancements

### Potential Additions
- 📊 Mood trends visualization
- 🎯 Goal completion tracking
- 📝 Journal entries
- 🔔 Reminder notifications
- 🌍 Multi-language support
- 📱 Mobile app version
- 🏆 Achievements and milestones
- 🤝 Shared accountability
- 📈 Insights and patterns
- 🎨 Customizable themes

## 📝 License

MIT License - See [LICENSE](./LICENSE) file

## 🙏 Acknowledgments

Built for the **Murf AI Voice Agents Challenge**
- Day 3 Challenge: Health & Wellness Companion
- Powered by: Murf Falcon TTS, LiveKit, Google Gemini, Deepgram, Notion API

---

<div align="center">

### 🌱 Your Wellness Journey with Notion Integration 🌱

**Previous:** [Day 2 - Falcon Brew Barista](../Day2/) | **Next:** Day 4 (Coming Soon)

⭐ **Star this repo if you're following along!** ⭐

</div>
