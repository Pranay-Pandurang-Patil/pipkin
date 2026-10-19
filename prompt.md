# Project: Pipkin — A Whimsical 3D Character Portfolio

Act as a senior creative frontend developer, UI/UX designer, and interactive 3D web experience engineer. Build a complete, polished, responsive portfolio website inspired by the supplied Pipkin wireframe.

The website should feel like an enchanting animated storybook: dreamy pastel colors, a magical fantasy environment, soft lighting, elegant typography, organic section transitions, charming interactions, and a premium 3D character-art aesthetic.

**Do not merely describe the implementation or generate a mockup. Inspect the existing project, create and modify the necessary files, run the application, and verify the result in the browser if browser tooling is available.**

## 1. Primary asset — hero background

Use this exact image as the primary hero background:

`hero-bg.png`

This image depicts a magical fantasy landscape with a flower-covered cottage on the left, cascading waterfalls, stone pathways, pink flowers, distant mountains, floating lights, and a warm lavender-pink sunset.

IMPORTANT:
- Use the provided image as the actual hero background, not a substitute generated image.
- Do not crop away the cottage, the central waterfalls, or the warm sunset unnecessarily.
- Use `background-size: cover` with an appropriate `background-position`, and adjust the positioning for different screen sizes.
- Apply a subtle, translucent gradient overlay only when needed for text readability.
- Preserve the image's original colors and visual quality.
- Do not stretch or distort the image.
- Treat this image as the foundational visual asset for the first screen.
- If the asset is missing, report the missing path rather than silently substituting another image.

## 2. Technology stack

Use the existing project stack if it is already configured. Otherwise, use:

- React with Vite
- JavaScript and JSX
- CSS Modules or a well-organized global CSS architecture
- Framer Motion, or the current Motion library, for animations
- Lucide React for interface icons
- Three.js with React Three Fiber and Drei for optional interactive 3D content

Do not add unnecessary dependencies. The website must work even if no 3D character model is available yet.

## 3. Overall design and layout

Recreate the visual language of the supplied Pipkin portfolio wireframe.

Desktop:
- Use a split-screen composition.
- The left approximately 48% of the viewport contains a full-height, sticky hero.
- The right approximately 52% contains the vertically scrollable portfolio sections.
- Use organic, flowing section boundaries and soft curved transitions where practical.
- Keep the layout spacious, editorial, cinematic, and visually balanced.
- Add a slim, vertically aligned section-navigation rail on the right.
- Ensure the navigation never obscures important content.

Mobile:
- Convert the layout into a normal, vertically scrolling single-column page.
- Make the hero full-width and visually immersive.
- Move the navigation into a compact mobile menu.
- Hide the desktop-only fixed section rail.
- Prevent horizontal overflow.
- Keep headings, buttons, cards, and interactive controls touch-friendly.

## 4. Hero section — first viewport

Build the first screen around the provided `pipkin-hero-bg.png` image.

The image must fill the hero panel. Use a subtle layered gradient to help the text stand out while retaining the fantasy landscape's natural beauty.

Add a transparent navigation bar at the top:
- Logo: “Pipkin✦”
- Home
- About
- Work
- Process
- Play
- Contact
- A pastel pill-shaped “Say Hi ♧” button

Place the introductory text in the lower-left portion of the hero, over a darker and visually calm part of the background.

Text:

Small introductory line:
“Hi, I’m”

Large display heading:
“Pipkin ✿”

Supporting text:
“A 3D character, a creative portfolio, and a little wonder in progress.”

Primary CTA:
“Explore My World ↓”

Secondary CTA:
“Watch Showreel ▷”

Add a small handwritten-style annotation in the upper-right area:
“A little wonder in a big world ♡”

Add a bottom-left scroll indicator:
“↓ Scroll to begin”

Typography:
- Use an elegant editorial serif such as Playfair Display for large headings.
- Use DM Sans for body text and interface labels.
- Use a subtle handwritten font only for decorative annotations.
- Use cream-white text, gentle pink accents, and restrained shadows.

