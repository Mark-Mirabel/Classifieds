import React, { useState, useEffect } from 'react';
import './RevenueBreakdown.css';

const RevenueBreakdown = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [selectedProduct, setSelectedProduct] = useState('all');
  const [selectedAddon, setSelectedAddon] = useState('all');
  const [selectedGeography, setSelectedGeography] = useState('all');
  const [revenueData, setRevenueData] = useState({
    byProduct: [],
    byAddon: [],
    byGeography: [],
    byTime: []
  });

  // Mock data for demonstration
  useEffect(() => {
    // Simulate API call
    const mockData = {
      byProduct: [
        { name: 'Base Ads', value: 45000 },
        { name: 'Add-ons', value: 25000 },
        { name: 'Packages', value: 35000 },
        { name: 'Print', value: 20000 },
        { name: 'Digital', value: 30000 }
      ],
      byAddon: [
        { name: 'Visual Enhancements', value: 12000 },
        { name: 'Premium Placement', value: 8000 },
        { name: 'Social Media', value: 5000 }
      ],
      byGeography: [
        { name: 'New York', value: 30000 },
        { name: 'Los Angeles', value: 25000 },
        { name: 'Chicago', value: 20000 },
        { name: 'Houston', value: 15000 }
      ],
      byTime: [
        { date: '2024-01', value: 40000 },
        { date: '2024-02', value: 45000 },
        { date: '2024-03', value: 50000 }
      ]
    };
    setRevenueData(mockData);
  }, []);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  return (
    <div className="revenue-breakdown">
      <div className="breakdown-header">
        <h2>Revenue Breakdown</h2>
        <div className="filters">
          <select 
            value={timeRange} 
            onChange={(e) => setTimeRange(e.target.value)}
            className="filter-select"
          >
            <option value="day">Daily</option>
            <option value="week">Weekly</option>
            <option value="month">Monthly</option>
            <option value="year">Yearly</option>
          </select>
        </div>
      </div>

      <div className="breakdown-grid">
        {/* By Product Type */}
        <div className="breakdown-card">
          <div className="card-header">
            <h3>By Product Type</h3>
            <select 
              value={selectedProduct} 
              onChange={(e) => setSelectedProduct(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Products</option>
              {revenueData.byProduct.map(product => (
                <option key={product.name} value={product.name}>
                  {product.name}
                </option>
              ))}
            </select>
          </div>
          <div className="chart-container">
            {revenueData.byProduct.map(product => (
              <div key={product.name} className="chart-bar">
                <div className="bar-label">{product.name}</div>
                <div className="bar-value">{formatCurrency(product.value)}</div>
                <div 
                  className="bar-fill" 
                  style={{ width: `${(product.value / 50000) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* By Add-on Category */}
        <div className="breakdown-card">
          <div className="card-header">
            <h3>By Add-on Category</h3>
            <select 
              value={selectedAddon} 
              onChange={(e) => setSelectedAddon(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Add-ons</option>
              {revenueData.byAddon.map(addon => (
                <option key={addon.name} value={addon.name}>
                  {addon.name}
                </option>
              ))}
            </select>
          </div>
          <div className="chart-container">
            {revenueData.byAddon.map(addon => (
              <div key={addon.name} className="chart-bar">
                <div className="bar-label">{addon.name}</div>
                <div className="bar-value">{formatCurrency(addon.value)}</div>
                <div 
                  className="bar-fill" 
                  style={{ width: `${(addon.value / 15000) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* By Geography */}
        <div className="breakdown-card">
          <div className="card-header">
            <h3>By Geography</h3>
            <select 
              value={selectedGeography} 
              onChange={(e) => setSelectedGeography(e.target.value)}
              className="filter-select"
            >
              <option value="all">All Locations</option>
              {revenueData.byGeography.map(geo => (
                <option key={geo.name} value={geo.name}>
                  {geo.name}
                </option>
              ))}
            </select>
          </div>
          <div className="chart-container">
            {revenueData.byGeography.map(geo => (
              <div key={geo.name} className="chart-bar">
                <div className="bar-label">{geo.name}</div>
                <div className="bar-value">{formatCurrency(geo.value)}</div>
                <div 
                  className="bar-fill" 
                  style={{ width: `${(geo.value / 35000) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Time Series Chart */}
        <div className="breakdown-card time-series">
          <div className="card-header">
            <h3>Revenue Over Time</h3>
          </div>
          <div className="chart-container">
            {revenueData.byTime.map(time => (
              <div key={time.date} className="chart-bar">
                <div className="bar-label">{time.date}</div>
                <div className="bar-value">{formatCurrency(time.value)}</div>
                <div 
                  className="bar-fill" 
                  style={{ width: `${(time.value / 50000) * 100}%` }}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RevenueBreakdown; 