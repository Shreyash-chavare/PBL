#!/bin/bash

echo "🚀 Deploying Frontend to Railway"
echo "================================"

# Check if we're in the right directory
if [ ! -f "Frontend/package.json" ]; then
    echo "❌ Error: Frontend/package.json not found. Make sure you're in the project root."
    exit 1
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

echo "✅ Railway CLI found"

# Deploy frontend
echo "📤 Deploying frontend..."
railway up --service frontend

echo "✅ Frontend deployment initiated!"
echo ""
echo "🔗 Your frontend URL will be available in Railway dashboard"
