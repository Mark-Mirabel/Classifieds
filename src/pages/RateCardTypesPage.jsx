import React from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './RateCardTypesPage.css';

const RateCardTypesPage = () => {
  const navigate = useNavigate();

  const rateCardTypes = [
    {
      id: 'flat',
      name: 'Flat Rate',
      icon: '🧾',
      description: 'A fixed price is charged per ad, regardless of size, length, or content.'
    },
    {
      id: 'word',
      name: 'Word-Based',
      icon: '📏',
      description: 'Price is determined by the number of words in the ad.'
    },
    {
      id: 'line',
      name: 'Line Rate',
      icon: '🧱',
      description: 'Price is based on the number of lines in the ad.'
    },
    {
      id: 'modular',
      name: 'Modular',
      icon: '📐',
      description: 'Price is based on the size of the ad in modular units.'
    },
    {
      id: 'column-inch',
      name: 'Column Inch',
      icon: '📰',
      description: 'Price is based on the number of column inches used.'
    },
    {
      id: 'tiered',
      name: 'Tiered',
      icon: '📊',
      description: 'Price varies based on different tiers or levels.'
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: '🎯',
      description: 'Price is based on performance metrics like clicks or conversions.'
    },
    {
      id: 'custom',
      name: 'Custom',
      icon: '⚙️',
      description: 'Create a custom rate card with your own pricing structure.'
    }
  ];

  const handleTypeClick = (typeId) => {
    navigate(`/rate-cards/types/${typeId}`);
  };

  return (
    <div className="rate-card-types-page">
      <div className="page-header">
        <BackButton to="/order-system/setup" text="Back to Check Out Page Builder" />
        <h1>Rate Card Types</h1>
        <p>Configure different pricing structures for your listings</p>
      </div>

      <div className="rate-card-types-grid">
        {rateCardTypes.map(type => (
          <div 
            key={type.id} 
            className="rate-card-type-card"
            onClick={() => handleTypeClick(type.id)}
          >
            <div className="card-header">
              <span className="type-icon">{type.icon}</span>
              <h2>{type.name}</h2>
            </div>
            <p className="type-description">{type.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RateCardTypesPage; 