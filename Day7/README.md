# Day 7: QuickBasket - Food & Grocery Voice Ordering Assistant

**Challenge:** Build a voice-powered food and grocery ordering system with cart management, recipe ingredient lookup, and order persistence.

## About This Agent

QuickBasket is a smart voice assistant that helps users order groceries, snacks, and prepared foods through natural conversation. Users can add individual items, request ingredients for recipes, manage their cart, and place orders—all saved to JSON files.

## ✨ Key Features

### Voice Ordering Capabilities
- 🛒 **Cart Management** - Add, remove, update quantities via voice
- 📖 **Recipe Ingredients** - Say "ingredients for pasta" and get all items added
- 📋 **Cart Review** - Ask "what's in my cart?" anytime
- 💾 **Order Persistence** - Orders saved to JSON with customer details
- 🎯 **Smart Item Matching** - Natural language item recognition

### Product Catalog
- **20 diverse items** across categories:
  - Groceries (bread, milk, eggs, rice, oil, etc.)
  - Snacks (chips, biscuits, chocolate, nuts)
  - Prepared Food (pizza, pasta, noodles, sandwiches)
  - Beverages (coffee)
- Each item includes: name, price, brand, unit, tags

### Recipe System
- Pre-configured recipes with ingredient mappings
- Examples: "peanut butter sandwich", "pasta for two", "maggi", "breakfast combo"
- Automatic quantity calculation for servings

### Professional UI
- **Welcome Page:**
  - Clean, minimal design with green grocery theme
  - Category chips for visual appeal
  - "How It Works" section with 3-step guide
  - Mobile-responsive design
  
- **Conversation Screen:**
  - Real-time cart widget (bottom-right) showing item count and total
  - Slide-in cart drawer with full item details
  - Order receipt modal with download JSON functionality
  - "View Last Order" button (bottom-left)
  - QuickBasket branding (top-left)
  - Gradient dark background
  - All overlays work seamlessly with LiveKit controls

## 🏗️ Architecture

```
Day7/
├── backend/
│   ├── src/
│   │   ├── agent.py           # Voice agent with function tools
│   │   └── cart_manager.py    # Cart operations & order logic
│   ├── catalog.json           # Product catalog (20 items)
│   ├── recipes.json           # Recipe-to-ingredients mapping
│   └── orders.json            # Saved orders (output)
├── frontend/
│   ├── app/
│   │   ├── (app)/
│   │   │   └── page.tsx       # Main app entry
│   │   └── api/
│   │       └── orders/
│   │           └── latest/
│   │               └── route.ts  # API for last order
│   └── components/
│       └── app/
│           └── welcome-view.tsx  # Landing page UI
└── README.md
```

## 🛠️ Tech Stack

| Component | Technology | Purpose |
|-----------|-----------|---------|
| **Voice Agent** | LiveKit Agents | Voice streaming & session management |
| **LLM** | Google Gemini 2.5 Flash | Conversational AI brain |
| **TTS** | Murf Falcon | Ultra-fast voice synthesis |
| **STT** | Deepgram Nova-3 | Speech recognition |
| **Backend** | Python 3.9+ | Agent logic & cart management |
| **Frontend** | Next.js 15 + TypeScript | Web interface |
| **Styling** | Tailwind CSS | UI design |
| **Data Storage** | JSON files | Catalog, recipes, orders |

## 🎨 Real-Time UI Features

### Cart Tracking System
The UI automatically tracks cart changes by parsing agent messages in real-time:

**Detects:**
- ✅ Item additions: "Added 2 Whole Wheat Bread to your cart"
- ✅ Recipe additions: "I've added Maggi, Butter, Onions to your cart for maggi"
- ✅ Cart summaries: "You have 3 items in your cart: 1 Maggi at ₹14..."
- ✅ Item removals: "Removed X from your cart"
- ✅ Order placement: "Your order ORD-20251128-145653 has been placed"
- ✅ Cart clearing: "Your cart has been cleared"

**Updates:**
- 📊 Cart widget shows live item count and total
- 🎯 Cart drawer displays all items with quantities and prices
- 💰 Automatic total calculation
- 🧾 Order receipt modal pops up automatically when order is placed
- 📥 Download order as JSON file

### UI Components

**1. Cart Status Widget (Bottom-Right)**
- Shows: Items count and total amount
- Hover animation with scale effect
- Click to open cart drawer
- Green accent border

