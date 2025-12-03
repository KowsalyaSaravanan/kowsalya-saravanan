import React, { useState, useEffect } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { Home, User, Cpu, FolderGit2, Briefcase, Mail } from 'lucide-react';

const ScrollProgress: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const sections = [
    { id: 'home', label: 'Home', icon: Home },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Cpu },
    { id: 'projects', label: 'Projects', icon: FolderGit2 },
    { id: 'experience', label: 'Experience', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: Mail },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      for (let i = sections.length - 1; i >= 0; i--) {
        const section = document.getElementById(sections[i].id);
        if (section && section.offsetTop <= scrollPosition) {
          setActiveSection(sections[i].id);
          break;
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.getElementById(id);
    if (element) {
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 40, behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Vertical Progress Bar */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden lg:flex flex-col items-center gap-6">
        {/* Progress Line with glow */}
        <div className="relative w-1 h-64 bg-white/5 rounded-full overflow-hidden shadow-lg">
          <motion.div
            className="absolute top-0 left-0 right-0 bg-gradient-to-b from-accent via-purple-500 to-secondary origin-top shadow-lg shadow-accent/50"
            style={{ scaleY }}
          />
        </div>

        {/* Section Dots */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col gap-8 h-full justify-between py-2">
          {sections.map((section) => {
            const Icon = section.icon;
            const isActive = activeSection === section.id;
            
            return (
              <motion.button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className="relative group"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.9 }}
              >
                <div
                  className={`w-3 h-3 rounded-full border-2 transition-all duration-300 ${
                    isActive
                      ? 'bg-accent border-accent scale-125 shadow-lg shadow-accent/50'
                      : 'bg-transparent border-white/30 hover:border-accent/70 hover:bg-accent/20'
                  }`}
                />
                
                {/* Tooltip */}
                <div className="absolute right-8 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                  <div className="flex items-center gap-3 bg-black/90 backdrop-blur-md px-4 py-2 rounded-lg border border-white/10 whitespace-nowrap">
                    <Icon size={16} className={isActive ? 'text-accent' : 'text-white'} />
                    <span className={`text-sm font-semibold ${isActive ? 'text-accent' : 'text-white'}`}>
                      {section.label}
                    </span>
                  </div>
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>

      {/* Scroll to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        animate={{ 
          opacity: scrollYProgress.get() > 0.1 ? 1 : 0,
          scale: scrollYProgress.get() > 0.1 ? 1 : 0
        }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-32 right-8 z-50 w-14 h-14 bg-gradient-to-r from-accent to-purple-600 hover:from-purple-600 hover:to-accent rounded-full flex items-center justify-center shadow-xl shadow-accent/30 transition-all hover:scale-110 hidden lg:flex"
        whileHover={{ y: -6, rotate: 360 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        <svg
          className="w-6 h-6 text-white"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>

      {/* Mobile Progress Bar (Top) */}
      <div className="fixed top-0 left-0 right-0 z-50 lg:hidden">
        <motion.div
          className="h-1 bg-gradient-to-r from-accent to-secondary origin-left"
          style={{ scaleX: scrollYProgress }}
        />
      </div>
    </>
  );
};

export default ScrollProgress;
