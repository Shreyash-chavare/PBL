# Supabase Deployment Instructions

## Why Supabase?
- Free tier available
- PostgreSQL database (we'll need to modify the code)
- Built-in authentication
- Real-time subscriptions

## Step 1: Set up Supabase
1. Go to [Supabase.com](https://supabase.com)
2. Sign up with GitHub
3. Create a new project
4. Choose a region close to you

## Step 2: Get Database Connection
1. In your Supabase dashboard, go to "Settings" → "Database"
2. Copy the connection string
3. It will look like: `postgresql://postgres:[password]@[host]:5432/postgres`

## Step 3: Deploy Backend (Render.com)
1. Go to [Render.com](https://render.com)
2. Deploy your backend as before
3. Use the Supabase connection string as `DATABASE_URL`

## Step 4: Deploy Frontend (Render.com)
1. Deploy frontend as before
2. Add Supabase environment variables

## Note: This requires code changes to use PostgreSQL instead of MongoDB
