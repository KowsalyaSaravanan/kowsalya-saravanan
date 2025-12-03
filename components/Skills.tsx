import React, { useState, useEffect } from 'react';
import Section from './Section';
import { Cpu, Eye, MessageSquare, Server, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

const getIcon = (category: string) => {
  if (!category) return <Cpu size={36} />;
  
  switch (category.toLowerCase()) {
    case 'machine learning': return <Cpu className="text-accent" size={36} />;
    case 'computer vision': return <Eye className="text-purple-400" size={36} />;
    case 'nlp & speech': return <MessageSquare className="text-pink-400" size={36} />;
    case 'data & mlops': return <Server className="text-emerald-400" size={36} />;
    default: return <Cpu size={36} />;
  }
};

const Skills: React.FC = () => {
  const [skills, setSkills] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/skills')
      .then(res => res.json())
      .then(data => setSkills(data.skills || []))
      .catch(err => console.error('Failed to load skills:', err));
  }, []);

  return (
    <Section id="skills" title="Technical Arsenal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {skills.map((category, idx) => (
          <motion.div 
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            whileHover={{ y: -8, scale: 1.02 }}
            className="relative group"
          >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 to-secondary/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            
            <div className="relative bg-surface/50 backdrop-blur-sm border border-white/10 rounded-2xl p-6 hover:border-accent/50 transition-all duration-300 h-full">
              {/* Icon container with gradient */}
              <motion.div 
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="mb-6 bg-gradient-to-br from-white/10 to-white/5 w-20 h-20 rounded-2xl flex items-center justify-center group-hover:shadow-lg group-hover:shadow-accent/20 transition-all"
              >
                {getIcon(category.name)}
              </motion.div>
              
              <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent font-display">
                {category.category}
              </h3>
              
              <div className="flex flex-wrap gap-2">
                {category.items?.map((skill: string, sIdx: number) => (
                  <motion.span 
                    key={sIdx}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1 + sIdx * 0.05 }}
                    whileHover={{ scale: 1.1, y: -2 }}
                    className="px-3 py-1.5 text-xs bg-white/5 border border-white/10 rounded-lg text-gray-300 hover:bg-accent/20 hover:border-accent/50 hover:text-white transition-all cursor-default font-medium"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
              
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-tr-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          </motion.div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;
