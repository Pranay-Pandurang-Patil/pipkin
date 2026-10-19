import { ASSETS } from './assets';

export const PROJECTS_DATA = [
  {
    id: "interactive-3d",
    title: "Interactive 3D",
    subtitle: "The Whispering Glade",
    category: "Real-time WebGL Experience",
    tags: ["Three.js", "GLSL Shaders", "Blender", "Stylized"],
    image: ASSETS.interactive3d,
    imageFallback: ASSETS.interactive3dWebp,
    shortDesc: "A real-time interactive 3D floating island with responsive flora, crystal waterfalls, and particle fireflies running at 60 FPS in browser.",
    fullDescription: "The Whispering Glade is a real-time WebGL interactive vignette designed to test stylized NPR (non-photorealistic rendering) techniques in browser viewports. Featuring custom GLSL wind shaders that rustle clover canopies, depth-based waterfall transparency, and an interactive celestial clock that transitions from golden hour to dusk as users drag their cursor.",
    highlights: [
      "Custom vertex-displacement wind shader for foliage",
      "Dynamic day-to-night lighting with real-time reflections",
      "Optimized low-draw-call topology under 35k polygons",
      "Interactive orbit controls with gentle inertia smoothing"
    ],
    software: ["Blender 4.2", "Three.js", "React Three Fiber", "Substance 3D Painter"],
    stats: {
      triangles: "32,450",
      drawCalls: "14",
      textureSize: "2048px Stylized Atlases",
      fps: "60 FPS Stable"
    }
  },
  {
    id: "environments",
    title: "Environments",
    subtitle: "Sunset Cottage & Cloud Meadow",
    category: "3D Stylized Diorama",
    tags: ["Blender", "Octane Render", "Lighting", "Environment Art"],
    image: ASSETS.environments,
    imageFallback: ASSETS.environmentsWebp,
    shortDesc: "A warm, storybook environment study featuring hand-painted tiles, wildflower cascades, and twilight atmosphere.",
    fullDescription: "Sunset Cottage is the home world of Pipkin, built with an emphasis on cozy storytelling, organic silhouette design, and rich twilight color temperatures. Every stone pathway, lantern glow, and flower-thatched roof tile was modeled to evoke the warmth of classic storybook illustrations combined with modern 3D depth.",
    highlights: [
      "Hand-sculpted cobblestone pathways with modular assets",
      "Atmospheric volumetric mist catching the setting sun",
      "Layered foliage scattering with procedural color variation",
      "Cinematic camera composition inspired by European countryside folklore"
    ],
    software: ["Blender", "Substance Designer", "Photoshop", "Octane Render"],
    stats: {
      assetsCreated: "48 Unique Props",
      lightingSetup: "Volumetric Twilight HDRI + 6 Accent Warm Spotlights",
      renderTime: "8m 20s (4K Final)",
      materials: "Hand-painted PBR Stylized"
    }
  },
  {
    id: "animations",
    title: "Animations",
    subtitle: "Pipkin's Morning Leap",
    category: "Character Rigging & Keyframe Animation",
    tags: ["Rigging", "Keyframe Animation", "Squash & Stretch", "Acting"],
    image: ASSETS.animations,
    imageFallback: ASSETS.animationsWebp,
    shortDesc: "Character acting and locomotion test showcasing Pipkin's whimsical personality, dynamic tail physics, and bouncy gait.",
    fullDescription: "A full character locomotion and acting cycle exploring personality-driven movement. Pipkin's proportions require exaggerated squash-and-stretch arcs, springy hair and mane physics, and micro-expressions in the ears and eyes to convey curiosity and gentle wonder with every hop.",
    highlights: [
      "Custom feature-complete FK/IK bone rig with bendy bones for spine and tail",
      "Secondary dynamic simulations for mane curls and star pendant",
      "Expression library with 24 blend shapes for emotional range",
      "Fluid 24fps hand-keyed animation with crisp Disney-inspired timing"
    ],
    software: ["Blender Rigify Custom", "Keyframe Graph Editor", "DaVinci Resolve"],
    stats: {
      keyframes: "320 Frames",
      bonesInRig: "76 Deform Bones",
      blendShapes: "24 Face Expressions",
      frameRate: "24 FPS Animation"
    }
  }
];
