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
    {
      text: "For Researchers",
      icon: "graduation-cap",
      link: "/ai-library/researchers/",
    },
    {
      text: "Try SNEOS",
      icon: "rocket",
      link: "https://sneos.com",
    },
    {
      text: "GitHub",
      icon: "fab fa-github",
      link: "https://github.com/victorantos/sneos-share",
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
        // Homepage and compare index change frequently
        if (page.path === '/' || page.path === '/compare/' || page.path === '/compare/index.html') {
          return 'daily';
        }
        // Individual comparison pages rarely change after creation
        return 'yearly';
      },
      priorityGetter: (page) => {
        // Homepage has highest priority
        if (page.path === '/') return 1.0;
        // Compare index is important for discovering new content
        if (page.path === '/compare/' || page.path === '/compare/index.html') return 0.9;
        // Individual comparisons have standard priority
        return 0.6;
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