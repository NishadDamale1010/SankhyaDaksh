import React, { useState } from 'react';
import { Bot, Send, Sparkles, User, Paperclip } from 'lucide-react';
import { officerProfile } from '../data/mockData';

export default function AIAssistantPage() {
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: "Hello Ananya! 👋\nI'm here to help you learn better. What would you like to know?",
      suggestions: ['What is the difference between census and survey?'],
    },
  ]);
  const [inputVal, setInputVal] = useState('');

  const handleSend = async (textToSend) => {
    const text = textToSend || inputVal;
    if (!text.trim()) return;

    // Add user message
    const newMessages = [
      ...messages,
      { sender: 'user', text },
    ];
    setMessages(newMessages);
    setInputVal('');

    // Simulate AI response
    setMessages((prev) => [...prev, { sender: 'bot', text: '...' }]);

    try {
      const aimlUrl = import.meta.env.VITE_AIML_URL || 'http://localhost:8000';
      const response = await fetch(`${aimlUrl}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question: text, context: '' })
      });
      const data = await response.json();
      
      let botText = data.response;
      if (Array.isArray(botText)) botText = botText.join('\n');

      setMessages((prev) => {
        const newMsg = [...prev];
        newMsg[newMsg.length - 1] = { sender: 'bot', text: botText };
        return newMsg;
      });
    } catch (err) {
      setMessages((prev) => {
        const newMsg = [...prev];
        newMsg[newMsg.length - 1] = { sender: 'bot', text: "Error connecting to AI server. Make sure the Python backend is running on port 8000." };
        return newMsg;
      });
    }
  };

  return (
    <div className="page-wrapper full-height-chat">
      {/* Title */}
      <div className="flex-between mb-4">
        <div>
          <h1 className="page-title">AI Assistant</h1>
          <p className="page-subtitle">Your personalized MoSPI statistical learning copilot</p>
        </div>
      </div>

      {/* Chat Container */}
      <div className="card chat-container flex-col">
        {/* Messages Scroll Area */}
        <div className="chat-messages-area flex-col gap-4">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`chat-bubble-row ${msg.sender === 'user' ? 'user-row' : 'bot-row'}`}
            >
              <div className="chat-avatar">
                {msg.sender === 'user' ? (
                  <div className="avatar-circle user">AV</div>
                ) : (
                  <div className="avatar-circle bot">
                    <Sparkles size={16} color="#ffffff" />
                  </div>
                )}
              </div>

              <div className="chat-bubble-content">
                <div className="bubble-text whitespace-pre-line">
                  {msg.text}
                </div>

                {/* Quick suggestion pills if present */}
                {msg.suggestions && (
                  <div className="suggestion-pills-row mt-3 flex-wrap gap-2">
                    {msg.suggestions.map((sug, sIdx) => (
                      <button
                        key={sIdx}
                        className="btn-suggestion-pill"
                        onClick={() => handleSend(sug)}
                      >
                        {sug}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Input Box */}
        <div className="chat-input-bar mt-4 flex-align-gap">
          <button className="icon-btn text-muted" title="Attach Document">
            <Paperclip size={18} />
          </button>
          <input
            type="text"
            className="form-input chat-input"
            placeholder="Ask me anything..."
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            className="btn btn-primary btn-icon"
            onClick={() => handleSend()}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
