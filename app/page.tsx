'use client';

import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import HomeView from '@/components/HomeView';
import ChatView from '@/components/ChatView';
import VoiceView from '@/components/VoiceView';

type ViewState = 'home' | 'chat' | 'voice';

export default function HomePage() {
  const [currentView, setCurrentView] = useState<ViewState>('home');
  const [chatTheme, setChatTheme] = useState({ title: 'iPhone Assistant', subtitle: 'Ready to help', initialPrompt: '' });

  const handleNavigate = (view: ViewState, title?: string, subtitle?: string, initialPrompt?: string) => {
    if (title || subtitle || initialPrompt !== undefined) {
      setChatTheme({ 
        title: title || chatTheme.title, 
        subtitle: subtitle || chatTheme.subtitle, 
        initialPrompt: initialPrompt || '' 
      });
    }
    setCurrentView(view);
  };

  return (
    <main className="bg-black min-h-screen flex items-center justify-center p-0 md:p-6 lg:p-12">
      {/* Responsive wrapper container that looks glorious on desktop and mobile */}
      <div className="w-full h-[100dvh] md:h-[calc(100vh-3rem)] md:max-h-[900px] md:max-w-4xl md:border md:border-white/10 md:rounded-[40px] overflow-hidden relative shadow-2xl bg-background mx-auto flex flex-col ring-1 ring-white/5">
        <AnimatePresence mode="wait">
          {currentView === 'home' && (
            <HomeView key="home" onNavigate={handleNavigate} />
          )}
          {currentView === 'chat' && (
             <ChatView 
               key="chat" 
               onBack={() => setCurrentView('home')} 
               onVoiceMode={() => setCurrentView('voice')}
               title={chatTheme.title}
               subtitle={chatTheme.subtitle}
               initialPrompt={chatTheme.initialPrompt}
             />
          )}
          {currentView === 'voice' && (
             <VoiceView 
               key="voice" 
               onBack={() => setCurrentView('chat')}
               onClose={() => setCurrentView('home')}
               onResult={(text) => handleNavigate('chat', chatTheme.title, chatTheme.subtitle, text)}
               title={chatTheme.title}
               subtitle={chatTheme.subtitle}
             />
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
