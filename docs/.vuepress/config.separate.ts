import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",  // Root base for separate deployment
  dest: "dist",
  
  lang: "en-US",
  title: "SNEOS Blog - AI Model Comparison Platform",
  description: "Compare AI models, discover the best AI tools, and stay updated with the latest in AI technology. Your guide to choosing the right AI model for your needs.",

  theme,

  shouldPrefetch: false,
  
  // Enable syntax highlighting
  markdown: {
    code: {
      lineNumbers: false,
    },
  },
  
  plugins: [
    // Explicitly disable sitemap plugin to fix build errors
    ["@vuepress/plugin-sitemap", false],
  ],
  
  head: [
    // SEO and meta tags
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: 'AI models, AI comparison, ChatGPT vs Claude, Gemini, AI tools, machine learning, artificial intelligence, model evaluation' }],
    ['meta', { name: 'author', content: 'SNEOS Team' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SNEOS Blog - AI Model Comparison Platform' }],
    ['meta', { property: 'og:description', content: 'Compare AI models and discover the best AI tools for your needs' }],
    ['meta', { property: 'og:url', content: 'https://sneos.com/blog' }],
    ['meta', { property: 'og:image', content: 'https://sneos.com/blog/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'SNEOS Blog - AI Model Comparison Platform' }],
    ['meta', { name: 'twitter:description', content: 'Compare AI models and discover the best AI tools for your needs' }],
    ['meta', { name: 'twitter:image', content: 'https://sneos.com/blog/twitter-image.png' }],
    
    // Favicon and icons - use root paths for separate deployment
    ['link', { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'manifest', href: '/site.webmanifest' }],
    
    // Structured data for AI blog
    ['script', {
      type: 'application/ld+json'
    }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "SNEOS Blog",
      "url": "https://sneos.com/blog",
      "description": "AI model comparison platform with guides, research, and tools",
      "publisher": {
        "@type": "Organization",
        "name": "SNEOS",
        "url": "https://sneos.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://sneos.com/blog/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })],
    
    // Analytics
    ['script', {
      'data-goatcounter': 'https://sneos-blog.goatcounter.com/count',
      async: true,
      src: '//gc.zgo.at/count.js'
    }]
  ]
});