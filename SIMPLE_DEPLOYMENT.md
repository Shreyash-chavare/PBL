# 🚀 Simple Deployment Guide

## Quick Deploy on Railway (5 minutes)

### Step 1: Deploy Backend
1. Go to [Railway.app](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select: `Shreyash-chavare/PBL`
4. **IMPORTANT**: Set Root Directory to `/Backend`
5. Click "Deploy"

### Step 2: Add Database
1. In your project, click "New"
2. Select "Database" → "MongoDB"
3. Copy the connection string

### Step 3: Set Environment Variables
In your backend service, add:
```
NODE_ENV=production
JWT_TOKEN=your-secret-key-2024
MONGODB_URI=[paste your MongoDB connection string]
FRONTEND_URL=https://your-frontend-url.railway.app
```

### Step 4: Deploy Frontend
1. Click "New" → "Deploy from GitHub repo"
2. Select: `Shreyash-chavare/PBL`
3. **IMPORTANT**: Set Root Directory to `/Frontend`
4. Add environment variable:
   ```
   VITE_BACKEND_URL=https://your-backend-url.railway.app
   ```

### Step 5: Test
- Backend: `https://your-backend-url.railway.app/health`
- Frontend: `https://your-frontend-url.railway.app`

## What's Fixed:
- ✅ Separate package.json files
- ✅ Simplified Railway configs
- ✅ Node.js 22 compatibility
- ✅ Proper dependency management

## Expected Result:
```json
{
  "status": "OK",
  "message": "Collaborative Code Editor Backend is running"
}
```
