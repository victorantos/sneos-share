<template>
  <div class="researcher-filter">
    <div class="filter-container">
      <div class="filter-header">
        <h3>🔬 Find AI Tools for Your Research</h3>
        <p>Select your research phase and discipline to discover relevant comparisons</p>
      </div>

      <div class="filter-controls">
        <!-- Research Phase Filter -->
        <div class="filter-group">
          <label for="research-phase">Research Phase</label>
          <select id="research-phase" v-model="selectedPhase" @change="updateResults">
            <option value="">All Phases</option>
            <option value="literature-review">Literature Review</option>
            <option value="research-design">Research Design</option>
            <option value="data-collection">Data Collection</option>
            <option value="data-analysis">Data Analysis</option>
            <option value="writing">Writing & Editing</option>
            <option value="citation">Citation Management</option>
            <option value="peer-review">Peer Review</option>
            <option value="grant-writing">Grant Writing</option>
          </select>
        </div>

        <!-- Discipline Filter -->
        <div class="filter-group">
          <label for="discipline">Academic Discipline</label>
          <select id="discipline" v-model="selectedDiscipline" @change="updateResults">
            <option value="">All Disciplines</option>
            <optgroup label="STEM">
              <option value="computer-science">Computer Science</option>
              <option value="data-science">Data Science</option>
              <option value="biology">Biology & Life Sciences</option>
              <option value="neuroscience">Neuroscience</option>
              <option value="physics">Physics</option>
              <option value="mathematics">Mathematics</option>
            </optgroup>
            <optgroup label="Social Sciences">
              <option value="psychology">Psychology</option>
              <option value="sociology">Sociology</option>
              <option value="economics">Economics</option>
              <option value="education">Education</option>
              <option value="political-science">Political Science</option>
            </optgroup>
            <optgroup label="Humanities">
              <option value="history">History</option>
              <option value="literature">Literature</option>
              <option value="philosophy">Philosophy</option>
              <option value="linguistics">Linguistics</option>
            </optgroup>
            <optgroup label="Professional">
              <option value="law">Law</option>
              <option value="medicine">Medicine</option>
              <option value="business">Business</option>
              <option value="engineering">Engineering</option>
            </optgroup>
          </select>
        </div>

        <!-- AI Model Filter -->
        <div class="filter-group">
          <label for="ai-model">Specific AI Model</label>
          <select id="ai-model" v-model="selectedModel" @change="updateResults">
            <option value="">All Models</option>
            <option value="chatgpt">ChatGPT (OpenAI)</option>
            <option value="claude">Claude (Anthropic)</option>
            <option value="gemini">Gemini (Google)</option>
            <option value="grok">Grok (xAI)</option>
            <option value="deepseek">DeepSeek</option>
            <option value="mistral">Mistral AI</option>
          </select>
        </div>

        <!-- Search Button -->
        <div class="filter-actions">
          <button @click="findComparisons" class="find-button">
            🔍 Find Comparisons
          </button>
          <button @click="resetFilters" class="reset-button">
            Reset
          </button>
        </div>
      </div>

      <!-- Results Section -->
      <div class="filter-results" v-if="showResults">
        <div class="results-header">
          <h4>{{ resultsCount }} Relevant Comparison{{ resultsCount !== 1 ? 's' : '' }} Found</h4>
        </div>

        <div class="results-grid" v-if="resultsCount > 0">
          <div class="result-card" v-for="result in displayedResults" :key="result.id">
            <div class="result-badge" :class="`badge-${result.phase}`">
              {{ formatPhase(result.phase) }}
            </div>
            <h5>
              <a :href="result.url">{{ result.title }}</a>
            </h5>
            <p class="result-description">{{ result.description }}</p>
            <div class="result-meta">
              <span class="result-models">{{ result.models.join(' vs ') }}</span>
              <span class="result-discipline">{{ result.discipline }}</span>
            </div>
          </div>
        </div>

        <div class="no-results" v-else>
          <p>No comparisons found for the selected criteria. Try adjusting your filters.</p>
          <p class="no-results-suggestion">
            <strong>Suggestion:</strong> Browse our
            <a href="/ai-library/research/">general research category</a> or
            <a href="/ai-library/academic-writing-and-publishing/">academic writing section</a>
            for related content.
          </p>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="quick-links">
        <h4>Popular Research Comparisons</h4>
        <div class="quick-links-grid">
          <a href="/ai-library/research/" class="quick-link">
            <span class="quick-link-icon">📚</span>
            <span>Research Tools</span>
          </a>
          <a href="/ai-library/academic-writing-and-publishing/" class="quick-link">
            <span class="quick-link-icon">✍️</span>
            <span>Academic Writing</span>
          </a>
          <a href="/ai-library/data-science-and-analytics/" class="quick-link">
            <span class="quick-link-icon">📊</span>
            <span>Data Analysis</span>
          </a>
          <a href="/ai-library/graduate-student-life-and-phd-journey/" class="quick-link">
            <span class="quick-link-icon">🎓</span>
            <span>PhD Journey</span>
          </a>
          <a href="/ai-library/lawyers/" class="quick-link">
            <span class="quick-link-icon">⚖️</span>
            <span>Legal Research</span>
          </a>
          <a href="/ai-library/healthcare/" class="quick-link">
            <span class="quick-link-icon">🏥</span>
            <span>Medical Research</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ResearcherFilter',
  data() {
    return {
      selectedPhase: '',
      selectedDiscipline: '',
      selectedModel: '',
      showResults: false,
      resultsCount: 0,
      displayedResults: []
    }
  },
  methods: {
    formatPhase(phase) {
      return phase
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    },

    updateResults() {
      // Auto-update when filters change
      if (this.selectedPhase || this.selectedDiscipline || this.selectedModel) {
        this.findComparisons();
      }
    },

    findComparisons() {
      // This is a simplified version. In production, this would query your actual comparison data
      this.showResults = true;

      // Mock results based on filters
      const mockResults = this.generateMockResults();
      this.displayedResults = mockResults;
      this.resultsCount = mockResults.length;
    },

    generateMockResults() {
      // Generate relevant mock results based on selected filters
      const results = [];

      // Base set of research-related comparisons
      const baseComparisons = [
        {
          id: 1,
          title: 'ChatGPT vs Claude vs Gemini: Literature Review',
          description: 'Comprehensive comparison for systematic literature reviews and research synthesis',
          models: ['ChatGPT', 'Claude', 'Gemini'],
          phase: 'literature-review',
          discipline: 'General',
          url: '/ai-library/research/'
        },
        {
          id: 2,
          title: 'Claude vs ChatGPT: Academic Writing Excellence',
          description: 'Which AI writes better academic prose and maintains scholarly tone?',
          models: ['Claude', 'ChatGPT'],
          phase: 'writing',
          discipline: 'Academic Writing',
          url: '/ai-library/academic-writing-and-publishing/'
        },
        {
          id: 3,
          title: 'ChatGPT vs Claude vs DeepSeek: Statistical Analysis',
          description: 'AI assistance for quantitative research and statistical computing',
          models: ['ChatGPT', 'Claude', 'DeepSeek'],
          phase: 'data-analysis',
          discipline: 'Data Science',
          url: '/ai-library/data-science-and-analytics/'
        },
        {
          id: 4,
          title: 'Gemini vs ChatGPT: Research Opportunities for Undergrads',
          description: 'Finding and securing research opportunities as an undergraduate student',
          models: ['Gemini', 'ChatGPT'],
          phase: 'research-design',
          discipline: 'Education',
          url: '/ai-library/research/'
        },
        {
          id: 5,
          title: 'Claude vs Gemini: Legal Research & Case Analysis',
          description: 'AI tools for legal research, case law analysis, and statutory interpretation',
          models: ['Claude', 'Gemini'],
          phase: 'literature-review',
          discipline: 'Law',
          url: '/ai-library/lawyers/'
        },
        {
          id: 6,
          title: 'ChatGPT vs Gemini: Grant Proposal Writing',
          description: 'AI assistance for writing compelling research grant proposals',
          models: ['ChatGPT', 'Gemini'],
          phase: 'grant-writing',
          discipline: 'General',
          url: '/ai-library/academic-career-development/'
        }
      ];

      // Filter based on selections
      return baseComparisons.filter(comp => {
        const phaseMatch = !this.selectedPhase || comp.phase === this.selectedPhase;
        const disciplineMatch = !this.selectedDiscipline ||
          comp.discipline.toLowerCase().includes(this.selectedDiscipline) ||
          comp.discipline === 'General';
        const modelMatch = !this.selectedModel ||
          comp.models.some(m => m.toLowerCase().includes(this.selectedModel));

        return phaseMatch && disciplineMatch && modelMatch;
      });
    },

    resetFilters() {
      this.selectedPhase = '';
      this.selectedDiscipline = '';
      this.selectedModel = '';
      this.showResults = false;
      this.resultsCount = 0;
      this.displayedResults = [];
    }
  }
}
</script>

