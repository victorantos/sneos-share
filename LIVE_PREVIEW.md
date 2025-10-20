# Live Preview URL Routing Documentation

## Overview

The SNEOS Share platform implements a **live preview system** that provides instant access to newly created AI comparisons while the permanent VuePress-styled version is being deployed via GitHub Actions.

### Two-Stage Delivery System

1. **Instant Preview (Blob Storage)** - Available immediately after share creation (~1 second)
2. **Permanent Version (VuePress)** - Available after GitHub Actions deployment (~2-5 minutes)

The same URL works for both stages, automatically serving the appropriate version.

---

## Architecture Components

### 1. Azure Function: SharePublishFunction
- **Location:** `/sneos-azure/sneos-function/SharePublishFunction.cs`
- **Endpoint:** `POST /api/share-publish`
- **Actions:**
  - Saves HTML to Azure Blob Storage (`instant-shares` container)
  - Commits markdown to GitHub (`sneos-share` repo)
  - Returns clean URL: `https://share.sneos.com/compare/{shareId}`

### 2. Azure Function: ServeShareFunction
- **Location:** `/sneos-azure/sneos-function/ServeShareFunction.cs`
- **Endpoint:** `GET /api/serve-share/{shareId}`
- **Actions:**
  - Fetches HTML from blob storage
  - Adds "⚡ Live Preview" banner
  - Returns HTML content

### 3. Azure Static Web Apps Routing
- **Location:** `/staticwebapp.config.json`
- **Purpose:** Routes URLs between static files, blob storage, and fallbacks

### 4. Fallback Page: blog-redirect.html
- **Location:** `/docs/.vuepress/public/blog-redirect.html`
- **Purpose:** JavaScript-based loader that fetches from blob storage when static file doesn't exist

---

## URL Routing Rules

### Rule Execution Order (IMPORTANT!)

Azure Static Web Apps processes routes **in order**. Redirect rules must come before rewrite rules.

```json
{
  "routes": [
    // 1. REDIRECTS: .html → clean URLs (301 permanent redirect)
    {
      "route": "/compare/:post.html",
      "redirect": "/compare/:post",
      "statusCode": 301
    },
    {
      "route": "/compare/:subfolder/:post.html",
      "redirect": "/compare/:subfolder/:post",
      "statusCode": 301
    },

    // 2. REWRITES: clean URLs → .html files (server-side only, URL unchanged)
    {
      "route": "/compare/:post",
      "rewrite": "/compare/:post.html"
    },
    {
      "route": "/compare/:subfolder/:post",
      "rewrite": "/compare/:subfolder/:post.html"
    }
  ],

  "navigationFallback": {
    "rewrite": "/blog-redirect.html",
    "exclude": [
      "/assets/*",
      "/*.js",
      "/*.css",
      "/*.json",
      "/*.png",
      "/*.jpg",
      "/*.svg",
      "/*.ico",
      "/*.txt",
      "/*.xml",
      "/blog-redirect.html",
      "/ai-library/*"  // ai-library has no live preview
    ]
  }
}
```

**Key Points:**
- `/compare/*` is **NOT excluded** from `navigationFallback` (enables blob storage preview)
- `/ai-library/*` **IS excluded** (no live preview needed, returns 404 if missing)

---

## URL Flow Scenarios

### Scenario 1: Clean URL + File Exists (After GitHub Deploy)

```
User visits: https://share.sneos.com/compare/2025-01-20-test-1234

Step 1: Check redirect rules
  → No match (clean URL)

Step 2: Check rewrite rules
  → Match: "/compare/:post"
  → Rewrite to: /compare/2025-01-20-test-1234.html

Step 3: File lookup
  → dist/compare/2025-01-20-test-1234.html EXISTS
  → Serve VuePress page ✅

Step 4: Browser sees
  → URL: https://share.sneos.com/compare/2025-01-20-test-1234 (clean)
  → Content: Full VuePress styled page with ChatComparison component
```

---

### Scenario 2: Clean URL + File Doesn't Exist (Live Preview)

