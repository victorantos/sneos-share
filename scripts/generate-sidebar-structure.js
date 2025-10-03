import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const AI_LIBRARY_DIR = path.join(__dirname, '../docs/compare/ai-library');

// Read all markdown files
const files = fs.readdirSync(AI_LIBRARY_DIR)
  .filter(f => f.endsWith('.md') && f !== 'index.md')
  .map(filename => {
    const filePath = path.join(AI_LIBRARY_DIR, filename);
    const content = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(content);

    const title = data.title || filename.replace('.md', '');
    const description = data.description || '';

    return {
      filename: filename.replace('.md', ''),
      title,
      description,
      tags: data.tags || [],
      date: data.date
    };
  });

// Categorize files
const categorized = {
  'AI Comparison': [],
  'Education': [],
  'Finance': [],
  'Lawyers': [],
  'Legal': [],
  'Research': [],
  'Universities': [],
  'VIRAL CONTENT': []
};

files.forEach(file => {
  let category = 'AI Comparison';

  const desc = file.description.toLowerCase();
  if (desc.includes('career advice') || desc.includes('skills development') ||
      desc.includes('learning') || desc.includes('study') || desc.includes('education') ||
      desc.includes('homeschool') || desc.includes('test preparation')) {
    category = 'Education';
  } else if (desc.includes('investment') || desc.includes('crypto') ||
             desc.includes('debt') || desc.includes('money') || desc.includes('finance') ||
             desc.includes('retirement') || desc.includes('tax')) {
    category = 'Finance';
  } else if (desc.includes('lawyer') || desc.includes('law firm') || desc.includes('legal practice')) {
    category = 'Lawyers';
  } else if (desc.includes('employment law') || desc.includes('constitutional') ||
             desc.includes('immigration law') || desc.includes('legal') || desc.includes('court')) {
    category = 'Legal';
  } else if (desc.includes('research') || desc.includes('science') || desc.includes('technology breakthrough')) {
    category = 'Research';
  } else if (desc.includes('university') || desc.includes('college') || desc.includes('admissions') ||
             desc.includes('scholarship') || desc.includes('student debt')) {
    category = 'Universities';
  } else if (desc.includes('millionaire') || desc.includes('secrets') || desc.includes('viral') ||
             desc.includes('celebrity') || desc.includes('conspiracy')) {
    category = 'VIRAL CONTENT';
  }

  categorized[category].push(file.filename);
});

// Generate sidebar config snippet
let sidebarConfig = `  "/compare/ai-library/": [
    "",
`;

Object.keys(categorized).forEach(category => {
  const posts = categorized[category];
  if (posts.length === 0) return;

  const iconMap = {
    'AI Comparison': 'brain',
    'Education': 'graduation-cap',
    'Finance': 'dollar-sign',
    'Lawyers': 'briefcase',
    'Legal': 'gavel',
    'Research': 'flask',
    'Universities': 'university',
    'VIRAL CONTENT': 'fire'
  };

  sidebarConfig += `    {
      text: "${category}",
      icon: "${iconMap[category]}",
      collapsible: true,
      children: [\n`;

  posts.forEach(filename => {
    sidebarConfig += `        "${filename}",\n`;
  });

  sidebarConfig += `      ],
    },
`;
});

sidebarConfig += `  ],`;

console.log(sidebarConfig);
console.log(`\n✅ Generated sidebar structure with ${files.length} posts across ${Object.keys(categorized).length} categories`);
console.log('Copy the output above and replace the /compare/ai-library/ section in docs/.vuepress/sidebar.ts');