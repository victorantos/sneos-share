<template>
  <div class="comparison-table">
    <h3>{{ title }}</h3>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th>Feature</th>
            <th v-for="model in models" :key="model.name">
              {{ model.name }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="feature in features" :key="feature.name">
            <td class="feature-name">{{ feature.name }}</td>
            <td v-for="model in models" :key="model.name" class="feature-value">
              <span :class="getRatingClass(feature.values[model.id])">
                {{ feature.values[model.id] }}
              </span>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ComparisonTable',
  props: {
    title: {
      type: String,
      default: 'Model Comparison'
    },
    models: {
      type: Array,
      required: true,
      // Expected format: [{ id: 'gpt4', name: 'GPT-4' }, ...]
    },
    features: {
      type: Array,
      required: true,
      // Expected format: [{ name: 'Speed', values: { gpt4: 'Fast', claude: 'Moderate' } }, ...]
    }
  },
  methods: {
    getRatingClass(value) {
      const lowerValue = value.toLowerCase();
      if (lowerValue.includes('excellent') || lowerValue.includes('very high')) {
        return 'rating-excellent';
      }
      if (lowerValue.includes('good') || lowerValue.includes('high') || lowerValue.includes('fast')) {
        return 'rating-good';
      }
      if (lowerValue.includes('moderate') || lowerValue.includes('medium')) {
        return 'rating-moderate';
      }
      if (lowerValue.includes('poor') || lowerValue.includes('slow') || lowerValue.includes('low')) {
        return 'rating-poor';
      }
      return 'rating-neutral';
    }
  }
}
</script>

<style scoped>
.comparison-table {
  margin: 1.5rem 0;
}

.table-responsive {
  overflow-x: auto;
  margin: 1rem 0;
}

table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid var(--c-border);
  border-radius: 8px;
  overflow: hidden;
}

th, td {
  padding: 0.75rem 1rem;
  text-align: left;
  border-bottom: 1px solid var(--c-border);
}

th {
  background-color: var(--c-bg-light);
  font-weight: 600;
  font-size: 0.9rem;
}

.feature-name {
  font-weight: 500;
  background-color: var(--c-bg-lighter);
}

.rating-excellent {
  color: #10b981;
  font-weight: 500;
}

.rating-good {
  color: #3b82f6;
  font-weight: 500;
}

.rating-moderate {
  color: #f59e0b;
  font-weight: 500;
}

.rating-poor {
  color: #ef4444;
  font-weight: 500;
}

.rating-neutral {
  color: var(--c-text);
}

@media (max-width: 768px) {
  th, td {
    padding: 0.5rem;
    font-size: 0.85rem;
  }
}
</style>