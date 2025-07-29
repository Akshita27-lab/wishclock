import React, { useState } from 'react';

const Features = ({ name, day, month }) => {
  const [activeTab, setActiveTab] = useState('gifts');

  const giftSuggestions = [
    { category: 'Electronics', items: ['Smartphone', 'Smart Watch', 'Wireless Earbuds', 'Tablet', 'Gaming Console'] },
    { category: 'Fashion', items: ['Designer Bag', 'Jewelry Set', 'Watch', 'Perfume', 'Shoes'] },
    { category: 'Home & Living', items: ['Smart Speaker', 'Coffee Maker', 'Plant Pot', 'Cushion Set', 'Wall Art'] },
    { category: 'Experiences', items: ['Spa Day', 'Concert Tickets', 'Travel Voucher', 'Cooking Class', 'Adventure Sports'] },
    { category: 'Personalized', items: ['Custom T-Shirt', 'Photo Album', 'Engraved Jewelry', 'Personalized Mug', 'Custom Art'] }
  ];

  const eventIdeas = [
    { type: 'Home Party', ideas: ['Theme Decoration', 'Birthday Cake', 'Music Playlist', 'Photo Booth', 'Games'] },
    { type: 'Outdoor', ideas: ['Park Picnic', 'Beach Party', 'Garden Celebration', 'BBQ Party', 'Adventure Day'] },
    { type: 'Restaurant', ideas: ['Fine Dining', 'Pizza Party', 'Dessert Cafe', 'Rooftop Dinner', 'Buffet'] },
    { type: 'Virtual', ideas: ['Zoom Party', 'Online Games', 'Virtual Cake Cutting', 'Video Messages', 'Online Shopping'] }
  ];

  const socialMediaTemplates = [
    { platform: 'Instagram', template: `🎉 Countdown to ${name}'s Birthday! Only {days} days left! 🎂✨ #BirthdayCountdown #${name}Birthday #WishClock` },
    { platform: 'WhatsApp', template: `Hey everyone! 🎉 ${name}'s birthday is coming up in {days} days! Let's make it special! 🎂 Check out this countdown: {link}` },
    { platform: 'Facebook', template: `🎂 Birthday Alert! ${name}'s special day is just {days} days away! Time to plan something amazing! 🎉 Created with WishClock ✨` },
    { platform: 'Twitter', template: `{days} days until ${name}'s birthday! 🎉🎂 #BirthdayCountdown #${name}Birthday #WishClock` }
  ];

  const countdownMessages = [
    "The countdown is on! 🎉",
    "Getting closer to the big day! 🎂",
    "Almost time to celebrate! ✨",
    "The excitement is building! 🎊",
    "Birthday vibes are in the air! 🌟"
  ];

  const shareFeatures = () => {
    const url = window.location.href;
    const text = `🎉 Countdown to ${name}'s Birthday! Check it out: ${url}`;
    
    if (navigator.share) {
      navigator.share({
        title: `${name}'s Birthday Countdown`,
        text: text,
        url: url
      });
    } else {
      navigator.clipboard.writeText(text);
      alert('Link copied! Share it with friends! 📋');
    }
  };

  const addToCalendar = () => {
    const currentYear = new Date().getFullYear();
    const birthdayDate = new Date(currentYear, month - 1, day);
    
    const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${name}'s Birthday&dates=${birthdayDate.toISOString().replace(/[-:]/g, '').split('.')[0]}/${birthdayDate.toISOString().replace(/[-:]/g, '').split('.')[0]}&details=Don't forget ${name}'s birthday! 🎂`;
    
    window.open(calendarUrl, '_blank');
  };

  const sendReminder = () => {
    const email = prompt('Enter email for birthday reminder:');
    if (email) {
      // In real app, this would send to backend
      alert(`Reminder set! You'll get notified about ${name}'s birthday! 📧`);
    }
  };

  return (
    <div className='features-container'>
      <h2 className='features-title'>
        Make {name}'s Birthday <span className='highlight'>Extra Special</span>! 🎉
      </h2>
      
      <div className='features-tabs'>
        <button 
          className={`tab-btn ${activeTab === 'gifts' ? 'active' : ''}`}
          onClick={() => setActiveTab('gifts')}
        >
          🎁 Gift Ideas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'events' ? 'active' : ''}`}
          onClick={() => setActiveTab('events')}
        >
          🎪 Event Ideas
        </button>
        <button 
          className={`tab-btn ${activeTab === 'social' ? 'active' : ''}`}
          onClick={() => setActiveTab('social')}
        >
          📱 Social Media
        </button>
        <button 
          className={`tab-btn ${activeTab === 'tools' ? 'active' : ''}`}
          onClick={() => setActiveTab('tools')}
        >
          🛠️ Tools
        </button>
      </div>

      <div className='features-content'>
        {activeTab === 'gifts' && (
          <div className='gifts-section'>
            <h3>🎁 Perfect Gift Suggestions</h3>
            <div className='gift-categories'>
              {giftSuggestions.map((category, index) => (
                <div key={index} className='gift-category'>
                  <h4>{category.category}</h4>
                  <ul>
                    {category.items.map((item, itemIndex) => (
                      <li key={itemIndex}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'events' && (
          <div className='events-section'>
            <h3>🎪 Event Planning Ideas</h3>
            <div className='event-types'>
              {eventIdeas.map((event, index) => (
                <div key={index} className='event-type'>
                  <h4>{event.type}</h4>
                  <ul>
                    {event.ideas.map((idea, ideaIndex) => (
                      <li key={ideaIndex}>{idea}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'social' && (
          <div className='social-section'>
            <h3>📱 Social Media Ready</h3>
            <div className='social-templates'>
              {socialMediaTemplates.map((template, index) => (
                <div key={index} className='social-template'>
                  <h4>{template.platform}</h4>
                  <p>{template.template}</p>
                  <button 
                    className='copy-template-btn'
                    onClick={() => {
                      navigator.clipboard.writeText(template.template);
                      alert('Template copied! 📋');
                    }}
                  >
                    Copy Template
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'tools' && (
          <div className='tools-section'>
            <h3>🛠️ Birthday Tools</h3>
            <div className='tools-grid'>
              <div className='tool-card'>
                <h4>📅 Add to Calendar</h4>
                <p>Never miss the birthday!</p>
                <button className='tool-btn' onClick={addToCalendar}>
                  Add to Google Calendar
                </button>
              </div>
              
              <div className='tool-card'>
                <h4>📧 Set Reminder</h4>
                <p>Get notified before the day</p>
                <button className='tool-btn' onClick={sendReminder}>
                  Set Email Reminder
                </button>
              </div>
              
              <div className='tool-card'>
                <h4>📱 Share Countdown</h4>
                <p>Share with friends & family</p>
                <button className='tool-btn' onClick={shareFeatures}>
                  Share Countdown
                </button>
              </div>
              
              <div className='tool-card'>
                <h4>🎵 Birthday Playlist</h4>
                <p>Create the perfect music</p>
                <button className='tool-btn' onClick={() => window.open('https://open.spotify.com/playlist/37i9dQZF1DX5Vy6DFOcx00', '_blank')}>
                  Open Spotify Playlist
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Features; 