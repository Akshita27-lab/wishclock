import React, { useState, useEffect } from 'react';
import Countdown from './Countdown';
import { Link } from 'react-router-dom';
import AddMessage from './AddMessage';
import MessageViewer from './MessageViewer';
import Features from './Features';
import WishClockLogo from './WishClockLogo';

const Birthday = ({ name, day, month }) => {
  const [state, setState] = useState({
    seconds: 0,
    hours: 0,
    minutes: 0,
    days: 0,
    isItBday: false,
  });

  const [showMessageForm, setShowMessageForm] = useState(false);
  const [showMessageViewer, setShowMessageViewer] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);

  if (name === undefined || day === undefined || month === undefined) {
    name = 'Buddy';
    month = 12;
    day = 25;
  }

  const currentTime = new Date();
  const currentYear = currentTime.getFullYear();

  const isItBday =
    currentTime.getDate() === day && currentTime.getMonth() === month - 1;

  useEffect(() => {
    const timer = setInterval(() => {
      const dateAtm = new Date();
      let birthdayDay = new Date(currentYear, month - 1, day);
      if (dateAtm > birthdayDay) {
        birthdayDay = new Date(currentYear + 1, month - 1, day);
      }

      const currentTime = dateAtm.getTime();
      const birthdayTime = birthdayDay.getTime();
      const timeRemaining = birthdayTime - currentTime;

      let seconds = Math.floor(timeRemaining / 1000);
      let minutes = Math.floor(seconds / 60);
      let hours = Math.floor(minutes / 60);
      let days = Math.floor(hours / 24);

      seconds %= 60;
      minutes %= 60;
      hours %= 24;

      setState({
        seconds,
        minutes,
        hours,
        days,
        isItBday,
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [currentYear, day, isItBday, month]);

  let birth = new Date(currentYear, month - 1, day);
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
  ];
  let monthBday = monthNames[birth.getMonth()];

  return (
    <div className='page'>
      <div className='card-container'>
        <WishClockLogo size='large' />
        <Countdown countdownData={state} name={name} />

        {!isItBday && (
          <>
            <div className='birthdate'>
              Birth-Date: {day} {monthBday} {currentYear}
            </div>

            <div className='share-section'>
              <h3 className='share-title'>Share Countdown with {name}!</h3>
              <div className='share-link'>
                <input
                  type='text'
                  value={window.location.href}
                  readOnly
                  className='share-input'
                />
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard! Share it with ' + name + '!');
                  }}
                  className='copy-btn'
                >
                  📋 Copy Link
                </button>
              </div>
            </div>

            <div className='message-actions'>
              <button
                onClick={() => setShowMessageForm(!showMessageForm)}
                className='add-message-btn'
              >
                {showMessageForm ? 'Hide Message Form' : `Send Birthday Wish to ${name}`}
              </button>

              <button
                onClick={() => setShowMessageViewer(!showMessageViewer)}
                className='view-messages-btn'
                style={{ marginTop: '1rem' }}
              >
                {showMessageViewer ? 'Hide Messages' : 'View Birthday Messages'}
              </button>

              <button
                onClick={() => setShowFeatures(!showFeatures)}
                className='features-btn'
                style={{ marginTop: '1rem' }}
              >
                {showFeatures ? 'Hide Features' : '🎁 Birthday Planning Tools'}
              </button>
            </div>

            {showMessageForm && (
              <div className='message-form-wrapper'>
                <AddMessage />
              </div>
            )}

            {showMessageViewer && (
              <div className='message-form-wrapper'>
                <MessageViewer />
              </div>
            )}

            {showFeatures && (
              <div className='message-form-wrapper'>
                <Features name={name} day={day} month={month} />
              </div>
            )}

            <Link to='/generate' className='gen-link'>Generate Here</Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Birthday;
