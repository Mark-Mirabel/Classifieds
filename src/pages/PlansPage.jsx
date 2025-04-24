import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './PlansPage.css';

const PlansPage = () => {
  const navigate = useNavigate();
  const { plans } = useApp();
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(plans.map(plan => plan.category))];
    setCategories(uniqueCategories);
  }, [plans]);

  useEffect(() => {
    let filtered = plans;

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

    setFilteredPlans(filtered);
  }, [searchTerm, selectedCategory, plans]);

  const handleCreateNew = () => {
    navigate('/plan-builder');
  };

  const handleEditPlan = (planId) => {
    navigate(`/plan-builder/${planId}`);
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
        {filteredPlans.map(plan => (
          <div key={plan.id} className="plan-card">
            <div className="plan-header">
              <h3>{plan.name}</h3>
              <span className={`status-badge ${plan.isActive ? 'active' : 'inactive'}`}>
                {plan.isActive ? 'Active' : 'Inactive'}
              </span>
            </div>
            <div className="plan-category">{plan.category}</div>
            <div className="plan-price">${plan.price}/month</div>
            <p className="plan-description">{plan.description}</p>
            <div className="plan-features">
              <h4>Features:</h4>
              <ul>
                {plan.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
            <div className="plan-details">
              <div className="detail-item">
                <span className="detail-label">Duration:</span>
                <span className="detail-value">{plan.duration} days</span>
              </div>
              {plan.isRecurring && (
                <div className="detail-item">
                  <span className="detail-label">Renewal Discount:</span>
                  <span className="detail-value">{plan.renewalDiscount}%</span>
                </div>
              )}
              <div className="detail-item">
                <span className="detail-label">Max Renewals:</span>
                <span className="detail-value">{plan.maxRenewals}</span>
              </div>
            </div>
            <div className="plan-actions">
              <button 
                className="edit-button"
                onClick={() => handleEditPlan(plan.id)}
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