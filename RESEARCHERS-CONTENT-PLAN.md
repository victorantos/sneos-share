# Researchers Section - Content Generation Plan

## 📊 Current Status

### ✅ What's Built (Structure)
- **Vue Components**: AcademicContext.vue, ResearcherFilter.vue
- **Landing Page**: /ai-library/researchers/README.md
- **Category Pages**: 5 subdirectories (literature-review, data-analysis, legal-research, medical-research, social-science-research)
- **Methodology Page**: /ai-library/researchers/methodology/README.md
- **Example Comparison**: Full academic wrapper demonstration
- **Navigation**: "For Researchers" in navbar

### ⚠️ What's Missing (Content)

#### 1. **Broken/Missing Links in Landing Page**
The main researchers landing page references many comparisons that don't exist:

**Featured Comparisons Section:**
- ❌ ChatGPT vs Claude vs Gemini: Literature Review Tools
- ❌ Semantic Scholar AI vs Google Scholar
- ❌ Best AI for Qualitative Data Analysis
- ❌ ChatGPT vs Claude vs Gemini: Academic Writing
- ❌ Grammarly vs Paperpal vs Trinka
- ❌ AI Plagiarism Checkers Compared
- ❌ ChatGPT vs Claude: Statistical Analysis
- ❌ ChatGPT vs Claude vs Gemini: Python for Research
- ❌ AI Tools for Data Visualization

**Browse by Discipline Links** - These link to existing categories but lack researcher-focused content:
- Partially populated: /ai-library/research/ (20 files exist)
- Needs more: /ai-library/academic-writing-and-publishing/
- Needs more: /ai-library/data-science-and-analytics/
- Existing: /ai-library/graduate-student-life-and-phd-journey/

#### 2. **Category Pages with Placeholder Content**

**literature-review/README.md:**
- ✅ Has full ChatComparison example embedded
- ❌ Links to non-existent "Related Resources" comparisons

**data-analysis/README.md:**
- ❌ No embedded comparisons (all text only)
- ❌ Example use cases reference non-existent pages

**legal-research/README.md:**
- ❌ No embedded comparisons
- ❌ Tool comparison table needs actual comparison links

**medical-research/README.md:**
- ❌ No embedded comparisons
- ❌ Specialized tools section needs comparison links

**social-science-research/README.md:**
- ❌ No embedded comparisons
- ❌ All examples are theoretical

#### 3. **ResearcherFilter Component**
- Uses mock data (`generateMockResults()`)
- ❌ Needs real comparison data integration
- ❌ Needs backend/static JSON file to query actual comparisons

---

## 🎯 Priority Action Plan

### **Phase 1: Core Comparisons (Week 1)** - CRITICAL
Create the 12 most important comparisons referenced in landing page:

| Priority | Comparison | File Name | Models | Wrapper |
|----------|-----------|-----------|--------|---------|
| 🔴 HIGH | Literature Review: Comprehensive Guide | `chatgpt-vs-claude-vs-gemini-literature-review-comprehensive.md` | ChatGPT, Claude, Gemini | YES |
| 🔴 HIGH | Academic Writing Excellence | `chatgpt-vs-claude-vs-gemini-academic-writing-excellence.md` | ChatGPT, Claude, Gemini | YES |
| 🔴 HIGH | Statistical Analysis for Researchers | `chatgpt-vs-claude-statistical-analysis-researchers.md` | ChatGPT, Claude | YES |
| 🔴 HIGH | Python for Research Computing | `chatgpt-vs-claude-vs-gemini-python-research-computing.md` | ChatGPT, Claude, Gemini | YES |
| 🔴 HIGH | Qualitative Data Analysis Tools | `chatgpt-vs-claude-qualitative-data-analysis.md` | ChatGPT, Claude | YES |
| 🟡 MED | Systematic Review Protocol Design | `chatgpt-vs-claude-systematic-review-protocol.md` | ChatGPT, Claude | YES |
| 🟡 MED | Grant Proposal Writing (NIH R01) | `chatgpt-vs-claude-vs-gemini-grant-proposal-nih-r01.md` | ChatGPT, Claude, Gemini | YES |
| 🟡 MED | Legal Case Analysis | `claude-vs-chatgpt-legal-case-analysis.md` | Claude, ChatGPT | YES |
| 🟡 MED | Mixed Methods Integration | `claude-vs-chatgpt-mixed-methods-integration.md` | Claude, ChatGPT | YES |
| 🟢 LOW | Data Visualization Publication-Ready | `chatgpt-vs-claude-data-visualization-publication.md` | ChatGPT, Claude | YES |
| 🟢 LOW | Medical Systematic Review PRISMA | `chatgpt-vs-claude-medical-systematic-review-prisma.md` | ChatGPT, Claude | YES |
| 🟢 LOW | Interview Study Design | `claude-vs-chatgpt-interview-study-design.md` | Claude, ChatGPT | YES |

### **Phase 2: Category Page Comparisons (Week 2)** - IMPORTANT
Add 2-3 embedded comparisons to each category page:

