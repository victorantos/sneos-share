<template>
  <div class="clean-layout">
    <!-- Main content area -->
    <main class="clean-main">
      <div class="clean-content">
        <Content />
      </div>
    </main>

    <!-- Clean footer -->
    <footer class="clean-footer">
      <a :href="getMainPageLink()" target="_blank" class="sneos-link">
        Try AI comparisons on SNEOS.com →
      </a>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { Content } from '@vuepress/client'

const getMainPageLink = () => {
  // Use localhost for development, production URL for production - no prompt injection
  return process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5193' 
    : 'https://sneos.com';
}
</script>

<style>
/* Clean layout base styles */
.clean-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
}

/* Main content area */
.clean-main {
  flex: 1;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 2rem 1.5rem;
  box-sizing: border-box;
}

.clean-content {
  width: 100%;
}

/* Clean footer */
.clean-footer {
  background: #f8fafc;
  border-top: 1px solid #e2e8f0;
  padding: 1.5rem;
  text-align: center;
  flex-shrink: 0;
}

.sneos-link {
  color: #4299e1;
  text-decoration: none;
  font-weight: 500;
  font-size: 0.95rem;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
}

.sneos-link:hover {
  color: #3182ce;
  text-decoration: none;
  transform: translateX(2px);
}

/* Mobile responsive */
@media (max-width: 768px) {
  .clean-main {
    padding: 1rem;
  }
  
  .clean-footer {
    padding: 1rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .clean-layout {
    background: #0f172a;
    color: #f1f5f9;
  }
  
  .clean-footer {
    background: #1e293b;
    border-top-color: #334155;
  }
  
  .sneos-link {
    color: #60a5fa;
  }
  
  .sneos-link:hover {
    color: #93c5fd;
  }
}

/* Ensure ChatComparison component is properly displayed */
.clean-content .chat-comparison-container {
  margin: 0;
  border-radius: 12px;
  width: 100%;
}

/* Remove any default margins from content */
.clean-content > *:first-child {
  margin-top: 0;
}

.clean-content > *:last-child {
  margin-bottom: 0;
}

/* Typography adjustments */
.clean-content h1,
.clean-content h2,
.clean-content h3,
.clean-content h4,
.clean-content h5,
.clean-content h6 {
  border: none !important;
  padding: 0 !important;
  line-height: 1.3;
}

.clean-content h1 {
  font-size: 2rem;
  margin: 0 0 1.5rem 0;
  color: #1a202c;
}

@media (prefers-color-scheme: dark) {
  .clean-content h1 {
    color: #f1f5f9;
  }
}

/* Code styling is handled by config.scss following VuePress Hope theme guidelines */
</style>