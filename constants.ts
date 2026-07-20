import { Project, SocialLink } from './types';

export const PERSONAL_INFO = {
  name: "Kowsalya Saravanan",
  role: "Senior Software Engineer - AI, ML & Backend",
  title: "Senior Software Engineer - AI, ML & Backend",
  tagline: "Specializing in scalable microservices, LLM orchestration, and production-grade architectures.",
  email: "kowsi143rc@gmail.com",
  phone: "+91 9025417742",
  location: "Chennai, India",
  linkedin: "https://www.linkedin.com/in/kowsalya-saravanan-709a45258",
  github: "https://github.com/KowsalyaSaravanan",
  summary: "Senior Software Engineer specializing in backend development and AI/ML integrations with 2+ years of hands-on experience designing scalable microservices, REST APIs, and production-grade architectures. Experienced in LLM orchestration, prompt engineering, writing clean/testable code, and production monitoring."
};

export const ABOUT = {
  heading: "Building Intelligent Solutions & Scalable Architectures",
  summary: PERSONAL_INFO.summary,
  description: "I specialize in backend development, API design, and AI integration. My expertise spans Python, FastAPI, Docker, and ML models including LLMs and computer vision systems. I am passionate about writing clean, testable code and ensuring system reliability.",
  stats: [
    { value: "2+", label: "Years Experience", color: "accent" },
    { value: "5+", label: "Live Projects", color: "secondary" },
    { value: "100%", label: "Delivery Rate", color: "white" }
  ],
  competencies: [
    { title: "Backend Systems", description: "Designing testable async REST APIs, distributed microservices, and secure backend services.", icon: "Database" },
    { title: "AI & ML Ops", description: "LLM orchestration, RAG pipelines, prompt engineering, and offline model deployment.", icon: "Brain" },
    { title: "Computer Vision", description: "Face authentication, deepfake detection, and object detection using YOLO, OpenCV, and MediaPipe.", icon: "Eye" },
    { title: "Cloud & DevOps", description: "Containerization with Docker, Kubernetes, AWS, Airflow, CI/CD, and robust observability.", icon: "Rocket" }
  ]
};

export const SOCIAL_LINKS: SocialLink[] = [
  { platform: "LinkedIn", url: PERSONAL_INFO.linkedin, icon: "linkedin", text: "LinkedIn Profile" },
  { platform: "Email", url: `mailto:${PERSONAL_INFO.email}`, icon: "mail", text: PERSONAL_INFO.email },
  { platform: "Phone", url: `tel:${PERSONAL_INFO.phone}`, icon: "phone", text: PERSONAL_INFO.phone }
];

export const SKILLS = [
  {
    category: "Backend & Languages",
    name: "Backend & Languages",
    items: ["Python", "SQL", "Bash", "FastAPI", "Flask", "Asyncio", "REST APIs", "Microservices"]
  },
  {
    category: "GenAI / NLP",
    name: "GenAI / NLP",
    items: ["LangChain", "LangGraph", "LLMs", "RAG Pipelines", "Vector DBs", "Prompt Engineering", "Function Calling", "Guardrails & Fallbacks"]
  },
  {
    category: "MLOps, Cloud & QA",
    name: "MLOps, Cloud & QA",
    items: ["Docker", "Kubernetes (K8s)", "CI/CD", "AWS", "Apache Airflow", "Redis", "Kafka", "Unit Testing", "Debugging", "Logging & Observability", "Local Model Deployment"]
  },
  {
    category: "Computer Vision",
    name: "Computer Vision",
    items: ["InsightFace", "YOLOv8", "YOLOv10", "OpenCV", "MediaPipe", "SyncNet", "Deepfake Detection", "Object Detection"]
  },
  {
    category: "Data Science & DL",
    name: "Data Science & DL",
    items: ["Pandas", "NumPy", "Scikit-Learn", "PyTorch", "TensorFlow", "Neo4j Graph DBs"]
  }
];

export const EXPERIENCE = [
  {
    title: "AI, ML & Backend Engineer",
    role: "AI, ML & Backend Engineer",
    company: "DATA SPARK AI SOLUTION (EdTech)",
    location: "Chennai, India",
    period: "June 2024 - Feb 2026",
    description: "Orchestrated distributed microservices and recommendation workflows.",
    achievements: [
      "Infrastructure & Backend Services: Orchestrated distributed microservices and recommendation workflows using Airflow, Redis, and local LLMs; established robust backend logging and performance monitoring.",
      "Collaboration & Quality: Participated in peer code reviews, promoted clean, testable software design, and used CI/CD pipelines to support stable production releases.",
      "Graph Recommenders: Developed graph-based recommendation backend systems using Neo4j and PySpark to trace concept-level skill gaps."
    ]
  },
  {
    title: "Software Engineer (AI, ML & Backend)",
    role: "Software Engineer (AI, ML & Backend)",
    company: "ANUR CLOUD TECHNOLOGY",
    location: "Chennai, India",
    period: "Feb 2026 - June 2026",
    description: "Architected async, testable REST APIs to power backend services.",
    achievements: [
      "Clean Code & REST APIs: Architected async, testable REST APIs using FastAPI to power backend services, improve inference latency, and support unit-test coverage.",
      "Secure FinTech Backends: Engineered secure verification, lip-sync, and facial comparison backend APIs deployed for tier-1 FinTech banking systems.",
      "System Reliability: Maintained, troubleshot, and supported containerized applications using Docker and AWS, with centralized logging and debugging practices."
    ]
  }
];

export const PROJECTS: Project[] = [
  {
    title: "NEET, JEE & UPSC Adaptive Platform",
    category: "EdTech Core - Sastra Data Spark",
    description: "Architected a post-test remediation pipeline using Airflow and Redis.",
    tech: ["Airflow", "Redis", "Event-driven architecture", "Whisper"],
    live: true,
    url: "#"
  },
  {
    title: "IELTS & PTE Prep Platform",
    category: "EdTech Core - Data Spark AI Solution",
    description: "Built specialized evaluation engines using prompt engineering, function calling, and LLM integrations.",
    tech: ["Prompt Engineering", "LLM integrations", "CV Proctoring"],
    live: true,
    url: "#"
  },
  {
    title: "CBSE School Automation System",
    category: "EdTech Infrastructure - Data Spark",
    description: "Programmed automated computer-vision microservices using smart TV camera feeds.",
    tech: ["Computer Vision", "Anomaly Alerting", "Presence Monitoring"],
    live: true,
    url: "#"
  },
  {
    title: "Conversational Interview & ESL App",
    category: "EdTech Tooling - Data Spark",
    description: "Developed video-based mock interview practice bots evaluating candidates' visual delivery.",
    tech: ["ESL bots", "Video Analysis", "Speech correction"],
    live: true,
    url: "#"
  },
  {
    title: "FinTech Biometric & Speech Suite",
    category: "FinTech Core - Anur Cloud Technology",
    description: "Replaced cloud-dependent speech APIs with self-hosted, offline multilingual STT models.",
    tech: ["MiniFASNetV2", "SyncNet", "FFmpeg", "Local STT"],
    live: true,
    url: "#"
  }
];

export const EDUCATION = [
  {
    degree: "B.Sc. in Computer Science",
    school: "ASAN MEMORIAL COLLEGE, Chennai, India",
    year: "2023"
  },
  {
    degree: "Data Science Cert.",
    school: "QUALITY THOUGHT - Specialized Training",
    year: "Completed"
  }
];
