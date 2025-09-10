import { hopeTheme } from "vuepress-theme-hope";
import navbar from "./navbar.js";
import sidebar from "./sidebar.js";

export default hopeTheme({
  hostname: "https://share.sneos.com",
  name: "SNEOS Share - AI Model Comparisons",
  author: {
    name: "SNEOS Team",
    url: "https://sneos.com",
  },

  iconAssets: "fontawesome-with-brands",

  logo: "/logo.svg",

  repo: "victorantos/sneos-share",

  docsDir: "docs",

  // Mobile-first configuration
  mobileBreakPoint: 768,
  
  // SEO improvements - completely disabled
  seo: {
    isArticle: false,
  },
  sitemap: {
    hostname: false,
  }, 
  canonicalLink: false,
  
  // Theme appearance
  darkmode: "toggle",
  themeColor: "#6366f1", // Indigo theme color
  fullscreen: true,

  // navbar
  navbar,

  // sidebar
  sidebar,

  footer: "Share AI Model Comparisons • SNEOS Share © 2025",

  displayFooter: true,

  metaLocales: {
    editLink: "Edit this page on GitHub",
  },

  plugins: {
    blog: {
      excerptLength: 200,
      filter: ({ frontmatter, filePathRelative }) => {
        // Only include markdown files in specific directories as blog posts
        if (!filePathRelative || !filePathRelative.endsWith('.md')) return false;
        if (filePathRelative.startsWith('compare/') || 
            filePathRelative.startsWith('guides/') || 
            filePathRelative.startsWith('research/') || 
            filePathRelative.startsWith('tools/')) {
          return frontmatter.layout !== 'Layout';
        }
        return false;
      },
      type: [
        {
          key: "comparison",
          filter: ({ frontmatter, filePathRelative }) =>
            filePathRelative?.startsWith('compare/') && frontmatter.layout !== 'Layout',
          layout: "BlogType",
          frontmatter: () => ({ title: "AI Model Comparisons" }),
        },
        {
          key: "guide",
          filter: ({ frontmatter, filePathRelative }) =>
            filePathRelative?.startsWith('guides/') && frontmatter.layout !== 'Layout',
          layout: "BlogType", 
          frontmatter: () => ({ title: "AI Guides" }),
        },
        {
          key: "research",
          filter: ({ frontmatter, filePathRelative }) =>
            filePathRelative?.startsWith('research/') && frontmatter.layout !== 'Layout',
          layout: "BlogType",
          frontmatter: () => ({ title: "AI Research" }),
        }
      ]
    },

    components: {
      components: ["Badge", "VPCard"],
    },

    // Markdown enhancements for AI content
    mdEnhance: {
      align: true,
      attrs: true,
      codetabs: true,
      component: true,
      demo: true,
      figure: true,
      imgLazyload: true,
      imgSize: true,
      include: true,
      mark: true,
      spoiler: true,
      footnote: true,
      stylize: [
        {
          matcher: "Performance",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "tip" },
                content: "Performance",
              };
          },
        },
        {
          matcher: "Accuracy",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "note" },
                content: "Accuracy",
              };
          },
        },
        {
          matcher: "Speed",
          replacer: ({ tag }) => {
            if (tag === "em")
              return {
                tag: "Badge",
                attrs: { type: "warning" },
                content: "Speed",
              };
          },
        }
      ],
      sub: true,
      sup: true,
      tabs: true,
      tasklist: true,
      vPre: true,
      
      // Enable charts for AI model comparisons
      // chart: true,
      
      // Enable mermaid for flowcharts
      // mermaid: true,
    },
  },
});