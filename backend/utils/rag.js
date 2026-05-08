const fs = require("fs");
const path = require("path");
const axios = require("axios");
const cheerio = require("cheerio");
const companyKnowledge = require("../data/company_knowledge.json");
const Knowledge = require("../models/Knowledge");

// Get all files from a directory
function getAllFiles(dirPath, filesArray = []) {
  if (!fs.existsSync(dirPath)) return filesArray;

  const files = fs.readdirSync(dirPath);
  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    if (fs.statSync(fullPath).isDirectory()) {
      filesArray = getAllFiles(fullPath, filesArray);
    } else {
      if (
        fullPath.endsWith(".html") ||
        fullPath.endsWith(".txt") ||
        fullPath.endsWith(".md")
      ) {
        filesArray.push(fullPath);
      }
    }
  }
  return filesArray;
}

const ROOT_DIR = path.resolve(__dirname, "../../");

function loadLocalDocuments() {
  const documents = [];

  // Manual Knowledge
  documents.push({
    source: "manual_knowledge",
    content: JSON.stringify(companyKnowledge.company_knowledge, null, 2),
  });

  const dirsToScan = ["page_sources"];
  for (const dir of dirsToScan) {
    const fullDir = path.join(ROOT_DIR, dir);
    const files = getAllFiles(fullDir);
    for (const file of files) {
      documents.push({
        source: file.replace(ROOT_DIR, ""),
        content: fs.readFileSync(file, "utf-8").slice(0, 5000), // limit to avoid massive files
      });
    }
  }

  // Load root files
  const rootFiles = [
    "layout_and_routes.md",
    "pages_layout.txt",
    "routes_info.txt",
  ];
  for (const rootFile of rootFiles) {
    const fullPath = path.join(ROOT_DIR, rootFile);
    if (fs.existsSync(fullPath)) {
      documents.push({
        source: rootFile,
        content: fs.readFileSync(fullPath, "utf-8").slice(0, 5000),
      });
    }
  }

  return documents;
}

// Very simple exact keyword match
async function searchKnowledgeBase(query) {
  const documents = loadLocalDocuments();

  // Load from DB
  const dbKnowledge = await Knowledge.find({});
  dbKnowledge.forEach((k) => {
    documents.push({
      source: k.isVerified ? "db_verified" : "db_web_search",
      content: `Q: ${k.question}\nA: ${k.answer}\n[Notice: ${k.isVerified ? "Verified by Admin" : "Unverified Web Search Data"}]`,
    });
  });

  const keywords = query
    .toLowerCase()
    .split(/[^\w]+/)
    .filter((w) => w.length > 1); // Reduced from 3 to 1 so keywords like 'hr' and 'it' get caught

  if (keywords.length === 0) {
    return (
      documents.find((d) => d.source === "manual_knowledge")?.content || ""
    );
  }

  const scoredDocs = documents.map((doc) => {
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

  // Return the manual knowledge and top 4 highest scoring docs to fit into context window
  const topDocs = scoredDocs.slice(0, 4).filter((d) => d.score > 0);

  let manual = documents.find((d) => d.source === "manual_knowledge");
  if (manual && !topDocs.find((d) => d.source === "manual_knowledge")) {
    topDocs.unshift(manual); // Manual DB JSON ALWAYS first
  }

  return topDocs
    .map((d) => `--- SOURCE: ${d.source} ---\n${d.content}`)
    .join(`\n\n`);
}

async function performWebSearch(query) {
  try {
    const searchUrl = "https://html.duckduckgo.com/html/";
    // Search both generally and specifically on their domain if possible, or just a comprehensive query
    const response = await axios.post(
      searchUrl,
      `q=${encodeURIComponent("WeyBee Solutions OR site:weybee.com " + query)}`,
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          "User-Agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36",
        },
      },
    );

    const $ = cheerio.load(response.data);
    let results = [];
    $(".result__snippet").each((i, el) => {
      if (i < 5) {
        // Increased to 5 snippets for more robust fallback
        results.push($(el).text().trim());
      }
    });

    if (results.length === 0) return null;

    const combinedResult = results.join("\n");

    // Save to DB
    const newKnowledge = new Knowledge({
      question: query,
      answer: combinedResult,
      source: "web_search",
      isVerified: false,
    });
    await newKnowledge.save();

    return combinedResult;
  } catch (err) {
    console.error("Web search error", err.message);
    return null;
  }
}

module.exports = {
  searchKnowledgeBase,
  performWebSearch,
  loadLocalDocuments,
};
