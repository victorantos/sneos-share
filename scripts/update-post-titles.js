import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_LIBRARY_DIR = path.join(__dirname, '../docs/ai-library');

function updatePostTitle(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');

    // Extract prompt from ChatComparison component
    const promptMatch = content.match(/prompt="([^"]+)"/);
    if (!promptMatch) {
      console.log(`⚠️  No prompt found in ${filePath}`);
      return false;
    }

    const prompt = promptMatch[1];

    // Replace title in frontmatter (preserving YAML escaping)
    let updatedContent = content.replace(
      /title: "([^"]+)"/,
      `title: "${prompt}"`
    );

    // Replace title in ChatComparison component
    updatedContent = updatedContent.replace(
      /title="([^"]+)"/,
      `title="${prompt}"`
    );

    // Only write if content actually changed
    if (updatedContent !== content) {
      fs.writeFileSync(filePath, updatedContent, 'utf-8');
      return true;
    }

    return false;
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

function processDirectory(dir) {
  let updatedCount = 0;
  let totalCount = 0;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      const result = processDirectory(fullPath);
      updatedCount += result.updated;
      totalCount += result.total;
    } else if (entry.name.endsWith('.md') && entry.name !== 'index.md' && entry.name !== 'README.md') {
      totalCount++;
      if (updatePostTitle(fullPath)) {
        updatedCount++;
      }
    }
  }

  return { updated: updatedCount, total: totalCount };
}

console.log('🔄 Starting title updates...\n');
const result = processDirectory(AI_LIBRARY_DIR);
console.log(`\n✅ Updated ${result.updated} out of ${result.total} posts`);
