import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal, Code, Braces } from 'lucide-react';

const TerminalHero: React.FC = () => {
  const [personal, setPersonal] = useState<any>({
    name: 'Loading...',
    title: '',
    tagline: ''
  });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/personal')
      .then(res => res.json())
      .then(data => setPersonal(data))
      .catch(err => console.error('Failed to load:', err));
  }, []);

  return (
    <div className="relative min-h-screen bg-black overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 via-black to-purple-900/20" />
      
      {/* Floating Code Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
        }}
        transition={{ duration: 8, repeat: Infinity }}
        className="absolute top-20 left-10 text-gray-700 text-9xl font-mono"
      >
        {'{'}
      </motion.div>
      
      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-20 right-10 text-gray-700 text-9xl font-mono"
      >
        {'}'}
      </motion.div>

      <motion.div
        animate={{
          y: [0, -20, 0],
          x: [0, 20, 0],
        }}
        transition={{ duration: 7, repeat: Infinity }}
        className="absolute top-1/3 right-1/4 text-gray-700 text-6xl font-mono"
      >
        {'</>'}
      </motion.div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex items-center justify-center px-4">
        <div className="max-w-5xl w-full">
          {/* Terminal Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 mb-8"
          >
            <Terminal className="text-emerald-400" size={24} />
            <span className="text-gray-500 font-mono text-sm">
              {personal.name.toLowerCase().replace(' ', '-')}@portfolio:~$
            </span>
            <motion.span
              animate={{ opacity: [1, 0, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-emerald-400 font-mono"
            >
              _
            </motion.span>
          </motion.div>

          {/* Main Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6">
              <span className="text-white">Hi, I'm {personal.name.split(' ')[0]}, a</span>
              <br />
              <span className="text-emerald-400">{personal.title.toLowerCase()}</span>
            </h1>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-gray-400 text-lg md:text-xl max-w-3xl mx-auto font-light"
            >
              {personal.tagline}
            </motion.p>
          </motion.div>

          {/* Terminal Command */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm"
          >
            <div className="flex items-center gap-2 mb-4">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-600 text-sm font-mono ml-4">terminal</span>
            </div>
            
            <div className="font-mono text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-emerald-400">$</span>
                <span className="text-gray-300">cat about.txt</span>
              </div>
              <div className="text-gray-500 pl-4">
                <p>→ AI & ML Engineer specializing in NLP, Computer Vision, and MLOps</p>
                <p>→ Building intelligent solutions that solve real-world problems</p>
                <p>→ 6 applications delivered, 4 currently live in production</p>
              </div>
            </div>
          </motion.div>

          {/* Scroll Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, y: [0, 10, 0] }}
            transition={{ delay: 1, y: { duration: 2, repeat: Infinity } }}
            className="text-center mt-16"
          >
            <span className="text-gray-600 text-xs font-mono uppercase tracking-widest">
              scroll to explore
            </span>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default TerminalHero;
