import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './EditDiscount.css';

const EditDiscount = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [discount, setDiscount] = useState({
    name: '',
    icon: '',
    description: '',
    rules: {
      type: 'fixed',
      discount: '',
      duration: '',
      tiers: []
    },
    conditions: [],
    isActive: true,
    category: 'volume'
  });

  useEffect(() => {
    const savedDiscounts = JSON.parse(localStorage.getItem('discounts') || '[]');
    const existingDiscount = savedDiscounts.find(d => d.id === id);
    if (existingDiscount) {
      setDiscount(existingDiscount);
    }
  }, [id]);

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
    setDiscount(prev => {
      const newTiers = [...prev.rules.tiers];
      newTiers[index] = {
        ...newTiers[index],
        [field]: value
      };
      return {
        ...prev,
        rules: {
          ...prev.rules,
          tiers: newTiers
        }
      };
    });
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
    setDiscount(prev => {
      const newConditions = [...prev.conditions];
      newConditions[index] = value;
      return {
        ...prev,
        conditions: newConditions
      };
    });
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
    const updatedDiscounts = savedDiscounts.map(d => 
      d.id === id ? discount : d
    );
    localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
    navigate('/discounts');
  };

  return (
    <div className="edit-discount">
      <h1>Edit Discount</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-section">
          <h2>Basic Information</h2>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={discount.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Icon</label>
            <input
              type="text"
              name="icon"
              value={discount.icon}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={discount.description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Category</label>
            <select
              name="category"
              value={discount.category}
              onChange={handleInputChange}
            >
              <option value="volume">Volume</option>
              <option value="customer">Customer</option>
              <option value="promotional">Promotional</option>
              <option value="category">Category</option>
              <option value="subscription">Subscription</option>
            </select>
          </div>
        </div>

        <div className="form-section">
          <h2>Pricing Rules</h2>
          <div className="form-group">
            <label>Type</label>
            <select
              name="type"
              value={discount.rules.type}
              onChange={handleRulesChange}
            >
              <option value="fixed">Fixed</option>
              <option value="tiered">Tiered</option>
            </select>
          </div>

          {discount.rules.type === 'fixed' ? (
            <>
              <div className="form-group">
                <label>Discount (%)</label>
                <input
                  type="number"
                  name="discount"
                  value={discount.rules.discount}
                  onChange={handleRulesChange}
                  required
                />
              </div>
              <div className="form-group">
                <label>Duration (days)</label>
                <input
                  type="number"
                  name="duration"
                  value={discount.rules.duration}
                  onChange={handleRulesChange}
                  required
                />
              </div>
            </>
          ) : (
            <div className="tiers-section">
              <h3>Tiers</h3>
              {discount.rules.tiers.map((tier, index) => (
                <div key={index} className="tier-group">
                  <div className="form-group">
                    <label>Quantity</label>
                    <input
                      type="number"
                      value={tier.quantity}
                      onChange={(e) => handleTierChange(index, 'quantity', e.target.value)}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label>Discount (%)</label>
                    <input
                      type="number"
                      value={tier.discount}
                      onChange={(e) => handleTierChange(index, 'discount', e.target.value)}
                      required
                    />
                  </div>
                  <button
                    type="button"
                    className="remove-button"
                    onClick={() => removeTier(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" onClick={addTier}>
                Add Tier
              </button>
            </div>
          )}
        </div>

        <div className="form-section">
          <h2>Conditions</h2>
          {discount.conditions.map((condition, index) => (
            <div key={index} className="condition-group">
              <input
                type="text"
                value={condition}
                onChange={(e) => handleConditionChange(index, e.target.value)}
                required
              />
              <button
                type="button"
                className="remove-button"
                onClick={() => removeCondition(index)}
              >
                Remove
              </button>
            </div>
          ))}
          <button type="button" onClick={addCondition}>
            Add Condition
          </button>
        </div>

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/discounts')}>
            Cancel
          </button>
          <button type="submit">Save Changes</button>
        </div>
      </form>
    </div>
  );
};

export default EditDiscount; 