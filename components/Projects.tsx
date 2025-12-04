import React, { useState, useRef, useEffect } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { ExternalLink, ArrowUpRight, Activity, X, Github, Sparkles, ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';

interface ProjectsProps {
  data?: any[];
  loading?: boolean;
}

const ProjectCard3D = ({ project, onClick, isCenter }: { project: any; onClick: () => void; isCenter: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current || !isCenter) return;
    const rect = ref.current.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={{
        rotateX: isCenter ? rotateX : 0,
        rotateY: isCenter ? rotateY : 0,
        transformStyle: "preserve-3d",
      }}
      className={`relative h-full cursor-pointer group ${isCenter ? 'z-20' : 'z-10'}`}
    >
      <div className="relative h-full rounded-2xl overflow-hidden">
        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-purple-500 to-secondary p-[2px] transition-opacity duration-500 ${isCenter ? 'opacity-100' : 'opacity-0'}`}>
          <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-accent via-purple-500 to-secondary blur-xl opacity-50" />
        </div>

        <div className="relative h-full bg-gradient-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A] rounded-2xl p-6 border border-white/10 group-hover:border-accent/50 transition-all backdrop-blur-xl">
          
          {isCenter && (
            <div className="absolute inset-0 overflow-hidden rounded-2xl">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-accent/40 rounded-full"
                  animate={{
                    x: [Math.random() * 400, Math.random() * 400],
                    y: [Math.random() * 500, Math.random() * 500],
                    opacity: [0, 1, 0],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                  }}
                />
              ))}
            </div>
          )}

          <div className="relative z-10 mb-4">
            <div className="flex items-start justify-between mb-3">
              <motion.div
                whileHover={{ scale: 1.05, rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="w-14 h-14 rounded-xl bg-gradient-to-br from-accent/20 to-secondary/20 flex items-center justify-center border border-accent/30"
              >
                <Sparkles className="text-accent" size={28} />
              </motion.div>
              
              <div className="flex gap-2">
                {project.live && (
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-xs font-bold text-emerald-400">LIVE</span>
                  </motion.div>
                )}
              </div>
            </div>

            <h3 className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent mb-2 group-hover:from-accent group-hover:to-secondary transition-all font-display">
              {project.title}
            </h3>
            
            <div className="flex items-center gap-2 text-xs text-slate-500 font-mono mb-3">
              <Activity size={12} className="text-accent" />
              <span className="uppercase tracking-wider">{project.category}</span>
            </div>
          </div>

          <p className="relative z-10 text-sm text-slate-400 leading-relaxed mb-6 line-clamp-3">
            {project.description}
          </p>

          <div className="relative z-10 flex flex-wrap gap-2 mb-6">
            {project.tech.slice(0, 4).map((tech: string, i: number) => (
              <motion.span
                key={i}
                whileHover={{ scale: 1.1 }}
                className="px-3 py-1 text-xs font-mono bg-white/5 border border-white/10 rounded-lg text-slate-300 hover:border-accent/50 hover:bg-accent/10 transition-all"
              >
                {tech}
              </motion.span>
            ))}
            {project.tech.length > 4 && (
              <span className="px-3 py-1 text-xs font-mono text-slate-500">
                +{project.tech.length - 4}
              </span>
            )}
          </div>

          <div className="relative z-10 flex items-center justify-between pt-4 border-t border-white/10">
            <motion.span
              whileHover={{ x: 5 }}
              className="text-sm font-semibold text-accent flex items-center gap-2"
            >
              View Details
              <ArrowUpRight size={16} />
            </motion.span>
            
            <motion.div
              whileHover={{ rotate: 45, scale: 1.2 }}
              className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-secondary/20 border border-accent/30 flex items-center justify-center"
            >
              <ArrowUpRight size={18} className="text-accent" />
            </motion.div>
          </div>

          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
        </div>
      </div>
    </motion.div>
  );
};

const ProjectDetail = ({ project, onClose }: { project: any; onClose: () => void }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8, rotateX: -15, opacity: 0 }}
        animate={{ scale: 1, rotateX: 0, opacity: 1 }}
        exit={{ scale: 0.8, rotateX: 15, opacity: 0 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        onClick={(e) => e.stopPropagation()}
        className="relative max-w-5xl w-full max-h-[90vh] overflow-hidden rounded-3xl"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1a1f3a] to-[#0F172A]" />

        <div className="relative overflow-y-auto max-h-[90vh] p-8">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 90 }}
            whileTap={{ scale: 0.9 }}
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center backdrop-blur-xl"
          >
            <X size={24} className="text-white" />
          </motion.button>

          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="mb-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center">
                <Sparkles size={32} className="text-white" />
              </div>
              {project.live && (
                <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-500/20 border border-emerald-500/30">
                  <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-sm font-bold text-emerald-400">LIVE PROJECT</span>
                </div>
              )}
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white via-accent to-secondary bg-clip-text text-transparent mb-6 font-display leading-tight">
              {project.title}
            </h2>
            
            <p className="text-lg md:text-xl text-slate-300 leading-relaxed">
              {project.description}
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <h3 className="text-xl font-bold text-white mb-5 flex items-center gap-3">
              <div className="w-1 h-6 bg-gradient-to-b from-accent to-secondary rounded-full" />
              Technology Stack
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {project.tech.map((tech: string, i: number) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 + i * 0.02 }}
                  className="px-5 py-3 bg-[#2a3544] rounded-xl text-center text-sm font-medium text-slate-200 border border-slate-700"
                >
                  {tech}
                </motion.div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap gap-4"
          >
            {project.live && project.url && (
              <motion.a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(139, 92, 246, 0.5)" }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-accent to-purple-600 text-white font-bold rounded-xl shadow-lg shadow-accent/30"
              >
                <ExternalLink size={20} />
                <span>Launch Project</span>
              </motion.a>
            )}
            {project.github && (
              <motion.a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="flex items-center gap-3 px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold rounded-xl backdrop-blur-xl"
              >
                <Github size={20} />
                <span>View Source</span>
              </motion.a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ data, loading }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const [filter, setFilter] = useState<string>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  
  const displayProjects = (data && data.length > 0) ? data : PROJECTS;
  
  const categories = ['all', ...Array.from(new Set(displayProjects.map((p: any) => p.category)))];
  
  const filteredProjects = filter === 'all' 
    ? displayProjects 
    : displayProjects.filter((p: any) => p.category === filter);

  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, filteredProjects.length]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + filteredProjects.length) % filteredProjects.length);
    setIsAutoPlay(false);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % filteredProjects.length);
    setIsAutoPlay(false);
  };

  const getVisibleProjects = () => {
    const visible = [];
    for (let i = -1; i <= 1; i++) {
      const index = (currentIndex + i + filteredProjects.length) % filteredProjects.length;
      visible.push({ project: filteredProjects[index], offset: i, index });
    }
    return visible;
  };

  return (
    <>
      <Section id="projects" title="Featured Projects">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="relative p-6 rounded-2xl bg-gradient-to-r from-white/5 to-white/10 border border-white/10 backdrop-blur-xl">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap gap-3">
                {categories.map((cat, idx) => (
                  <motion.button
                    key={cat}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: idx * 0.1 }}
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => {
                      setFilter(cat);
                      setCurrentIndex(0);
                    }}
                    className={`relative px-6 py-3 rounded-xl font-bold text-sm transition-all overflow-hidden ${
                      filter === cat
                        ? 'text-white'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {filter === cat && (
                      <motion.div
                        layoutId="activeFilter"
                        className="absolute inset-0 bg-gradient-to-r from-accent to-purple-600 rounded-xl"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10 uppercase tracking-wider">{cat}</span>
                  </motion.button>
                ))}
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsAutoPlay(!isAutoPlay)}
                className="flex items-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-accent/50 rounded-xl text-white font-semibold transition-all"
              >
                {isAutoPlay ? <Pause size={18} /> : <Play size={18} />}
                <span>{isAutoPlay ? 'Pause' : 'Play'}</span>
              </motion.button>
            </div>
          </div>
        </motion.div>

        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center perspective-container px-4" style={{ perspective: "2000px" }}>
          <AnimatePresence mode="popLayout">
            {getVisibleProjects().map(({ project, offset, index }) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, x: offset * 300 }}
                animate={{
                  opacity: offset === 0 ? 1 : 0.3,
                  scale: offset === 0 ? 1 : 0.7,
                  x: offset * (window.innerWidth < 768 ? 250 : 400),
                  z: offset === 0 ? 0 : -200,
                  rotateY: offset * (window.innerWidth < 768 ? 15 : 25),
                }}
                exit={{ opacity: 0, scale: 0.5 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="absolute w-full max-w-[90vw] md:max-w-md h-[450px] md:h-[500px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                <ProjectCard3D
                  project={project}
                  onClick={() => offset === 0 && setSelectedProject(project)}
                  isCenter={offset === 0}
                />
              </motion.div>
            ))}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: 1.1, x: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handlePrev}
            className="absolute left-2 md:left-4 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-accent/20 to-purple-600/20 hover:from-accent hover:to-purple-600 border border-white/20 flex items-center justify-center backdrop-blur-xl transition-all shadow-lg"
          >
            <ChevronLeft size={24} className="text-white md:w-7 md:h-7" />
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.1, x: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleNext}
            className="absolute right-2 md:right-4 z-30 w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-accent/20 to-purple-600/20 hover:from-accent hover:to-purple-600 border border-white/20 flex items-center justify-center backdrop-blur-xl transition-all shadow-lg"
          >
            <ChevronRight size={24} className="text-white md:w-7 md:h-7" />
          </motion.button>
        </div>

        <div className="flex justify-center gap-3 mt-8">
          {filteredProjects.map((_, idx) => (
            <motion.button
              key={idx}
              whileHover={{ scale: 1.3 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => {
                setCurrentIndex(idx);
                setIsAutoPlay(false);
              }}
              className={`rounded-full transition-all ${
                idx === currentIndex
                  ? 'w-12 h-3 bg-gradient-to-r from-accent to-purple-600'
                  : 'w-3 h-3 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>
      </Section>

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetail
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Projects;
