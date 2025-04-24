import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RateCardSetup.css';


export const steps = [
  { title: 'Name & Description', icon: '📝' },
  { title: 'Rate Card Type', icon: '💰' },
  { title: 'Rate Details', icon: '📊' },
  { title: 'Add-Ons', icon: '🔧' },
  { title: 'Discounts', icon: '🎯' },
  { title: 'Review', icon: '✅' }
];

export const rateTypes = [
  {
    id: 'flat',
    name: 'Flat Rate',
    icon: '🧾',
    description: 'A fixed price is charged per ad, regardless of size, length, or content.',
    useCases: [
      'Online-only platforms',
      'Short-term ads',
      'Self-service publishing',
      'Garage sales',
      'Simple announcements'
    ],
    examples: [
      '$25 for 30 days',
      '$50 for premium placement',
      '$100 for featured listings'
    ],
    features: [
      'Unlimited words',
      'Up to 5 images',
      'Basic listing features',
      'Email support'
    ]
  },
  {
    id: 'word',
    name: 'Word-Based',
    icon: '📏',
    description: 'Price is determined by the number of words in the ad. A base fee is charged for a minimum word count, and additional words are billed incrementally.',
    useCases: [
      'Print classifieds',
      'Obituaries',
      'Announcements',
      'Legal notices',
      'Public notices'
    ],
    examples: [
      '$15 base rate for 25 words',
      '$0.50 per additional word',
      '$5 extra for headline'
    ],
    features: [
      'Base rate for minimum word count',
      'Additional words charged incrementally',
      'Optional headline charge',
      'Print and digital options'
    ]
  },
  {
    id: 'line',
    name: 'Line Rate',
    icon: '🧱',
    description: 'Ads are charged by the number of lines they occupy in print. Standardized line height and multiple font size options available.',
    useCases: [
      'Print newspaper classifieds',
      'Legal notices',
      'Public announcements',
      'Community events',
      'Business listings'
    ],
    examples: [
      '$2.50 per line',
      'Minimum 3 lines',
      'Maximum 20 lines'
    ],
    features: [
      'Standardized line height',
      'Multiple font size options',
      'Border and logo add-ons',
      'Print layout optimization'
    ]
  },
  {
    id: 'modular',
    name: 'Modular',
    icon: '📐',
    description: 'Pricing based on ad size modules. Common in print publications where ads are sold by column inches or specific size units.',
    useCases: [
      'Print publications',
      'Magazine ads',
      'Display classifieds',
      'Business directory',
      'Special sections'
    ],
    examples: [
      '1/8 page: $100',
      '1/4 page: $180',
      '1/2 page: $300',
      'Full page: $500'
    ],
    features: [
      'Standard ad sizes',
      'Flexible placement options',
      'Premium placement available',
      'Color and B&W options'
    ]
  },
  {
    id: 'columnInch',
    name: 'Column Inch',
    icon: '📰',
    description: 'Pricing based on the number of column inches an ad occupies. Common in print newspaper classifieds.',
    useCases: [
      'Newspaper classifieds',
      'Real estate listings',
      'Automotive ads',
      'Employment ads',
      'Business services'
    ],
    examples: [
      '$15 per column inch',
      'Minimum 2 column inches',
      'Maximum 10 column inches'
    ],
    features: [
      'Standard column width',
      'Flexible height options',
      'Premium placement available',
      'Print and digital bundle'
    ]
  },
  {
    id: 'tiered',
    name: 'Tiered',
    icon: '📊',
    description: 'Volume-based pricing with tiered discounts. Prices decrease as the number of ads or duration increases.',
    useCases: [
      'Regular advertisers',
      'Bulk listings',
      'Long-term campaigns',
      'Business accounts',
      'Agency accounts'
    ],
    examples: [
      '1-5 ads: $25 each',
      '6-10 ads: $20 each',
      '11-20 ads: $15 each',
      '21+ ads: $10 each'
    ],
    features: [
      'Volume discounts',
      'Duration discounts',
      'Package deals',
      'Bulk pricing'
    ]
  },
  {
    id: 'performance',
    name: 'Performance',
    icon: '🎯',
    description: 'Pricing based on performance metrics like clicks, views, or conversions. Common for digital advertising.',
    useCases: [
      'Digital campaigns',
      'Job postings',
      'Real estate listings',
      'Automotive ads',
      'Service providers'
    ],
    examples: [
      '$0.50 per click',
      '$10 per 1000 views',
      '$25 per lead',
      '$100 per conversion'
    ],
    features: [
      'Pay-per-click',
      'Pay-per-view',
      'Pay-per-lead',
      'Conversion tracking'
    ]
  },
  {
    id: 'custom',
    name: 'Custom',
    icon: '⚙️',
    description: 'Fully customizable rate structure for special cases or unique business requirements.',
    useCases: [
      'Special promotions',
      'Corporate accounts',
      'Strategic partnerships',
      'Unique business needs',
      'Complex pricing models'
    ],
    examples: [
      'Custom package deals',
      'Hybrid pricing models',
      'Special arrangements',
      'Enterprise solutions'
    ],
    features: [
      'Fully customizable',
      'Flexible terms',
      'Special arrangements',
      'Enterprise support'
    ]
  }
];

