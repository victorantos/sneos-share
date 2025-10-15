---
title: "I'm analyzing a cross-tabulation of two categorical variables (treatment group x outcome success/failure). Help me: 1) Create a contingency table with frequencies and percentages"
description: "AI model comparison: I'm analyzing a cross-tabulation of two categorical variables (treatment group x outcome success/fai..."
date: 2025-10-15
category: comparison
layout: Clean
tags:
  - ChatGPT
  - Mistral
  - AI Comparison
author: SNEOS Community
head:
  - - meta
    - name: description
      content: "AI model comparison: I'm analyzing a cross-tabulation of two categorical variables (treatment group x outcome success/failure). Help me: 1) C..."
---

<ChatComparison
  title="I'm analyzing a cross-tabulation of two categorical variables (treatment group x outcome success/failure). Help me: 1) Create a contingency table with frequencies and percentages"
  prompt="I'm analyzing a cross-tabulation of two categorical variables (treatment group x outcome success/failure). Help me: 1) Create a contingency table with frequencies and percentages"
  :responses='{"ChatGPT": "Creating a contingency table with frequencies and percentages is a great way to analyze the relationship between two categorical variables, such as treatment group and outcome (success/failure). Here\u2019s a step-by-step guide on how to do this.\n\n### Step 1: Gather Your Data\nFirst, you need to gather your data, which might look something like this:\n\n| Treatment Group | Success | Failure |\n|-----------------|---------|---------|\n| A               | 30      | 10      |\n| B               | 20      | 20      |\n| C               | 25      | 15      |\n\n### Step 2: Create the Contingency Table\n1. **Input the Frequencies**: Create a table that shows the raw counts of successful and failed outcomes for each treatment group.\n\n| Treatment Group | Success | Failure | Total |\n|-----------------|---------|---------|-------|\n| A               | 30      | 10      | 40    |\n| B               | 20      | 20      | 40    |\n| C               | 25      | 15      | 40    |\n| Total           | 75      | 45      | 120   |\n\n2. **Calculate Percentages**: You can calculate the percentage of successes and failures within each treatment group, and/or the overall percentage. There are two common approaches:\n\n   - **Row percentages** (percentage of each outcome within each treatment group).\n   - **Column percentages** (percentage of each treatment group within each outcome).\n\nHere\u2019s how to calculate row percentages (the percentage of successes/failures within each treatment group):\n\n- Success Percentage for A = (30 / 40) * 100 = 75%\n- Failure Percentage for A = (10 / 40) * 100 = 25%\n- Success Percentage for B = (20 / 40) * 100 = 50%\n- Failure Percentage for B = (20 / 40) * 100 = 50%\n- Success Percentage for C = (25 / 40) * 100 = 62.5%\n- Failure Percentage for C = (15 / 40) * 100 = 37.5%\n\n### Step 3: Final Contingency Table with Frequencies and Percentages\n\n| Treatment Group | Success (n) | Success (%) | Failure (n) | Failure (%) | Total (n) | Total (%) |\n|-----------------|--------------|-------------|--------------|--------------|-----------|-----------|\n| A               | 30           | 75%         | 10           | 25%          | 40        | 33.3%     |\n| B               | 20           | 50%         | 20           | 50%          | 40        | 33.3%     |\n| C               | 25           | 62.5%       | 15           | 37.5%        | 40        | 33.3%     |\n| **Total**       | **75**       | **100%**    | **45**       | **100%**     | **120**   | **100%**  |\n\n### Summary\n- The first column refers to the treatment groups.\n- The n columns reflect the frequencies (raw counts).\n- The percentages show the proportion of each outcome in prevalence.\n- The total row and column summarize overall counts and percentages.\n\nThis table allows you to easily compare the success and failure rates across treatment groups. If you have specific numbers or data in mind, feel free to provide them, and I can help you set up that exact table!", "Mistral": "Sure, I can help you create a contingency table with frequencies and percentages. Let\u0027s assume you have two categorical variables:\n\n1. **Treatment Group**: This could be, for example, \u0022Control\u0022 and \u0022Experimental\u0022.\n2. **Outcome**: This could be \u0022Success\u0022 and \u0022Failure\u0022.\n\nHere\u0027s a step-by-step guide to creating a contingency table with frequencies and percentages:\n\n### Step 1: Collect the Data\nFirst, you need to collect the data. Let\u0027s assume you have the following data:\n\n- Control Group: 30 successes, 20 failures\n- Experimental Group: 40 successes, 10 failures\n\n### Step 2: Create the Contingency Table with Frequencies\n\n|                | Success | Failure | Total  |\n|----------------|---------|---------|--------|\n| **Control**    | 30      | 20      | 50     |\n| **Experimental**| 40      | 10      | 50     |\n| **Total**      | 70      | 30      | 100    |\n\n### Step 3: Calculate Row Percentages\nRow percentages show the distribution of outcomes within each treatment group.\n\n|                | Success | Failure | Total  |\n|----------------|---------|---------|--------|\n| **Control**    | 30 (60%)| 20 (40%)| 50 (100%)|\n| **Experimental**| 40 (80%)| 10 (20%)| 50 (100%)|\n| **Total**      | 70      | 30      | 100    |\n\n### Step 4: Calculate Column Percentages\nColumn percentages show the distribution of treatment groups within each outcome.\n\n|                | Success | Failure | Total  |\n|----------------|---------|---------|--------|\n| **Control**    | 30 (42.9%)| 20 (66.7%)| 50     |\n| **Experimental**| 40 (57.1%)| 10 (33.3%)| 50     |\n| **Total**      | 70 (100%)| 30 (100%)| 100    |\n\n### Step 5: Calculate Overall Percentages\nOverall percentages show the distribution of each cell relative to the total number of observations.\n\n|                | Success | Failure | Total  |\n|----------------|---------|---------|--------|\n| **Control**    | 30 (30%)| 20 (20%)| 50 (50%)|\n| **Experimental**| 40 (40%)| 10 (10%)| 50 (50%)|\n| **Total**      | 70 (70%)| 30 (30%)| 100 (100%)|\n\n### Summary\n- **Row Percentages**: Show the distribution of outcomes within each treatment group.\n- **Column Percentages**: Show the distribution of treatment groups within each outcome.\n- **Overall Percentages**: Show the distribution of each cell relative to the total number of observations.\n\nYou can choose which type of percentage to include based on what you want to highlight in your analysis. If you provide specific data, I can help you calculate the exact percentages."}' published-date="{DateTime.UtcNow:HH:mm}"
/>

## Analysis

This comparison demonstrates the different approaches each AI model takes when responding to the same prompt. Here are the key differences observed:

### Response Characteristics

**ChatGPT**: Provides a detailed response with 21 sentences. 

**Mistral**: Provides a detailed response with 18 sentences. 

## Key Takeaways

- Each model brings unique strengths to this type of query
- Response styles vary significantly between models
- Consider your specific use case when choosing between these models

## Try This Comparison Yourself

Want to test these models with your own prompts? Visit [SNEOS.com](https://sneos.com) to compare AI responses side-by-side in real-time.

---

*This comparison was generated using the [SNEOS AI Comparison Tool](https://sneos.com)*
*Published: October 15, 2025 | Models: ChatGPT, Mistral*
