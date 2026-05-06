const fs = require('fs');
const path = require('path');
const companyKnowledge = require('../data/company_knowledge.json');

// Get all files from a directory
function getAllFiles(dirPath, filesArray = []) {
  if (!fs.existsSync(dirPath)) return filesArray;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      filesArray = getAllFiles(fullPath, filesArray);
    } else {
      if (fullPath.endsWith('.html') || fullPath.endsWith('.txt') || fullPath.endsWith('.md')) {
        filesArray.push(fullPath);
      }
    }
  }
  return filesArray;
}

const ROOT_DIR = path.resolve(__dirname, '../../');

function loadDocuments() {
  const documents = [];

  // Manual Knowledge
  documents.push({
    source: 'manual_knowledge',
    content: JSON.stringify(companyKnowledge.company_knowledge, null, 2)
  });

  const dirsToScan = ['page_sources'];
  for (const dir of dirsToScan) {
    const fullDir = path.join(ROOT_DIR, dir);
    const files = getAllFiles(fullDir);
    for (const file of files) {
      documents.push({
        source: file.replace(ROOT_DIR, ''),
        content: fs.readFileSync(file, 'utf-8').slice(0, 5000) // limit to avoid massive files
      });
    }
  }

  // Load root files
  const rootFiles = ['layout_and_routes.md', 'pages_layout.txt', 'routes_info.txt'];
  for (const rootFile of rootFiles) {
    const fullPath = path.join(ROOT_DIR, rootFile);
    if (fs.existsSync(fullPath)) {
      documents.push({
        source: rootFile,
        content: fs.readFileSync(fullPath, 'utf-8').slice(0, 5000)
      });
    }
  }

  return documents;
}

// Very simple exact keyword match
function searchKnowledgeBase(query) {
  const documents = loadDocuments();
  const keywords = query.toLowerCase().split(/[^\w]+/).filter(w => w.length > 3);
  
  if (keywords.length === 0) {
    return documents.find(d => d.source === 'manual_knowledge')?.content || '';
  }

  const scoredDocs = documents.map(doc => {
    let score = 0;
    const contentLower = doc.content.toLowerCase();
    for (const keyword of keywords) {
      if (contentLower.includes(keyword)) {
        score++;
      }
    }
    return { ...doc, score };
  });

  scoredDocs.sort((a, b) => b.score - a.score);

  // Return the manual knowledge and top 2 highest scoring docs to fit into context window
  const topDocs = scoredDocs.slice(0, 3).filter(d => d.score > 0);
  
  let manual = documents.find(d => d.source === 'manual_knowledge');
  if (manual && !topDocs.find(d => d.source === 'manual_knowledge')) {
    topDocs.unshift(manual);
  }

  return topDocs.map(d => `--- SOURCE: ${d.source} ---\n${d.content}`).join(`\n\n`);
}

module.exports = {
  searchKnowledgeBase
};