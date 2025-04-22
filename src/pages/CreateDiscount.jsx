import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './CreateDiscount.css';

const CreateDiscount = () => {
  const navigate = useNavigate();
  const [discount, setDiscount] = useState({
    name: '',
    icon: '🎯',
    description: '',
    rules: {
      type: 'fixed',
      discount: '',
      duration: '',
      tiers: [
        { quantity: '', discount: '' }
      ]
    },
    conditions: [''],
    isActive: true
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setDiscount(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRulesChange = (e) => {
    const { name, value } = e.target;
    setDiscount(prev => ({
      ...prev,
      rules: {
        ...prev.rules,
        [name]: value
      }
    }));
  };

  const handleTierChange = (index, field, value) => {
    setDiscount(prev => ({
      ...prev,
      rules: {
        ...prev.rules,
        tiers: prev.rules.tiers.map((tier, i) => 
          i === index ? { ...tier, [field]: value } : tier
        )
      }
    }));
  };

  const addTier = () => {
    setDiscount(prev => ({
      ...prev,
      rules: {
        ...prev.rules,
        tiers: [...prev.rules.tiers, { quantity: '', discount: '' }]
      }
    }));
  };

  const removeTier = (index) => {
    setDiscount(prev => ({
      ...prev,
      rules: {
        ...prev.rules,
        tiers: prev.rules.tiers.filter((_, i) => i !== index)
      }
    }));
  };

  const handleConditionChange = (index, value) => {
    setDiscount(prev => ({
      ...prev,
      conditions: prev.conditions.map((condition, i) => 
        i === index ? value : condition
      )
    }));
  };

  const addCondition = () => {
    setDiscount(prev => ({
      ...prev,
      conditions: [...prev.conditions, '']
    }));
  };

  const removeCondition = (index) => {
    setDiscount(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const savedDiscounts = JSON.parse(localStorage.getItem('discounts') || '[]');
    const newDiscount = {
      ...discount,
      id: `discount-${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    const updatedDiscounts = [...savedDiscounts, newDiscount];
    localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
    navigate('/discounts');
  };

  const handleCancel = () => {
    navigate('/discounts');
  };

  return (
    <div className="create-discount-page">
      <div className="page-header">
        <h1>Create New Discount</h1>
      </div>

      <form onSubmit={handleSubmit} className="discount-form">
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={discount.name}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="icon">Icon</label>
            <input
              type="text"
              id="icon"
              name="icon"
              value={discount.icon}
              onChange={handleInputChange}
              placeholder="Enter emoji or icon code"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              name="description"
              value={discount.description}
              onChange={handleInputChange}
              rows="3"
              required
            />
          </div>
        </div>

        <div className="form-section">
          <h2>Discount Rules</h2>
          <div className="form-group">
            <label>Discount Type</label>
            <div className="radio-group">
              <label>
                <input
                  type="radio"
                  name="type"
                  value="fixed"
                  checked={discount.rules.type === 'fixed'}
                  onChange={() => setDiscount(prev => ({
                    ...prev,
                    rules: { ...prev.rules, type: 'fixed' }
                  }))}
                />
                Fixed Discount
              </label>
              <label>
                <input
                  type="radio"
                  name="type"
                  value="tiered"
                  checked={discount.rules.type === 'tiered'}
                  onChange={() => setDiscount(prev => ({
                    ...prev,
                    rules: { ...prev.rules, type: 'tiered' }
                  }))}
                />
                Tiered Discount
              </label>
            </div>
          </div>

          {discount.rules.type === 'fixed' && (
            <>
              <div className="form-group">
                <label htmlFor="discount">Discount Amount</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="discount"
                    name="discount"
                    value={discount.rules.discount}
                    onChange={handleRulesChange}
                    min="0"
                    max="100"
                    required
                  />
                  <span className="input-group-text">%</span>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (days)</label>
                <input
                  type="number"
                  id="duration"
                  name="duration"
                  value={discount.rules.duration}
                  onChange={handleRulesChange}
                  min="1"
                  required
                />
              </div>
            </>
          )}

          {discount.rules.type === 'tiered' && (
            <div className="tiered-rules">
              {discount.rules.tiers.map((tier, index) => (
                <div key={index} className="tier-input">
                  <div className="form-group">
                    <label>Minimum Quantity</label>
                    <input
                      type="number"
                      value={tier.quantity}
                      onChange={(e) => handleTierChange(index, 'quantity', e.target.value)}
                      min="1"
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount</label>
                    <div className="input-group">
                      <input
                        type="number"
                        value={tier.discount}
                        onChange={(e) => handleTierChange(index, 'discount', e.target.value)}
                        min="0"
                        max="100"
                        required
                      />
                      <span className="input-group-text">%</span>
                    </div>
                  </div>
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeTier(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                className="add-tier-button"
                onClick={addTier}
              >
                Add Tier
              </button>
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>Conditions</h2>
          {discount.conditions.map((condition, index) => (
            <div key={index} className="condition-input">
              <div className="form-group">
                <label>Condition {index + 1}</label>
                <div className="input-group">
                  <input
                    type="text"
                    value={condition}
                    onChange={(e) => handleConditionChange(index, e.target.value)}
                    required
                  />
                  {index > 0 && (
                    <button
                      type="button"
                      className="remove-button"
                      onClick={() => removeCondition(index)}
                    >
                      Remove
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
          <button
            type="button"
            className="add-condition-button"
            onClick={addCondition}
          >
            Add Condition
          </button>
        </div>

        <div className="form-actions">
          <button type="button" className="cancel-button" onClick={handleCancel}>
            Cancel
          </button>
          <button type="submit" className="save-button">
            Create Discount
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateDiscount; 