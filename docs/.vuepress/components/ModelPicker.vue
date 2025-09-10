<template>
  <div class="model-picker">
    <h3>AI Model Recommendation Tool</h3>
    <p class="subtitle">Answer a few questions to get personalized AI model recommendations</p>
    
    <div class="question-container">
      <div class="question">
        <h4>What's your primary use case?</h4>
        <div class="options">
          <label v-for="option in useCaseOptions" :key="option.value">
            <input 
              type="radio" 
              v-model="selectedUseCase" 
              :value="option.value"
            >
            <span class="option-text">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <div class="question" v-if="selectedUseCase">
        <h4>What's your budget range?</h4>
        <div class="options">
          <label v-for="option in budgetOptions" :key="option.value">
            <input 
              type="radio" 
              v-model="selectedBudget" 
              :value="option.value"
            >
            <span class="option-text">{{ option.label }}</span>
          </label>
        </div>
      </div>

      <div class="question" v-if="selectedBudget">
        <h4>What's most important to you?</h4>
        <div class="options">
          <label v-for="option in priorityOptions" :key="option.value">
            <input 
              type="radio" 
              v-model="selectedPriority" 
              :value="option.value"
            >
            <span class="option-text">{{ option.label }}</span>
          </label>
        </div>
      </div>
    </div>

    <div v-if="recommendation" class="recommendation">
      <h4>🎯 Our Recommendation</h4>
      <div class="recommended-model">
        <h5>{{ recommendation.model }}</h5>
        <p>{{ recommendation.reason }}</p>
        <div class="model-details">
          <span class="price">{{ recommendation.price }}</span>
          <span class="use-case">Best for: {{ recommendation.bestFor }}</span>
        </div>
        <a :href="recommendation.link" class="cta-button" target="_blank">
          Try {{ recommendation.model }}
        </a>
      </div>

      <div v-if="recommendation.alternatives.length > 0" class="alternatives">
        <h6>Other good options:</h6>
        <ul>
          <li v-for="alt in recommendation.alternatives" :key="alt">
            {{ alt }}
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModelPicker',
  data() {
    return {
      selectedUseCase: '',
      selectedBudget: '',
      selectedPriority: '',
      useCaseOptions: [
        { value: 'writing', label: 'Content writing & blogging' },
        { value: 'coding', label: 'Programming & development' },
        { value: 'analysis', label: 'Data analysis & research' },
        { value: 'general', label: 'General tasks & conversations' },
        { value: 'business', label: 'Business & productivity' }
      ],
      budgetOptions: [
        { value: 'free', label: 'Free (limited usage)' },
        { value: 'low', label: '$10-25/month' },
        { value: 'medium', label: '$25-100/month' },
        { value: 'high', label: '$100+/month' }
      ],
      priorityOptions: [
        { value: 'speed', label: 'Fast response times' },
        { value: 'quality', label: 'High-quality outputs' },
        { value: 'cost', label: 'Low cost per use' },
        { value: 'features', label: 'Advanced features' }
      ]
    }
  },
  computed: {
    recommendation() {
      if (!this.selectedUseCase || !this.selectedBudget || !this.selectedPriority) {
        return null;
      }

      const key = `${this.selectedUseCase}-${this.selectedBudget}-${this.selectedPriority}`;
      return this.getRecommendation(key);
    }
  },
  methods: {
    getRecommendation(key) {
      // Simplified recommendation logic
      const recommendations = {
        'writing-free-quality': {
          model: 'Claude (Free)',
          reason: 'Claude offers excellent writing quality even in the free tier, perfect for content creation.',
          price: 'Free with limits',
          bestFor: 'High-quality writing',
          link: 'https://claude.ai',
          alternatives: ['ChatGPT (Free)', 'Gemini']
        },
        'coding-low-speed': {
          model: 'ChatGPT Plus',
          reason: 'ChatGPT excels at coding tasks with fast response times and excellent code generation.',
          price: '$20/month',
          bestFor: 'Programming assistance',
          link: 'https://app.sneos.com',
          alternatives: ['GitHub Copilot', 'Claude Pro']
        },
        'analysis-medium-quality': {
          model: 'Claude Pro',
          reason: 'Claude handles long documents and complex analysis exceptionally well.',
          price: '$20/month',
          bestFor: 'Data analysis & research',
          link: 'https://app.sneos.com',
          alternatives: ['GPT-4 API', 'Gemini Advanced']
        }
        // Add more combinations as needed
      };

      return recommendations[key] || {
        model: 'ChatGPT Plus',
        reason: 'A versatile choice that works well for most use cases and budgets.',
        price: '$20/month',
        bestFor: 'General purpose AI assistant',
        link: 'https://app.sneos.com',
        alternatives: ['Claude Pro', 'Gemini Advanced']
      };
    }
  }
}
</script>

<style scoped>
.model-picker {
  background: var(--c-bg-light);
  border-radius: 12px;
  padding: 2rem;
  margin: 2rem 0;
  border: 1px solid var(--c-border);
}

.subtitle {
  color: var(--c-text-light);
  margin-bottom: 2rem;
}

.question {
  margin-bottom: 2rem;
}

.question h4 {
  margin-bottom: 1rem;
  color: var(--c-text);
}

.options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.options label {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem;
  border-radius: 8px;
  border: 1px solid var(--c-border);
  transition: all 0.2s;
}

.options label:hover {
  background-color: var(--c-bg-lighter);
}

.options input[type="radio"] {
  margin-right: 0.75rem;
}

.recommendation {
  margin-top: 2rem;
  padding: 1.5rem;
  background: var(--c-bg);
  border-radius: 8px;
  border-left: 4px solid #10b981;
}

.recommended-model h5 {
  color: #10b981;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
}

.model-details {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.price, .use-case {
  background: var(--c-bg-light);
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-size: 0.85rem;
}

.cta-button {
  display: inline-block;
  background: #10b981;
  color: white;
  padding: 0.75rem 1.5rem;
  border-radius: 6px;
  text-decoration: none;
  font-weight: 500;
  margin-top: 1rem;
  transition: background 0.2s;
}

.cta-button:hover {
  background: #059669;
}

.alternatives {
  margin-top: 1rem;
  padding-top: 1rem;
  border-top: 1px solid var(--c-border);
}

.alternatives h6 {
  margin-bottom: 0.5rem;
  color: var(--c-text-light);
}

.alternatives ul {
  list-style: none;
  padding: 0;
}

.alternatives li {
  padding: 0.25rem 0;
  color: var(--c-text-light);
}

@media (max-width: 768px) {
  .model-picker {
    padding: 1rem;
  }
  
  .model-details {
    flex-direction: column;
  }
}
</style>