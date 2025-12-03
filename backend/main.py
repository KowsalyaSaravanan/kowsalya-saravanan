from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse, FileResponse
from pydantic import BaseModel, EmailStr
from typing import List, Optional
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv
import uvicorn
import json
from datetime import datetime

load_dotenv()

app = FastAPI(title="Portfolio API")

# Data file paths
DATA_DIR = 'data'
PERSONAL_FILE = f'{DATA_DIR}/personal.json'
ABOUT_FILE = f'{DATA_DIR}/about.json'
SKILLS_FILE = f'{DATA_DIR}/skills.json'
EXPERIENCE_FILE = f'{DATA_DIR}/experience.json'
PROJECTS_FILE = f'{DATA_DIR}/projects.json'

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Email configuration
SMTP_SERVER = os.getenv('SMTP_SERVER', 'smtp.gmail.com')
SMTP_PORT = int(os.getenv('SMTP_PORT', 587))
SENDER_EMAIL = os.getenv('SENDER_EMAIL')
SENDER_PASSWORD = os.getenv('SENDER_PASSWORD')
RECEIVER_EMAIL = os.getenv('RECEIVER_EMAIL')

class ContactForm(BaseModel):
    name: str
    email: EmailStr
    message: str

class Project(BaseModel):
    id: Optional[int] = None
    title: str
    description: str
    tech: List[str]
    category: str
    live: bool = False
    url: Optional[str] = None
    github: Optional[str] = None
    image: Optional[str] = None

class PersonalInfo(BaseModel):
    name: str
    title: str
    tagline: str
    email: str
    linkedin: Optional[str] = None
    github: Optional[str] = None

class AboutInfo(BaseModel):
    heading: str
    summary: str
    description: str

class Skill(BaseModel):
    category: str
    items: List[str]

class Experience(BaseModel):
    id: Optional[int] = None
    title: str
    company: str
    period: str
    description: str
    achievements: List[str]

# Helper functions
def load_json_file(filepath):
    try:
        if os.path.exists(filepath):
            with open(filepath, 'r', encoding='utf-8') as f:
                return json.load(f)
        return None
    except Exception as e:
        print(f"Error loading {filepath}: {e}")
        return None

def save_json_file(filepath, data):
    try:
        os.makedirs(os.path.dirname(filepath), exist_ok=True)
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, indent=2)
        return True
    except Exception as e:
        print(f"Error saving {filepath}: {e}")
        return False

@app.post('/api/send-email')
async def send_email(form: ContactForm):
    try:
        if not all([SENDER_EMAIL, SENDER_PASSWORD, RECEIVER_EMAIL]):
            raise HTTPException(
                status_code=500, 
                detail="Email configuration is missing. Please set up environment variables."
            )

        # Create email message
        msg = MIMEMultipart()
        msg['From'] = SENDER_EMAIL
        msg['To'] = RECEIVER_EMAIL
        msg['Subject'] = f'Portfolio Contact from {form.name}'

        body = f"""
New contact form submission:

Name: {form.name}
Email: {form.email}

Message:
{form.message}
"""

        msg.attach(MIMEText(body, 'plain'))

        # Send email
        with smtplib.SMTP(SMTP_SERVER, SMTP_PORT) as server:
            server.starttls()
            server.login(SENDER_EMAIL, SENDER_PASSWORD)
            server.send_message(msg)

        return {'success': True, 'message': 'Email sent successfully'}

    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=500,
            detail="Email authentication failed. Check your credentials."
        )
    except Exception as e:
        print(f"Error sending email: {str(e)}")
        raise HTTPException(
            status_code=500,
            detail=f"Failed to send email: {str(e)}"
        )

@app.get('/api/portfolio')
async def get_portfolio():
    return {
        'personal': load_json_file(PERSONAL_FILE) or {},
        'about': load_json_file(ABOUT_FILE) or {},
        'skills': load_json_file(SKILLS_FILE) or [],
        'experience': load_json_file(EXPERIENCE_FILE) or [],
        'projects': load_json_file(PROJECTS_FILE) or []
    }

