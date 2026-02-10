import React, { useState } from 'react';
import { askChatbot } from '../services/api';
import '../styles/chatbot.css';

function Chatbot() {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hello! I am Jarurat Care Bot. How can I help you today?',
      sender: 'bot',
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const validateMessage = (message) => {
    if (!message.trim()) {
      return { valid: false, error: 'Message cannot be empty' };
    }
    if (message.trim().length < 3) {
      return { valid: false, error: 'Message must be at least 3 characters' };
    }
    if (message.length > 500) {
      return { valid: false, error: 'Message cannot exceed 500 characters' };
    }
    return { valid: true };
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    
    // Validate message
    const validation = validateMessage(inputValue);
    if (!validation.valid) {
      setError(validation.error);
      return;
    }
    
    setError('');

    // Add user message
    const userMessage = {
      id: messages.length + 1,
      text: inputValue,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setLoading(true);

    try {
      const response = await askChatbot(inputValue);
      const botMessage = {
        id: messages.length + 2,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
        confidence: response.data.confidence,
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: error.response?.data?.response || 'An error occurred. Please try again.',
        sender: 'bot',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setLoading(false);
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">
        <h2>Jarurat Care Bot - FAQ Assistant</h2>
        <p>Ask any question about our services (min 3 characters)</p>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg) => (
          <div key={msg.id} className={`message ${msg.sender}`}>
            <div className="message-content">
              <p>{msg.text}</p>
              {msg.confidence && (
                <small className="confidence">Confidence: {msg.confidence}%</small>
              )}
            </div>
            <span className="timestamp">
              {msg.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        ))}
        {loading && (
          <div className="message bot">
            <div className="message-content typing">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      {error && <div className="chatbot-error">{error}</div>}

      <form onSubmit={handleSendMessage} className="chatbot-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
            if (error) setError('');
          }}
          placeholder="Type your question here (3-500 characters)..."
          disabled={loading}
          maxLength="500"
        />
        <span className="char-count">{inputValue.length}/500</span>
        <button type="submit" disabled={loading || inputValue.length < 3}>
          {loading ? 'Sending...' : 'Send'}
        </button>
      </form>
    </div>
  );
}

export default Chatbot;
