# Neobrutalism Design System

A comprehensive guide for implementing the Neobrutalism design style used in roomieVerse. This document provides everything you need to maintain consistency or apply this design system to other projects.

---

## Table of Contents

1. [Design Philosophy](#design-philosophy)
2. [Color Palette](#color-palette)
3. [Typography](#typography)
4. [Borders & Shadows](#borders--shadows)
5. [Components](#components)
6. [Animations & Interactions](#animations--interactions)
7. [Layout System](#layout-system)
8. [Logo & Branding](#logo--branding)
9. [Implementation Guide](#implementation-guide)
10. [Quick Reference](#quick-reference)

---

## Design Philosophy

Neobrutalism (also called Neo-brutalism or Neu-brutalism) is a modern UI design trend that combines:

- **Bold, hard borders** - 2px solid black borders on everything
- **Flat, offset shadows** - No blur, just solid color offset shadows
- **Vibrant colors** - Bright, saturated colors (pastels work great)
- **Intentional "rawness"** - Embracing imperfection and playfulness
- **High contrast** - Black text on light backgrounds
- **Rounded corners** - Softens the brutalist edges (10-14px radius)

### Key Principles

1. **No gradient shadows** - Only solid, offset box shadows
2. **Thick borders everywhere** - 2px black borders are signature
3. **Interactive feedback** - Elements move on hover (shadow disappears, element shifts)
4. **Playful but functional** - Fun design that doesn't sacrifice usability
5. **High readability** - Bold typography with clear hierarchy

---

## Color Palette

### Primary Colors (Blue Scale)

```css
--primary-blue: rgb(147, 197, 253);       /* bg-blue-300 - Main accent */
--primary-blue-dark: rgb(96, 165, 250);   /* bg-blue-400 - Darker accent */
--primary-blue-light: rgb(191, 219, 254); /* bg-blue-200 - Lighter accent */
```

### Background Colors

```css
--background: #ffffff;                     /* Pure white */
--background-sky: rgb(224, 242, 254);     /* bg-sky-100 */
--background-blue: rgb(219, 234, 254);    /* bg-blue-100 */
```

### Accent Colors (for variety)

| Color | Tailwind Class | Usage |
|-------|---------------|-------|
| Pink | `bg-pink-200`, `bg-pink-300` | CTAs, highlights |
| Purple | `bg-purple-200`, `bg-purple-400` | Accents, gradients |
| Yellow | `bg-yellow-200`, `bg-yellow-300` | Warnings, highlights |
| Green | `bg-green-200`, `bg-green-300` | Success states |

### Text Colors

```css
--text-primary: #000000;                   /* Black - headings */
--text-secondary: rgb(82, 82, 91);        /* text-zinc-600 - body text */
--text-tertiary: rgb(113, 113, 122);      /* text-zinc-500 - muted text */
```

### Gradient Patterns

```css
/* Hero gradients */
background: linear-gradient(to bottom right, from-blue-100, via-purple-50, to-pink-100);

/* Card gradients */
background: linear-gradient(to bottom right, from-blue-300, to-blue-400);

/* Dark footer gradient */
background: linear-gradient(to bottom right, from-black, to-gray-900);
```

---

## Typography

### Font Family

**Google Sans** is the primary font. For projects without access to Google Sans, alternatives include:

- **Inter** (excellent fallback)
- **Manrope** 
- **Outfit**
- System fonts: `-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif`

### Font Weights

| Weight | Usage |
|--------|-------|
| 400 (Regular) | Body text |
| 500 (Medium) | Default body, labels |
| 600 (Semibold) | Emphasized text, nav links |
| 700 (Bold) | Headings, buttons, important text |
| 800 (Extrabold) | Hero text, special emphasis |

### Font Sizes (Responsive)

```css
/* Headings */
h1: clamp(36px, 5vw, 60px);   /* 36px mobile → 60px desktop */
h2: 24px → 30px;
h3: 18px → 20px;

/* Body */
body: 14px;
small: 12px → 14px;
```

### Typography Hierarchy Example

```html
<!-- Hero heading -->
<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
  Main Heading
</h1>

<!-- Section heading -->
<h2 class="text-3xl sm:text-4xl md:text-5xl font-bold uppercase">
  Section Title
</h2>

<!-- Card heading -->
<h3 class="text-xl sm:text-2xl font-bold">
  Card Title
</h3>

<!-- Body text -->
<p class="text-lg font-medium text-zinc-600">
  Description text goes here.
</p>
```

---

## Borders & Shadows

### The Neobrutalism Signature

The most distinctive feature of Neobrutalism is the **2px solid black border** combined with **offset box shadows**.

### Border Styles

```css
/* Standard border */
border: 2px solid #000000;
border-radius: 10px; /* or 12px, 14px */

/* Tailwind */
border-2 border-black rounded-xl
```

### Shadow Styles

```css
/* Primary shadow (larger) */
--shadow-primary: 5px 6px 0px -1px #000000;

/* Secondary shadow (smaller) */
--shadow-secondary: 3px 3px 0px -1px #000000;

/* Opposite direction (for variety) */
--shadow-secondary-opposite: -3px 3px 0px -1px #000000;

/* Tailwind custom */
shadow-[3px_3px_0_0_#000]
shadow-[4px_4px_0_#000]
shadow-[5px_6px_0_-1px_#000]
```

### Interactive Shadow Pattern

The signature hover effect removes the shadow and translates the element:

```css
/* Default state */
.element {
  box-shadow: 3px 3px 0 0 #000;
  transform: translate(0, 0);
  transition: all 0.15s ease;
}

/* Hover state */
.element:hover {
  box-shadow: none;
  transform: translate(3px, 3px);
}
```

---

## Components

### Buttons

#### Primary Button

```html
<button class="
  bg-blue-300
  text-black
  font-bold
  px-8 py-4
  rounded-xl
  border-2 border-black
  shadow-[3px_3px_0_0_#000]
  transition-all duration-150
  hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
">
  Primary Action
</button>
```

#### Secondary Button

```html
<button class="
  bg-white
  text-black
  font-semibold
  px-8 py-4
  rounded-xl
  border-2 border-black
  shadow-[3px_3px_0_0_#000]
  transition-all duration-150
  hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none
  hover:bg-gray-50
">
  Secondary Action
</button>
```

#### Social Login Button

```html
<button class="
  flex items-center justify-center gap-3
  bg-white
  px-4 py-3
  rounded-xl
  border-2 border-black
  font-bold text-sm
  transition-all duration-200
  hover:shadow-[4px_4px_0_#000] hover:-translate-y-0.5
">
  <svg>...</svg>
  Google
</button>
```

### Cards

#### Standard Card

```html
<div class="
  bg-white
  p-8
  rounded-xl
  border-2 border-black
  shadow-[3px_3px_0_-1px_#000]
">
  <div class="text-5xl mb-4">🎯</div>
  <h3 class="text-xl font-bold mb-3">Card Title</h3>
  <p class="text-zinc-600 text-sm">Card description...</p>
</div>
```

#### Colored Card

```html
<div class="
  bg-blue-200
  p-8
  rounded-xl
  border-2 border-black
  shadow-[3px_3px_0_-1px_#000]
  group
">
  <div class="text-5xl mb-4 transition-transform duration-300 group-hover:scale-110">
    🚀
  </div>
  <h3 class="text-xl font-bold">Colored Card</h3>
</div>
```

#### Gradient Card

```html
<div class="
  bg-gradient-to-br from-blue-300 to-blue-400
  p-8 sm:p-12 lg:p-16
  rounded-xl
  border-2 border-black
  shadow-[3px_3px_0_-1px_#000]
  text-center
">
  <h2 class="text-3xl font-black uppercase">CTA Title</h2>
  <p class="text-lg font-bold mt-4">Supporting text</p>
</div>
```

### Form Inputs

```html
<input 
  type="text"
  class="
    w-full
    px-4 py-3
    rounded-xl
    border-2 border-black
    bg-white
    text-base font-medium
    placeholder:text-zinc-400
    transition-all duration-200
    focus:outline-none focus:shadow-[3px_3px_0_#000]
  "
  placeholder="Enter text..."
/>
```

### Toggle/Tab Buttons

```html
<div class="flex rounded-xl border-2 border-black bg-blue-100 p-1">
  <button class="
    flex-1 px-6 py-3 rounded-lg
    text-sm font-bold
    bg-blue-300 border-2 border-black
  ">
    Active Tab
  </button>
  <button class="
    flex-1 px-6 py-3 rounded-lg
    text-sm font-bold
    text-black
  ">
    Inactive Tab
  </button>
</div>
```

### Badges/Tags

```html
<span class="
  inline-block
  px-4 py-2
  rounded-lg
  border-2 border-black
  bg-pink-300
  text-xs font-bold
  shadow-[2px_2px_0_0_#000]
">
  NEW
</span>
```

### Header

```html
<header class="
  sticky top-0 z-50
  bg-white
  border-b-2 border-black
  backdrop-blur-md
">
  <div class="wrapper py-4 md:py-5">
    <div class="flex items-center justify-between">
      <!-- Logo -->
      <Logo />
      
      <!-- Navigation -->
      <nav class="flex items-center gap-4">
        <a href="#" class="text-sm font-medium text-zinc-600 hover:text-black">
          Link
        </a>
        <a href="#" class="btn-primary text-sm">
          CTA Button
        </a>
      </nav>
    </div>
  </div>
</header>
```

### Footer

```html
<footer class="
  border-t-2 border-black
  bg-gradient-to-br from-black to-gray-900
  py-4 md:py-5
  text-white
">
  <div class="wrapper">
    <div class="flex flex-col sm:flex-row items-center justify-between gap-4">
      <img src="/logo.png" alt="Logo" class="h-32 w-auto -my-4" />
      <nav class="flex gap-6 text-sm font-bold">
        <a href="#" class="hover:text-pink-400 hover:scale-110 transition-all">
          Link 1
        </a>
        <a href="#" class="hover:text-blue-300 hover:scale-110 transition-all">
          Link 2
        </a>
      </nav>
    </div>
  </div>
</footer>
```

---

## Animations & Interactions

### Framer Motion Bounce Animation

Used for card transitions and mode switches:

```tsx
import { motion } from "framer-motion";

<motion.div
  key={bounceKey} // Change key to trigger animation
  initial={{ scale: 0.95 }}
  animate={{ scale: 1 }}
  transition={{ 
    type: "spring", 
    stiffness: 400, 
    damping: 15 
  }}
>
  Content
</motion.div>
```

### Logo Hover Animation

Scale + optional rotation with sparkles:

```tsx
<motion.div
  whileHover={{ scale: 1.25 }}
  transition={{ duration: 0.3 }}
>
  <Image src="/logo.png" alt="Logo" />
</motion.div>
```

### Sparkle Effect

Four-point star sparkles on logo hover:

```tsx
const SparkleIcon = ({ x, y, color, delay, scale }) => (
  <motion.svg
    className="pointer-events-none absolute"
    initial={{ opacity: 0, left: x, top: y }}
    animate={{
      opacity: [0, 0.8, 0],
      scale: [0, scale, 0],
      rotate: [75, 100, 120],
    }}
    transition={{ duration: 2.5, repeat: Infinity, delay }}
    width="18"
    height="18"
    viewBox="0 0 21 21"
  >
    <path
      d="M9.82531 0.843845C10.0553 0.215178 10.9446 0.215178 11.1746 0.843845L11.8618 2.72026C12.4006 4.19229 12.3916 6.39157 13.5 7.5C14.6084 8.60843 16.8077 8.59935 18.2797 9.13822L20.1561 9.82534C20.7858 10.0553 20.7858 10.9447 20.1561 11.1747L18.2797 11.8618C16.8077 12.4007 14.6084 12.3916 13.5 13.5C12.3916 14.6084 12.4006 16.8077 11.8618 18.2798L11.1746 20.1562C10.9446 20.7858 10.0553 20.7858 9.82531 20.1562L9.13819 18.2798C8.59932 16.8077 8.60843 14.6084 7.5 13.5C6.39157 12.3916 4.19225 12.4007 2.72023 11.8618L0.843814 11.1747C0.215148 10.9447 0.215148 10.0553 0.843814 9.82534L2.72023 9.13822C4.19225 8.59935 6.39157 8.60843 7.5 7.5C8.60843 6.39157 8.59932 4.19229 9.13819 2.72026L9.82531 0.843845Z"
      fill={color}
    />
  </motion.svg>
);

// Corner positions for "chill" effect
const cornerPositions = [
  { x: "5%", y: "10%" },   // top-left
  { x: "90%", y: "10%" },  // top-right
  { x: "5%", y: "80%" },   // bottom-left
  { x: "90%", y: "80%" },  // bottom-right
];
```

### Hover Transitions

```css
/* Standard hover */
transition-all duration-200

/* Button press effect */
hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none

/* Scale up effect */
hover:scale-110

/* Lift effect */
hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]
```

### CSS Keyframe Animations

```css
/* Float animation for sparkles */
@keyframes floatSparkle {
  0% {
    transform: scale(0.7) translateY(0) rotate(0deg);
    opacity: 1;
  }
  50% {
    transform: scale(1.1) translateY(-12px) rotate(180deg);
    opacity: 0.8;
  }
  100% {
    transform: scale(0.7) translateY(0) rotate(360deg);
    opacity: 1;
  }
}

/* Fade in from bottom */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Marquee scroll */
@keyframes marquee {
  from { transform: translateX(0%); }
  to { transform: translateX(-100%); }
}
```

---

## Layout System

### Wrapper Class

```css
.wrapper {
  max-width: 1280px;
  margin: auto;
  padding: 0 32px;
}

@media (max-width: 768px) {
  .wrapper {
    padding: 0 20px;
  }
}
```

### Section Padding

```css
.section {
  width: 100%;
  padding: 120px 0;
}

@media (max-width: 768px) {
  .section {
    padding: 80px 0;
  }
}
```

### Grid Patterns

```html
<!-- 3-column card grid -->
<div class="grid gap-6 sm:gap-8 md:grid-cols-3">
  <div class="card">...</div>
  <div class="card">...</div>
  <div class="card">...</div>
</div>

<!-- 2-column layout -->
<div class="grid gap-8 lg:grid-cols-2">
  <div>Left content</div>
  <div>Right content</div>
</div>
```

### Background Grid Pattern

```css
.bg-grid {
  background-image: 
    linear-gradient(#00000008 1px, transparent 1px),
    linear-gradient(90deg, #00000008 1px, transparent 1px);
  background-size: 40px 40px;
  background-color: white;
}
```

---

## Logo & Branding

### Logo Sizes

| Context | Height | Class |
|---------|--------|-------|
| Header (main) | 112px | `h-28` |
| Header (smaller) | 80-96px | `h-20` to `h-24` |
| Footer | 128px | `h-32 -my-4` (negative margin) |
| Auth page | 256px | `h-64` |

### Logo Animation Types

1. **HeaderLogo**: Scale only (no rotation) + 4 corner sparkles
2. **AnimatedLogo** (Auth): Scale + random rotation (-5° to +5°) + 12 random sparkles

---

## Implementation Guide

### Setting Up in a New Project

#### 1. Install Dependencies

```bash
npm install framer-motion
npm install tailwindcss postcss autoprefixer
```

#### 2. Configure Tailwind

```js
// tailwind.config.js
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Google Sans', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
}
```

#### 3. Add CSS Variables

Copy the `:root` variables from `globals.css`:

```css
:root {
  --primary-blue: rgb(147, 197, 253);
  --border-color: #000000;
  --shadow-primary: 5px 6px 0px -1px #000000;
  --shadow-secondary: 3px 3px 0px -1px #000000;
  --radius: 0.625rem;
}
```

#### 4. Add Base Component Classes

```css
.btn-primary {
  @apply bg-blue-300 text-black font-bold px-8 py-4 rounded-xl border-2 border-black;
  box-shadow: var(--shadow-secondary);
  transition: all 0.15s ease;
}

.btn-primary:hover {
  transform: translate(3px, 3px);
  box-shadow: none;
}

.card {
  @apply bg-white p-8 rounded-xl border-2 border-black;
  box-shadow: var(--shadow-secondary);
}
```

---

## Quick Reference

### Tailwind Class Patterns

```
/* Neobrutalism essentials */
border-2 border-black
rounded-xl (or rounded-lg)
shadow-[3px_3px_0_0_#000]

/* Hover effect */
hover:translate-x-[3px] hover:translate-y-[3px] hover:shadow-none

/* Alternative hover (lift) */
hover:-translate-y-0.5 hover:shadow-[4px_4px_0_#000]

/* Background colors */
bg-blue-100, bg-blue-200, bg-blue-300
bg-pink-200, bg-pink-300
bg-purple-200, bg-purple-400

/* Text */
font-bold text-black (headings)
font-medium text-zinc-600 (body)
font-semibold (emphasized)

/* Spacing */
p-8 (cards)
px-8 py-4 (buttons)
gap-4, gap-6, gap-8 (grids)
```

### Do's and Don'ts

| ✅ DO | ❌ DON'T |
|-------|----------|
| Use 2px solid black borders | Use gray or thin borders |
| Use offset box shadows | Use blurred shadows |
| Use pastel/bright colors | Use dark muted colors |
| Add hover translate effects | Use scale-only hover |
| Keep high contrast | Use low contrast text |
| Use rounded corners (10-14px) | Use sharp corners or circles |
| Be playful with emojis | Overuse icons |

### Color Combinations That Work

| Card Background | Accent | Use Case |
|----------------|--------|----------|
| `bg-blue-100` | `bg-blue-300` | Default sections |
| `bg-pink-200` | `bg-pink-400` | CTAs, highlights |
| `bg-purple-100` | `bg-purple-400` | Features |
| `bg-white` | `bg-blue-300` | Cards on colored bg |
| `bg-gradient-to-br from-blue-300 to-purple-400` | white | Hero sections |

---

## Special Components

### SparklesText Component

Text with animated sparkles floating around it:

```tsx
import { SparklesText } from "@/components/sparkles-text";

<SparklesText 
  className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold" 
  sparklesCount={15} 
  colors={{ first: "#9E7AFF", second: "#FE8BBB" }}
>
  Your sparkling text here
</SparklesText>
```

**Props:**
- `children`: Text content
- `colors`: `{ first: string, second: string }` - Two alternating sparkle colors
- `sparklesCount`: Number of sparkles (default: 10)
- `className`: Additional CSS classes

### InteractiveGrid Component

Background grid that highlights cells on hover:

```tsx
import InteractiveGrid from "@/components/InteractiveGrid";

<InteractiveGrid className="min-h-screen">
  <div className="relative z-10">
    Your content here
  </div>
</InteractiveGrid>
```

**Customization:**
```tsx
<InteractiveGridPattern 
  width={50}           // Cell width in pixels
  height={50}          // Cell height in pixels
  squares={[40, 25]}   // [horizontal cells, vertical cells]
  className=""
  squaresClassName=""
/>
```

**Styling:**
- Grid lines: `stroke-gray-300/30`
- Hover fill: `fill-blue-300/20`
- Transition: 100ms on hover, 1000ms on leave (smooth fade out)

### HeaderLogo Component

Logo for headers with scale animation and corner sparkles:

```tsx
import HeaderLogo from "@/components/HeaderLogo";

<HeaderLogo className="h-28" />
```

**Features:**
- Scale to 125% on hover
- 4 sparkles at corners (top-left, top-right, bottom-left, bottom-right)
- Staggered delay (0.4s apart) for "chill" effect
- Duration: 2.5s per sparkle cycle
- Colors: Blue (#60A5FA) and Purple (#A78BFA)

### AnimatedLogo Component (Auth Page)

Logo for auth page with rotation and random sparkles:

```tsx
import AnimatedLogo from "@/components/AnimatedLogo";

<AnimatedLogo />
```

**Features:**
- "Welcome to" text above logo
- Scale to 125% on hover
- Random rotation between -5° and +5°
- 12 sparkles at random positions
- Regenerates sparkles every 1.5s
- Duration: 1.5s per sparkle cycle

### Auth Form with Bounce Animation

Form cards that bounce when switching tabs:

```tsx
import { motion } from "framer-motion";

<motion.section 
  key={bounceKey}  // Change this to trigger bounce
  initial={{ scale: 0.95 }}
  animate={{ scale: 1 }}
  transition={{ 
    type: "spring", 
    stiffness: 400, 
    damping: 15
  }}
>
  Form content
</motion.section>
```

**To sync multiple cards:**
```tsx
const [bounceKey, setBounceKey] = useState(0);

const triggerBounce = () => {
  setBounceKey(prev => prev + 1);
};

// Pass bounceKey to all cards that should bounce together
<Card1 bounceKey={bounceKey} onModeChange={triggerBounce} />
<Card2 bounceKey={bounceKey} />
```

---

## Full CSS Variables Reference

```css
:root {
  /* Font Family */
  font-family: "Google Sans", sans-serif;
  
  /* Primary Colors */
  --primary-blue: rgb(147, 197, 253);
  --primary-blue-dark: rgb(96, 165, 250);
  --primary-blue-light: rgb(191, 219, 254);
  
  /* Background Colors */
  --background: #ffffff;
  --background-sky: rgb(224, 242, 254);
  --background-blue: rgb(219, 234, 254);
  
  /* Text Colors */
  --text-primary: #000000;
  --text-secondary: rgb(82, 82, 91);
  --text-tertiary: rgb(113, 113, 122);
  
  /* Border & Shadow */
  --border-color: #000000;
  --shadow-primary: 5px 6px 0px -1px #000000;
  --shadow-secondary: 3px 3px 0px -1px #000000;
  --shadow-secondary-opposite: -3px 3px 0px -1px #000000;
  
  /* Border Radius */
  --radius: 0.625rem;
  --radius-sm: calc(var(--radius) - 4px);
  --radius-md: calc(var(--radius) - 2px);
  --radius-lg: var(--radius);
  --radius-xl: calc(var(--radius) + 4px);
}
```

---

## Page Layout Templates

### Standard Page Structure

```tsx
export default function Page() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b-2 border-black bg-white backdrop-blur-md">
        <div className="wrapper py-4 md:py-5">
          <div className="flex items-center justify-between">
            <HeaderLogo className="h-28" />
            <nav className="flex items-center gap-4">
              <Link href="#" className="text-sm font-medium text-zinc-600 hover:text-black">
                Link
              </Link>
              <Link href="#" className="btn-primary text-sm">
                CTA
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="section border-b-2 border-black bg-gradient-to-br from-blue-100 to-pink-100 py-16 sm:py-24">
        <div className="wrapper text-center">
          <h1 className="mb-6 text-4xl font-bold sm:text-5xl md:text-6xl">
            Hero Title
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-zinc-600">
            Description text
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="#" className="btn-primary">Primary CTA</Link>
            <Link href="#" className="btn-secondary">Secondary CTA</Link>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="section py-16 md:py-20">
        <div className="wrapper">
          <h2 className="mb-12 text-center text-3xl font-bold uppercase sm:text-4xl">
            Section Title
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {/* Cards */}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section bg-blue-100 py-16 md:py-20">
        <div className="wrapper">
          <div className="card bg-gradient-to-br from-blue-300 to-blue-400 p-8 text-center sm:p-12">
            <h2 className="mb-4 text-3xl font-black uppercase">CTA Title</h2>
            <p className="mb-8 text-lg font-bold">Supporting text</p>
            <Link href="#" className="btn-primary">Action</Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t-2 border-black bg-gradient-to-br from-black to-gray-900 py-4 text-white md:py-5">
        <div className="wrapper">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <Image src="/logo.png" className="h-32 w-auto -my-4" />
            <nav className="flex gap-6 text-sm font-bold">
              <Link href="#" className="hover:text-pink-400">Link</Link>
            </nav>
          </div>
        </div>
      </footer>
    </div>
  );
}
```

### Auth Page Layout (Two-Column)

```tsx
export default function AuthPage() {
  return (
    <InteractiveGrid className="flex min-h-screen items-center justify-center p-4 md:p-8">
      <div className="flex w-full max-w-5xl flex-col lg:flex-row gap-6">
        {/* Left Card - Branding */}
        <motion.section 
          key={bounceKey}
          className="card flex-1 bg-gradient-to-br from-blue-200 to-blue-300 p-8 text-center"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <AnimatedLogo />
          <p className="mt-6 text-lg font-medium text-zinc-700">
            Tagline text
          </p>
        </motion.section>

        {/* Right Card - Form */}
        <motion.section 
          key={bounceKey}
          className="card flex-1 bg-white p-8"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400, damping: 15 }}
        >
          <AuthForm />
        </motion.section>
      </div>
    </InteractiveGrid>
  );
}
```

---

## File Structure Reference

```
app/
├── globals.css              # Design system variables & base styles
├── layout.tsx               # Font configuration
├── components/
│   ├── HeaderLogo.tsx       # Logo with scale + corner sparkles
│   ├── AnimatedLogo.tsx     # Logo with rotation + random sparkles
│   ├── sparkles-text.tsx    # Text with sparkle effect
│   ├── InteractiveGrid.tsx  # Background grid with hover effect
│   └── HeroCarousel.tsx     # Carousel component
├── auth/
│   ├── page.tsx             # Auth page layout
│   ├── auth-form.tsx        # Form with bounce animation
│   └── auth-content.tsx     # Wrapper for synced animations
└── [pages]/
    └── page.tsx             # Standard page structure
```

---

## Responsive Breakpoints

| Breakpoint | Prefix | Width |
|------------|--------|-------|
| Mobile | (default) | < 640px |
| Small | `sm:` | ≥ 640px |
| Medium | `md:` | ≥ 768px |
| Large | `lg:` | ≥ 1024px |
| Extra Large | `xl:` | ≥ 1280px |

### Common Responsive Patterns

```html
<!-- Text size scaling -->
<h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl">

<!-- Grid columns -->
<div class="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

<!-- Padding scaling -->
<section class="py-16 sm:py-20 md:py-24">

<!-- Show/hide on mobile -->
<span class="hidden sm:block">Desktop only</span>
<span class="sm:hidden">Mobile only</span>

<!-- Flex direction -->
<div class="flex flex-col sm:flex-row gap-4">
```

---

## Accessibility Considerations

### Reduced Motion

The design system respects user preferences for reduced motion:

```css
@media (prefers-reduced-motion: reduce) {
  *,
  *::before,
  *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}
```

### Focus States

Ensure all interactive elements have visible focus states:

```css
input:focus {
  outline: none;
  box-shadow: 3px 3px 0 #000;
}

button:focus-visible {
  outline: 2px solid #000;
  outline-offset: 2px;
}
```

### Color Contrast

- All text meets WCAG AA standards
- Black text (#000) on pastel backgrounds ensures high contrast
- Avoid using color alone to convey information

---

## Credits & Resources

- **Design Style**: Neobrutalism / Neo-brutalism
- **Inspiration**: [Gumroad](https://gumroad.com), [Figma Community](https://figma.com)
- **Animation Library**: [Framer Motion](https://framer.com/motion)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com)

---

*Last updated: November 2025*
*Version: 1.0*
