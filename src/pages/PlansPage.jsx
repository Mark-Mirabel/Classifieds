import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './PlansPage.css';
import {steps, rateTypes, availableDiscounts, availableAddOns } from './RateCardSetup';

const PlansPage = () => {
  const navigate = useNavigate();
  const [filteredRatecards, setFilteredRateCards] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);
  const [rateCards, setRateCards] = useState([]);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(rateCards.map(ratecard => ratecard.category))];
    setCategories(uniqueCategories);
  }, [rateCards]);

   // Load data when the component mounts
   useEffect(() => {
    const loadData = () => {
      const savedRateCards = localStorage.getItem('rateCards');
      if (savedRateCards) {
        // Assuming you have a function to set rateCards in context
        setRateCards(JSON.parse(savedRateCards)); // Or however you want to filter
      }
    };
    loadData();
  }, []); // This will run only once when PlansPage mounts
//fddg
  useEffect(() => {
    let filtered = rateCards;

    debugger;
    // Apply category filter
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(plan => plan.category === selectedCategory);
    }

    // Apply search filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(plan => 
        plan.name.toLowerCase().includes(term) ||
        plan.description.toLowerCase().includes(term) ||
        plan.category.toLowerCase().includes(term)
      );
    }
    console.log(filtered);
    setFilteredRateCards(filtered);
  }, [searchTerm, selectedCategory, rateCards]);

  const handleCreateNew = () => {
    navigate('/rate-cards/setup');
  };

  const handleEditPlan = (planId) => {
    navigate(`/rate-cards/setup/${planId}`);
  };

  return (
    <div className="plans-page">
      <div className="page-header">
        <h1>Plans</h1>
        <button className="create-button" onClick={handleCreateNew}>
          Create New Plan
        </button>
      </div>

      <div className="filters">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search plans..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="category-filter">
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map(category => (
              <option key={category} value={category}>
                {category === 'all' ? 'All Categories' : category}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="plans-grid">
        {filteredRatecards.map(rateCard => (
          <div key={rateCard.id} className="plan-card">
          <div className="plan-header">
            <h2>{rateCard.name}</h2>
            <span className={`status-badge ${rateCard.isActive ? 'active' : 'inactive'}`}>
              {rateCard.isActive ? 'Active' : 'Inactive'}
            </span>
          </div>
        
          <p className="plan-description">{rateCard.description}</p>
        
          <div className="plan-details">
            <div className="detail-item">
              <span className="detail-label">Type:</span>
              <span className="detail-value">
                {rateTypes.find(t => t.id === rateCard.type)?.name}
              </span>
            </div>
          </div>
        
          <div className="plan-section">
            <h3>Rate Details</h3>
            <div className="rate-grid">
              {Object.entries(rateCard.rates).map(([key, value]) => (
                value && (
                  <div key={key} className="detail-item">
                    <span className="detail-label">{key}:</span>
                    <span className="detail-value">{value}</span>
                  </div>
                )
              ))}
            </div>
          </div>
        
          {rateCard.addOns.length > 0 && (
            <div className="plan-section">
              <h3>Selected Add-Ons</h3>
              {rateCard.addOns.map(addOnId => {
                const addOn = availableAddOns.find(a => a.id === addOnId);
                return (
                  <div key={addOnId} className="detail-item">
                    <span className="detail-label">{addOn?.icon} {addOn?.name}</span>
                    <span className="detail-value">${addOn?.price.toFixed(2)}</span>
                  </div>
                );
              })}
            </div>
          )}
        
          {rateCard.discounts.length > 0 && (
            <div className="plan-section">
              <h3>Selected Discounts</h3>
              {rateCard.discounts.map(discountId => {
                const discount = availableDiscounts.find(d => d.id === discountId);
                return (
                  <div key={discountId} className="detail-item">
                    <span className="detail-label">{discount?.name}</span>
                  </div>
                );
              })}
            </div>
          )}
        
          <div className="plan-actions">
            <button 
              className="edit-button"
              onClick={() => handleEditPlan(rateCard.id)}
            >
              Edit Plan
            </button>
          </div>
        </div>
        ))}
      </div>
    </div>
  );
};

export default PlansPage; 