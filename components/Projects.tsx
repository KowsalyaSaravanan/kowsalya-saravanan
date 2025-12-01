import React, { useRef } from 'react';
import Section from './Section';
import { PROJECTS } from '../constants';
import { ExternalLink, ArrowUpRight, Activity } from 'lucide-react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';

interface ProjectsProps {
  data?: any[];
  loading?: boolean;
}

const ProjectCard = ({ project }: { project: any }) => {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  // Subtle tilt for glass effect
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  
  // Reflection movement
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  // Reactive background gradient for the glare
  const background = useMotionTemplate`radial-gradient(circle at ${glareX} ${glareY}, rgba(255,255,255,0.15) 0%, transparent 50%)`;

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
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
      whileHover={{ scale: 1.02 }}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      className="relative h-full w-full rounded-2xl p-[1px] group min-h-[300px]"
    >
      {/* Border Gradient */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
      
      {/* Glass Card Content */}
      <div 
        className="relative h-full w-full rounded-2xl bg-[#0F172A]/80 backdrop-blur-xl overflow-hidden flex flex-col p-8"
        style={{ transform: "translateZ(10px)" }}
      >
        <div className="flex justify-between items-start mb-6">
            <motion.h3 
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-2xl font-bold text-white group-hover:text-accent transition-colors"
            >
                {project.title}
            </motion.h3>
            
            <div className="flex gap-2">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                    <Activity size={12} className="text-accent" />
                    <span className="text-[10px] font-bold tracking-widest text-white uppercase">{project.category}</span>
                </div>
                {project.live && (
                    <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md">
                       <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                       <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Live</span>
                    </div>
                )}
            </div>
        </div>

        <p className="text-slate-400 text-sm leading-relaxed mb-8 flex-grow">
            {project.description}
        </p>

        <div className="mt-auto">
            <div className="flex flex-wrap gap-2 mb-6">
                {project.tech.map((t: string, i: number) => (
                    <span key={i} className="text-[10px] font-mono text-slate-300 bg-white/5 px-2 py-1 rounded border border-white/5 group-hover:border-accent/30 transition-colors">
                        {t}
                    </span>
                ))}
            </div>

            <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                 {project.live ? (
                     <a
                     href={project.url || '#'}
                     target="_blank"
                     rel="noopener noreferrer"
                     className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-accent hover:text-white border border-white/10 transition-all group/btn"
                     onMouseDown={(e) => e.stopPropagation()}
                   >
                     <span className="text-xs font-bold uppercase tracking-wider">Launch</span>
                     <ExternalLink size={14} />
                   </a>
                ) : (
                    <span className="text-xs font-mono text-slate-600">INTERNAL_MODULE</span>
                )}
                
                <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                    <ArrowUpRight size={16} className="text-slate-500 group-hover:text-accent" />
                </div>
            </div>
        </div>
        
        {/* Dynamic Glare/Reflection */}
        <motion.div 
            className="absolute inset-0 pointer-events-none z-30"
            style={{
                background: background
            }}
        />
      </div>
    </motion.div>
  );
};

const Projects: React.FC<ProjectsProps> = ({ data, loading }) => {
  const displayProjects = (data && data.length > 0) ? data : PROJECTS;

  return (
    <Section id="projects" title="Neural Modules">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4 py-8 perspective-container">
        {displayProjects.map((project, idx) => (
            <div key={idx} className="flex items-center justify-center">
                <ProjectCard project={project} />
            </div>
        ))}
      </div>
    </Section>
  );
};

export default Projects;