export const iphoneData = {
  brand: "Apple",

  models: [
    {
      name: "iPhone 16",
      launch_date: "September 2024",
      display: {
        type: "Super Retina XDR",
        size: "6.1 inch",
        refresh_rate: "60Hz"
      },
      chip: "A18 Bionic",
      camera: {
        main: "48MP",
        ultra_wide: "12MP",
        features: ["Night Mode", "Photonic Engine", "4K Video"]
      },
      battery: "Up to 22 hours video playback",
      build: "Aluminum frame",
      price: "$799",
      features: [
        "Dynamic Island",
        "USB-C",
        "iOS 18",
        "Crash Detection"
      ]
    },

    {
      name: "iPhone 16 Plus",
      launch_date: "September 2024",
      display: {
        type: "Super Retina XDR",
        size: "6.7 inch",
        refresh_rate: "60Hz"
      },
      chip: "A18 Bionic",
      camera: {
        main: "48MP",
        ultra_wide: "12MP"
      },
      battery: "Up to 27 hours video playback",
      build: "Aluminum frame",
      price: "$899",
      features: [
        "Bigger battery",
        "Dynamic Island",
        "USB-C",
        "iOS 18"
      ]
    },

    {
      name: "iPhone Air",
      launch_date: "March 2025",
      display: {
        type: "OLED",
        size: "6.5 inch",
        refresh_rate: "90Hz"
      },
      chip: "A18 Lite",
      camera: {
        main: "48MP"
      },
      battery: "Up to 24 hours",
      build: "Ultra-thin aluminum",
      price: "$699",
      features: [
        "Slim design",
        "Lightweight",
        "AI Camera",
        "USB-C"
      ]
    },

    {
      name: "iPhone 17",
      launch_date: "September 2025",
      display: {
        type: "Super Retina XDR",
        size: "6.1 inch",
        refresh_rate: "120Hz"
      },
      chip: "A19 Bionic",
      camera: {
        main: "48MP",
        ultra_wide: "12MP",
        features: ["AI Zoom", "Night Mode", "Cinematic Mode"]
      },
      battery: "Up to 25 hours video playback",
      build: "Aluminum",
      price: "$799",
      features: [
        "Dynamic Island 2.0",
        "AI-powered Siri",
        "USB-C 2.0"
      ]
    },

    {
      name: "iPhone 17e",
      launch_date: "October 2025",
      display: {
        type: "OLED",
        size: "6.1 inch",
        refresh_rate: "60Hz"
      },
      chip: "A19 Lite",
      camera: {
        main: "48MP"
      },
      battery: "Up to 23 hours",
      build: "Aluminum",
      price: "$699",
      features: [
        "Budget model",
        "AI features",
        "USB-C"
      ]
    },

    {
      name: "iPhone 17 Pro",
      launch_date: "September 2025",
      display: {
        type: "Super Retina XDR",
        size: "6.3 inch",
        refresh_rate: "120Hz ProMotion"
      },
      chip: "A19 Pro",
      camera: {
        main: "48MP",
        telephoto: "12MP",
        ultra_wide: "12MP",
        features: ["5x Zoom", "LiDAR", "ProRAW"]
      },
      battery: "Up to 28 hours",
      build: "Titanium",
      price: "$999",
      features: [
        "ProMotion display",
        "Advanced AI camera",
        "LiDAR Scanner",
        "Titanium build"
      ]
    },

    {
      name: "iPhone 17 Pro Max",
      launch_date: "September 2025",
      display: {
        type: "Super Retina XDR",
        size: "6.9 inch",
        refresh_rate: "120Hz ProMotion"
      },
      chip: "A19 Pro",
      camera: {
        main: "48MP",
        telephoto: "12MP",
        ultra_wide: "12MP",
        features: ["10x Zoom", "LiDAR", "Pro Video"]
      },
      battery: "Up to 37 hours",
      build: "Titanium",
      price: "$1199",
      features: [
        "Best battery life",
        "Advanced zoom",
        "Titanium frame",
        "AI Pro photography"
      ]
    },
    {
      name: "iPhone 16 Pro",
      launch_date: "September 2024",
      display: { type: "Super Retina XDR", size: "6.3 inch", refresh_rate: "120Hz" },
      chip: "A18 Pro",
      camera: { main: "48MP", telephoto: "12MP", ultra_wide: "12MP", features: ["Triple (5x)"] },
      battery: "Up to 27 hours video playback",
      build: "Titanium",
      price: "$999",
      features: ["Premium (old)"]
    },
    {
      name: "iPhone 16 Pro Max",
      launch_date: "September 2024",
      display: { type: "Super Retina XDR", size: "6.9 inch", refresh_rate: "120Hz" },
      chip: "A18 Pro",
      camera: { main: "48MP", telephoto: "12MP", ultra_wide: "12MP", features: ["Triple (5x)"] },
      battery: "Up to 33 hours video playback",
      build: "Titanium",
      price: "$1199",
      features: ["Battery + camera"]
    }
  ],
  chip_comparisons: [
    {
      topic: "A18 Bionic vs A19 Pro",
      details: "The A18 Bionic used in the iPhone 16 series is a highly efficient 3nm chip focusing on power balance and standard AI tasks. The A19 Pro used in the iPhone 17 Pro series represents a major leap, utilizing a second-generation 2nm process. The A19 Pro offers 40% faster GPU performance, a new dedicated AI neural engine capable of running massive models entirely on-device, and advanced hardware ray-tracing that the A18 Bionic lacks. For everyday tasks, both are incredibly fast, but the A19 Pro dominates in pro-level gaming, spatial video rendering, and heavy computational photography."
    }
  ],
  comprehensive_comparison_guide: `
📊 1. Quick Comparison Table (All Models)
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
📱 Big screen | 16 Plus / Pro Max
`
};