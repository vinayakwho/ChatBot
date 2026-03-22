export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  text: string;
};

export const initialBotMessage = 'Welcome to iPhone Assistant. Ask anything about specs, pricing, and features.';
