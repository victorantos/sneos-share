import { navbar } from "vuepress-theme-hope";

export default navbar([
  "/",
  {
    text: "Compare",
    icon: "compare",
    prefix: "/compare/",
    children: [
      { text: "Overview", link: "" },
      { text: "ChatGPT vs Claude", link: "chatgpt-vs-claude" },
      { text: "Gemini vs GPT-4", link: "gemini-vs-gpt4" },
      { text: "All Comparisons", link: "all-comparisons" },
    ],
  },
  {
    text: "Guides", 
    icon: "book",
    prefix: "/guides/",
    children: [
      { text: "Getting Started", link: "" },
      { text: "Choosing the Right AI Model", link: "choosing-right-ai-model" },
      { text: "AI Model Pricing Guide", link: "ai-model-pricing" },
      { text: "Performance Benchmarks", link: "performance-benchmarks" },
    ],
  },
  {
    text: "Research",
    icon: "flask",
    prefix: "/research/",
    children: [
      { text: "Latest Research", link: "" },
      { text: "Q1 2025 AI Performance", link: "q1-2025-ai-performance" },
      { text: "Model Evaluation Methods", link: "evaluation-methods" },
    ],
  },
  {
    text: "Tools",
    icon: "tools",
    prefix: "/tools/",
    children: [
      { text: "AI Tools", link: "" },
      { text: "Comparison Calculator", link: "comparison-calculator" },
      { text: "Cost Calculator", link: "cost-calculator" },
    ],
  },
  {
    text: "Try SNEOS",
    icon: "rocket",
    link: "https://app.sneos.com",
  },
]);