**Literature Review Category:**
- Meta-analysis guidance
- Citation management comparison
- Database search strategies

**Data Analysis Category:**
- Regression modeling
- Qualitative coding
- Survey analysis

**Legal Research Category:**
- Statutory interpretation
- Law review article writing

**Medical Research Category:**
- Clinical trial protocol
- Diagnostic accuracy study

**Social Science Research Category:**
- Interview study design
- Survey design
- Ethnographic study planning

### **Phase 3: Extended Library (Weeks 3-4)** - COMPREHENSIVE
Generate 50+ comparisons from CSV covering:
- All research methods subcategories
- Discipline-specific workflows
- Tool comparisons
- Ethics and IRB guidance
- Career development (postdoc, faculty job market)

---

## 🔧 Implementation Strategy

### Option 1: Manual Creation (High Quality, Slow)

**Process:**
1. Pick comparison from CSV
2. Go to SNEOS.com
3. Input prompt to all 3 models
4. Copy responses
5. Create markdown file with AcademicContext wrapper
6. Add to appropriate category
7. Update internal links

**Time Estimate:** ~1 hour per comparison
**Best For:** Phase 1 high-priority comparisons

### Option 2: Automated Bulk Generation (Fast, Review Needed)

**Process:**
1. Use SNEOS automation API/script
2. Run all queries from CSV against 3 models
3. Auto-generate markdown files with templates
4. Review and edit for accuracy
5. Add academic context parameters
6. Batch commit to repository

**Time Estimate:** ~5-10 minutes per comparison after setup
**Best For:** Phases 2 and 3

### Option 3: Hybrid Approach (RECOMMENDED)

**Week 1:**
- Manually create 12 Phase 1 comparisons (high quality, reviewed)
- Ensure they're perfect examples with full academic wrappers

**Week 2:**
- Set up automation for Phase 2 (category pages)
- Generate, review, publish 15-20 comparisons
- Embed best ones in category pages

**Weeks 3-4:**
- Bulk generate Phase 3 content
- Quick review for errors
- Publish in batches
- Update ResearcherFilter with real data

---

## 📝 File Structure & Naming

### Comparison File Location
```
docs/ai-library/researchers/comparisons/YYYY-MM-DD-title-slug-XXXX.md
```

OR integrate into existing structure:
```
docs/compare/YYYY-MM-DD-title-slug-XXXX.md
```
(with tags: researchers, academic, specific-category)

### File Template
```markdown
---
title: "Comparison Title"
description: "AI model comparison: [prompt summary]"
date: 2025-10-14
category: researchers
subcategory: literature-review  # or data-analysis, legal-research, etc.
layout: Clean
tags:
  - ChatGPT
  - Claude
  - Gemini
  - [specific tag]
author: SNEOS Community
---

# Title

**Published**: October 14, 2025
**Models Compared**: ChatGPT, Claude, Gemini
**Research Area**: [Literature Review | Data Analysis | etc.]

---

<AcademicContext
  title="Comparison Title"
  :useCases='{
    "literature-review": 5,
    "data-analysis": 4,
    "academic-writing": 3
  }'
  :concerns='[
    { type: "warning", text: "Always verify citations" },
    { type: "positive", text: "Excellent for X" },
    { type: "info", text: "Consider Y" }
  ]'
  :showCitation="true"
  :showMethodology="true"
  date="2025"
>

<ChatComparison
  title="Comparison Title"
  prompt="[Full prompt here]"
  :responses='{
    "ChatGPT": "[Response]",
    "Claude": "[Response]",
    "Gemini": "[Response]"
  }'
  publishedDate="October 14, 2025"
/>

</AcademicContext>

---

## Key Takeaways

**Best Use Cases by Model:**
- **ChatGPT**: [What it's best for]
- **Claude**: [What it's best for]
- **Gemini**: [What it's best for]

## Related Resources
- [Other comparison link]
- [Category page link]
```

---

## 🔗 Linking Strategy

### Update Landing Page
After creating comparisons, update `/ai-library/researchers/README.md`:

```markdown
### Featured Comparisons for Researchers

#### Literature Review & Research Discovery
- [✓ ChatGPT vs Claude vs Gemini: Literature Review](/ai-library/researchers/comparisons/2025-10-14-literature-review-comprehensive-XXXX/)
- [✓ Best AI for Qualitative Data Analysis](/ai-library/researchers/comparisons/2025-10-14-qualitative-data-analysis-XXXX/)
```

### Update Category Pages
Embed comparisons in category pages:

```markdown
## 📊 Key Comparisons

### ChatGPT vs Claude vs Gemini: Literature Review Capabilities

<ChatComparison
  title="..."
  prompt="..."
  :responses='{...}'
/>
```

OR link to separate comparison pages:

```markdown
## 📊 Key Comparisons

**Full Comparisons:**
- [Literature Review: Comprehensive Guide](/ai-library/researchers/comparisons/...)
- [Citation Management Tools](/ai-library/researchers/comparisons/...)
```

---

## 🎯 Success Metrics

