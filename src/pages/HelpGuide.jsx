import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HelpGuide.css';

const HelpGuide = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [helpContent, setHelpContent] = useState({
    categories: {
      'order-systems': {
        name: 'Order Systems',
        description: 'Manage your order systems, publications, and websites',
        features: [
          {
            id: 'publications-websites',
            name: 'Publications and Websites',
            description: 'Manage your publications and websites',
            steps: [
              'Navigate to Order Systems > Publications and Websites',
              'Add new publications or websites using the + button',
              'Configure publication details and settings',
              'Set up website integration if applicable'
            ],
            relatedFeatures: ['rate-cards', 'categories']
          },
          {
            id: 'rate-cards',
            name: 'Rate Cards',
            description: 'Create and manage rate cards for your publications',
            steps: [
              'Navigate to Order Systems > Rate Cards',
              'Click "Create New Rate Card"',
              'Configure rates, add-ons, and discounts',
              'Save and activate the rate card'
            ],
            relatedFeatures: ['discounts', 'add-ons']
          },
          {
            id: 'categories',
            name: 'Categories',
            description: 'Manage advertisement categories and subcategories',
            steps: [
              'Navigate to Order Systems > Categories',
              'View existing categories or add new ones',
              'Configure subcategories for each main category',
              'Set up category-specific settings'
            ],
            relatedFeatures: ['rate-cards']
          }
        ]
      },
      'discounts': {
        name: 'Discounts and Overrides',
        description: 'Manage discounts and pricing overrides',
        features: [
          {
            id: 'discounts',
            name: 'Discounts',
            description: 'Create and manage discounts for your rate cards',
            steps: [
              'Navigate to Order Systems > Discounts/Overrides',
              'Click "Create New Discount"',
              'Configure discount rules and conditions',
              'Set up discount tiers and rates',
              'Save and activate the discount'
            ],
            relatedFeatures: ['rate-cards']
          }
        ]
      },
      'analytics': {
        name: 'Analytics',
        description: 'View and analyze your classifieds performance',
        features: [
          {
            id: 'dashboard',
            name: 'Dashboard',
            description: 'View key metrics and performance indicators',
            steps: [
              'Navigate to Analytics',
              'View the main dashboard with key metrics',
              'Use filters to analyze specific time periods',
              'Export reports as needed'
            ],
            relatedFeatures: []
          }
        ]
      }
    }
  });

  const handleBack = () => {
    navigate(-1);
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const filteredFeatures = () => {
    let features = [];
    Object.entries(helpContent.categories).forEach(([categoryId, category]) => {
      if (selectedCategory === 'all' || selectedCategory === categoryId) {
        category.features.forEach(feature => {
          if (searchQuery === '' || 
              feature.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              feature.description.toLowerCase().includes(searchQuery.toLowerCase())) {
            features.push({
              ...feature,
              category: category.name
            });
          }
        });
      }
    });
    return features;
  };

  return (
    <div className="help-guide">
      <div className="help-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>Help Guide</h1>
      </div>

      <div className="help-search">
        <input
          type="text"
          placeholder="Search help topics..."
          value={searchQuery}
          onChange={handleSearch}
          className="search-input"
        />
      </div>

      <div className="help-categories">
        <button 
          className={`category-button ${selectedCategory === 'all' ? 'active' : ''}`}
          onClick={() => handleCategorySelect('all')}
        >
          All Topics
        </button>
        {Object.entries(helpContent.categories).map(([id, category]) => (
          <button
            key={id}
            className={`category-button ${selectedCategory === id ? 'active' : ''}`}
            onClick={() => handleCategorySelect(id)}
          >
            {category.name}
          </button>
        ))}
      </div>

      <div className="help-content">
        {filteredFeatures().map(feature => (
          <div key={feature.id} className="feature-card">
            <h3>{feature.name}</h3>
            <p className="category-tag">{feature.category}</p>
            <p className="description">{feature.description}</p>
            
            <div className="steps-section">
              <h4>Steps:</h4>
              <ol>
                {feature.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>

            {feature.relatedFeatures.length > 0 && (
              <div className="related-features">
                <h4>Related Features:</h4>
                <div className="related-tags">
                  {feature.relatedFeatures.map(relatedId => (
                    <span key={relatedId} className="related-tag">
                      {relatedId}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default HelpGuide; 