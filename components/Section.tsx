
import React from 'react';
import { motion } from 'framer-motion';

interface SectionProps {
  id: string;
  title?: string;
  watermark?: string;
  children: React.ReactNode;
  className?: string;
}

const Section: React.FC<SectionProps> = ({ id, title, children, className = "" }) => {
  return (
    <section id={id} className={`relative z-10 py-32 px-4 md:px-8 max-w-7xl mx-auto scroll-mt-24 min-h-[60vh] flex flex-col justify-center group ${className} overflow-hidden`}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 30 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10"
      >
        {title && (
          <div className="mb-16 relative pl-4 md:pl-0">
            {/* Title Decoration */}
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 w-1 h-12 bg-accent/50 hidden md:block" />
            <div className="absolute -left-4 top-0 w-3 h-3 border-l border-t border-accent/50 hidden md:block" />
            
            <h2 className="text-4xl md:text-6xl font-bold text-white inline-block tracking-tight relative z-10">
              {title}
              <span className="text-accent">.</span>
            </h2>
            <div className="h-1 w-24 bg-gradient-to-r from-accent to-transparent mt-4" />
          </div>
        )}
        {children}
      </motion.div>
    </section>
  );
};

export default Section;
