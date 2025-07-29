import React, { useState, useEffect } from 'react';
import AddMessage from './AddMessage';
import WishClockLogo from './WishClockLogo';

const Wish = ({ name }) => {
  const [messages, setMessages] = useState([]);
  const [showMessageForm, setShowMessageForm] = useState(false);
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [confetti, setConfetti] = useState([]);

  useEffect(() => {
    // Load messages from localStorage
    const savedMessages = JSON.parse(localStorage.getItem('birthdayMessages') || '[]');
    setMessages(savedMessages);

    // Create confetti particles
    createConfetti();

    // Auto-rotate messages every 5 seconds
    if (savedMessages.length > 1) {
      const interval = setInterval(() => {
        setCurrentMessageIndex((prev) => (prev + 1) % savedMessages.length);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, []);

  const createConfetti = () => {
    const confettiPieces = [];
    for (let i = 0; i < 100; i++) {
      confettiPieces.push({
        id: i,
        x: Math.random() * window.innerWidth,
        y: -10,
        color: ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57', '#ff9ff3', '#54a0ff', '#5f27cd'][Math.floor(Math.random() * 8)],
        size: Math.random() * 10 + 5,
        speed: Math.random() * 3 + 2,
        rotation: Math.random() * 360,
        rotationSpeed: Math.random() * 10 - 5
      });
    }
    setConfetti(confettiPieces);
  };

  const handleMessageAdded = (newMessage) => {
    setMessages(prev => [...prev, newMessage]);
  };

  const nextMessage = () => {
    if (messages.length > 0) {
      setCurrentMessageIndex((prev) => (prev + 1) % messages.length);
    }
  };

  const prevMessage = () => {
    if (messages.length > 0) {
      setCurrentMessageIndex((prev) => (prev - 1 + messages.length) % messages.length);
    }
  };

  return (
    <div className='wish-container'>
      <WishClockLogo size='large' />

      {/* Confetti Animation */}
      <div className='confetti-container'>
        {confetti.map((piece) => (
          <div
            key={piece.id}
            className='confetti-piece'
            style={{
              left: piece.x + 'px',
              top: piece.y + 'px',
              backgroundColor: piece.color,
              width: piece.size + 'px',
              height: piece.size + 'px',
              transform: `rotate(${piece.rotation}deg)`,
              animation: `confettiFall ${piece.speed}s linear infinite, confettiRotate ${Math.abs(piece.rotationSpeed)}s linear infinite`
            }}
          />
        ))}
      </div>

      {/* Main Birthday Message */}
      <div className='wish-message'>
        HAPPY BIRTHDAY <span className='highlight'>{name.toUpperCase()}</span> !!!
      </div>

      {/* Celebration Stickers */}
      <div className='celebration-stickers'>
        <div className='sticker sticker-1'>🎂</div>
        <div className='sticker sticker-2'>🎉</div>
        <div className='sticker sticker-3'>🎊</div>
        <div className='sticker sticker-4'>🎈</div>
        <div className='sticker sticker-5'>🎁</div>
        <div className='sticker sticker-6'>⭐</div>
        <div className='sticker sticker-7'>💝</div>
        <div className='sticker sticker-8'>🎆</div>
      </div>

      {/* Poppers Animation */}
      <div className='poppers-container'>
        <div className='popper popper-1'></div>
        <div className='popper popper-2'></div>
        <div className='popper popper-3'></div>
        <div className='popper popper-4'></div>
      </div>

      {messages.length > 0 ? (
        <div className='personalized-messages'>
          <h3 className='messages-title'>
            Special Messages from Your Loved Ones 💝
          </h3>

          <div className='message-display'>
            <div className='message-card'>
              <div className='message-sender'>
                From: <span className='sender-name'>{messages[currentMessageIndex].sender}</span>
              </div>
              <div className='message-content'>
                "{messages[currentMessageIndex].message}"
              </div>
              <div className='message-timestamp'>
                {messages[currentMessageIndex].timestamp}
              </div>
            </div>

            {messages.length > 1 && (
              <div className='message-navigation'>
                <button onClick={prevMessage} className='nav-btn'>‹</button>
                <span className='message-counter'>
                  {currentMessageIndex + 1} of {messages.length}
                </span>
                <button onClick={nextMessage} className='nav-btn'>›</button>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className='no-messages'>
          <p>No personalized messages yet. Be the first to send a wish!</p>
        </div>
      )}

      <div className='message-actions'>
        <button
          onClick={() => setShowMessageForm(!showMessageForm)}
          className='add-message-btn'
        >
          {showMessageForm ? 'Hide Message Form' : 'Add Birthday Message'}
        </button>
      </div>

      {showMessageForm && (
        <div className='message-form-wrapper'>
          <AddMessage onMessageAdded={handleMessageAdded} />
        </div>
      )}
    </div>
  );
};

export default Wish;