@app.get('/api/projects')
async def get_projects():
    projects = load_json_file(PROJECTS_FILE) or []
    return {'projects': projects}

@app.post('/api/projects')
async def create_project(project: Project):
    projects = load_json_file(PROJECTS_FILE) or []
    
    # Generate new ID
    new_id = max([p.get('id', 0) for p in projects], default=0) + 1
    project_dict = project.dict()
    project_dict['id'] = new_id
    project_dict['created_at'] = datetime.now().isoformat()
    
    projects.append(project_dict)
    save_json_file(PROJECTS_FILE, projects)
    
    return {'success': True, 'project': project_dict}

@app.put('/api/projects/{project_id}')
async def update_project(project_id: int, project: Project):
    projects = load_json_file(PROJECTS_FILE) or []
    
    for i, p in enumerate(projects):
        if p.get('id') == project_id:
            project_dict = project.dict()
            project_dict['id'] = project_id
            project_dict['updated_at'] = datetime.now().isoformat()
            projects[i] = project_dict
            save_json_file(PROJECTS_FILE, projects)
            return {'success': True, 'project': project_dict}
    
    raise HTTPException(status_code=404, detail='Project not found')

@app.delete('/api/projects/{project_id}')
async def delete_project(project_id: int):
    projects = load_json_file(PROJECTS_FILE) or []
    projects = [p for p in projects if p.get('id') != project_id]
    save_json_file(PROJECTS_FILE, projects)
    return {'success': True, 'message': 'Project deleted'}

# Personal Info endpoints
@app.get('/api/personal')
async def get_personal():
    return load_json_file(PERSONAL_FILE) or {}

@app.put('/api/personal')
async def update_personal(info: PersonalInfo):
    save_json_file(PERSONAL_FILE, info.dict())
    return {'success': True, 'personal': info.dict()}

# About endpoints
@app.get('/api/about')
async def get_about():
    return load_json_file(ABOUT_FILE) or {}

@app.put('/api/about')
async def update_about(info: AboutInfo):
    about = load_json_file(ABOUT_FILE) or {}
    about.update(info.dict())
    save_json_file(ABOUT_FILE, about)
    return {'success': True, 'about': about}

# Skills endpoints
@app.get('/api/skills')
async def get_skills():
    skills = load_json_file(SKILLS_FILE) or []
    return {'skills': skills}

@app.post('/api/skills')
async def add_skill(skill: Skill):
    skills = load_json_file(SKILLS_FILE) or []
    skills.append(skill.dict())
    save_json_file(SKILLS_FILE, skills)
    return {'success': True, 'skill': skill.dict()}

@app.put('/api/skills/{index}')
async def update_skill(index: int, skill: Skill):
    skills = load_json_file(SKILLS_FILE) or []
    if 0 <= index < len(skills):
        skills[index] = skill.dict()
        save_json_file(SKILLS_FILE, skills)
        return {'success': True, 'skill': skill.dict()}
    raise HTTPException(status_code=404, detail='Skill not found')

@app.delete('/api/skills/{index}')
async def delete_skill(index: int):
    skills = load_json_file(SKILLS_FILE) or []
    if 0 <= index < len(skills):
        skills.pop(index)
        save_json_file(SKILLS_FILE, skills)
        return {'success': True}
    raise HTTPException(status_code=404, detail='Skill not found')

# Experience endpoints
@app.get('/api/experience')
async def get_experience():
    experiences = load_json_file(EXPERIENCE_FILE) or []
    return {'experience': experiences}

@app.post('/api/experience')
async def add_experience(exp: Experience):
    experiences = load_json_file(EXPERIENCE_FILE) or []
    new_id = max([e.get('id', 0) for e in experiences], default=0) + 1
    exp_dict = exp.dict()
    exp_dict['id'] = new_id
    experiences.append(exp_dict)
    save_json_file(EXPERIENCE_FILE, experiences)
    return {'success': True, 'experience': exp_dict}

