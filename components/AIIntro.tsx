import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Cpu, Network } from 'lucide-react';

const AIIntro: React.FC = () => {
  const [show, setShow] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentModule, setCurrentModule] = useState(0);

  const modules = [
    { name: 'Machine Learning', icon: Brain, color: '#8B5CF6' },
    { name: 'Deep Learning', icon: Network, color: '#A78BFA' },
    { name: 'Computer Vision', icon: Cpu, color: '#EC4899' },
    { name: 'Natural Language Processing', icon: Brain, color: '#F43F5E' },
  ];

  useEffect(() => {
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2;
      });
    }, 25);

    const moduleInterval = setInterval(() => {
      setCurrentModule((prev) => (prev + 1) % modules.length);
    }, 600);

    const timer = setTimeout(() => {
      setShow(false);
    }, 2800);

    return () => {
      clearInterval(progressInterval);
      clearInterval(moduleInterval);
      clearTimeout(timer);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-gradient-to-br from-[#0a0e27] via-[#1a1f3a] to-[#0f1729]"
        >
          {/* Animated grid background */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 bg-grid" />
          </div>

          <div className="relative">
            {/* Geometric shapes */}
            <motion.div
              className="absolute -top-20 -left-20 w-40 h-40 border-2 border-accent/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute -bottom-20 -right-20 w-32 h-32 border-2 border-secondary/30 rounded-full"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            />

            {/* Main content */}
            <div className="text-center">
              {/* Logo/Icon */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 0.6, type: "spring", stiffness: 200 }}
                className="relative z-10 w-24 h-24 mx-auto mb-8 rounded-2xl bg-gradient-to-br from-accent to-secondary flex items-center justify-center shadow-2xl shadow-accent/50"
              >
                <Brain size={48} className="text-white" />
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-4xl font-bold text-white mb-3 font-display"
              >
                Portfolio
              </motion.h2>

              {/* AI Modules Loading */}
              <div className="mb-8 h-16">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentModule}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center justify-center gap-3"
                  >
                    {React.createElement(modules[currentModule].icon, {
                      size: 20,
                      className: "text-accent",
                      style: { color: modules[currentModule].color }
                    })}
                    <span className="text-slate-300 font-mono text-sm">
                      Loading {modules[currentModule].name}...
                    </span>
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* Progress bar */}
              <div className="w-80 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto mb-2">
                <motion.div
                  className="h-full bg-gradient-to-r from-accent via-purple-500 to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.1 }}
                />
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.6 }}
                className="text-accent text-xs font-mono"
              >
                {progress}%
              </motion.p>

              {/* Module icons grid */}
              <div className="flex items-center justify-center gap-4 mt-8">
                {modules.map((module, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: idx <= currentModule ? 1 : 0.3,
                      scale: idx === currentModule ? 1.2 : 1
                    }}
                    transition={{ delay: idx * 0.1 }}
                    className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center"
                    style={{
                      borderColor: idx <= currentModule ? module.color : undefined,
                      backgroundColor: idx === currentModule ? `${module.color}20` : undefined
                    }}
                  >
                    {React.createElement(module.icon, {
                      size: 20,
                      style: { color: module.color }
                    })}
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AIIntro;
