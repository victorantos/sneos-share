import { defineUserConfig } from "vuepress";
import { defaultTheme } from '@vuepress/theme-default'

export default defineUserConfig({
  base: "/",
  dest: "dist",
  
  lang: "en-US",
  title: "SNEOS Share - AI Model Comparisons",
  description: "Share and compare AI model responses. See how different AI models respond to the same prompts.",

  theme: defaultTheme({
    // Basic theme configuration
    navbar: [
      {
        text: 'Home',
        link: '/',
      },
      {
        text: 'Comparisons',
        link: '/compare/',
      },
      {
        text: 'Create Your Own',
        link: 'https://sneos.com',
      },
    ],
  }),
});