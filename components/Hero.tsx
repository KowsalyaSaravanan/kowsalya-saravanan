
import React, { useState, useEffect } from 'react';
import { Linkedin, Mail, Download, Github, Phone } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
  const [personal, setPersonal] = useState<any>({
    name: 'Loading...',
    title: '',
    tagline: '',
    email: '',
    linkedin: ''
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/personal')
      .then(res => res.json())
      .then(data => setPersonal(data))
      .catch(err => console.error('Failed to load personal info:', err));
  }, []);
  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.querySelector(id);
    if (element) {
      const navHeight = 80;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      const offsetPosition = elementPosition - navHeight;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  return (
    <div id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 max-w-6xl mx-auto overflow-hidden">
      

      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center flex flex-col items-center relative z-10"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 px-6 py-2 rounded-full border border-accent/30 bg-accent/5 backdrop-blur-sm"
        >
          <span className="text-sm md:text-base font-bold text-accent nothing-style">
            {personal.title}
          </span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold mb-10 tracking-tight leading-tight text-center relative"
        >
          <span className="text-white">Hi, I'm {personal.name.split(' ')[0]}, a</span>
          <br />
          <motion.span
            whileHover={{ scale: 1.05 }}
            className="inline-block bg-gradient-to-r from-accent to-secondary bg-clip-text text-transparent cursor-pointer relative group"
          >
            {personal.title.split(' ')[0]}
            <motion.div
              className="absolute -inset-2 bg-accent/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </motion.span>
          {' '}
          <span className="text-white">{personal.title.split(' ').slice(1).join(' ')}</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-lg md:text-xl text-slate-400 mb-14 leading-relaxed max-w-3xl mx-auto text-center"
        >
          {personal.tagline?.split(' ').map((word: string, idx: number) => {
            const isHighlight = ['intelligent', 'scalable', 'AI', 'solutions', 'data'].includes(word.toLowerCase().replace(/[.,]/g, ''));
            return (
              <motion.span
                key={idx}
                whileHover={isHighlight ? { scale: 1.1 } : {}}
                className={`inline-block mx-1 ${isHighlight ? 'cursor-pointer font-semibold text-accent hover:text-secondary transition-colors' : ''}`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex flex-wrap gap-6 items-center justify-center"
        >
          <motion.a 
            href="#"
            onClick={(e) => scrollToSection(e, '#projects')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="group relative px-10 py-5 bg-gradient-to-r from-accent to-purple-600 text-white font-bold text-lg rounded-full overflow-hidden shadow-lg shadow-accent/20"
          >
            <span className="relative z-10">View Work</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-purple-600 to-accent"
              initial={{ x: '100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.a>
          
          <motion.a
            href="http://127.0.0.1:8000/api/resume"
            download="Kowsalya_Saravanan_Resume.pdf"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-full backdrop-blur-xl transition-all"
          >
            <Download size={20} />
            <span>Download Resume</span>
          </motion.a>
        </motion.div>
      </motion.div>

      {/* Social Links - Floating */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
        className="fixed left-8 bottom-8 z-50 hidden lg:flex flex-col gap-4"
      >
        {personal.linkedin && (
          <motion.a
            href={personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, x: 5 }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-white/20 transition-all"
          >
            <Linkedin size={20} />
          </motion.a>
        )}
        {personal.github && (
          <motion.a
            href={personal.github}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, x: 5 }}
            className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-white/20 transition-all"
          >
            <Github size={20} />
          </motion.a>
        )}
        <motion.a
          href={`mailto:${personal.email}`}
          whileHover={{ scale: 1.2, x: 5 }}
          className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-slate-400 hover:text-accent hover:bg-white/20 transition-all"
        >
          <Mail size={20} />
        </motion.a>
        
        {/* Vertical line */}
        <div className="w-0.5 h-20 bg-gradient-to-b from-accent to-transparent mx-auto" />
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.2, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs text-slate-500 uppercase tracking-widest font-mono">Scroll</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-accent/30 rounded-full flex items-start justify-center p-2"
          >
            <motion.div
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1 h-2 bg-accent rounded-full"
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Hero;
