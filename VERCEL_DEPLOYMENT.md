# 🚀 Vercel Deployment Guide

Complete guide to deploy your portfolio on Vercel.

## Prerequisites

- GitHub account
- Vercel account (sign up at [vercel.com](https://vercel.com))
- Code pushed to GitHub

## Step 1: Push Code to GitHub

```bash
git add .
git commit -m "Ready for Vercel deployment"
git push origin main
```

## Step 2: Deploy Frontend to Vercel

### Option A: Using Vercel Dashboard (Easiest)

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New Project"**
3. Import your GitHub repository
4. Configure project:
   - **Framework Preset:** Vite
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm install`
5. Add Environment Variable:
   - Key: `VITE_API_URL`
   - Value: `https://your-backend-url.com` (add after backend deployment)
6. Click **"Deploy"**

### Option B: Using Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# For production
vercel --prod
```

## Step 3: Deploy Backend

The backend needs to be deployed separately. Choose one:

### Option 1: Railway (Recommended)

1. Go to [railway.app](https://railway.app)
2. Sign in with GitHub
3. Click **"New Project"** → **"Deploy from GitHub repo"**
4. Select your repository
5. Add a new service for backend:
   - **Root Directory:** `backend`
   - **Start Command:** `python main.py`
6. Add environment variables if needed
7. Copy the generated URL (e.g., `https://your-app.railway.app`)

### Option 2: Render

1. Go to [render.com](https://render.com)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Configure:
   - **Root Directory:** `backend`
   - **Build Command:** `pip install -r requirements.txt`
   - **Start Command:** `python main.py`
5. Copy the generated URL

### Option 3: Heroku

```bash
# Install Heroku CLI
# Create Procfile in backend folder
echo "web: python main.py" > backend/Procfile

# Deploy
cd backend
heroku create your-portfolio-api
git subtree push --prefix backend heroku main
```

## Step 4: Connect Frontend to Backend

1. Go to your Vercel project dashboard
2. Go to **Settings** → **Environment Variables**
3. Add/Update:
   - Key: `VITE_API_URL`
   - Value: Your backend URL (e.g., `https://your-app.railway.app`)
4. Redeploy: **Deployments** → **...** → **Redeploy**

## Step 5: Add Custom Domain (Optional)

### On Vercel:

1. Go to your project → **Settings** → **Domains**
2. Add your domain: `kowsalyasaravanan.info`
3. Follow DNS configuration instructions
4. Add these records in GoDaddy:
   - **Type:** A
   - **Name:** @
   - **Value:** `76.76.21.21` (Vercel IP)
   - **Type:** CNAME
   - **Name:** www
   - **Value:** `cname.vercel-dns.com`

## Your Final URLs

After deployment, you'll have:

- **Frontend:** `https://your-project.vercel.app`
- **Custom Domain:** `https://kowsalyasaravanan.info` (if configured)
- **Backend:** `https://your-backend.railway.app`

## Troubleshooting

### Build Fails
- Check build logs in Vercel dashboard
- Ensure all dependencies are in `package.json`
- Verify Node.js version compatibility

### API Not Working
- Check CORS settings in backend `main.py`
- Verify `VITE_API_URL` environment variable
- Check backend logs

### Domain Not Working
- Wait 24-48 hours for DNS propagation
- Verify DNS records in GoDaddy
- Check SSL certificate status in Vercel

## Update Deployment

Every time you push to GitHub, Vercel will automatically redeploy!

```bash
git add .
git commit -m "Update portfolio"
git push origin main
```

## Environment Variables Summary

### Frontend (.env)
```
VITE_API_URL=https://your-backend-url.com
```

### Backend (.env)
```
# Add any backend environment variables here
```

---

Need help? Check the [Vercel Documentation](https://vercel.com/docs) or [Railway Documentation](https://docs.railway.app)
