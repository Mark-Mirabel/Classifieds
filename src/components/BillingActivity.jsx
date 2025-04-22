import React from 'react';
import './BillingActivity.css';

const BillingActivity = () => {
  // Mock data - replace with actual data from your backend
  const topAdvertisers = [
    { name: 'Acme Corp', spend: 12500 },
    { name: 'Tech Solutions', spend: 9800 },
    { name: 'Global Industries', spend: 7500 },
    { name: 'Innovate Co', spend: 6200 },
    { name: 'Future Systems', spend: 5100 }
  ];

  const billingTypes = [
    { type: 'Recurring', value: 65 },
    { type: 'One-Time', value: 35 }
  ];

  const upcomingRenewals = [
    { name: 'Acme Corp', date: '2024-03-15', amount: 1200 },
    { name: 'Tech Solutions', date: '2024-03-18', amount: 850 },
    { name: 'Global Industries', date: '2024-03-20', amount: 950 }
  ];

  const agingReport = [
    { period: 'Current', amount: 25000 },
    { period: '1-30 days', amount: 8500 },
    { period: '31-60 days', amount: 3200 },
    { period: '61-90 days', amount: 1500 },
    { period: '>90 days', amount: 800 }
  ];

  const paymentMethods = [
    { method: 'Credit Card', percentage: 45 },
    { method: 'ACH', percentage: 30 },
    { method: 'Wire Transfer', percentage: 15 },
    { method: 'Check', percentage: 10 }
  ];

  return (
    <div className="billing-activity">
      <h2>Customer Billing Activity</h2>
      
      <div className="charts-grid">
        {/* Top Advertisers by Spend */}
        <div className="chart-card">
          <h3>👥 Top Advertisers by Spend</h3>
          <div className="advertisers-list">
            {topAdvertisers.map((advertiser, index) => (
              <div key={index} className="advertiser-item">
                <span className="advertiser-name">{advertiser.name}</span>
                <span className="advertiser-spend">
                  ${advertiser.spend.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Recurring vs One-Time Billing */}
        <div className="chart-card">
          <h3>🔄 Recurring vs. One-Time Billing</h3>
          <div className="billing-types">
            {billingTypes.map((type, index) => (
              <div key={index} className="billing-type">
                <div className="type-label">
                  <span className="type-name">{type.type}</span>
                  <span className="type-percentage">{type.value}%</span>
                </div>
                <div className="type-bar">
                  <div 
                    className="type-bar-fill"
                    style={{ width: `${type.value}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Renewals */}
        <div className="chart-card">
          <h3>🔔 Upcoming Renewals & Expirations</h3>
          <div className="renewals-list">
            {upcomingRenewals.map((renewal, index) => (
              <div key={index} className="renewal-item">
                <div className="renewal-info">
                  <span className="renewal-name">{renewal.name}</span>
                  <span className="renewal-date">
                    {new Date(renewal.date).toLocaleDateString()}
                  </span>
                </div>
                <span className="renewal-amount">
                  ${renewal.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Aging Report */}
        <div className="chart-card">
          <h3>⏳ Late Payments / Aging Report</h3>
          <div className="aging-report">
            {agingReport.map((item, index) => (
              <div key={index} className="aging-item">
                <span className="aging-period">{item.period}</span>
                <span className="aging-amount">
                  ${item.amount.toLocaleString()}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="chart-card">
          <h3>💳 Payment Methods</h3>
          <div className="payment-methods">
            {paymentMethods.map((method, index) => (
              <div key={index} className="payment-method">
                <div className="method-label">
                  <span className="method-name">{method.method}</span>
                  <span className="method-percentage">{method.percentage}%</span>
                </div>
                <div className="method-bar">
                  <div 
                    className="method-bar-fill"
                    style={{ width: `${method.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BillingActivity; 