import React from 'react';
import './BundleDisplay.css';

const BundleDisplay = ({ bundle }) => {
  const {
    name,
    description,
    price,
    originalPrice,
    savings,
    features,
    isPopular,
    isLimitedTime
  } = bundle;

  return (
    <div className="bundle-card">
      {isPopular && <div className="popular-badge">🔥 Popular</div>}
      {isLimitedTime && <div className="limited-badge">⏰ Limited Time</div>}
      
      <div className="bundle-header">
        <h2 className="bundle-name">{name}</h2>
        <div className="bundle-description">{description}</div>
      </div>

      <div className="bundle-features">
        {features.map((feature, index) => (
          <div key={index} className="feature-item">
            <span className="feature-icon">🔹</span>
            <span className="feature-text">{feature}</span>
          </div>
        ))}
      </div>

      <div className="bundle-pricing">
        <div className="price-container">
          <div className="current-price">${price}</div>
          {originalPrice && (
            <div className="original-price">${originalPrice}</div>
          )}
        </div>
        {savings && (
          <div className="savings-badge">
            Save ${savings}
          </div>
        )}
      </div>

      <button className="select-bundle-button">
        Select Bundle
      </button>
    </div>
  );
};

export default BundleDisplay; 