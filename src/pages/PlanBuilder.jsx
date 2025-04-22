import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './PlanBuilder.css';

const PlanBuilder = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [plan, setPlan] = useState({
    name: '',
    description: '',
    category: '',
    duration: 30,
    price: 0,
    isRecurring: true,
    renewalDiscount: 0,
    maxRenewals: 12,
    isActive: true
  });

  // Create sample plans if none exist
  useEffect(() => {
    const storedPlans = localStorage.getItem('plans');
    if (!storedPlans) {
      const samplePlans = [
        {
          id: '1',
          name: 'Basic Real Estate Listing',
          description: 'Standard real estate listing with basic features',
          category: 'Real Estate',
          duration: 30,
          price: 29.99,
          isRecurring: true,
          renewalDiscount: 10,
          maxRenewals: 12,
          isActive: true,
          features: [
            '30-day listing duration',
            'Basic listing format',
            'One photo included',
            'Standard placement'
          ]
        },
        {
          id: '2',
          name: 'Premium Real Estate Listing',
          description: 'Enhanced real estate listing with premium features',
          category: 'Real Estate',
          duration: 60,
          price: 49.99,
          isRecurring: true,
          renewalDiscount: 15,
          maxRenewals: 12,
          isActive: true,
          features: [
            '60-day listing duration',
            'Enhanced listing format',
            'Up to 5 photos',
            'Priority placement',
            'Featured badge'
          ]
        },
        {
          id: '3',
          name: 'Basic Automotive Listing',
          description: 'Standard vehicle listing with basic features',
          category: 'Automotive',
          duration: 30,
          price: 19.99,
          isRecurring: true,
          renewalDiscount: 10,
          maxRenewals: 12,
          isActive: true,
          features: [
            '30-day listing duration',
            'Basic listing format',
            'One photo included',
            'Standard placement'
          ]
        },
        {
          id: '4',
          name: 'Premium Automotive Listing',
          description: 'Enhanced vehicle listing with premium features',
          category: 'Automotive',
          duration: 60,
          price: 39.99,
          isRecurring: true,
          renewalDiscount: 15,
          maxRenewals: 12,
          isActive: true,
          features: [
            '60-day listing duration',
            'Enhanced listing format',
            'Up to 5 photos',
            'Priority placement',
            'Featured badge'
          ]
        }
      ];
      localStorage.setItem('plans', JSON.stringify(samplePlans));
    }
  }, []);

  useEffect(() => {
    // If editing an existing plan, load its data
    if (id) {
      const storedPlans = localStorage.getItem('plans');
      if (storedPlans) {
        const plans = JSON.parse(storedPlans);
        const existingPlan = plans.find(p => p.id === id);
        if (existingPlan) {
          setPlan(existingPlan);
        }
      }
    }
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPlan(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    const storedPlans = localStorage.getItem('plans');
    const plans = storedPlans ? JSON.parse(storedPlans) : [];
    
    if (id) {
      // Update existing plan
      const updatedPlans = plans.map(p => 
        p.id === id ? { ...plan, id } : p
      );
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
    } else {
      // Create new plan
      const newPlan = {
        ...plan,
        id: Date.now().toString()
      };
      localStorage.setItem('plans', JSON.stringify([...plans, newPlan]));
    }
    
    navigate('/plans');
  };

  return (
    <div className="plan-builder">
      <div className="page-header">
        <h1>{id ? 'Edit Plan' : 'Create New Plan'}</h1>
        <button className="cancel-button" onClick={() => navigate('/plans')}>
          Cancel
        </button>
      </div>

      <div className="plan-form">
        <div className="form-group">
          <label htmlFor="name">Plan Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={plan.name}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={plan.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={plan.category}
            onChange={handleInputChange}
            required
          >
            <option value="">Select Category</option>
            <option value="Real Estate">Real Estate</option>
            <option value="Automotive">Automotive</option>
            <option value="Jobs">Jobs</option>
            <option value="Services">Services</option>
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
            required
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
            required
          />
        </div>

        <div className="form-group">
          <label>
            <input
              type="checkbox"
              name="isRecurring"
              checked={plan.isRecurring}
              onChange={(e) => setPlan(prev => ({ ...prev, isRecurring: e.target.checked }))}
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

        <div className="form-actions">
          <button className="save-button" onClick={handleSave}>
            {id ? 'Save Changes' : 'Create Plan'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanBuilder; 