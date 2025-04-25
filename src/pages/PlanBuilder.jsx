import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './PlanBuilder.css';

const PlanBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { plans, addPlan, updatePlan } = useApp();
  const [plan, setPlan] = useState({
    name: '',
    description: '',
    category: '',
    duration: 30,
    price: 0,
    isRecurring: true,
    renewalDiscount: 0,
    maxRenewals: 12,
    isActive: true,
    features: []
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // If editing an existing plan, load its data from AppContext
    if (id) {
      const existingPlan = plans.find(p => p.id === id);
      if (existingPlan) {
        setPlan(existingPlan);
      } else {
        setError('Plan not found');
      }
    }
  }, [id, plans]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      setError(null);
      
      // Validate required fields
      if (!plan.name || !plan.description || !plan.category) {
        setError('Please fill in all required fields');
        return;
      }

      // Create a complete plan object
      const planToSave = {
        ...plan,
        duration: Number(plan.duration),
        price: Number(plan.price),
        renewalDiscount: Number(plan.renewalDiscount),
        maxRenewals: Number(plan.maxRenewals),
        features: plan.features || []
      };

      console.log('Saving plan:', planToSave);

      if (id) {
        // Update existing plan
        updatePlan(id, planToSave);
        console.log('Updated plan with ID:', id);
      } else {
        // Create new plan
        const newPlan = addPlan(planToSave);
        console.log('Created new plan with ID:', newPlan.id);
      }
      
      // Show success message
      setShowSuccess(true);
      
      // Navigate after a short delay
      setTimeout(() => {
        navigate('/plans');
      }, 1500);
    } catch (err) {
      console.error('Error saving plan:', err);
      setError('Failed to save plan. Please try again.');
    }
  };

  return (
    <div className="plan-builder">
      <div className="page-header">
        <h1>{id ? 'Edit Plan' : 'Create New Plan'}</h1>
        <button className="cancel-button" onClick={() => navigate('/plans')}>
          Cancel
        </button>
      </div>

      {error && (
        <div className="error-message">
          {error}
        </div>
      )}

      {showSuccess && (
        <div className="success-message">
          Plan {id ? 'updated' : 'created'} successfully!
        </div>
      )}

      <div className="plan-form">
        <div className="form-group">
          <label htmlFor="name">name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={plan.name}
            onChange={handleInputChange}
            placeholder="Enter plan name"
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">name</label>
          <textarea
            id="description"
            name="description"
            value={plan.description}
            onChange={handleInputChange}
            placeholder="Enter plan description"
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={plan.category}
            onChange={handleInputChange}
          >
            <option value="">Select a category</option>
            <option value="basic">Basic</option>
            <option value="premium">Premium</option>
            <option value="enterprise">Enterprise</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="duration">Duration (days)</label>
          <input
            type="number"
            id="duration"
            name="duration"
            value={plan.duration}
            onChange={handleInputChange}
            min="1"
          />
        </div>

        <div className="form-group">
          <label htmlFor="price">Price ($)</label>
          <input
            type="number"
            id="price"
            name="price"
            value={plan.price}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isRecurring"
              checked={plan.isRecurring}
              onChange={(e) => handleInputChange({ target: { name: 'isRecurring', value: e.target.checked } })}
            />
            Recurring Plan
          </label>
        </div>

        {plan.isRecurring && (
          <>
            <div className="form-group">
              <label htmlFor="renewalDiscount">Renewal Discount (%)</label>
              <input
                type="number"
                id="renewalDiscount"
                name="renewalDiscount"
                value={plan.renewalDiscount}
                onChange={handleInputChange}
                min="0"
                max="100"
              />
            </div>

            <div className="form-group">
              <label htmlFor="maxRenewals">Maximum Renewals</label>
              <input
                type="number"
                id="maxRenewals"
                name="maxRenewals"
                value={plan.maxRenewals}
                onChange={handleInputChange}
                min="1"
              />
            </div>
          </>
        )}

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isActive"
              checked={plan.isActive}
              onChange={(e) => handleInputChange({ target: { name: 'isActive', value: e.target.checked } })}
            />
            Active Plan
          </label>
        </div>

        <div className="form-actions">
          <button className="save-button" onClick={handleSave}>
            Save Plan
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanBuilder; 