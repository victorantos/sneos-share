import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",
  dest: "dist",
  
  lang: "en-US",
  title: "SNEOS Share - AI Model Comparisons",
  description: "Share and compare AI model responses. See how different AI models respond to the same prompts.",

  theme,
});