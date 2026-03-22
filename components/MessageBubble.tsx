'use client';

import { ChatMessage } from '@/lib/utils';

type MessageBubbleProps = {
  message: ChatMessage;
};

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';
  return (
    <div
      className={`fade-in flex ${isUser ? 'justify-end' : 'justify-start'} py-1`}
      aria-live="polite"
    >
      <div
        className={`max-w-[82%] rounded-2xl px-4 py-2 shadow-soft ${
          isUser
            ? 'bg-white text-gray-900 border border-gray-200 dark:bg-slate-800 dark:text-white dark:border-slate-700'
            : 'bg-slate-900 text-white dark:bg-white/10 dark:text-white'
        }`}
      >
        <p className="whitespace-pre-wrap text-sm leading-relaxed">{message.text}</p>
      </div>
    </div>
  );
}
