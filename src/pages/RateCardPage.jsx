import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import PricingEngine from '../services/PricingEngine';
import './RateCardPage.css';

const RateCardPage = () => {
  const { category } = useParams();
  const navigate = useNavigate();
  const { addToCart: addToCartContext } = useCart();
  const [rateCard, setRateCard] = useState(null);
  const [addOns, setAddOns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDuration, setSelectedDuration] = useState(null);
  const [selectedAddOns, setSelectedAddOns] = useState([]);
  const [estimatedPrice, setEstimatedPrice] = useState(null);

  useEffect(() => {
    // Mock data for rate cards
    const mockRateCards = {
      'all': {
        name: 'All Categories',
        description: 'Standard pricing for all categories',
        pricingTiers: [
          { duration: 7, price: 25.00, savings: 0 },
          { duration: 14, price: 45.00, savings: 10 },
          { duration: 30, price: 75.00, savings: 25 }
        ],
        availableDiscounts: [
          {
            name: 'Multi-Publication Discount',
            description: 'Save when advertising in multiple publications',
            type: 'percentage',
            value: 15,
            conditions: ['Must advertise in 2 or more publications', 'Valid for 30-day listings']
          },
          {
            name: 'VIP Client Discount',
            description: 'Special pricing for VIP clients',
            type: 'percentage',
            value: 20,
            conditions: ['Must be a registered VIP client', 'Valid for all listing durations']
          }
        ]
      },
      'real-estate': {
        name: 'Real Estate',
        description: 'Specialized pricing for real estate listings',
        pricingTiers: [
          { duration: 7, price: 35.00, savings: 0 },
          { duration: 14, price: 65.00, savings: 15 },
          { duration: 30, price: 120.00, savings: 30 }
        ],
        availableDiscounts: [
          {
            name: 'Agent Discount',
            description: 'Special pricing for real estate agents',
            type: 'percentage',
            value: 25,
            conditions: ['Must be a registered real estate agent', 'Valid for all listing durations']
          }
        ]
      },
      'automotive': {
        name: 'Automotive',
        description: 'Pricing for vehicle listings',
        pricingTiers: [
          { duration: 7, price: 30.00, savings: 0 },
          { duration: 14, price: 55.00, savings: 10 },
          { duration: 30, price: 90.00, savings: 20 }
        ],
        availableDiscounts: [
          {
            name: 'Dealer Discount',
            description: 'Special pricing for registered dealers',
            type: 'percentage',
            value: 20,
            conditions: ['Must be a registered dealer', 'Valid for all listing durations']
          }
        ]
      },
      'jobs': {
        name: 'Jobs',
        description: 'Pricing for job postings',
        pricingTiers: [
          { duration: 7, price: 40.00, savings: 0 },
          { duration: 14, price: 70.00, savings: 15 },
          { duration: 30, price: 120.00, savings: 25 }
        ],
        availableDiscounts: [
          {
            name: 'Recruiter Package',
            description: 'Special pricing for recruiters',
            type: 'percentage',
            value: 30,
            conditions: ['Must be a registered recruiter', 'Minimum 5 postings']
          }
        ]
      }
    };

    // Enhanced mock data for add-ons
    const mockAddOns = [
      {
        id: 1,
        name: 'Featured Listing',
        description: 'Make your listing stand out with featured placement',
        price: 15.00,
        category: 'all'
      },
      {
        id: 2,
        name: 'Photo Gallery',
        description: 'Add up to 10 photos to your listing',
        price: 10.00,
        category: 'all'
      },
      {
        id: 3,
        name: 'Social Media Promotion',
        description: 'Share your listing on social media platforms',
        price: 20.00,
        category: 'all'
      },
      {
        id: 4,
        name: 'Virtual Tour',
        description: 'Add a 360° virtual tour to your listing',
        price: 25.00,
        category: 'real-estate'
      },
      {
        id: 5,
        name: 'Vehicle History Report',
        description: 'Include a detailed vehicle history report',
        price: 15.00,
        category: 'automotive'
      },
      {
        id: 6,
        name: 'Job Application Tracking',
        description: 'Track and manage job applications',
        price: 30.00,
        category: 'jobs'
      }
    ];

    try {
      // Simulate API delay
      setTimeout(() => {
        const selectedRateCard = mockRateCards[category] || mockRateCards['all'];
        setRateCard(selectedRateCard);
        // Filter add-ons based on category
        const filteredAddOns = mockAddOns.filter(
          addOn => addOn.category === category || addOn.category === 'all'
        );
        setAddOns(filteredAddOns);
        setLoading(false);
      }, 500);
    } catch (err) {
      setError('Failed to load rate card data');
      setLoading(false);
    }
  }, [category]);

  const handleDurationSelect = (duration) => {
    setSelectedDuration(duration);
    calculateEstimatedPrice(duration, selectedAddOns);
  };

  const handleAddOnToggle = (addOn) => {
    const newSelectedAddOns = selectedAddOns.includes(addOn.id)
      ? selectedAddOns.filter(id => id !== addOn.id)
      : [...selectedAddOns, addOn.id];
    
    setSelectedAddOns(newSelectedAddOns);
    if (selectedDuration) {
      calculateEstimatedPrice(selectedDuration, newSelectedAddOns);
    }
  };

  const calculateEstimatedPrice = (duration, addOnIds) => {
    if (!rateCard || !duration) return;

    const basePrice = rateCard.pricingTiers.find(tier => tier.duration === duration)?.price || 0;
    const addOnsTotal = addOnIds.reduce((total, addOnId) => {
      const addOn = addOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0);

    setEstimatedPrice(basePrice + addOnsTotal);
  };

  const handleAddToCart = () => {
    if (!selectedDuration) {
      alert('Please select a duration first');
      return;
    }

    const cartItem = {
      id: Date.now(), // Unique ID for the cart item
      category,
      duration: selectedDuration,
      addOns: selectedAddOns.map(id => addOns.find(a => a.id === id)),
      basePrice: rateCard.pricingTiers.find(tier => tier.duration === selectedDuration)?.price || 0,
      timestamp: new Date().toISOString()
    };

    addToCartContext(cartItem);
    navigate('/cart');
  };

  const handleBack = () => {
    navigate(-1); // Go back to previous page
  };

  if (loading) {
    return <div className="rate-card-loading">Loading rate card information...</div>;
  }

  if (error) {
    return <div className="rate-card-error">{error}</div>;
  }

  if (!rateCard) {
    return <div className="rate-card-not-found">Rate card not found</div>;
  }

  return (
    <div className="rate-card-page">
      <div className="rate-card-header">
        <button className="back-button" onClick={handleBack}>
          ← Back
        </button>
        <h1>{rateCard.name} Rate Card</h1>
        <p className="rate-card-description">{rateCard.description}</p>
      </div>

      <div className="rate-card-content">
        <div className="base-pricing-section">
          <h2>Base Pricing</h2>
          <div className="pricing-table">
            <table>
              <thead>
                <tr>
                  <th>Duration</th>
                  <th>Price</th>
                  <th>Savings</th>
                  <th>Select</th>
                </tr>
              </thead>
              <tbody>
                {rateCard.pricingTiers.map((tier, index) => (
                  <tr 
                    key={index}
                    className={selectedDuration === tier.duration ? 'selected' : ''}
                    onClick={() => handleDurationSelect(tier.duration)}
                  >
                    <td>{tier.duration} days</td>
                    <td>${tier.price.toFixed(2)}</td>
                    <td>{tier.savings > 0 ? `Save ${tier.savings}%` : '-'}</td>
                    <td>
                      <input
                        type="radio"
                        name="duration"
                        checked={selectedDuration === tier.duration}
                        onChange={() => handleDurationSelect(tier.duration)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="add-ons-section">
          <h2>Available Add-Ons</h2>
          <div className="add-ons-grid">
            {addOns.map((addOn) => (
              <div 
                key={addOn.id} 
                className={`add-on-card ${selectedAddOns.includes(addOn.id) ? 'selected' : ''}`}
                onClick={() => handleAddOnToggle(addOn)}
              >
                <h3>{addOn.name}</h3>
                <p>{addOn.description}</p>
                <div className="add-on-price">
                  ${addOn.price.toFixed(2)}
                </div>
                <div className="add-on-selector">
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addOn.id)}
                    onChange={() => handleAddOnToggle(addOn)}
                  />
                  <span>Select</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="discounts-section">
          <h2>Available Discounts</h2>
          <div className="discounts-list">
            {rateCard.availableDiscounts.map((discount, index) => (
              <div key={index} className="discount-card">
                <h3>{discount.name}</h3>
                <p>{discount.description}</p>
                <div className="discount-value">
                  {discount.type === 'percentage' 
                    ? `${discount.value}% off`
                    : `$${discount.value} off`}
                </div>
                {discount.conditions && (
                  <div className="discount-conditions">
                    <p>Conditions:</p>
                    <ul>
                      {discount.conditions.map((condition, i) => (
                        <li key={i}>{condition}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {estimatedPrice && (
          <div className="price-summary">
            <h3>Estimated Total</h3>
            <div className="estimated-price">
              ${estimatedPrice.toFixed(2)}
            </div>
            <button 
              className="add-to-cart-button"
              onClick={handleAddToCart}
            >
              Add to Cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RateCardPage; 