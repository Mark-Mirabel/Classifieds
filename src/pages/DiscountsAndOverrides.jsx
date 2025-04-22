import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiscountsAndOverrides.css';

const DiscountsAndOverrides = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('discounts'); // 'discounts' or 'overrides'

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  return (
    <div className="discounts-overrides-page">
      <div className="page-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Discounts and Overrides</h1>
      </div>

      <div className="tabs">
        <button 
          className={`tab ${activeTab === 'discounts' ? 'active' : ''}`}
          onClick={() => setActiveTab('discounts')}
        >
          Discounts
        </button>
        <button 
          className={`tab ${activeTab === 'overrides' ? 'active' : ''}`}
          onClick={() => setActiveTab('overrides')}
        >
          Overrides
        </button>
      </div>

      <div className="content">
        {activeTab === 'discounts' && (
          <div className="discounts-section">
            <h2>Available Discounts</h2>
            <div className="discounts-grid">
              {/* Discount cards will go here */}
            </div>
          </div>
        )}

        {activeTab === 'overrides' && (
          <div className="overrides-section">
            <h2>Price Overrides</h2>
            <div className="overrides-grid">
              {/* Override cards will go here */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DiscountsAndOverrides; 