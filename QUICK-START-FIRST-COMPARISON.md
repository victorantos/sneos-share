# Quick Start: Create Your First Researcher Comparison

This guide walks you through creating your first high-quality academic comparison for the researchers section.

---

## 🎯 Goal
Create: **"ChatGPT vs Claude vs Gemini: Literature Review Comprehensive Guide"**

This is the #1 priority comparison referenced in your landing page.

---

## Step 1: Get the Prompt

Use this prompt from the CSV:

```
I'm conducting a systematic literature review on the effectiveness of mindfulness-based interventions for anxiety in college students. Help me: 1) Develop a comprehensive search strategy for PubMed and PsycINFO, 2) Create inclusion/exclusion criteria, 3) Design a data extraction form, 4) Suggest quality assessment tools (PRISMA, Cochrane Risk of Bias)
```

---

## Step 2: Run on SNEOS.com

1. Go to https://sneos.com
2. Paste the prompt above
3. Select **ChatGPT**, **Claude**, and **Gemini**
4. Click "Compare"
5. Wait for all 3 responses
6. Copy each response completely

---

## Step 3: Create the Markdown File

**File Location:**
```
/Users/victora/Projects/SneoScom/sneos-share/docs/compare/2025-10-14-literature-review-comprehensive-9001.md
```

**File Content:**

```markdown
---
title: "ChatGPT vs Claude vs Gemini: Comprehensive Literature Review Guide"
description: "AI model comparison: Which AI excels at systematic literature reviews? Compare strategies for search, screening, and synthesis"
date: 2025-10-14
category: researchers
subcategory: literature-review
layout: Clean
tags:
  - ChatGPT
  - Claude
  - Gemini
  - literature review
  - systematic review
  - research methods
  - academic research
author: SNEOS Community
---

# ChatGPT vs Claude vs Gemini: Comprehensive Literature Review Guide

**Published**: October 14, 2025
**Models Compared**: ChatGPT, Claude, Gemini
**Research Area**: Literature Review & Research Discovery

---

<AcademicContext
  title="Literature Review: Comprehensive Guide for Systematic Reviews"
  :useCases='{
    "literature-review": 5,
    "research-synthesis": 5,
    "methodology-design": 4,
    "academic-writing": 4,
    "data-extraction": 3
  }'
  :concerns='[
    { type: "warning", text: "Citation Accuracy: AI models can hallucinate references. ALWAYS verify every citation manually using PubMed, Google Scholar, or Web of Science" },
    { type: "warning", text: "Knowledge Cutoff: AI training data has cutoffs (typically 2023-2024). Supplement with current database searches for recent literature" },
    { type: "positive", text: "Time Savings: Researchers report 40-60% reduction in initial literature screening and synthesis time when using AI assistance" },
    { type: "positive", text: "Data Privacy: Major providers (OpenAI, Anthropic, Google) do not train on paid user conversations by default" },
    { type: "info", text: "Methodological Rigor: AI should assist, not replace, systematic review protocols (PRISMA, Cochrane). Maintain human oversight throughout" },
    { type: "info", text: "University Compliance: Check your institution\\'s AI policy. Some require disclosure in methodology or IRB approval" }
  ]'
  :showCitation="true"
  :showMethodology="true"
  date="2025"
  pageUrl="https://share.sneos.com/compare/2025-10-14-literature-review-comprehensive-9001/"
>

<ChatComparison
  title="Systematic Literature Review Strategy: Which AI Provides Best Guidance?"
  prompt="I'm conducting a systematic literature review on the effectiveness of mindfulness-based interventions for anxiety in college students. Help me: 1) Develop a comprehensive search strategy for PubMed and PsycINFO, 2) Create inclusion/exclusion criteria, 3) Design a data extraction form, 4) Suggest quality assessment tools (PRISMA, Cochrane Risk of Bias)"
  :responses='{
    "ChatGPT": "[PASTE FULL CHATGPT RESPONSE HERE]",
    "Claude": "[PASTE FULL CLAUDE RESPONSE HERE]",
    "Gemini": "[PASTE FULL GEMINI RESPONSE HERE]"
  }'
  publishedDate="October 14, 2025"
/>

</AcademicContext>

---

## 🔍 Key Takeaways

### Best Use Cases by Model

**ChatGPT** - Best for:
- Quick, well-structured search strategies
- PRISMA compliance guidance
- Practical, step-by-step workflows
- Clear explanations for beginners

**Claude** - Best for:
- Deep methodological analysis
- Critical evaluation of review approaches
- Nuanced understanding of research paradigms
- Complex inclusion/exclusion criteria

**Gemini** - Best for:
- Comprehensive, detailed guidance
- Multiple database strategies
- Visual organization (tables, checklists)
- Learning systematic review process

### Comparison Insights

All three models provided valuable guidance for systematic literature reviews:

1. **Search Strategy Development**: All three offered solid PubMed and PsycINFO search strategies, though Claude provided more nuanced Boolean operators and Claude/Gemini included more comprehensive MeSH term guidance.

2. **Inclusion/Exclusion Criteria**: ChatGPT was most concise and clear, Claude provided deepest theoretical grounding, Gemini offered most comprehensive lists.

3. **Data Extraction**: All three suggested appropriate extraction forms. Claude's approach was most aligned with Cochrane standards, while Gemini provided most detailed field-by-field guidance.

4. **Quality Assessment**: All correctly recommended PRISMA and Cochrane Risk of Bias tools. Claude provided most sophisticated explanation of bias assessment.

### Verification Checklist

When using AI for literature reviews:

- [ ] Verify all database search strategies by running test searches
- [ ] Check inclusion/exclusion criteria with advisor or methodologist
- [ ] Validate data extraction form with pilot test on 3-5 papers
- [ ] Confirm quality assessment tools are appropriate for your study design
- [ ] Document AI assistance in your methodology section
- [ ] Never trust AI-generated citations without manual verification
- [ ] Use AI for ideation and drafting, but maintain human judgment throughout

### Recommended Workflow

1. **Use AI for Initial Strategy** (Day 1)
   - Generate search strategies with multiple AI models
   - Compare approaches and combine best elements
   - Get ideas for inclusion/exclusion criteria

2. **Validate with Librarian** (Day 2-3)
   - Meet with subject librarian to refine search
   - Test search strategies in actual databases
   - Adjust based on initial results

3. **Pilot Test** (Week 1)
   - Screen 20-30 abstracts to test criteria
   - Extract data from 5 papers to test form
   - Refine based on inter-rater reliability

4. **Full Review** (Weeks 2-6)
   - Use AI to help organize and synthesize
   - Maintain rigorous human oversight
   - Document process for PRISMA compliance

## 📚 Related Resources

- [Literature Review Best Practices](/ai-library/researchers/literature-review/)
- [Academic Writing Tools](/ai-library/academic-writing-and-publishing/)
- [Research Methodology](/ai-library/researchers/methodology/)
- [Data Analysis Tools](/ai-library/researchers/data-analysis/)

---

*Want to try this comparison yourself? [Run these prompts on SNEOS](https://sneos.com) or explore our [full researchers library](/ai-library/researchers/).*
```

