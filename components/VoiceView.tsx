'use client';

import { ChevronLeft, MoreVertical, Mic, RotateCcw, X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

type VoiceViewProps = {
  onBack: () => void;
  onClose: () => void;
  title?: string;
  subtitle?: string;
};

export default function VoiceView({ onBack, onClose, title = 'Text writer', subtitle = 'Marketing in 2025' }: VoiceViewProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="mobile-view-container flex flex-col h-full relative z-50 bg-[#09090b]"
    >
      {/* Heavy Blur background for ambient feel */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
         <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[300px] h-[300px] bg-accent-purple/20 blur-[120px] rounded-full mix-blend-screen animate-pulse-ring" />
      </div>

      {/* Header */}
      <header className="flex items-center justify-between p-4 z-10">
        <button onClick={onBack} className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">
          <ChevronLeft className="w-6 h-6 text-white" />
        </button>
        
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent-pink to-accent-purple p-[1px]">
            <div className="w-full h-full bg-black rounded-full flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent-pink" />
            </div>
          </div>
          <div>
            <h2 className="text-white font-semibold text-sm leading-tight">{title}</h2>
            <p className="text-white/50 text-xs">{subtitle}</p>
          </div>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">
          <MoreVertical className="w-5 h-5 text-white/80" />
        </button>
      </header>

      {/* Central Animated Blob Area */}
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 mb-20">
        
        <div className="relative w-64 h-64 flex items-center justify-center">
           {/* Decorative morphing blobs to simulate 3D mesh */}
           <motion.div 
             animate={{ 
               scale: [1, 1.2, 0.9, 1.1, 1],
               rotate: [0, 90, 180, 270, 360],
               borderRadius: ["60% 40% 30% 70%/60% 30% 70% 40%", "30% 60% 70% 40%/50% 60% 30% 60%", "60% 40% 30% 70%/60% 30% 70% 40%"]
             }}
             transition={{ duration: 8, ease: "linear", repeat: Infinity }}
             className="absolute w-48 h-48 bg-gradient-glow opacity-60 blur-xl blend-screen"
           />
           <motion.div 
             animate={{ 
               scale: [1.1, 0.9, 1.2, 1],
               rotate: [360, 270, 180, 0],
               borderRadius: ["40% 60% 70% 30%/40% 50% 60% 50%", "60% 40% 30% 70%/60% 30% 70% 40%", "40% 60% 70% 30%/40% 50% 60% 50%"]
             }}
             transition={{ duration: 12, ease: "linear", repeat: Infinity }}
             className="absolute w-56 h-56 border border-accent-pink/50 shadow-[inset_0_0_20px_rgba(255,64,129,0.5)]"
           />
           
           <div className="relative z-10 w-40 h-40 bg-gradient-radial from-accent-purple/80 to-transparent rounded-full backdrop-blur-3xl animate-pulse-ring" />
        </div>

        <div className="mt-16 px-8 text-center max-w-sm mx-auto">
           <h3 className="text-xl font-medium text-white shadow-sm leading-snug">
              Tell me about this year's top 5 trends <span className="text-white/40">|</span> <span className="text-white/40">for instagram marketers</span>
           </h3>
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-10 left-0 right-0 flex items-center justify-center gap-8 z-10">
         <button className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
           <RotateCcw className="w-5 h-5" />
         </button>
         
         <div className="relative group">
           <div className="absolute -inset-2 bg-gradient-glow rounded-full blur-md opacity-40 group-hover:opacity-75 transition duration-500 animate-pulse-ring" />
           <button className="relative w-20 h-20 rounded-full bg-gradient-glow border-4 border-black flex items-center justify-center text-white shadow-2xl">
             <Mic className="w-8 h-8" />
           </button>
         </div>
         
         <button onClick={onClose} className="w-12 h-12 flex items-center justify-center rounded-full hover:bg-white/10 transition text-white/60 hover:text-white">
           <X className="w-5 h-5" />
         </button>
      </div>
    </motion.div>
  );
}