```
User visits: https://share.sneos.com/compare/2025-01-20-test-1234

Step 1: Check redirect rules
  → No match

Step 2: Check rewrite rules
  → Match: "/compare/:post"
  → Try to serve: /compare/2025-01-20-test-1234.html

Step 3: File lookup
  → File DOESN'T EXIST

Step 4: Navigation fallback
  → /compare/* NOT in exclude list
  → Serve: /blog-redirect.html

Step 5: JavaScript execution (blog-redirect.html)
  → Extract shareId from URL: "2025-01-20-test-1234"
  → Fetch: https://serve.sneos.com/api/serve-share/2025-01-20-test-1234

Step 6: ServeShareFunction
  → Load from blob: instant-shares/2025-01-20-test-1234.html
  → Add banner: "⚡ Live Preview - Permanent styled version deploying..."
  → Return HTML

Step 7: Browser sees
  → URL: https://share.sneos.com/compare/2025-01-20-test-1234 (clean)
  → Content: Simple HTML with purple banner (blob storage version)
```

---

### Scenario 3: .html URL + File Exists

```
User visits: https://share.sneos.com/compare/2025-01-20-test-1234.html

Step 1: Check redirect rules
  → Match: "/compare/:post.html"
  → 301 Redirect to: /compare/2025-01-20-test-1234

Step 2: Browser follows redirect
  → New URL: https://share.sneos.com/compare/2025-01-20-test-1234

[Then follows Scenario 1 flow]

Result: VuePress page served with clean URL ✅
```

---

### Scenario 4: .html URL + File Doesn't Exist

```
User visits: https://share.sneos.com/compare/2025-01-20-test-1234.html

Step 1: Check redirect rules
  → Match: "/compare/:post.html"
  → 301 Redirect to: /compare/2025-01-20-test-1234

Step 2: Browser follows redirect
  → New URL: https://share.sneos.com/compare/2025-01-20-test-1234

[Then follows Scenario 2 flow]

Result: Blob storage preview served with clean URL ✅
```

---

### Scenario 5: Subfolder URLs (e.g., /compare/smart-reply/)

```
User visits: https://share.sneos.com/compare/smart-reply/2025-01-20-test-1234

Step 1: Check redirect rules
  → No match

Step 2: Check rewrite rules
  → Match: "/compare/:subfolder/:post"
  → Rewrite to: /compare/smart-reply/2025-01-20-test-1234.html

[Same logic as Scenario 1 or 2 depending on file existence]

Supports subfolders: clever-reply/, smart-reply/, brutal-reply/
```

---

### Scenario 6: /ai-library/ URLs (No Live Preview)

```
User visits: https://share.sneos.com/ai-library/finance/crypto-2025

Step 1: Check rewrite rules
  → No rewrite rule for ai-library clean URLs

Step 2: File lookup
  → File DOESN'T EXIST

Step 3: Navigation fallback
  → /ai-library/* IS in exclude list
  → Return 404 ✅

Note: ai-library content has no live preview, only permanent versions
```

---

## ShareId Format and Blob Storage Naming

### ShareId Generation (SharePublishFunction.cs:469-498)

```csharp
// Standard format
"{date}-{slug}-{random-4-digits}"

// Example
"2025-01-20-chatgpt-vs-claude-writing-1234"

// With subfolder
subfolder = "smart-reply/"
blobPath = "smart-reply/2025-01-20-chatgpt-vs-claude-1234"
```

### Blob Storage Naming Convention

```
Container: instant-shares
Blob name: {shareId}.html

Examples:
  - 2025-01-20-test-1234.html
  - smart-reply/2025-01-20-test-5678.html
```

**Note:** Azure Blob Storage supports slashes in blob names (virtual directory structure).

---

## blog-redirect.html Implementation

### JavaScript URL Extraction

```javascript
const currentPath = window.location.pathname;

// Extract share ID from path like /compare/2025-09-10-what-is-tesla-robot-1108
let shareId = null;
const compareMatch = currentPath.match(/\/compare\/(.+?)(\.html)?$/);
if (compareMatch) {
    shareId = compareMatch[1];  // Removes .html if present
}

// Fetch from serve API
const functionUrl = `https://serve.sneos.com/api/serve-share/${shareId}`;
const response = await fetch(functionUrl);
const htmlContent = await response.text();

