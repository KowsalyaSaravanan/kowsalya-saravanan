import React from 'react';
import Section from './Section';
import { PERSONAL_INFO } from '../constants';
import { Brain, Code, Database, Rocket } from 'lucide-react';
import { motion } from 'framer-motion';

const About: React.FC = () => {
  return (
    <Section id="about" title="About Me">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="text-3xl md:text-5xl font-bold mb-8 text-white leading-tight">
            Transforming Data into <br/>
            <span className="text-accent text-outline-strong">Intelligent Solutions</span>
          </h3>
          
          <div className="space-y-6 text-lg text-slate-300 max-w-3xl mx-auto">
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="leading-relaxed"
            >
              {PERSONAL_INFO.summary}
            </motion.p>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="leading-relaxed"
            >
              My journey involves designing robust MLOps pipelines, building complex transformer-based NLP models, and deploying scalable computer vision systems. I thrive on the challenge of taking AI from research prototypes to production-grade applications.
            </motion.p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-24 max-w-3xl mx-auto">
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
            <h4 className="text-4xl font-bold text-accent mb-2">1+</h4>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Years Experience</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
            <h4 className="text-4xl font-bold text-white mb-2">6</h4>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Applications</p>
          </div>
          <div className="p-6 bg-white/5 rounded-2xl border border-white/10 text-center hover:bg-white/10 transition-colors">
            <h4 className="text-4xl font-bold text-secondary mb-2">4</h4>
            <p className="text-sm text-gray-400 uppercase tracking-wider font-bold">Live Projects</p>
          </div>
        </div>
      
        {/* Competencies Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Brain className="text-accent" size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-3">GenAI & LLMs</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Specialized in fine-tuning Transformers and building conversational agents.</p>
            </div>
            <div className="bg-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                  <Code className="text-white" size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-3">Clean Code</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Writing maintainable, efficient Python code with best practices.</p>
            </div>
            <div className="bg-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-white/20 transition-colors">
                   <Rocket className="text-white" size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-3">MLOps</h4>
                <p className="text-sm text-gray-400 leading-relaxed">End-to-end deployment using Docker, Airflow, and CI/CD pipelines.</p>
            </div>
            <div className="bg-surface/30 p-8 rounded-2xl border border-white/5 hover:border-accent/50 transition-all hover:-translate-y-2 group">
                <div className="w-14 h-14 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Database className="text-secondary" size={32} strokeWidth={1.5} />
                </div>
                <h4 className="text-xl font-bold mb-3">Data Eng</h4>
                <p className="text-sm text-gray-400 leading-relaxed">Processing massive datasets with PySpark and SQL.</p>
            </div>
        </div>
      </div>
    </Section>
  );
};

export default About;