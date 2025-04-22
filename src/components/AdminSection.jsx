import { useState } from 'react';
import './AdminSection.css';
import StyleSelector from '../pages/StyleSelector';

const AdminSection = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState('rates');

  const tabs = [
    { id: 'rates', label: 'Rates' },
    { id: 'cards', label: 'Cards' },
    { id: 'addons', label: 'Add-ons' },
    { id: 'enhancements', label: 'Enhancements' },
    { id: 'styles', label: 'Styles' }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'rates':
        return (
          <div className="tab-content">
            <h3>Publication Rates</h3>
            <div className="rates-grid">
              <div className="rate-card">
                <h4>Daily Newspaper</h4>
                <div className="rate-details">
                  <p>Basic Ad: $50/day</p>
                  <p>Premium Ad: $75/day</p>
                  <p>Featured Ad: $100/day</p>
                </div>
              </div>
              <div className="rate-card">
                <h4>Weekly Magazine</h4>
                <div className="rate-details">
                  <p>Basic Ad: $200/week</p>
                  <p>Premium Ad: $300/week</p>
                  <p>Featured Ad: $400/week</p>
                </div>
              </div>
              <div className="rate-card">
                <h4>Online Portal</h4>
                <div className="rate-details">
                  <p>Basic Ad: $30/day</p>
                  <p>Premium Ad: $50/day</p>
                  <p>Featured Ad: $75/day</p>
                </div>
              </div>
            </div>
          </div>
        );
      case 'cards':
        return (
          <div className="tab-content">
            <h3>Card Types</h3>
            <div className="cards-grid">
              <div className="card-type">
                <h4>Standard Card</h4>
                <p>Basic design with company logo</p>
                <p>Price: $25</p>
              </div>
              <div className="card-type">
                <h4>Premium Card</h4>
                <p>Custom design with enhanced features</p>
                <p>Price: $50</p>
              </div>
              <div className="card-type">
                <h4>Business Card</h4>
                <p>Professional design with contact details</p>
                <p>Price: $35</p>
              </div>
            </div>
          </div>
        );
      case 'addons':
        return (
          <div className="tab-content">
            <h3>Add-on Services</h3>
            <div className="addons-list">
              <div className="addon-item">
                <h4>Social Media Promotion</h4>
                <p>Share your ad on social media platforms</p>
                <p>Price: $20</p>
              </div>
              <div className="addon-item">
                <h4>Email Marketing</h4>
                <p>Send your ad to our subscriber list</p>
                <p>Price: $30</p>
              </div>
              <div className="addon-item">
                <h4>Priority Placement</h4>
                <p>Get your ad featured at the top of listings</p>
                <p>Price: $40</p>
              </div>
            </div>
          </div>
        );
      case 'enhancements':
        return (
          <div className="tab-content">
            <h3>Ad Enhancements</h3>
            <div className="enhancements-list">
              <div className="enhancement-item">
                <h4>Image Gallery</h4>
                <p>Add multiple images to your ad</p>
                <p>Price: $15</p>
              </div>
              <div className="enhancement-item">
                <h4>Video Integration</h4>
                <p>Include video content in your ad</p>
                <p>Price: $25</p>
              </div>
              <div className="enhancement-item">
                <h4>Interactive Elements</h4>
                <p>Add clickable elements to your ad</p>
                <p>Price: $20</p>
              </div>
            </div>
          </div>
        );
      case 'styles':
        return (
          <div className="tab-content">
            <StyleSelector />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="admin-section-modal">
      <div className="admin-section-content">
        <div className="admin-section-header">
          <h2>Admin Dashboard</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        <div className="admin-section-tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        {renderTabContent()}
      </div>
    </div>
  );
};

export default AdminSection; 