import React from 'react';
import Wish from './Wish';

const Countdown = ({ countdownData, name }) => {
  if (!countdownData.isItBday) {
    return (
      <div>
        <h1 className='heading'>
          Countdown to <span className='highlight'>{name}'s</span> Birthday
        </h1>
        <div className='countdown-wrapper'>
          <div className='countdown-box'>
            <div className='number'>{countdownData.days}</div>
            <span className='legend'>Days</span>
          </div>
          <div className='countdown-box'>
            <div className='number'>{countdownData.hours}</div>
            <span className='legend'>Hours</span>
          </div>
          <div className='countdown-box'>
            <div className='number'>{countdownData.minutes}</div>
            <span className='legend'>Minutes</span>
          </div>
          <div className='countdown-box'>
            <div className='number'>{countdownData.seconds}</div>
            <span className='legend'>Seconds</span>
          </div>
        </div>
      </div>
    );
  } else {
    return <Wish name={name} />;
  }
};

export default Countdown;
