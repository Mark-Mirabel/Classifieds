import React, { useState } from 'react';
import './HelpSection.css';

const HelpSection = () => {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const faqs = [
    {
      question: 'How do I create a new plan?',
      answer: 'To create a new plan, navigate to the Plans page and click on the "Create New Plan" button. Fill in the required details and click Save.'
    },
    {
      question: 'How do I manage rate cards?',
      answer: 'Rate cards can be managed from the Rate Cards page. You can create, edit, and delete rate cards as needed.'
    },
    {
      question: 'How do I set up discounts?',
      answer: 'Discounts can be configured in the Discounts section. You can create various types of discounts including percentage-based and fixed amount discounts.'
    }
  ];

  const guides = [
    {
      title: 'Getting Started',
      content: 'This guide will help you get started with the platform. Learn the basics of plan management and configuration.'
    },
    {
      title: 'Advanced Features',
      content: 'Learn about advanced features like custom rate cards, bulk operations, and analytics.'
    },
    {
      title: 'API Integration',
      content: 'Learn how to integrate the platform with your existing systems using our API.'
    }
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredGuides = guides.filter(guide =>
    guide.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    guide.content.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="help-section">
      <div className="help-header">
        <h1>Help Center</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search help articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="search-input"
          />
        </div>
      </div>

      <div className="help-tabs">
        <button
          className={`tab-button ${activeTab === 'faq' ? 'active' : ''}`}
          onClick={() => setActiveTab('faq')}
        >
          FAQ
        </button>
        <button
          className={`tab-button ${activeTab === 'guides' ? 'active' : ''}`}
          onClick={() => setActiveTab('guides')}
        >
          Guides
        </button>
        <button
          className={`tab-button ${activeTab === 'contact' ? 'active' : ''}`}
          onClick={() => setActiveTab('contact')}
        >
          Contact Support
        </button>
      </div>

      <div className="help-content">
        {activeTab === 'faq' && (
          <div className="faq-section">
            {filteredFaqs.map((faq, index) => (
              <div key={index} className="faq-item">
                <h3>{faq.question}</h3>
                <p>{faq.answer}</p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'guides' && (
          <div className="guides-section">
            {filteredGuides.map((guide, index) => (
              <div key={index} className="guide-item">
                <h3>{guide.title}</h3>
                <p>{guide.content}</p>
                <button className="read-more-button">Read More</button>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'contact' && (
          <div className="contact-section">
            <h2>Contact Support</h2>
            <p>Need additional help? Our support team is here to assist you.</p>
            <div className="contact-methods">
              <div className="contact-method">
                <h3>Email Support</h3>
                <p>support@example.com</p>
              </div>
              <div className="contact-method">
                <h3>Phone Support</h3>
                <p>+1 (555) 123-4567</p>
              </div>
              <div className="contact-method">
                <h3>Live Chat</h3>
                <p>Available Monday-Friday, 9am-5pm EST</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HelpSection; 