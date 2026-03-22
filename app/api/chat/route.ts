import { NextRequest, NextResponse } from 'next/server';
import { iphoneData } from '@/lib/data';
import { systemPrompt } from '@/lib/prompt';

export async function POST(req: NextRequest) {
  try {
    const geminiKey = process.env.GEMINI_API_KEY;
    const openAiKey = process.env.OPENAI_API_KEY;
    
    if (!geminiKey && !openAiKey) {
      return NextResponse.json({ error: 'Missing OpenAI or Gemini API key' }, { status: 500 });
    }

    const body = await req.json();
    const message = String(body.message || '').trim();

    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 });
    }

    const systemAndContext = `${systemPrompt}\n\nKnowledge base: ${JSON.stringify(iphoneData)}`;

    // Helper to call OpenAI
    const callOpenAI = async () => {
      const payload = {
        model: 'gpt-3.5-turbo',
        messages: [
          { role: 'system', content: systemAndContext },
          { role: 'user', content: message },
        ],
        temperature: 0.1,
        max_tokens: 500,
      };
      const res = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${openAiKey}`,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data?.choices?.[0]?.message?.content?.trim();
    };

    // Helper to call Gemini
    const callGemini = async () => {
      const payload = {
        contents: [{ parts: [{ text: `${systemAndContext}\n\nUser: ${message}` }] }],
        generationConfig: { temperature: 0.2, maxOutputTokens: 500 }
      };
      const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${geminiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error(await res.text());
      const data = await res.json();
      return data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    };

    let reply = null;

    // Offline fallback for when API keys are dead
    const generateOfflineResponse = (msg: string) => {
      const lower = msg.toLowerCase();
      if (lower.includes('compare')) {
        return `📊 1. Quick Comparison Table (All Models)
Model | Chip | Display | Camera | Battery | Best For
iPhone 16 | A18 | 60Hz | Dual | ~22h | Budget basic
16 Plus | A18 | 60Hz | Dual | ~27h | Big screen
16 Pro | A18 Pro | 120Hz | Triple (5x) | ~27h | Premium (old)
16 Pro Max | A18 Pro | 120Hz | Triple (5x) | ~33h | Battery + camera
17e | A19 | 60Hz ❌ | Single | ~26h | Cheapest
17 | A19 | 120Hz ✅ | Dual (48MP UW) | ~30h | Best value ⭐
Air | A19 Pro | 120Hz | Single | ~27h | Slim design
17 Pro | A19 Pro | 120Hz | Triple (48MP all) | ~31h | Power users
17 Pro Max | A19 Pro | 120Hz | Triple (8x zoom) | ~37h 🔥 | Best overall

⚡ 2. Key Differences (VERY IMPORTANT)

📱 Display
❌ 60Hz: iPhone 16, 16 Plus, 17e
✅ 120Hz: All 17 (except 17e) + 16 Pro
👉 120Hz = smoother scrolling & gaming

🧠 Performance
A18 → iPhone 16 series
A19 → iPhone 17 / 17e
A19 Pro → Air + Pro models
👉 A19 is faster & more efficient for long-term use

📸 Camera Levels
Basic: 17e (single camera)
Good: 16 / 17 (dual camera)
Best: 17 Pro series (triple 48MP + zoom)
👉 17 Pro has big camera upgrade (all 48MP + better zoom)

🔋 Battery Ranking
🥇 17 Pro Max → ~37 hrs 🔥
🥈 16 Pro Max → ~33 hrs
🥉 iPhone 17 → ~30 hrs
Others → ~26–27 hrs
👉 Pro Max is the battery king

⚡ Charging
16 series → slower
17 series → faster (~35–40W)
👉 Big real-life convenience upgrade

✨ Design
Air → thinnest (5.6mm)
Pro Max → biggest + premium feel
17 → balanced design
👉 Air focuses on looks, Pro focuses on performance

🧠 3. Category Winners (Simple)
Category | Winner
💸 Cheapest | 17e
⚖️ Best value | 17 ✅
📸 Best camera | 17 Pro / Pro Max
🔋 Best battery | 17 Pro Max 🔥
🎮 Best performance | 17 Pro / Pro Max
✨ Best design | Air
📱 Big screen | 16 Plus / Pro Max`;
      }
      if (lower.includes('price') || lower.includes('cost')) {
        return `iPhone 16: $799
iPhone 16 Plus: $899
iPhone Air: $699
iPhone 17: $799
iPhone 17e: $699
iPhone 17 Pro: $999
iPhone 17 Pro Max: $1199
iPhone 16 pro: $999
iPhone 16 Pro Max: $1199`;
      }
      if (lower.includes('battery')) {
        return `📱 iPhone 16 Series
Model | Battery Life
iPhone 16 | ⏱️ Up to 22 hours
iPhone 16 Plus | ⏱️ Up to 27 hours
iPhone 16 Pro | ⏱️ Up to 27 hours
iPhone 16 Pro Max | ⏱️ Up to 33 hours
👉 Bigger models = better battery (Plus & Pro Max)

📱 iPhone 17 Series
Model | Battery Life
iPhone 17e | ⏱️ Up to 26 hours
iPhone 17 | ⏱️ Up to 30 hours
iPhone Air | ⏱️ Up to 27 hours
iPhone 17 Pro | ⏱️ Up to 31 hours
iPhone 17 Pro Max | ⏱️ Up to 37 hours 🔥`;
      }
      if (lower.includes('zoom') || (lower.includes('camera specs') && lower.includes('17 pro max'))) {
        return `📷 Rear Cameras (Triple 48MP System)
Main (Wide): 48MP
Ultra-Wide: 48MP
Telephoto: 48MP
👉 This is the first iPhone with all three lenses at 48MP

📸 Lens Details
Main lens: ~24mm (standard shots)
Ultra-wide: ~13mm (landscape, group shots)
Telephoto: ~100mm (zoom shots)

🤳 Front Camera
18MP Center Stage camera
Autofocus + better video stabilization
👉 Big upgrade from older 12MP front camera

🔍 Zoom Capabilities (VERY IMPORTANT)
🔹 Optical Zoom Levels
0.5x → Ultra-wide
1x → Main
2x → Crop zoom
4x → Telephoto
Up to 8x (optical-quality zoom) 🔥
👉 Apple uses sensor cropping to achieve 8x optical-quality zoom

🔹 Digital Zoom
Up to 40x digital zoom

🎥 Video Capabilities
4K Dolby Vision video (up to 120fps)
ProRes & Pro-level recording
Cinematic mode + Action mode
Better zoom in video
👉 Designed for professional-level videography

⚡ Key Camera Features
Smart HDR 5
Night mode (all lenses)
Deep Fusion
Photonic Engine
ProRAW support
Macro photography
Spatial photos & videos`;
      }
      if (lower.includes('camera')) {
        return `📊 1. Camera Specs Table (Easy View)
Model | Rear Camera Setup | Zoom | Front Camera
iPhone 16 | 48MP (main) + 12MP (ultrawide) | 2x | 12MP
16 Plus | Same as iPhone 16 | 2x | 12MP
16 Pro | 48MP + 48MP UW + 12MP Tele | 5x | 12MP
16 Pro Max | Same as 16 Pro | 5x | 12MP

Model | Rear Camera Setup | Zoom | Front Camera
17e | 48MP (single) | 2x | 12MP
17 | 48MP + 48MP ultrawide | 2x | 18MP
Air | 48MP (single) | 2x | 18MP
17 Pro | 48MP (all 3 lenses) | 8x 🔥 | 18MP
17 Pro Max | 48MP (all 3 lenses) | 8x 🔥 | 18MP`;
      }
      if (lower.includes('chip') || lower.includes('a18') || lower.includes('a19')) {
        return "The A18 Bionic is an efficient 3nm chip for standard AI tasks. The A19 Pro is a cutting-edge 2nm chip offering 40% faster GPU and a dedicated AI engine for pro-level processing.";
      }
      if (lower.includes('air')) {
        return `🔹 Design (Main Highlight ✨)

✨ Key Design Features
Ultra-thin body: ~5.6 mm (thinnest iPhone ever)
Lightweight: ~165g (very easy to hold)
Material: Premium titanium frame + Ceramic Shield 2
Look: Minimal, sleek, almost “disappears” in hand
Colors: Sky Blue, Light Gold, Cloud White, Space Black
👉 Apple designed it to focus on style, thinness, and portability rather than max features.

📱 Display
Size: 6.5-inch OLED
Type: Super Retina XDR
Refresh rate: 120Hz ProMotion
Storage: Up to 1TB`;
      }
      if (lower.includes('17e')) {
        return "The iPhone 17e is Apple's new entry-level device, featuring an OLED display, the A18 chip, and a starting price of around $599, replacing the SE line.";
      }
      if (lower.includes('island')) {
        return `👉 Yes — the iPhone 17 DOES have Dynamic Island.

📱 What the sources confirm:
Apple’s official specs list Dynamic Island as a feature on iPhone 17
It’s used for alerts, live activities, and app controls at the top of the screen

🧠 Simple Explanation
The iPhone 17 keeps Dynamic Island (like iPhone 15 & 16)
It replaces the old notch with an interactive pill-shaped area
Shows things like:
Music controls 🎵
Calls 📞
Navigation 🗺️
Timers ⏱️

Yes, the iPhone 17 includes Dynamic Island — it’s a standard feature in the main and Pro models.`;
      }
      return "Based on the Apple knowledge base, the iPhone 17 family features advanced AI, upgraded cameras, and faster chips compared to the iPhone 16 suite. (Simulated offline response due to API quota limits).";
    };

    if (geminiKey) {
      try {
        reply = await callGemini();
      } catch (geminiError) {
        if (openAiKey) {
          try {
            reply = await callOpenAI();
          } catch (openAiError) {
            if (process.env.NODE_ENV === 'development') {
              reply = generateOfflineResponse(message);
            } else {
              throw new Error(`Both APIs failed.`);
            }
          }
        } else {
          if (process.env.NODE_ENV === 'development') {
             reply = generateOfflineResponse(message);
          } else {
            throw geminiError;
          }
        }
      }
    } else if (openAiKey) {
      try {
        reply = await callOpenAI();
      } catch (openAiError) {
        if (process.env.NODE_ENV === 'development') {
          reply = generateOfflineResponse(message);
        } else {
          throw openAiError;
        }
      }
    }

    if (!reply) {
      reply = "I don't have that information.";
    }

    return NextResponse.json({ reply });
  } catch (err) {
    return NextResponse.json({ error: 'Unable to process request', details: String(err) }, { status: 500 });
  }
}
