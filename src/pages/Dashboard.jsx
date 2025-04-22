import React, { useState, useEffect } from 'react';
import RevenueBreakdown from '../components/RevenueBreakdown';
import BillingActivity from '../components/BillingActivity';
import PredictiveInsights from '../components/PredictiveInsights';
import './Dashboard.css';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState('month');
  const [metrics, setMetrics] = useState({
    totalRevenue: 0,
    revenueGrowth: 0,
    invoices: { issued: 0, collected: 0 },
    outstandingAR: 0,
    arpa: 0,
    topPerformers: [],
    refunds: 0
  });

  // Mock API call
  useEffect(() => {
    // Simulate API call
    const mockData = {
      totalRevenue: 150000,
      revenueGrowth: 0.15,
      invoices: { issued: 45, collected: 40 },
      outstandingAR: 25000,
      arpa: 3500,
      topPerformers: [
        { name: 'Premium Package', value: 45000 },
        { name: 'Digital Add-on', value: 30000 }
      ],
      refunds: 5000
    };
    setMetrics(mockData);
  }, [timeRange]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatPercentage = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(value);
  };

  return (
    <div className="dashboard-container">
      <div className="dashboard">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <div className="time-range-selector">
            <button 
              className={`time-button ${timeRange === 'month' ? 'active' : ''}`}
              onClick={() => setTimeRange('month')}
            >
              MTD
            </button>
            <button 
              className={`time-button ${timeRange === 'quarter' ? 'active' : ''}`}
              onClick={() => setTimeRange('quarter')}
            >
              QTD
            </button>
            <button 
              className={`time-button ${timeRange === 'year' ? 'active' : ''}`}
              onClick={() => setTimeRange('year')}
            >
              YTD
            </button>
          </div>
        </div>

        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">💰</div>
            <div className="metric-title">Total Revenue</div>
            <div className="metric-value">{formatCurrency(metrics.totalRevenue)}</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">📈</div>
            <div className="metric-title">Revenue Growth</div>
            <div className="metric-value">{formatPercentage(metrics.revenueGrowth)}</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">📄</div>
            <div className="metric-title">Invoices</div>
            <div className="metric-value">
              {metrics.invoices.collected}/{metrics.invoices.issued}
            </div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">💳</div>
            <div className="metric-title">Outstanding AR</div>
            <div className="metric-value">{formatCurrency(metrics.outstandingAR)}</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">👥</div>
            <div className="metric-title">ARPA</div>
            <div className="metric-value">{formatCurrency(metrics.arpa)}</div>
          </div>

          <div className="metric-card">
            <div className="metric-icon">🔄</div>
            <div className="metric-title">Refunds</div>
            <div className="metric-value">{formatCurrency(metrics.refunds)}</div>
          </div>
        </div>

        <RevenueBreakdown />
        <BillingActivity />
        <PredictiveInsights />
      </div>
    </div>
  );
};

export default Dashboard; 