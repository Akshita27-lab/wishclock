import React, { useState, useEffect } from 'react';

const MessageViewer = () => {
  const [messages, setMessages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const savedMessages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    setMessages(savedMessages);
  }, []);

  const nextMessage = () => {
    if (messages.length > 0) {
      setCurrentIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const prevMessage = () => {
    if (messages.length > 0) {
      setCurrentIndex((prev) => (prev - 1 + messages.length) % messages.length);
    }
  };

  const clearAllMessages = () => {
    if (window.confirm('Are you sure you want to delete all messages? This cannot be undone.')) {
      localStorage.removeItem('birthdayMessages');
      setMessages([]);
      setCurrentIndex(0);
    }
  };

  if (messages.length === 0) {
    return (
      <div className='message-viewer-empty'>
        <h3>No Birthday Messages Yet</h3>
        <p>Be the first to send a birthday wish to Akshita! 🎉</p>
      </div>
    );
  }

  return (
    <div className='message-viewer'>
      <h3 className='viewer-title'>
        Birthday Messages ({messages.length} total) 💝
      </h3>
      
      <div className='message-display'>
        <div className='message-card'>
          <div className='message-sender'>
            From: <span className='sender-name'>{messages[currentIndex].sender}</span>
          </div>
          <div className='message-content'>
            "{messages[currentIndex].message}"
          </div>
          <div className='message-timestamp'>
            {messages[currentIndex].timestamp}
          </div>
        </div>
        
        {messages.length > 1 && (
          <div className='message-navigation'>
            <button onClick={prevMessage} className='nav-btn'>‹</button>
            <span className='message-counter'>
              {currentIndex + 1} of {messages.length}
            </span>
            <button onClick={nextMessage} className='nav-btn'>›</button>
          </div>
        )}
      </div>
      
      <div className='viewer-actions'>
        <button onClick={clearAllMessages} className='clear-messages-btn'>
          Clear All Messages
        </button>
      </div>
    </div>
  );
};

export default MessageViewer; 