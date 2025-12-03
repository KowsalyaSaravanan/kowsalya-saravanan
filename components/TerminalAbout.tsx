import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const TerminalAbout: React.FC = () => {
  const [about, setAbout] = useState<any>({ summary: '', description: '' });

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/about')
      .then(res => res.json())
      .then(data => setAbout(data))
      .catch(err => console.error('Failed to load:', err));
  }, []);

  const points = [
    { id: 1, text: about.summary, color: 'text-blue-400' },
    { id: 2, text: about.description, color: 'text-emerald-400' },
    { id: 3, text: 'I integrate complex AI models and deploy them into production environments', color: 'text-purple-400' },
    { id: 4, text: 'I strive to deliver projects that are technically outstanding with clean code', color: 'text-pink-400' },
  ];

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-blue-950/30 via-black to-black py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left: Terminal Window */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="bg-gray-900/80 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-sm"
          >
            {/* Terminal Header */}
            <div className="bg-gray-800/50 px-4 py-3 flex items-center justify-between border-b border-gray-700">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <span className="text-gray-500 text-sm font-mono">about-me</span>
              <div className="w-12" />
            </div>

            {/* Terminal Content */}
            <div className="p-6 font-mono text-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-400">
                <span>$</span>
                <span className="text-gray-300">cat about.md</span>
              </div>

              {points.map((point, idx) => (
                <motion.div
                  key={point.id}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.2 }}
                  className="pl-4"
                >
                  <div className="flex gap-3">
                    <span className={point.color}>{point.id}</span>
                    <p className="text-gray-400 leading-relaxed">{point.text}</p>
                  </div>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-2 text-emerald-400 mt-6"
              >
                <span>$</span>
                <motion.span
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                >
                  _
                </motion.span>
              </motion.div>
            </div>
          </motion.div>

          {/* Right: Info Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-gray-500 font-mono text-sm mb-4">// where-i-work</h3>
              <div className="space-y-3 font-mono text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-emerald-400">1</span>
                  <span className="text-gray-400">Currently based in Chennai, India 🇮🇳</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-blue-400">2</span>
                  <span className="text-gray-400">Available for remote collaborations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-purple-400">3</span>
                  <span className="text-gray-400">Working across Europe 🌍 and worldwide 🌎</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
              <h3 className="text-gray-500 font-mono text-sm mb-4">// me-online</h3>
              <div className="space-y-2 font-mono text-sm">
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="text-emerald-400">1</span>
                  <span>LinkedIn ↗</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="text-blue-400">2</span>
                  <span>GitHub ↗</span>
                </a>
                <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-emerald-400 transition-colors">
                  <span className="text-purple-400">3</span>
                  <span>Email ↗</span>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TerminalAbout;
