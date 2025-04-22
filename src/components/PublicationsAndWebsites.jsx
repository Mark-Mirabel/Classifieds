import { useState } from 'react';
import './PublicationsAndWebsites.css';

const PublicationsAndWebsites = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [publications] = useState([
    {
      id: 1,
      name: 'Daily News',
      type: 'Newspaper',
      status: 'Active',
      website: 'https://dailynews.com',
      description: 'Leading daily newspaper covering local, national, and international news. Features comprehensive coverage of politics, business, sports, and entertainment.',
      circulation: '500,000+',
      frequency: 'Daily',
      coverage: 'National',
      formats: ['Print', 'Digital', 'Mobile App'],
      adTypes: ['Display', 'Classified', 'Inserts', 'Digital Banners'],
      icon: '📰'
    },
    {
      id: 2,
      name: 'Weekly Chronicle',
      type: 'Magazine',
      status: 'Active',
      website: 'https://weeklychronicle.com',
      description: 'Premier weekly magazine focusing on in-depth analysis of current events, culture, and lifestyle trends. Known for award-winning journalism and photography.',
      circulation: '250,000+',
      frequency: 'Weekly',
      coverage: 'Regional',
      formats: ['Print', 'Digital', 'Tablet Edition'],
      adTypes: ['Full Page', 'Half Page', 'Digital Display', 'Sponsored Content'],
      icon: '📖'
    },
    {
      id: 3,
      name: 'Business Times',
      type: 'Newspaper',
      status: 'Active',
      website: 'https://businesstimes.com',
      description: 'Specialized business newspaper providing comprehensive coverage of financial markets, corporate news, and economic trends. Essential reading for business professionals.',
      circulation: '150,000+',
      frequency: 'Monday-Friday',
      coverage: 'National',
      formats: ['Print', 'Digital', 'Newsletter'],
      adTypes: ['Display', 'Classified', 'Digital', 'Newsletter Ads'],
      icon: '📈'
    },
    {
      id: 4,
      name: 'Tech Insider',
      type: 'Website',
      status: 'Active',
      website: 'https://techinsider.com',
      description: 'Leading technology news website covering the latest in tech innovations, startups, and digital trends. Features breaking news, reviews, and analysis.',
      monthlyVisitors: '2M+',
      frequency: '24/7 Coverage',
      coverage: 'Global',
      formats: ['Website', 'Mobile App', 'Newsletter'],
      adTypes: ['Display Ads', 'Native Content', 'Newsletter Sponsorship'],
      icon: '💻'
    },
    {
      id: 5,
      name: 'Lifestyle Magazine',
      type: 'Magazine',
      status: 'Active',
      website: 'https://lifestylemagazine.com',
      description: 'Premium lifestyle publication covering fashion, beauty, home decor, and wellness. Features expert advice, trends, and inspiring stories.',
      circulation: '300,000+',
      frequency: 'Monthly',
      coverage: 'National',
      formats: ['Print', 'Digital', 'Social Media'],
      adTypes: ['Premium Display', 'Sponsored Features', 'Digital Integration'],
      icon: '🎯'
    },
    {
      id: 6,
      name: 'Local Tribune',
      type: 'Newspaper',
      status: 'Active',
      website: 'https://localtribune.com',
      description: 'Trusted local newspaper serving the community with comprehensive coverage of local news, events, and community issues.',
      circulation: '75,000+',
      frequency: 'Daily',
      coverage: 'Local',
      formats: ['Print', 'Digital', 'E-paper'],
      adTypes: ['Classified', 'Display', 'Digital', 'Inserts'],
      icon: '📱'
    }
  ]);

  const handleSelect = (id) => {
    setSelectedItems(prev => {
      if (prev.includes(id)) {
        return prev.filter(item => item !== id);
      } else {
        return [...prev, id];
      }
    });
  };

  return (
    <div className="publications-container">
      <div className="publications-header">
        <div className="header-content">
          <h1>Publications and Websites</h1>
          <p>Select the publications and websites where you want to list your classifieds</p>
        </div>
        <div className="header-actions">
          <span className="selected-count">
            {selectedItems.length} selected
          </span>
          <button 
            className="next-button"
            disabled={selectedItems.length === 0}
          >
            Next Step
          </button>
        </div>
      </div>
      
      <div className="publications-grid">
        {publications.map(publication => (
          <div 
            key={publication.id}
            className={`publication-card ${selectedItems.includes(publication.id) ? 'selected' : ''}`}
            onClick={() => handleSelect(publication.id)}
          >
            <div className="card-header">
              <span className="publication-icon">{publication.icon}</span>
              <div className="header-text">
                <h3>{publication.name}</h3>
                <span className={`status-badge ${publication.status.toLowerCase()}`}>
                  {publication.status}
                </span>
              </div>
              <div className="publication-type">{publication.type}</div>
            </div>
            
            <div className="card-body">
              <p className="description">{publication.description}</p>
              
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Reach:</span>
                  <span className="detail-value">{publication.circulation || publication.monthlyVisitors}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Frequency:</span>
                  <span className="detail-value">{publication.frequency}</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Coverage:</span>
                  <span className="detail-value">{publication.coverage}</span>
                </div>
              </div>

              <div className="formats-section">
                <h4>Available Formats:</h4>
                <div className="tags">
                  {publication.formats.map(format => (
                    <span key={format} className="tag">{format}</span>
                  ))}
                </div>
              </div>

              <div className="ad-types-section">
                <h4>Ad Types:</h4>
                <div className="tags">
                  {publication.adTypes.map(type => (
                    <span key={type} className="tag">{type}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="card-footer">
              <a href={publication.website} target="_blank" rel="noopener noreferrer">
                Visit Website →
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="bottom-actions">
        <button className="back-button">Back</button>
        <button 
          className="next-button"
          disabled={selectedItems.length === 0}
        >
          Next Step
        </button>
      </div>
    </div>
  );
};

export default PublicationsAndWebsites; 