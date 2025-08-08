# Railway.app Deployment Instructions

## Why Railway?
- Free tier available
- Built-in MongoDB database
- Easy deployment process
- Automatic environment variables

## Step 1: Set up Railway Account
1. Go to [Railway.app](https://railway.app)
2. Sign up with your GitHub account
3. Click "Start a New Project"

## Step 2: Deploy Backend
1. Click "Deploy from GitHub repo"
2. Select your repository: `Shreyash-chavare/PBL`
3. Railway will automatically detect it's a Node.js app
4. **Important**: Set the root directory to `/` (not `/Backend`)
5. Click "Deploy Now"

## Step 3: Add MongoDB Database
1. In your project dashboard, click "New"
2. Select "Database" → "MongoDB"
3. Railway will create a MongoDB instance
4. Copy the connection string from the database service

## Step 4: Configure Environment Variables
1. Go to your backend service
2. Click "Variables" tab
3. Add these environment variables:
   ```
   NODE_ENV=production
   JWT_TOKEN=your-super-secret-jwt-key-2024
   MONGODB_URI=[paste the connection string from step 3]
   FRONTEND_URL=https://collaborative-editor-frontend.railway.app
   ```

## Step 5: Deploy Frontend
1. In Railway dashboard, click "New"
2. Select "GitHub Repo"
3. Select the same repository: `Shreyash-chavare/PBL`
4. **Important**: Set the root directory to `/Frontend`
5. Railway will automatically detect it's a React app
6. Add environment variable:
   ```
   VITE_BACKEND_URL=https://collaborative-editor-backend.railway.app
   ```

## Step 6: Get Your URLs
- Backend: `https://collaborative-editor-backend.railway.app`
- Frontend: `https://collaborative-editor-frontend.railway.app`

## Benefits of Railway:
- ✅ Free tier available
- ✅ Built-in MongoDB
- ✅ Automatic HTTPS
- ✅ Easy environment management
- ✅ GitHub integration
