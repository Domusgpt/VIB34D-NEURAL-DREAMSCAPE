#!/bin/bash

echo "🌌 Launching EPO Interactive Experience..."
echo "========================================"

# Kill any existing servers
pkill -f "python3 -m http.server" 2>/dev/null || true
pkill -f "python -m http.server" 2>/dev/null || true

# Start the server in the background
echo "🚀 Starting HTTP server on port 8082..."
python3 -m http.server 8082 &
SERVER_PID=$!

# Wait for server to start
sleep 2

echo "✅ Server started successfully!"
echo ""
echo "🌐 Available EPO Experiences:"
echo "--------------------------------"
echo "1. Main Experience:      http://localhost:8082/index.html"
echo "2. Enhanced Experience:  http://localhost:8082/enhanced-epo-experience.html"
echo "3. Interactive Paper:    http://localhost:8082/epo-complete-interactive-paper.html"
echo "4. Neural Consciousness: http://localhost:8082/neural-consciousness-experience.html"
echo ""
echo "📸 Screenshots available:"
echo "- epo-main-experience.png"
echo "- epo-enhanced-experience.png"
echo "- epo-interactive-paper.png"
echo ""
echo "🎮 Controls:"
echo "- Mouse: Navigate and interact"
echo "- Scroll: Progress through paper"
echo "- Click: Interact with concepts"
echo ""
echo "Press Ctrl+C to stop the server..."
echo ""

# Keep server running until user stops it
trap "echo '🛑 Stopping server...'; kill $SERVER_PID 2>/dev/null; exit" INT
wait $SERVER_PID