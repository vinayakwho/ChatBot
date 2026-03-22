import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        panel: '#121214',
        accent: {
          pink: '#ff4081',
          purple: '#a64dff',
          deep: '#1e0f33',
        }
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-glow': 'linear-gradient(135deg, rgba(255,64,129,0.8), rgba(166,77,255,0.8))',
        'gradient-text': 'linear-gradient(90deg, #ff4081, #a64dff)',
        'gradient-subtle': 'linear-gradient(to bottom, #1a1525, #09090b)',
      },
      boxShadow: {
        soft: '0 8px 30px rgba(0,0,0,0.08)',
        glow: '0 0 20px rgba(166,77,255,0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
