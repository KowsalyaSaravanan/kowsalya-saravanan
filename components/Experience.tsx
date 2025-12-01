import React from 'react';
import Section from './Section';
import { EXPERIENCE, EDUCATION } from '../constants';
import { Briefcase, GraduationCap, MapPin } from 'lucide-react';

const Experience: React.FC = () => {
  return (
    <Section id="experience" title="Experience & Education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Work Experience */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <Briefcase className="text-accent" />
            <h3 className="text-2xl font-bold">Work History</h3>
          </div>
          
          <div className="space-y-8 border-l border-white/10 pl-8 ml-3 relative">
            {EXPERIENCE.map((exp, idx) => (
              <div key={idx} className="relative">
                {/* Dot */}
                <div className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-[#050505] bg-accent" />
                
                <div className="mb-2">
                  <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                  <p className="text-lg text-gray-300">{exp.company}</p>
                </div>
                
                <div className="flex flex-wrap gap-4 text-sm text-gray-500 mb-4 font-mono">
                  <span>{exp.period}</span>
                  <span className="flex items-center gap-1"><MapPin size={14} /> {exp.location}</span>
                </div>
                
                <p className="text-gray-400 mb-4">{exp.description}</p>
                
                <ul className="list-disc list-inside space-y-2 text-gray-400 text-sm">
                  {exp.achievements.map((item, i) => (
                    <li key={i} className="leading-relaxed">
                      <span className="text-gray-300">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <GraduationCap className="text-purple-500" />
            <h3 className="text-2xl font-bold">Education</h3>
          </div>
          
          <div className="space-y-6">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="bg-surface/30 border border-white/5 p-6 rounded-xl hover:bg-surface/50 transition-colors">
                <h4 className="text-lg font-bold text-white mb-1">{edu.degree}</h4>
                <p className="text-gray-400 mb-2">{edu.school}</p>
                <span className="inline-block px-3 py-1 bg-white/5 rounded text-sm text-purple-300 font-mono">
                  {edu.year}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;