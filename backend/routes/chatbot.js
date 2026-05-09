const express = require('express');
const router = express.Router();
const Groq = require('groq-sdk');
const { searchKnowledgeBase, performWebSearch } = require('../utils/rag');

const groq = process.env.GROQ_API_KEY ? new Groq({ apiKey: process.env.GROQ_API_KEY }) : null;
const MODEL = process.env.GROQ_MODEL || 'llama-3.3-70b-versatile';

const SYSTEM_PROMPT = `You are the official company website assistant for Weybee (WeyBee Solutions Private Limited).
Your primary role is to accurately and helpfully answer questions about the company Weybee using the provided CONTEXT.

STRICT RULES:
1. ONLY answer based on the provided CONTEXT. Do NOT use outside knowledge for facts about the company.
2. If the user asks a question completely unrelated to Weybee, tech services, or the provided context, politely decline to answer and remind them you are a Weybee company assistant.
3. Users might ask questions in general or non-technical terms (e.g. "Can you build an app?", "Do you make websites?"). Intelligently map their needs to our technical capabilities and services (e.g., "Yes, we offer Custom Software Development and Mobile App Development!").
4. Be robust and helpful. Don't be too robotic; if they ask a general question, use the context to give a comprehensive, relevant answer.
5. If the user asks about Weybee but the verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"
6. Never guess or hallucinate names, contact information, or numbers.
7. Keep answers short, clear, helpful, and professional.
8. If the data says [Notice: Unverified Web Search Data], you MUST add a disclaimer to your final answer saying "Note: This information is from an automated web search and may not be 100% accurate."

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
    let messages = [
      { role: 'system', content: SYSTEM_PROMPT + "\n" + contextData },
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
    if (responseText.includes("FLAG_MISSING_INFO")) {
      if (useWebSearch) {
        const webResult = await performWebSearch(message);
        
        if (webResult) {
          contextData += `\n\n--- SOURCE: db_web_search ---\nQ: ${message}\nA: ${webResult}\n[Notice: Unverified Web Search Data]`;
          
          let dynamicSystemPrompt = SYSTEM_PROMPT.replace(
             '5. If the user asks about Weybee but the verifiable information is NOT in the CONTEXT, you MUST reply EXACTLY with: "FLAG_MISSING_INFO"',
             '5. If verifiable information is NOT in the CONTEXT, you MUST reply: "I do not have verified information about that, and I couldn\'t find it online."'
          );

          messages = [
            { role: 'system', content: dynamicSystemPrompt + "\n" + contextData },
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
      } else {
         responseText = "I do not have verified information about that in my knowledge base. You can enable the web search option if you'd like me to look it up online.";
      }
    }

    res.json({
        answer: responseText,
        sourcesMsg: useWebSearch ? 'Checked knowledge base and web search' : 'Checked company knowledge base'
    });
  } catch (error) {
    console.error('Chatbot error:', error);
    res.status(500).json({ error: 'Failed to process chat message' });
  }
});

module.exports = router;