@echo off
echo 🚀 Collaborative Code Editor Deployment Script
echo ==============================================

REM Check if git is initialized
if not exist ".git" (
    echo ❌ Git repository not found. Please initialize git first:
    echo    git init
    echo    git add .
    echo    git commit -m "Initial commit"
    pause
    exit /b 1
)

REM Check if remote origin is set
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ No remote origin found. Please add your GitHub repository:
    echo    git remote add origin https://github.com/yourusername/your-repo-name.git
    pause
    exit /b 1
)

echo ✅ Git repository is ready

REM Push to GitHub
echo 📤 Pushing code to GitHub...
git add .
git commit -m "Deploy: Prepare for production deployment"
git push origin main

echo.
echo 🎉 Code pushed to GitHub successfully!
echo.
echo 📋 Next Steps:
echo 1. Go to https://render.com and sign up/login
echo 2. Create a MongoDB Atlas cluster at https://www.mongodb.com/atlas
echo 3. Follow the detailed instructions in DEPLOYMENT.md
echo.
echo 🔗 Your deployment URLs will be:
echo    Backend: https://collaborative-editor-backend.onrender.com
echo    Frontend: https://collaborative-editor-frontend.onrender.com
echo.
echo 📖 For detailed instructions, see DEPLOYMENT.md
pause
