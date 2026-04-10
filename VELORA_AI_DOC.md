# VELORA: Luxury Modular Kitchens — Site Architecture & Aesthetic Overview

*This document serves as a comprehensive "mental map" of the VELORA website, designed to perfectly communicate the visual aesthetic, component architecture, and interaction models of the site to any LLM.*

---

## 1. Technical Stack & Foundation
- **Core Framework:** React 19 + Vite
- **Styling:** Tailwind CSS v4 (using CSS native layers, Custom properties via `@theme`).
- **Animation & Physics:** Framer Motion (page/layout transitions and UI interactions), GSAP + ScrollTrigger (scroll-linked animations).
- **3D Rendering:** React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `three`) for real-time WebGL interactive backgrounds.
- **Scroll Hijacking:** Lenis Smooth Scroll for buttery software-rendered scrolling.

---

## 2. Global Design System (Tokens)

> [!TIP]
> The site uses extremely refined, minimal tokens strictly referencing high-end editorial and architecture magazines (like Kinfolk or Architectural Digest).

### Color Palette
- **Deep Backgrounds:** `velora-black` (#1A1A1A), `velora-charcoal` (#2D2D2D)
- **Primary Text & Light Backgrounds:** `velora-cream` (#FAF8F5)
- **Accents:** `velora-gold` (#C9A96E) — Used sparingly for borders, active states, and micro-typography.

### Typography Hierarchy
- **Headings (H1/H2):** `Cormorant Garamond` or `Georgia`. Always styled with `font-light`, massive font sizes, and tight tracking/line-height (`leading-[1.05]`).
- **Body & Labels:** `Inter` or `Helvetica Neue`. Small font sizes (`text-xs` or `text-sm`), often heavily tracking/spaced out (`tracking-[0.2em]`, `tracking-[0.5em]`) and strictly uppercase for eyebrow labels.

### Common Aesthetic Motifs
- **Grain & Texture:** A subtle `SVGFE turbulence` noise overlay applied globally to give a physical, cinematic "film" look.
- **Glassmorphism:** Frosted UI elements featuring `backdrop-blur-3xl`, `bg-black/20`, and ultra-thin `border-white/10` borders.
- **Micro-interactions:** Custom button components with slow, 500ms `transition-all` delays moving from transparent borders to solid gold fills.

---

## 3. Section-by-Section Anatomy

### I. The Hero Sequence (`HeroSection.jsx` + `AbstractKitchenScene.jsx`)
- **Visuals:** Entirely powered by a 3D WebGL Canvas. It features abstract, floating geometric slabs representing premium materials (Dark polished stone, charcoal cabinetry, rich walnut wood, and a gleaming gold spherical hardware piece).
- **Lighting:** Moody, cinematic studio lighting with complex `ContactShadows` and high-reflection metalness parameters.
- **UI:** Hovering centrally over the 3D scene is a translucent Glassmorphic card containing staggered letter-by-letter reveals of "Crafted Kitchens. Designed for Life."
- **Interaction:** The 3D scene organically pans and tilts based on mouse cursor parallax.

### II. Brand Statement & Quote (`BrandStatement.jsx`)
- **Visuals:** A serene, ultra-minimalist `velora-cream` background.
- **Content:** Features a highly tracked elegant quote: *"A kitchen is not just a room. It is where life unfolds."*
- **Interaction:** Lines of text fade up and in via GSAP `ScrollTrigger`. A thin gold decorative horizontal line smoothly scales from 0 to 100% width upon scroll intersection.

### III. Scroll Experience / Features (`ScrollSequence.jsx`)
Takes the user through different modules of kitchen superiority.
1. **Layouts (Alternating Grid):** Large aspect-ratio imagery paired with text. Images slowly scale up (`scale-110` over 1.5s) on hover.
2. **Premium Materials:** A dark-themed section with image grids highlighting Granite, Wood, and Quartz.
3. **Smart Storage (Hover Cards):** Interactive white luxury cards detailing soft-close drawers and pantries. Hovering reveals a subtle gold arrow indicator sliding into view.

### IV. Interactive Customizer (`CustomizerPanel.jsx`)
- **Layout:** A split-screen UI on desktop.
- **Left:** A massive 4:3 dynamically updating preview image of a kitchen. 
- **Right:** Highly interactive configuration controls. Uses circular color swatches (Cloud White, Iron Charcoal, etc.) for cabinets, and image-based buttons for countertops.
- **Interaction:** Switching a color/finish cross-fades the preview image and applies CSS blend modes to simulate material changes without needing full 3D renders.

### V. Portfolio Masonry Grid (`PortfolioGrid.jsx`)
- **Layout:** A 2-column masonry staggered grid.
- **Visuals:** Cards have alternating aspect ratios (`aspect-[3/4]` and `aspect-[4/3]`) with absolute positioning perfectly mapped so images fill their grid cells entirely. 
- **Interaction:** On hover (desktop), a dark gradient (`from-[#1a1a1a]/95`) overlays the image, while project text gracefully slides up from the bottom edge (`translate-y-6` to `translate-y-0`).

### VI. Lead Capture / Consultation (`LeadCapture.jsx`)
- **Layout:** Split layout over a massive, dark `velora-black` background with an incredibly subtle (5% opacity) kitchen background structure.
- **Form UI:** The definition of stealth-wealth web design. Standard form inputs are discarded for invisible `<input>` tags featuring only a single gold underline that animates to 100% width dynamically onto `onChange / onFocus`.
- **Submission:** Submitting the form smoothly hides the fields using Framer Motion and reveals a bouncing, animated SVG tick mark verifying the scheduled design consultation.

### VII. Floating Elements (`Navbar.jsx` & `ChatBot.jsx`)
- **Navbar:** Sticky, changes from transparent to a dark frosted glass box once the user scrolls past 80px. Features a custom animated SVG hamburger menu.
- **ChatBot:** A floating, gold minimalist bubble in the bottom right. When opened, it reveals a bespoke AI Interface specifically programmed as a "Velora Architectural AI Designer" to help clients choose layouts and materials.
