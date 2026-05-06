const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { searchKnowledgeBase, performWebSearch } = require('../utils/rag');

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the official company website assistant for Weybee.
Your primary role is to answer questions about the company using the provided CONTEXT.

STRICT RULES:
1. ONLY answer based on the provided CONTEXT. Do NOT use outside knowledge for facts about the company.
2. If verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"
3. Never guess or hallucinate names, contact information, or numbers.
4. Keep answers short, clean, and professional.
5. If the data says [Notice: Unverified Web Search Data], you MUST add a disclaimer to your final answer saying "Note: This information is from an automated web search and may not be 100% accurate."

CONTEXT:
`;

router.post('/', async (req, res) => {
  try {
    const { message, history, useWebSearch } = req.body;
    if (!message) return res.status(400).json({ error: 'Message is required' });

    if (!groq) {
        return res.status(500).json({ error: 'Chatbot provider is not configured properly.' });
    }

    let contextData = await searchKnowledgeBase(message);
    
    // Modify system prompt based on user web search preference
    let dynamicSystemPrompt = SYSTEM_PROMPT;
    if (useWebSearch) {
      // Direct instruction to use FLAG if missing
      dynamicSystemPrompt = dynamicSystemPrompt.replace(
        '2. If verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"',
        '2. If verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"'
      );
    } else {
      // Do not use FLAG_MISSING_INFO if web search is off. Just reply gracefully.
      dynamicSystemPrompt = dynamicSystemPrompt.replace(
        '2. If verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"',
        '2. If verifiable information is NOT in the CONTEXT, you MUST reply: "I do not have verified information about that in my knowledge base." Do NOT reply with FLAG_MISSING_INFO.'
      );
    }

    let messages = [
      { role: 'system', content: dynamicSystemPrompt + contextData },
      ...(history || []),
      { role: 'user', content: message }
    ];

    let chatCompletion = await groq.chat.completions.create({
      messages,
      model: MODEL,
      temperature: 0.2, // Low temperature for more factual answers
      max_tokens: 500,
    });

    let responseText = chatCompletion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
    
    // If the bot flags it doesn't know AND user checked extensive web search, let's web search
    if (useWebSearch && responseText.includes("FLAG_MISSING_INFO")) {
      const webResult = await performWebSearch(message);
      
      if (webResult) {
        contextData += `\n\n--- SOURCE: db_web_search ---\nQ: ${message}\nA: ${webResult}\n[Notice: Unverified Web Search Data]`;
        
        dynamicSystemPrompt = SYSTEM_PROMPT.replace(
           '2. If verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"',
           '2. If verifiable information is NOT in the CONTEXT, you MUST reply: "I do not have verified information about that, and I couldn\'t find it online."'
        );

        messages = [
          { role: 'system', content: dynamicSystemPrompt + contextData },
          ...(history || []),
          { role: 'user', content: message }
        ];

        chatCompletion = await groq.chat.completions.create({
          messages,
          model: MODEL,
          temperature: 0.2,
          max_tokens: 500,
        });

        responseText = chatCompletion.choices[0]?.message?.content || 'I apologize, but I could not generate a response.';
      } else {
        responseText = "I do not have verified information about that in my knowledge base, and I couldn't find any recent search results.";
      }
    }

    res.json({
        answer: responseText,
        sourcesMsg: contextData ? 'Checked company knowledge base' : null
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;