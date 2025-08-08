#!/bin/bash

echo "🚀 Collaborative Code Editor Deployment Script"
echo "=============================================="

# Check if git is initialized
if [ ! -d ".git" ]; then
    echo "❌ Git repository not found. Please initialize git first:"
    echo "   git init"
    echo "   git add ."
    echo "   git commit -m 'Initial commit'"
    exit 1
fi

# Check if remote origin is set
if ! git remote get-url origin > /dev/null 2>&1; then
    echo "❌ No remote origin found. Please add your GitHub repository:"
    echo "   git remote add origin https://github.com/yourusername/your-repo-name.git"
    exit 1
fi

echo "✅ Git repository is ready"

# Push to GitHub
echo "📤 Pushing code to GitHub..."
git add .
git commit -m "Deploy: Prepare for production deployment"
git push origin main

echo ""
echo "🎉 Code pushed to GitHub successfully!"
echo ""
echo "📋 Next Steps:"
echo "1. Go to https://render.com and sign up/login"
echo "2. Create a MongoDB Atlas cluster at https://www.mongodb.com/atlas"
echo "3. Follow the detailed instructions in DEPLOYMENT.md"
echo ""
echo "🔗 Your deployment URLs will be:"
echo "   Backend: https://collaborative-editor-backend.onrender.com"
echo "   Frontend: https://collaborative-editor-frontend.onrender.com"
echo ""
echo "📖 For detailed instructions, see DEPLOYMENT.md"
