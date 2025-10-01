<template>
  <div class="chat-comparison-container">
    <div class="comparison-header">
      <h3>{{ title }}</h3>
      <div class="comparison-meta">
        <span class="prompt-badge">Prompt</span>
        <div class="prompt-container">
          <div
            class="prompt-text"
            :class="{ 'prompt-collapsed': isHeaderCollapsed }"
            ref="headerPrompt"
          >
            {{ prompt }}
          </div>
          <button
            v-if="shouldShowHeaderToggle"
            @click="toggleHeader"
            class="expand-toggle"
          >
            {{ isHeaderCollapsed ? 'Show more' : 'Show less' }}
          </button>
        </div>
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
            <div
              class="message-content"
              :class="{ 'message-collapsed': isChatCollapsed }"
              ref="chatPrompt"
            >
              {{ prompt }}
            </div>
            <button
              v-if="shouldShowChatToggle"
              @click="toggleChat"
              class="chat-expand-toggle"
            >
              {{ isChatCollapsed ? 'Show more' : 'Show less' }}
            </button>
          </div>
          
          <!-- AI Response -->
          <div class="message ai-message" :class="`ai-message-${model.toLowerCase()}`">
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
  data() {
    return {
      isHeaderCollapsed: false,
      isChatCollapsed: false,
      shouldShowHeaderToggle: false,
      shouldShowChatToggle: false,
      isDesktop: false,
      isMobile: false
    }
  },
  mounted() {
    this.checkScreenSize();
    this.checkPromptLength();
    window.addEventListener('resize', this.handleResize);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  methods: {
    checkScreenSize() {
      this.isDesktop = window.innerWidth >= 1024;
      this.isMobile = window.innerWidth <= 768;
    },

    handleResize() {
      this.checkScreenSize();
      this.checkPromptLength();
    },

    checkPromptLength() {
      // Check if header prompt should be collapsible
      const sentences = this.prompt.match(/[.!?]+/g) || [];
      let headerSentenceLimit;

      if (this.isMobile) {
        headerSentenceLimit = 2; // More aggressive on mobile
      } else if (this.isDesktop) {
        headerSentenceLimit = 3; // Original desktop requirement
      } else {
        headerSentenceLimit = 2.5; // Tablet - between mobile and desktop
      }

      this.shouldShowHeaderToggle = sentences.length > headerSentenceLimit;

      // Check if chat prompt should be collapsible with device-specific line estimation
      const charsPerLine = this.isMobile ? 30 : (this.isDesktop ? 60 : 45); // Mobile: 30, Desktop: 60, Tablet: 45
      const chatLineLimit = this.isMobile ? 3 : 5; // Mobile: 3 lines, Desktop/Tablet: 5 lines

      const estimatedLines = Math.ceil(this.prompt.length / charsPerLine) + (this.prompt.match(/\n/g) || []).length;
      this.shouldShowChatToggle = estimatedLines > chatLineLimit;

      // Auto-collapse if conditions are met
      if (this.shouldShowHeaderToggle) {
        this.isHeaderCollapsed = true;
      }
      if (this.shouldShowChatToggle) {
        this.isChatCollapsed = true;
      }
    },

    toggleHeader() {
      this.isHeaderCollapsed = !this.isHeaderCollapsed;
    },

    toggleChat() {
      this.isChatCollapsed = !this.isChatCollapsed;
    },

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
      // Comprehensive markdown-to-HTML conversion
      let formatted = response;

      // Store code blocks and tables temporarily to protect them from other replacements
      const codeBlocks = [];
      const tables = [];

      // 1. Extract and store code blocks
      formatted = formatted.replace(/```(\w*)\n([\s\S]*?)```/g, (match, language, code) => {
        const index = codeBlocks.length;
        const langClass = language ? ` class="language-${language}"` : '';
        const placeholder = `§§§CODEBLOCK${index}§§§`;
        codeBlocks.push(`<div${langClass}><pre><code>${this.escapeHtml(code.trim())}</code></pre></div>`);
        return placeholder;
      });

      // 2. Extract and store tables
      formatted = formatted.replace(/(\|[^\n]+\|)\n(\|[\s\-:|]+\|)\n((?:\|[^\n]+\|\n?)+)/g, (match, header, separator, rows) => {
        // Helper function to format markdown in table cells
        const formatCell = (cell) => {
          let formatted = cell.trim();
          // Handle bold
          formatted = formatted.replace(/\*\*([^\*]+?)\*\*/g, '<strong>$1</strong>');
          formatted = formatted.replace(/__([^_]+?)__/g, '<strong>$1</strong>');
          // Handle italic
          formatted = formatted.replace(/(?<!\*)\*([^\*]+?)\*(?!\*)/g, '<em>$1</em>');
          formatted = formatted.replace(/(?<!_)_([^_]+?)_(?!_)/g, '<em>$1</em>');
          // Handle inline code
          formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');
          // Handle links
          formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');
          return formatted;
        };

        const headerCells = header.split('|').filter(cell => cell.trim()).map(cell =>
          formatCell(cell)
        ).join('</th><th>');

        const rowsHtml = rows.trim().split('\n').map(row => {
          const cells = row.split('|').filter(cell => cell.trim()).map(cell =>
            formatCell(cell)
          ).join('</td><td>');
          return `<tr><td>${cells}</td></tr>`;
        }).join('');

        const index = tables.length;
        const placeholder = `§§§TABLE${index}§§§`;
        tables.push(`<table class="markdown-table"><thead><tr><th>${headerCells}</th></tr></thead><tbody>${rowsHtml}</tbody></table>`);
        return placeholder;
      });

      // 3. Handle markdown headers (h1-h6) - must be done before other replacements
      formatted = formatted.replace(/^######\s+(.+?)$/gm, '<h6>$1</h6>');
      formatted = formatted.replace(/^#####\s+(.+?)$/gm, '<h5>$1</h5>');
      formatted = formatted.replace(/^####\s+(.+?)$/gm, '<h4>$1</h4>');
      formatted = formatted.replace(/^###\s+(.+?)$/gm, '<h3>$1</h3>');
      formatted = formatted.replace(/^##\s+(.+?)$/gm, '<h2>$1</h2>');
      formatted = formatted.replace(/^#\s+(.+?)$/gm, '<h1>$1</h1>');

      // 4. Handle horizontal rules
      formatted = formatted.replace(/^---$/gm, '<hr>');
      formatted = formatted.replace(/^\*\*\*$/gm, '<hr>');

      // 5. Handle blockquotes
      formatted = formatted.replace(/^>\s+(.+)$/gm, '<blockquote>$1</blockquote>');

      // 6. Handle unordered lists (*, -, +) with optional indentation
      formatted = formatted.replace(/^(\s*)[\*\-\+]\s+(.+)$/gm, '<li>$2</li>');

      // 7. Handle ordered lists with optional indentation
      formatted = formatted.replace(/^(\s*)\d+\.\s+(.+)$/gm, '<li>$2</li>');

      // 8. Wrap consecutive list items
      formatted = formatted.replace(/(<li>.*<\/li>\n?)+/g, (match) => {
        return `<ul>${match}</ul>`;
      });

      // 9. Handle inline code (single backticks) - before bold/italic to avoid conflicts
      formatted = formatted.replace(/`([^`]+)`/g, '<code>$1</code>');

      // 10. Handle markdown links [text](url)
      formatted = formatted.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

      // 11. Handle bold text (** or __) - use [^\*\n]+ to avoid matching across asterisks and newlines
      formatted = formatted.replace(/\*\*([^\*\n]+?)\*\*/g, '<strong>$1</strong>');
      formatted = formatted.replace(/__([^_\n]+?)__/g, '<strong>$1</strong>');

      // 12. Handle italic text (* or _) - must be after bold, avoid matching bold markers
      formatted = formatted.replace(/(?<!\*)\*([^\*\n]+?)\*(?!\*)/g, '<em>$1</em>');
      formatted = formatted.replace(/(?<!_)_([^_\n]+?)_(?!_)/g, '<em>$1</em>');

      // 13. Handle strikethrough
      formatted = formatted.replace(/~~(.+?)~~/g, '<del>$1</del>');

      // 14. Restore code blocks and tables BEFORE line break processing
      codeBlocks.forEach((block, i) => {
        formatted = formatted.replace(`§§§CODEBLOCK${i}§§§`, block);
      });
      tables.forEach((table, i) => {
        formatted = formatted.replace(`§§§TABLE${i}§§§`, table);
      });

      // 15. Handle line breaks and paragraphs
      formatted = formatted.replace(/\n\n+/g, '</p><p>');
      formatted = formatted.replace(/\n/g, '<br>');

      // 16. Wrap in paragraph tags
      if (!formatted.startsWith('<')) {
        formatted = '<p>' + formatted + '</p>';
      }

      return formatted;
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
  gap: 0;
  background: #f8fafc;
}

/* 2 columns by default on medium screens */
@media (min-width: 768px) {
  .chat-windows-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* 3 columns on extra wide screens when there are 3 models */
@media (min-width: 1400px) {
  .chat-windows-grid {
    grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
  }
}

/* Mobile: single column */
@media (max-width: 767px) {
  .chat-windows-grid {
    grid-template-columns: 1fr;
  }
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
  background: linear-gradient(135deg, #2d3436, #636e72);
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

/* Provider-specific border colors */
.ai-message-chatgpt .message-content {
  border-left-color: #10a37f;
}

.ai-message-claude .message-content {
  border-left-color: #cc785c;
}

.ai-message-gemini .message-content {
  border-left-color: #4285f4;
}

.ai-message-grok .message-content {
  border-left-color: #2d3436;
}

.ai-message-deepseek .message-content {
  border-left-color: #6366f1;
}

.ai-message-mistral .message-content {
  border-left-color: #ff6b6b;
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

/* Collapsible prompt styles */
.prompt-container {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
}

.prompt-text.prompt-collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.expand-toggle {
  background: rgba(255, 255, 255, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 16px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  align-self: flex-start;
  transition: all 0.2s ease;
}

.expand-toggle:hover {
  background: rgba(255, 255, 255, 0.25);
  border-color: rgba(255, 255, 255, 0.5);
}

.user-message .message-content.message-collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Markdown table styles */
.ai-message .message-content :deep(.markdown-table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1rem 0;
  font-size: 0.875rem;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.ai-message .message-content :deep(.markdown-table thead) {
  background: #f7fafc;
}

.ai-message .message-content :deep(.markdown-table th) {
  padding: 0.75rem;
  text-align: left;
  font-weight: 600;
  color: #2d3748;
  border-bottom: 2px solid #e2e8f0;
}

.ai-message .message-content :deep(.markdown-table td) {
  padding: 0.75rem;
  border-bottom: 1px solid #e2e8f0;
  color: #4a5568;
}

.ai-message .message-content :deep(.markdown-table tbody tr:last-child td) {
  border-bottom: none;
}

.ai-message .message-content :deep(.markdown-table tbody tr:hover) {
  background: #f7fafc;
}

/* Markdown header styles */
.ai-message .message-content :deep(h1),
.ai-message .message-content :deep(h2),
.ai-message .message-content :deep(h3),
.ai-message .message-content :deep(h4),
.ai-message .message-content :deep(h5),
.ai-message .message-content :deep(h6) {
  margin: 1.5rem 0 0.75rem 0;
  font-weight: 600;
  line-height: 1.3;
  color: #2d3748;
}

.ai-message .message-content :deep(h1) {
  font-size: 1.75rem;
  border-bottom: 2px solid #e2e8f0;
  padding-bottom: 0.5rem;
}

.ai-message .message-content :deep(h2) {
  font-size: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  padding-bottom: 0.4rem;
}

.ai-message .message-content :deep(h3) {
  font-size: 1.25rem;
}

.ai-message .message-content :deep(h4) {
  font-size: 1.1rem;
}

.ai-message .message-content :deep(h5) {
  font-size: 1rem;
}

.ai-message .message-content :deep(h6) {
  font-size: 0.95rem;
  color: #4a5568;
}

/* Markdown list styles */
.ai-message .message-content :deep(ul),
.ai-message .message-content :deep(ol) {
  margin: 1rem 0;
  padding-left: 2rem;
}

.ai-message .message-content :deep(li) {
  margin: 0.5rem 0;
  line-height: 1.6;
  color: #4a5568;
}

.ai-message .message-content :deep(ul) {
  list-style-type: disc;
}

.ai-message .message-content :deep(ol) {
  list-style-type: decimal;
}

/* Markdown blockquote styles */
.ai-message .message-content :deep(blockquote) {
  margin: 1rem 0;
  padding: 0.75rem 1rem;
  border-left: 4px solid #4299e1;
  background: #f7fafc;
  color: #4a5568;
  font-style: italic;
}

/* Markdown horizontal rule styles */
.ai-message .message-content :deep(hr) {
  margin: 2rem 0;
  border: none;
  border-top: 2px solid #e2e8f0;
}

/* Markdown strikethrough styles */
.ai-message .message-content :deep(del) {
  color: #718096;
  text-decoration: line-through;
}

.chat-expand-toggle {
  background: #e2e8f0;
  border: 1px solid #cbd5e0;
  color: #4a5568;
  padding: 0.25rem 0.75rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
  cursor: pointer;
  margin-top: 0.5rem;
  align-self: flex-end;
  transition: all 0.2s ease;
}

.chat-expand-toggle:hover {
  background: #cbd5e0;
  border-color: #a0aec0;
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

  /* Mobile-specific toggle button improvements */
  .expand-toggle,
  .chat-expand-toggle {
    min-height: 44px; /* Better touch target */
    padding: 0.5rem 1rem;
    font-size: 0.875rem;
    margin-top: 0.75rem;
  }

  .prompt-text.prompt-collapsed {
    -webkit-line-clamp: 1; /* Even more aggressive truncation on small mobile */
  }

  .user-message .message-content.message-collapsed {
    -webkit-line-clamp: 2; /* Reduce from 3 to 2 lines on small mobile */
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .chat-comparison-container {
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  }

  .chat-windows-grid {
    background: #1e293b;
  }

  .chat-window {
    background: #0f172a;
    border-right-color: #334155;
  }

  .chat-header {
    border-bottom-color: #334155;
  }

  .user-message .message-content {
    background: #334155;
    color: #f1f5f9;
  }

  .ai-message .message-content {
    background: #1e293b;
    color: #e2e8f0;
    border-left-color: #60a5fa;
  }

  /* Provider-specific border colors for dark mode */
  .ai-message-chatgpt .message-content {
    border-left-color: #10a37f;
  }

  .ai-message-claude .message-content {
    border-left-color: #d4915c;
  }

  .ai-message-gemini .message-content {
    border-left-color: #4285f4;
  }

  .ai-message-grok .message-content {
    border-left-color: #636e72;
  }

  .ai-message-deepseek .message-content {
    border-left-color: #8b5cf6;
  }

  .ai-message-mistral .message-content {
    border-left-color: #ff6b6b;
  }

  .ai-message .message-content :deep(code) {
    background: #334155;
    color: #f1f5f9;
  }

  .ai-message .message-content :deep(h1),
  .ai-message .message-content :deep(h2),
  .ai-message .message-content :deep(h3),
  .ai-message .message-content :deep(h4),
  .ai-message .message-content :deep(h5),
  .ai-message .message-content :deep(h6) {
    color: #f1f5f9;
  }

  .ai-message .message-content :deep(h1) {
    border-bottom-color: #334155;
  }

  .ai-message .message-content :deep(h2) {
    border-bottom-color: #334155;
  }

  .ai-message .message-content :deep(h6) {
    color: #cbd5e1;
  }

  .ai-message .message-content :deep(li) {
    color: #cbd5e1;
  }

  .ai-message .message-content :deep(blockquote) {
    border-left-color: #60a5fa;
    background: #1e293b;
    color: #cbd5e1;
  }

  .ai-message .message-content :deep(hr) {
    border-top-color: #334155;
  }

  .ai-message .message-content :deep(del) {
    color: #94a3b8;
  }

  .ai-message .message-content :deep(.markdown-table) {
    background: #1e293b;
    border-color: #334155;
  }

  .ai-message .message-content :deep(.markdown-table thead) {
    background: #0f172a;
  }

  .ai-message .message-content :deep(.markdown-table th) {
    color: #f1f5f9;
    border-bottom-color: #334155;
  }

  .ai-message .message-content :deep(.markdown-table td) {
    border-bottom-color: #334155;
    color: #cbd5e1;
  }

  .ai-message .message-content :deep(.markdown-table tbody tr:hover) {
    background: #334155;
  }

  .message-time {
    color: #94a3b8;
  }

  .comparison-footer {
    background: #1e293b;
    border-top-color: #334155;
  }

  .try-sneos p {
    color: #cbd5e1;
  }

  .try-sneos a {
    color: #60a5fa;
  }

  .try-sneos a:hover {
    color: #93c5fd;
  }

  .chat-expand-toggle {
    background: #334155;
    border-color: #475569;
    color: #cbd5e1;
  }

  .chat-expand-toggle:hover {
    background: #475569;
    border-color: #64748b;
  }
}
</style>