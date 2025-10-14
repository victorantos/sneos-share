# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

SNEOS Share is a VuePress-based static site for sharing and comparing AI model responses. The site is hosted at https://share.sneos.com and automatically deploys to Azure Static Web Apps on pushes to the main branch.

**Tech Stack:**
- VuePress 2.0.0-rc.13 with VuePress Theme Hope 2.0.0-rc.48
- Vue 3.4.27
- Vite bundler
- Node.js >=18.0.0

## Development Commands

```bash
# Install dependencies
npm install

# Start development server with hot reload
npm run docs:dev

# Start dev server with clean cache (use when config changes aren't reflecting)
npm run docs:clean-dev

# Production build (outputs to dist/)
npm run docs:build
npm run build  # alias for docs:build

# Update VuePress packages
npm run docs:update-package
```

## Architecture

### Content Structure

The site consists of two main content types:

1. **AI Comparisons** (`docs/compare/`)
   - Individual markdown files with AI model comparison data
   - Naming: `YYYY-MM-DD-prompt-slug-ID.md`
   - Example: `2025-09-10-what-is-tesla-robot-1108.md`
   - Uses `<ChatComparison>` Vue component to render side-by-side responses

2. **AI Library** (`docs/ai-library/`)
   - Categorized index of 2100+ comparisons across 100+ categories
   - Organized into topic-based subdirectories
   - Auto-generated index pages with README.md files

### Key Files

- `docs/.vuepress/config.ts` - Main VuePress configuration (base URL, head tags, meta)
- `docs/.vuepress/theme.ts` - Theme Hope configuration (navbar, footer, plugins, SEO)
- `docs/.vuepress/sidebar.ts` - Sidebar navigation structure (uses "structure" mode for automatic generation)
- `docs/.vuepress/components/ChatComparison.vue` - Core component for rendering AI model comparisons

### Component Architecture: ChatComparison.vue

The `<ChatComparison>` component is the heart of the comparison display:

**Props:**
- `title`: Comparison title
- `prompt`: The original prompt sent to AI models
- `responses`: Object mapping model names to their responses (e.g., `{ "ChatGPT": "...", "Claude": "...", "Gemini": "..." }`)
- `publishedDate`: Optional timestamp

**Key Features:**
- Side-by-side chat-style display (3 columns on desktop, 2 on tablet, 1 on mobile)
- Model minimize/restore functionality with session storage persistence
- Collapsible prompts (auto-collapsed if >3 sentences on desktop, >2 on mobile)
- Markdown-to-HTML conversion with support for:
  - Headers (h1-h6)
  - Bold/italic/strikethrough
  - Tables
  - Lists (ordered/unordered)
  - Code blocks with syntax highlighting
  - Blockquotes, horizontal rules
  - Links (open in new tab)
- Responsive design with mobile-first approach
- Dark mode support
- Model-specific color schemes (ChatGPT: teal, Claude: orange, Gemini: blue, Grok: gray, DeepSeek: purple, Mistral: red)

**Markdown File Structure:**
```markdown
---
title: "Comparison Title"
description: "AI model comparison: prompt text"
date: 2025-MM-DD
category: comparison
layout: Clean
tags:
  - ChatGPT
  - Claude
  - Gemini
author: SNEOS Community
---

# Title

**Published**: Month DD, 2025
**Models Compared**: ChatGPT, Claude, Gemini

<ChatComparison
  title="Comparison Title"
  prompt="The actual prompt text"
  :responses='{
    "ChatGPT": "Response text...",
    "Claude": "Response text...",
    "Gemini": "Response text..."
  }'
/>
```

### Theme Configuration

The site uses VuePress Theme Hope with:
- **Sidebar:** Auto-generated using "structure" mode for `/compare/` and `/ai-library/`
- **SEO:** Sitemap plugin with monthly changefreq default (override in frontmatter for index pages)
- **Analytics:** GoatCounter integration at share-sneos.goatcounter.com
- **Social:** Open Graph and Twitter Card meta tags configured

## Deployment

**Azure Static Web Apps** via GitHub Actions:
- Workflow: `.github/workflows/azure-static-web-apps-nice-water-029126a03.yml`
- Trigger: Push to `main` branch (excludes `ai-library` branch)
- Build: Automatic via VuePress
- Output directory: `dist/`
- Node version: 20.14.0

**Important:** The workflow skips deployments from the `ai-library` branch to avoid duplicate builds.

## Working with Comparisons

### Adding New Comparisons

1. Create markdown file in `docs/compare/` with date-slug-ID naming
2. Use `layout: Clean` for minimal theme chrome
3. Include proper frontmatter (title, description, date, tags)
4. Use `<ChatComparison>` component with responses object
5. Supported models: ChatGPT, Claude, Gemini, Grok, DeepSeek, Mistral

### Modifying ChatComparison Component

- Located at `docs/.vuepress/components/ChatComparison.vue`
- Scoped styles use CSS custom properties for theming
- Responsive breakpoints: 480px (small mobile), 768px (tablet), 1024px (desktop), 1400px (wide desktop)
- Session storage key: `hiddenModels` (array of minimized model names)

### Content Generation

The site appears to have automated content generation for comparisons. When working with bulk operations:
- Comparison files follow consistent naming: `YYYY-MM-DD-description-ID.md`
- IDs are unique 4-digit identifiers
- All files should include proper JSON escaping in the `:responses` object

## Common Issues

### Config Changes Not Reflecting
Run `npm run docs:clean-dev` to clear VuePress cache and restart dev server.

### JSON Parsing Errors in Responses
The `:responses` attribute expects valid JSON. Ensure:
- All quotes inside responses are escaped: `\"`
- Newlines are escaped: `\n`
- Single quotes wrap the entire object: `:responses='{ ... }'`

### Build Failures
- Check Node.js version (requires >=18.0.0)
- Verify all markdown files have valid frontmatter
- Ensure `<ChatComparison>` components have required props

## URLs and Routing

- Clean URLs enabled (no `.html` extensions)
- Redirects configured for backward compatibility
- Compare links: `/compare/YYYY-MM-DD-slug-ID/`
- AI library links: `/ai-library/category/subcategory/file-name/`
- Homepage: `/` (docs/README.md)
