# MongoDB Atlas Setup Instructions

## Step 1: Create MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Click "Try Free" and create an account
3. Choose "Free" plan (M0)

## Step 2: Create Cluster
1. Click "Build a Database"
2. Choose "FREE" tier (M0)
3. Select your preferred cloud provider (AWS/Google Cloud/Azure)
4. Choose a region close to you
5. Click "Create"

## Step 3: Set Up Database Access
1. In the left sidebar, click "Database Access"
2. Click "Add New Database User"
3. Choose "Password" authentication
4. Create a username and password (save these!)
5. Select "Read and write to any database"
6. Click "Add User"

## Step 4: Set Up Network Access
1. In the left sidebar, click "Network Access"
2. Click "Add IP Address"
3. Click "Allow Access from Anywhere" (for deployment)
4. Click "Confirm"

## Step 5: Get Connection String
1. Go back to "Database" in the sidebar
2. Click "Connect"
3. Choose "Connect your application"
4. Copy the connection string
5. Replace `<password>` with your actual password
6. Replace `<dbname>` with `collaborative_editor`

## Example Connection String:
```
mongodb+srv://yourusername:yourpassword@cluster0.xxxxx.mongodb.net/collaborative_editor?retryWrites=true&w=majority
```

## Step 6: Add to Render Environment Variables
1. Go back to your Render backend service
2. Go to "Environment" tab
3. Add the connection string as `MONGODB_URI`
4. Redeploy the service

Your database will be ready for your collaborative code editor!
