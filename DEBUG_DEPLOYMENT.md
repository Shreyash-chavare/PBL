# 🔧 Deployment Debugging Guide

## Current Issue: 500 Internal Server Error

### Step 1: Check Backend Logs

**On Railway:**
1. Go to your backend service
2. Click "Deployments" tab
3. Click on the latest deployment
4. Check the logs for errors

**On Render:**
1. Go to your backend service
2. Click "Logs" tab
3. Look for error messages

### Step 2: Verify Environment Variables

Make sure these are set in your backend service:

```
NODE_ENV=production
PORT=3000 (or leave empty for auto)
JWT_TOKEN=your-super-secret-jwt-key-2024
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/collaborative_editor
FRONTEND_URL=https://collaborative-editor-frontend.railway.app
```

### Step 3: Test Health Check

After deployment, test these URLs:
- `https://your-backend-url.railway.app/health`
- `https://your-backend-url.railway.app/`

### Step 4: Common Issues & Solutions

#### Issue 1: Database Connection Failed
**Symptoms:** "MongoDB connection error" in logs
**Solution:** 
- Check MONGODB_URI is correct
- Ensure database is accessible from anywhere
- Verify username/password

#### Issue 2: Port Configuration
**Symptoms:** "EADDRINUSE" or port errors
**Solution:**
- Let Railway/Render set PORT automatically
- Remove hardcoded port 3000

#### Issue 3: Missing Dependencies
**Symptoms:** "Cannot find module" errors
**Solution:**
- Ensure all dependencies are in package.json
- Check build logs for npm install errors

#### Issue 4: CORS Errors
**Symptoms:** Frontend can't connect to backend
**Solution:**
- Verify FRONTEND_URL is correct
- Check CORS configuration in app.js

### Step 5: Quick Fix Commands

**Test locally:**
```bash
npm install
npm start
```

**Check environment:**
```bash
node test-deployment.js
```

### Step 6: Redeploy Steps

1. **Update environment variables**
2. **Redeploy backend service**
3. **Check logs for errors**
4. **Test health endpoint**
5. **Redeploy frontend if needed**

## Expected Success Response

**Health Check (`/health`):**
```json
{
  "status": "OK",
  "message": "Collaborative Code Editor Backend is running",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "port": 3000
}
```

**Root Endpoint (`/`):**
```json
{
  "message": "Collaborative Code Editor Backend API",
  "version": "1.0.0",
  "endpoints": {
    "health": "/health",
    "auth": "/api/auth/*",
    "leetcode": "/api/leetcode/*",
    "compile": "/api/compile"
  }
}
```
