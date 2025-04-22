import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RateCardBuilder.css';

const RateCardBuilder = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [rateCard, setRateCard] = useState({
    name: '',
    type: '',
    rates: [],
    addOns: [],
    discounts: []
  });

  const rateCardTypes = [
    { id: 'standard', name: 'Standard Rate Card', description: 'Basic pricing structure for all categories' },
    { id: 'real-estate', name: 'Real Estate Rate Card', description: 'Specialized pricing for real estate listings' },
    { id: 'automotive', name: 'Automotive Rate Card', description: 'Pricing for vehicle listings' },
    { id: 'jobs', name: 'Jobs Rate Card', description: 'Pricing for job postings' }
  ];

  const availableAddOns = [
    { id: 1, name: 'Featured Listing', description: 'Make your listing stand out', price: 15.00 },
    { id: 2, name: 'Photo Gallery', description: 'Add up to 10 photos', price: 10.00 },
    { id: 3, name: 'Social Media Promotion', description: 'Share on social media', price: 20.00 },
    { id: 4, name: 'Virtual Tour', description: 'Add a 360° virtual tour', price: 25.00 },
    { id: 5, name: 'Vehicle History Report', description: 'Include vehicle history', price: 15.00 },
    { id: 6, name: 'Job Application Tracking', description: 'Track applications', price: 30.00 }
  ];

  const availableDiscounts = [
    { id: 1, name: 'Multi-Publication Discount', type: 'percentage', value: 15 },
    { id: 2, name: 'VIP Client Discount', type: 'percentage', value: 20 },
    { id: 3, name: 'Agent Discount', type: 'percentage', value: 25 },
    { id: 4, name: 'Dealer Discount', type: 'percentage', value: 20 },
    { id: 5, name: 'Recruiter Package', type: 'percentage', value: 30 }
  ];

  const handleNameChange = (e) => {
    setRateCard({ ...rateCard, name: e.target.value });
  };

  const handleTypeSelect = (type) => {
    setRateCard({ ...rateCard, type });
  };

  const handleRateChange = (index, field, value) => {
    const newRates = [...rateCard.rates];
    newRates[index] = { ...newRates[index], [field]: value };
    setRateCard({ ...rateCard, rates: newRates });
  };

  const handleAddRate = () => {
    setRateCard({
      ...rateCard,
      rates: [...rateCard.rates, { duration: '', price: '', savings: '' }]
    });
  };

  const handleAddOnToggle = (addOn) => {
    const newAddOns = rateCard.addOns.includes(addOn.id)
      ? rateCard.addOns.filter(id => id !== addOn.id)
      : [...rateCard.addOns, addOn.id];
    setRateCard({ ...rateCard, addOns: newAddOns });
  };

  const handleDiscountToggle = (discount) => {
    const newDiscounts = rateCard.discounts.includes(discount.id)
      ? rateCard.discounts.filter(id => id !== discount.id)
      : [...rateCard.discounts, discount.id];
    setRateCard({ ...rateCard, discounts: newDiscounts });
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    } else {
      navigate('/rate-cards');
    }
  };

  const handleSave = () => {
    // TODO: Save rate card to backend
    console.log('Saving rate card:', rateCard);
    navigate('/rate-cards');
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Name Your Rate Card</h2>
            <input
              type="text"
              value={rateCard.name}
              onChange={handleNameChange}
              placeholder="Enter rate card name"
              className="name-input"
            />
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2>Choose Rate Card Type</h2>
            <div className="type-grid">
              {rateCardTypes.map(type => (
                <div
                  key={type.id}
                  className={`type-card ${rateCard.type === type.id ? 'selected' : ''}`}
                  onClick={() => handleTypeSelect(type.id)}
                >
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h2>Set Your Rates</h2>
            <div className="rates-table">
              <table>
                <thead>
                  <tr>
                    <th>Duration (days)</th>
                    <th>Price ($)</th>
                    <th>Savings (%)</th>
                  </tr>
                </thead>
                <tbody>
                  {rateCard.rates.map((rate, index) => (
                    <tr key={index}>
                      <td>
                        <input
                          type="number"
                          value={rate.duration}
                          onChange={(e) => handleRateChange(index, 'duration', e.target.value)}
                          placeholder="e.g. 7"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={rate.price}
                          onChange={(e) => handleRateChange(index, 'price', e.target.value)}
                          placeholder="e.g. 25.00"
                        />
                      </td>
                      <td>
                        <input
                          type="number"
                          value={rate.savings}
                          onChange={(e) => handleRateChange(index, 'savings', e.target.value)}
                          placeholder="e.g. 10"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <button className="add-rate-button" onClick={handleAddRate}>
                Add Rate
              </button>
            </div>
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>Choose Available Add-Ons</h2>
            <div className="add-ons-grid">
              {availableAddOns.map(addOn => (
                <div
                  key={addOn.id}
                  className={`add-on-card ${rateCard.addOns.includes(addOn.id) ? 'selected' : ''}`}
                  onClick={() => handleAddOnToggle(addOn)}
                >
                  <h3>{addOn.name}</h3>
                  <p>{addOn.description}</p>
                  <div className="add-on-price">${addOn.price.toFixed(2)}</div>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <h2>Choose Available Discounts</h2>
            <div className="discounts-grid">
              {availableDiscounts.map(discount => (
                <div
                  key={discount.id}
                  className={`discount-card ${rateCard.discounts.includes(discount.id) ? 'selected' : ''}`}
                  onClick={() => handleDiscountToggle(discount)}
                >
                  <h3>{discount.name}</h3>
                  <div className="discount-value">
                    {discount.type === 'percentage' 
                      ? `${discount.value}% off`
                      : `$${discount.value} off`}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-content">
            <h2>Review Your Rate Card</h2>
            <div className="review-section">
              <div className="review-item">
                <h3>Name</h3>
                <p>{rateCard.name}</p>
              </div>
              <div className="review-item">
                <h3>Type</h3>
                <p>{rateCardTypes.find(t => t.id === rateCard.type)?.name}</p>
              </div>
              <div className="review-item">
                <h3>Rates</h3>
                <ul>
                  {rateCard.rates.map((rate, index) => (
                    <li key={index}>
                      {rate.duration} days: ${rate.price} ({rate.savings}% savings)
                    </li>
                  ))}
                </ul>
              </div>
              <div className="review-item">
                <h3>Add-Ons</h3>
                <ul>
                  {rateCard.addOns.map(id => {
                    const addOn = availableAddOns.find(a => a.id === id);
                    return addOn && <li key={id}>{addOn.name}</li>;
                  })}
                </ul>
              </div>
              <div className="review-item">
                <h3>Discounts</h3>
                <ul>
                  {rateCard.discounts.map(id => {
                    const discount = availableDiscounts.find(d => d.id === id);
                    return discount && <li key={id}>{discount.name}</li>;
                  })}
                </ul>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rate-card-builder">
      <div className="wizard-header">
        <div className="header-actions">
          <button 
            className="exit-button"
            onClick={() => navigate('/rate-cards')}
          >
            Exit Builder
          </button>
        </div>
        <h1>Rate Card Builder</h1>
        <div className="progress-bar">
          {[1, 2, 3, 4, 5, 6].map(step => (
            <div
              key={step}
              className={`progress-step ${currentStep >= step ? 'active' : ''}`}
            >
              {step}
            </div>
          ))}
        </div>
      </div>

      <div className="wizard-content">
        {renderStep()}
      </div>

      <div className="wizard-actions">
        <button
          className="back-button"
          onClick={handleBack}
        >
          Back
        </button>
        {currentStep < 6 ? (
          <button
            className="next-button"
            onClick={() => setCurrentStep(currentStep + 1)}
            disabled={!isStepValid(currentStep)}
          >
            Continue
          </button>
        ) : (
          <button
            className="save-button"
            onClick={handleSave}
            disabled={!isStepValid(currentStep)}
          >
            Save Rate Card
          </button>
        )}
      </div>
    </div>
  );
};

const isStepValid = (step, rateCard) => {
  switch (step) {
    case 1:
      return rateCard.name.trim() !== '';
    case 2:
      return rateCard.type !== '';
    case 3:
      return rateCard.rates.length > 0 && rateCard.rates.every(rate => 
        rate.duration && rate.price && rate.savings !== undefined
      );
    default:
      return true;
  }
};

export default RateCardBuilder; 