---
title: "Building My AI-Themed Portfolio: A Deep Dive into the Architecture"
description: "How I built a glassmorphic, AI-themed developer portfolio using Astro, React, and a hybrid data-driven architecture with interactive particle animations."
pubDate: "Mar 29 2026"
tags: ["Architecture", "Astro", "React", "Portfolio", "AI"]
heroImage: ""
---

Every developer needs a portfolio, but I wanted mine to feel like stepping into a futuristic command center. Here's the technical breakdown of how I built this site — from the interactive particle network to the data-driven content system.

## The Vision

I wanted a site that immediately communicates **"AI / ML Developer"** without saying a word. That meant:

- A living, breathing background that feels like a neural network
- A functional CLI terminal front-and-center — not just decoration
- Premium glassmorphism that layers content over the particle canvas
- Everything powered by data files, so updating my resume updates the entire site

## Tech Stack

- **Astro 5** — Static-first framework that ships zero JavaScript by default, but lets me island-hydrate React components exactly where interactivity is needed.
- **React 19** — Powers the heavy interactive pieces: the terminal, the project grid, the timeline, and the particle canvas.
- **Tailwind CSS v4** — The new CSS-first configuration made building the glassmorphic design system incredibly fast, each section uses `backdrop-blur`, translucent backgrounds, and layered borders.

## The Particle Network

The hero background isn't a video or a GIF — it's a live **HTML5 Canvas** animation rendered via a React component (`NetworkBackground.jsx`). Here's how it works:

1. **Particle Generation** — On mount, the canvas spawns particles proportional to the viewport area (`width × height / 4000`), ensuring consistent density on any screen.
2. **Constellation Lines** — Every frame, particles within 130px of each other are connected by fading cyan lines, creating the "neural network" effect.
3. **Mouse Repulsion** — Particles within 150px of the cursor are pushed away using force vectors, making the network feel alive and reactive.
4. **Global Fixed Layer** — The canvas is positioned `fixed` behind all content at `z-index: -10`, so as you scroll, the particles seamlessly flow behind every section.
5. **ResizeObserver** — Instead of listening to `window.resize`, the component uses a `ResizeObserver` for accurate dimensions, especially important for Astro's `<astro-island>` hydration wrappers.

## The "Three Brains" Data System

Instead of choosing one data format, I use three, each for what it does best:

### 1. `portfolio.json` — Structured Resume Data
Contains work history, education, skills, social links, and personal info. The CLI terminal reads this directly to power commands like `help`, `skills`, and `about`.

### 2. `details.json` — UI Configuration
Every emoji, section title, navigation label, footer text, and skill icon mapping lives here. This means I can rebrand the entire site's copy without touching a single `.astro` file.

### 3. Markdown Collections (`src/content/`)
Blog posts and project case studies use Astro's Content Collections with frontmatter schemas. This gives me:
- Automatic type-checking on frontmatter fields
- Category-based routing (`/blog/coding/`, `/blog/it/`)
- `featured: true` flags that control what appears on the homepage

## The Embedded Terminal

The `InteractiveTerminal.jsx` component isn't just eye candy — it's a fully functional CLI that supports:

- **`help`** — Lists all available commands
- **`about`** — Displays bio from `portfolio.json`
- **`skills`** — Renders categorized skill lists
- **`projects`** — Shows project summaries with links
- **`clear`** — Resets the terminal history

It's embedded in the hero section on desktop, and globally accessible via `Cmd+K` (Mac) / `Ctrl+K` (Windows) as a modal overlay through the `CommandPalette.jsx` component.

## Glassmorphism Layer System

The visual depth comes from three carefully layered elements:

1. **Background** — The fixed particle canvas at `-z-10`
2. **Section Frosting** — Each section has a semi-transparent background (`bg-white/80 dark:bg-[#050b14]/80`) with `backdrop-blur-md`, creating the frosted glass effect over the particles
3. **Content Cards** — Individual cards (skills, projects, blog posts) add another layer of `backdrop-blur-xl` with translucent borders

This three-layer approach means the particles are always subtly visible, but never compete with the content for attention.

## Performance

Despite the heavy visual effects, the site scores well on Lighthouse because:

- Astro ships **zero JS** for static sections (footer, headers, text)
- React components use `client:load` or `client:visible` directives, so the particle canvas and terminal only hydrate when needed
- The canvas animation uses `requestAnimationFrame` for 60fps rendering without layout thrashing
- All fonts are self-hosted WOFFs with `font-display: swap`

## Conclusion

This portfolio is a living showcase of my approach to software engineering: **data-driven architecture, interactive design, and performance-first thinking.**

Check it out live at [radhouan.netlify.app](https://radhouan.netlify.app) 🚀