@app.put('/api/experience/{exp_id}')
async def update_experience(exp_id: int, exp: Experience):
    experiences = load_json_file(EXPERIENCE_FILE) or []
    for i, e in enumerate(experiences):
        if e.get('id') == exp_id:
            exp_dict = exp.dict()
            exp_dict['id'] = exp_id
            experiences[i] = exp_dict
            save_json_file(EXPERIENCE_FILE, experiences)
            return {'success': True, 'experience': exp_dict}
    raise HTTPException(status_code=404, detail='Experience not found')

@app.delete('/api/experience/{exp_id}')
async def delete_experience(exp_id: int):
    experiences = load_json_file(EXPERIENCE_FILE) or []
    experiences = [e for e in experiences if e.get('id') != exp_id]
    save_json_file(EXPERIENCE_FILE, experiences)
    return {'success': True}

@app.get('/admin', response_class=HTMLResponse)
async def admin_panel():
    try:
        with open('admin.html', 'r', encoding='utf-8') as f:
            return f.read()
    except FileNotFoundError:
        # Fallback to inline HTML if file not found
        return """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio CMS - Admin Panel</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-gray-900 text-white">
    <div class="container mx-auto px-4 py-8">
        <h1 class="text-5xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-pink-600 bg-clip-text text-transparent">Portfolio CMS</h1>
        
        <div class="flex gap-4 mb-8 border-b border-gray-700">
            <button onclick="showTab('personal')" class="tab-btn px-6 py-3 font-semibold hover:text-purple-400 border-b-2 border-transparent" data-tab="personal">Personal Info</button>
            <button onclick="showTab('about')" class="tab-btn px-6 py-3 font-semibold hover:text-purple-400 border-b-2 border-transparent" data-tab="about">About</button>
            <button onclick="showTab('projects')" class="tab-btn px-6 py-3 font-semibold hover:text-purple-400 border-b-2 border-purple-500 text-purple-400" data-tab="projects">Projects</button>
        </div>

        <div id="personal-tab" class="tab-content hidden">
            <div class="bg-gray-800 p-6 rounded-lg mb-8">
                <h2 class="text-2xl font-bold mb-4">Personal Information</h2>
                <form id="personalForm" class="space-y-4">
                    <div><label class="block mb-2">Full Name</label><input type="text" id="personal_name" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Title/Role</label><input type="text" id="personal_title" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Tagline</label><input type="text" id="personal_tagline" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Email</label><input type="email" id="personal_email" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">LinkedIn URL</label><input type="url" id="personal_linkedin" class="w-full bg-gray-700 px-4 py-2 rounded"></div>
                    <button type="submit" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Save</button>
                </form>
            </div>
        </div>

        <div id="about-tab" class="tab-content hidden">
            <div class="bg-gray-800 p-6 rounded-lg mb-8">
                <h2 class="text-2xl font-bold mb-4">About Section</h2>
                <form id="aboutForm" class="space-y-4">
                    <div><label class="block mb-2">Heading</label><input type="text" id="about_heading" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Summary</label><textarea id="about_summary" class="w-full bg-gray-700 px-4 py-2 rounded" rows="3" required></textarea></div>
                    <div><label class="block mb-2">Description</label><textarea id="about_description" class="w-full bg-gray-700 px-4 py-2 rounded" rows="3" required></textarea></div>
                    <button type="submit" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Save</button>
                </form>
            </div>
        </div>

        <div id="projects-tab" class="tab-content">
            <div class="mb-8">
                <button onclick="showProjectForm()" class="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold">+ Add New Project</button>
            </div>
            <div id="projectForm" class="hidden mb-8 bg-gray-800 p-6 rounded-lg">
                <h2 class="text-2xl font-bold mb-4">Add/Edit Project</h2>
                <form id="projectFormElement" class="space-y-4">
                    <input type="hidden" id="projectId">
                    <div><label class="block mb-2">Title</label><input type="text" id="project_title" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Description</label><textarea id="project_description" class="w-full bg-gray-700 px-4 py-2 rounded" rows="3" required></textarea></div>
                    <div><label class="block mb-2">Category</label><input type="text" id="project_category" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Technologies (comma separated)</label><input type="text" id="project_tech" class="w-full bg-gray-700 px-4 py-2 rounded" required></div>
                    <div><label class="block mb-2">Live URL</label><input type="url" id="project_url" class="w-full bg-gray-700 px-4 py-2 rounded"></div>
                    <div><label class="block mb-2">GitHub URL</label><input type="url" id="project_github" class="w-full bg-gray-700 px-4 py-2 rounded"></div>
                    <div><label class="flex items-center"><input type="checkbox" id="project_live" class="mr-2"><span>Project is Live</span></label></div>
                    <div class="flex gap-4">
                        <button type="submit" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Save</button>
                        <button type="button" onclick="hideProjectForm()" class="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>
            <div id="projectsList" class="space-y-4"></div>
        </div>
    </div>

    <script>
        const API_BASE = '/api';
        function showTab(t){document.querySelectorAll('.tab-content').forEach(e=>e.classList.add('hidden'));document.querySelectorAll('.tab-btn').forEach(e=>{e.classList.remove('border-purple-500','text-purple-400');e.classList.add('border-transparent')});document.getElementById(t+'-tab').classList.remove('hidden');document.querySelector('[data-tab="'+t+'"]').classList.add('border-purple-500','text-purple-400');if(t==='personal')loadPersonal();if(t==='about')loadAbout();if(t==='projects')loadProjects();}
        async function loadPersonal(){const r=await fetch(API_BASE+'/personal');const d=await r.json();document.getElementById('personal_name').value=d.name||'';document.getElementById('personal_title').value=d.title||'';document.getElementById('personal_tagline').value=d.tagline||'';document.getElementById('personal_email').value=d.email||'';document.getElementById('personal_linkedin').value=d.linkedin||'';}
        document.getElementById('personalForm').addEventListener('submit',async(e)=>{e.preventDefault();const d={name:document.getElementById('personal_name').value,title:document.getElementById('personal_title').value,tagline:document.getElementById('personal_tagline').value,email:document.getElementById('personal_email').value,linkedin:document.getElementById('personal_linkedin').value||null};await fetch(API_BASE+'/personal',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});alert('Saved!');});
        async function loadAbout(){const r=await fetch(API_BASE+'/about');const d=await r.json();document.getElementById('about_heading').value=d.heading||'';document.getElementById('about_summary').value=d.summary||'';document.getElementById('about_description').value=d.description||'';}
        document.getElementById('aboutForm').addEventListener('submit',async(e)=>{e.preventDefault();const d={heading:document.getElementById('about_heading').value,summary:document.getElementById('about_summary').value,description:document.getElementById('about_description').value};await fetch(API_BASE+'/about',{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(d)});alert('Saved!');});
        async function loadProjects(){const r=await fetch(API_BASE+'/projects');const d=await r.json();const p=d.projects;document.getElementById('projectsList').innerHTML=p.map(p=>'<div class="bg-gray-800 p-6 rounded-lg"><div class="flex justify-between items-start"><div class="flex-1"><h3 class="text-2xl font-bold mb-2">'+p.title+'</h3><p class="text-gray-400 mb-2">'+p.description+'</p><div class="flex flex-wrap gap-2 mb-2">'+p.tech.map(t=>'<span class="bg-purple-600 px-3 py-1 rounded text-sm">'+t+'</span>').join('')+'</div><p class="text-sm text-gray-500">Category: '+p.category+'</p>'+(p.live?'<span class="text-green-400 text-sm">● Live</span>':'')+'</div><div class="flex gap-2"><button onclick="editProject('+p.id+')" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Edit</button><button onclick="deleteProject('+p.id+')" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Delete</button></div></div></div>').join('');}
        function showProjectForm(){document.getElementById('projectForm').classList.remove('hidden');document.getElementById('projectFormElement').reset();document.getElementById('projectId').value='';}
        function hideProjectForm(){document.getElementById('projectForm').classList.add('hidden');}
        async function editProject(id){const r=await fetch(API_BASE+'/projects');const d=await r.json();const p=d.projects.find(p=>p.id===id);if(p){document.getElementById('projectId').value=p.id;document.getElementById('project_title').value=p.title;document.getElementById('project_description').value=p.description;document.getElementById('project_category').value=p.category;document.getElementById('project_tech').value=p.tech.join(', ');document.getElementById('project_url').value=p.url||'';document.getElementById('project_github').value=p.github||'';document.getElementById('project_live').checked=p.live;showProjectForm();}}
        async function deleteProject(id){if(confirm('Delete?')){await fetch(API_BASE+'/projects/'+id,{method:'DELETE'});loadProjects();}}
        document.getElementById('projectFormElement').addEventListener('submit',async(e)=>{e.preventDefault();const id=document.getElementById('projectId').value;const p={title:document.getElementById('project_title').value,description:document.getElementById('project_description').value,category:document.getElementById('project_category').value,tech:document.getElementById('project_tech').value.split(',').map(t=>t.trim()),url:document.getElementById('project_url').value||null,github:document.getElementById('project_github').value||null,live:document.getElementById('project_live').checked};const url=id?API_BASE+'/projects/'+id:API_BASE+'/projects';const method=id?'PUT':'POST';await fetch(url,{method:method,headers:{'Content-Type':'application/json'},body:JSON.stringify(p)});hideProjectForm();loadProjects();});
        showTab('projects');
    </script>
</body>
</html>
"""

