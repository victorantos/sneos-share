---
title: "clever reply to Andrey X post: Excited to release ..."
description: "AI model comparison: clever reply to Andrey X post: Excited to release new repo: nanochat! (it's among the most unhinged ..."
date: 2025-10-13
category: comparison
layout: Clean
tags:
  - Gemini
  - Grok
  - ChatGPT
  - AI Comparison
author: SNEOS Community
head:
  - - meta
    - name: description
      content: "AI model comparison: clever reply to Andrey X post: Excited to release new repo: nanochat! (it's among the most unhinged I've written).  Unli..."
---

<ChatComparison
  title="clever reply to Andrey X post: Excited to release ..."
  prompt="clever reply to Andrey X post: Excited to release new repo: nanochat!&#10;(it's among the most unhinged I've written).&#10;&#10;Unlike my earlier similar repo nanoGPT which only covered pretraining, nanochat is a minimal, from scratch, full-stack training/inference pipeline of a simple ChatGPT clone in a single, dependency-minimal codebase. You boot up a cloud GPU box, run a single script and in as little as 4 hours later you can talk to your own LLM in a ChatGPT-like web UI.&#10;&#10;It weighs ~8,000 lines of imo quite clean code to:&#10;&#10;- Train the tokenizer using a new Rust implementation&#10;- Pretrain a Transformer LLM on FineWeb, evaluate CORE score across a number of metrics&#10;- Midtrain on user-assistant conversations from SmolTalk, multiple choice questions, tool use.&#10;- SFT, evaluate the chat model on world knowledge multiple choice (ARC-E/C, MMLU), math (GSM8K), code (HumanEval)&#10;- RL the model optionally on GSM8K with &quot;GRPO&quot;&#10;- Efficient inference the model in an Engine with KV cache, simple prefill/decode, tool use (Python interpreter in a lightweight sandbox), talk to it over CLI or ChatGPT-like WebUI.&#10;- Write a single markdown report card, summarizing and gamifying the whole thing.&#10;&#10;Even for as low as ~$100 in cost (~4 hours on an 8XH100 node), you can train a little ChatGPT clone that you can kind of talk to, and which can write stories/poems, answer simple questions. About ~12 hours surpasses GPT-2 CORE metric. As you further scale up towards ~$1000 (~41.6 hours of training), it quickly becomes a lot more coherent and can solve simple math/code problems and take multiple choice tests. E.g. a depth 30 model trained for 24 hours (this is about equal to FLOPs of GPT-3 Small 125M and 1/1000th of GPT-3) gets into 40s on MMLU and 70s on ARC-Easy, 20s on GSM8K, etc.&#10;&#10;My goal is to get the full &quot;strong baseline&quot; stack into one cohesive, minimal, readable, hackable, maximally forkable repo. nanochat will be the capstone project of LLM101n (which is still being developed). I think it also has potential to grow into a research harness, or a benchmark, similar to nanoGPT before it. It is by no means finished, tuned or optimized (actually I think there's likely quite a bit of low-hanging fruit), but I think it's at a place where the overall skeleton is ok enough that it can go up on GitHub where all the parts of it can be improved.&#10;&#10;Link to repo and a detailed walkthrough of the nanochat speedrun is in the reply."
  :responses='{
    "Gemini": "Okay, I understand. You\u0027ve provided a detailed announcement of the \u0060nanochat\u0060 repository by Andrey X. It seems like a significant project aimed at creating a minimal, full-stack ChatGPT clone, and you\u0027re looking for a clever reply to this post. I will generate some clever replies, but first I need to find the repository link.\n",
    "Grok": "Whoa, Andrej\u2014nanochat is the ultimate \u0022build your own ChatGPT\u0022 fever dream turned reality. From Rust tokenizer to GRPO RL in 8K lines? That\u0027s not unhinged, that\u0027s engineered chaos we all secretly crave. Forking now to see if I can make it roast my code reviews. \uD83D\uDE80 What\u0027s the first low-hanging fruit you\u0027re eyeing?",
    "ChatGPT": "\u0022From nanoGPT to nanochat \u2014 looks like you turned a snack into a full-course meal for LLM enthusiasts. Excited to see this \u2018unhinged\u2019 masterpiece let loose in the wild. Training ChatGPT clones with just one script? That\u2019s some next-level wizardry packed in 8,000 lines. Can\u2019t wait to fork, hack, and maybe even teach my toaster to chat!\u0022"
  }'
  published-date="16:51"
/>

## Analysis

This comparison demonstrates the different approaches each AI model takes when responding to the same prompt. Here are the key differences observed:

### Response Characteristics

**Gemini**: Provides a direct response with 4 sentences. 

**Grok**: Provides a direct response with 5 sentences. 

**ChatGPT**: Provides a direct response with 5 sentences. 

## Key Takeaways

- Each model brings unique strengths to this type of query
- Response styles vary significantly between models
- Consider your specific use case when choosing between these models

## Try This Comparison Yourself

Want to test these models with your own prompts? Visit [SNEOS.com](https://sneos.com) to compare AI responses side-by-side in real-time.

---

*This comparison was generated using the [SNEOS AI Comparison Tool](https://sneos.com)*
*Published: October 13, 2025 | Models: Gemini, Grok, ChatGPT*
