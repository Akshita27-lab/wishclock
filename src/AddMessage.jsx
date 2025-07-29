import React, { useState } from 'react';

const AddMessage = ({ onMessageAdded }) => {
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senderName.trim() && message.trim()) {
      const newMessage = {
        id: Date.now(),
        sender: senderName.trim(),
        message: message.trim(),
        timestamp: new Date().toLocaleString(),
      };

      // Get existing messages from localStorage
      const existingMessages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
      const updatedMessages = [...existingMessages, newMessage];
      
      // Save to localStorage
      localStorage.setItem('birthdayMessages', JSON.stringify(updatedMessages));
      
      // Notify parent component
      if (onMessageAdded) {
        onMessageAdded(newMessage);
      }
      
      // Reset form
      setSenderName('');
      setMessage('');
      setIsSubmitted(true);
      
      // Reset submission status after 3 seconds
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  return (
    <div className='message-form-container'>
      <h2 className='message-form-title'>
        Send a <span className='highlight'>Birthday Wish</span> to Akshita! 🎉
      </h2>
      
      {isSubmitted && (
        <div className='success-message'>
          <div className='success-icon'>🎉</div>
          <p>Your birthday wish has been sent! It will appear on Akshita's special day!</p>
        </div>
      )}
      
      <form onSubmit={handleSubmit} className='message-form'>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Your Name'
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className='message-input'
            required
          />
        </div>
        
        <div className='form-group'>
          <textarea
            placeholder='Write your personalized birthday message here...'
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className='message-textarea'
            rows='4'
            required
          />
        </div>
        
        <button type='submit' className='message-submit-btn'>
          Send Birthday Wish ✨
        </button>
      </form>
    </div>
  );
};

export default AddMessage; 