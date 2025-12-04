# 🐳 Docker Deployment Guide

Complete guide to deploy the portfolio using Docker.

## Prerequisites

- Docker installed ([Get Docker](https://docs.docker.com/get-docker/))
- Docker Compose installed (comes with Docker Desktop)

## Quick Start

### Option 1: Using Docker Compose (Recommended)

Run both frontend and backend together:

```bash
docker-compose up -d
```

Access the portfolio at: `http://localhost`

### Option 2: Build and Run Separately

**Backend:**
```bash
cd backend
docker build -t portfolio-backend .
docker run -d -p 8000:8000 --name backend portfolio-backend
```

**Frontend:**
```bash
docker build -t portfolio-frontend .
docker run -d -p 80:80 --name frontend portfolio-frontend
```

## Docker Commands

### Start containers
```bash
docker-compose up -d
```

### Stop containers
```bash
docker-compose down
```

### View logs
```bash
# All services
docker-compose logs -f

# Backend only
docker-compose logs -f backend

# Frontend only
docker-compose logs -f frontend
```

### Rebuild after code changes
```bash
docker-compose up -d --build
```

### Check running containers
```bash
docker ps
```

## Port Configuration

- **Frontend:** http://localhost (port 80)
- **Backend API:** http://localhost:8000

## Environment Variables

Create a `.env` file in the backend folder for production:

```env
# Backend environment variables
API_HOST=0.0.0.0
API_PORT=8000
```

## Production Deployment

### Deploy to AWS/DigitalOcean/Any VPS

1. **Install Docker on server:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh
```

2. **Clone repository:**
```bash
git clone https://github.com/KowsalyaSaravanan/portfolio.git
cd portfolio
```

3. **Run with Docker Compose:**
```bash
docker-compose up -d
```

4. **Setup domain (optional):**
   - Point your domain to server IP
   - Update nginx.conf with your domain
   - Add SSL with Let's Encrypt

### Deploy to Docker Hub

1. **Build and tag images:**
```bash
docker build -t yourusername/portfolio-frontend .
docker build -t yourusername/portfolio-backend ./backend
```

2. **Push to Docker Hub:**
```bash
docker push yourusername/portfolio-frontend
docker push yourusername/portfolio-backend
```

3. **Pull and run on any server:**
```bash
docker pull yourusername/portfolio-frontend
docker pull yourusername/portfolio-backend
docker-compose up -d
```

## Troubleshooting

### Port already in use
```bash
# Kill process on port 80
sudo lsof -ti:80 | xargs kill -9

# Or change port in docker-compose.yml
ports:
  - "8080:80"  # Use port 8080 instead
```

### Container won't start
```bash
# Check logs
docker-compose logs backend
docker-compose logs frontend

# Restart containers
docker-compose restart
```

### Clear everything and start fresh
```bash
docker-compose down -v
docker system prune -a
docker-compose up -d --build
```

## File Structure

```
portfolio/
├── Dockerfile              # Frontend Docker config
├── docker-compose.yml      # Orchestration config
├── nginx.conf             # Nginx web server config
├── .dockerignore          # Files to exclude from build
└── backend/
    ├── Dockerfile         # Backend Docker config
    └── .dockerignore      # Backend exclusions
```

## Benefits of Docker Deployment

✅ Consistent environment across all machines
✅ Easy to deploy anywhere
✅ Isolated dependencies
✅ Simple scaling
✅ Quick rollbacks
✅ Production-ready setup

---

Need help? Check the main [README.md](README.md) or open an issue!
