# 🚀 Deployment Checklist

## ✅ Completed Steps:
- [x] Code pushed to GitHub: https://github.com/Shreyash-chavare/PBL
- [x] Production configuration added
- [x] Environment variables configured

## 🔄 Next Steps:

### 1. MongoDB Atlas Setup
- [ ] Create MongoDB Atlas account
- [ ] Create free cluster (M0)
- [ ] Set up database user
- [ ] Allow network access from anywhere
- [ ] Get connection string

### 2. Render.com Backend Deployment
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Create new Web Service
- [ ] Connect repository: Shreyash-chavare/PBL
- [ ] Configure:
  - Name: collaborative-editor-backend
  - Environment: Node
  - Build Command: npm install
  - Start Command: npm start
- [ ] Add Environment Variables:
  - NODE_ENV: production
  - JWT_TOKEN: your-super-secret-jwt-key-2024
  - MONGODB_URI: [your-mongodb-connection-string]
  - FRONTEND_URL: https://collaborative-editor-frontend.onrender.com

### 3. Render.com Frontend Deployment
- [ ] Create new Static Site
- [ ] Connect same repository
- [ ] Configure:
  - Name: collaborative-editor-frontend
  - Build Command: cd Frontend && npm install && npm run build
  - Publish Directory: Frontend/dist
- [ ] Add Environment Variable:
  - VITE_BACKEND_URL: [your-backend-url]

### 4. Final Configuration
- [ ] Update backend FRONTEND_URL with actual frontend URL
- [ ] Test both services
- [ ] Verify database connection

## 🔗 Expected URLs:
- Backend: https://collaborative-editor-backend.onrender.com
- Frontend: https://collaborative-editor-frontend.onrender.com

## 📞 Need Help?
- Check DEPLOYMENT.md for detailed instructions
- Check MONGODB_SETUP.md for database setup
- Common issues in DEPLOYMENT.md troubleshooting section
