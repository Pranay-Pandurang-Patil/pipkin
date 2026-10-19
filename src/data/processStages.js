export const PROCESS_STAGES = [
  {
    id: "sketch",
    step: "01",
    label: "Sketch",
    icon: "Pencil",
    color: "#f97316",
    summary: "Visual discovery, silhouette exploration, and gesture studies.",
    description: "Every character begins on paper with rough geometric thumb-sketches. We explore proportions, eye shape, ear tilts, and expressive body language to establish Pipkin's warm, approachable silhouette.",
    tools: ["Procreate", "Pencil on Paper", "PureRef Moodboards"],
    deliverable: "Character Model Sheet & Turnaround Sketches",
    stageQuote: "Finding the soul in simple, rounded pencil curves."
  },
  {
    id: "model",
    step: "02",
    label: "Model",
    icon: "Box",
    color: "#3b82f6",
    summary: "Sub-D poly modeling, edge-flow topology, and organic forms.",
    description: "Transforming 2D sketches into a clean, animation-ready 3D mesh. We build tidy quad edge-loops around the muzzle, eyes, and joints to prepare the mesh for deformation and expressive stretching.",
    tools: ["Blender 4.2", "Subdivision Surface", "RetopoFlow"],
    deliverable: "Clean Quad Topology Mesh (18,400 polys)",
    stageQuote: "Every edge loop serves emotion and motion."
  },
  {
    id: "texture",
    step: "03",
    label: "Texture",
    icon: "Palette",
    color: "#ec4899",
    summary: "Hand-painted color gradients, custom NPR shaders, and gentle blush.",
    description: "Applying a whimsical pastel palette with hand-painted stylized textures. We create custom velvet rim-lighting shaders and subtle subsurface scattering that mimics ceramic storybook figurines.",
    tools: ["Substance 3D Painter", "Blender Shader Nodes", "Photoshop"],
    deliverable: "PBR Texture Sets (BaseColor, Roughness, Normal, Emissive)",
    stageQuote: "Soft pastel blush, golden stardust, and velvety fur tones."
  },
  {
    id: "animate",
    step: "04",
    label: "Animate",
    icon: "Activity",
    color: "#8b5cf6",
    summary: "Armature rigging, bendy bones, keyframing, and secondary physics.",
    description: "Bringing Pipkin to life with custom IK/FK controllers, bendy bone spines, and animated facial blendshapes. Secondary wiggle physics give the mane and tail believable whimsical momentum.",
    tools: ["Blender Rigify", "Shape Key Drivers", "Graph Curve Editor"],
    deliverable: "Locomotion Library, Emote Cycles, Jump Loops",
    stageQuote: "Adding weight, anticipation, and that little extra bounce."
  },
  {
    id: "polish",
    step: "05",
    label: "Polish",
    icon: "Sparkles",
    color: "#eab308",
    summary: "Atmospheric volumetric lighting, particle stardust, and final color grade.",
    description: "The final touch where everything converges. We position warm rim lights to separate the silhouette from the background, add floating stardust particles, and run final color grading in ACES color space.",
    tools: ["Cycles / Octane Render", "Blender Compositor", "DaVinci Resolve"],
    deliverable: "High-Resolution Render Portfolio & Interactive WebGL Assets",
    stageQuote: "The golden hour glow that makes the magic real."
  }
];