---

## Step 4: Add Actual Responses

1. Replace `[PASTE FULL CHATGPT RESPONSE HERE]` with ChatGPT's full response
2. Replace `[PASTE FULL CLAUDE RESPONSE HERE]` with Claude's full response
3. Replace `[PASTE FULL GEMINI RESPONSE HERE]` with Gemini's full response

**Important:**
- Escape all quotes inside responses with `\"`
- Keep all newlines as `\n`
- OR use a JSON escaper tool: https://www.freeformatter.com/json-escape.html

---

## Step 5: Test Locally

```bash
cd /Users/victora/Projects/SneoScom/sneos-share

# Start dev server
npm run docs:dev

# Visit in browser
open http://localhost:8080/compare/2025-10-14-literature-review-comprehensive-9001/
```

**Check:**
- ✅ Page loads without errors
- ✅ AcademicContext wrapper displays correctly
- ✅ All 3 model responses render properly
- ✅ Citation tool works (copy buttons)
- ✅ Links to other pages work
- ✅ Responsive on mobile

---

## Step 6: Update Landing Page

Edit `/Users/victora/Projects/SneoScom/sneos-share/docs/ai-library/researchers/README.md`:

**Find this line:**
```markdown
- [ChatGPT vs Claude vs Gemini: Literature Review Tools](/compare/) - Comprehensive comparison for systematic literature reviews
```

**Replace with:**
```markdown
- [ChatGPT vs Claude vs Gemini: Literature Review Comprehensive Guide](/compare/2025-10-14-literature-review-comprehensive-9001/) - Systematic search, screening, and synthesis strategies
```

---

## Step 7: Commit and Deploy

```bash
git add .
git commit -m "feat: Add literature review comprehensive guide comparison for researchers"
git push origin main
```

Azure will automatically deploy!

---

## 🎉 Done!

You've created your first researcher comparison with:
- ✅ Full academic context wrapper
- ✅ Use case ratings
- ✅ Key considerations for researchers
- ✅ Citation tool
- ✅ Methodology link
- ✅ Verification checklist
- ✅ Related resources

**Next Steps:**
1. Repeat for remaining 11 Phase 1 comparisons
2. Update all landing page links
3. Add 2-3 comparisons to each category page
4. Scale to 50+ comparisons using automation

**Pro Tip:** Save this first comparison as a template. You can reuse the structure and just swap:
- Title
- Prompt
- Responses
- Use case ratings
- Concerns
- Key takeaways

---

## 🤖 Automation Option

If you want to automate this process:

1. **Export from SNEOS** - Save JSON of all responses
2. **Script Generation** - Use template + JSON to create markdown files
3. **Bulk Process** - Generate 50+ comparisons in one batch
4. **Review & Publish** - Quick review, then deploy

See `/Users/victora/Projects/SneosAutomation/` for automation scripts (if they exist).

---

## 📞 Need Help?

- **File Location Issues**: Check paths match exactly
- **JSON Escaping Issues**: Use online JSON escape tool
- **Component Not Rendering**: Check Vue syntax in AcademicContext
- **Build Errors**: Run `npm run docs:clean-dev` to clear cache

---

This process takes about **30-45 minutes** per comparison initially. With practice, you'll get it down to **15-20 minutes** per comparison.

**Goal:** Complete all 12 Phase 1 comparisons this week!
