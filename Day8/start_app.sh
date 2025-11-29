#!/bin/bash

# Day 8 - Voice Game Master Startup Script

echo "🎲 Starting Voice Game Master (D&D Adventure)..."
echo ""

# Check if LiveKit server is running
if ! lsof -Pi :7880 -sTCP:LISTEN -t >/dev/null 2>&1 ; then
    echo "⚠️  LiveKit server not detected on port 7880"
    echo "Please start LiveKit server first:"
    echo "  livekit-server --dev"
    echo ""
    exit 1
fi

echo "✅ LiveKit server detected"
echo ""

# Start backend in background
echo "🐍 Starting Python backend agent..."
cd backend
if [ ! -f ".env" ]; then
    echo "⚠️  No .env file found. Copying from .env.example..."
    cp .env.example .env
    echo "⚠️  Please edit backend/.env with your API keys before continuing!"
    exit 1
fi

# Check if uv is installed
if ! command -v uv &> /dev/null; then
    echo "❌ uv not found. Please install uv first:"
    echo "  curl -LsSf https://astral.sh/uv/install.sh | sh"
    exit 1
fi

# Install dependencies if needed
if [ ! -d ".venv" ]; then
    echo "📦 Installing Python dependencies..."
    uv sync
fi

# Start agent in background
uv run python src/agent.py dev &
BACKEND_PID=$!
echo "✅ Backend started (PID: $BACKEND_PID)"
cd ..

# Wait a bit for backend to initialize
sleep 3

# Start frontend
echo ""
echo "⚛️  Starting Next.js frontend..."
cd frontend

if [ ! -f ".env.local" ]; then
    echo "⚠️  No .env.local file found. Copying from .env.example..."
    cp .env.example .env.local
fi

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing frontend dependencies..."
    pnpm install
fi

# Start frontend (this will block)
pnpm dev

# Cleanup on exit
trap "echo ''; echo '🛑 Stopping services...'; kill $BACKEND_PID 2>/dev/null; exit" INT TERM

