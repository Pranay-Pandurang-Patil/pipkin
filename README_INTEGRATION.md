# Pipkin assembly integration
- Section: src/components/sections/BuiltWithWonder.jsx (pinned stage = the 3D viewport). Scene/animation: src/components/build/pipkinScene.js (vanilla three + GSAP ScrollTrigger).
- Assembly config (from Little Wonder, unchanged except asset path): src/data/pipkinAssembly.js. Assets: public/models/pipkin/*.stl (9 files, ~15 MB, lazy-loaded).
- New dependency: gsap. Run `npm install` to update node_modules and package-lock.json.
- Removed: AssemblyModal, Interactive3DViewer (placeholder procedural model), WonderStarsCanvas, the old preview card / layer tabs / "Watch Assembly" button.
- Limits: arm/leg seats are estimated (see ASSET_INVENTORY in Little Wonder). Not run in a browser or built in the authoring environment.

## Play emotes (procedural, pivot-based — the STL parts have no skeleton)
- src/components/play/pipkinRig.js: hierarchy root > legs (planted) / torso@hip > body, neck@neck > head+eyes+nose, shoulders > arms. Pivots are computed at load from the geometry (hip = body's lowest slab, neck = head's lowest slab, shoulders = arms' highest slab).
- Emotes: wave, nod, dance, collect, explore (GSAP timelines). A new emote kills the current one, eases to the rest pose, then plays; every emote ends with an exact snap to the assembled pose.
- src/components/play/PipkinPlayStage.jsx: lazy canvas (created near viewport, render loop only while visible). Geometry is shared with the Build section via build/pipkinGeometry.js.
- Fixed: Meet/Process `<source … .webp>` tags pointed at files that don't exist, which made those images show as broken.
