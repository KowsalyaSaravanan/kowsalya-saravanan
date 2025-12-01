import React from 'react';
import Section from './Section';
import { SKILLS } from '../constants';
import { Cpu, Eye, MessageSquare, Server } from 'lucide-react';

const getIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case 'machine learning': return <Cpu className="text-accent" size={32} />;
    case 'computer vision': return <Eye className="text-purple-500" size={32} />;
    case 'nlp & speech': return <MessageSquare className="text-pink-500" size={32} />;
    case 'data & mlops': return <Server className="text-green-500" size={32} />;
    default: return <Cpu size={32} />;
  }
};

const Skills: React.FC = () => {
  return (
    <Section id="skills" title="Technical Arsenal">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SKILLS.map((category, idx) => (
          <div 
            key={idx}
            className="bg-surface/50 backdrop-blur-sm border border-white/5 rounded-2xl p-6 hover:border-accent/30 transition-all duration-300 group"
          >
            <div className="mb-6 bg-white/5 w-16 h-16 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              {getIcon(category.name)}
            </div>
            <h3 className="text-xl font-bold mb-4">{category.name}</h3>
            <div className="flex flex-wrap gap-2">
              {category.skills.map((skill, sIdx) => (
                <span 
                  key={sIdx} 
                  className="px-3 py-1 text-sm bg-white/5 border border-white/10 rounded-full text-gray-300 hover:bg-white/10 transition-colors"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

export default Skills;