**2. Cart Drawer (Slide-in from Right)**
- Full item list with quantities and line totals
- Subtotal calculation
- Close button and backdrop
- Smooth spring animation
- Empty state message

**3. Order Receipt Modal (Center)**
- Success icon with green theme
- Order ID and timestamp
- Complete items list
- Total amount highlighted
- Download JSON button (functional!)
- Auto-closes after 10 seconds

**4. Last Order Button (Bottom-Left)**
- View previous order anytime
- Disabled when no orders exist
- Opens same receipt modal

**5. Brand Header (Top-Left)**
- QuickBasket branding
- Clean white text
- Fixed positioning

## 🎯 Function Tools

The agent has 7 function tools that Gemini can call:

### 1. `add_to_cart(item_name, quantity)`
Adds items to the shopping cart by name.

**Example:** "Add 2 loaves of bread"

### 2. `remove_from_cart(item_name)`
Removes an item completely from cart.

**Example:** "Remove the milk"

### 3. `update_cart_quantity(item_name, quantity)`
Updates quantity of an existing cart item.

**Example:** "Change bread to 3"

### 4. `list_cart()`
Returns current cart contents and total price.

**Example:** "What's in my cart?"

### 5. `add_ingredients_for_dish(dish_name, servings)`
Adds all ingredients for a recipe to cart.

**Example:** "I need ingredients for pasta for two"

### 6. `place_order(customer_name, customer_address, delivery_instructions)`
Finalizes and saves the order to `orders.json`.

**Example:** "Place my order" → Agent asks for name and address

### 7. `clear_cart()`
Empties the entire cart.

**Example:** "Clear my cart"

## 💬 Conversation Examples

### Example 1: Simple Order
```
User: "Hi, I need some groceries"
Agent: "Hello! Welcome to QuickBasket. I can help you order groceries, snacks, 
        and prepared foods. What would you like to order today?"

User: "Add 2 loaves of bread and a liter of milk"
Agent: "Added 2 Whole Wheat Bread to your cart. Added 1 Full Cream Milk to your cart."

User: "What's in my cart?"
Agent: "You have 2 items in your cart: 2 Whole Wheat Bread at rupees 45 each, 
        1 Full Cream Milk at rupees 65 each. Your total is rupees 155."

User: "That's all, place my order"
Agent: "What's your name for the order?"

User: "Varshith"
Agent: "And what's your delivery address?"

User: "123 Main Street"
Agent: "Your order ORD-20250128-143022 has been placed successfully! 
        Total: rupees 155. Thank you for shopping with QuickBasket!"
```

### Example 2: Recipe Ingredients
```
User: "I want to make a peanut butter sandwich"
Agent: "I've added Whole Wheat Bread, Creamy Peanut Butter to your cart 
        for peanut butter sandwich."

User: "Actually, make that pasta for two people"
Agent: "I've added Penne Pasta, Tomato Basil Pasta Sauce, Cheddar Cheese Block 
        to your cart for pasta for two."
```

### Example 3: Cart Management
```
User: "Add 3 packets of chips"
Agent: "Added 3 Classic Salted Chips to your cart."

User: "Change that to 5"
Agent: "Updated Classic Salted Chips to 5 units."

User: "Remove the chips"
Agent: "Removed Classic Salted Chips from your cart."
```

## 🚀 Quick Start

### Prerequisites

