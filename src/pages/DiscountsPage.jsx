import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './DiscountsPage.css';

const DiscountsPage = () => {
  const navigate = useNavigate();
  const [discounts, setDiscounts] = useState([]);

  useEffect(() => {
    // Load discounts from localStorage
    const savedDiscounts = JSON.parse(localStorage.getItem('discounts') || '[]');
    if (savedDiscounts.length === 0) {
      // Initialize with default discounts if none exist
      const defaultDiscounts = [
        {
          id: 'bulk-purchase',
          name: 'Bulk Purchase Discount',
          icon: '📦',
          description: 'Discounts for purchasing multiple ads at once.',
          rules: {
            type: 'tiered',
            tiers: [
              { quantity: 5, discount: 10 },
              { quantity: 10, discount: 20 },
              { quantity: 20, discount: 30 }
            ]
          },
          conditions: [
            'Applies to same category ads',
            'Valid for 30 days',
            'Non-transferable'
          ],
          isActive: true,
          category: 'volume'
        },
        {
          id: 'loyalty',
          name: 'Loyalty Discount',
          icon: '🎯',
          description: 'Reward for long-term customers.',
          rules: {
            type: 'fixed',
            discount: 15,
            duration: 90
          },
          conditions: [
            'Minimum 6 months of service',
            'Applies to all categories',
            'Auto-applied to account'
          ],
          isActive: true,
          category: 'customer'
        },
        {
          id: 'seasonal',
          name: 'Seasonal Promotion',
          icon: '🎄',
          description: 'Limited-time seasonal discounts.',
          rules: {
            type: 'fixed',
            discount: 25,
            duration: 30
          },
          conditions: [
            'Limited time offer',
            'Applies to selected categories',
            'Cannot be combined'
          ],
          isActive: true,
          category: 'promotional'
        }
      ];
      setDiscounts(defaultDiscounts);
      localStorage.setItem('discounts', JSON.stringify(defaultDiscounts));
    } else {
      setDiscounts(savedDiscounts);
    }
  }, []);

  const handleEdit = (discountId) => {
    navigate(`/discounts/edit/${discountId}`);
  };

  const handleToggleActive = (discountId) => {
    const updatedDiscounts = discounts.map(discount => 
      discount.id === discountId 
        ? { ...discount, isActive: !discount.isActive }
        : discount
    );
    setDiscounts(updatedDiscounts);
    localStorage.setItem('discounts', JSON.stringify(updatedDiscounts));
  };

  const handleAddNew = () => {
    navigate('/discounts/new');
  };

  const getCategoryColor = (category) => {
    const colors = {
      volume: '#4a90e2',
      customer: '#50c878',
      promotional: '#ff6b6b',
      category: '#9c27b0',
      subscription: '#ff9800'
    };
    return colors[category] || '#666';
  };

  return (
    <div className="discounts-page">
      <div className="page-header">
        <h1>Discounts Management</h1>
        <button className="add-new-button" onClick={handleAddNew}>
          Add New Discount
        </button>
      </div>

      <div className="discounts-grid">
        {discounts.map(discount => (
          <div key={discount.id} className="discount-card">
            <div className="discount-header">
              <span className="discount-icon">{discount.icon}</span>
              <h3>{discount.name}</h3>
              <span 
                className="category-badge"
                style={{ backgroundColor: getCategoryColor(discount.category) }}
              >
                {discount.category}
              </span>
              <span className={`status-badge ${discount.isActive ? 'active' : 'inactive'}`}>
                {discount.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            
            <p className="discount-description">{discount.description}</p>
            
            <div className="rules-section">
              <h4>Discount Rules</h4>
              {discount.rules.type === 'fixed' && (
                <div className="fixed-rules">
                  <div className="discount-badge">
                    <span className="discount-value">{discount.rules.discount}%</span>
                    <span className="discount-label">OFF</span>
                  </div>
                  <div className="duration-info">
                    <span className="duration-label">Duration:</span>
                    <span className="duration-value">{discount.rules.duration} days</span>
                  </div>
                </div>
              )}
              {discount.rules.type === 'tiered' && (
                <div className="tiered-rules">
                  {discount.rules.tiers.map((tier, index) => (
                    <div key={index} className="tier">
                      <div className="tier-quantity">
                        <span className="quantity">{tier.quantity}+</span>
                        <span className="quantity-label">ads</span>
                      </div>
                      <div className="tier-discount">
                        <span className="discount">{tier.discount}%</span>
                        <span className="discount-label">OFF</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="conditions-section">
              <h4>Conditions</h4>
              <ul>
                {discount.conditions.map((condition, index) => (
                  <li key={index}>
                    <span className="condition-icon">•</span>
                    {condition}
                  </li>
                ))}
              </ul>
            </div>

            <div className="card-actions">
              <button 
                className="edit-button"
                onClick={() => handleEdit(discount.id)}
              >
                Edit
              </button>
              <button 
                className="toggle-button"
                onClick={() => handleToggleActive(discount.id)}
              >
                {discount.isActive ? 'Deactivate' : 'Activate'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DiscountsPage; 