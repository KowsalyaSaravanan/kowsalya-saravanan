export interface Project {
  title: string;
  category: string;
  description: string;
  tech: string[];
  live?: boolean;
  url?: string;
}

export interface Experience {
  role: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
}

export interface SkillCategory {
  name: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
  text: string;
}