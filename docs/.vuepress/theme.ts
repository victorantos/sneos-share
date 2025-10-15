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

  // navbar - simplified for mobile
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
      // Global default for all pages - individual posts rarely change after creation
      // Override this in frontmatter for specific pages:
      // - Homepage: sitemap.changefreq: daily
      // - Index pages (/compare/, /ai-library/): sitemap.changefreq: weekly
      // Note: vuepress-theme-hope sitemap plugin doesn't support getter functions
      changefreq: "monthly",
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