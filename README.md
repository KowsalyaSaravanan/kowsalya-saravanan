# 🚀 Kowsalya Saravanan - AI/ML Engineer Portfolio

A modern, interactive portfolio website showcasing AI/ML projects and experience with stunning 3D animations and holographic UI effects.

## 🌟 Live Demo

🔗 **[View Live Portfolio](YOUR_VERCEL_URL_HERE)** 

> Replace `YOUR_VERCEL_URL_HERE` with your deployed Vercel URL after deployment

### 📸 Preview
![Portfolio Preview](https://via.placeholder.com/1200x600/0F172A/8B5CF6?text=Portfolio+Preview)

> Add a screenshot of your portfolio here after deployment

## ✨ Features

- 🎨 **Holographic UI Design** - Modern glass morphism with animated gradients
- 🌐 **3D Background** - Interactive Three.js neural network visualization
- 📱 **Responsive Design** - Works seamlessly on all devices
- 🎯 **Smooth Animations** - Framer Motion powered transitions
- 🔥 **Dynamic Content** - Backend API for easy content management
- 🎭 **Mac-style Dock Navigation** - Animated bottom navigation bar

## 🛠️ Tech Stack

### Frontend
- **React 19** with TypeScript
- **Vite** - Lightning fast build tool
- **Three.js** & **React Three Fiber** - 3D graphics
- **Framer Motion** - Smooth animations
- **Tailwind CSS** - Utility-first styling
- **Lucide React** - Beautiful icons

### Backend
- **FastAPI** - Modern Python web framework
- **Python 3.8+** - Backend logic
- **CORS enabled** - Cross-origin support

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Python 3.8+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/KowsalyaSaravanan/portfolio.git
cd portfolio
```

2. **Install frontend dependencies**
```bash
npm install
```

3. **Install backend dependencies**
```bash
cd backend
pip install -r requirements.txt
```

### Running Locally

**Terminal 1 - Start Frontend:**
```bash
npm run dev
```
Frontend will run on: `http://localhost:5173`

**Terminal 2 - Start Backend:**
```bash
cd backend
python main.py
```
Backend API will run on: `http://localhost:8000`

### Access the Portfolio
Open your browser and navigate to: `http://localhost:5173`

## 📁 Project Structure

```
portfolio/
├── components/          # React components
│   ├── Hero.tsx        # Landing section
│   ├── About.tsx       # About section
│   ├── Projects.tsx    # Projects showcase
│   ├── Skills.tsx      # Skills display
│   ├── Experience.tsx  # Work experience
│   └── Contact.tsx     # Contact form
├── backend/            # Python FastAPI backend
│   ├── main.py        # API server
│   ├── data/          # JSON data files
│   └── requirements.txt
├── App.tsx            # Main app component
├── index.tsx          # Entry point
└── index.html         # HTML template
```

## 🎨 Customization

### Update Personal Information
Edit the data files in `backend/data/`:
- `personal.json` - Name, role, contact info
- `projects.json` - Your projects
- `experience.json` - Work experience
- `skills.json` - Technical skills
- `about.json` - About section content

### Modify Styling
- Colors and theme: Edit `tailwind.config` in `index.html`
- Custom styles: Modify the `<style>` section in `index.html`
- Component styles: Update individual component files

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Install Vercel CLI**
```bash
npm i -g vercel
```

2. **Deploy**
```bash
vercel
```

3. **Follow the prompts** and your site will be live!

### Deploy Backend
- Use **Render**, **Railway**, or **Heroku** for the FastAPI backend
- Update the API URL in `App.tsx` to point to your deployed backend

## 📝 API Endpoints

- `GET /api/portfolio` - Get all portfolio data
- `GET /api/personal` - Get personal information
- `GET /api/projects` - Get projects list
- `GET /api/experience` - Get work experience
- `GET /api/skills` - Get skills data
- `GET /api/about` - Get about section content

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio!

## 📧 Contact

**Kowsalya Saravanan**
- Email: kowsi143rc@gmail.com
- LinkedIn: [linkedin.com/in/kowsalya-saravanan](https://www.linkedin.com/in/kowsalya-saravanan-709a45258)
- Phone: +91 9025417742

## 📄 License

This project is open source and available for personal use.

---

Made with ❤️ by Kowsalya Saravanan
