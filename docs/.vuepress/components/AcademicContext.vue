<template>
  <div class="academic-context-wrapper">
    <!-- Academic Context Box -->
    <div class="academic-context-box">
      <div class="context-header">
        <h2>📚 For Researchers</h2>
      </div>

      <!-- Research Use Cases -->
      <div class="research-relevance" v-if="useCases && Object.keys(useCases).length > 0">
        <h3>Research Use Cases:</h3>
        <ul>
          <li v-for="(rating, useCase) in useCases" :key="useCase">
            {{ formatUseCase(useCase) }}:
            <span class="rating" :class="`rating-${rating}`">
              {{ getStars(rating) }} {{ getRatingText(rating) }}
            </span>
          </li>
        </ul>
      </div>

      <!-- Academic Concerns -->
      <div class="academic-concerns" v-if="concerns && concerns.length > 0">
        <h3>Key Considerations for Academics:</h3>
        <ul>
          <li v-for="(concern, index) in concerns" :key="index">
            <span :class="concern.type === 'positive' ? 'icon-positive' : concern.type === 'warning' ? 'icon-warning' : 'icon-info'">
              {{ concern.type === 'positive' ? '✅' : concern.type === 'warning' ? '⚠️' : 'ℹ️' }}
            </span>
            {{ concern.text }}
          </li>
        </ul>
      </div>

      <!-- Citation Section -->
      <div class="cite-this" v-if="showCitation">
        <h3>Cite This Comparison:</h3>
        <div class="citation-box">
          <code class="citation-text">{{ getCitation() }}</code>
          <button @click="copyCitation" class="copy-button" :class="{ 'copied': citationCopied }">
            {{ citationCopied ? '✓ Copied' : 'Copy Citation' }}
          </button>
        </div>
        <div class="citation-formats">
          <button
            v-for="format in ['APA', 'MLA', 'Chicago']"
            :key="format"
            @click="changeCitationFormat(format)"
            class="format-button"
            :class="{ 'active': citationFormat === format }"
          >
            {{ format }}
          </button>
        </div>
      </div>

      <!-- Research Methodology Link -->
      <div class="methodology-link" v-if="showMethodology">
        <p>
          <strong>Research Methodology:</strong>
          <a href="/ai-library/researchers/methodology/" target="_blank">View our systematic evaluation framework</a>
        </p>
      </div>
    </div>

    <!-- Slot for ChatComparison component -->
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'AcademicContext',
  props: {
    title: {
      type: String,
      required: true
    },
    useCases: {
      type: Object,
      default: () => ({})
      // Example: { 'literature-review': 5, 'data-analysis': 3, 'academic-writing': 4 }
    },
    concerns: {
      type: Array,
      default: () => []
      // Example: [
      //   { type: 'positive', text: 'Data Privacy: Your research remains confidential' },
      //   { type: 'warning', text: 'Citation Accuracy: Always verify AI-generated citations' }
      // ]
    },
    showCitation: {
      type: Boolean,
      default: true
    },
    showMethodology: {
      type: Boolean,
      default: true
    },
    date: {
      type: String,
      default: () => new Date().getFullYear().toString()
    },
    pageUrl: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      citationCopied: false,
      citationFormat: 'APA'
    }
  },
  methods: {
    formatUseCase(useCase) {
      // Convert kebab-case to Title Case
      return useCase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },

    getStars(rating) {
      const fullStars = '⭐'.repeat(rating);
      const emptyStars = '☆'.repeat(5 - rating);
      return fullStars + emptyStars;
    },

    getRatingText(rating) {
      const texts = {
        5: '(Excellent)',
        4: '(Very Good)',
        3: '(Good)',
        2: '(Limited)',
        1: '(Poor)'
      };
      return texts[rating] || '';
    },

    getCitation() {
      const year = this.date || new Date().getFullYear();
      const url = this.pageUrl || (typeof window !== 'undefined' ? window.location.href : 'https://share.sneos.com');

      // Format based on selected citation style
      switch (this.citationFormat) {
        case 'APA':
          return `SNEOS Community. (${year}). ${this.title}: A comparative analysis for academic research. SNEOS AI Library. ${url}`;
        case 'MLA':
          return `"${this.title}: A Comparative Analysis for Academic Research." SNEOS AI Library, SNEOS Community, ${year}, ${url}.`;
        case 'Chicago':
          return `SNEOS Community. "${this.title}: A Comparative Analysis for Academic Research." SNEOS AI Library. ${year}. ${url}.`;
        default:
          return `SNEOS Community. (${year}). ${this.title}. SNEOS AI Library. ${url}`;
      }
    },

    copyCitation() {
      const citation = this.getCitation();
      if (typeof navigator !== 'undefined' && navigator.clipboard) {
        navigator.clipboard.writeText(citation).then(() => {
          this.citationCopied = true;
          setTimeout(() => {
            this.citationCopied = false;
          }, 2000);
        });
      }
    },

    changeCitationFormat(format) {
      this.citationFormat = format;
    }
  }
}
</script>

