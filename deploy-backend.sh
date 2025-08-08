#!/bin/bash

echo "🚀 Deploying Backend to Railway"
echo "================================"

# Check if we're in the right directory
if [ ! -f "package.json" ]; then
    echo "❌ Error: package.json not found. Make sure you're in the project root."
    exit 1
fi

# Check if Railway CLI is installed
if ! command -v railway &> /dev/null; then
    echo "❌ Railway CLI not found. Please install it first:"
    echo "   npm install -g @railway/cli"
    exit 1
fi

echo "✅ Railway CLI found"

# Deploy backend
echo "📤 Deploying backend..."
railway up --service backend

echo "✅ Backend deployment initiated!"
echo ""
echo "🔗 Your backend URL will be available in Railway dashboard"
echo "📋 Next: Deploy frontend using deploy-frontend.sh"
