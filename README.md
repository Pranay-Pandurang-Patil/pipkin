# Pipkin ✦ Interactive 3D Character Portfolio

A single-page portfolio for **Pipkin**, a whimsical pony character. A real 3D model assembles itself from separate parts as you scroll, and visitors can then play with Pipkin using animated emotes.

**Live demo:** <!-- add your deployed URL here -->

---

## Features

- **Scroll-driven 3D assembly** – the *Build* section pins to the screen while Pipkin's nine STL parts fly from an exploded layout into the finished character. It scrubs forward and backward with the scroll position.
- **Play with Pipkin** – five emotes (Wave, Nod, Dance, Collect, Explore) animate the 3D parts using pivots placed at the hip, neck and shoulders. Each emote returns to the exact assembled pose.
- **Portfolio sections** – Hero, Build, Meet Pipkin, Work (project gallery with detail modals), Process timeline, Play, and Contact.
- **Polish** – custom flower cursor, sound effects, particle effects, loading and error states, and `prefers-reduced-motion` support.
- **Performance-minded** – the 3D files load only when the section is near the screen, the render loop runs only while the canvas is visible, and the geometry is shared between sections.

---

## Tech Stack

| Area | Tools |
|---|---|
| Framework | React 18, Vite 6 |
| 3D | Three.js (vanilla, with `STLLoader`) |
| Animation | GSAP + ScrollTrigger, Framer Motion |
| UI | Lucide React, canvas-confetti, clsx |
| Language | JavaScript (JSX) |

---

## Getting Started

**Requirements:** Node.js 18 or newer and npm.

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server
npm run dev

# 3. Open the address shown in the terminal (usually http://localhost:5173)
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
│   ├── assets/
│   │   └── images/              # Section artwork (PNG + WebP)
│   ├── cursors/                 # Flower cursor (32px / 64px)
│   └── models/pipkin/           # Pipkin STL parts (9 files)
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
│   │   ├── canvas/                  # Hero / decorative canvases
│   │   ├── Navbar.jsx
│   │   ├── SectionNav.jsx
│   │   └── Hero.jsx
│   ├── data/
│   │   ├── pipkinAssembly.js    # Part positions, rotations, timings, captions
│   │   ├── assets.js            # Central image paths
│   │   ├── projects.js          # Work gallery content
│   │   ├── processStages.js     # Process timeline content
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
| Adjust the assembly positions, order, speed or captions | `src/data/pipkinAssembly.js` |
| Change how the scroll pin works (length, scrub) | `src/components/build/pipkinScene.js` |
| Tweak emote movements or angles | `src/components/play/pipkinRig.js` |
| Change emote text, icons or sounds | `src/data/playEmotes.js` |
| Replace artwork | `public/assets/images/` and `src/data/assets.js` |
| Edit gallery projects | `src/data/projects.js` |
| Change colors, fonts or cursor | `src/styles/variables.css` |

---

## How the 3D Works

- Pipkin is built from **separate STL parts** (body, head, eyes, nose, two arms, two legs). STL files contain no skeleton or hierarchy.
- The **assembly** animates each part's position and rotation from an exploded start to its assembled position, driven by a GSAP ScrollTrigger timeline.
- The **emotes are procedural**, not a skinned rig. The rig groups the parts under pivots (hip, neck, shoulders) whose positions are calculated from the real geometry. Parts rotate around those pivots, and the legs stay planted.

---

## Known Limitations

- The arm and leg positions on the body are **estimated**, because the STL files don't store how the pieces attach. If you see a gap, adjust the values in `src/data/pipkinAssembly.js`.
- The 3D parts total about 15 MB. Converting them to one compressed GLB would load faster.
- Because the emotes rotate rigid parts, the shoulders don't deform.

---

## Deployment

```bash
npm run build
```

Upload the generated `dist/` folder to any static host (Vercel, Netlify, Cloudflare Pages, GitHub Pages). Set the build command to `npm run build` and the output directory to `dist`.

---

## Credits

- **Character & artwork:** <!-- your name / team -->
- **3D model parts and images:** supplied by the project author
- Built with [React](https://react.dev), [Three.js](https://threejs.org), [GSAP](https://gsap.com) and [Vite](https://vitejs.dev)

## License

<!-- Choose a license (for example MIT) and add a LICENSE file. -->
