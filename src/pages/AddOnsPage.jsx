import React, { useState, useEffect } from 'react';
import './AddOnsPage.css';

const AddOnsPage = () => {
  const [addOns, setAddOns] = useState([
    {
      id: 'premium-placement',
      name: 'Premium Placement',
      icon: '⭐',
      category: 'Visual Add-Ons',
      description: 'Place your ad in prime locations for maximum visibility',
      price: 49.99,
      features: ['Top of page placement', 'Featured section display', 'Highlighted border'],
      active: true
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      icon: '🖼️',
      category: 'Visual Add-Ons',
      description: 'Add multiple images to showcase your listing',
      price: 29.99,
      features: ['Up to 10 images', 'Slideshow view', 'Thumbnail navigation'],
      active: true
    },
    {
      id: 'video-inclusion',
      name: 'Video Inclusion',
      icon: '🎥',
      category: 'Interactive Add-Ons',
      description: 'Embed a video in your listing',
      price: 39.99,
      features: ['HD video support', 'Auto-play option', 'Custom thumbnail'],
      active: true
    },
    {
      id: 'social-sharing',
      name: 'Social Sharing',
      icon: '🔗',
      category: 'Interactive Add-Ons',
      description: 'Enable social media sharing buttons',
      price: 19.99,
      features: ['Multiple platform support', 'Share count tracking', 'Custom share messages'],
      active: true
    },
    {
      id: 'email-alerts',
      name: 'Email Alerts',
      icon: '📧',
      category: 'Notification Add-Ons',
      description: 'Get notified of interested buyers',
      price: 24.99,
      features: ['Instant notifications', 'Daily summaries', 'Custom alert settings'],
      active: true
    },
    {
      id: 'featured-badge',
      name: 'Featured Badge',
      icon: '🏆',
      category: 'Visual Add-Ons',
      description: 'Stand out with a featured badge',
      price: 34.99,
      features: ['Custom badge design', 'Priority in search', 'Special highlighting'],
      active: true
    },
    {
      id: 'virtual-tour',
      name: 'Virtual Tour',
      icon: '🔄',
      category: 'Interactive Add-Ons',
      description: 'Add a 360° virtual tour to your listing',
      price: 49.99,
      features: ['360° view support', 'Multiple hotspots', 'Custom navigation'],
      active: true
    },
    {
      id: 'analytics-dashboard',
      name: 'Analytics Dashboard',
      icon: '📊',
      category: 'Analytics Add-Ons',
      description: 'Track and analyze your listing performance',
      price: 29.99,
      features: ['View statistics', 'Click tracking', 'Conversion analytics'],
      active: true
    },
    {
      id: 'auto-renewal',
      name: 'Auto-Renewal',
      icon: '🔄',
      category: 'Service Add-Ons',
      description: 'Automatically renew your listing',
      price: 9.99,
      features: ['Automatic renewal', 'Payment reminders', 'Renewal history'],
      active: true
    },
    {
      id: 'priority-support',
      name: 'Priority Support',
      icon: '🎯',
      category: 'Service Add-Ons',
      description: 'Get priority access to customer support',
      price: 19.99,
      features: ['24/7 support', 'Priority response', 'Dedicated support agent'],
      active: true
    },
    {
      id: 'custom-domain',
      name: 'Custom Domain',
      icon: '🌐',
      category: 'Technical Add-Ons',
      description: 'Use your own domain for your listing',
      price: 39.99,
      features: ['Custom URL', 'SSL certificate', 'Domain management'],
      active: true
    },
    {
      id: 'advanced-search',
      name: 'Advanced Search',
      icon: '🔍',
      category: 'Technical Add-Ons',
      description: 'Enhanced search capabilities for your listing',
      price: 24.99,
      features: ['Advanced filters', 'Search analytics', 'Custom search fields'],
      active: true
    }
  ]);

  const [editingAddOn, setEditingAddOn] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    icon: '',
    category: '',
    description: '',
    price: '',
    features: []
  });

  useEffect(() => {
    // Load add-ons from localStorage if available
    const savedAddOns = localStorage.getItem('addOns');
    if (savedAddOns) {
      setAddOns(JSON.parse(savedAddOns));
    }
  }, []);

  useEffect(() => {
    // Save add-ons to localStorage whenever they change
    localStorage.setItem('addOns', JSON.stringify(addOns));
  }, [addOns]);

  const handleToggleActive = (id) => {
    setAddOns(addOns.map(addon => 
      addon.id === id ? { ...addon, active: !addon.active } : addon
    ));
  };

  const handleEdit = (id) => {
    const addOnToEdit = addOns.find(addon => addon.id === id);
    if (addOnToEdit) {
      setEditingAddOn(addOnToEdit);
      setEditForm({
        name: addOnToEdit.name,
        icon: addOnToEdit.icon,
        category: addOnToEdit.category,
        description: addOnToEdit.description,
        price: addOnToEdit.price,
        features: [...addOnToEdit.features]
      });
    }
  };

  const handleEditFormChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...editForm.features];
    newFeatures[index] = value;
    setEditForm(prev => ({
      ...prev,
      features: newFeatures
    }));
  };

  const handleAddFeature = () => {
    setEditForm(prev => ({
      ...prev,
      features: [...prev.features, '']
    }));
  };

  const handleRemoveFeature = (index) => {
    setEditForm(prev => ({
      ...prev,
      features: prev.features.filter((_, i) => i !== index)
    }));
  };

  const handleSaveEdit = () => {
    if (editingAddOn) {
      setAddOns(addOns.map(addon => 
        addon.id === editingAddOn.id
          ? {
              ...addon,
              name: editForm.name,
              icon: editForm.icon,
              category: editForm.category,
              description: editForm.description,
              price: parseFloat(editForm.price),
              features: editForm.features.filter(feature => feature.trim() !== '')
            }
          : addon
      ));
      setEditingAddOn(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingAddOn(null);
  };

  // Group add-ons by category
  const groupedAddOns = addOns.reduce((acc, addon) => {
    if (!acc[addon.category]) {
      acc[addon.category] = [];
    }
    acc[addon.category].push(addon);
    return acc;
  }, {});

  return (
    <div className="add-ons-page">
      <div className="page-header">
        <h1>Add-Ons</h1>
        <p>Enhance your listings with these powerful add-ons</p>
      </div>

      {Object.entries(groupedAddOns).map(([category, categoryAddOns]) => (
        <div key={category} className="category-section">
          <h2 className="category-header">{category}</h2>
          <div className="add-ons-grid">
            {categoryAddOns.map(addon => (
              <div key={addon.id} className="add-on-card">
                <div className="add-on-header">
                  <span className="add-on-icon">{addon.icon}</span>
                  <h3>{addon.name}</h3>
                  <span className={`status-badge ${addon.active ? 'active' : 'inactive'}`}>
                    {addon.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                <p className="add-on-description">{addon.description}</p>
                <div className="add-on-price">
                  <span className="price">${addon.price}</span>
                  <span className="period">/month</span>
                </div>
                <ul className="add-on-features">
                  {addon.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
                <div className="add-on-actions">
                  <button 
                    className="edit-button"
                    onClick={() => handleEdit(addon.id)}
                  >
                    Edit
                  </button>
                  <button 
                    className={`toggle-button ${addon.active ? 'active' : 'inactive'}`}
                    onClick={() => handleToggleActive(addon.id)}
                  >
                    {addon.active ? 'Deactivate' : 'Activate'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}

      {editingAddOn && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Add-On</h2>
            <div className="edit-form">
              <div className="form-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={editForm.name}
                  onChange={handleEditFormChange}
                />
              </div>
              <div className="form-group">
                <label>Icon</label>
                <input
                  type="text"
                  name="icon"
                  value={editForm.icon}
                  onChange={handleEditFormChange}
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <input
                  type="text"
                  name="category"
                  value={editForm.category}
                  onChange={handleEditFormChange}
                />
              </div>
              <div className="form-group">
                <label>Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                />
              </div>
              <div className="form-group">
                <label>Price</label>
                <input
                  type="number"
                  name="price"
                  value={editForm.price}
                  onChange={handleEditFormChange}
                  step="0.01"
                />
              </div>
              <div className="form-group">
                <label>Features</label>
                {editForm.features.map((feature, index) => (
                  <div key={index} className="feature-input">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleFeatureChange(index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-feature"
                      onClick={() => handleRemoveFeature(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-feature"
                  onClick={handleAddFeature}
                >
                  Add Feature
                </button>
              </div>
              <div className="modal-actions">
                <button className="cancel-button" onClick={handleCancelEdit}>
                  Cancel
                </button>
                <button className="save-button" onClick={handleSaveEdit}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddOnsPage; 