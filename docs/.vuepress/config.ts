import { defineUserConfig } from "vuepress";
import { removeHtmlExtensionPlugin } from "vuepress-plugin-remove-html-extension";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "dist",

  lang: "en-US",
  title: "Share Sneos",
  description: "Share and compare AI model responses. See how different AI models respond to the same prompts.",

  // Disable excessive prefetching to reduce initial page load
  shouldPrefetch: false,

  // Remove .html extensions from URLs
  plugins: [
    removeHtmlExtensionPlugin(),
  ],

  head: [
    // Favicon
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['link', { rel: 'alternate icon', type: 'image/png', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],

    // Open Graph meta tags
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Share Sneos' }],
    ['meta', { property: 'og:description', content: 'Share and compare AI model responses. See how different AI models respond to the same prompts.' }],
    ['meta', { property: 'og:url', content: 'https://share.sneos.com' }],
    ['meta', { property: 'og:site_name', content: 'Share Sneos' }],
    ['meta', { property: 'og:image', content: 'https://share.sneos.com/sneos-share-og.png' }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],

    // Twitter Card meta tags
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Share Sneos' }],
    ['meta', { name: 'twitter:description', content: 'Share and compare AI model responses. See how different AI models respond to the same prompts.' }],
    ['meta', { name: 'twitter:image', content: 'https://share.sneos.com/sneos-share-og.png' }],

    [
      'script',
      {
        'data-goatcounter': 'https://share-sneos.goatcounter.com/count',
        async: true,
        src: '//gc.zgo.at/count.js'
      }
    ]
  ],

  theme,
});