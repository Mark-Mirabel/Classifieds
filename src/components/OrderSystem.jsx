import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import './OrderSystem.css';

const OrderSystem = () => {
  const navigate = useNavigate();
  const { orderSystem, updateOrderSystem } = useApp();
  const [showSettings, setShowSettings] = useState(false);

  const handleSave = (updatedSettings) => {
    updateOrderSystem(updatedSettings);
    setShowSettings(false);
  };

  return (
    <div className="order-system-container">
      <div className="order-system-header">
        <h1>Order System</h1>
        <button 
          className="settings-button"
          onClick={() => setShowSettings(true)}
        >
          Configure Settings
        </button>
      </div>

      <div className="order-system-content">
        <div className="system-status">
          <h2>System Status</h2>
          <div className="status-indicator">
            <span className={`status-dot ${orderSystem.isActive ? 'active' : 'inactive'}`}></span>
            <span className="status-text">
              {orderSystem.isActive ? 'System is Active' : 'System is Inactive'}
            </span>
          </div>
        </div>

        <div className="system-features">
          <h2>Enabled Features</h2>
          <div className="features-grid">
            {orderSystem.features?.map((feature, index) => (
              <div key={index} className="feature-card">
                <h3>{feature.name}</h3>
                <p>{feature.description}</p>
                <span className={`feature-status ${feature.enabled ? 'enabled' : 'disabled'}`}>
                  {feature.enabled ? 'Enabled' : 'Disabled'}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="system-settings">
          <h2>Current Settings</h2>
          <div className="settings-list">
            {Object.entries(orderSystem.settings || {}).map(([key, value]) => (
              <div key={key} className="setting-item">
                <span className="setting-label">{key}:</span>
                <span className="setting-value">{value.toString()}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {showSettings && (
        <div className="settings-modal">
          <div className="settings-content">
            <h2>Configure Order System</h2>
            <form onSubmit={(e) => {
              e.preventDefault();
              const formData = new FormData(e.target);
              const settings = Object.fromEntries(formData.entries());
              handleSave(settings);
            }}>
              <div className="form-group">
                <label htmlFor="isActive">System Status</label>
                <select name="isActive" defaultValue={orderSystem.isActive}>
                  <option value="true">Active</option>
                  <option value="false">Inactive</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="autoApprove">Auto-approve Orders</label>
                <select name="autoApprove" defaultValue={orderSystem.settings?.autoApprove}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="notifyAdmin">Notify Admin on New Orders</label>
                <select name="notifyAdmin" defaultValue={orderSystem.settings?.notifyAdmin}>
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="cancel-button"
                  onClick={() => setShowSettings(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="save-button">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSystem; 