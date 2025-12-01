
import React from 'react';
import { PERSONAL_INFO } from '../constants';
import { ArrowDown, Linkedin, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

const Hero: React.FC = () => {
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
    <div id="home" className="relative z-10 min-h-screen flex items-center justify-center px-4 md:px-8 max-w-5xl mx-auto overflow-hidden">
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="text-center flex flex-col items-center"
      >
        <h2 className="text-xl md:text-3xl font-bold text-accent mb-6 tracking-[0.2em] uppercase">
          Senior AI & ML Engineer
        </h2>

        <h1 className="text-6xl md:text-8xl lg:text-9xl font-extrabold mb-8 tracking-tighter text-white leading-[0.9]">
          {PERSONAL_INFO.name.split(' ')[0]}<br />
          <span className="text-slate-400">{PERSONAL_INFO.name.split(' ')[1]}</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed font-normal max-w-2xl mx-auto">
          Transforming complex data into intelligent, scalable AI solutions.
        </p>
        
        <div className="flex flex-wrap gap-6 items-center justify-center">
          <a 
            href="#"
            onClick={(e) => scrollToSection(e, '#projects')}
            className="px-10 py-5 bg-white text-black font-extrabold text-lg rounded-full hover:scale-105 transition-transform"
          >
            View Work
          </a>
          
          <div className="flex gap-6 text-slate-400 px-4">
             <a href="https://www.linkedin.com/in/kowsalya-saravanan-709a45258" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors transform hover:scale-110">
                <Linkedin size={28} />
             </a>
             <a href={`mailto:${PERSONAL_INFO.email}`} className="hover:text-white transition-colors transform hover:scale-110">
                <Mail size={28} />
             </a>
          </div>
        </div>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-slate-500 flex flex-col items-center gap-4"
      >
        <span className="text-xs uppercase tracking-widest font-bold rotate-90 origin-center translate-y-8">Scroll</span>
        <a 
          href="#"
          onClick={(e) => scrollToSection(e, '#about')}
          className="w-12 h-12 flex items-center justify-center rounded-full border border-white/10 hover:border-white/50 hover:bg-white/5 transition-all cursor-pointer mt-12"
        >
          <ArrowDown size={20} />
        </a>
      </motion.div>
    </div>
  );
};

export default Hero;