<style scoped>
.academic-context-wrapper {
  margin: 2rem 0;
}

.academic-context-box {
  background: linear-gradient(135deg, #f8f9ff 0%, #f0f4ff 100%);
  border: 2px solid #4f46e5;
  border-radius: 12px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.1);
}

.context-header h2 {
  margin: 0 0 1.5rem 0;
  color: #4f46e5;
  font-size: 1.75rem;
  font-weight: 700;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.research-relevance,
.academic-concerns,
.cite-this,
.methodology-link {
  margin: 1.5rem 0;
}

.research-relevance h3,
.academic-concerns h3,
.cite-this h3 {
  color: #312e81;
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0 0 0.75rem 0;
}

.research-relevance ul,
.academic-concerns ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.research-relevance li,
.academic-concerns li {
  padding: 0.75rem;
  margin: 0.5rem 0;
  background: white;
  border-radius: 8px;
  border-left: 4px solid #4f46e5;
  font-size: 1rem;
  line-height: 1.6;
}

.rating {
  font-weight: 600;
  margin-left: 0.5rem;
}

.rating-5 { color: #16a34a; }
.rating-4 { color: #65a30d; }
.rating-3 { color: #eab308; }
.rating-2 { color: #f97316; }
.rating-1 { color: #dc2626; }

.icon-positive { color: #16a34a; }
.icon-warning { color: #f59e0b; }
.icon-info { color: #3b82f6; }

.cite-this {
  background: white;
  padding: 1.5rem;
  border-radius: 8px;
  border: 1px solid #e0e7ff;
}

.citation-box {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.citation-text {
  flex: 1;
  background: #f8fafc;
  padding: 1rem;
  border-radius: 6px;
  border: 1px solid #cbd5e1;
  font-size: 0.9rem;
  line-height: 1.6;
  color: #334155;
  font-family: 'Courier New', monospace;
  word-wrap: break-word;
  min-width: 250px;
}

.copy-button {
  background: #4f46e5;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.copy-button:hover {
  background: #4338ca;
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(79, 70, 229, 0.2);
}

.copy-button.copied {
  background: #16a34a;
}

.citation-formats {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.75rem;
}

.format-button {
  background: white;
  color: #4f46e5;
  border: 1px solid #4f46e5;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-size: 0.875rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.format-button:hover {
  background: #f0f4ff;
}

.format-button.active {
  background: #4f46e5;
  color: white;
}

.methodology-link {
  background: #fffbeb;
  border-left: 4px solid #f59e0b;
  padding: 1rem;
  border-radius: 6px;
}

.methodology-link p {
  margin: 0;
  color: #78350f;
  font-size: 0.95rem;
  line-height: 1.6;
}

.methodology-link a {
  color: #ea580c;
  text-decoration: none;
  font-weight: 600;
}

.methodology-link a:hover {
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .academic-context-box {
    padding: 1.5rem;
  }

  .context-header h2 {
    font-size: 1.5rem;
  }

  .citation-box {
    flex-direction: column;
  }

  .copy-button {
    width: 100%;
  }

  .citation-formats {
    flex-wrap: wrap;
  }

  .format-button {
    flex: 1;
    min-width: 80px;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .academic-context-box {
    background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%);
    border-color: #6366f1;
  }

  .context-header h2 {
    color: #a5b4fc;
  }

  .research-relevance h3,
  .academic-concerns h3,
  .cite-this h3 {
    color: #e0e7ff;
  }

  .research-relevance li,
  .academic-concerns li {
    background: #1e293b;
    border-left-color: #6366f1;
    color: #e2e8f0;
  }

  .cite-this {
    background: #1e293b;
    border-color: #334155;
  }

  .citation-text {
    background: #0f172a;
    border-color: #334155;
    color: #cbd5e1;
  }

  .copy-button {
    background: #6366f1;
  }

  .copy-button:hover {
    background: #4f46e5;
  }

  .format-button {
    background: #1e293b;
    color: #a5b4fc;
    border-color: #6366f1;
  }

  .format-button:hover {
    background: #334155;
  }

  .format-button.active {
    background: #6366f1;
    color: white;
  }

  .methodology-link {
    background: #422006;
    border-left-color: #f59e0b;
  }

  .methodology-link p {
    color: #fef3c7;
  }

  .methodology-link a {
    color: #fb923c;
  }
}
</style>
