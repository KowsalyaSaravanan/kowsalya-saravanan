import React, { useState, useEffect } from 'react';
import Section from './Section';
import { Brain, Code, Database, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const iconMap: any = {
  Brain,
  Code,
  Database,
  Rocket
};

const About: React.FC = () => {
  const [about, setAbout] = useState<any>({
    heading: '',
    summary: '',
    description: '',
    stats: [],
    competencies: []
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/about')
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(err => console.error('Failed to load about info:', err));
  }, []);

  return (
    <Section id="about" title="About Me">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-20">
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-6xl font-bold mb-12 text-white leading-tight font-display"
            dangerouslySetInnerHTML={{ __html: about.heading.replace('Intelligent Solutions', '<span class="bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent">Intelligent Solutions</span>') }}
          />
          
          <div className="space-y-8 text-lg md:text-xl text-slate-300 max-w-4xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-relaxed text-center"
            >
              {about.summary}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="leading-relaxed text-center"
            >
              {about.description}
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24 max-w-4xl mx-auto">
          {about.stats?.map((stat: any, index: number) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
              className="p-8 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 hover:scale-105 transition-all"
            >
              <h4 className={`text-5xl font-bold mb-3 font-display ${
                stat.color === 'accent' ? 'text-accent' : 
                stat.color === 'secondary' ? 'text-secondary' : 'text-white'
              }`}>
                {stat.value}
              </h4>
              <p className="text-sm text-gray-400 uppercase tracking-widest font-semibold font-mono">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      
        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {about.competencies?.map((comp: any, index: number) => {
              const Icon = iconMap[comp.icon] || Brain;
              return (
                <motion.div 
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1 * (index + 1) }}
                  className="bg-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-2 group text-center"
                >
                    <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors mx-auto">
                      <Icon className="text-accent" size={36} strokeWidth={1.5} />
                    </div>
                    <h4 className="text-xl font-bold mb-4 text-white font-mono uppercase tracking-wider">{comp.title}</h4>
                    <p className="text-sm text-gray-400 leading-relaxed">{comp.description}</p>
                </motion.div>
              );
            })}
        </div>
      </div>
    </Section>
  );
};

export default About;