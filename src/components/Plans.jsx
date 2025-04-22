import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './Plans.css';

const Plans = () => {
  const navigate = useNavigate();
  const { plans, deletePlan } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');

  const filteredPlans = plans
    .filter(plan => {
      const matchesSearch = plan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          plan.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterActive === 'all' || 
                          (filterActive === 'active' && plan.isActive) ||
                          (filterActive === 'inactive' && !plan.isActive);
      return matchesSearch && matchesFilter;
    });

  const handleDelete = (id) => {
    deletePlan(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="plans-container">
      <div className="plans-header">
        <h1>Plans</h1>
        <button 
          className="create-button"
          onClick={() => navigate('/plan-builder')}
        >
          Create New Plan
        </button>
      </div>

      <div className="plans-filters">
        <input
          type="text"
          placeholder="Search plans..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Plans</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      <div className="plans-grid">
        {filteredPlans.length === 0 ? (
          <div className="no-plans">
            <p>No plans found. Create a new plan to get started.</p>
          </div>
        ) : (
          filteredPlans.map(plan => (
            <div key={plan.id} className="plan-card">
              <div className="plan-header">
                <h2>{plan.name}</h2>
                <div className="plan-actions">
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/plan-builder/${plan.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => setShowDeleteConfirm(plan.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="plan-description">{plan.description}</p>
              <div className="plan-details">
                <span className={`plan-status ${plan.isActive ? 'active' : 'inactive'}`}>
                  {plan.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="plan-price">${plan.price}</span>
              </div>
              <div className="plan-features">
                {plan.features?.map((feature, index) => (
                  <span key={index} className="feature-tag">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          ))
        )}
      </div>

      {showDeleteConfirm && (
        <div className="delete-confirm-modal">
          <div className="delete-confirm-content">
            <h3>Confirm Delete</h3>
            <p>Are you sure you want to delete this plan?</p>
            <div className="delete-confirm-actions">
              <button
                className="cancel-button"
                onClick={() => setShowDeleteConfirm(null)}
              >
                Cancel
              </button>
              <button
                className="confirm-delete-button"
                onClick={() => handleDelete(showDeleteConfirm)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Plans; 