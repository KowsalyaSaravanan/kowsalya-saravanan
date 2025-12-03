import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';

const TerminalProjects: React.FC = () => {
  const [projects, setProjects] = useState<any[]>([]);

  useEffect(() => {
    fetch('http://127.0.0.1:8000/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data.projects || []))
      .catch(err => console.error('Failed to load:', err));
  }, []);

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-red-950/20 via-black to-black py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-2 mb-4">
            <span className="text-emerald-400 font-mono">$</span>
            <span className="text-gray-400 font-mono">ls -la ./projects</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-bold text-white font-mono">
            work<span className="text-emerald-400">/</span>
          </h2>
        </motion.div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, idx) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative"
            >
              {/* Gradient Border Effect */}
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-purple-500/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />
              
              <div className="relative bg-gray-900/80 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-sm h-full">
                {/* Terminal Header */}
                <div className="bg-gray-800/50 px-4 py-2 flex items-center justify-between border-b border-gray-700">
                  <div className="flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500" />
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500" />
                  </div>
                  <span className="text-gray-600 text-xs font-mono">{String(idx + 1).padStart(2, '0')}</span>
                </div>

                {/* Content */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white font-mono group-hover:text-emerald-400 transition-colors">
                      {project.title}
                    </h3>
                    {project.live && (
                      <span className="px-2 py-1 bg-emerald-500/20 border border-emerald-500/30 rounded text-emerald-400 text-xs font-mono">
                        live
                      </span>
                    )}
                  </div>

                  <p className="text-gray-400 text-sm mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.slice(0, 3).map((tech: string, i: number) => (
                      <span
                        key={i}
                        className="px-2 py-1 bg-gray-800/50 border border-gray-700 rounded text-gray-500 text-xs font-mono"
                      >
                        {tech}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="px-2 py-1 text-gray-600 text-xs font-mono">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Category */}
                  <div className="text-xs font-mono text-gray-600 mb-4">
                    // {project.category}
                  </div>

                  {/* Links */}
                  <div className="flex gap-3">
                    {project.url && project.url !== '#' && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors text-sm font-mono"
                      >
                        <ExternalLink size={14} />
                        <span>view</span>
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors text-sm font-mono"
                      >
                        <Github size={14} />
                        <span>code</span>
                      </a>
                    )}
                  </div>
                </div>

                {/* Bottom Border Effect */}
                <div className="h-1 bg-gradient-to-r from-emerald-500/0 via-emerald-500/50 to-emerald-500/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TerminalProjects;
