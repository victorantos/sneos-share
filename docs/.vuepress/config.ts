import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "dist",
  
  lang: "en-US",
  title: "SNEOS Share - AI Model Comparisons",
  description: "Share and compare AI model responses. See how different AI models respond to the same prompts.",

  theme,

  shouldPrefetch: false,
  
  // Note: markdown.code is deprecated in VuePress v2
  // Use @vuepress/plugin-prismjs or @vuepress/plugin-shiki instead
  
  // Plugins configuration simplified for better compatibility
  
  head: [
    // SEO and meta tags
    ['meta', { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }],
    ['meta', { name: 'keywords', content: 'AI models, AI comparison, ChatGPT vs Claude, Gemini, AI tools, machine learning, artificial intelligence, model evaluation' }],
    ['meta', { name: 'author', content: 'SNEOS Team' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'SNEOS Share - AI Model Comparisons' }],
    ['meta', { property: 'og:description', content: 'Compare AI models and discover the best AI tools for your needs' }],
    ['meta', { property: 'og:url', content: 'https://share.sneos.com' }],
    ['meta', { property: 'og:image', content: 'https://share.sneos.com/og-image.png' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'SNEOS Share - AI Model Comparisons' }],
    ['meta', { name: 'twitter:description', content: 'Compare AI models and discover the best AI tools for your needs' }],
    ['meta', { name: 'twitter:image', content: 'https://share.sneos.com/twitter-image.png' }],
    
    // Favicon and icons
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
      "name": "SNEOS Share",
      "url": "https://share.sneos.com",
      "description": "AI model comparison platform with guides, research, and tools",
      "publisher": {
        "@type": "Organization",
        "name": "SNEOS",
        "url": "https://sneos.com"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://share.sneos.com/search?q={search_term_string}",
        "query-input": "required name=search_term_string"
      }
    })],
    
    // Analytics
    ['script', {
      'data-goatcounter': 'https://sneos-share.goatcounter.com/count',
      async: true,
      src: '//gc.zgo.at/count.js'
    }]
  ]
});