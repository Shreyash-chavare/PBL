# 📸 Step-by-Step Railway Deployment

## 🎯 Step 1: Create New Project

1. **Go to [Railway.app](https://railway.app)**
2. **Click "New Project"** (blue button)
3. **Click "Deploy from GitHub repo"**

## 🎯 Step 2: Select Repository

1. **Search for**: `Shreyash-chavare/PBL`
2. **Click on your repository**
3. **Look for "Root Directory" field** (this is crucial!)

## 🎯 Step 3: Set Root Directory

**IMPORTANT**: Before clicking "Deploy", you MUST set the root directory:

1. **Find "Root Directory" field**
2. **Enter**: `Backend` (without the slash)
3. **Make sure it's set to Backend, not `/`**

## 🎯 Step 4: Deploy Backend

1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Check build logs** - should show:
   ```
   Installing dependencies in /app/Backend
   npm install
   npm start
   ```

## 🎯 Step 5: Add MongoDB Database

1. **In your project dashboard, click "New"**
2. **Select "Database" → "MongoDB"**
3. **Copy the connection string**

## 🎯 Step 6: Set Environment Variables

1. **Go to your backend service**
2. **Click "Variables" tab**
3. **Add these variables**:
   ```
   NODE_ENV=production
   JWT_TOKEN=your-secret-key-2024
   MONGODB_URI=[paste your MongoDB connection string]
   FRONTEND_URL=https://your-frontend-url.railway.app
   ```

## 🎯 Step 7: Deploy Frontend

1. **Click "New" → "Deploy from GitHub repo"**
2. **Select same repository**: `Shreyash-chavare/PBL`
3. **Set Root Directory to**: `Frontend`
4. **Add environment variable**:
   ```
   VITE_BACKEND_URL=https://your-backend-url.railway.app
   ```

## 🔍 How to Verify Root Directory is Set Correctly

### Check Build Logs:
**✅ Correct Backend Logs:**
```
Installing dependencies in /app/Backend
npm install
npm start
```

**❌ Wrong Logs (includes frontend):**
```
Installing dependencies in /app
cd Frontend && npm install && npm run build
```

### Check Service Settings:
1. **Click on your service**
2. **Go to "Settings" tab**
3. **Look for "Source Directory"**
4. **Should show**: `Backend`

## 🚨 Common Issues & Solutions

### Issue 1: Can't find Root Directory field
**Solution**: Deploy normally first, then change it in Settings

### Issue 2: Build still includes frontend
**Solution**: Check if root directory is actually set to `Backend`

### Issue 3: Service name is generic
**Solution**: Rename your service to `collaborative-editor-backend`

## 📞 Need Help?

If you still can't find the root directory option:
1. **Take a screenshot** of the deployment page
2. **Check if you're in the right section**
3. **Try the alternative method** (deploy first, then change settings)
