'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage } from '@/lib/utils';
import MessageBubble from './MessageBubble';

type ChatWindowProps = {
  messages: ChatMessage[];
  loading: boolean;
  error?: string;
};

export default function ChatWindow({ messages, loading, error }: ChatWindowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  return (
    <div className="flex flex-1 flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white/70 shadow-soft backdrop-blur-sm dark:border-slate-700 dark:bg-slate-900/40">
      <div ref={scrollRef} className="flex-1 space-y-2 overflow-y-auto p-4">
        {messages.length === 0 && (
          <div className="rounded-xl border border-dashed border-slate-300 p-6 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
            Start with a question about iPhone.
          </div>
        )}

        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {loading && (
          <div className="flex justify-start py-1">
            <div className="rounded-2xl bg-slate-900 px-4 py-2 text-white shadow-soft dark:bg-white/10">
              Typing...
            </div>
          </div>
        )}

        {error && (
          <div className="rounded-2xl bg-red-50 px-4 py-2 text-red-700 dark:bg-red-900/40 dark:text-red-200">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
