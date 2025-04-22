import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, AreaChart, Area, PieChart, Pie, Cell, Legend
} from 'recharts';
import './PredictiveInsights.css';

const PredictiveInsights = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('30');

  // Mock data - replace with actual data from your backend
  const revenueProjections = [
    { period: '30 days', value: 125000 },
    { period: '60 days', value: 245000 },
    { period: '90 days', value: 385000 }
  ];

  const churnRisks = [
    { name: 'Tech Solutions', risk: 'High', value: 85, lastPayment: '2024-02-15', amount: 2500 },
    { name: 'Global Industries', risk: 'Medium', value: 60, lastPayment: '2024-02-20', amount: 1800 },
    { name: 'Innovate Co', risk: 'High', value: 75, lastPayment: '2024-02-25', amount: 3200 }
  ];

  const failedPayments = [
    { name: 'Acme Corp', attempts: 3, amount: 1200, lastAttempt: '2024-03-01' },
    { name: 'Future Systems', attempts: 2, amount: 850, lastAttempt: '2024-03-02' }
  ];

  const decliningSpend = [
    { name: 'Tech Solutions', current: 9800, previous: 12500, change: -21.6 },
    { name: 'Global Industries', current: 7500, previous: 9500, change: -21.1 },
    { name: 'Innovate Co', current: 6200, previous: 7800, change: -20.5 }
  ];

  const unpaidAds = [
    { name: 'Acme Corp', adTitle: 'Premium Listing - Downtown', amount: 1200, daysOverdue: 15 },
    { name: 'Tech Solutions', adTitle: 'Featured Business Profile', amount: 850, daysOverdue: 8 }
  ];

  const paymentMethods = [
    { name: 'Credit Card', value: 45 },
    { name: 'ACH', value: 30 },
    { name: 'Wire Transfer', value: 15 },
    { name: 'Check', value: 10 }
  ];

  const COLORS = ['#4a90e2', '#50c878', '#ffa500', '#ff6b6b'];

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
    }).format(value / 100);
  };

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="custom-tooltip">
          <p className="tooltip-label">{label}</p>
          <p className="tooltip-value">{formatCurrency(payload[0].value)}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="predictive-insights">
      <h2>Predictive Insights & Alerts</h2>
      
      <div className="insights-grid">
        {/* Projected Revenue */}
        <div className="insight-card">
          <h3>🔮 Projected Revenue</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueProjections}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="period" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip content={<CustomTooltip />} />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#4a90e2"
                  fill="#4a90e2"
                  fillOpacity={0.3}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Churn Risk Prediction */}
        <div className="insight-card">
          <h3>🧠 Churn Risk Prediction</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={churnRisks}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => `${value}%`} />
                <Tooltip />
                <Bar dataKey="value" fill="#4a90e2">
                  {churnRisks.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.risk === 'High' ? '#ff6b6b' : entry.risk === 'Medium' ? '#ffa500' : '#50c878'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Failed Payment Alerts */}
        <div className="insight-card">
          <h3>🚨 Failed Payment Alerts</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={failedPayments}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="attempts" fill="#ff6b6b" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Declining Spend */}
        <div className="insight-card">
          <h3>📉 Clients With Declining Spend</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={decliningSpend}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip />
                <Line type="monotone" dataKey="current" stroke="#ff6b6b" />
                <Line type="monotone" dataKey="previous" stroke="#4a90e2" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Payment Methods */}
        <div className="insight-card">
          <h3>💳 Payment Methods</h3>
          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={paymentMethods}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {paymentMethods.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictiveInsights; 