### Week 1 Goals:
- ✅ 12 Phase 1 comparisons published
- ✅ Landing page links updated (no more 404s)
- ✅ Test on dev server

### Week 2 Goals:
- ✅ 15-20 Phase 2 comparisons published
- ✅ Each category page has 2-3 embedded examples
- ✅ ResearcherFilter updated with real data

### Week 3-4 Goals:
- ✅ 50+ total comparisons published
- ✅ All CSV queries processed
- ✅ Full researchers section operational

### SEO Tracking (Month 1):
- Organic traffic to /ai-library/researchers/
- Keyword rankings for target terms
- Backlinks from .edu domains
- Time on page and bounce rate

---

## 🚀 Quick Start Commands

### Generate Comparison with SNEOS

**Manual via Web:**
1. Go to https://sneos.com
2. Paste prompt from CSV
3. Run against ChatGPT, Claude, Gemini
4. Copy responses
5. Create markdown file from template above

**Automated (if you have API access):**
```bash
# Navigate to automation directory
cd /Users/victora/Projects/SneosAutomation/

# Run bulk generation script (if exists)
node generate-comparisons.js --input ai-comparison-queries-researchers-section.csv --output ../SneoScom/sneos-share/docs/ai-library/researchers/comparisons/ --models chatgpt,claude,gemini --wrapper academic
```

### Test Locally
```bash
cd /Users/victora/Projects/SneoScom/sneos-share
npm run docs:dev
# Visit: http://localhost:8080/ai-library/researchers/
```

### Deploy
```bash
npm run build
git add .
git commit -m "feat: Add [X] researcher comparisons to populate section"
git push origin main
```

---

## 📋 CSV Query Usage

The CSV file `ai-comparison-queries-researchers-section.csv` contains:
- **80+ research-focused queries**
- Organized by category matching your researchers section
- Priority marked (HIGH, MEDIUM, LOW)
- Target audience specified
- Academic wrapper flag set

**Columns:**
- `category`: Main research area
- `subcategory`: Specific topic
- `query`: Full prompt to use
- `target_audience`: Who this helps
- `priority`: HIGH/MEDIUM/LOW for phasing
- `use_academic_wrapper`: TRUE/FALSE
- `notes`: Context about the comparison

**Usage:**
1. Sort by priority (HIGH first)
2. Run queries through SNEOS.com
3. Generate comparisons using template
4. Add academic wrapper context based on category
5. Save with consistent naming convention

---

## 💡 Academic Wrapper Configuration Guide

### Use Case Ratings
Rate 1-5 stars for:
- `literature-review`: Finding and synthesizing papers
- `research-synthesis`: Combining findings
- `citation-management`: Bibliography handling
- `academic-writing`: Manuscript drafting
- `data-extraction`: Pulling data from papers
- `data-analysis`: Statistical/qualitative analysis
- `methodology-design`: Study planning
- `grant-writing`: Proposal writing

### Concerns Array
Types:
- `warning`: Critical issues (citation accuracy, verification needed)
- `positive`: Strengths (time savings, privacy protection)
- `info`: General information (university policies, best practices)

**Common Warnings:**
```javascript
{ type: "warning", text: "Citation Accuracy: Always verify AI-generated citations manually using PubMed or Google Scholar" }
{ type: "warning", text: "Knowledge Cutoff: AI models have training data cutoffs. Supplement with current literature searches" }
{ type: "warning", text: "HIPAA Compliance: Never input protected health information. De-identify all data" }
```

**Common Positives:**
```javascript
{ type: "positive", text: "Time Savings: Researchers report 40-60% reduction in initial analysis time" }
{ type: "positive", text: "Data Privacy: Paid accounts (ChatGPT Plus, Claude Pro) do not train on your data" }
{ type: "positive", text: "Iterative Refinement: AI excels at improving draft quality through multiple rounds" }
```

---

## 🎨 Quality Checklist

Before publishing each comparison:

### Content Quality
- [ ] Prompt is clear and realistic for target audience
- [ ] All 3 model responses are complete (no truncation)
- [ ] Responses demonstrate different strengths
- [ ] Academic tone maintained throughout
- [ ] Technical accuracy verified

### Academic Wrapper
- [ ] Use case ratings appropriate for the task
- [ ] At least 3 concerns listed (warnings, positives, info)
- [ ] Citation format correct
- [ ] Methodology link included
- [ ] Date and URL accurate

### Formatting
- [ ] Frontmatter complete (title, description, date, tags)
- [ ] Layout set to "Clean"
- [ ] Proper markdown syntax (no broken formatting)
- [ ] Code blocks use correct language tags
- [ ] Tables formatted properly

### Links & Navigation
- [ ] Internal links work (no 404s)
- [ ] Related resources section populated
- [ ] Category tag correct
- [ ] File naming convention followed

### SEO
- [ ] Title includes target keywords
- [ ] Description is compelling and keyword-rich
- [ ] Tags include relevant academic terms
- [ ] URL slug is clean and descriptive

---

This plan provides everything needed to populate the researchers section. Start with Phase 1 (12 comparisons), test locally, then scale to Phases 2 and 3!
