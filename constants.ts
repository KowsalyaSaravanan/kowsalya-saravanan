import { Project, Experience, SkillCategory, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Kowsalya Saravanan",
  role: "Senior AI & ML Engineer",
  email: "kowsi143rc@gmail.com",
  phone: "+91 9025417742",
  location: "Chennai, India",
  summary: "AI & ML Engineer with 1+ year experience delivering AI features for 6 apps (4 live). Skilled in Data Analytics, Computer Vision, NLP, and Recommendation Systems with strong model training expertise. Passionate about applying ML to solve real business problems."
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: "https://www.linkedin.com/in/kowsalya-saravanan-709a45258", icon: "linkedin", text: "LinkedIn Profile" },
  { platform: "Email", url: `mailto:${PERSONAL_INFO.email}`, icon: "mail", text: PERSONAL_INFO.email },
  { platform: "Phone", url: `tel:${PERSONAL_INFO.phone}`, icon: "phone", text: PERSONAL_INFO.phone }
];

export const SKILLS: SkillCategory[] = [
  {
    name: "Machine Learning",
    skills: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "Deep Learning"]
  },
  {
    name: "Computer Vision",
    skills: ["OpenCV", "Mediapipe", "CNNs", "Object Detection", "Face Auth"]
  },
  {
    name: "NLP & Speech",
    skills: ["LLMs", "Transformers", "Whisper STT", "TTS", "Speech Translation"]
  },
  {
    name: "Data & MLOps",
    skills: ["PySpark", "SQL", "Neo4j", "Airflow", "Docker", "CI/CD", "Git"]
  }
];

export const EXPERIENCE: Experience[] = [
  {
    role: "AI & ML Engineer",
    company: "Data Spark AI Solution Company",
    location: "Chennai, India",
    period: "June 2024 – Present",
    description: "Sole AI/ML engineer in a 20-member team, delivering end-to-end solutions across NLP, Computer Vision, Data Analytics, and Recommendation Systems.",
    achievements: [
      "Designed MLOps pipelines (Airflow, Docker, CI/CD) for model training, deployment, and monitoring.",
      "Built and deployed transformer-based NLP models, CNNs for proctoring & vision tasks, and graph-based recommenders.",
      "Delivered AI features for 6 commercial apps (4 live)."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "Sastra",
    category: "NLP & Recommender",
    description: "Real-time multilingual speech translation & personalized recommendations engine.",
    tech: ["Whisper", "Transformers", "Translation", "Recommender Systems"],
    live: true,
    url: "#"
  },
  {
    title: "Intervu",
    category: "NLP & Automation",
    description: "Resume parsing & job-matching system with web scraping and external integrations.",
    tech: ["NLP", "Resume Parsing", "Web Scraping", "Matching Algorithms"],
    live: true,
    url: "#"
  },
  {
    title: "IELTSGenAI & PTEGenAI",
    category: "Computer Vision",
    description: "Proctoring systems featuring face authentication, monitoring, and AI-driven feedback.",
    tech: ["Computer Vision", "Face Auth", "Proctoring", "Real-time Monitoring"],
    live: true,
    url: "#"
  },
  {
    title: "Ace",
    category: "Conversational AI",
    description: "Conversational AI bots designed for English learning using LLMs combined with STT/TTS technologies.",
    tech: ["LLMs", "STT", "TTS", "Chatbot"],
    live: true,
    url: "#"
  },
  {
    title: "Pandora",
    category: "Computer Vision",
    description: "Smart school CV system for automated attendance, object detection, and emotion detection.",
    tech: ["Object Detection", "Emotion AI", "Face Recognition", "OpenCV"]
  }
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science",
    school: "Asan Memorial Arts and Science College, Chennai",
    year: "2023"
  },
  {
    degree: "Data Science Certification",
    school: "Quality Thought",
    year: "4 months"
  }
];