- Python 3.9+ with [uv](https://docs.astral.sh/uv/)
- Node.js 18+ with pnpm
- [LiveKit Server](https://docs.livekit.io/home/self-hosting/local/) (`brew install livekit`)
- API Keys:
  - Murf Falcon API key
  - Google Gemini API key
  - Deepgram API key

### Installation

**1. Backend Setup**
```bash
cd Day7/backend

# Install dependencies
uv sync

# Configure environment
cp .env.example .env
# Edit .env with your API keys:
# - LIVEKIT_URL=ws://127.0.0.1:7880
# - LIVEKIT_API_KEY=devkey
# - LIVEKIT_API_SECRET=secret
# - MURF_API_KEY=your_key
# - GOOGLE_API_KEY=your_key
# - DEEPGRAM_API_KEY=your_key

# Download required models
uv run python src/agent.py download-files
```

**2. Frontend Setup**
```bash
cd Day7/frontend

# Install dependencies
pnpm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with LiveKit credentials
```

**3. Run the Application**

Open 3 terminals:

```bash
# Terminal 1 - LiveKit Server
livekit-server --dev

# Terminal 2 - Backend Agent
cd Day7/backend
uv run python src/agent.py dev

# Terminal 3 - Frontend
cd Day7/frontend
pnpm dev
```

**4. Open Browser**

Navigate to `http://localhost:3000` and click "Start Voice Ordering"!

## 📊 Data Files

### catalog.json
Contains 20 products with structure:
```json
{
  "id": "bread_whole_wheat",
  "name": "Whole Wheat Bread",
  "category": "groceries",
  "price": 45.0,
  "brand": "FreshBake",
  "unit": "1 loaf",
  "tags": ["bread", "sandwich", "vegetarian"]
}
```

### recipes.json
Maps dish names to item IDs:
```json
{
  "peanut butter sandwich": ["bread_whole_wheat", "peanut_butter_jar"],
  "pasta for two": ["pasta_pack", "pasta_sauce_jar", "cheese_block"]
}
```

### orders.json
Stores completed orders:
```json
{
  "order_id": "ORD-20250128-143022",
  "timestamp": "2025-01-28T14:30:22.123456",
  "customer_name": "Varshith",
  "customer_address": "123 Main Street",
  "items": [...],
  "order_total": 155.0
}
```

## 🎨 UI Features

### Welcome Page
- **Hero Section** - Large title, subtitle, and CTA button
- **Category Chips** - Visual representation of product categories
- **How It Works** - 3-step guide with numbered cards
- **Last Order Preview** - Shows most recent order details
- **Footer** - Branding and tech stack credits

### Design System
- **Colors:** Green theme (#22c55e) for grocery feel
- **Typography:** Clean, modern fonts
- **Layout:** Mobile-responsive with Tailwind CSS
- **Animations:** Smooth hover effects on CTA button

## 🧪 Testing the Agent

Try these voice commands:

**Basic Orders:**
- "Add 2 loaves of bread"
- "I need a liter of milk"
- "Add some eggs and butter"

**Recipe Ingredients:**
- "I want to make a peanut butter sandwich"
- "Get me ingredients for pasta for two"
- "I need stuff for maggi"

**Cart Management:**
- "What's in my cart?"
- "Remove the bread"
- "Change milk to 2 liters"
- "Clear my cart"

**Checkout:**
- "That's all"
- "Place my order"
- "I'm done, checkout"

## 🔧 Customization

### Adding New Products
Edit `backend/catalog.json`:
```json
{
  "id": "new_item_id",
  "name": "Product Name",
  "category": "groceries",
  "price": 99.0,
  "brand": "Brand Name",
  "unit": "1 unit",
  "tags": ["tag1", "tag2"]
}
```

### Adding New Recipes
Edit `backend/recipes.json`:
```json
{
  "new dish name": ["item_id_1", "item_id_2"]
}
```

### Modifying Agent Persona
Edit the `instructions` in `backend/src/agent.py` to change conversation style.

## 🎯 What I Learned

### Technical Skills
- **Function Tool Design** - Creating intuitive tools for LLM to call
- **State Management** - Managing cart state across conversation turns
- **JSON Persistence** - Reading/writing structured data files
- **Natural Language Processing** - Fuzzy matching for item names
- **API Design** - Building Next.js API routes for data access

### Voice UX Patterns
- **Confirmation Feedback** - Always confirm cart changes verbally
- **Progressive Disclosure** - Ask for details only when needed
- **Error Handling** - Graceful fallbacks for unknown items
- **Conversation Flow** - Natural checkout process with prompts

### Best Practices
- **Modular Code** - Separated cart logic into dedicated module
- **Logging** - Comprehensive emoji-based logging for debugging
- **Type Safety** - Proper type hints in Python functions
- **Error Recovery** - Handles missing files and invalid data

## 📚 Resources

- [Murf Falcon TTS](https://murf.ai/api/docs/text-to-speech/streaming)
- [LiveKit Agents](https://docs.livekit.io/agents)
- [Google Gemini](https://ai.google.dev/gemini-api/docs)
- [Deepgram STT](https://developers.deepgram.com/)

## 🙏 Acknowledgments

Built as part of the **Murf AI Voice Agents Challenge** - 10 Days of Voice AI

**Tech Stack:**
- Murf Falcon (TTS)
- LiveKit (Voice Infrastructure)
- Google Gemini (LLM)
- Deepgram (STT)
- Next.js 15 (Frontend)
- Python 3.9+ (Backend)

---

**Day 7 Complete!** ✅ Food & Grocery Voice Ordering System with cart management, recipe lookup, and order persistence.
