---
title: "Building a Hybrid Portfolio: Behind the Architecture"
description: "A deep dive into how I built this site using Astro, React, and a hybrid JSON/Markdown data system for enterprise-grade scalability."
pubDate: "Jan 26 2026"
tags: ["Architecture", "Astro", "React", "Portfolio"]
heroImage: ""
---

Welcome to the technical breakdown of my portfolio! Most personal sites are either static landing pages or overly complex apps. For this project, I wanted to find the "Goldilocks Zone": a site that is lightning-fast, easy to update, and showcases both my **Software Engineering** skills.

## The Tech Stack

I chose tools that prioritize performance and modern developer experience:

- **Astro**: The backbone. It generates static HTML for speed but allows me to pull in dynamic components only where needed.
- **React**: Powers the complex interactive parts, like the **Command Line Terminal** and the **Searchable Project Grid**.
- **Tailwind CSS v4**: Provides the sleek, glassmorphic design language you see across the site.

## The "Two Brains" System

One of the unique features of this site is how it handles data. I didn't want to choose between a simple JSON file and heavy Markdown collections, so I used both:

1.  **Markdown (`src/content/`)**: Used for long-form content like this blog post and detailed project case studies. This is great for SEO and readability.
2.  **JSON (`portfolio.json`)**: Used as a central registry for the Terminal. When you type `projects` in the CLI, it reads this JSON to provide instant, structured data without jumping between files.

## Smart Navigation

Good architecture isn't just about code; it's about the user flow. I implemented:

- **Category Routing**: Blogs and Projects are automatically grouped into "IT" vs. "Coding."
- **Featured Toggles**: A simple `featured: true` flag in my project frontmatter determines what makes it to the homepage.
- **Related Content**: At the bottom of every project page, the system suggests relevant "Next Reads" based on the category you're currently exploring.

## Conclusion

This portfolio serves as a living example of my approach to systems engineering: **Modular, data-driven, and focused on the end-user experience.**

Feel free to check out on [Live URL](https://radhouan.netlify.app) to see how these pieces come together! 🚀🔐🛠️
