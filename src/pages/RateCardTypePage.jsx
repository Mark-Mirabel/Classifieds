import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import './RateCardTypePage.css';

const RateCardTypePage = () => {
  const { typeId } = useParams();
  const [editing, setEditing] = useState(false);

  const rateCardTypes = {
    flat: {
      id: 'flat',
      name: 'Flat Rate',
      icon: '🧾',
      description: 'A fixed price is charged per ad, regardless of size, length, or content.',
      fields: [
        {
          category: 'Basic Rate Configuration',
          fields: [
            { name: 'Base Flat Rate', type: 'currency', required: true },
            { name: 'Currency', type: 'select', options: ['USD', 'EUR', 'GBP', 'CAD', 'AUD'], required: true },
            { name: 'Rate Effective Date', type: 'date', required: true },
            { name: 'Rate Expiration Date', type: 'date', required: false },
            { name: 'Minimum Run Length', type: 'number', unit: 'days', required: false },
            { name: 'Maximum Run Length', type: 'number', unit: 'days', required: false },
            { 
              name: 'Flat Rate Type', 
              type: 'select', 
              options: ['Per Ad', 'Per Word', 'Per Day', 'Per Publication'], 
              required: true 
            }
          ]
        },
        {
          category: 'Discounting & Overrides',
          fields: [
            { name: 'Bundle Eligible', type: 'checkbox', required: false },
            { name: 'Multi-Publication Discount Allowed', type: 'checkbox', required: false },
            { name: 'Promo Code Support', type: 'checkbox', required: false },
            { name: 'Account-Level Override Allowed', type: 'checkbox', required: false },
            { name: 'Package Association', type: 'select', options: [], required: false }
          ]
        },
        {
          category: 'Add-ons / Enhancements Configuration',
          fields: [
            { name: 'Enhancements Allowed', type: 'checkbox', required: false },
            { name: 'Included Add-ons', type: 'multiselect', options: [], required: false },
            { 
              name: 'Add-on Selection Mode', 
              type: 'select', 
              options: ['Manual', 'Auto-Bundled'], 
              required: false 
            }
          ]
        },
        {
          category: 'Internal/Admin Fields',
          fields: [
            { name: 'Notes', type: 'textarea', required: false },
            { name: 'Created By', type: 'text', required: false, readOnly: true },
            { name: 'Created Date', type: 'date', required: false, readOnly: true },
            { name: 'Last Modified By', type: 'text', required: false, readOnly: true },
            { name: 'Last Modified Date', type: 'date', required: false, readOnly: true },
            { name: 'Active', type: 'checkbox', required: true }
          ]
        }
      ]
    }
    // Add other rate card types here
  };

  const rateCardType = rateCardTypes[typeId];

  if (!rateCardType) {
    return <div>Rate card type not found</div>;
  }

  const handleSave = () => {
    // TODO: Implement save functionality
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  return (
    <div className="rate-card-type-page">
      <div className="page-header">
        <BackButton to="/rate-cards/types" text="Back to Rate Card Types" />
        <h1>
          <span className="type-icon">{rateCardType.icon}</span>
          {rateCardType.name}
        </h1>
        <p className="type-description">{rateCardType.description}</p>
      </div>

      <div className="rate-card-type-content">
        {editing ? (
          <div className="edit-form">
            {rateCardType.fields.map((category, index) => (
              <div key={index} className="form-category">
                <h3>{category.category}</h3>
                {category.fields.map((field, fieldIndex) => (
                  <div key={fieldIndex} className="form-group">
                    <label>
                      {field.name}
                      {field.required && <span className="required">*</span>}
                    </label>
                    <div className="input-group">
                      {field.type === 'currency' && <span className="currency">$</span>}
                      {field.type === 'select' ? (
                        <select disabled={field.readOnly}>
                          {field.options.map((option, i) => (
                            <option key={i} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : field.type === 'checkbox' ? (
                        <input type="checkbox" disabled={field.readOnly} />
                      ) : field.type === 'textarea' ? (
                        <textarea disabled={field.readOnly} />
                      ) : (
                        <input
                          type={field.type === 'date' ? 'date' : 'text'}
                          disabled={field.readOnly}
                        />
                      )}
                      {field.unit && <span className="unit">{field.unit}</span>}
                    </div>
                  </div>
                ))}
              </div>
            ))}
            <div className="form-actions">
              <button className="save-button" onClick={handleSave}>Save</button>
              <button className="cancel-button" onClick={handleCancel}>Cancel</button>
            </div>
          </div>
        ) : (
          <div className="view-mode">
            {rateCardType.fields.map((category, index) => (
              <div key={index} className="category-section">
                <h3>{category.category}</h3>
                <div className="fields-grid">
                  {category.fields.map((field, fieldIndex) => (
                    <div key={fieldIndex} className="field-item">
                      <span className="field-name">{field.name}</span>
                      <span className="field-value">-</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="view-actions">
              <button className="edit-button" onClick={() => setEditing(true)}>
                Edit Fields
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateCardTypePage; 