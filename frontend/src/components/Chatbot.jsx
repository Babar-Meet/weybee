import React, { useState, useRef, useEffect } from "react";
import "./Chatbot.css";
import axios from "axios";

// Get base URL for localhost vs production
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([
    {
      role: "assistant",
      content:
        "Hi there! I am the Weybee assistant. I can answer questions about the company. How can I help you today?",
    },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [useWebSearch, setUseWebSearch] = useState(false);
  const scrollRef = useRef(null);

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  const handleSend = async () => {
    if (!message.trim()) return;

    const userMsg = message.trim();
    setMessage("");

    const newHistory = [...history, { role: "user", content: userMsg }];
    setHistory(newHistory);
    setIsLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chatbot`, {
        message: userMsg,
        useWebSearch: useWebSearch,
        // send recent history for context, excluding the initial system message if preferred or keep basic mapping
        history: newHistory
          .slice(-6)
          .map((h) => ({ role: h.role, content: h.content })),
      });

      setHistory([
        ...newHistory,
        { role: "assistant", content: response.data.answer },
      ]);
    } catch (error) {
      setHistory([
        ...newHistory,
        {
          role: "assistant",
          content:
            "I apologize, but I am currently unavailable. Please try again later.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="chatbot-container">
      {isOpen ? (
        <div className="chatbot-window">
          <div className="chatbot-header">
            <h3>Company Assistant</h3>
            <button onClick={() => setIsOpen(false)} aria-label="Close Chat">
              <span>✕</span>
            </button>
          </div>

          <div className="chatbot-messages" ref={scrollRef}>
            {history.map((msg, idx) => (
              <div
                key={idx}
                className={`chat-bubble-container ${msg.role === "user" ? "chat-right" : "chat-left"}`}
              >
                <div
                  className={`chat-bubble ${msg.role === "user" ? "user-bubble" : "bot-bubble"}`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="chat-bubble-container chat-left">
                <div className="chat-bubble bot-bubble typing-indicator">
                  Bot is typing<span className="dots">...</span>
                </div>
              </div>
            )}
          </div>

          <div className="chatbot-input">
            <div className="chatbot-options">
              <label>
                <input
                  type="checkbox"
                  checked={useWebSearch}
                  onChange={(e) => setUseWebSearch(e.target.checked)}
                />
                Extensive Web Search
              </label>
            </div>
            <div className="chatbot-input-row">
              <textarea
                placeholder="Ask about Weybee..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={handleKeyDown}
                rows="1"
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || isLoading}
              >
                &gt;
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="chatbot-fab"
          onClick={() => setIsOpen(true)}
          aria-label="Open Chat"
        >
          💬
        </button>
      )}
    </div>
  );
};

export default Chatbot;
