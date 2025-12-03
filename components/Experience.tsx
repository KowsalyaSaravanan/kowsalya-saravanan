import React, { useState, useEffect } from 'react';
import Section from './Section';
import { Briefcase, GraduationCap, MapPin, Calendar, TrendingUp } from 'lucide-react';
import { motion } from 'framer-motion';

const Experience: React.FC = () => {
  const [experience, setExperience] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/experience')
      .then(res => res.json())
      .then(data => setExperience(data.experience || []))
      .catch(err => console.error('Failed to load experience:', err));
  }, []);

  return (
    <Section id="experience" title="Experience & Education">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Work Experience */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Briefcase className="text-accent" size={24} />
            </div>
            <h3 className="text-2xl font-bold font-display">Work History</h3>
          </motion.div>
          
          <div className="space-y-8 border-l-2 border-accent/30 pl-8 ml-3 relative">
            {experience.map((exp, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className="relative group"
              >
                {/* Animated Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 + 0.3 }}
                  className="absolute -left-[41px] top-0 w-5 h-5 rounded-full border-4 border-[#0F172A] bg-accent group-hover:scale-125 transition-transform"
                >
                  <div className="absolute inset-0 rounded-full bg-accent animate-ping opacity-75" />
                </motion.div>
                
                <div className="bg-surface/30 border border-white/5 rounded-xl p-6 hover:bg-surface/50 hover:border-accent/30 transition-all group-hover:shadow-lg group-hover:shadow-accent/10">
                  <div className="mb-3">
                    <h4 className="text-2xl font-bold text-white mb-1 group-hover:text-accent transition-colors">{exp.title}</h4>
                    <p className="text-lg text-accent font-semibold">{exp.company}</p>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-5">
                    <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full font-mono">
                      <Calendar size={14} />
                      {exp.period}
                    </span>
                    {exp.location && (
                      <span className="flex items-center gap-1.5 px-3 py-1 bg-white/5 rounded-full">
                        <MapPin size={14} />
                        {exp.location}
                      </span>
                    )}
                  </div>
                  
                  <p className="text-gray-300 mb-5 leading-relaxed text-base">{exp.description}</p>
                  
                  <div className="space-y-2">
                    {exp.achievements?.map((item: string, i: number) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: idx * 0.2 + i * 0.1 }}
                        className="flex items-start gap-2 text-gray-400 text-sm"
                      >
                        <TrendingUp size={16} className="text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-gray-300">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Education - Placeholder for future dynamic content */}
        <div>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center">
              <GraduationCap className="text-secondary" size={24} />
            </div>
            <h3 className="text-2xl font-bold font-display">Education</h3>
          </motion.div>
          
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="bg-surface/30 border border-white/5 p-6 rounded-xl hover:bg-surface/50 hover:border-secondary/30 transition-all hover:shadow-lg hover:shadow-secondary/10 group"
            >
              <h4 className="text-lg font-bold text-white mb-1 group-hover:text-secondary transition-colors">B.Sc. in Computer Science</h4>
              <p className="text-gray-400 mb-3">Asan Memorial Arts and Science College, Chennai</p>
              <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-sm text-secondary font-mono">
                2023
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-surface/30 border border-white/5 p-6 rounded-xl hover:bg-surface/50 hover:border-secondary/30 transition-all hover:shadow-lg hover:shadow-secondary/10 group"
            >
              <h4 className="text-lg font-bold text-white mb-1 group-hover:text-secondary transition-colors">Data Science Certification</h4>
              <p className="text-gray-400 mb-3">Quality Thought</p>
              <span className="inline-block px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-full text-sm text-secondary font-mono">
                4 months
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </Section>
  );
};

export default Experience;