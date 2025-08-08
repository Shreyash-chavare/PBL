# Render.com Deployment (Fixed Version)

## Step 1: Deploy Backend on Render

1. Go to [Render.com](https://render.com)
2. Sign up with GitHub
3. Click "New +" → "Web Service"
4. Connect repository: `Shreyash-chavare/PBL`
5. Configure:
   - **Name**: `collaborative-editor-backend`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Root Directory**: `/` (leave empty)
   - **Plan**: `Free`

6. Add Environment Variables:
   - `NODE_ENV`: `production`
   - `JWT_TOKEN`: `your-super-secret-jwt-key-2024`
   - `MONGODB_URI`: `mongodb+srv://your_username:your_password@your_cluster.mongodb.net/collaborative_editor?retryWrites=true&w=majority`
   - `FRONTEND_URL`: `https://collaborative-editor-frontend.onrender.com`

7. Click "Create Web Service"

## Step 2: Deploy Frontend on Render

1. In Render, click "New +" → "Static Site"
2. Connect repository: `Shreyash-chavare/PBL`
3. Configure:
   - **Name**: `collaborative-editor-frontend`
   - **Build Command**: `cd Frontend && npm install && npm run build`
   - **Publish Directory**: `Frontend/dist`
   - **Root Directory**: `/` (leave empty)
   - **Plan**: `Free`

4. Add Environment Variable:
   - `VITE_BACKEND_URL`: `https://collaborative-editor-backend.onrender.com`

5. Click "Create Static Site"

## Step 3: Set up MongoDB Atlas (Paid Option)

Since MongoDB Atlas doesn't have a free tier, you can:

1. **Use MongoDB Atlas ($9/month)**:
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create M0 Sandbox cluster
   - Get connection string
   - Add to backend environment variables

2. **Use Railway for Database Only**:
   - Deploy only MongoDB on Railway
   - Use the connection string in Render backend

## Expected URLs:
- Backend: `https://collaborative-editor-backend.onrender.com`
- Frontend: `https://collaborative-editor-frontend.onrender.com`
