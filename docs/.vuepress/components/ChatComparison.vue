<template>
  <div class="chat-comparison-container">
    <div class="comparison-header">
      <h3>{{ title }}</h3>
      <div class="comparison-meta">
        <span class="prompt-badge">Prompt</span>
        <span class="prompt-text">{{ prompt }}</span>
      </div>
    </div>
    
    <div class="chat-windows-grid">
      <div 
        v-for="(response, model) in responses" 
        :key="model"
        class="chat-window"
      >
        <!-- Chat Window Header -->
        <div class="chat-header" :class="`header-${model.toLowerCase()}`">
          <div class="model-info">
            <span class="model-name">{{ formatModelName(model) }}</span>
            <span class="model-badge">{{ getModelBadge(model) }}</span>
          </div>
        </div>
        
        <!-- Chat Messages -->
        <div class="chat-messages">
          <!-- User Message -->
          <div class="message user-message">
            <div class="message-content">
              {{ prompt }}
            </div>
          </div>
          
          <!-- AI Response -->
          <div class="message ai-message">
            <div class="message-content" v-html="formatResponse(response)">
            </div>
            <div class="message-time">
              {{ publishedDate }}
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="comparison-footer">
      <div class="try-sneos">
        <p>💡 <strong>Try this comparison yourself:</strong> 
          <a :href="getSneosLink()" target="_blank">Compare AI models side-by-side on SNEOS</a>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatComparison',
  props: {
    title: {
      type: String,
      default: 'AI Model Comparison'
    },
    prompt: {
      type: String,
      required: true
    },
    responses: {
      type: Object,
      required: true
    },
    publishedDate: {
      type: String,
      default: () => new Date().toLocaleTimeString()
    }
  },
  methods: {
    formatModelName(model) {
      const modelNames = {
        'ChatGPT': 'ChatGPT',
        'Claude': 'Claude',
        'Gemini': 'Gemini',
        'Grok': 'Grok',
        'DeepSeek': 'DeepSeek',
        'Mistral': 'Mistral'
      };
      return modelNames[model] || model;
    },
    
    getModelBadge(model) {
      const badges = {
        'ChatGPT': 'OpenAI',
        'Claude': 'Anthropic', 
        'Gemini': 'Google',
        'Grok': 'xAI',
        'DeepSeek': 'DeepSeek',
        'Mistral': 'Mistral AI'
      };
      return badges[model] || 'AI';
    },
    
    formatResponse(response) {
      // Enhanced markdown-to-HTML conversion with proper code block handling
      return response
        // Handle code blocks first (triple backticks)
        .replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
          const langClass = language ? ` class="language-${language}"` : '';
          return `<div${langClass}><pre><code>${this.escapeHtml(code.trim())}</code></pre></div>`;
        })
        // Handle inline code (single backticks) 
        .replace(/`([^`]+)`/g, '<code>$1</code>')
        // Handle bold text
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        // Handle italic text
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        // Handle paragraphs and line breaks
        .replace(/\n\n/g, '</p><p>')
        .replace(/\n/g, '<br>');
    },
    
    escapeHtml(text) {
      // SSR-safe HTML escaping without using document
      return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    },
    
    getSneosLink() {
      const encodedPrompt = encodeURIComponent(this.prompt);
      // Use localhost for development, production URL for production
      const baseUrl = process.env.NODE_ENV === 'development' 
        ? 'http://localhost:5193' 
        : 'https://sneos.com';
      return `${baseUrl}?prompt=${encodedPrompt}`;
    }
  }
}
</script>

<style scoped>
.chat-comparison-container {
  margin: 2rem 0;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
}

.comparison-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1.5rem;
}

.comparison-header h3 {
  margin: 0 0 1rem 0;
  font-size: 1.5rem;
  font-weight: 600;
  line-height: 1.3;
}

/* Larger title on desktop for better visibility */
@media (min-width: 1024px) {
  .comparison-header h3 {
    font-size: 1.75rem;
  }
}

@media (min-width: 1440px) {
  .comparison-header h3 {
    font-size: 2rem;
  }
}

.comparison-meta {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex-wrap: wrap;
}

.prompt-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
  font-weight: 500;
  flex-shrink: 0;
}

.prompt-text {
  font-size: 0.95rem;
  opacity: 0.95;
  line-height: 1.5;
  max-width: 100%;
}

/* Better prompt display on larger screens */
@media (min-width: 1024px) {
  .prompt-text {
    font-size: 1rem;
    line-height: 1.6;
  }
}

.chat-windows-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 0;
  background: #f8fafc;
}

.chat-window {
  background: white;
  border-right: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  min-height: 400px;
}

.chat-window:last-child {
  border-right: none;
}

.chat-header {
  padding: 0.75rem 1rem;
  border-bottom: 1px solid #e2e8f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.header-chatgpt {
  background: linear-gradient(135deg, #10a37f, #1a7f64);
}

.header-claude {
  background: linear-gradient(135deg, #cc785c, #d4915c);
}

.header-gemini {
  background: linear-gradient(135deg, #4285f4, #34a853);
}

.header-grok {
  background: linear-gradient(135deg, #1da1f2, #1991da);
}

.header-deepseek {
  background: linear-gradient(135deg, #6366f1, #8b5cf6);
}

.header-mistral {
  background: linear-gradient(135deg, #ff6b6b, #ee5a52);
}

.model-info {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: white;
}

.model-name {
  font-weight: 600;
  font-size: 1rem;
}

.model-badge {
  background: rgba(255, 255, 255, 0.2);
  padding: 0.125rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
}

.chat-messages {
  flex: 1;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow-y: auto;
}

.message {
  display: flex;
  flex-direction: column;
}

.user-message .message-content {
  background: #e2e8f0;
  color: #1a202c;
  padding: 0.75rem 1rem;
  border-radius: 18px 18px 4px 18px;
  max-width: 85%;
  align-self: flex-end;
  margin-left: auto;
}

.ai-message .message-content {
  background: #f7fafc;
  color: #2d3748;
  padding: 0.75rem 1rem;
  border-radius: 18px 18px 18px 4px;
  border-left: 3px solid #4299e1;
  line-height: 1.6;
}

.ai-message .message-content :deep(p) {
  margin: 0.5rem 0;
}

.ai-message .message-content :deep(p:first-child) {
  margin-top: 0;
}

.ai-message .message-content :deep(p:last-child) {
  margin-bottom: 0;
}

.ai-message .message-content :deep(code) {
  background: #e2e8f0;
  padding: 0.125rem 0.375rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.message-time {
  font-size: 0.75rem;
  color: #718096;
  margin-top: 0.25rem;
  text-align: right;
}

.comparison-footer {
  background: #f8fafc;
  padding: 1rem 1.5rem;
  border-top: 1px solid #e2e8f0;
}

.try-sneos p {
  margin: 0;
  color: #4a5568;
  font-size: 0.95rem;
}

.try-sneos a {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
}

.try-sneos a:hover {
  color: #3182ce;
  text-decoration: underline;
}

/* Mobile responsiveness */
@media (max-width: 768px) {
  .chat-windows-grid {
    grid-template-columns: 1fr;
  }
  
  .chat-window {
    border-right: none;
    border-bottom: 1px solid #e2e8f0;
  }
  
  .chat-window:last-child {
    border-bottom: none;
  }
  
  .comparison-meta {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  
  .prompt-text {
    font-size: 0.9rem;
  }
}

@media (max-width: 480px) {
  .comparison-header {
    padding: 1rem;
  }
  
  .chat-messages {
    padding: 0.75rem;
  }
  
  .user-message .message-content,
  .ai-message .message-content {
    max-width: 95%;
    font-size: 0.9rem;
  }
}
</style>