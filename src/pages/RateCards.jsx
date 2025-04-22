import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { getRateTypeIcon, getAddOnIcon } from '../utils/formatting';
import './RateCards.css';

const RateCards = () => {
  const navigate = useNavigate();
  const { rateCards, deleteRateCard } = useApp();
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [filterActive, setFilterActive] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    console.log('Rate Cards Data:', rateCards);
  }, [rateCards]);

  const filteredRateCards = rateCards
    .filter(card => {
      const matchesSearch = card.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          card.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterActive === 'all' || 
                          (filterActive === 'active' && card.isActive) ||
                          (filterActive === 'inactive' && !card.isActive);
      return matchesSearch && matchesFilter;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'type':
          return a.type.localeCompare(b.type);
        case 'category':
          return a.category.localeCompare(b.category);
        default:
          return 0;
      }
    });

  const handleDelete = (id) => {
    deleteRateCard(id);
    setShowDeleteConfirm(null);
  };

  return (
    <div className="rate-cards-container">
      <div className="rate-cards-header">
        <h1>Rate Cards</h1>
        <button 
          className="create-button"
          onClick={() => navigate('/rate-card/new')}
        >
          Create New Rate Card
        </button>
      </div>

      <div className="rate-cards-filters">
        <input
          type="text"
          placeholder="Search rate cards..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <select
          value={filterActive}
          onChange={(e) => setFilterActive(e.target.value)}
          className="filter-select"
        >
          <option value="all">All Rate Cards</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="sort-select"
        >
          <option value="name">Sort by Name</option>
          <option value="type">Sort by Type</option>
          <option value="category">Sort by Category</option>
        </select>
      </div>

      <div className="rate-cards-grid">
        {filteredRateCards.length === 0 ? (
          <div className="no-rate-cards">
            <p>No rate cards found. Create a new rate card to get started.</p>
          </div>
        ) : (
          filteredRateCards.map(card => (
            <div key={card.id} className="rate-card">
              <div className="rate-card-header">
                <span className="rate-type-icon">{getRateTypeIcon(card.type)}</span>
                <h2>{card.name}</h2>
                <div className="rate-card-actions">
                  <button
                    className="edit-button"
                    onClick={() => navigate(`/rate-card/${card.id}`)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => setShowDeleteConfirm(card.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="rate-card-description">{card.description}</p>
              <div className="rate-card-details">
                <span className="rate-card-category">{card.category}</span>
                <span className={`rate-card-status ${card.isActive ? 'active' : 'inactive'}`}>
                  {card.isActive ? 'Active' : 'Inactive'}
                </span>
              </div>
              <div className="rate-card-addons">
                {card.addOns?.map(addOnId => (
                  <span key={addOnId} className="addon-icon" title={addOnId}>
                    {getAddOnIcon(addOnId)}
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
            <p>Are you sure you want to delete this rate card?</p>
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

export default RateCards; 