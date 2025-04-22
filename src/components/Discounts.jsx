import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './Discounts.css';

const Discounts = () => {
  const navigate = useNavigate();
  const { discounts, deleteDiscount } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterActive, setFilterActive] = useState('all');
  const [sortBy, setSortBy] = useState('name');

  const filteredDiscounts = discounts
    .filter(discount => {
      const matchesSearch = discount.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          discount.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterActive === 'all' || 
                          (filterActive === 'active' && discount.isActive) ||
                          (filterActive === 'inactive' && !discount.isActive);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'value':
          return b.value - a.value;
        case 'type':
          return a.type.localeCompare(b.type);
        default:
          return 0;
      }
    });

  const handleDelete = (id) => {
    deleteDiscount(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="discounts-container">
      <div className="discounts-header">
        <h1>Discounts</h1>
        <button 
          className="create-button"
          onClick={() => navigate('/discount/new')}
        >
          Create New Discount
        </button>
      </div>

      <div className="discounts-filters">
        <input
          type="text"
          placeholder="Search discounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Discounts</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="value">Sort by Value</option>
          <option value="type">Sort by Type</option>
        </select>
      </div>

      <div className="discounts-grid">
        {filteredDiscounts.length === 0 ? (
          <div className="no-discounts">
            <p>No discounts found. Create a new discount to get started.</p>
          </div>
        ) : (
          filteredDiscounts.map(discount => (
            <div key={discount.id} className="discount-card">
              <div className="discount-header">
                <h2>{discount.name}</h2>
                <div className="discount-actions">
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/discount/${discount.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => setShowDeleteConfirm(discount.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="discount-description">{discount.description}</p>
              <div className="discount-details">
                <span className={`discount-status ${discount.isActive ? 'active' : 'inactive'}`}>
                  {discount.isActive ? 'Active' : 'Inactive'}
                </span>
                <span className="discount-value">
                  {discount.type === 'percentage' ? `${discount.value}%` : `$${discount.value}`}
                </span>
              </div>
              <div className="discount-conditions">
                {discount.conditions?.map((condition, index) => (
                  <span key={index} className="condition-tag">
                    {condition}
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
            <p>Are you sure you want to delete this discount?</p>
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

export default Discounts; 