<style scoped>
.researcher-filter {
  margin: 2rem 0;
}

.filter-container {
  background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
  border: 2px solid #0ea5e9;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.1);
}

.filter-header {
  text-align: center;
  margin-bottom: 2rem;
}

.filter-header h3 {
  color: #0c4a6e;
  font-size: 1.75rem;
  margin: 0 0 0.5rem 0;
}

.filter-header p {
  color: #475569;
  font-size: 1rem;
  margin: 0;
}

.filter-controls {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.filter-group label {
  font-weight: 600;
  color: #0c4a6e;
  font-size: 0.95rem;
}

.filter-group select {
  padding: 0.75rem;
  border: 2px solid #bae6fd;
  border-radius: 8px;
  background: white;
  font-size: 1rem;
  color: #334155;
  cursor: pointer;
  transition: all 0.2s ease;
}

.filter-group select:focus {
  outline: none;
  border-color: #0ea5e9;
  box-shadow: 0 0 0 3px rgba(14, 165, 233, 0.1);
}

.filter-actions {
  grid-column: 1 / -1;
  display: flex;
  gap: 1rem;
  justify-content: center;
  margin-top: 1rem;
}

.find-button,
.reset-button {
  padding: 0.875rem 2rem;
  border: none;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.find-button {
  background: #0ea5e9;
  color: white;
}

.find-button:hover {
  background: #0284c7;
  transform: translateY(-2px);
  box-shadow: 0 6px 16px rgba(14, 165, 233, 0.3);
}

.reset-button {
  background: white;
  color: #64748b;
  border: 2px solid #cbd5e1;
}

.reset-button:hover {
  background: #f8fafc;
  border-color: #94a3b8;
}

.filter-results {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #bae6fd;
}

.results-header h4 {
  color: #0c4a6e;
  font-size: 1.25rem;
  margin: 0 0 1.5rem 0;
}

.results-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1.5rem;
}

.result-card {
  background: white;
  border: 1px solid #e0f2fe;
  border-radius: 8px;
  padding: 1.5rem;
  transition: all 0.2s ease;
}

.result-card:hover {
  border-color: #0ea5e9;
  box-shadow: 0 4px 12px rgba(14, 165, 233, 0.15);
  transform: translateY(-2px);
}

.result-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 600;
  margin-bottom: 0.75rem;
}

