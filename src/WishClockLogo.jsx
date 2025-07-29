import React from 'react';

const WishClockLogo = ({ size = 'medium', showTagline = true }) => {
  const sizeClasses = {
    small: 'logo-small',
    medium: 'logo-medium',
    large: 'logo-large'
  };

  return (
    <div className={`wishclock-logo ${sizeClasses[size]}`}>
      <div className='logo-container'>
        <div className='logo-icon'>
          <div className='clock-face'>
            <div className='clock-hands'>
              <div className='hour-hand'></div>
              <div className='minute-hand'></div>
              <div className='second-hand'></div>
            </div>
            <div className='clock-center'></div>
          </div>
          <div className='wish-sparkles'>
            <div className='sparkle sparkle-1'>✨</div>
            <div className='sparkle sparkle-2'>💫</div>
            <div className='sparkle sparkle-3'>⭐</div>
          </div>
        </div>
        <div className='logo-text'>
          <h1 className='logo-title'>WishClock</h1>
          {showTagline && (
            <p className='logo-tagline'>Countdown to Magic ✨</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default WishClockLogo; 