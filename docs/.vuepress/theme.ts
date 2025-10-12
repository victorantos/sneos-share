import { hopeTheme } from "vuepress-theme-hope";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://share.sneos.com",
  
  author: {
    name: "SNEOS Team",
    url: "https://sneos.com",
  },

  iconAssets: "fontawesome-with-brands",

  repo: "victorantos/sneos-share",

  docsDir: "docs",

  // navbar
  navbar: [
    {
      text: "AI Comparisons",
      icon: "comments",
      link: "/compare/",
    },
    {
      text: "AI Library",
      icon: "book",
      link: "/ai-library/",
    },
  ],

  // sidebar
  sidebar,

  footer: '<a href="https://sneos.com" target="_blank">Sneos.com</a> | <a href="https://sneos.com/blog" target="_blank">Blog</a> | Share AI Model Comparisons • © 2025',
  displayFooter: true,

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  plugins: {
    sitemap: {
      excludePaths: ["/404.html"],
      modifyTimeGetter: (page) => {
        // Compare index page changes frequently (when new comparisons are added)
        if (page.path === '/compare/' || page.path === '/compare/index.html') {
          return new Date().toISOString();
        }
        // Individual comparison pages don't change after creation
        // Use git time or fallback to a static date
        return page.git?.updatedTime || page.frontmatter?.date || new Date('2025-01-01').toISOString();
      },
      changefreqGetter: (page) => {
        // Homepage changes frequently
        if (page.path === '/') {
          return 'daily';
        }
        // Index pages change when new content is added
        if (page.path === '/compare/' || page.path === '/compare/index.html' ||
            page.path === '/ai-library/' || page.path === '/ai-library/index.html' ||
            page.path.match(/\/ai-library\/[^/]+\/$/)) {
          return 'weekly';
        }
        // Individual comparison and ai-library posts rarely change after creation
        // Only regenerated if AI model times out or throws errors
        if (page.path.includes('/compare/') || page.path.includes('/ai-library/')) {
          return 'monthly';
        }
        // Other pages
        return 'yearly';
      },
      priorityGetter: (page) => {
        // Homepage has highest priority
        if (page.path === '/') return 1.0;
        // Main index pages are important for discovering new content
        if (page.path === '/compare/' || page.path === '/compare/index.html' ||
            page.path === '/ai-library/' || page.path === '/ai-library/index.html') {
          return 0.9;
        }
        // Category index pages in ai-library
        if (page.path.match(/\/ai-library\/[^/]+\/$/) || page.path.match(/\/ai-library\/[^/]+\/index\.html$/)) {
          return 0.7;
        }
        // Individual comparison and ai-library posts
        if (page.path.includes('/compare/') || page.path.includes('/ai-library/')) {
          return 0.6;
        }
        // Other pages
        return 0.5;
      },
    },
    seo: {
      ogp: (ogp) => ({
        ...ogp,
        "og:site_name": "Share Sneos",
      }),
      jsonLd: (jsonLd) => ({
        ...jsonLd,
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Share Sneos",
        "description": "Share and compare AI model responses",
        "url": "https://share.sneos.com",
      }),
    },
    mdEnhance: {
      codetabs: true,
      hint: true,
    },
  },
});