// Replace entire page with blob storage content
document.open();
document.write(htmlContent);
document.close();
```

### Important Regex Behavior

- Pattern: `/\/compare\/(.+?)(\.html)?$/`
- Captures everything after `/compare/` into group 1
- Optional `.html` is captured but not included in shareId
- Works for both clean and .html URLs

---

## Testing the Live Preview System

### Local Testing with SWA CLI

**Note:** SWA CLI emulator has limitations with rewrite rules. Some scenarios may not work exactly as production.

#### 1. Build the site
```bash
npm run docs:build
```

#### 2. Start SWA emulator
```bash
swa start dist
```

This starts on http://localhost:4280

#### 3. Run automated tests
```bash
./test-preview-routing.sh
```

#### 4. Manual browser tests

**Test existing file (clean URL):**
```
http://localhost:4280/compare/2025-09-10-test-migration-share-1234
Expected: VuePress page (in production)
Local emulator: May show fallback due to rewrite rule limitations
```

**Test non-existent file (live preview):**
```
http://localhost:4280/compare/2025-01-20-fake-test-9999
Expected: blog-redirect.html → blob storage preview (if blob exists)
Local: Shows loading spinner, then error (blob doesn't exist)
```

**Test .html redirect:**
```
http://localhost:4280/compare/2025-09-10-test-migration-share-1234.html
Expected: 301 redirect to clean URL
```

### Production Testing

After deployment to Azure:

#### 1. Create a new share via app
```bash
POST https://sneos-functions.azurewebsites.net/api/share-publish
Authorization: Bearer {jwt-token}
Content-Type: application/json

{
  "title": "Test Live Preview",
  "prompt": "Test prompt",
  "responses": {
    "ChatGPT": "Test response",
    "Claude": "Test response"
  },
  "publishedAt": "2025-01-20T10:00:00Z",
  "models": ["ChatGPT", "Claude"]
}
```

#### 2. Immediately visit returned URL
```
Response: { "url": "https://share.sneos.com/compare/2025-01-20-test-1234" }

Visit URL immediately (before GitHub Actions completes):
Expected: "⚡ Live Preview" banner with blob storage HTML
```

#### 3. Wait 2-5 minutes, refresh
```
GitHub Actions completes deployment

Visit same URL:
Expected: Full VuePress styled page, no banner
```

#### 4. Test .html URL
```
Visit: https://share.sneos.com/compare/2025-01-20-test-1234.html

Expected:
  - 301 redirect to clean URL
  - Serves VuePress page
```

---

## Troubleshooting

### Problem: Clean URL returns 404 instead of blob preview

**Cause:** `/compare/*` is in navigationFallback exclude list

**Fix:** Remove `/compare/*` from exclude array in staticwebapp.config.json

---

### Problem: .html URLs don't redirect to clean URLs

**Cause:** Missing redirect rules or redirect rules come after rewrite rules

**Fix:** Ensure redirect rules are BEFORE rewrite rules in routes array

---

### Problem: Blob storage returns .html.html file not found

**Cause:** blog-redirect.html JavaScript includes .html in shareId extraction

**Fix:** Regex should remove .html extension:
```javascript
currentPath.match(/\/compare\/(.+?)(\.html)?$/);
```

---

### Problem: VuePress pages show blob preview instead of static content

**Cause:** Rewrite rules not working, all requests fall back

**Fix:**
1. Verify VuePress build creates .html files in dist/compare/
2. Check rewrite rules match URL pattern
3. Test in production (SWA CLI has rewrite limitations)

---

### Problem: Blog redirect shows "not found" for existing blob

**Cause:** ShareId doesn't match blob name format

**Fix:**
1. Check blob storage container name: `instant-shares`
2. Verify blob name format: `{shareId}.html`
3. Check ServeShareFunction logs for blob lookup errors

---

## File Locations Reference

```
sneos-share/
├── staticwebapp.config.json          # Routing rules
├── docs/
│   └── .vuepress/
│       ├── public/
│       │   └── blog-redirect.html    # Fallback loader
│       └── dist/                     # Build output
│           └── compare/
│               └── *.html            # VuePress generated pages

sneos-azure/
└── sneos-function/
    ├── SharePublishFunction.cs       # Create share + save to blob
    └── ServeShareFunction.cs         # Serve from blob storage
```

---

## Deployment Flow

```
User creates share
    ↓
SharePublishFunction
    ├─→ Save HTML to blob storage (instant-shares container)
    │   Blob name: {shareId}.html
    │
    └─→ Commit markdown to GitHub (docs/compare/{shareId}.md)
        ↓
    GitHub Actions triggered
        ↓
    VuePress build
        ↓
    Deploy to Azure Static Web Apps
        ↓
    File created: dist/compare/{shareId}.html

Timeline:
  0s:      Blob storage available (live preview)
  2-5min:  VuePress page available (permanent version)
```

---

## Clean URL Benefits

### SEO Advantages
- **Cleaner URLs** are more readable and shareable
- **Consistent format** across all pages
- **No .html extension** appears in social media shares

### User Experience
- **Same URL** works for both preview and permanent versions
- **No broken links** when switching from preview to permanent
- **Professional appearance** in browser address bar

### Technical Benefits
- **Single source of truth** for share URLs
- **Automatic redirect** from legacy .html URLs
- **Future-proof** for URL structure changes

---

## Maintenance Notes

### When Adding New URL Patterns

1. Add redirect rule FIRST (if .html variants exist)
2. Add rewrite rule AFTER redirects
3. Update exclude list in navigationFallback if needed
4. Test both .html and clean URL variants
5. Update this documentation

### When Changing Blob Storage Structure

1. Update `SharePublishFunction.cs` blob naming logic
2. Update `ServeShareFunction.cs` blob lookup logic
3. Update `blog-redirect.html` JavaScript URL extraction
4. Test end-to-end flow
5. Consider migration for existing blobs

### When Modifying VuePress Build Output

1. Verify dist/ output structure matches rewrite rules
2. Test that clean URLs resolve to correct .html files
3. Update rewrite patterns if directory structure changes
4. Clear Azure SWA cache after deployment

---

## Performance Considerations

### Blob Storage
- **Latency:** ~50-200ms for blob fetch
- **Bandwidth:** Minimal (HTML only, no assets)
- **Caching:** No CDN caching (intentional for live preview)
- **Cleanup:** One old blob deleted daily (background task)

### Azure Static Web Apps
- **Latency:** ~10-50ms for static files (CDN cached)
- **Bandwidth:** Full assets (CSS, JS, images)
- **Caching:** Aggressive CDN caching
- **Revalidation:** On each GitHub deployment

### Route Processing
- **Redirect rules:** ~1-5ms (302/301 redirect)
- **Rewrite rules:** ~1-5ms (server-side)
- **Navigation fallback:** ~10-20ms (additional file check)

---

## Security Considerations

### Authentication
- SharePublishFunction requires JWT token
- Daily share limits enforced (10 for free, unlimited for premium)
- User ID tracked for rate limiting

### Blob Storage
- Public read access for `instant-shares` container
- No authentication required for ServeShareFunction
- Cleanup prevents unbounded growth

### XSS Protection
- HTML content escaped in SharePublishFunction
- blog-redirect.html uses document.write (safe for same-origin)
- ServeShareFunction adds trusted banner only

---

## Future Enhancements

### Potential Improvements

1. **Progressive Web App (PWA)**
   - Service worker for offline preview caching
   - Background sync for delayed loads

2. **CDN Integration**
   - Azure CDN in front of serve.sneos.com
   - Reduced latency for global users

3. **Real-time Updates**
   - WebSocket connection to notify when permanent version ready
   - Auto-refresh to styled version

4. **Preview Expiration**
   - Configurable TTL for blob storage previews
   - Automatic cleanup based on deployment status

5. **Analytics**
   - Track preview vs permanent view ratio
   - Monitor deployment completion time
   - User engagement metrics

---

## Version History

- **v1.0** (2025-01-20) - Initial live preview system
  - Basic blob storage + VuePress dual serving
  - Clean URL support
  - blog-redirect.html fallback

- **v1.1** (Current) - Enhanced URL routing
  - Added redirect rules for .html URLs
  - Fixed blob storage .html.html bug
  - Improved URL extraction regex
  - Comprehensive documentation