The heading “Pipkin” should be large, expressive, and immediately recognizable.

Ensure the text does not obscure the most important elements of the background. Use responsive positioning and adjust the hero composition on smaller screens.

## 5. Section 01 — Built with Wonder

Create a cinematic dark-navy section with small glowing stars and floating 3D sculptural elements.

Heading:
“Built with Wonder”

Supporting text:
“Pipkin comes together piece by piece — a blend of creativity, curiosity and a love for detail.”

Add a button:
“Watch Assembly ▷”

If a real 3D character model is unavailable, use elegant CSS decorations, simple floating shapes, or carefully styled placeholders. Do not pretend that a real 3D model exists when it does not.

Give this section a deep midnight-blue background with subtle stars and soft peach highlights.

## 6. Section 02 — Meet Pipkin

Create a warm cream and blush-pink section with a large character-image area.

Heading:
“Meet Pipkin”

Description:
“A curious little pony who loves creativity, cozy moments and bringing ideas to life.”

Show four rounded personality badges:
- Curious
- Creative
- Kind
- Always Learning

Use small pastel icons and gentle hover animations.

If a Pipkin character render is not available, create a well-designed placeholder area and make it easy to replace with a real transparent PNG, WebP, or 3D render later.

Do not use unrelated stock photographs or unrelated characters.

## 7. Section 03 — My Work

Use a muted lavender background.

Heading:
“My Work”

Description:
“A collection of 3D projects, animations and interactive experiences.”

Create three large, rounded project cards:
1. Interactive 3D
2. Environments
3. Animations

Each card should include:
- A large image or artwork placeholder
- A dark, subtle bottom gradient
- A project title
- A small circular arrow button
- A tasteful hover scale or image-zoom effect

Make the cards clickable and keyboard accessible.

For now, project cards can open a modal or a dedicated project-detail view containing a description, artwork area, and a close button.

Keep project content in a reusable data array so new projects can be added easily.

## 8. Section 04 — Process

Create a peach-colored section with a visual studio-workspace aesthetic.

Heading:
“Process”

Supporting text:
“From inspiration to final render — a peek behind the magic.”

Create a horizontal five-stage process timeline:

Sketch → Model → Texture → Animate → Polish

Each stage should have a circular icon and a short label.

Animate the progress indicator subtly as the user scrolls. On mobile, allow the stages to wrap or switch to a vertical timeline.

Use a studio-artwork placeholder on one side, leaving room for future sketches, Blender screenshots, and behind-the-scenes renders.

## 9. Section 05 — Play Together

Create a soft sage-green and pastel-pink section with a playful character-art area.

Heading:
“Play Together”

Description:
“Interact with Pipkin! Try the emotes, explore the workshop, and find hidden surprises.”

Add interactive buttons:
- Wave
- Nod
- Dance
- Collect
- Explore

These buttons must actually respond to clicks. Display a changing message, animation, or visual state for each action.

If no rigged character model exists, use lightweight animated illustrations, CSS motion, or an expressive message area. Structure the interaction code so that real character animations can be added later.

Include a few restrained floating butterflies, flowers, or glowing particles.

Respect reduced-motion accessibility settings.

## 10. Section 06 — Let's Create Together

Create a cinematic sunset footer section.

Heading:
“Let's Create Together”

Description:
“Have a project, an idea or just want to say hi? I'd love to hear from you!”

Add a CTA:
“Get in Touch →”

Use the existing hero landscape or a complementary crop of it as the background, provided the composition remains attractive.

Add a small decorative annotation:
“More wonder ahead… ♡”

The CTA must link to a configurable contact destination. Use a placeholder email address only if a real address has not been provided, and make it obvious where to change it.

Do not build a fake contact form that silently discards submissions.

## 11. Section navigation

Implement a fixed, minimal section navigator on desktop.

It should list:
01 — Build
02 — Meet
03 — Work
04 — Process
05 — Play
06 — Contact

