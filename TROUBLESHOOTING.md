# Portfolio Troubleshooting Guide

## White Page Issue - Quick Fix

### Step 1: Check the Correct Port
- Frontend runs on: `http://localhost:5173` (NOT 3000)
- Backend runs on: `http://localhost:8000`

### Step 2: Start Both Servers

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
cd backend
python main.py
```

### Step 3: Check Browser Console
1. Open browser at `http://localhost:5173`
2. Press F12 to open Developer Tools
3. Go to Console tab
4. Look for any red errors

### Common Issues:

#### Issue: "Cannot GET /"
- **Solution:** Wrong port. Use `localhost:5173` not `localhost:3000`

#### Issue: "Failed to fetch" or CORS error
- **Solution:** Backend not running. Start `python main.py` in backend folder

#### Issue: Blank white page, no errors
- **Solution:** Check if `npm run dev` is actually running. Look for "Local: http://localhost:5173" in terminal

#### Issue: Module not found errors
- **Solution:** Run `npm install` first

### Verify Everything is Working:

1. Frontend terminal should show:
```
VITE v5.x.x  ready in xxx ms
➜  Local:   http://localhost:5173/
```

2. Backend terminal should show:
```
INFO:     Uvicorn running on http://127.0.0.1:8000
```

3. Browser should load the portfolio with animations

### Still Not Working?

Run these commands:
```bash
# Kill any processes on port 5173
npx kill-port 5173

# Reinstall dependencies
npm install

# Try again
npm run dev
```
