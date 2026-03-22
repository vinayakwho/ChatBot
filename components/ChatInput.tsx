'use client';

import { FormEvent, useState } from 'react';

type ChatInputProps = {
  onSend: (message: string) => Promise<void>;
  disabled?: boolean;
  suggestedPrompt?: (text: string) => void;
};

export default function ChatInput({ onSend, disabled, suggestedPrompt }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!value.trim() || disabled) return;
    await onSend(value.trim());
    setValue('');
  };

  return (
    <div className="sticky bottom-0 left-0 right-0 border-t border-slate-200 bg-white/90 p-4 backdrop-blur-sm dark:border-slate-700 dark:bg-slate-950/90">
      <form onSubmit={handleSubmit} className="flex gap-3">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Ask question about your latest iphone..."
          className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-indigo-400 dark:focus:ring-indigo-900"
          onKeyDown={(e) => {
            if (e.key === 'Enter' && !e.shiftKey) {
              e.preventDefault();
              handleSubmit(e as any);
            }
          }}
          disabled={disabled}
        />
        <button
          type="submit"
          disabled={disabled || !value.trim()}
          className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700 disabled:cursor-not-allowed disabled:opacity-40 dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100"
        >
          Send
        </button>
      </form>
      {suggestedPrompt && (
        <div className="mt-3 flex flex-wrap gap-2 text-sm text-slate-500 dark:text-slate-300">
          <span>Quick prompts:</span>
          {['What is the price of iPhone 17 Pro Max?', 'Tell me about the iPhone Air camera', 'Compare iPhone 17 and iPhone 16'].map((promptText) => (
            <button
              key={promptText}
              type="button"
              onClick={() => suggestedPrompt(promptText)}
              className="rounded-lg border border-slate-200 px-3 py-1.5 text-xs transition hover:border-indigo-400 hover:text-indigo-600 dark:border-slate-700 dark:hover:text-indigo-300"
            >
              {promptText}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
