# Pipkin: Little Wonder ✦

An interactive 3D character portfolio for **Pipkin**, a whimsical pony. A real 3D model assembles itself from separate parts as you scroll, and visitors can then play with Pipkin using animated emotes.

**Live demo:** <!-- add your deployed URL here -->

---

## Screenshots

![Pipkin: Little Wonder](screenshots/Screenshot%202026-10-19%20165550.png)

---

## Features

- **Scroll-driven 3D assembly** – the *Build* section pins to the screen while Pipkin's nine parts fly from an exploded layout into the finished character. It scrubs forward and backward with the scroll position.
- **Play with Pipkin** – five emotes (Wave, Nod, Dance, Collect, Explore) animate the 3D parts using pivots at the hip, neck and shoulders. Each emote returns to the exact assembled pose.
- **Portfolio sections** – Hero, Build, Meet Pipkin, Work (gallery with detail modals), Process timeline, Play, and Contact.
- **Polish** – custom flower cursor, synthesized sound effects, particle effects, loading and error states, and `prefers-reduced-motion` support.
- **Performance-minded** – the 3D files load only when the section is near the screen, the render loop runs only while the canvas is visible, and the geometry is shared between sections.

---

## Tech Stack

| Area | Tools |
|---|---|
| Framework | React 18, Vite |
| 3D | Three.js (with `STLLoader`) |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| UI | Lucide React, canvas-confetti, clsx |
| Audio | Web Audio API |
| Language | JavaScript (JSX) |

---

## Getting Started

**Requirements:** Node.js 18 or newer and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the address shown in the terminal
```

### Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create a production build in `dist/` |
| `npm run preview` | Preview the production build locally |

---

## Project Structure

```text
.
├── public/
│   ├── assets/images/           # Section artwork (PNG + WebP)
│   ├── cursors/                 # Flower cursor (32px / 64px)
│   └── models/pipkin/           # Pipkin STL parts (9 files)
├── screenshots/                 # README screenshots
├── src/
│   ├── components/
│   │   ├── build/
│   │   │   ├── pipkinScene.js       # Three.js scene + GSAP ScrollTrigger assembly
│   │   │   └── pipkinGeometry.js    # Shared, cached STL loader
│   │   ├── play/
│   │   │   ├── pipkinRig.js         # Pivot hierarchy + emote timelines
│   │   │   └── PipkinPlayStage.jsx  # Play-section 3D canvas
│   │   ├── sections/                # Build, Meet, Work, Process, Play, Contact
│   │   ├── modals/                  # Project, Showreel, Contact modals
│   │   └── canvas/                  # Hero / decorative canvases
│   ├── data/
│   │   ├── pipkinAssembly.js    # Part positions, rotations, timings, captions
│   │   ├── assets.js            # Central image paths
│   │   ├── projects.js          # Work gallery content
│   │   └── playEmotes.js        # Emote labels, text and sounds
│   ├── styles/variables.css     # Design tokens, global styles, cursor
│   ├── utils/audio.js           # Sound engine
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

---

## Customization

| I want to… | Edit |
|---|---|
| Adjust assembly positions, order, speed or captions | `src/data/pipkinAssembly.js` |
| Change the scroll pin length or scrub | `src/components/build/pipkinScene.js` |
| Tweak emote movements or angles | `src/components/play/pipkinRig.js` |
| Change emote text, icons or sounds | `src/data/playEmotes.js` |
| Replace artwork | `public/assets/images/` and `src/data/assets.js` |
| Edit gallery projects | `src/data/projects.js` |
| Change colors, fonts or cursor | `src/styles/variables.css` |

---

## How the 3D Works

- Pipkin is built from **separate STL parts** (body, head, eyes, nose, two arms, two legs). STL files contain no skeleton or hierarchy.
- The **assembly** animates each part's position and rotation from an exploded start to its assembled position, driven by a GSAP ScrollTrigger timeline.
- The **emotes are procedural**, not a skinned rig. The parts are grouped under pivots (hip, neck, shoulders) whose positions are calculated from the real geometry. Parts rotate around those pivots, and the legs stay planted.

---

## Known Limitations

- The arm and leg positions on the body are **estimated**, because STL files don't store how the pieces attach. If you see a gap, adjust the values in `src/data/pipkinAssembly.js`.
- The 3D parts total about 15 MB. Converting them to a single compressed GLB would load faster.
- Because emotes rotate rigid parts, the shoulders don't deform.

---

## Deployment

```bash
npm run build
```

Upload the generated `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Set the build command to `npm run build` and the output directory to `dist`.

---

## Credits — Pipkin: Little Wonder

### 3D Model

- **Creator:** otteroflore
- **Asset:** My Little Pony Takara Tomy "Osharena Ponii" 3D Printable Models, Ball Jointed (v3)
- **Source:** https://otteroflore.itch.io/mylittleponytakaratomyosharenaponii
- **Usage:** Original 3D model geometry adapted for an interactive web experience.

### Background Artwork

- **Tool:** Google Gemini — Nano Banana
- **Usage:** AI-generated background images and environmental artwork used throughout the website.

### Development and Implementation

- **Website design and development:** Team ROC
- **3D integration and animation:** Three.js, GSAP, and ScrollTrigger
- **Frontend:** React and Vite

### Audio and Additional Assets

- **Audio implementation:** Web Audio API

---

## Disclaimer

*Pipkin: Little Wonder* is an independent fan-made interactive project. The referenced 3D model is an unofficial recreation and is not affiliated with or endorsed by the original intellectual-property owners.
