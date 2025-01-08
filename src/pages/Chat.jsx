// src/pages/Chat.jsx
import React, { useState } from 'react';
import axios from 'axios';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSend = async () => {
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { role: 'user', content: input }]);
    setInput('');

    try {
      // Call the RAG API
      const response = await axios.post('/api/chat', { question: input });
      const answer = response.data.answer;

      // Add bot response to chat
      setMessages((prev) => [...prev, { role: 'bot', content: answer }]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [...prev, { role: 'bot', content: 'Sorry, something went wrong. Please try again.' }]);
    }
  };

  return (
    <div className="chat-container">
      <h2>Running Chat</h2>
      <div className="chat-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.role}`}>
            {msg.content}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Ask me anything about running..."
        />
        <button onClick={handleSend}>Send</button>
      </div>
    </div>
  );
};

export default Chat;