export const availableDiscounts = [
  {
    id: 'bulk',
    name: 'Bulk Purchase Discount',
    icon: '📦',
    description: 'Discounts for purchasing multiple ads',
    rules: [
      '5-10 ads: 10% off',
      '11-20 ads: 15% off',
      '21+ ads: 20% off'
    ],
    conditions: [
      'Must be purchased in a single transaction',
      'Applies to same ad type only'
    ]
  },
  {
    id: 'loyalty',
    name: 'Loyalty Discount',
    icon: '👑',
    description: 'Rewards for long-term customers',
    rules: [
      '6 months: 5% off',
      '1 year: 10% off',
      '2+ years: 15% off'
    ],
    conditions: [
      'Based on account age',
      'Applies to all ad types'
    ]
  },
  {
    id: 'seasonal',
    name: 'Seasonal Promotion',
    icon: '🎄',
    description: 'Limited-time seasonal discounts',
    rules: [
      'Holiday special: 20% off',
      'Summer sale: 15% off',
      'Back to school: 10% off'
    ],
    conditions: [
      'Limited time only',
      'Specific dates apply'
    ]
  },
  {
    id: 'first-time',
    name: 'First-Time Customer Discount',
    icon: '🎁',
    description: 'Special offer for new customers',
    rules: [
      'First ad: 25% off',
      'Second ad: 15% off',
      'Third ad: 10% off'
    ],
    conditions: [
      'New customer only',
      'One-time use per customer'
    ]
  },
  {
    id: 'category',
    name: 'Category Specific Discount',
    icon: '🏷️',
    description: 'Discounts for specific categories',
    rules: [
      'Real Estate: 15% off',
      'Automotive: 10% off',
      'Jobs: 20% off'
    ],
    conditions: [
      'Category specific',
      'May combine with other discounts'
    ]
  },
  {
    id: 'recurring',
    name: 'Recurring Ad Discount',
    icon: '🔄',
    description: 'Discounts for recurring ads',
    rules: [
      'Monthly: 10% off',
      'Quarterly: 15% off',
      'Yearly: 20% off'
    ],
    conditions: [
      'Must commit to schedule',
      'Auto-renewal required'
    ]
  }
];

