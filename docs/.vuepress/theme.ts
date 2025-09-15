import { hopeTheme } from "vuepress-theme-hope";

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
    "/",
    "/compare/",
  ],

  // sidebar
  sidebar: [
    "/",
    {
      text: "Comparisons",
      icon: "lightbulb",
      prefix: "/compare/",
      link: "/compare/",
      children: "structure",
    },
  ],

  footer: "Share AI Model Comparisons • SNEOS Share © 2025",
  displayFooter: true,

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  plugins: {
    sitemap: {
      changefreq: "weekly",
      priority: 0.7,
      excludePaths: ["/404.html"],
    },
    seo: {
      ogp: (ogp) => ({
        ...ogp,
        "og:site_name": "SNEOS Share - AI Model Comparisons",
      }),
      jsonLd: (jsonLd) => ({
        ...jsonLd,
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "SNEOS Share",
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