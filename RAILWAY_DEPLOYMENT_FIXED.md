# Railway.app Deployment (Fixed Version)

## 🚨 Current Issue Fixed
The previous deployment was failing because Railway was trying to build the frontend during backend deployment. This guide fixes that issue.

## Step 1: Set up Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "Start a New Project"

## Step 2: Deploy Backend (IMPORTANT: Use /Backend directory)
1. Click "Deploy from GitHub repo"
2. Select your repository: `Shreyash-chavare/PBL`
3. **CRITICAL**: Set the root directory to `/Backend`
4. Railway will detect it's a Node.js app
5. Click "Deploy Now"

## Step 3: Add MongoDB Database
1. In your project dashboard, click "New"
2. Select "Database" → "MongoDB"
3. Railway will create a MongoDB instance
4. Copy the connection string from the database service

## Step 4: Configure Backend Environment Variables
1. Go to your backend service
2. Click "Variables" tab
3. Add these environment variables:
   ```
   NODE_ENV=production
   JWT_TOKEN=your-super-secret-jwt-key-2024
   MONGODB_URI=[paste the connection string from step 3]
   FRONTEND_URL=https://collaborative-editor-frontend.railway.app
   ```

## Step 5: Deploy Frontend (IMPORTANT: Use /Frontend directory)
1. In Railway dashboard, click "New"
2. Select "GitHub Repo"
3. Select the same repository: `Shreyash-chavare/PBL`
4. **CRITICAL**: Set the root directory to `/Frontend`
5. Railway will detect it's a React app
6. Add environment variable:
   ```
   VITE_BACKEND_URL=https://collaborative-editor-backend.railway.app
   ```

## Step 6: Test Your Deployment
1. **Backend Health Check**: `https://your-backend-url.railway.app/health`
2. **Frontend**: `https://your-frontend-url.railway.app`

## 🔧 Key Fixes Applied:
- ✅ Separate Railway configs for Backend and Frontend
- ✅ Correct root directory paths (/Backend and /Frontend)
- ✅ Proper build commands for each service
- ✅ Health check endpoints for monitoring

## Expected URLs:
- Backend: `https://collaborative-editor-backend.railway.app`
- Frontend: `https://collaborative-editor-frontend.railway.app`

## Troubleshooting:
- **Build fails**: Make sure you're using the correct root directory
- **Database connection**: Verify MONGODB_URI is correct
- **CORS errors**: Check FRONTEND_URL environment variable
