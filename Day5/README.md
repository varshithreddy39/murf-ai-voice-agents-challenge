# Day 5: Zoho CRM SDR - Enterprise Sales Assistant 💼

> **Challenge:** Build a professional SDR (Sales Development Representative) that qualifies leads through natural, proactive conversations and automatically captures prospect information!

[![Day 5](https://img.shields.io/badge/Day-5%2F10-blue?style=for-the-badge)](https://murf.ai)
[![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)](.)
[![Voice AI](https://img.shields.io/badge/Voice-AI-purple?style=for-the-badge)](.)

## � Challenge Overview

Create an AI sales assistant that acts like a real SDR - not just answering questions, but actively guiding conversations to qualify leads. The agent should:
- Proactively ask qualifying questions
- Calculate pricing based on team size
- Capture complete lead information
- Save qualified leads to a database
- Provide a premium, enterprise-grade user experience

The goal: Transform passive chatbot interactions into active sales conversations!

## ✨ What's New in Day 5

### Backend Features
- **Proactive SDR Personality**: Guides conversations instead of just responding
- **Lead Qualification Flow**: Systematic capture of name, company, team size, pain points, email
- **Smart Pricing Calculator**: Calculates costs based on team size (e.g., 200 users × ₹1,400 = ₹2,80,000/month)
- **Function Tool**: `save_lead_data()` - Saves qualified leads with comprehensive error handling
- **Product Knowledge Base**: Loaded with Zoho CRM features, pricing tiers, and FAQs (zoho_crm_faq.json)
- **Energetic Voice**: Murf Terrell voice with Promo style for enthusiastic sales tone
- **AssemblyAI Integration**: Accurate speech recognition for better lead capture
- **Comprehensive Logging**: Emoji-based logs (🔥 📝 ✅ ❌) for easy debugging
- **Lead Persistence**: JSON database with atomic writes and verification

### Frontend Features
- **Enterprise-Grade UI**: Professional dark theme with premium feel
- **Glassmorphism**: Modern frosted glass effects throughout
- **Speech Bubbles**: WhatsApp-style chat with authentic bubble tails
- **Animated Background**: 
  - Floating gradient orbs with independent movement
  - 20 particle effects with seeded random
  - Subtle grid overlay for depth
- **Status Indicator**: "Zoho CRM Assistant - LIVE" badge with pulsing green dot
- **Advanced Animations**:
  - Spring physics for natural movement
  - Staggered entrance animations
  - Hover effects with shine overlays
  - GPU-accelerated transforms
- **Lead Summary Card**: Displays captured leads with download option
- **Professional Branding**: Gradient logo with rotating glow effect

### Zoho CRM Knowledge
- ✅ **Pricing Tiers**: Free, Standard (₹800), Professional (₹1,400), Enterprise (₹2,400), Ultimate (₹2,600)
- ✅ **Key Features**: Lead management, Sales automation, Workflow automation, AI assistant (Zia), Omnichannel
- ✅ **Integrations**: Gmail, Microsoft 365, WhatsApp, Slack
- ✅ **Free Trial**: 15-day trial + free plan for up to 3 users

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Port 3000)                      │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Enterprise Sales Interface                         │  │
│  │  • Animated Welcome Screen                          │  │
│  │  • Speech Bubble Chat                               │  │
│  │  • Live Status Indicator                            │  │
│  │  • Lead Summary Card                                │  │
│  │  • Glassmorphic Control Bar                         │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │ WebRTC + LiveKit Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Python SDR Agent                               │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  SDR Personality (Proactive)                        │  │
│  │  • Greets warmly                                    │  │
│  │  • Asks qualifying questions                        │  │
│  │  • Calculates pricing                               │  │
│  │  • Captures email at right moment                   │  │
│  │  • Creates urgency & value                          │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Function Tool                                       │  │
│  │  • save_lead_data() - Captures & persists leads    │  │
│  │    - name, email, company, team_size               │  │
│  │    - current_crm, pain_points                      │  │
│  │    - timestamp, room_id                            │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Knowledge Base (zoho_crm_faq.json)                │  │
│  │  • Product information                              │  │
│  │  • Pricing tiers (₹800 - ₹2,600)                   │  │
│  │  • Features & integrations                          │  │
│  │  • FAQs & objection handling                        │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Lead Database (lead_data.json)                     │  │
│  │  • Saved qualified leads                            │  │
│  │  • Timestamp tracking                               │  │
│  │  • Atomic writes with verification                  │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Python 3.12+ with uv
- Node.js 18+ with npm/pnpm
- LiveKit Server
- API Keys:
  - [AssemblyAI](https://www.assemblyai.com/) (Speech-to-text)
  - [Google AI Studio](https://aistudio.google.com/) (Gemini 2.5 Flash)
  - [Murf AI](https://murf.ai/) (Terrell voice, Promo style)

### Installation

1. **Clone and navigate**
```bash
cd Day5
```

2. **Backend setup**
```bash
cd backend

# Install dependencies
uv sync

# Configure environment
cp .env.example .env

# Edit .env and add:
# LIVEKIT_URL=ws://127.0.0.1:7880
# LIVEKIT_API_KEY=devkey
# LIVEKIT_API_SECRET=secret
# ASSEMBLYAI_API_KEY=your_key_here
# GOOGLE_API_KEY=your_key_here
# MURF_API_KEY=your_key_here
```

3. **Frontend setup**
```bash
cd ../frontend

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local

# Edit .env.local with LiveKit credentials
```

4. **Launch the application**

Open **three terminals**:

**Terminal 1 - LiveKit Server:**
```bash
livekit-server --dev
```

**Terminal 2 - Backend Agent:**
```bash
cd Day5/backend
uv run python src/agent.py dev
```

**Terminal 3 - Frontend:**
```bash
cd Day5/frontend
npm run dev
```

5. **Start selling!** 🎉
- Open http://localhost:3000
- Click "Start call"
- Have a natural sales conversation
- Watch leads get captured automatically!

## 💬 Example Conversation Flow

```
Agent: "Hi! I'm your Zoho CRM sales assistant. Great to connect with you! 
        Are you currently looking for a CRM solution?"

You: "Yes, I need a CRM for my company"

Agent: "That's great! Before I share how we can help, may I ask - 
        what's your name and which company are you with?"

You: "I'm John from Adani"

Agent: "Perfect, John! How large is your sales team at Adani? 
        This helps me show you the most relevant features."

You: "We have about 200 people"

Agent: "Excellent! For a team of 200, you'd really benefit from our 
        enterprise features. Are you currently using any CRM?"

You: "We use Salesforce but it's slow"

Agent: "I understand. What are the biggest challenges you're facing 
        with managing customer relationships right now?"

You: "Lead tracking is difficult and we need better automation"

Agent: "Thanks for sharing that. With Zoho CRM, for a team of 200 like yours, 
        our advanced lead management gives you real-time visibility. Our workflow 
        automation can save each rep up to 2 hours daily! For your team size, 
        the Professional plan would be around ₹2,80,000 per month. 
        What's the best email to send you a detailed proposal?"

You: "john@adani.com"

Agent: "Perfect! Let me save your information right now."
[🔥 SAVING LEAD DATA - automatically captured!]

Agent: "Great! I've saved your details, John. You should receive the proposal 
        at john@adani.com shortly. I'll also include details about our special 
        onboarding offer this month!"
```

## 📁 Project Structure

```
Day5/
├── backend/
│   ├── src/
│   │   ├── agent.py              # SDR agent with proactive personality
│   │   └── zoho_crm_faq.json     # Product knowledge base
│   ├── lead_data.json            # Saved leads database
│   ├── test_lead_save.py         # Test script for lead saving
│   ├── .env                      # API keys (not in git)
│   ├── pyproject.toml            # Python dependencies
│   └── README.md                 # Backend docs
│
├── frontend/
│   ├── app/
│   │   ├── page.tsx              # Main app page
│   │   └── api/
│   │       ├── connection-details/  # LiveKit connection
│   │       └── lead-data/           # Lead data API
│   ├── components/
│   │   ├── app/
│   │   │   ├── welcome-view.tsx         # Animated landing page
│   │   │   ├── session-view.tsx         # Chat interface
│   │   │   ├── ParticleBackground.tsx   # Floating particles
│   │   │   ├── LeadSummaryCard.tsx      # Lead display
│   │   │   ├── MicAnimation.tsx         # Microphone animation
│   │   │   ├── FeatureChips.tsx         # Feature pills
│   │   │   └── QuickFAQSection.tsx      # FAQ display
│   │   └── livekit/
│   │       ├── chat-entry.tsx           # Speech bubble component
│   │       └── agent-control-bar/       # Control bar
│   ├── .env.local                # Frontend config (not in git)
│   ├── package.json              # Node dependencies
│   └── README.md                 # Frontend docs
│
├── start_app.sh                  # Launch script
├── LICENSE                       # MIT License
└── README.md                     # This file
```

## 🎨 UI Features Showcase

### Welcome Screen
- **Animated Logo**: Pulsing rings with rotating glow effect
- **Gradient Text**: Shimmer animation on title
- **CTA Button**: Shimmer sweep effect with hover gradient
- **Feature Pills**: Spring bounce entrance with icon wiggle
- **Particle Background**: 20 floating particles with random paths
- **Professional Footer**: Decorative gradient lines

### Chat Interface
- **Speech Bubbles**: Authentic WhatsApp-style with tails
- **Glassmorphic Bar**: Frosted glass control panel
- **Status Indicator**: "Zoho CRM Assistant - LIVE" with pulsing dot
- **Hover Effects**: Scale + shine overlay on messages
- **Smooth Transitions**: 300-500ms with spring physics

### Color Palette
- **Primary**: Blue (#3B82F6) → Purple (#9333EA)
- **Background**: Slate 900 (#0F172A) → Blue 900 (#1E3A8A)
- **Accents**: Emerald (#4ADE80), Cyan (#06B6D4), Pink (#EC4899)
- **Status**: Emerald 400 for live indicator

## 🔧 Customization

### Change Voice
Edit `backend/src/agent.py` around line 220:

```python
tts=murf.TTS(
    voice="en-US-terrell",  # Options: matthew, natalie, clint, marcus
    style="Promo",          # Options: Conversation, Narration, Newscast
    tokenizer=tokenize.basic.SentenceTokenizer(min_sentence_len=2),
    text_pacing=True
)
```

**Voice Options:**
- `matthew` - Warm, conversational (default)
- `terrell` - Energetic, professional ⭐ (current)
- `clint` - Deep, authoritative
- `marcus` - Smooth, confident
- `natalie` - Professional, friendly

**Style Options:**
- `Conversation` - Natural, casual
- `Promo` - Enthusiastic, sales-focused ⭐ (current)
- `Narration` - Clear, storytelling
- `Newscast` - Professional, authoritative

### Modify Agent Personality
Edit the `instructions` variable in `backend/src/agent.py` to customize:
- Greeting style
- Qualification questions
- Tone and language
- Closing techniques
- Urgency creation

### Customize UI Theme
Edit colors in `frontend/tailwind.config.ts` and component files:
- Change gradient colors
- Adjust animation speeds
- Modify particle count
- Update status bar colors

## 📊 Lead Data Format

Leads are saved to `backend/lead_data.json`:

```json
{
  "leads": [
    {
      "name": "John Smith",
      "email": "john@adani.com",
      "company": "Adani",
      "team_size": "200",
      "current_crm": "Salesforce",
      "pain_points": "Lead tracking issues, need better automation",
      "timestamp": "2025-11-26T17:15:30.123456",
      "room_id": "voice_assistant_room_123"
    }
  ],
  "lastUpdated": "2025-11-26T17:15:30.123456"
}
```

## 🐛 Troubleshooting

### Lead Not Saving

**Check backend logs for:**
- 🔥 "SAVING LEAD DATA" - Function was called
- 📝 "Lead data prepared" - Data structure created
- 📂 "Loaded existing data" - File read successfully
- ✅ "Successfully saved" - Write successful
- 📁 "File location" - Where file is saved

**Common issues:**
1. Agent not calling function - Provide all 4 required fields (name, company, team_size, email)
2. File permissions - Check write access to `backend/lead_data.json`
3. JSON syntax error - Verify file format

**Test lead saving:**
```bash
cd Day5/backend
python test_lead_save.py
```

### Backend Won't Start

```bash
# Check Python version
python --version  # Need 3.12+

# Reinstall dependencies
cd Day5/backend
uv sync --reinstall
```

### API Key Errors
- Verify all keys in `.env` are valid
- Check for extra spaces or quotes
- Ensure keys have proper permissions
- Test keys individually

### Frontend Errors

```bash
# Clear cache and reinstall
cd Day5/frontend
rm -rf .next node_modules
npm install
npm run dev
```

### Hydration Errors
- ParticleBackground uses seeded random (fixed)
- Clear browser cache
- Restart dev server

## 📚 Additional Documentation

- `UI_IMPROVEMENTS.md` - Detailed UI changes and animations
- `SDR_AGENT_GUIDE.md` - Agent behavior and conversation flow
- `VOICE_OPTIONS.md` - Voice configuration guide
- `LEAD_SAVING_DEBUG.md` - Lead saving troubleshooting
- `FIXES_SUMMARY.md` - Recent fixes and improvements
- `MINIMAL_UI_POLISH.md` - UI polish details

## 🎯 Key Learnings

### Technical
- Function calling with LiveKit Agents
- Proactive conversation design
- Lead qualification systems
- JSON persistence with atomic writes
- Glassmorphism and modern UI patterns
- Spring physics animations
- SSR/hydration compatibility

### AI/UX
- SDR personality vs chatbot behavior
- When to ask for email (timing is key!)
- Creating urgency without being pushy
- Calculating pricing on the fly
- Building rapport before closing

### Best Practices
- Comprehensive error handling
- Emoji-based logging for debugging
- Seeded random for SSR compatibility
- GPU-accelerated animations
- Atomic file writes with verification

## 🚀 What's Next?

Potential enhancements:
- CRM integration (Salesforce, HubSpot)
- Email automation (send proposals)
- Calendar integration (book demos)
- Multi-language support
- Voice analytics dashboard
- A/B testing different personalities

## 📄 License

MIT License - Copyright (c) 2025-2026 Venkata Varshith Reddy Mettukuru

## � Acknowleadgments

Built with:
- [LiveKit](https://livekit.io/) - Real-time communication
- [AssemblyAI](https://www.assemblyai.com/) - Speech-to-text
- [Google Gemini](https://deepmind.google/technologies/gemini/) - LLM
- [Murf AI](https://murf.ai/) - Text-to-speech
- [Next.js](https://nextjs.org/) - React framework
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [TailwindCSS](https://tailwindcss.com/) - Styling

---

<div align="center">

**🎓 Day 5 of 10 Complete! 🎉**

**Built with ❤️ for the Murf AI Voice Agents Challenge**

[← Day 4](../Day4) | [Main README](../README.md) | [Day 6 →](../Day6)

</div>
