import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'iPhone Assistant',
  description: 'Chatbot for iPhone 17 specs and features',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
