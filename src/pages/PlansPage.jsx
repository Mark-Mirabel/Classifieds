import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PlanService from '../services/PlanService';
import './PlansPage.css';

const PlansPage = () => {
  const navigate = useNavigate();
  const [plans, setPlans] = useState([]);
  const [filteredPlans, setFilteredPlans] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Initialize PlanService with sample plans
    const planService = new PlanService([
      {
        id: '1',
        name: 'Basic Real Estate Plan',
        description: 'Essential features for real estate listings',
        rateCardId: 'columnInch',
        features: ['Basic listing', 'Photo upload', 'Contact form'],
        duration: 30,
        price: 49.99,
        isRecurring: true,
        renewalDiscount: 10,
        maxRenewals: 12,
        category: 'Real Estate',
        isActive: true
      },
      {
        id: '2',
        name: 'Professional Real Estate Plan',
        description: 'Advanced features for real estate professionals',
        rateCardId: 'columnInch',
        features: ['Enhanced listing', 'Multiple photos', 'Social sharing', 'Virtual tour'],
        duration: 30,
        price: 99.99,
        isRecurring: true,
        renewalDiscount: 15,
        maxRenewals: 12,
        category: 'Real Estate',
        isActive: true
      },
      {
        id: '3',
        name: 'Enterprise Real Estate Plan',
        description: 'Complete solution for large real estate organizations',
        rateCardId: 'columnInch',
        features: ['Premium listing', 'Unlimited photos', 'Social integration', 'Virtual tour', 'Bulk upload'],
        duration: 30,
        price: 199.99,
        isRecurring: true,
        renewalDiscount: 20,
        maxRenewals: 12,
        category: 'Real Estate',
        isActive: true
      },
      {
        id: '4',
        name: 'Basic Automotive Plan',
        description: 'Essential features for vehicle listings',
        rateCardId: 'modular',
        features: ['Basic listing', 'Photo upload', 'Contact form'],
        duration: 30,
        price: 39.99,
        isRecurring: true,
        renewalDiscount: 10,
        maxRenewals: 12,
        category: 'Automotive',
        isActive: true
      },
      {
        id: '5',
        name: 'Professional Automotive Plan',
        description: 'Advanced features for vehicle dealers',
        rateCardId: 'modular',
        features: ['Enhanced listing', 'Multiple photos', 'Social sharing', 'Vehicle history'],
        duration: 30,
        price: 79.99,
        isRecurring: true,
        renewalDiscount: 15,
        maxRenewals: 12,
        category: 'Automotive',
        isActive: true
      },
      {
        id: '6',
        name: 'Basic Jobs Plan',
        description: 'Essential features for job postings',
        rateCardId: 'performance',
        features: ['Basic listing', 'Job alerts', 'Application tracking'],
        duration: 30,
        price: 59.99,
        isRecurring: true,
        renewalDiscount: 10,
        maxRenewals: 12,
        category: 'Jobs',
        isActive: true
      },
      {
        id: '7',
        name: 'Professional Jobs Plan',
        description: 'Advanced features for recruiters',
        rateCardId: 'performance',
        features: ['Enhanced listing', 'Job alerts', 'Resume access', 'Apply now button'],
        duration: 30,
        price: 129.99,
        isRecurring: true,
        renewalDiscount: 15,
        maxRenewals: 12,
        category: 'Jobs',
        isActive: true
      },
      {
        id: '8',
        name: 'Basic Services Plan',
        description: 'Essential features for service providers',
        rateCardId: 'tiered',
        features: ['Basic listing', 'Photo upload', 'Contact form'],
        duration: 30,
        price: 29.99,
        isRecurring: true,
        renewalDiscount: 10,
        maxRenewals: 12,
        category: 'Services',
        isActive: true
      },
      {
        id: '9',
        name: 'Professional Services Plan',
        description: 'Advanced features for service businesses',
        rateCardId: 'tiered',
        features: ['Enhanced listing', 'Multiple photos', 'Social sharing', 'Lead form'],
        duration: 30,
        price: 69.99,
        isRecurring: true,
        renewalDiscount: 15,
        maxRenewals: 12,
        category: 'Services',
        isActive: true
      },
      {
        id: '10',
        name: 'Enterprise Services Plan',
        description: 'Complete solution for large service organizations',
        rateCardId: 'tiered',
        features: ['Premium listing', 'Unlimited photos', 'Social integration', 'Lead form', 'Bulk upload', 'Analytics'],
        duration: 30,
        price: 149.99,
        isRecurring: true,
        renewalDiscount: 20,
        maxRenewals: 12,
        category: 'Services',
        isActive: true
      }
    ]);

    const allPlans = planService.getAllPlans();
    setPlans(allPlans);
    setFilteredPlans(allPlans);

    // Extract unique categories
    const uniqueCategories = ['all', ...new Set(allPlans.map(plan => plan.category))];
    setCategories(uniqueCategories);
  }, []);

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
    navigate('/rate-cards/setup');
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