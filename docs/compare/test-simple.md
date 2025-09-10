---
title: Simple Test
layout: Clean
---

# Test Page

This is a simple test to make sure the basic setup works.

<ChatComparison
  title="Test Comparison"
  prompt="What is 2+2?"
  :responses="responses"
  publishedDate="Now"
/>

<script setup>
const responses = {
  'ChatGPT': '2 + 2 equals 4. This is basic arithmetic.',
  'Claude': 'The answer to 2 + 2 is 4.',
  'Gemini': '2 + 2 = 4'
}
</script>