.badge-literature-review { background: #dbeafe; color: #1e40af; }
.badge-data-analysis { background: #dcfce7; color: #166534; }
.badge-writing { background: #fef3c7; color: #92400e; }
.badge-grant-writing { background: #fce7f3; color: #9f1239; }
.badge-research-design { background: #f3e8ff; color: #6b21a8; }
.badge-citation { background: #e0e7ff; color: #3730a3; }

.result-card h5 {
  margin: 0 0 0.5rem 0;
  font-size: 1.1rem;
  line-height: 1.4;
}

.result-card h5 a {
  color: #0c4a6e;
  text-decoration: none;
}

.result-card h5 a:hover {
  color: #0ea5e9;
  text-decoration: underline;
}

.result-description {
  color: #64748b;
  font-size: 0.9rem;
  line-height: 1.5;
  margin: 0 0 1rem 0;
}

.result-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  font-size: 0.85rem;
}

.result-models {
  color: #0ea5e9;
  font-weight: 600;
}

.result-discipline {
  color: #94a3b8;
}

.no-results {
  text-align: center;
  padding: 3rem 1rem;
}

.no-results p {
  color: #64748b;
  font-size: 1.1rem;
  margin: 0.5rem 0;
}

.no-results-suggestion {
  margin-top: 1.5rem;
  padding: 1rem;
  background: #fffbeb;
  border-radius: 8px;
  border-left: 4px solid #f59e0b;
}

.no-results-suggestion a {
  color: #ea580c;
  font-weight: 600;
  text-decoration: none;
}

.no-results-suggestion a:hover {
  text-decoration: underline;
}

.quick-links {
  margin-top: 2rem;
  padding-top: 2rem;
  border-top: 2px solid #bae6fd;
}

.quick-links h4 {
  color: #0c4a6e;
  font-size: 1.25rem;
  margin: 0 0 1rem 0;
  text-align: center;
}

.quick-links-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
}

.quick-link {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
  padding: 1rem;
  background: white;
  border: 2px solid #e0f2fe;
  border-radius: 8px;
  text-decoration: none;
  color: #0c4a6e;
  font-weight: 600;
  transition: all 0.2s ease;
  text-align: center;
}

.quick-link:hover {
  border-color: #0ea5e9;
  background: #f0f9ff;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(14, 165, 233, 0.15);
}

.quick-link-icon {
  font-size: 2rem;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .filter-container {
    padding: 1.5rem;
  }

  .filter-controls {
    grid-template-columns: 1fr;
    gap: 1rem;
  }

  .filter-actions {
    flex-direction: column;
  }

  .find-button,
  .reset-button {
    width: 100%;
  }

  .results-grid {
    grid-template-columns: 1fr;
  }

  .quick-links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .filter-container {
    background: linear-gradient(135deg, #0c4a6e 0%, #075985 100%);
    border-color: #0ea5e9;
  }

  .filter-header h3,
  .filter-group label,
  .results-header h4,
  .quick-links h4 {
    color: #bae6fd;
  }

  .filter-header p {
    color: #cbd5e1;
  }

  .filter-group select {
    background: #1e293b;
    border-color: #334155;
    color: #e2e8f0;
  }

  .reset-button {
    background: #1e293b;
    color: #cbd5e1;
    border-color: #334155;
  }

  .reset-button:hover {
    background: #334155;
  }

  .filter-results {
    border-top-color: #334155;
  }

  .result-card {
    background: #1e293b;
    border-color: #334155;
  }

  .result-card:hover {
    border-color: #0ea5e9;
  }

  .result-card h5 a {
    color: #bae6fd;
  }

  .result-card h5 a:hover {
    color: #7dd3fc;
  }

  .result-description {
    color: #94a3b8;
  }

  .no-results p {
    color: #94a3b8;
  }

  .quick-links {
    border-top-color: #334155;
  }

  .quick-link {
    background: #1e293b;
    border-color: #334155;
    color: #bae6fd;
  }

  .quick-link:hover {
    border-color: #0ea5e9;
    background: #0c4a6e;
  }
}
</style>
