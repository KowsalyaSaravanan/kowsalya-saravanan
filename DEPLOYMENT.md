# Portfolio Deployment Guide

## 🚀 Quick Deployment Options

### Option 1: Vercel (Recommended - Easiest)

**Frontend Deployment:**

1. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```

2. **Deploy Frontend:**
   ```bash
   vercel
   ```
   - Follow prompts
   - Your site will be live at: `https://your-portfolio.vercel.app`

**Backend Deployment (Vercel Serverless):**
- Vercel supports Python serverless functions
- Your backend will be at: `https://your-portfolio.vercel.app/api`

---

### Option 2: Netlify + Render

**Frontend on Netlify:**

1. **Build your project:**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify:**
   - Go to https://netlify.com
   - Drag & drop your `dist` folder
   - Get URL: `https://your-name.netlify.app`

**Backend on Render:**

1. Go to https://render.com
2. Create new Web Service
3. Connect your GitHub repo
4. Set:
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Get URL: `https://your-api.onrender.com`

---

### Option 3: GitHub Pages + Railway

**Frontend on GitHub Pages:**

1. **Update vite.config.ts:**
   ```typescript
   export default defineConfig({
     base: '/your-repo-name/',
     // ... rest of config
   })
   ```

2. **Deploy:**
   ```bash
   npm run build
   git add dist -f
   git commit -m "Deploy"
   git subtree push --prefix dist origin gh-pages
   ```
   - URL: `https://your-username.github.io/your-repo-name`

**Backend on Railway:**

1. Go to https://railway.app
2. Deploy from GitHub
3. Add environment variables
4. Get URL: `https://your-api.up.railway.app`

---

## 📝 Pre-Deployment Checklist

### 1. Update API URLs

**In your components, change:**
```typescript
// FROM:
fetch('http://127.0.0.1:8000/api/...')

// TO:
fetch('https://your-backend-url.com/api/...')
```

**Or use environment variables:**

Create `.env`:
```
VITE_API_URL=https://your-backend-url.com
```

Update components:
```typescript
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';
fetch(`${API_URL}/api/...`)
```

### 2. Backend Requirements

Create `backend/requirements.txt`:
```
fastapi==0.104.1
uvicorn==0.24.0
python-dotenv==1.0.0
pydantic==2.5.0
python-multipart==0.0.6
```

### 3. Update CORS

In `backend/main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://your-frontend-url.vercel.app",
        "https://your-frontend-url.netlify.app",
        "http://localhost:3000"  # for local dev
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

---

## 🌐 Custom Domain (Optional)

### For Vercel:
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as shown

### For Netlify:
1. Go to Domain Settings
2. Add custom domain
3. Update DNS records

---

## 📱 After Deployment

### Update Your Links:

**GitHub Profile:**
- Add portfolio URL to bio
- Pin the repository

**Naukri Profile:**
- Add portfolio URL in "Portfolio/Work Samples" section
- Add in resume header

**LinkedIn:**
- Add to "Featured" section
- Add to "Contact Info"

**Resume:**
- Add URL below your name/contact info

---

## 🔧 Recommended: Vercel Full Stack

**Easiest all-in-one solution:**

1. **Create `vercel.json` in root:**
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "framework": "vite",
  "rewrites": [
    {
      "source": "/api/:path*",
      "destination": "/backend/main.py"
    }
  ]
}
```

2. **Deploy:**
```bash
vercel --prod
```

3. **Done!** Get URL like: `https://kowsalya-portfolio.vercel.app`

---

## 💡 Pro Tips

1. **Use environment variables** for API URLs
2. **Enable HTTPS** (automatic on Vercel/Netlify)
3. **Add Google Analytics** for tracking
4. **Set up custom domain** for professional look
5. **Add to resume** and all job applications

---

## 🆘 Need Help?

- Vercel Docs: https://vercel.com/docs
- Netlify Docs: https://docs.netlify.com
- Render Docs: https://render.com/docs
