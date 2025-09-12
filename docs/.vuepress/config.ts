import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "dist",
  
  lang: "en-US",
  title: "SNEOS Share - AI Model Comparisons",
  description: "Share and compare AI model responses. See how different AI models respond to the same prompts.",

  head: [
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