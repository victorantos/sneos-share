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
      // TEST: Using static value to see if sitemap plugin respects configuration
      // If this works, the issue is that getter functions aren't supported
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