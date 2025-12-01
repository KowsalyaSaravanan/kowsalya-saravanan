import React, { useState } from 'react';
import Section from './Section';
import { PERSONAL_INFO } from '../constants';
import { Mail, Phone, MapPin, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network delay for a better user experience
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Log success message and data as requested
    console.log("Form Submitted Successfully!");
    console.log("Payload:", formData);
    
    alert("Message sent successfully! (Check console for details)");
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      message: ''
    });
    setIsSubmitting(false);
  };

  return (
    <Section id="contact" title="Get In Touch">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-surface/30 backdrop-blur-sm border border-white/5 rounded-3xl p-8 md:p-12">
        
        <div>
          <h3 className="text-2xl font-bold mb-6">Let's build something intelligent.</h3>
          <p className="text-gray-400 mb-8 leading-relaxed">
            I'm currently available for freelance projects or full-time opportunities.
            If you need expertise in NLP, Computer Vision, or MLOps, let's connect.
          </p>

          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-accent">
                <Mail size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Email</p>
                <a href={`mailto:${PERSONAL_INFO.email}`} className="text-lg font-medium hover:text-accent transition-colors">
                  {PERSONAL_INFO.email}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-purple-500">
                <Phone size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Phone</p>
                <a href={`tel:${PERSONAL_INFO.phone}`} className="text-lg font-medium hover:text-purple-400 transition-colors">
                  {PERSONAL_INFO.phone}
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-green-500">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm text-gray-500">Location</p>
                <p className="text-lg font-medium">
                  {PERSONAL_INFO.location}
                </p>
              </div>
            </div>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="name">Name</label>
            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: "#8B5CF6", boxShadow: "0 0 0 1px rgba(139, 92, 246, 0.3)" }}
              initial={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
              placeholder="Your name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="email">Email</label>
            <motion.input 
              whileFocus={{ scale: 1.02, borderColor: "#8B5CF6", boxShadow: "0 0 0 1px rgba(139, 92, 246, 0.3)" }}
              initial={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              type="email"
              name="email"
              id="email"
              value={formData.email}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none transition-all text-white placeholder-gray-600 disabled:opacity-50"
              placeholder="your@email.com"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-400 mb-1" htmlFor="message">Message</label>
            <motion.textarea 
              whileFocus={{ scale: 1.02, borderColor: "#8B5CF6", boxShadow: "0 0 0 1px rgba(139, 92, 246, 0.3)" }}
              initial={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              rows={4}
              name="message"
              id="message"
              value={formData.message}
              onChange={handleChange}
              disabled={isSubmitting}
              className="w-full bg-black/20 border border-white/10 rounded-lg px-4 py-3 focus:outline-none transition-all resize-none text-white placeholder-gray-600 disabled:opacity-50"
              placeholder="Tell me about your project..."
              required
            />
          </div>
          <motion.button 
            whileHover={{ scale: 1.03, backgroundColor: "#f1f5f9" }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-white text-black font-bold py-4 rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-white/5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isSubmitting ? (
              <>Sending... <Loader2 className="animate-spin" size={18} /></>
            ) : (
              <>Send Message <Send size={18} /></>
            )}
          </motion.button>
        </form>

      </div>
    </Section>
  );
};

export default Contact;