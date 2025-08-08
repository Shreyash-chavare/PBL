# 🎯 Railway Root Directory Setup Guide

## Method 1: During Initial Deployment

### Step 1: Select Repository
1. Go to [Railway.app](https://railway.app)
2. Click "New Project"
3. Click "Deploy from GitHub repo"
4. Select: `Shreyash-chavare/PBL`

### Step 2: Configure Root Directory
**Look for these options:**
- **"Root Directory"** field
- **"Source Directory"** field
- **"Working Directory"** field

**Set it to:** `Backend` (without the slash)

### Step 3: Deploy
Click "Deploy" and wait for the build to complete.

## Method 2: After Deployment

### Step 1: Go to Service Settings
1. Click on your deployed service
2. Click "Settings" tab
3. Look for "Source Directory" or "Root Directory"

### Step 2: Update Root Directory
1. Change the value to: `Backend`
2. Click "Save"
3. Go to "Deployments" tab
4. Click "Redeploy"

## Method 3: Using Railway CLI

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Set root directory for backend service
railway service backend --root-dir Backend

# Deploy
railway up
```

## Visual Indicators

**✅ Correct Setup:**
- Service name: `collaborative-editor-backend`
- Root directory: `Backend`
- Build logs show: `Installing dependencies in /app/Backend`

**❌ Wrong Setup:**
- Service name: `pbl` (generic)
- Root directory: `/` (root)
- Build logs show: `Installing dependencies in /app`

## Troubleshooting

### If you can't find the root directory option:
1. **Try deploying normally first**
2. **Then go to Settings and change it**
3. **Redeploy the service**

### If the build still includes frontend:
1. **Check if you're in the right service**
2. **Verify the root directory is set to `Backend`**
3. **Look at the build logs to confirm**

## Expected Build Logs for Backend:
```
Installing dependencies in /app/Backend
npm install
npm start
```

## Expected Build Logs for Frontend:
```
Installing dependencies in /app/Frontend
npm install
npm run build
npm run preview
```
