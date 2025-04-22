import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './CategoriesByIndustry.css';

const CategoriesByIndustry = () => {
  const navigate = useNavigate();
  const [showAddModal, setShowAddModal] = useState(false);
  const [currentIndustry, setCurrentIndustry] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [newCategoryIcon, setNewCategoryIcon] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedIndustry, setSelectedIndustry] = useState('all');

  const categories = {
    'Real Estate': [
      { id: '1', name: 'For Sale – Residential', icon: '🏠' },
      { id: '2', name: 'For Sale – Commercial', icon: '🏢' },
      { id: '3', name: 'For Sale – Land', icon: '🌳' },
      { id: '4', name: 'For Rent – Residential', icon: '🔑' },
      { id: '5', name: 'For Rent – Vacation Properties', icon: '🏖️' },
      { id: '6', name: 'For Rent – Commercial', icon: '🏢' },
      { id: '7', name: 'Real Estate Wanted', icon: '🔍' },
      { id: '8', name: 'Roommates / Shared Housing', icon: '👥' },
      { id: '9', name: 'Time Shares', icon: '⏰' },
      { id: '10', name: 'Parking / Storage', icon: '🅿️' },
      { id: '11', name: 'Open Houses', icon: '🏡' },
      { id: '12', name: 'Real Estate Services', icon: '👨‍💼' },
      { id: '13', name: 'Auctions / Foreclosures', icon: '🔨' }
    ],
    'Vehicles': [
      { id: '14', name: 'Cars for Sale', icon: '🚗' },
      { id: '15', name: 'Trucks / SUVs', icon: '🚚' },
      { id: '16', name: 'Motorcycles', icon: '🏍️' },
      { id: '17', name: 'RVs / Campers', icon: '🚐' },
      { id: '18', name: 'Boats / Watercraft', icon: '🚤' },
      { id: '19', name: 'Commercial Vehicles', icon: '🚛' },
      { id: '20', name: 'Vehicle Parts / Accessories', icon: '🔧' },
      { id: '21', name: 'Vehicle Wanted', icon: '🔍' },
      { id: '22', name: 'Vehicle Rentals', icon: '🔑' },
      { id: '23', name: 'Trailers', icon: '🚛' },
      { id: '24', name: 'Classic & Antique Cars', icon: '🏎️' }
    ],
    'Jobs & Employment': [
      { id: '25', name: 'Full-Time Jobs', icon: '💼' },
      { id: '26', name: 'Part-Time Jobs', icon: '⏰' },
      { id: '27', name: 'Temporary / Seasonal Jobs', icon: '📅' },
      { id: '28', name: 'Remote / Work From Home', icon: '🏠' },
      { id: '29', name: 'Internships', icon: '🎓' },
      { id: '30', name: 'Government Jobs', icon: '🏛️' },
      { id: '31', name: 'Executive / Management', icon: '👔' },
      { id: '32', name: 'Skilled Trades / Construction', icon: '🔨' },
      { id: '33', name: 'Healthcare', icon: '🏥' },
      { id: '34', name: 'Education / Teaching', icon: '📚' },
      { id: '35', name: 'Technology / IT', icon: '💻' },
      { id: '36', name: 'Hospitality / Food Service', icon: '🍽️' },
      { id: '37', name: 'Transportation / Delivery', icon: '🚚' },
      { id: '38', name: 'Customer Service / Call Center', icon: '📞' },
      { id: '39', name: 'Retail / Sales', icon: '🛍️' },
      { id: '40', name: 'Job Wanted', icon: '🔍' },
      { id: '41', name: 'Employment Agencies', icon: '🤝' },
      { id: '42', name: 'Training / Certification', icon: '📜' }
    ],
    'Services': [
      { id: '43', name: 'Home Improvement / Contractors', icon: '🔨' },
      { id: '44', name: 'Cleaning Services', icon: '🧹' },
      { id: '45', name: 'Landscaping / Lawn Care', icon: '🌿' },
      { id: '46', name: 'Childcare / Nanny', icon: '👶' },
      { id: '47', name: 'Elder Care / Home Health', icon: '👵' },
      { id: '48', name: 'Legal Services', icon: '⚖️' },
      { id: '49', name: 'Financial Services', icon: '💰' },
      { id: '50', name: 'Computer / IT Services', icon: '💻' },
      { id: '51', name: 'Moving / Hauling', icon: '🚚' },
      { id: '52', name: 'Automotive Repair', icon: '🔧' },
      { id: '53', name: 'Beauty / Wellness Services', icon: '💆' },
      { id: '54', name: 'Tutoring / Lessons', icon: '📚' },
      { id: '55', name: 'Pet Services', icon: '🐾' },
      { id: '56', name: 'Photography / Videography', icon: '📸' },
      { id: '57', name: 'Event Planning', icon: '🎉' },
      { id: '58', name: 'Security Services', icon: '🛡️' }
    ]
  };

  const handleAdd = (industry) => {
    setCurrentIndustry(industry);
    setShowAddModal(true);
  };

  const handleAddSubmit = () => {
    if (newCategoryName && newCategoryIcon) {
      const newId = Date.now().toString();
      setCategories(prev => ({
        ...prev,
        [currentIndustry]: [...prev[currentIndustry], { 
          id: newId, 
          name: newCategoryName, 
          icon: newCategoryIcon 
        }]
      }));
      setShowAddModal(false);
      setNewCategoryName('');
      setNewCategoryIcon('');
    }
  };

  const filteredCategories = () => {
    let filtered = {};
    Object.entries(categories).forEach(([industry, items]) => {
      if (selectedIndustry === 'all' || selectedIndustry === industry) {
        const filteredItems = items.filter(item => 
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        if (filteredItems.length > 0) {
          filtered[industry] = filteredItems;
        }
      }
    });
    return filtered;
  };

  return (
    <div className="categories-by-industry">
      <div className="page-header">
        <BackButton to="/categories" text="Back to Categories" />
        <h1>Categories Sorted by Industry</h1>
      </div>

      <div className="search-and-filter">
        <input
          type="text"
          placeholder="Search categories..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="search-input"
        />
        <select
          value={selectedIndustry}
          onChange={(e) => setSelectedIndustry(e.target.value)}
          className="industry-select"
        >
          <option value="all">All Industries</option>
          {Object.keys(categories).map(industry => (
            <option key={industry} value={industry}>{industry}</option>
          ))}
        </select>
      </div>

      <div className="categories-grid">
        {Object.entries(filteredCategories()).map(([industry, items]) => (
          <div key={industry} className="industry-section">
            <div className="industry-header">
              <h2>{industry}</h2>
              <button 
                onClick={() => handleAdd(industry)}
                className="add-button"
              >
                Add Category
              </button>
            </div>
            <div className="category-list">
              {items.map(category => (
                <div key={category.id} className="category-item">
                  <span className="category-icon">{category.icon}</span>
                  <span className="category-name">{category.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Add New Category to {currentIndustry}</h3>
            <div className="modal-content">
              <div className="form-group">
                <label>Category Name:</label>
                <input
                  type="text"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  placeholder="Enter category name"
                />
              </div>
              <div className="form-group">
                <label>Category Icon (Emoji):</label>
                <input
                  type="text"
                  value={newCategoryIcon}
                  onChange={(e) => setNewCategoryIcon(e.target.value)}
                  placeholder="Enter emoji icon"
                />
              </div>
              <div className="modal-buttons">
                <button onClick={() => setShowAddModal(false)}>Cancel</button>
                <button onClick={handleAddSubmit}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CategoriesByIndustry; 