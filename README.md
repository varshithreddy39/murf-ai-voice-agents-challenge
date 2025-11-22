# 🎙️ Murf AI Voice Agents Challenge

> Building **10 AI Voice Agents in 10 Days** using Murf Falcon TTS - the consistently fastest text-to-speech API in the world.

[![Challenge](https://img.shields.io/badge/Challenge-10%20Days%20of%20AI%20Voice%20Agents-blue?style=for-the-badge)](https://murf.ai)
[![TTS](https://img.shields.io/badge/TTS-Murf%20Falcon-FF6B35?style=for-the-badge&logo=audio)](https://murf.ai/api)
[![Framework](https://img.shields.io/badge/Framework-LiveKit-00D4AA?style=for-the-badge)](https://livekit.io)
[![Python](https://img.shields.io/badge/Python-3.9+-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://python.org)
[![Next.js](https://img.shields.io/badge/Next.js-15-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org)

## 🌟 About This Challenge

Welcome to my journey through the **Murf AI Voice Agents Challenge**! Over 10 days, I'm building 10 unique AI voice agents, each with distinct personas, capabilities, and real-world applications. This challenge showcases the power of combining cutting-edge AI technologies to create natural, responsive voice interactions.

### 🛠️ Tech Stack

| Technology | Purpose | Why This Choice |
|------------|---------|-----------------|
| **🎯 Murf Falcon TTS** | Text-to-Speech | Consistently fastest TTS API with natural-sounding voices |
| **� LiveKi*t** | Real-time Communication | Self-hosted, low-latency voice infrastructure |
| **🧠 Google Gemini 2.5 Flash** | Language Model | Fast, intelligent conversational AI |
| **🎤 Deepgram Nova-3** | Speech-to-Text | High-accuracy, real-time transcription |
| **⚛️ Next.js 15** | Frontend Framework | Modern, performant React framework with Turbopack |
| **🐍 Python 3.12** | Backend Runtime | Robust agent framework with LiveKit SDK |

### ✨ Key Features

- 🚀 **Ultra-fast responses** with Murf Falcon's industry-leading TTS speed
- 🏠 **Self-hosted LiveKit** for complete control and privacy
- 🎨 **Beautiful UI** with dark/light themes and smooth animations
- 🔇 **Noise cancellation** for crystal-clear conversations
- 🎯 **Smart turn detection** that understands conversation context
- 📊 **Real-time audio visualization** and level monitoring
- 📹 **Video & screen sharing** support built-in

## 📁 Repository Structure

```
murf-ai-voice-agents-challenge/
├── Day1/                           # Day 1: Basic Voice Agent Setup
│   ├── backend/                   # Python backend with LiveKit Agents
│   │   ├── src/
│   │   │   └── agent.py          # Main agent implementation
│   │   ├── .env                   # API keys (not in git)
│   │   ├── pyproject.toml         # Python dependencies
│   │   └── README.md              # Backend documentation
│   ├── frontend/                  # React/Next.js voice interface
│   │   ├── app/                   # Next.js app directory
│   │   ├── components/            # React components
│   │   ├── .env.local             # Frontend config (not in git)
│   │   ├── package.json           # Node dependencies
│   │   └── README.md              # Frontend documentation
│   └── challenges/                # Day 1 task description
├── Day2/                          # Coming soon...
├── Day3/                          # Coming soon...
├── ...                            # Days 4-10
├── LICENSE                        # MIT License
├── README.md                      # This file
└── .gitignore                     # Git ignore rules
```

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                         Browser                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         Next.js Frontend (Port 3000)                │   │
│  │  • Voice UI • Audio Visualization • Controls        │   │
│  └─────────────────────────────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ WebRTC
                         ▼
┌─────────────────────────────────────────────────────────────┐
│         Local LiveKit Server (Port 7880)                    │
│  • WebRTC Signaling • Media Routing • Room Management      │
└────────────────────────┬────────────────────────────────────┘
                         │ LiveKit Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Python Backend Agent                           │
│  ┌─────────────┐  ┌──────────────┐  ┌─────────────────┐   │
│  │  Deepgram   │→ │ Google Gemini│→ │  Murf Falcon    │   │
│  │  (STT)      │  │    (LLM)     │  │    (TTS)        │   │
│  └─────────────┘  └──────────────┘  └─────────────────┘   │
│         Speech → Text → AI Response → Natural Voice        │
└─────────────────────────────────────────────────────────────┘
```

**Flow:**
1. User speaks → Frontend captures audio
2. Audio streams to LiveKit server via WebRTC
3. Backend agent receives audio → Deepgram transcribes to text
4. Text sent to Gemini → AI generates response
5. Response sent to Murf Falcon → Converts to natural speech
6. Audio streams back through LiveKit → User hears response

**All running locally on your machine!** 🏠

## 🎯 Challenge Progress

| Day | Challenge | Status | Demo |
|-----|-----------|--------|------|
| 1 | Get Starter Voice Agent Running | ✅ Complete | [Link](#) |
| 2 | TBD | 🔄 In Progress | - |
| 3 | TBD | ⏳ Upcoming | - |
| 4 | TBD | ⏳ Upcoming | - |
| 5 | TBD | ⏳ Upcoming | - |
| 6 | TBD | ⏳ Upcoming | - |
| 7 | TBD | ⏳ Upcoming | - |
| 8 | TBD | ⏳ Upcoming | - |
| 9 | TBD | ⏳ Upcoming | - |
| 10 | TBD | ⏳ Upcoming | - |

## 🏃 Quick Start Guide

### 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Python 3.9+** - [Download](https://python.org)
- **uv** (Python package manager) - [Install Guide](https://docs.astral.sh/uv/)
- **Node.js 18+** - [Download](https://nodejs.org)
- **pnpm** - Install via `npm install -g pnpm` or `brew install pnpm`
- **LiveKit Server** - Install via `brew install livekit` (macOS) or [other platforms](https://docs.livekit.io/home/self-hosting/local/)

### 🚀 Installation & Setup

#### Step 1: Clone the Repository
```bash
git clone https://github.com/varshithreddy39/murf-ai-voice-agents-challenge.git
cd murf-ai-voice-agents-challenge/Day1
```

#### Step 2: Backend Configuration
```bash
cd backend

# Install Python dependencies
uv sync

# Create environment file
cp .env.example .env

# Edit .env and add your API keys:
# LIVEKIT_URL=ws://127.0.0.1:7880
# LIVEKIT_API_KEY=devkey
# LIVEKIT_API_SECRET=secret
# MURF_API_KEY=your_murf_api_key
# DEEPGRAM_API_KEY=your_deepgram_api_key
# GOOGLE_API_KEY=your_google_api_key

# Download required AI models (VAD, turn detector)
uv run python src/agent.py download-files
```

#### Step 3: Frontend Configuration
```bash
cd ../frontend

# Install Node dependencies
pnpm install

# Create environment file
cp .env.example .env.local

# Edit .env.local with local LiveKit credentials:
# LIVEKIT_API_KEY=devkey
# LIVEKIT_API_SECRET=secret
# LIVEKIT_URL=ws://127.0.0.1:7880
```

#### Step 4: Launch the Application

Open **three separate terminals** and run:

**Terminal 1 - Start Local LiveKit Server:**
```bash
livekit-server --dev
```
This starts LiveKit on `ws://127.0.0.1:7880` with default dev credentials.

**Terminal 2 - Start Backend Agent:**
```bash
cd Day1/backend
uv run python src/agent.py dev
```
The agent will connect to LiveKit and wait for voice sessions.

**Terminal 3 - Start Frontend:**
```bash
cd Day1/frontend
pnpm dev
```
Frontend will be available at `http://localhost:3000`

#### Step 5: Test Your Voice Agent! 🎉

1. Open your browser to **http://localhost:3000**
2. Click **"Start call"** button
3. Allow microphone permissions
4. Start talking with your AI voice agent!

> **💡 Tip:** Make sure all three services are running before starting a conversation.

## 🔑 API Keys Setup

### Required API Keys

| Service | Purpose | How to Get |
|---------|---------|------------|
| **Murf Falcon** | Ultra-fast text-to-speech | [Sign up at Murf AI](https://murf.ai/api) → Get API key |
| **Deepgram** | Speech-to-text transcription | [Create account](https://deepgram.com) → Generate API key |
| **Google Gemini** | Conversational AI brain | [Google AI Studio](https://aistudio.google.com/app/apikey) → Create API key |
| **LiveKit** | Real-time communication | **Local mode:** Use `devkey` / `secret` (no signup needed!) |

### Local LiveKit Setup (No Cloud Required!)

This project uses **self-hosted LiveKit** running locally on your machine:

```bash
# Install LiveKit server
brew install livekit  # macOS
# For other platforms: https://docs.livekit.io/home/self-hosting/local/

# Run in dev mode (uses default credentials)
livekit-server --dev
```

**Default Local Credentials:**
- URL: `ws://127.0.0.1:7880`
- API Key: `devkey`
- API Secret: `secret`

No cloud account or credit card needed! 🎉

## 📚 Day-by-Day Journey

### Day 1: Foundation - Basic Voice Agent ✅

**Challenge:** Get the starter voice agent running end-to-end

**What I Built:**
- ✅ Set up local LiveKit server for self-hosted voice infrastructure
- ✅ Configured Python backend with LiveKit Agents framework
- ✅ Integrated Murf Falcon TTS for lightning-fast voice synthesis
- ✅ Connected Deepgram Nova-3 for accurate speech recognition
- ✅ Implemented Google Gemini 2.5 Flash for intelligent conversations
- ✅ Built responsive React/Next.js frontend with beautiful UI
- ✅ Added noise cancellation and smart turn detection
- ✅ Successfully tested end-to-end voice conversation

**Tech Highlights:**
- Voice pipeline latency: < 500ms (thanks to Murf Falcon!)
- Self-hosted architecture for complete control
- Production-ready setup with metrics and logging

**Demo:** [Watch on LinkedIn](#) | [View Code](./Day1/)

[📖 View Day 1 Full Details →](./https://github.com/varshithreddy39/murf-ai-voice-agents-challenge/tree/main/Day1)

---

### Day 2-10: Coming Soon... 🚀

Each day will bring new challenges and capabilities:
- Custom personas and conversation styles
- Domain-specific agents (customer service, tutoring, etc.)
- Tool integration and function calling
- Multi-language support
- Advanced voice controls
- And much more!

**Follow along for daily updates!**

## 🎥 Demo Videos

- [Day 1 Demo - LinkedIn Post](#)

## 🎯 Current Features

### Voice Intelligence
- ⚡ **Ultra-fast TTS** - Murf Falcon delivers consistently fastest response times
- � **Higxh-accuracy STT** - Deepgram Nova-3 for precise transcription
- 🧠 **Smart conversations** - Google Gemini 2.5 Flash for natural dialogue
- 🎯 **Context-aware turns** - Multilingual turn detector knows when to respond
- � **Noise caancellation** - Crystal-clear audio even in noisy environments

### User Experience
- 🎨 **Beautiful UI** - Modern, responsive design with smooth animations
- 🌓 **Dark/Light themes** - Automatic system preference detection
- 📊 **Audio visualization** - Real-time waveform and level monitoring
- 📹 **Video support** - Optional camera streaming
- 🖥️ **Screen sharing** - Share your screen during conversations
- 📱 **Mobile responsive** - Works great on all devices

### Developer Experience
- 🏠 **Self-hosted** - Complete control with local LiveKit server
- 📈 **Metrics & logging** - Built-in performance monitoring
- 🧪 **Testing framework** - Comprehensive test suite included
- 🐳 **Docker ready** - Production deployment made easy
- 📚 **Well documented** - Clear setup and customization guides

## 📖 Documentation & Resources

### Project Documentation
- 📘 [Backend Setup & API](./Day1/backend/README.md) - Python agent implementation details
- 📗 [Frontend Guide](./Day1/frontend/README.md) - React/Next.js customization
- 📋 [Day 1 Challenge Task](./Day1/challenges/Day%201%20Task.md) - Complete task description

### External Resources
- 🎯 [Murf Falcon TTS API](https://murf.ai/api/docs/text-to-speech/streaming) - Fastest TTS documentation
- 🔊 [LiveKit Agents Framework](https://docs.livekit.io/agents) - Voice AI development guide
- 🏠 [Self-hosting LiveKit](https://docs.livekit.io/home/self-hosting/local/) - Local server setup
- 🎤 [Deepgram API](https://developers.deepgram.com/) - Speech-to-text docs
- 🧠 [Google Gemini](https://ai.google.dev/gemini-api/docs) - LLM integration guide

### Helpful Tutorials
- [Building Voice Agents](https://docs.livekit.io/agents/start/voice-ai/) - Step-by-step guide
- [Testing Voice Agents](https://docs.livekit.io/agents/build/testing/) - Quality assurance
- [Production Deployment](https://docs.livekit.io/agents/ops/deployment/) - Going live

## 🤝 Connect & Follow Along

Are you participating in the challenge too? Let's connect and share our learnings!

### Find Me On
- 💼 **LinkedIn:** [Varshith Reddy](https://linkedin.com/in/varshithreddy39)
- 🐙 **GitHub:** [@varshithreddy39](https://github.com/varshithreddy39)

### Challenge Hashtags
When sharing your progress, use these hashtags:
- `#MurfAIVoiceAgentsChallenge`
- `#10DaysofAIVoiceAgents`
- Tag **@Murf AI** in your posts!

### Community
- 💬 [LiveKit Community Slack](https://livekit.io/join-slack) - Get help and share ideas
- 🎯 [Murf AI Community](#) - Connect with other challenge participants

---

## 🐛 Troubleshooting

<details>
<summary><b>LiveKit server won't start</b></summary>

Make sure port 7880 is not already in use:
```bash
lsof -i :7880
# Kill any process using the port
kill -9 <PID>
```
</details>

<details>
<summary><b>Backend can't find API keys</b></summary>

Ensure your `.env` file is in the `Day1/backend/` directory and contains all required keys. The file should NOT be named `.env.local` for the backend.
</details>

<details>
<summary><b>Frontend connection fails</b></summary>

1. Verify LiveKit server is running: `lsof -i :7880`
2. Check backend agent is connected (look for "registered worker" in logs)
3. Ensure `.env.local` has correct credentials matching LiveKit server
</details>

<details>
<summary><b>No audio output</b></summary>

1. Check browser microphone permissions
2. Verify Murf API key is valid
3. Look for errors in browser console (F12)
4. Ensure backend logs show successful TTS synthesis
</details>

Need more help? Open an [issue](https://github.com/varshithreddy39/murf-ai-voice-agents-challenge/issues) or reach out on LinkedIn!

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Murf AI](https://murf.ai) for organizing this amazing challenge
- [LiveKit](https://livekit.io) for the excellent voice AI framework
- The open-source community for the starter templates

---

## 🚀 Want to Try This Yourself?

1. **Star this repo** ⭐ to follow along with the challenge
2. **Fork it** to create your own version
3. **Clone and run** following the Quick Start guide above
4. **Share your progress** on LinkedIn with the challenge hashtags!

## 📝 Contributing

Found a bug or have a suggestion? Feel free to:
- Open an [issue](https://github.com/varshithreddy39/murf-ai-voice-agents-challenge/issues)
- Submit a pull request
- Share your improvements!

---

<div align="center">

### Built with ❤️ as part of the Murf AI Voice Agents Challenge

**Powered by:** [Murf Falcon](https://murf.ai) • [LiveKit](https://livekit.io) • [Deepgram](https://deepgram.com) • [Google Gemini](https://ai.google.dev)

⭐ **Star this repo if you're following along!** ⭐

</div>
