# Portfolio CMS - Complete Admin Panel

## 🚀 Quick Start

1. **Start the backend server:**
   ```bash
   cd backend
   python main.py
   ```

2. **Access the admin panel:**
   Open: `http://localhost:8000/admin`

3. **Edit your portfolio:**
   - **Personal Info**: Name, title, email, social links
   - **About**: Heading, summary, description
   - **Projects**: Add/edit/delete projects
   - **Skills**: Edit in JSON (UI coming soon)
   - **Experience**: Edit in JSON (UI coming soon)

## ✨ Features

### Fully Dynamic Content
- ✅ Personal information (name, title, tagline, email, social links)
- ✅ About section (heading, summary, description, stats, competencies)
- ✅ Projects (add/edit/delete with full details)
- ✅ Skills (categories and items)
- ✅ Experience (work history)

### Easy Management
- 🎨 Beautiful admin interface
- 📝 Simple forms for editing
- 💾 Auto-save to JSON file
- 🔄 Real-time updates on frontend
- 📦 Easy backup (just copy the JSON file)

## 📊 Data Storage

All data is in `backend/portfolio_data.json`:
```json
{
  "personal": { ... },
  "about": { ... },
  "projects": [ ... ],
  "skills": [ ... ],
  "experience": [ ... ]
}
```

## 🔌 API Endpoints

### Portfolio Data
- `GET /api/portfolio` - Get all data
- `GET /api/personal` - Get personal info
- `PUT /api/personal` - Update personal info
- `GET /api/about` - Get about section
- `PUT /api/about` - Update about section

### Projects
- `GET /api/projects` - List all projects
- `POST /api/projects` - Create project
- `PUT /api/projects/{id}` - Update project
- `DELETE /api/projects/{id}` - Delete project

### Skills
- `GET /api/skills` - List all skills
- `POST /api/skills` - Add skill category
- `PUT /api/skills/{index}` - Update skill
- `DELETE /api/skills/{index}` - Delete skill

### Experience
- `GET /api/experience` - List experience
- `POST /api/experience` - Add experience
- `PUT /api/experience/{id}` - Update experience
- `DELETE /api/experience/{id}` - Delete experience

## 🎯 How It Works

1. **Backend** stores all data in `portfolio_data.json`
2. **Admin Panel** provides UI to edit the data
3. **Frontend** fetches data from API endpoints
4. **Design stays the same** - only content changes!

## 💡 Tips

- Backup `portfolio_data.json` regularly
- Edit JSON directly for bulk changes
- Frontend auto-fetches new data
- No code changes needed to update content!
