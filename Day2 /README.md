# Day 2: Byte & Brew Cafe - AI Barista Voice Agent ☕

> **Challenge:** Build a coffee shop barista voice agent that takes orders naturally through conversation

[![Day 2](https://img.shields.io/badge/Day-2%2F10-blue?style=for-the-badge)](https://murf.ai)
[![Status](https://img.shields.io/badge/Status-Complete-success?style=for-the-badge)](.)

## 🎯 Challenge Overview

Transform the basic voice agent into a specialized **AI Barista** that can:
- Take coffee orders through natural conversation
- Track order details (drink type, size, milk preference, extras, customer name)
- Provide real-time visual feedback of the order being built
- Generate professional order receipts
- Deliver a delightful coffee shop experience

## ✨ What's New in Day 2

### Backend Enhancements
- **Barista Persona**: Friendly coffee shop assistant with natural conversation flow
- **Order State Management**: Tracks drink type, size, milk, extras, and customer name
- **Function Tool**: `save_order()` tool for finalizing orders
- **Order Persistence**: Saves orders as JSON files with timestamps
- **Receipt Generation**: Automatic receipt display after order completion

### Frontend Features
- **Live Order Display**: Real-time visualization of order being built
- **Progress Tracking**: Shows completion status (e.g., "3/5 items collected")
- **Coffee Visualizer**: Animated coffee cup with realistic drink colors
- **Empty State Placeholders**: Clear indication of missing information
- **Order Receipt**: Professional receipt page with print functionality
- **Toast Notifications**: Confirmation messages when order is complete
- **Coffee-Themed UI**: Warm colors and coffee shop aesthetics

### UI/UX Improvements
- ☕ Coffee-themed color palette (browns, creams, warm tones)
- 📊 Progress bar showing order completion
- 🎨 Realistic coffee colors based on drink type
- ✨ Smooth animations and transitions
- 💬 Enhanced chat transcript styling
- 🧾 Premium receipt design
- 📱 Mobile-responsive layout
- 🖨️ Print-optimized receipt format

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Browser (Port 3000)                      │
│  ┌──────────────────┐  ┌──────────────────────────────┐   │
│  │  Chat Interface  │  │  Live Order Display          │   │
│  │  • Voice input   │  │  • Drink type                │   │
│  │  • Transcript    │  │  • Size                      │   │
│  │  • Audio viz     │  │  • Milk preference           │   │
│  └──────────────────┘  │  • Extras                    │   │
│                        │  • Customer name             │   │
│                        │  • Progress: 4/5 ✓           │   │
│                        └──────────────────────────────┘   │
└────────────────────────┬────────────────────────────────────┘
                         │ WebRTC + LiveKit Protocol
                         ▼
┌─────────────────────────────────────────────────────────────┐
│              Python Barista Agent                           │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Order State Management                              │  │
│  │  • Tracks: drink, size, milk, extras, name          │  │
│  │  • Validates completeness                           │  │
│  │  • Saves to JSON when complete                      │  │
│  └──────────────────────────────────────────────────────┘  │
│  ┌──────────────────────────────────────────────────────┐  │
│  │  Function Tool: save_order()                         │  │
│  │  • Called when all info collected                   │  │
│  │  • Generates order ID with timestamp                │  │
│  │  • Saves to orders/ directory                       │  │
│  │  • Triggers receipt display                         │  │
│  └──────────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

## 🚀 Quick Start

### Prerequisites
Same as Day 1:
- Python 3.9+ with uv
- Node.js 18+ with pnpm
- LiveKit Server

### Setup & Run

```bash
# Navigate to Day 2
cd "Day2 "

# Backend setup (if not already done)
cd backend
uv sync
cp .env.example .env
# Add your API keys to .env
uv run python src/agent.py download-files

# Frontend setup (if not already done)
cd ../frontend
pnpm install
cp .env.example .env.local
# Add LiveKit credentials to .env.local

# Run everything (from Day2 directory)
cd ..
chmod +x start_app.sh
./start_app.sh
```

Or run services individually:
```bash
# Terminal 1 - LiveKit Server
livekit-server --dev

# Terminal 2 - Barista Agent
cd "Day2 /backend"
uv run python src/agent.py dev

# Terminal 3 - Frontend
cd "Day2 /frontend"
pnpm dev
```

Open http://localhost:3000 and start ordering coffee! ☕

## 🎭 How It Works

### Conversation Flow

1. **Greeting**: Agent welcomes you to Falcon Brew
2. **Order Collection**: Agent asks for:
   - Drink type (latte, cappuccino, americano, mocha, etc.)
   - Size (small, medium, large)
   - Milk preference (whole, skim, oat, almond, soy, coconut)
   - Extras (optional: whipped cream, extra shot, caramel drizzle, etc.)
   - Customer name
3. **Confirmation**: Agent confirms the complete order
4. **Receipt**: Professional receipt automatically displays
5. **Completion**: Order saved to `backend/orders/` directory

### Example Conversation

```
Agent: "Welcome to Falcon Brew! What can I get started for you today?"
You: "I'd like a latte please"
Agent: "Great choice! What size would you like?"
You: "Medium"
Agent: "Perfect! What type of milk?"
You: "Oat milk"
Agent: "Would you like any extras like whipped cream or an extra shot?"
You: "No thanks"
Agent: "And what name should I put on the order?"
You: "Alex"
Agent: "Awesome! One medium oat milk latte for Alex. Let me get that started!"
[Receipt automatically displays]
```

## 📁 Project Structure

```
Day2/
├── backend/
│   ├── src/
│   │   └── agent.py              # Barista agent with order management
│   ├── orders/                   # Saved orders (JSON files)
│   │   └── order_*.json         # Individual order files
│   └── .env                      # API keys
├── frontend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── latest-order/    # API to fetch latest order
│   │   │   └── receipt/         # API to fetch order by ID
│   │   └── receipt/
│   │       └── [orderId]/       # Receipt page
│   ├── components/
│   │   └── app/
│   │       ├── session-view.tsx        # Main session container
│   │       ├── chat-transcript.tsx     # Enhanced chat UI
│   │       ├── order-display.tsx       # Live order tracking
│   │       ├── beverage-visualizer.tsx # Coffee cup animation
│   │       ├── receipt-view.tsx        # Receipt component
│   │       └── tile-layout.tsx         # Layout with visualizer
│   ├── hooks/
│   │   ├── useOrderState.ts     # Order state management
│   │   └── useLatestOrder.ts    # Fetch latest order
│   └── .env.local               # LiveKit config
└── start_app.sh                 # Launch script
```

## 🎨 Key Features Explained

### 1. Live Order Display
Shows order details as they're collected:
- ✅ Filled items: Solid background with checkmark
- ⏳ Pending items: Dashed border with "Waiting..." text
- 📊 Progress bar: Visual completion indicator
- 🎯 Counter: "3/5 items collected"

### 2. Coffee Visualizer
Animated coffee cup that:
- Changes color based on drink type
- Pulses gently during order collection
- Shows realistic coffee colors (latte, cappuccino, americano, etc.)
- Stops pulsing when order is complete

### 3. Order Receipt
Professional receipt with:
- Order number (last 4 digits of timestamp)
- Customer name
- Complete drink details
- Add-ons list
- Timestamp
- Print button
- Dark mode support
- Mobile responsive

### 4. Chat Transcript
Enhanced with:
- Coffee-themed colors
- Better message bubbles
- User/Agent avatars
- Smooth animations
- Improved readability

## 🛠️ Technical Implementation

### Backend: Order State Management

```python
@dataclass
class OrderState:
    drinkType: Optional[str] = None
    size: Optional[str] = None
    milk: Optional[str] = None
    extras: Optional[list[str]] = None
    name: Optional[str] = None
    
    def is_complete(self) -> bool:
        return all([self.drinkType, self.size, self.milk, self.name])
```

### Backend: Function Tool

```python
@function_tool
async def save_order(
    drink_type: str,
    size: str,
    milk: str,
    name: str,
    extras: Optional[list[str]] = None
):
    """Save the complete order when you have all information."""
    # Saves order to JSON file
    # Generates order ID with timestamp
    # Returns confirmation
```

### Frontend: Order Tracking Hook

```typescript
export function useOrderState() {
  const [order, setOrder] = useState<OrderState>({
    drinkType: null,
    size: null,
    milk: null,
    extras: [],
    name: null,
  });
  
  // Monitors chat messages for order updates
  // Updates state in real-time
  // Shows toast when complete
}
```

## 📊 Order Data Format

Orders are saved as JSON files in `backend/orders/`:

```json
{
  "drinkType": "latte",
  "size": "medium",
  "milk": "oat",
  "extras": ["extra shot"],
  "name": "Alex",
  "timestamp": "2025-11-23T15:30:45.123456",
  "orderId": "order_20251123_153045_Alex"
}
```

## 🎯 Learning Outcomes

### Skills Developed
- ✅ Building domain-specific AI agents with personas
- ✅ State management in voice conversations
- ✅ Function calling / tool use in LLMs
- ✅ Real-time UI updates from voice input
- ✅ Data persistence and file handling
- ✅ Receipt generation and formatting
- ✅ Coffee-themed UI design
- ✅ Progress tracking and user feedback

### Technologies Mastered
- LiveKit Agents function tools
- React state management with voice input
- Real-time data synchronization
- File-based data persistence
- Next.js API routes
- Dynamic routing with params
- Toast notifications
- CSS animations and transitions

## 🐛 Troubleshooting

### Order not saving?
- Check backend logs for errors
- Ensure `orders/` directory exists
- Verify all required fields are collected

### Receipt not displaying?
- Check browser console for errors
- Verify order file was created in `backend/orders/`
- Try manual navigation: `/receipt/order_YYYYMMDD_HHMMSS_Name`

### UI not updating?
- Ensure frontend is connected to LiveKit
- Check browser console for WebSocket errors
- Verify agent is sending messages

### Colors look wrong?
- Check if dark mode is enabled
- Verify CSS variables are loaded
- Try refreshing the page

## 🚀 Future Enhancements

Potential improvements for this agent:
- 🔊 Sound effects (order confirmation, completion chime)
- 📜 Order history and reordering
- 💳 Payment integration
- 🎨 More drink customization options
- 📊 Analytics dashboard
- 🌍 Multi-language support
- 👥 Group orders
- 📱 Mobile app version
- 🖼️ Drink photos
- ⭐ Loyalty program

## 📚 Resources

- [LiveKit Function Tools](https://docs.livekit.io/agents/function-calling/)
- [Murf Falcon TTS](https://murf.ai/api/docs/text-to-speech/streaming)
- [React State Management](https://react.dev/learn/managing-state)
- [Next.js Dynamic Routes](https://nextjs.org/docs/app/building-your-application/routing/dynamic-routes)

## 📝 License

MIT License - See [LICENSE](./LICENSE) file

## 🙏 Acknowledgments

Built for the **Murf AI Voice Agents Challenge**
- Day 2 Challenge: Coffee Shop Barista
- Powered by: Murf Falcon TTS, LiveKit, Google Gemini, Deepgram

---

<div align="center">

### ☕ Falcon Brew - Where AI Meets Coffee ☕

**Previous:** [Day 1 - Basic Voice Agent](../Day1/) | **Next:** Day 3 (Coming Soon)

⭐ **Star this repo if you're following along!** ⭐

</div>
