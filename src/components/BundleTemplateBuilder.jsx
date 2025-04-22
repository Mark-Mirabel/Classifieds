import React, { useState, useEffect } from 'react';
import BundleTemplate from '../models/pricing/BundleTemplate';
import './BundleTemplateBuilder.css';

const BundleTemplateBuilder = ({ onSave, rateCards, addOns, placementEnhancements }) => {
  const [bundle, setBundle] = useState({
    name: '',
    description: '',
    baseRateCardId: '',
    includedAddOns: [],
    placementEnhancements: [],
    bundlePrice: 0,
    conditions: [],
    priority: 0,
    isActive: true,
    startDate: null,
    endDate: null
  });

  const [selectedCondition, setSelectedCondition] = useState({
    type: '',
    value: '',
    startDate: null,
    endDate: null,
    startTime: '',
    endTime: ''
  });

  const [selectedAction, setSelectedAction] = useState({
    type: '',
    value: ''
  });

  const conditionTypes = [
    { value: 'category', label: 'Category' },
    { value: 'publicationCount', label: 'Publication Count' },
    { value: 'clientType', label: 'Client Type' },
    { value: 'dateRange', label: 'Date Range' },
    { value: 'adSize', label: 'Ad Size' },
    { value: 'adDuration', label: 'Ad Duration' },
    { value: 'clientTier', label: 'Client Tier' },
    { value: 'geographicLocation', label: 'Geographic Location' },
    { value: 'dayOfWeek', label: 'Day of Week' },
    { value: 'timeOfDay', label: 'Time of Day' },
    { value: 'totalSpend', label: 'Total Spend' },
    { value: 'bundleCompatibility', label: 'Bundle Compatibility' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBundle(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleConditionChange = (e) => {
    const { name, value } = e.target;
    setSelectedCondition(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    setBundle(prev => ({
      ...prev,
      [name]: value ? new Date(value) : null
    }));
  };

  const addCondition = () => {
    if (!selectedCondition.type) return;

    const newCondition = { ...selectedCondition };
    setBundle(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition]
    }));
    setSelectedCondition({
      type: '',
      value: '',
      startDate: null,
      endDate: null,
      startTime: '',
      endTime: ''
    });
  };

  const removeCondition = (index) => {
    setBundle(prev => ({
      ...prev,
      conditions: prev.conditions.filter((_, i) => i !== index)
    }));
  };

  const toggleAddOn = (addOnId) => {
    setBundle(prev => ({
      ...prev,
      includedAddOns: prev.includedAddOns.includes(addOnId)
        ? prev.includedAddOns.filter(id => id !== addOnId)
        : [...prev.includedAddOns, addOnId]
    }));
  };

  const togglePlacementEnhancement = (enhancementId) => {
    setBundle(prev => ({
      ...prev,
      placementEnhancements: prev.placementEnhancements.includes(enhancementId)
        ? prev.placementEnhancements.filter(id => id !== enhancementId)
        : [...prev.placementEnhancements, enhancementId]
    }));
  };

  const handleSave = () => {
    try {
      const newBundle = new BundleTemplate(bundle);
      onSave(newBundle);
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="bundle-builder">
      <div className="bundle-header">
        <h2>Bundle Template Builder</h2>
        <div className="bundle-info">
          <input
            type="text"
            name="name"
            placeholder="Bundle Name"
            value={bundle.name}
            onChange={handleInputChange}
          />
          <textarea
            name="description"
            placeholder="Bundle Description"
            value={bundle.description}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="bundle-content">
        <div className="rate-card-selection">
          <h3>Base Rate Card</h3>
          <select
            name="baseRateCardId"
            value={bundle.baseRateCardId}
            onChange={handleInputChange}
          >
            <option value="">Select Rate Card</option>
            {rateCards.map(rateCard => (
              <option key={rateCard.id} value={rateCard.id}>
                {rateCard.name}
              </option>
            ))}
          </select>
        </div>

        <div className="add-ons-section">
          <h3>Included Add-Ons</h3>
          <div className="add-ons-grid">
            {addOns.map(addOn => (
              <div
                key={addOn.id}
                className={`add-on-item ${bundle.includedAddOns.includes(addOn.id) ? 'selected' : ''}`}
                onClick={() => toggleAddOn(addOn.id)}
              >
                <h4>{addOn.name}</h4>
                <p>{addOn.description}</p>
                <span className="price">${addOn.price}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="placement-enhancements">
          <h3>Placement Enhancements</h3>
          <div className="enhancements-grid">
            {placementEnhancements.map(enhancement => (
              <div
                key={enhancement.id}
                className={`enhancement-item ${bundle.placementEnhancements.includes(enhancement.id) ? 'selected' : ''}`}
                onClick={() => togglePlacementEnhancement(enhancement.id)}
              >
                <h4>{enhancement.name}</h4>
                <p>{enhancement.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bundle-price">
          <h3>Bundle Price</h3>
          <input
            type="number"
            name="bundlePrice"
            value={bundle.bundlePrice}
            onChange={handleInputChange}
            min="0"
            step="0.01"
          />
        </div>

        <div className="conditions-section">
          <h3>Conditions</h3>
          <div className="condition-builder">
            <select
              name="type"
              value={selectedCondition.type}
              onChange={handleConditionChange}
            >
              <option value="">Select Condition Type</option>
              {conditionTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {selectedCondition.type && (
              <>
                {selectedCondition.type === 'dateRange' ? (
                  <>
                    <input
                      type="date"
                      name="startDate"
                      value={selectedCondition.startDate}
                      onChange={handleConditionChange}
                    />
                    <input
                      type="date"
                      name="endDate"
                      value={selectedCondition.endDate}
                      onChange={handleConditionChange}
                    />
                  </>
                ) : selectedCondition.type === 'timeOfDay' ? (
                  <>
                    <input
                      type="time"
                      name="startTime"
                      value={selectedCondition.startTime}
                      onChange={handleConditionChange}
                    />
                    <input
                      type="time"
                      name="endTime"
                      value={selectedCondition.endTime}
                      onChange={handleConditionChange}
                    />
                  </>
                ) : (
                  <input
                    type={selectedCondition.type === 'publicationCount' ? 'number' : 'text'}
                    name="value"
                    value={selectedCondition.value}
                    onChange={handleConditionChange}
                    placeholder="Enter value"
                  />
                )}
                <button onClick={addCondition}>Add Condition</button>
              </>
            )}
          </div>

          <div className="conditions-list">
            {bundle.conditions.map((condition, index) => (
              <div key={index} className="condition-item">
                <span>
                  {condition.type}: {condition.value}
                  {condition.startDate && ` (${condition.startDate} to ${condition.endDate})`}
                  {condition.startTime && ` (${condition.startTime} to ${condition.endTime})`}
                </span>
                <button onClick={() => removeCondition(index)}>Remove</button>
              </div>
            ))}
          </div>
        </div>

        <div className="bundle-dates">
          <h3>Active Period</h3>
          <div className="date-inputs">
            <input
              type="date"
              name="startDate"
              value={bundle.startDate}
              onChange={handleDateChange}
            />
            <input
              type="date"
              name="endDate"
              value={bundle.endDate}
              onChange={handleDateChange}
            />
          </div>
        </div>

        <button className="save-button" onClick={handleSave}>
          Save Bundle Template
        </button>
      </div>
    </div>
  );
};

export default BundleTemplateBuilder; 