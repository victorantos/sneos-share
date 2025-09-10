# SNEOS Blog Integration

This folder contains the VuePress blog that gets integrated with the main SNEOS Blazor WASM application.

## Structure

```
blog/
├── docs/                          # VuePress source files
│   ├── .vuepress/
│   │   ├── config.ts             # Main config (base: "/blog/", dest: "../wwwroot/blog")
│   │   ├── theme.ts              # Theme configuration
│   │   ├── navbar.ts             # Navigation menu
│   │   ├── sidebar.ts            # Sidebar configuration
│   │   └── components/           # Vue components
│   ├── compare/                  # AI model comparisons
│   ├── guides/                   # AI selection guides
│   ├── research/                 # AI research articles
│   └── tools/                    # Interactive tools
├── package.json                  # VuePress dependencies
└── node_modules/                 # Dependencies (after npm install)
```

## Build Process

The blog is configured to build directly into the Blazor app's `wwwroot/blog` directory:

1. **Development**: `npm run docs:dev` (runs on http://localhost:8080)
2. **Production**: `npm run build` or use `../build-blog.sh`

## Integration with Blazor App

- **Base URL**: `/blog/` (configured in config.ts)
- **Output**: `../wwwroot/blog/` (VuePress builds directly into Blazor wwwroot)
- **Routing**: staticwebapp.config.json excludes `/blog/*` from Blazor routing
- **Domain**: Accessible at `https://sneos.com/blog`

## Development Workflow

1. **Start blog development**:
   ```bash
   cd blog
   npm install
   npm run docs:dev
   ```

2. **Build for production**:
   ```bash
   ./build-blog.sh
   ```

3. **Deploy**: The blog gets deployed with the main Blazor app to Azure Static Web Apps

## Features

- **AI Model Comparisons**: Side-by-side comparisons of ChatGPT, Claude, Gemini, etc.
- **Interactive Components**: Vue components for model selection and comparison tables
- **SEO Optimized**: Proper meta tags, structured data, and sitemap
- **Responsive Design**: Mobile-first design with Hope theme
- **Blog Functionality**: Categorized posts with tagging and search

## Content Management

- **Comparisons**: Add new model comparisons in `docs/compare/`
- **Guides**: Add selection guides in `docs/guides/`
- **Research**: Add research articles in `docs/research/`
- **Tools**: Add interactive tools in `docs/tools/`

All content uses Markdown with frontmatter for metadata and categorization.