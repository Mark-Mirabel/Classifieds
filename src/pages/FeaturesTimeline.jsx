import React from 'react';
import './FeaturesTimeline.css';

const FeaturesTimeline = () => {
  const features = [
    {
      date: '2024-03-15',
      title: 'Enhanced Category Management',
      description: 'Added drag-and-drop functionality for reordering categories and improved category editing interface.',
      status: 'Released'
    },
    {
      date: '2024-03-10',
      title: 'Advanced Search Filters',
      description: 'Implemented new search filters for better ad discovery and improved search performance.',
      status: 'Released'
    },
    {
      date: '2024-03-05',
      title: 'Mobile Responsive Design',
      description: 'Completely redesigned the mobile interface for better user experience on all devices.',
      status: 'Released'
    },
    {
      date: '2024-03-01',
      title: 'User Guide Integration',
      description: 'Added comprehensive user guide with detailed documentation for all features.',
      status: 'Released'
    },
    {
      date: '2024-02-25',
      title: 'Real-time Notifications',
      description: 'Implemented push notifications for new messages, ad responses, and system updates.',
      status: 'Released'
    }
  ];

  return (
    <div className="features-timeline">
      <h1>New Features & Updates</h1>
      <div className="timeline">
        {features.map((feature, index) => (
          <div key={index} className="timeline-item">
            <div className="timeline-date">
              {new Date(feature.date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </div>
            <div className="timeline-content">
              <h3>{feature.title}</h3>
              <p>{feature.description}</p>
              <span className={`status-badge ${feature.status.toLowerCase()}`}>
                {feature.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturesTimeline; 