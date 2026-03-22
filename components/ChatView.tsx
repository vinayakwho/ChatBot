'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, MoreVertical, Mic, PlusCircle, ThumbsUp, ThumbsDown, Volume2, RefreshCcw, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChatMessage, initialBotMessage } from '@/lib/utils';

type ChatViewProps = {
  onBack: () => void;
  title?: string;
  subtitle?: string;
  initialPrompt?: string;
  onVoiceMode: () => void;
};

export default function ChatView({ onBack, title = 'iPhone Assistant', subtitle = 'Ready to help', initialPrompt, onVoiceMode }: ChatViewProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 'init', role: 'assistant', text: initialBotMessage },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const promptProcessed = useRef(false);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  useEffect(() => {
    if (initialPrompt && !promptProcessed.current) {
      promptProcessed.current = true;
      sendMessage(initialPrompt);
    }
  }, [initialPrompt]);

  const sendMessage = async (text: string) => {
    if (!text.trim()) return;
    
    const userMessage: ChatMessage = { id: `${Date.now()}-user`, role: 'user', text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const botText = data.reply || "I don't have that information.";
      const botMessage: ChatMessage = { id: `${Date.now()}-bot`, role: 'assistant', text: botText };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      const errorMessage: ChatMessage = { id: `${Date.now()}-error`, role: 'assistant', text: 'Sorry, I encountered an error answering that. Please try again.' };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = () => {
    sendMessage(input);
    setInput('');
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.3 }}
      className="mobile-view-container flex flex-col h-full relative z-20 bg-background"
    >
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-white/5 bg-background/80 backdrop-blur-md sticky top-0 z-30">
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
            <h2 className="text-white font-semibold text-sm leading-tight truncate max-w-[150px]">{title}</h2>
            <p className="text-white/50 text-xs truncate max-w-[150px]">{subtitle}</p>
          </div>
        </div>

        <button className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition">
          <MoreVertical className="w-5 h-5 text-white/80" />
        </button>
      </header>

      {/* Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth"
      >
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex flex-col relative ${msg.role === 'user' ? 'items-end' : 'items-start'}`}
            >
              <div 
                className={`max-w-[85%] md:max-w-[75%] lg:max-w-[65%] rounded-3xl p-4 text-sm md:text-base leading-relaxed shadow-lg whitespace-pre-wrap ${
                  msg.role === 'user' 
                    ? 'bg-gradient-glow text-white rounded-br-sm' 
                    : 'bg-[#1a1c23] text-white/90 border border-white/5 rounded-bl-sm'
                }`}
              >
                {msg.text}
              </div>
              
              {/* Bot Action Buttons */}
              {msg.role === 'assistant' && msg.id !== 'init' && (
                <div className="flex gap-4 mt-2 px-2 text-white/40">
                  <button className="hover:text-white transition"><ThumbsUp className="w-4 h-4" /></button>
                  <button className="hover:text-white transition"><ThumbsDown className="w-4 h-4" /></button>
                  <button className="hover:text-white transition"><Volume2 className="w-4 h-4" /></button>
                  <button className="hover:text-white transition ml-auto"><RefreshCcw className="w-4 h-4" /></button>
                </div>
              )}
            </motion.div>
          ))}
          {loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col relative items-start"
            >
              <div className="max-w-[85%] rounded-3xl p-4 text-sm leading-relaxed shadow-lg bg-[#1a1c23] text-white/90 border border-white/5 rounded-bl-sm flex items-center gap-1 h-10">
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-white/50 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Suggested Action Pill */}
        {!loading && messages.length > 1 && (
          <div className="flex justify-end pr-2 pt-2">
             <button 
               onClick={() => { setInput('Tell me more about it'); handleSend(); }}
               className="px-4 py-2 rounded-full bg-gradient-glow text-white text-xs font-medium shadow-glow opacity-90 hover:opacity-100 transition-opacity"
             >
               Tell me more about it
             </button>
          </div>
        )}
        <div className="h-4"></div>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-background border-t border-white/5 pb-8">
        <div className="flex items-center gap-3 bg-[#1a1c23] p-1.5 pl-4 rounded-full border border-white/10 focus-within:border-accent-pink/50 transition-colors shadow-lg max-w-3xl mx-auto">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Send message..."
            disabled={loading}
            className="flex-1 bg-transparent border-none text-white text-sm md:text-base outline-none placeholder-white/40 disabled:opacity-50"
          />
          <button 
            onClick={onVoiceMode}
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white/50 transition flex-shrink-0"
          >
            <Mic className="w-5 h-5" />
          </button>
          <button 
             onClick={handleSend}
             disabled={loading || !input.trim()}
            className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center bg-transparent text-white hover:bg-white/10 transition disabled:opacity-30 flex-shrink-0"
          >
            <PlusCircle className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
