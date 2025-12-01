
import React, { Suspense, useState, useEffect } from 'react';
import Background3D from './components/Background3D';
import Hero from './components/Hero';
import Projects from './components/Projects';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Contact from './components/Contact';
import { Home, User, Cpu, Briefcase, Mail, FolderGit2 } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion';

// Icon mapping for dock
const DockIcon = ({ icon: Icon, label, target, scrollToSection, mouseX }: any) => {
  const ref = React.useRef<HTMLAnchorElement>(null);
  
  // Calculate distance from mouse to this icon
  const distance = useTransform(mouseX, (val: number) => {
    const bounds = ref.current?.getBoundingClientRect() ?? { x: 0, width: 0 };
    return val - bounds.x - bounds.width / 2;
  });

  // Scale icon based on distance
  const widthSync = useTransform(distance, [-150, 0, 150], [40, 80, 40]);
  const width = useTransform(widthSync, (val) => val);

  return (
    <motion.a
      ref={ref}
      href="#"
      onClick={(e) => scrollToSection(e, target)}
      style={{ width }}
      className="aspect-square rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center relative group cursor-pointer hover:bg-white/20 transition-colors"
    >
      <Icon size={20} className="text-white group-hover:text-primary transition-colors" />
      {/* Tooltip */}
      <span className="absolute -top-10 left-1/2 -translate-x-1/2 px-2 py-1 bg-black/80 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        {label}
      </span>
    </motion.a>
  );
};

const App: React.FC = () => {
  const [portfolioData, setPortfolioData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const mouseX = useMotionValue(Infinity);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/api/portfolio');
        if (response.ok) {
          const data = await response.json();
          setPortfolioData(data);
        } else {
          console.warn("Backend not reachable, using fallback.");
        }
      } catch (error) {
        console.warn("API Fetch failed.");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    if (id === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(id);
    if (element) {
      // Offset slightly less because we removed top nav, but kept bottom padding
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - 40, behavior: 'smooth' });
    }
  };

  const dockItems = [
    { icon: Home, label: 'Home', target: 'home' },
    { icon: User, label: 'About', target: '#about' },
    { icon: Cpu, label: 'Skills', target: '#skills' },
    { icon: FolderGit2, label: 'Projects', target: '#projects' },
    { icon: Briefcase, label: 'Exp', target: '#experience' },
    { icon: Mail, label: 'Contact', target: '#contact' },
  ];

  return (
    <div className="relative min-h-screen text-slate-200 font-sans selection:bg-primary/30 selection:text-white pb-32">
      <Suspense fallback={<div className="fixed inset-0 bg-[#0F172A]" />}>
        <Background3D />
      </Suspense>

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects data={portfolioData?.projects} loading={loading} />
        <Experience />
        <Contact />
      </main>

      {/* Holographic Dock Navigation */}
      <div 
        className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-end gap-4 px-4 py-3 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl"
        onMouseMove={(e) => mouseX.set(e.pageX)}
        onMouseLeave={() => mouseX.set(Infinity)}
      >
        {dockItems.map((item, idx) => (
          <DockIcon 
            key={idx}
            {...item}
            mouseX={mouseX}
            scrollToSection={scrollToSection}
          />
        ))}
      </div>
    </div>
  );
};

export default App;