// Add-ons data
export const availableAddOns = [
  {
    id: 'premium-placement',
    name: 'Premium Placement',
    description: 'Place your ad in prime locations for maximum visibility',
    price: 49.99,
    category: 'Visual Add-Ons',
    icon: '⭐',
    features: ['Top of page placement', 'Featured section display', 'Highlighted border']
  },
  {
    id: 'image-gallery',
    name: 'Image Gallery',
    description: 'Add multiple images to showcase your listing',
    price: 29.99,
    category: 'Visual Add-Ons',
    icon: '🖼️',
    features: ['Up to 10 images', 'Slideshow view', 'Thumbnail navigation']
  },
  {
    id: 'video-inclusion',
    name: 'Video Inclusion',
    description: 'Embed a video in your listing',
    price: 39.99,
    category: 'Interactive Add-Ons',
    icon: '🎥',
    features: ['HD video support', 'Auto-play option', 'Custom thumbnail']
  },
  {
    id: 'social-sharing',
    name: 'Social Sharing',
    description: 'Enable social media sharing buttons',
    price: 19.99,
    category: 'Interactive Add-Ons',
    icon: '🔗',
    features: ['Multiple platform support', 'Share count tracking', 'Custom share messages']
  },
  {
    id: 'email-alerts',
    name: 'Email Alerts',
    description: 'Get notified of interested buyers',
    price: 24.99,
    category: 'Notification Add-Ons',
    icon: '📧',
    features: ['Instant notifications', 'Daily summaries', 'Custom alert settings']
  },
  {
    id: 'featured-badge',
    name: 'Featured Badge',
    description: 'Stand out with a featured badge',
    price: 34.99,
    category: 'Visual Add-Ons',
    icon: '🏆',
    features: ['Custom badge design', 'Priority in search', 'Special highlighting']
  },
  {
    id: 'virtual-tour',
    name: 'Virtual Tour',
    description: 'Add a 360° virtual tour to your listing',
    price: 49.99,
    category: 'Interactive Add-Ons',
    icon: '🔄',
    features: ['360° view support', 'Multiple hotspots', 'Custom navigation']
  },
  {
    id: 'analytics-dashboard',
    name: 'Analytics Dashboard',
    description: 'Track and analyze your listing performance',
    price: 29.99,
    category: 'Analytics Add-Ons',
    icon: '📊',
    features: ['View statistics', 'Click tracking', 'Conversion analytics']
  },
  {
    id: 'auto-renewal',
    name: 'Auto-Renewal',
    description: 'Automatically renew your listing',
    price: 9.99,
    category: 'Service Add-Ons',
    icon: '🔄',
    features: ['Automatic renewal', 'Payment reminders', 'Renewal history']
  },
  {
    id: 'priority-support',
    name: 'Priority Support',
    description: 'Get priority access to customer support',
    price: 19.99,
    category: 'Service Add-Ons',
    icon: '🎯',
    features: ['24/7 support', 'Priority response', 'Dedicated support agent']
  },
  {
    id: 'custom-domain',
    name: 'Custom Domain',
    description: 'Use your own domain for your listing',
    price: 39.99,
    category: 'Technical Add-Ons',
    icon: '🌐',
    features: ['Custom URL', 'SSL certificate', 'Domain management']
  },
  {
    id: 'advanced-search',
    name: 'Advanced Search',
    description: 'Enhanced search capabilities for your listing',
    price: 24.99,
    category: 'Technical Add-Ons',
    icon: '🔍',
    features: ['Advanced filters', 'Search analytics', 'Custom search fields']
  }
];

const RateCardSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [rateCard, setRateCard] = useState({
    name: '',
    description: '',
    isActive: true,
    type: '',
    rates: {
      base: '',
      premium: '',
      featured: '',
      spotlight: '',
      duration: '',
      maxWords: '',
      minLines: '',
      maxLines: '',
      quarter: '',
      half: '',
      full: '',
      minInches: '',
      maxInches: '',
      tier1: '',
      tier2: '',
      tier3: '',
      tier4: '',
      click: '',
      view: '',
      lead: '',
      conversion: '',
      custom: '',
      customDescription: ''
    },
    addOns: [],
    discounts: []
  });

  

  // Group add-ons by category
  const groupedAddOns = availableAddOns.reduce((acc, addOn) => {
    if (!acc[addOn.category]) {
      acc[addOn.category] = [];
    }
    acc[addOn.category].push(addOn);
    return acc;
  }, {});

  const handleStepClick = (stepIndex) => {
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex);
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleStartOver = () => {
    setRateCard({
      name: '',
      description: '',
      isActive: true,
      type: '',
      rates: {
        base: '',
        premium: '',
        featured: '',
        spotlight: '',
        duration: '',
        maxWords: '',
        minLines: '',
        maxLines: '',
        quarter: '',
        half: '',
        full: '',
        minInches: '',
        maxInches: '',
        tier1: '',
        tier2: '',
        tier3: '',
        tier4: '',
        click: '',
        view: '',
        lead: '',
        conversion: '',
        custom: '',
        customDescription: ''
      },
      addOns: [],
      discounts: []
    });
    setCurrentStep(1);
  };

  const handleSave = () => {
    // Generate a unique ID for the new rate card
    const newRateCard = {
      ...rateCard,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };

    // Get existing rate cards from localStorage
    const existingRateCards = JSON.parse(localStorage.getItem('rateCards') || '[]');
    
    // Add the new rate card
    const updatedRateCards = [...existingRateCards, newRateCard];
    
    // Save back to localStorage
    localStorage.setItem('rateCards', JSON.stringify(updatedRateCards));
    
    // Navigate to the rate cards page
    navigate('/plans');
  };

  const handleCancel = () => {
    navigate('/rate-cards/all');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRateCard(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRateTypeSelect = (type) => {
    setRateCard(prev => ({
      ...prev,
      type
    }));
  };

  const handleRateChange = (rateType, value) => {
    setRateCard(prev => ({
      ...prev,
      rates: {
        ...prev.rates,
        [rateType]: value
      }
    }));
  };

  const handleDiscountSelect = (discountId) => {
    setRateCard(prev => {
      const isSelected = prev.discounts.includes(discountId);
      const newDiscounts = isSelected
        ? prev.discounts.filter(id => id !== discountId)
        : [...prev.discounts, discountId];
      return { ...prev, discounts: newDiscounts };
    });
  };

  const handleAddOnToggle = (addOnId) => {
    setRateCard(prev => ({
      ...prev,
      addOns: prev.addOns.includes(addOnId)
        ? prev.addOns.filter(id => id !== addOnId)
        : [...prev.addOns, addOnId]
    }));
  };

  const renderRateDetails = () => {
    const selectedType = rateTypes.find(type => type.id === rateCard.type);
    if (!selectedType) return null;

    return (
      <div className="rate-details">
        <h3>Step 3: Rate Details for {selectedType.name}</h3>
        <div className="rate-fields">
          {selectedType.name === 'Flat Rate' && (
            <>
              <div className="form-group">
                <label htmlFor="baseRate">Base Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={rateCard.rates.base}
                    onChange={(e) => handleRateChange('base', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter base rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="duration">Duration (days)</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="duration"
                    value={rateCard.rates.duration}
                    onChange={(e) => handleRateChange('duration', e.target.value)}
                    min="1"
                    step="1"
                    placeholder="Enter duration in days"
                  />
                </div>
              </div>
            </>
          )}
          
          {selectedType.name === 'Word-Based' && (
            <>
              <div className="form-group">
                <label htmlFor="baseRate">Base Rate (25 words)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={rateCard.rates.base}
                    onChange={(e) => handleRateChange('base', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter base rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="premiumRate">Additional Words Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="premiumRate"
                    value={rateCard.rates.premium}
                    onChange={(e) => handleRateChange('premium', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per additional word"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="maxWords">Maximum Words</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="maxWords"
                    value={rateCard.rates.maxWords}
                    onChange={(e) => handleRateChange('maxWords', e.target.value)}
                    min="25"
                    step="1"
                    placeholder="Enter maximum word limit"
                  />
                </div>
              </div>
            </>
          )}

          {selectedType.name === 'Line Rate' && (
            <>
              <div className="form-group">
                <label htmlFor="baseRate">Rate per Line</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={rateCard.rates.base}
                    onChange={(e) => handleRateChange('base', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per line"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="minLines">Minimum Lines</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="minLines"
                    value={rateCard.rates.minLines}
                    onChange={(e) => handleRateChange('minLines', e.target.value)}
                    min="1"
                    step="1"
                    placeholder="Enter minimum lines"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="maxLines">Maximum Lines</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="maxLines"
                    value={rateCard.rates.maxLines}
                    onChange={(e) => handleRateChange('maxLines', e.target.value)}
                    min="1"
                    step="1"
                    placeholder="Enter maximum lines"
                  />
                </div>
              </div>
            </>
          )}

          {selectedType.name === 'Modular' && (
            <>
              <div className="form-group">
                <label htmlFor="baseRate">1/8 Page Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={rateCard.rates.base}
                    onChange={(e) => handleRateChange('base', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter 1/8 page rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="quarterRate">1/4 Page Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="quarterRate"
                    value={rateCard.rates.quarter}
                    onChange={(e) => handleRateChange('quarter', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter 1/4 page rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="halfRate">1/2 Page Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="halfRate"
                    value={rateCard.rates.half}
                    onChange={(e) => handleRateChange('half', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter 1/2 page rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="fullRate">Full Page Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="fullRate"
                    value={rateCard.rates.full}
                    onChange={(e) => handleRateChange('full', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter full page rate"
                  />
                </div>
              </div>
            </>
          )}

          {selectedType.name === 'Column Inch' && (
            <>
              <div className="form-group">
                <label htmlFor="baseRate">Rate per Column Inch</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={rateCard.rates.base}
                    onChange={(e) => handleRateChange('base', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per column inch"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="minInches">Minimum Column Inches</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="minInches"
                    value={rateCard.rates.minInches}
                    onChange={(e) => handleRateChange('minInches', e.target.value)}
                    min="1"
                    step="0.5"
                    placeholder="Enter minimum column inches"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="maxInches">Maximum Column Inches</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="maxInches"
                    value={rateCard.rates.maxInches}
                    onChange={(e) => handleRateChange('maxInches', e.target.value)}
                    min="1"
                    step="0.5"
                    placeholder="Enter maximum column inches"
                  />
                </div>
              </div>
            </>
          )}

          {selectedType.name === 'Tiered' && (
            <>
              <div className="form-group">
                <label htmlFor="tier1Rate">Tier 1 Rate (1-5 ads)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="tier1Rate"
                    value={rateCard.rates.tier1}
                    onChange={(e) => handleRateChange('tier1', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter tier 1 rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tier2Rate">Tier 2 Rate (6-10 ads)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="tier2Rate"
                    value={rateCard.rates.tier2}
                    onChange={(e) => handleRateChange('tier2', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter tier 2 rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tier3Rate">Tier 3 Rate (11-20 ads)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="tier3Rate"
                    value={rateCard.rates.tier3}
                    onChange={(e) => handleRateChange('tier3', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter tier 3 rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="tier4Rate">Tier 4 Rate (21+ ads)</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="tier4Rate"
                    value={rateCard.rates.tier4}
                    onChange={(e) => handleRateChange('tier4', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter tier 4 rate"
                  />
                </div>
              </div>
            </>
          )}

          {selectedType.name === 'Performance' && (
            <>
              <div className="form-group">
                <label htmlFor="clickRate">Rate per Click</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="clickRate"
                    value={rateCard.rates.click}
                    onChange={(e) => handleRateChange('click', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per click"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="viewRate">Rate per 1000 Views</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="viewRate"
                    value={rateCard.rates.view}
                    onChange={(e) => handleRateChange('view', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per 1000 views"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="leadRate">Rate per Lead</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="leadRate"
                    value={rateCard.rates.lead}
                    onChange={(e) => handleRateChange('lead', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per lead"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="conversionRate">Rate per Conversion</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="conversionRate"
                    value={rateCard.rates.conversion}
                    onChange={(e) => handleRateChange('conversion', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter rate per conversion"
                  />
                </div>
              </div>
            </>
          )}

          {selectedType.name === 'Custom' && (
            <>
              <div className="form-group">
                <label htmlFor="customRate">Custom Rate</label>
                <div className="input-group">
                  <span className="input-group-text">$</span>
                  <input
                    type="number"
                    id="customRate"
                    value={rateCard.rates.custom}
                    onChange={(e) => handleRateChange('custom', e.target.value)}
                    min="0"
                    step="0.01"
                    placeholder="Enter custom rate"
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="customDescription">Custom Rate Description</label>
                <textarea
                  id="customDescription"
                  value={rateCard.rates.customDescription}
                  onChange={(e) => handleRateChange('customDescription', e.target.value)}
                  placeholder="Describe the custom rate structure"
                  rows="3"
                />
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Name & Description</h2>
            <div className="form-group">
              <label htmlFor="name">Rate Card Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={rateCard.name}
                onChange={handleInputChange}
                placeholder="Enter rate card name"
              />
            </div>
            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={rateCard.description}
                onChange={handleInputChange}
                placeholder="Enter rate card description"
              />
            </div>
          </div>
        );
      case 2:
        return (
          <div className="step-content">
            <h2>Select Rate Card Type</h2>
            <div className="rate-types-grid">
              {rateTypes.map(type => (
                <div
                  key={type.id}
                  className={`rate-type-card ${rateCard.type === type.id ? 'selected' : ''}`}
                  onClick={() => handleRateTypeSelect(type.id)}
                >
                  <span className="type-icon">{type.icon}</span>
                  <h3>{type.name}</h3>
                  <p>{type.description}</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 3:
        return (
          <div className="step-content">
            <h2>Rate Details</h2>
            {renderRateDetails()}
          </div>
        );
      case 4:
        return (
          <div className="step-content">
            <h2>Select Add-Ons</h2>
            <div className="add-ons-container">
              {Object.entries(groupedAddOns).map(([category, addOns]) => (
                <div key={category} className="category-section">
                  <h3 className="category-header">
                    {category}
                  </h3>
                  <div className="add-ons-grid">
                    {addOns.map(addOn => (
                      <div
                        key={addOn.id}
                        className={`add-on-card ${rateCard.addOns.includes(addOn.id) ? 'selected' : ''}`}
                        onClick={() => handleAddOnToggle(addOn.id)}
                      >
                        <div className="add-on-header">
                          <span className="add-on-icon">{addOn.icon}</span>
                          <h4>{addOn.name}</h4>
                        </div>
                        <p className="add-on-description">{addOn.description}</p>
                        <div className="add-on-price">
                          ${addOn.price.toFixed(2)}
                        </div>
                        <ul className="add-on-features">
                          {addOn.features.map((feature, index) => (
                            <li key={index}>{feature}</li>
                          ))}
                        </ul>
                        <div className="add-on-selector">
                          <input
                            type="checkbox"
                            checked={rateCard.addOns.includes(addOn.id)}
                            onChange={() => handleAddOnToggle(addOn.id)}
                          />
                          <span>Select</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 5:
        return (
          <div className="step-content">
            <h2>Select Discounts</h2>
            <div className="discounts-grid">
              {availableDiscounts.map(discount => (
                <div
                  key={discount.id}
                  className={`discount-card ${rateCard.discounts.includes(discount.id) ? 'selected' : ''}`}
                  onClick={() => handleDiscountSelect(discount.id)}
                >
                  <h3>{discount.name}</h3>
                  <p>{discount.description}</p>
                  <div className="discount-features">
                    {discount.rules.map((rule, index) => (
                      <span key={index} className="feature-tag">{rule}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      case 6:
        return (
          <div className="step-content">
            <h2>Review Rate Card</h2>
            <div className="review-section">
              <h3>Basic Information</h3>
              <div className="review-item">
                <span>Name:</span>
                <span>{rateCard.name}</span>
              </div>
              <div className="review-item">
                <span>Description:</span>
                <span>{rateCard.description}</span>
              </div>
              <div className="review-item">
                <span>Type:</span>
                <span>{rateTypes.find(t => t.id === rateCard.type)?.name}</span>
              </div>
            </div>
            <div className="review-section">
              <h3>Rate Details</h3>
              {Object.entries(rateCard.rates).map(([key, value]) => (
                value && (
                  <div key={key} className="review-item">
                    <span>{key}:</span>
                    <span>{value}</span>
                  </div>
                )
              ))}
            </div>
            {rateCard.addOns.length > 0 && (
              <div className="review-section">
                <h3>Selected Add-Ons</h3>
                {rateCard.addOns.map(addOnId => {
                  const addOn = availableAddOns.find(a => a.id === addOnId);
                  return (
                    <div key={addOnId} className="review-item">
                      <span>{addOn?.icon} {addOn?.name}</span>
                      <span>${addOn?.price.toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>
            )}
            {rateCard.discounts.length > 0 && (
              <div className="review-section">
                <h3>Selected Discounts</h3>
                {rateCard.discounts.map(discountId => {
                  const discount = availableDiscounts.find(d => d.id === discountId);
                  return (
                    <div key={discountId} className="review-item">
                      <span>{discount?.name}</span>
                    </div>
                  );
                })}
              </div>
            )}
            <div className="review-actions">
              <button className="save-button" onClick={handleSave}>
                Save Plan
              </button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="rate-card-setup">
      <div className="setup-header">
        <div className="header-actions">
          <button className="back-button" onClick={handleCancel}>
            ← Back
          </button>
          <button className="start-over-button" onClick={handleStartOver}>
            Start Over
          </button>
        </div>
        <h2>Plan Builder</h2>
      </div>

      <div className="progress-bar">
        {steps.map((step, index) => (
          <div 
            key={index}
            className={`progress-step ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''} ${index + 1 <= currentStep ? 'clickable' : ''}`}
            onClick={() => handleStepClick(index + 1)}
          >
            <span className="step-icon">{step.icon}</span>
            <span className="step-title">{step.title}</span>
          </div>
        ))}
      </div>

      <div className="setup-form">
        {/* <div className="step-actions top-actions">
          {currentStep > 1 && (
            <button className="back-button" onClick={handleBack}>
              <span className="button-icon">←</span>
              Back
            </button>
          )}
          {currentStep < steps.length ? (
            <button 
              className="next-button" 
              onClick={handleNext}
              disabled={currentStep === 1 && !rateCard.name}
            >
              Next
              <span className="button-icon">→</span>
            </button>
          ) : (
            <button className="save-button" onClick={handleSave}>
              Save Rate Card
              <span className="button-icon">✓</span>
            </button>
          )}
        </div> */}

        {renderStep()}

        <div className="step-actions bottom-actions">
          {currentStep > 1 && (
            <button className="back-button" onClick={handleBack}>
              <span className="button-icon">←</span>
              Back
            </button>
          )}
          {currentStep < steps.length ? (
            <button 
              className="next-button" 
              onClick={handleNext}
              disabled={currentStep === 1 && !rateCard.name}
            >
              Next
              <span className="button-icon">→</span>
            </button>
          ) : (
            <button className="save-button" onClick={handleSave}>
              Save Rate Card
              <span className="button-icon">✓</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default RateCardSetup; 