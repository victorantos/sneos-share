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
    mdEnhance: {
      codetabs: true,
      container: true,
    },
  },
});