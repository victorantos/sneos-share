<template>
  <div class="share-loader">
    <div v-if="loading" class="loading-container">
      <div class="loading-spinner"></div>
      <div class="loading-text">Loading share content...</div>
    </div>
    
    <div v-else-if="error" class="error-container">
      <h2>Unable to Load Share</h2>
      <p>{{ errorMessage }}</p>
      <a href="https://sneos.com" class="back-link">Go to SNEOS</a>
    </div>
    
    <div v-else-if="shareContent" class="share-frame-container">
      <iframe 
        :src="shareUrl" 
        class="share-frame"
        @load="handleIframeLoad"
        @error="handleIframeError"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'ShareLoader',
  data() {
    return {
      loading: true,
      error: false,
      errorMessage: '',
      shareContent: false,
      shareUrl: null,
      shareId: null
    }
  },
  mounted() {
    this.loadShare();
  },
  methods: {
    async loadShare() {
      // Extract share ID from URL
      const path = window.location.pathname;
      const match = path.match(/\/compare\/(.+?)(\.html)?$/);
      
      if (!match) {
        this.showError('Invalid share URL');
        return;
      }
      
      this.shareId = match[1];
      
      // Build the Azure Function URL
      const functionUrls = [
        `https://func-api-g65xq7n52soq6.azurewebsites.net/api/serve-share/${this.shareId}`,
        `https://serve.sneos.com/api/serve-share/${this.shareId}`
      ];
      
      for (const url of functionUrls) {
        try {
          const response = await fetch(url, { 
            method: 'HEAD',
            mode: 'cors'
          });
          
          if (response.ok || response.status === 302) {
            // Function is available, use iframe to display content
            this.shareUrl = url;
            this.shareContent = true;
            this.loading = false;
            return;
          }
        } catch (err) {
          console.log(`Failed to check ${url}:`, err);
        }
      }
      
      // If we get here, no URL worked
      this.showError('Share not found or still processing. Please try again in a few moments.');
    },
    
    showError(message) {
      this.loading = false;
      this.error = true;
      this.errorMessage = message;
    },
    
    handleIframeLoad() {
      console.log('Share content loaded successfully');
    },
    
    handleIframeError() {
      this.showError('Failed to load share content');
    }
  }
}
</script>

<style scoped>
.share-loader {
  min-height: 100vh;
  position: relative;
}

.loading-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding: 2rem;
}

.loading-spinner {
  width: 50px;
  height: 50px;
  border: 4px solid rgba(102, 126, 234, 0.2);
  border-top-color: #667eea;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.loading-text {
  margin-top: 1rem;
  color: #667eea;
  font-size: 1.1rem;
}

.error-container {
  text-align: center;
  padding: 3rem;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.error-container h2 {
  color: #e53e3e;
  margin-bottom: 1rem;
}

.error-container p {
  color: #718096;
  margin-bottom: 2rem;
  max-width: 500px;
}

.back-link {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: transform 0.2s;
}

.back-link:hover {
  transform: translateY(-2px);
}

.share-frame-container {
  width: 100%;
  height: 100vh;
  position: relative;
}

.share-frame {
  width: 100%;
  height: 100%;
  border: none;
  position: absolute;
  top: 0;
  left: 0;
}
</style>