@app.get('/admin-old', response_class=HTMLResponse)
async def admin_panel_old():
    return """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Portfolio Admin</title>
        <script src="https://cdn.tailwindcss.com"></script>
    </head>
    <body class="bg-gray-900 text-white">
        <div class="container mx-auto px-4 py-8">
            <h1 class="text-4xl font-bold mb-8">Portfolio Admin Panel</h1>
            
            <div class="mb-8">
                <button onclick="showAddForm()" class="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold">
                    + Add New Project
                </button>
            </div>

            <div id="addForm" class="hidden mb-8 bg-gray-800 p-6 rounded-lg">
                <h2 class="text-2xl font-bold mb-4">Add New Project</h2>
                <form id="projectForm" class="space-y-4">
                    <input type="hidden" id="projectId">
                    <div>
                        <label class="block mb-2">Title</label>
                        <input type="text" id="title" class="w-full bg-gray-700 px-4 py-2 rounded" required>
                    </div>
                    <div>
                        <label class="block mb-2">Description</label>
                        <textarea id="description" class="w-full bg-gray-700 px-4 py-2 rounded" rows="3" required></textarea>
                    </div>
                    <div>
                        <label class="block mb-2">Category</label>
                        <input type="text" id="category" class="w-full bg-gray-700 px-4 py-2 rounded" required>
                    </div>
                    <div>
                        <label class="block mb-2">Technologies (comma separated)</label>
                        <input type="text" id="tech" class="w-full bg-gray-700 px-4 py-2 rounded" placeholder="React, Node.js, MongoDB" required>
                    </div>
                    <div>
                        <label class="block mb-2">Live URL</label>
                        <input type="url" id="url" class="w-full bg-gray-700 px-4 py-2 rounded">
                    </div>
                    <div>
                        <label class="block mb-2">GitHub URL</label>
                        <input type="url" id="github" class="w-full bg-gray-700 px-4 py-2 rounded">
                    </div>
                    <div>
                        <label class="flex items-center">
                            <input type="checkbox" id="live" class="mr-2">
                            <span>Project is Live</span>
                        </label>
                    </div>
                    <div class="flex gap-4">
                        <button type="submit" class="bg-green-600 hover:bg-green-700 px-6 py-2 rounded">Save</button>
                        <button type="button" onclick="hideAddForm()" class="bg-gray-600 hover:bg-gray-700 px-6 py-2 rounded">Cancel</button>
                    </div>
                </form>
            </div>

            <div id="projectsList" class="space-y-4"></div>
        </div>

        <script>
            async function loadProjects() {
                const response = await fetch('/api/projects');
                const data = await response.json();
                const projects = data.projects;
                
                const list = document.getElementById('projectsList');
                list.innerHTML = projects.map(p => `
                    <div class="bg-gray-800 p-6 rounded-lg">
                        <div class="flex justify-between items-start">
                            <div class="flex-1">
                                <h3 class="text-2xl font-bold mb-2">${p.title}</h3>
                                <p class="text-gray-400 mb-2">${p.description}</p>
                                <div class="flex flex-wrap gap-2 mb-2">
                                    ${p.tech.map(t => `<span class="bg-purple-600 px-3 py-1 rounded text-sm">${t}</span>`).join('')}
                                </div>
                                <p class="text-sm text-gray-500">Category: ${p.category}</p>
                                ${p.live ? '<span class="text-green-400 text-sm">● Live</span>' : ''}
                            </div>
                            <div class="flex gap-2">
                                <button onclick="editProject(${p.id})" class="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded">Edit</button>
                                <button onclick="deleteProject(${p.id})" class="bg-red-600 hover:bg-red-700 px-4 py-2 rounded">Delete</button>
                            </div>
                        </div>
                    </div>
                `).join('');
            }

            function showAddForm() {
                document.getElementById('addForm').classList.remove('hidden');
                document.getElementById('projectForm').reset();
                document.getElementById('projectId').value = '';
            }

            function hideAddForm() {
                document.getElementById('addForm').classList.add('hidden');
            }

            async function editProject(id) {
                const response = await fetch('/api/projects');
                const data = await response.json();
                const project = data.projects.find(p => p.id === id);
                
                if (project) {
                    document.getElementById('projectId').value = project.id;
                    document.getElementById('title').value = project.title;
                    document.getElementById('description').value = project.description;
                    document.getElementById('category').value = project.category;
                    document.getElementById('tech').value = project.tech.join(', ');
                    document.getElementById('url').value = project.url || '';
                    document.getElementById('github').value = project.github || '';
                    document.getElementById('live').checked = project.live;
                    showAddForm();
                }
            }

            async function deleteProject(id) {
                if (confirm('Are you sure you want to delete this project?')) {
                    await fetch(`/api/projects/${id}`, { method: 'DELETE' });
                    loadProjects();
                }
            }

            document.getElementById('projectForm').addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const projectId = document.getElementById('projectId').value;
                const project = {
                    title: document.getElementById('title').value,
                    description: document.getElementById('description').value,
                    category: document.getElementById('category').value,
                    tech: document.getElementById('tech').value.split(',').map(t => t.trim()),
                    url: document.getElementById('url').value || null,
                    github: document.getElementById('github').value || null,
                    live: document.getElementById('live').checked
                };

                const url = projectId ? `/api/projects/${projectId}` : '/api/projects';
                const method = projectId ? 'PUT' : 'POST';

                await fetch(url, {
                    method: method,
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(project)
                });

                hideAddForm();
                loadProjects();
            });

            loadProjects();
        </script>
    </body>
    </html>
    """

@app.get('/api/resume')
async def download_resume():
    resume_path = 'Kowsalya.Saravanan.pdf'
    if os.path.exists(resume_path):
        return FileResponse(
            resume_path,
            media_type='application/pdf',
            filename='Kowsalya_Saravanan_Resume.pdf'
        )
    raise HTTPException(status_code=404, detail='Resume not found')

@app.get('/')
async def root():
    return {'message': 'Portfolio API is running. Visit /admin for admin panel.'}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)
