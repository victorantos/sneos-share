import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_LIBRARY_PATH = path.join(__dirname, 'docs', 'ai-library');

// Function to parse frontmatter from a markdown file
function parseFrontmatter(content) {
  const frontmatterRegex = /^---\n([\s\S]*?)\n---/;
  const match = content.match(frontmatterRegex);

  if (!match) return null;

  const frontmatter = {};
  const lines = match[1].split('\n');

  for (const line of lines) {
    const [key, ...valueParts] = line.split(':');
    if (key && valueParts.length > 0) {
      const value = valueParts.join(':').trim();
      frontmatter[key.trim()] = value.replace(/^["']|["']$/g, '');
    }
  }

  return frontmatter;
}

// Function to format category name for display
function formatCategoryName(dirName) {
  return dirName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
    .replace(/\(([^)]+)\)/g, '($1)'); // Preserve parentheses
}

// Function to extract description from content or frontmatter
function extractDescription(content, frontmatter) {
  if (frontmatter.description) {
    return frontmatter.description;
  }

  // Try to extract first paragraph after frontmatter
  const contentWithoutFrontmatter = content.replace(/^---\n[\s\S]*?\n---\n/, '');
  const firstParagraph = contentWithoutFrontmatter
    .split('\n')
    .find(line => line.trim() && !line.startsWith('#'));

  return firstParagraph ? firstParagraph.trim().substring(0, 150) + '...' : '';
}

// Function to generate README for a category
function generateCategoryReadme(categoryPath, categoryName) {
  const items = fs.readdirSync(categoryPath)
    .filter(item => item !== 'README.md' && !item.startsWith('.'));

  // Check if this category has subdirectories (subcategories) or direct markdown files
  const hasSubdirectories = items.some(item => {
    const itemPath = path.join(categoryPath, item);
    return fs.statSync(itemPath).isDirectory();
  });

  const formattedCategoryName = formatCategoryName(categoryName);

  if (hasSubdirectories) {
    // Handle nested structure with subcategories
    const subcategories = items
      .filter(item => {
        const itemPath = path.join(categoryPath, item);
        return fs.statSync(itemPath).isDirectory();
      })
      .sort();

    if (subcategories.length === 0) return;

    let totalPosts = 0;
    let readmeContent = `---
title: ${formattedCategoryName}
---

# ${formattedCategoryName}

Browse AI comparison posts in the ${formattedCategoryName} category, organized by subcategory.

`;

    subcategories.forEach(subcategory => {
      const subcategoryPath = path.join(categoryPath, subcategory);
      const subcategoryFiles = fs.readdirSync(subcategoryPath)
        .filter(file => file.endsWith('.md'))
        .sort();

      if (subcategoryFiles.length === 0) return;

      const formattedSubcategoryName = formatCategoryName(subcategory);
      readmeContent += `## ${formattedSubcategoryName}\n\n`;

      subcategoryFiles.forEach(file => {
        const filePath = path.join(subcategoryPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const frontmatter = parseFrontmatter(content);

        if (!frontmatter) return;

        const title = frontmatter.title || file.replace('.md', '');
        const description = extractDescription(content, frontmatter);

        readmeContent += `### [${title}](${subcategory}/${file})

${description}

`;
        totalPosts++;
      });
    });

    readmeContent += `---

*Total posts: ${totalPosts} across ${subcategories.length} subcategories*
`;

    // Write README file
    const readmePath = path.join(categoryPath, 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`✓ Created README for ${categoryName} (${totalPosts} posts in ${subcategories.length} subcategories)`);
  } else {
    // Handle flat structure with direct markdown files
    const files = items
      .filter(file => file.endsWith('.md'))
      .sort();

    if (files.length === 0) return;

    const posts = files.map(file => {
      const filePath = path.join(categoryPath, file);
      const content = fs.readFileSync(filePath, 'utf-8');
      const frontmatter = parseFrontmatter(content);

      if (!frontmatter) return null;

      const title = frontmatter.title || file.replace('.md', '');
      const description = extractDescription(content, frontmatter);

      return {
        file,
        title,
        description
      };
    }).filter(Boolean);

    let readmeContent = `---
title: ${formattedCategoryName}
---

# ${formattedCategoryName} Posts

Browse all ${posts.length} AI comparison post${posts.length !== 1 ? 's' : ''} in the ${formattedCategoryName} category.

## Posts

`;

    posts.forEach(post => {
      readmeContent += `### [${post.title}](${post.file})

${post.description}

`;
    });

    readmeContent += `---

*Total posts: ${posts.length}*
`;

    // Write README file
    const readmePath = path.join(categoryPath, 'README.md');
    fs.writeFileSync(readmePath, readmeContent);
    console.log(`✓ Created README for ${categoryName} (${posts.length} posts)`);
  }
}

// Main function
function main() {
  const categories = fs.readdirSync(AI_LIBRARY_PATH)
    .filter(item => {
      const itemPath = path.join(AI_LIBRARY_PATH, item);
      return fs.statSync(itemPath).isDirectory();
    });

  console.log(`Found ${categories.length} categories\n`);

  let createdCount = 0;
  let skippedCount = 0;

  categories.forEach(category => {
    const categoryPath = path.join(AI_LIBRARY_PATH, category);
    const readmePath = path.join(categoryPath, 'README.md');

    // Skip if README already exists
    if (fs.existsSync(readmePath)) {
      console.log(`- Skipped ${category} (README already exists)`);
      skippedCount++;
      return;
    }

    generateCategoryReadme(categoryPath, category);
    createdCount++;
  });

  console.log(`\n✅ Done! Created ${createdCount} README files, skipped ${skippedCount} existing ones.`);
}

main();
