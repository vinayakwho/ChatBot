'use client';

import { useState } from 'react';
import { Menu, Search, ArrowUpRight, Sparkles, Image as ImageIcon, Code, MessageSquareText } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

type HomeViewProps = {
  onNavigate: (view: 'home' | 'chat' | 'voice', title?: string, subtitle?: string, initialPrompt?: string) => void;
};

export default function HomeView({ onNavigate }: HomeViewProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const iphoneModels = [
    "iPhone 16", "iPhone 16 Plus", "iPhone Air", "iPhone 17", "iPhone 17e", "iPhone 17 Pro", "iPhone 17 Pro Max"
  ];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="mobile-view-container p-6 relative"
    >
      {/* Top ambient glow */}
      <div className="absolute top-0 left-0 right-0 h-64 bg-accent-pink/20 blur-[100px] -z-10 rounded-full mix-blend-screen" />

      {/* Header */}
      <header className="flex items-center justify-between mb-8 z-20 relative">
        <div className="relative">
          <button 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="h-10 w-10 rounded-full bg-accent-pink/20 text-accent-pink flex items-center justify-center border border-accent-pink/30 hover:bg-accent-pink/30 transition-colors"
          >
            <Menu className="w-5 h-5" />
          </button>

          <AnimatePresence>
            {isMenuOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="absolute top-12 left-0 w-56 bg-[#1a1c23]/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-glow overflow-hidden py-2"
              >
                <div className="px-4 py-2 text-xs font-semibold text-white/50 uppercase tracking-wider mb-1">
                  Available Models
                </div>
                {iphoneModels.map((model) => (
                  <button
                    key={model}
                    onClick={() => {
                      setIsMenuOpen(false);
                      onNavigate('chat', model, 'Specs & Info', `Tell me everything about the ${model}`);
                    }}
                    className="w-full text-left px-4 py-2.5 text-sm text-white hover:bg-white/10 transition-colors"
                  >
                    {model}
                  </button>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>

      {/* Hero Text */}
      <motion.h1 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="text-4xl font-bold text-white mb-6 leading-tight tracking-tight shadow-sm"
      >
        iPhone Assistant<br />ready to help
      </motion.h1>

      {/* Search Bar */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative mb-8 group"
      >
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-white/50 group-focus-within:text-accent-pink transition-colors">
          <Search className="w-5 h-5" />
        </div>
        <input
          type="text"
          className="w-full bg-black border border-white/20 rounded-full py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-accent-pink focus:ring-1 focus:ring-accent-pink transition-all shadow-lg text-sm"
          placeholder="Ask about iPhone specs..."
          onKeyDown={(e) => {
            if (e.key === 'Enter' && e.currentTarget.value.trim()) {
              onNavigate('chat', 'iPhone Assistant', 'Specs & Features', e.currentTarget.value.trim());
            }
          }}
        />
      </motion.div>

      {/* Tool Cards (Horizontal Scroll) */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
        className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar snap-x"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {[
          { title: 'Compare\nModels', icon: <Sparkles className="w-5 h-5" />, prompt: 'Compare all iPhone models comprehensively based on chips, displays, cameras, and batteries.' },
          { title: 'Camera\nDetails', icon: <ImageIcon className="w-5 h-5" />, prompt: 'Give me camera comparision of all iPhone models' },
          { title: 'Pricing\nInfo', icon: <Code className="w-5 h-5" />, prompt: 'List the price of each and every iPhone model separately.' },
          { title: 'iPhone\nAir', icon: <Sparkles className="w-5 h-5" />, prompt: 'Describe the upcoming iPhone Air design and specs.' },
          { title: 'Battery\nLife', icon: <Code className="w-5 h-5" />, prompt: 'What is the battery life of all the iPhone models?' },
          { title: 'Chipset\nPower', icon: <MessageSquareText className="w-5 h-5" />, prompt: 'Compare the A18 Bionic and A19 Pro chips.' },
          { title: 'Budget\nOptions', icon: <Sparkles className="w-5 h-5" />, prompt: 'List the price of all iPhone models.' },
        ].map((tool, idx) => (
          <div
            key={idx}
            onClick={() => onNavigate('chat', tool.title.replace('\n', ' '), 'Quick action', tool.prompt)}
            className="flex-shrink-0 w-36 h-40 bg-black/40 border border-white/10 rounded-3xl p-4 flex flex-col justify-between hover:bg-white/5 transition-colors cursor-pointer snap-start backdrop-blur-md relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-white/5 blur-2xl rounded-full" />
            <div className="text-white/80 font-semibold text-lg leading-tight z-10 whitespace-pre">
              {tool.title}
            </div>
            <div className="self-end text-white/50 group-hover:text-accent-pink transition-colors z-10 bg-white/10 p-2 rounded-full">
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        ))}
      </motion.div>

      {/* History Section */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mt-6 flex-1 flex flex-col min-h-0"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-white">Suggested Prompts</h2>
          <button className="text-xs text-white/50 hover:text-white transition-colors">See all</button>
        </div>
        
        <div className="flex-1 overflow-y-auto space-y-4 pr-2">
          {[
            { tag: 'Battery', desc: 'How long does the battery last?', icon: <Code className="w-4 h-4 text-accent-pink" />, onClick: () => onNavigate('chat', 'Battery Expert', 'iPhone 17', 'How long does the battery last on the iPhone 17?') },
            { tag: 'iPhone Air', desc: 'Tell me about the iPhone Air', icon: <Sparkles className="w-4 h-4 text-accent-purple" />, onClick: () => onNavigate('chat', 'iPhone Air', 'Future tech', 'Tell me about the iPhone Air') },
            { tag: 'Display', desc: 'Does the iPhone 16 have a 120Hz display?', icon: <ImageIcon className="w-4 h-4 text-orange-400" />, onClick: () => onNavigate('chat', 'Display Info', 'Specs', 'Does the iPhone 16 have a 120Hz display?') },
            { tag: 'Camera', desc: 'iPhone 17 Pro Max camera zoom', icon: <ImageIcon className="w-4 h-4 text-accent-pink" />, onClick: () => onNavigate('chat', 'Camera Specs', 'iPhone 17 Pro Max', 'What are the camera specs and zoom for the iPhone 17 Pro Max?') },
            { tag: 'Release Date', desc: 'When does the iPhone 17e come out?', icon: <MessageSquareText className="w-4 h-4 text-accent-purple" />, onClick: () => onNavigate('chat', 'Launch Info', 'iPhone 17e', 'When is the iPhone 17e coming out?') },
            { tag: 'Performance', desc: 'What chip is in iPhone 16 Plus?', icon: <Code className="w-4 h-4 text-orange-400" />, onClick: () => onNavigate('chat', 'Tech Specs', 'iPhone 16 Plus', 'What chip does the iPhone 16 Plus use?') },
            { tag: 'Features', desc: 'Does iPhone 17 have Dynamic Island?', icon: <Sparkles className="w-4 h-4 text-accent-pink" />, onClick: () => onNavigate('chat', 'Feature Check', 'iPhone 17', 'Does the iPhone 17 have a Dynamic Island?') },
          ].map((item, idx) => (
            <div key={idx} onClick={item.onClick} className="flex items-center gap-4 group cursor-pointer hover:bg-white/5 p-2 -mx-2 rounded-2xl transition-all">
              <div className="w-10 h-10 rounded-full bg-black border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-white/20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-pink/20 to-accent-purple/20 opacity-0 group-hover:opacity-100 transition-opacity" />
                {item.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-white font-medium text-sm truncate">{item.tag}</div>
                <div className="text-white/50 text-xs truncate">{item.desc}</div>
              </div>
              <ArrowUpRight className="w-4 h-4 text-white/30 group-hover:text-white transition-colors" />
            </div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