Requirements:
- Clicking an item scrolls smoothly to the corresponding section.
- The active section is visually highlighted.
- Use IntersectionObserver or an equivalent efficient technique to detect the visible section.
- Add subtle connecting-line styling.
- Ensure keyboard accessibility.
- Hide or replace the fixed rail on small screens.

## 12. Animation and interaction direction

Use motion sparingly and intentionally.

Implement:
- A gentle hero text entrance animation.
- Slow floating decorative elements.
- Scroll-triggered section reveals.
- Subtle card hover effects.
- Smooth scrolling.
- Animated timeline progress.
- Interactive Play Together buttons.
- A working responsive navigation menu.
- A working project modal or detail view.
- A restrained star-particle effect in the dark section.

Avoid excessive motion, long blocking animations, distracting cursor trails, and effects that make the page slow.

All important information must remain readable if animations are disabled.

## 13. Asset architecture

Keep assets organized under:

`public/assets/`

Use these anticipated filenames where assets exist:

- `pipkin-hero-bg.png` — provided hero landscape
- `pipkin-character.webp` — character render
- `pipkin-character-closeup.webp` — character close-up
- `pipkin-wonder.webp` — dark assembly artwork
- `pipkin-interactive-3d.webp` — project thumbnail
- `pipkin-environments.webp` — environment thumbnail
- `pipkin-animations.webp` — animation thumbnail
- `pipkin-process.webp` — behind-the-scenes artwork
- `pipkin-play.webp` — playful character artwork

Only the hero background is guaranteed to exist.

For other missing assets:
- Create attractive, consistent placeholders.
- Use a reusable asset configuration.
- Never reference missing files without a fallback.
- Do not use arbitrary external image URLs.
- Do not invent a completed 3D character model.

## 14. Performance and accessibility

Implement:
- Responsive image sizing.
- Lazy loading for below-the-fold images.
- Proper alt text.
- Semantic headings and landmarks.
- Visible keyboard focus states.
- Accessible button labels.
- Appropriate text contrast.
- Reduced-motion support.
- Lightweight CSS-based effects where possible.
- Lazy loading of optional 3D scenes.
- A graceful fallback if WebGL is unavailable.

Avoid rendering large numbers of unnecessary DOM particles.

## 15. Code quality

Build reusable React components, for example:

- `Navbar`
- `Hero`
- `SectionNav`
- `BuiltWithWonder`
- `MeetPipkin`
- `ProjectGallery`
- `ProcessTimeline`
- `PlayTogether`
- `ContactFooter`
- `ProjectModal`

Keep the source readable and maintainable.

Store project information and section configuration in data arrays where appropriate.

Use consistent naming and a small set of CSS variables for colors, spacing, typography, and border radii.

Do not put the entire website into one enormous component.

Do not leave the main sections as empty skeletons or implement decorative controls that do nothing.

## 16. Execution and verification

Follow this sequence:

1. Inspect the existing workspace and package configuration.
2. Verify that `public/assets/pipkin-hero-bg.png` exists.
3. Create or update the React application.
4. Implement the desktop layout and all six sections.
5. Implement the responsive mobile layout.
6. Add interactions, scroll navigation, and animations.
7. Start the development server.
8. Open the site in the available browser and inspect the rendered result.
9. Fix layout errors, missing assets, console errors, and horizontal overflow.
10. Test navigation, project modals, and Play Together interactions.
11. Check the mobile layout and reduced-motion behavior.
12. Summarize the files created, commands used, and any remaining assets that need to be supplied.

If browser automation is unavailable, run the available build and lint checks and clearly report which visual tests could not be performed.

## Final quality target

The final result should feel like a professionally art-directed, whimsical 3D character portfolio, not a generic SaaS landing page.

Prioritize:
1. Faithful use of the supplied fantasy landscape in the hero.
2. Strong visual hierarchy and typography.
3. A cohesive pastel fantasy color palette.
4. A polished split-screen desktop layout.
5. Smooth responsive behavior.
6. Functional interactions.
7. Performance and accessibility.

Start implementing the actual website now. Make reasonable design decisions independently, and only ask questions if a genuinely blocking requirement is missing.