import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import WishClockLogo from './WishClockLogo';

const Generate = () => {
  const [name, setName] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [generatedLink, setGeneratedLink] = useState('');

  const generateLink = () => {
    if (name && day && month) {
      const link = `${window.location.origin}/birthday/${name}/${day}/${month}`;
      setGeneratedLink(link);
    } else {
      alert('Please fill in all fields!');
    }
  };

  const copyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    alert('Link copied to clipboard!');
  };

  return (
    <div className='page'>
      <div className='card-container'>
        <WishClockLogo size='medium' />
        <h1 className='generate-title'>Create Your Birthday Countdown</h1>
        <div className='form'>
          <input
            type='text'
            placeholder='Name of the Person'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='input'
          />
          <input
            type='number'
            placeholder='Day of Birthday (1-31)'
            value={day}
            onChange={(e) => setDay(e.target.value)}
            className='input'
            min='1'
            max='31'
          />
          <select
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className='select'
          >
            <option value=''>Select Month</option>
            <option value='1'>January</option>
            <option value='2'>February</option>
            <option value='3'>March</option>
            <option value='4'>April</option>
            <option value='5'>May</option>
            <option value='6'>June</option>
            <option value='7'>July</option>
            <option value='8'>August</option>
            <option value='9'>September</option>
            <option value='10'>October</option>
            <option value='11'>November</option>
            <option value='12'>December</option>
          </select>
          <button onClick={generateLink} className='btn'>
            Generate Link
          </button>
        </div>

        {generatedLink && (
          <div className='generated-link'>
            <h3>Your Birthday Countdown Link:</h3>
            <div className='link-display'>
              <input
                type='text'
                value={generatedLink}
                readOnly
                className='link-input'
              />
              <button onClick={copyLink} className='copy-btn'>
                📋 Copy
              </button>
            </div>
            <Link to={generatedLink} className='visit-btn'>
              🎉 Visit Countdown
            </Link>
          </div>
        )}

        <Link to='/' className='back-link'>
          ← Back to Home
        </Link>
      </div>
    </div>
  );
};

export default Generate;
