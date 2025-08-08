# Deployment Instructions for Collaborative Code Editor

## Prerequisites
1. GitHub account
2. Render.com account (free)
3. MongoDB Atlas account (free)

## Step 1: Set up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free account
3. Create a new cluster (M0 Free tier)
4. Create a database user with read/write permissions
5. Get your connection string
6. Replace `your_username`, `your_password`, and `your_cluster` in the connection string

## Step 2: Push Code to GitHub

1. Create a new repository on GitHub
2. Push your code to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/your-repo-name.git
git push -u origin main
```

## Step 3: Deploy Backend on Render

1. Go to [Render.com](https://render.com)
2. Sign up/Login with your GitHub account
3. Click "New +" → "Web Service"
4. Connect your GitHub repository
5. Configure the service:
   - **Name**: collaborative-editor-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

6. Add Environment Variables:
   - `NODE_ENV`: production
   - `JWT_TOKEN`: (generate a random string)
   - `MONGODB_URI`: (your MongoDB Atlas connection string)
   - `FRONTEND_URL`: https://collaborative-editor-frontend.onrender.com

7. Click "Create Web Service"

## Step 4: Deploy Frontend on Render

1. In Render, click "New +" → "Static Site"
2. Connect the same GitHub repository
3. Configure the service:
   - **Name**: collaborative-editor-frontend
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Publish Directory**: `Frontend/dist`
   - **Plan**: Free

4. Add Environment Variable:
   - `VITE_BACKEND_URL`: (your backend URL from step 3)

5. Click "Create Static Site"

## Step 5: Update Backend CORS

After getting your frontend URL, update the backend environment variable:
- `FRONTEND_URL`: (your actual frontend URL)

## Step 6: Test Your Application

1. Backend URL: https://collaborative-editor-backend.onrender.com
2. Frontend URL: https://collaborative-editor-frontend.onrender.com

## Troubleshooting

### Common Issues:
1. **CORS Errors**: Make sure FRONTEND_URL is correctly set in backend environment variables
2. **Database Connection**: Verify MONGODB_URI is correct and network access is allowed
3. **Build Failures**: Check if all dependencies are in package.json

### Environment Variables Reference:

**Backend (.env):**
```
NODE_ENV=production
PORT=3000
JWT_TOKEN=your_jwt_secret_key_here
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database
FRONTEND_URL=https://your-frontend-app.onrender.com
```

**Frontend (.env):**
```
VITE_BACKEND_URL=https://your-backend-app.onrender.com
```

## Features Available After Deployment:
- User authentication (signup/login)
- Collaborative code editing
- Real-time messaging
- Voice chat
- LeetCode problem integration
- Online compiler
- User profiles and activity tracking
