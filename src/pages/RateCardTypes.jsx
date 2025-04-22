import React, { useState, useEffect } from 'react';
import './RateCardTypes.css';

const RateCardTypes = () => {
  const [rateTypes, setRateTypes] = useState([
    {
      id: 'flat',
      name: 'Flat Rate',
      icon: '🧾',
      description: 'A fixed price is charged per ad, regardless of size, length, or content.',
      useCases: [
        'Online-only platforms',
        'Short-term ads',
        'Self-service publishing',
        'Garage sales',
        'Simple announcements'
      ],
      examples: [
        '$25 for 30 days',
        '$50 for premium placement',
        '$100 for featured listings'
      ],
      features: [
        'Unlimited words',
        'Up to 5 images',
        'Basic listing features',
        'Email support'
      ],
      fields: [
        { id: 'base', label: 'Base Rate', type: 'number', required: true },
        { id: 'duration', label: 'Duration (days)', type: 'number', required: true },
        { id: 'maxWords', label: 'Maximum Words', type: 'number', required: false },
        { id: 'maxImages', label: 'Maximum Images', type: 'number', required: false }
      ]
    },
    {
      id: 'word',
      name: 'Word-Based',
      icon: '📏',
      description: 'Price is determined by the number of words in the ad.',
      useCases: [
        'Print classifieds',
        'Obituaries',
        'Announcements',
        'Legal notices'
      ],
      examples: [
        '$15 base rate for 25 words',
        '$0.50 per additional word'
      ],
      features: [
        'Base rate for minimum word count',
        'Additional words charged incrementally',
        'Optional headline charge'
      ],
      fields: [
        { id: 'base', label: 'Base Rate', type: 'number', required: true },
        { id: 'minWords', label: 'Minimum Words', type: 'number', required: true },
        { id: 'pricePerWord', label: 'Price per Additional Word', type: 'number', required: true },
        { id: 'headlinePrice', label: 'Headline Price', type: 'number', required: false }
      ]
    },
    {
      id: 'line',
      name: 'Line Rate',
      icon: '🧱',
      description: 'Ads are charged by the number of lines they occupy in print.',
      useCases: [
        'Print newspaper classifieds',
        'Legal notices',
        'Public announcements'
      ],
      examples: [
        '$2.50 per line',
        'Minimum 3 lines'
      ],
      features: [
        'Standardized line height',
        'Multiple font size options',
        'Border and logo add-ons'
      ],
      fields: [
        { id: 'pricePerLine', label: 'Price per Line', type: 'number', required: true },
        { id: 'minLines', label: 'Minimum Lines', type: 'number', required: true },
        { id: 'maxLines', label: 'Maximum Lines', type: 'number', required: true }
      ]
    },
    {
      id: 'modular',
      name: 'Modular',
      icon: '📐',
      description: 'Pricing based on ad size modules.',
      useCases: [
        'Print publications',
        'Magazine ads',
        'Display classifieds'
      ],
      examples: [
        '1/8 page: $100',
        '1/4 page: $180',
        '1/2 page: $300'
      ],
      features: [
        'Standard ad sizes',
        'Flexible placement options',
        'Premium placement available'
      ],
      fields: [
        { id: 'quarter', label: '1/4 Page Price', type: 'number', required: true },
        { id: 'half', label: '1/2 Page Price', type: 'number', required: true },
        { id: 'full', label: 'Full Page Price', type: 'number', required: true }
      ]
    },
    {
      id: 'columnInch',
      name: 'Column Inch',
      icon: '📰',
      description: 'Pricing based on the number of column inches an ad occupies.',
      useCases: [
        'Newspaper classifieds',
        'Real estate listings',
        'Automotive ads'
      ],
      examples: [
        '$15 per column inch',
        'Minimum 2 column inches'
      ],
      features: [
        'Standard column width',
        'Flexible height options',
        'Premium placement available'
      ],
      fields: [
        { id: 'pricePerInch', label: 'Price per Column Inch', type: 'number', required: true },
        { id: 'minInches', label: 'Minimum Inches', type: 'number', required: true },
        { id: 'maxInches', label: 'Maximum Inches', type: 'number', required: true }
      ]
    },
    {
      id: 'tiered',
      name: 'Tiered',
      icon: '📊',
      description: 'Volume-based pricing with tiered discounts.',
      useCases: [
        'Regular advertisers',
        'Bulk listings',
        'Long-term campaigns'
      ],
      examples: [
        '1-5 ads: $25 each',
        '6-10 ads: $20 each',
        '11-20 ads: $15 each'
      ],
      features: [
        'Volume discounts',
        'Duration discounts',
        'Package deals'
      ],
      fields: [
        { id: 'tier1', label: 'Tier 1 Price (1-5 ads)', type: 'number', required: true },
        { id: 'tier2', label: 'Tier 2 Price (6-10 ads)', type: 'number', required: true },
        { id: 'tier3', label: 'Tier 3 Price (11-20 ads)', type: 'number', required: true },
        { id: 'tier4', label: 'Tier 4 Price (21+ ads)', type: 'number', required: true }
      ]
    },
    {
      id: 'performance',
      name: 'Performance',
      icon: '🎯',
      description: 'Pricing based on ad performance metrics.',
      useCases: [
        'Digital advertising',
        'Lead generation',
        'Conversion tracking'
      ],
      examples: [
        '$0.50 per click',
        '$10 per lead',
        '$100 per conversion'
      ],
      features: [
        'Performance tracking',
        'Analytics dashboard',
        'ROI measurement'
      ],
      fields: [
        { id: 'click', label: 'Price per Click', type: 'number', required: true },
        { id: 'view', label: 'Price per View', type: 'number', required: true },
        { id: 'lead', label: 'Price per Lead', type: 'number', required: true },
        { id: 'conversion', label: 'Price per Conversion', type: 'number', required: true }
      ]
    }
  ]);

  const [editingType, setEditingType] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    icon: '',
    description: '',
    useCases: [],
    examples: [],
    features: [],
    fields: []
  });

  useEffect(() => {
    // Load rate types from localStorage if available
    const savedRateTypes = localStorage.getItem('rateTypes');
    if (savedRateTypes) {
      setRateTypes(JSON.parse(savedRateTypes));
    }
  }, []);

  useEffect(() => {
    // Save rate types to localStorage whenever they change
    localStorage.setItem('rateTypes', JSON.stringify(rateTypes));
  }, [rateTypes]);

  const handleEdit = (id) => {
    const typeToEdit = rateTypes.find(type => type.id === id);
    if (typeToEdit) {
      setEditingType(typeToEdit);
      setEditForm({
        name: typeToEdit.name,
        icon: typeToEdit.icon,
        description: typeToEdit.description,
        useCases: [...typeToEdit.useCases],
        examples: [...typeToEdit.examples],
        features: [...typeToEdit.features],
        fields: [...typeToEdit.fields]
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

  const handleListChange = (listName, index, value) => {
    setEditForm(prev => ({
      ...prev,
      [listName]: prev[listName].map((item, i) => i === index ? value : item)
    }));
  };

  const handleAddListItem = (listName) => {
    setEditForm(prev => ({
      ...prev,
      [listName]: [...prev[listName], '']
    }));
  };

  const handleRemoveListItem = (listName, index) => {
    setEditForm(prev => ({
      ...prev,
      [listName]: prev[listName].filter((_, i) => i !== index)
    }));
  };

  const handleFieldChange = (index, field, value) => {
    const newFields = [...editForm.fields];
    newFields[index] = { ...newFields[index], [field]: value };
    setEditForm(prev => ({
      ...prev,
      fields: newFields
    }));
  };

  const handleAddField = () => {
    setEditForm(prev => ({
      ...prev,
      fields: [...prev.fields, { id: '', label: '', type: 'text', required: false }]
    }));
  };

  const handleRemoveField = (index) => {
    setEditForm(prev => ({
      ...prev,
      fields: prev.fields.filter((_, i) => i !== index)
    }));
  };

  const handleSaveEdit = () => {
    if (editingType) {
      setRateTypes(rateTypes.map(type => 
        type.id === editingType.id
          ? {
              ...type,
              name: editForm.name,
              icon: editForm.icon,
              description: editForm.description,
              useCases: editForm.useCases.filter(item => item.trim() !== ''),
              examples: editForm.examples.filter(item => item.trim() !== ''),
              features: editForm.features.filter(item => item.trim() !== ''),
              fields: editForm.fields.filter(field => field.id.trim() !== '')
            }
          : type
      ));
      setEditingType(null);
    }
  };

  const handleCancelEdit = () => {
    setEditingType(null);
  };

  return (
    <div className="rate-card-types">
      <div className="page-header">
        <h1>Rate Card Types</h1>
        <p>Manage and configure different types of rate cards</p>
      </div>

      <div className="rate-types-grid">
        {rateTypes.map(type => (
          <div key={type.id} className="rate-type-card">
            <div className="rate-type-header">
              <span className="rate-type-icon">{type.icon}</span>
              <h3>{type.name}</h3>
              <button 
                className="edit-button"
                onClick={() => handleEdit(type.id)}
              >
                Edit
              </button>
            </div>
            <p className="rate-type-description">{type.description}</p>
            <div className="rate-type-details">
              <div className="detail-section">
                <h4>Use Cases</h4>
                <ul>
                  {type.useCases.map((useCase, index) => (
                    <li key={index}>{useCase}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h4>Examples</h4>
                <ul>
                  {type.examples.map((example, index) => (
                    <li key={index}>{example}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h4>Features</h4>
                <ul>
                  {type.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
              <div className="detail-section">
                <h4>Fields</h4>
                <ul>
                  {type.fields.map((field, index) => (
                    <li key={index}>
                      {field.label} ({field.type})
                      {field.required && <span className="required">*</span>}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingType && (
        <div className="edit-modal">
          <div className="edit-modal-content">
            <h2>Edit Rate Card Type</h2>
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
                <label>Description</label>
                <textarea
                  name="description"
                  value={editForm.description}
                  onChange={handleEditFormChange}
                />
              </div>

              <div className="form-group">
                <label>Use Cases</label>
                {editForm.useCases.map((useCase, index) => (
                  <div key={index} className="list-item">
                    <input
                      type="text"
                      value={useCase}
                      onChange={(e) => handleListChange('useCases', index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => handleRemoveListItem('useCases', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-item"
                  onClick={() => handleAddListItem('useCases')}
                >
                  Add Use Case
                </button>
              </div>

              <div className="form-group">
                <label>Examples</label>
                {editForm.examples.map((example, index) => (
                  <div key={index} className="list-item">
                    <input
                      type="text"
                      value={example}
                      onChange={(e) => handleListChange('examples', index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => handleRemoveListItem('examples', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-item"
                  onClick={() => handleAddListItem('examples')}
                >
                  Add Example
                </button>
              </div>

              <div className="form-group">
                <label>Features</label>
                {editForm.features.map((feature, index) => (
                  <div key={index} className="list-item">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => handleListChange('features', index, e.target.value)}
                    />
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => handleRemoveListItem('features', index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-item"
                  onClick={() => handleAddListItem('features')}
                >
                  Add Feature
                </button>
              </div>

              <div className="form-group">
                <label>Fields</label>
                {editForm.fields.map((field, index) => (
                  <div key={index} className="field-item">
                    <input
                      type="text"
                      placeholder="Field ID"
                      value={field.id}
                      onChange={(e) => handleFieldChange(index, 'id', e.target.value)}
                    />
                    <input
                      type="text"
                      placeholder="Field Label"
                      value={field.label}
                      onChange={(e) => handleFieldChange(index, 'label', e.target.value)}
                    />
                    <select
                      value={field.type}
                      onChange={(e) => handleFieldChange(index, 'type', e.target.value)}
                    >
                      <option value="text">Text</option>
                      <option value="number">Number</option>
                      <option value="boolean">Boolean</option>
                      <option value="date">Date</option>
                    </select>
                    <label className="checkbox-label">
                      Required
                      <input
                        type="checkbox"
                        checked={field.required}
                        onChange={(e) => handleFieldChange(index, 'required', e.target.checked)}
                      />
                    </label>
                    <button
                      type="button"
                      className="remove-item"
                      onClick={() => handleRemoveField(index)}
                    >
                      ×
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-item"
                  onClick={handleAddField}
                >
                  Add Field
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

export default RateCardTypes; 