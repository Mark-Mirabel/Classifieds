import React, { useState, useEffect } from 'react';
import BundleService from '../services/BundleService';
import './BundleAnalytics.css';

const BundleAnalytics = ({ bundleService }) => {
  const [timeRange, setTimeRange] = useState('30d');
  const [analytics, setAnalytics] = useState({
    totalBundles: 0,
    activeBundles: 0,
    totalRevenue: 0,
    mostPopularBundles: [],
    categoryDistribution: {},
    clientTierDistribution: {},
    conversionRates: {},
    revenueTrend: [],
    bundlePerformance: []
  });

  useEffect(() => {
    calculateAnalytics();
  }, [timeRange]);

  const calculateAnalytics = () => {
    const bundles = bundleService.getAllBundles();
    const now = new Date();
    const startDate = new Date(now);
    
    switch (timeRange) {
      case '7d':
        startDate.setDate(now.getDate() - 7);
        break;
      case '30d':
        startDate.setDate(now.getDate() - 30);
        break;
      case '90d':
        startDate.setDate(now.getDate() - 90);
        break;
      default:
        startDate.setDate(now.getDate() - 30);
    }

    // Calculate metrics
    const activeBundles = bundles.filter(b => b.isActive());
    const categoryDistribution = {};
    const clientTierDistribution = {};
    const bundlePerformance = bundles.map(bundle => ({
      id: bundle.id,
      name: bundle.name,
      revenue: calculateBundleRevenue(bundle, startDate),
      views: calculateBundleViews(bundle, startDate),
      conversions: calculateBundleConversions(bundle, startDate)
    }));

    bundles.forEach(bundle => {
      // Category distribution
      const category = bundle.conditions.find(c => c.type === 'category')?.value || 'Uncategorized';
      categoryDistribution[category] = (categoryDistribution[category] || 0) + 1;

      // Client tier distribution
      const clientTier = bundle.conditions.find(c => c.type === 'clientTier')?.value || 'Standard';
      clientTierDistribution[clientTier] = (clientTierDistribution[clientTier] || 0) + 1;
    });

    // Sort bundles by performance
    const mostPopularBundles = [...bundlePerformance]
      .sort((a, b) => b.revenue - a.revenue)
      .slice(0, 5);

    // Calculate revenue trend
    const revenueTrend = calculateRevenueTrend(bundles, startDate);

    setAnalytics({
      totalBundles: bundles.length,
      activeBundles: activeBundles.length,
      totalRevenue: bundlePerformance.reduce((sum, b) => sum + b.revenue, 0),
      mostPopularBundles,
      categoryDistribution,
      clientTierDistribution,
      conversionRates: calculateConversionRates(bundlePerformance),
      revenueTrend,
      bundlePerformance
    });
  };

  const calculateBundleRevenue = (bundle, startDate) => {
    // This would be replaced with actual revenue data
    return Math.random() * 10000;
  };

  const calculateBundleViews = (bundle, startDate) => {
    // This would be replaced with actual view data
    return Math.floor(Math.random() * 1000);
  };

  const calculateBundleConversions = (bundle, startDate) => {
    // This would be replaced with actual conversion data
    return Math.floor(Math.random() * 100);
  };

  const calculateRevenueTrend = (bundles, startDate) => {
    const trend = [];
    const days = Math.ceil((new Date() - startDate) / (1000 * 60 * 60 * 24));
    
    for (let i = 0; i < days; i++) {
      const date = new Date(startDate);
      date.setDate(date.getDate() + i);
      trend.push({
        date,
        revenue: Math.random() * 5000
      });
    }
    
    return trend;
  };

  const calculateConversionRates = (bundlePerformance) => {
    return bundlePerformance.reduce((rates, bundle) => {
      rates[bundle.id] = bundle.views > 0 ? (bundle.conversions / bundle.views) * 100 : 0;
      return rates;
    }, {});
  };

  return (
    <div className="bundle-analytics">
      <div className="analytics-header">
        <h2>Bundle Analytics</h2>
        <select 
          value={timeRange} 
          onChange={(e) => setTimeRange(e.target.value)}
          className="time-range-select"
        >
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </select>
      </div>

      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Bundles</h3>
          <p className="metric-value">{analytics.totalBundles}</p>
        </div>
        <div className="metric-card">
          <h3>Active Bundles</h3>
          <p className="metric-value">{analytics.activeBundles}</p>
        </div>
        <div className="metric-card">
          <h3>Total Revenue</h3>
          <p className="metric-value">${analytics.totalRevenue.toLocaleString()}</p>
        </div>
        <div className="metric-card">
          <h3>Average Conversion Rate</h3>
          <p className="metric-value">
            {Object.values(analytics.conversionRates).length > 0
              ? (Object.values(analytics.conversionRates).reduce((a, b) => a + b, 0) / 
                 Object.values(analytics.conversionRates).length).toFixed(1)
              : 0}%
          </p>
        </div>
      </div>

      <div className="charts-grid">
        <div className="chart-card">
          <h3>Revenue Trend</h3>
          <div className="chart-container">
            {/* This would be replaced with an actual chart component */}
            <div className="placeholder-chart">
              {analytics.revenueTrend.map((point, i) => (
                <div 
                  key={i}
                  className="chart-bar"
                  style={{ height: `${(point.revenue / 5000) * 100}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="chart-card">
          <h3>Category Distribution</h3>
          <div className="chart-container">
            {/* This would be replaced with an actual chart component */}
            <div className="placeholder-chart pie">
              {Object.entries(analytics.categoryDistribution).map(([category, count], i) => (
                <div 
                  key={category}
                  className="chart-segment"
                  style={{
                    transform: `rotate(${i * (360 / Object.keys(analytics.categoryDistribution).length)}deg)`,
                    backgroundColor: `hsl(${i * (360 / Object.keys(analytics.categoryDistribution).length)}, 70%, 50%)`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="performance-table">
        <h3>Bundle Performance</h3>
        <table>
          <thead>
            <tr>
              <th>Bundle Name</th>
              <th>Revenue</th>
              <th>Views</th>
              <th>Conversions</th>
              <th>Conversion Rate</th>
            </tr>
          </thead>
          <tbody>
            {analytics.bundlePerformance.map(bundle => (
              <tr key={bundle.id}>
                <td>{bundle.name}</td>
                <td>${bundle.revenue.toLocaleString()}</td>
                <td>{bundle.views.toLocaleString()}</td>
                <td>{bundle.conversions.toLocaleString()}</td>
                <td>{(bundle.views > 0 ? (bundle.conversions / bundle.views) * 100 : 0).toFixed(1)}%</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BundleAnalytics; 