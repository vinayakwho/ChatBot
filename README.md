# 📱 iPhone Assistant ChatBot

A sleek, mobile-first AI chatbot designed exclusively to be an expert on the Apple iPhone ecosystem—specifically focused on deep-dive comparisons for the upcoming **iPhone 17 series** (including the Pro, Pro Max, 17e, and the ultra-thin iPhone Air) alongside the iPhone 16 lineup.

## ✨ Why this topic?
Apple product specifications, pricing, and feature comparisons (like processor jumps from A18 to A19 Pro, or battery life differences) are highly sought-after pieces of information. General AI models often hallucinate these hyper-specific specs or lack the newest unreleased data. 

We built this project to demonstrate a **strictly-scoped AI Knowledge Base**. By feeding the chatbot a hardcoded dataset (`lib/data.ts`) containing exact, verified specifications of these iPhones, we ensure the bot gives 100% accurate, authoritative, and concise Apple-style answers without making up information.

## 🚀 Features
- **Dynamic UI/UX**: A gorgeous, dark-themed, glassmorphic layout powered by Tailwind CSS and Framer Motion. 
- **Offline Resilience**: Features an intelligent keyword-based offline fallback mode that seamlessly simulates AI responses if external API quotas are exhausted during a demo.
- **Dual-Model Fallback**: Automatically reroutes traffic between Google Gemini and OpenAI to guarantee 100% uptime.
- **Quick Actions**: One-click horizontal scroll cards that instantly calculate value comparisons, camera specs, and battery life across the entire iPhone lineup.

## 🛠️ Tech Stack
- **Framework**: Next.js 14 (App Router)
- **Styling**: Tailwind CSS & Framer Motion
- **AI Integration**: Google Gemini 2.5 Flash & OpenAI GPT-3.5 Turbo
- **Icons**: Lucide React

## 💻 Running Locally
1. Clone the repository.
2. Run \`npm install\`.
3. Create a \`.env.local\` file with your \`GEMINI_API_KEY\` and \`OPENAI_API_KEY\`.
4. Run \`npm run dev\`. Open [http://localhost:3000](http://localhost:3000).

---
*Built as a showcase for responsive web design, localized AI precision, and robust error handling.*
