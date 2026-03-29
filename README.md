# Radhouan Terchella — AI / Full-Stack Developer Portfolio

A premium, glassmorphic developer portfolio built with **Astro**, **React**, and **Tailwind CSS v4**. Features an interactive AI-themed particle network, a CLI terminal, and a fully data-driven architecture.

🔗 **Live:** [radhouan.netlify.app](https://radhouan.netlify.app)

---

## ✨ Features

- **Interactive Particle Background** — A full-screen Canvas-based neural network that reacts to mouse movement
- **Embedded CLI Terminal** — An interactive command-line interface in the hero section (also accessible via `Cmd+K`)
- **Bento Box Skills Grid** — Asymmetric glassmorphic cards showcasing technical competencies
- **Glowing Data-Flow Timeline** — Animated gradient lines connecting experience and education entries
- **Glassmorphism Design** — Frosted-glass containers with backdrop blur throughout
- **Dark Mode** — Full dark/light theme toggle with smooth transitions
- **Data-Driven** — All content powered by JSON and Markdown, zero hardcoded UI strings

## 🛠 Tech Stack

| Layer        | Technology                  |
| ------------ | --------------------------- |
| Framework    | Astro 5                     |
| UI           | React 19                    |
| Styling      | Tailwind CSS v4             |
| Data         | JSON + Astro Content Collections |
| Deployment   | Netlify (Static)            |

## 📂 Project Structure

```
src/
├── components/         # Astro + React components
│   ├── NetworkBackground.jsx   # Canvas particle animation
│   ├── InteractiveTerminal.jsx # CLI interface
│   ├── InteractiveList.jsx     # Timeline with data-flow lines
│   ├── ProjectsGrid.jsx       # Filterable project cards
│   └── ...
├── content/            # Markdown collections
│   ├── blog/           # Blog posts (by category)
│   └── projects/       # Project case studies
├── data/
│   ├── portfolio.json  # Structured resume data
│   └── details.json    # UI config, skill icons, labels
├── pages/              # Astro page routes
├── layouts/            # Page layouts
└── styles/
    └── global.css      # Theme tokens & Tailwind config
```

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📝 Updating Content

- **Resume data** → Edit `src/data/portfolio.json`
- **UI labels, icons, emojis** → Edit `src/data/details.json`
- **Blog posts** → Add `.md` files to `src/content/blog/<category>/`
- **Projects** → Add `.md` files to `src/content/projects/`

## 📄 License

MIT
