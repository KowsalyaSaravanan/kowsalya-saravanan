# Portfolio Data Structure

## 📁 Separate JSON Files

Each section of your portfolio has its own JSON file for easy management:

```
backend/data/
├── personal.json      # Name, title, email, social links
├── about.json         # About section with stats & competencies
├── skills.json        # Skills organized by category
├── experience.json    # Work experience
└── projects.json      # All projects
```

## ✨ Benefits

- **Clean Organization**: One file per section
- **Easy to Edit**: Edit any section without touching others
- **Easy to Backup**: Backup individual sections
- **Version Control**: Track changes per section
- **No Conflicts**: Multiple people can edit different sections

## 📝 How to Edit

### Option 1: Admin Panel (Recommended)
1. Go to `http://localhost:8000/admin`
2. Use the web interface to edit

### Option 2: Direct File Edit
1. Open the JSON file you want to edit
2. Make your changes
3. Save the file
4. Refresh your portfolio

## 🔄 API Endpoints

- `GET /api/personal` → reads `personal.json`
- `GET /api/about` → reads `about.json`
- `GET /api/skills` → reads `skills.json`
- `GET /api/experience` → reads `experience.json`
- `GET /api/projects` → reads `projects.json`
- `GET /api/portfolio` → combines all files

## 💾 Backup

To backup your portfolio data, just copy the entire `data/` folder!
