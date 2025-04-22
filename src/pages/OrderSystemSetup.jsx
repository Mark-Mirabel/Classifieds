import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './OrderSystemSetup.css';
import PlanService from '../services/PlanService';
import HtmlEditor from '../components/HtmlEditor';

const OrderSystemSetup = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [orderSystem, setOrderSystem] = useState({
    name: '',
    category: '',
    publications: [],
    websites: [],
    style: 'wizard', // 'wizard' or 'single'
    paymentTiming: 'before', // 'before' or 'after'
    rateCards: [],
    categoryPlans: {},
    addOns: [], // Add addOns array to state
    isActive: true
  });
  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // Initialize PlanService with plans from localStorage
  const storedPlans = localStorage.getItem('plans');
  const plans = storedPlans ? JSON.parse(storedPlans) : [];
  const planService = new PlanService(plans);

  const categories = {
    'Real Estate': [
      { id: '1', name: 'For Sale – Residential', icon: '🏠' },
      { id: '2', name: 'For Sale – Commercial', icon: '🏢' },
      { id: '3', name: 'For Sale – Land', icon: '🌳' },
      { id: '4', name: 'For Rent – Residential', icon: '🔑' },
      { id: '5', name: 'For Rent – Vacation Properties', icon: '🏖️' },
      { id: '6', name: 'For Rent – Commercial', icon: '🏢' },
      { id: '7', name: 'Real Estate Wanted', icon: '🔍' },
      { id: '8', name: 'Roommates / Shared Housing', icon: '👥' },
      { id: '9', name: 'Time Shares', icon: '⏰' },
      { id: '10', name: 'Parking / Storage', icon: '🅿️' },
      { id: '11', name: 'Open Houses', icon: '🏡' },
      { id: '12', name: 'Real Estate Services', icon: '👨‍💼' },
      { id: '13', name: 'Auctions / Foreclosures', icon: '🔨' }
    ],
    'Vehicles': [
      { id: '14', name: 'Cars for Sale', icon: '🚗' },
      { id: '15', name: 'Trucks / SUVs', icon: '🚚' },
      { id: '16', name: 'Motorcycles', icon: '🏍️' },
      { id: '17', name: 'RVs / Campers', icon: '🚐' },
      { id: '18', name: 'Boats / Watercraft', icon: '🚤' },
      { id: '19', name: 'Commercial Vehicles', icon: '🚛' },
      { id: '20', name: 'Vehicle Parts / Accessories', icon: '🔧' },
      { id: '21', name: 'Vehicle Wanted', icon: '🔍' },
      { id: '22', name: 'Vehicle Rentals', icon: '🔑' },
      { id: '23', name: 'Trailers', icon: '🚛' },
      { id: '24', name: 'Classic & Antique Cars', icon: '🏎️' }
    ],
    'Jobs & Employment': [
      { id: '25', name: 'Full-Time Jobs', icon: '💼' },
      { id: '26', name: 'Part-Time Jobs', icon: '⏰' },
      { id: '27', name: 'Temporary / Seasonal Jobs', icon: '📅' },
      { id: '28', name: 'Remote / Work From Home', icon: '🏠' },
      { id: '29', name: 'Internships', icon: '🎓' },
      { id: '30', name: 'Government Jobs', icon: '🏛️' },
      { id: '31', name: 'Executive / Management', icon: '👔' },
      { id: '32', name: 'Skilled Trades / Construction', icon: '🔨' },
      { id: '33', name: 'Healthcare', icon: '🏥' },
      { id: '34', name: 'Education / Teaching', icon: '📚' },
      { id: '35', name: 'Technology / IT', icon: '💻' },
      { id: '36', name: 'Hospitality / Food Service', icon: '🍽️' },
      { id: '37', name: 'Transportation / Delivery', icon: '🚚' },
      { id: '38', name: 'Customer Service / Call Center', icon: '📞' },
      { id: '39', name: 'Retail / Sales', icon: '🛍️' },
      { id: '40', name: 'Job Wanted', icon: '🔍' },
      { id: '41', name: 'Employment Agencies', icon: '🤝' },
      { id: '42', name: 'Training / Certification', icon: '📜' }
    ],
    'Services': [
      { id: '43', name: 'Home Improvement / Contractors', icon: '🔨' },
      { id: '44', name: 'Cleaning Services', icon: '🧹' },
      { id: '45', name: 'Landscaping / Lawn Care', icon: '🌿' },
      { id: '46', name: 'Childcare / Nanny', icon: '👶' },
      { id: '47', name: 'Elder Care / Home Health', icon: '👵' },
      { id: '48', name: 'Legal Services', icon: '⚖️' },
      { id: '49', name: 'Financial Services', icon: '💰' },
      { id: '50', name: 'Computer / IT Services', icon: '💻' },
      { id: '51', name: 'Moving / Hauling', icon: '🚚' },
      { id: '52', name: 'Automotive Repair', icon: '🔧' },
      { id: '53', name: 'Beauty / Wellness Services', icon: '💆' },
      { id: '54', name: 'Tutoring / Lessons', icon: '📚' },
      { id: '55', name: 'Pet Services', icon: '🐾' },
      { id: '56', name: 'Photography / Videography', icon: '📸' },
      { id: '57', name: 'Event Planning', icon: '🎉' },
      { id: '58', name: 'Security Services', icon: '🛡️' }
    ],
    'For Sale': [
      { id: '59', name: 'Appliances', icon: '🔌' },
      { id: '60', name: 'Furniture', icon: '🪑' },
      { id: '61', name: 'Electronics', icon: '📱' },
      { id: '62', name: 'Computers / Laptops', icon: '💻' },
      { id: '63', name: 'Phones / Tablets', icon: '📱' },
      { id: '64', name: 'Clothing / Accessories', icon: '👕' },
      { id: '65', name: 'Jewelry / Watches', icon: '💎' },
      { id: '66', name: 'Sporting Goods', icon: '⚽' },
      { id: '67', name: 'Musical Instruments', icon: '🎸' },
      { id: '68', name: 'Books / Media', icon: '📚' },
      { id: '69', name: 'Baby & Kids Items', icon: '👶' },
      { id: '70', name: 'Collectibles / Antiques', icon: '🏺' },
      { id: '71', name: 'Tools / Equipment', icon: '🔧' },
      { id: '72', name: 'Office Supplies', icon: '📎' },
      { id: '73', name: 'Farm / Garden', icon: '🌱' },
      { id: '74', name: 'Free Items', icon: '🎁' },
      { id: '75', name: 'Miscellaneous', icon: '📦' },
      { id: '76', name: 'Bulk / Wholesale Lots', icon: '📦' }
    ],
    'Pets': [
      { id: '77', name: 'Dogs for Sale', icon: '🐶' },
      { id: '78', name: 'Cats for Sale', icon: '🐱' },
      { id: '79', name: 'Exotic Animals', icon: '🦜' },
      { id: '80', name: 'Livestock / Farm Animals', icon: '🐄' },
      { id: '81', name: 'Pet Supplies / Accessories', icon: '🦴' },
      { id: '82', name: 'Pet Adoption / Rescue', icon: '🏠' },
      { id: '83', name: 'Lost & Found Pets', icon: '🔍' },
      { id: '84', name: 'Pet Services / Grooming', icon: '✂️' },
      { id: '85', name: 'Pet Boarding / Sitting', icon: '🏡' }
    ],
    'Announcements': [
      { id: '86', name: 'Events', icon: '📅' },
      { id: '87', name: 'Births', icon: '👶' },
      { id: '88', name: 'Deaths', icon: '⚰️' },
      { id: '89', name: 'Public Notices', icon: '📢' }
    ],
    'Personals & Community': [
      { id: '90', name: 'Personals (Dating, Casual, etc.)', icon: '❤️' },
      { id: '91', name: 'Volunteers / Charities', icon: '🤝' },
      { id: '92', name: 'Support Groups', icon: '👥' },
      { id: '93', name: 'Local Meetups', icon: '🎭' },
      { id: '94', name: 'Rideshare / Carpool', icon: '🚗' },
      { id: '95', name: 'Missed Connections', icon: '🔍' }
    ],
    'Business & Commercial': [
      { id: '96', name: 'B2B Products for Sale', icon: '📦' },
      { id: '97', name: 'Commercial Services', icon: '💼' },
      { id: '98', name: 'Business Opportunities', icon: '💡' },
      { id: '99', name: 'Franchises for Sale', icon: '🏪' },
      { id: '100', name: 'Office Space for Rent', icon: '🏢' },
      { id: '101', name: 'Equipment Leasing', icon: '🖨️' },
      { id: '102', name: 'Liquidation / Surplus Sales', icon: '💰' },
      { id: '103', name: 'Industrial Equipment', icon: '⚙️' },
      { id: '104', name: 'Manufacturing / Warehousing', icon: '🏭' }
    ],
    'Education & Training': [
      { id: '105', name: 'Online Courses', icon: '💻' },
      { id: '106', name: 'In-Person Classes', icon: '📚' },
      { id: '107', name: 'Test Prep / Tutoring', icon: '✏️' },
      { id: '108', name: 'Certification Programs', icon: '📜' },
      { id: '109', name: 'Workshops / Seminars', icon: '🎓' },
      { id: '110', name: 'Education Services', icon: '👨‍🏫' },
      { id: '111', name: 'Driving Schools', icon: '🚗' },
      { id: '112', name: 'Language Lessons', icon: '🗣️' }
    ],
    'Travel & Leisure': [
      { id: '113', name: 'Vacation Rentals', icon: '🏖️' },
      { id: '114', name: 'Travel Packages', icon: '✈️' },
      { id: '115', name: 'Cruises', icon: '🛳️' },
      { id: '116', name: 'Timeshare Rentals', icon: '⏰' },
      { id: '117', name: 'Adventure Experiences', icon: '🏔️' },
      { id: '118', name: 'Local Attractions', icon: '🏛️' },
      { id: '119', name: 'Tours & Guides', icon: '🗺️' }
    ],
    'Garage & Yard Sales': [
      { id: '120', name: 'Individual Sales', icon: '🏠' },
      { id: '121', name: 'Multi-Family Sales', icon: '👨‍👩‍👧‍👦' },
      { id: '122', name: 'Estate Sales', icon: '🏛️' },
      { id: '123', name: 'Community / Neighborhood Sales', icon: '🏘️' },
      { id: '124', name: 'Rummage Sales', icon: '🛍️' }
    ],
    'Financial & Legal': [
      { id: '125', name: 'Loans & Credit', icon: '💳' },
      { id: '126', name: 'Accounting / Bookkeeping', icon: '📊' },
      { id: '127', name: 'Bankruptcy / Debt Relief', icon: '💸' },
      { id: '128', name: 'Tax Services', icon: '📝' },
      { id: '129', name: 'Insurance', icon: '🛡️' },
      { id: '130', name: 'Legal Help', icon: '⚖️' },
      { id: '131', name: 'Business Incorporation', icon: '🏢' }
    ],
    'Industrial / Equipment': [
      { id: '132', name: 'Heavy Machinery', icon: '🚜' },
      { id: '133', name: 'Tools / Power Equipment', icon: '🔧' },
      { id: '134', name: 'Building Materials', icon: '🏗️' },
      { id: '135', name: 'Farming Equipment', icon: '🌾' },
      { id: '136', name: 'Commercial Vehicles', icon: '🚛' },
      { id: '137', name: 'Warehousing Supplies', icon: '📦' }
    ],
    'Regional / Custom': [
      { id: '138', name: 'Local Only', icon: '📍' },
      { id: '139', name: 'Regional Deals', icon: '🌎' },
      { id: '140', name: 'Faith-Based Listings', icon: '🙏' },
      { id: '141', name: 'Native Language Listings', icon: '🗣️' },
      { id: '142', name: 'Military / Veterans', icon: '🎖️' },
      { id: '143', name: 'College / Student Listings', icon: '🎓' }
    ]
  };

  const steps = [
    { id: 'category', title: 'Select Category', icon: '📋' },
    { id: 'publication', title: 'Select Publication', icon: '📰' },
    { id: 'plan', title: 'Select Plan', icon: '💰' },
    { id: 'addons', title: 'Add-Ons', icon: '➕' },
    { id: 'checkout', title: 'Create Checkout Page', icon: '🛒' },
    { id: 'preview', title: 'Preview', icon: '👁️' },
    { id: 'review', title: 'Review', icon: '✅' }
  ];

  const publications = [
    { id: '1', name: 'Daily News', type: 'Newspaper', circulation: '50,000' },
    { id: '2', name: 'Weekly Gazette', type: 'Magazine', circulation: '25,000' },
    { id: '3', name: 'Business Journal', type: 'Newspaper', circulation: '15,000' },
    { id: '4', name: 'Community Times', type: 'Newspaper', circulation: '10,000' },
    { id: '5', name: 'Sports Weekly', type: 'Magazine', circulation: '20,000' }
  ];

  const availableAddOns = [
    {
      id: 'premium-placement',
      name: 'Premium Placement',
      description: 'Get your listing featured at the top of search results',
      price: 49.99,
      icon: '⭐',
      features: ['Top placement in search results', 'Highlighted listing', 'Increased visibility']
    },
    {
      id: 'image-gallery',
      name: 'Image Gallery',
      description: 'Add multiple images to showcase your listing',
      price: 29.99,
      icon: '🖼️',
      features: ['Up to 10 images', 'Image gallery view', 'Mobile optimized']
    },
    {
      id: 'video-inclusion',
      name: 'Video Inclusion',
      description: 'Add a video tour to your listing',
      price: 39.99,
      icon: '🎥',
      features: ['Video upload support', 'Embedded video player', 'Mobile compatible']
    },
    {
      id: 'social-sharing',
      name: 'Social Sharing',
      description: 'Enable social media sharing for your listing',
      price: 19.99,
      icon: '📱',
      features: ['Share to Facebook', 'Share to Twitter', 'Share to LinkedIn']
    },
    {
      id: 'email-alerts',
      name: 'Email Alerts',
      description: 'Get notified when someone views your listing',
      price: 24.99,
      icon: '📧',
      features: ['Instant email notifications', 'Viewer statistics', 'Daily summary']
    },
    {
      id: 'featured-badge',
      name: 'Featured Badge',
      description: 'Add a featured badge to make your listing stand out',
      price: 34.99,
      icon: '🏆',
      features: ['Featured badge display', 'Priority placement', 'Increased visibility']
    }
  ];

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

  const handleStepClick = (stepId) => {
    const stepIndex = steps.findIndex(step => step.id === stepId);
    if (stepIndex <= currentStep) {
      setCurrentStep(stepIndex + 1);
    }
  };

  const handleStartOver = () => {
    setOrderSystem({
      name: '',
      category: '',
      publications: [],
      websites: [],
      style: 'wizard',
      paymentTiming: 'before',
      rateCards: [],
      categoryPlans: {},
      addOns: [],
      isActive: true
    });
    setSelectedCategories([]);
    setCurrentStep(1);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setOrderSystem(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCategorySelect = (categoryId, categoryName) => {
    setSelectedCategories([{ id: categoryId, name: categoryName }]);
    setOrderSystem(prev => ({
      ...prev,
      category: categoryName
    }));
    handleNext(); // Advance to the next step
  };

  const handlePublicationSelect = (publicationId) => {
    setOrderSystem(prev => {
      const isSelected = prev.publications.includes(publicationId);
      const newPublications = isSelected
        ? prev.publications.filter(id => id !== publicationId)
        : [...prev.publications, publicationId];
      return { ...prev, publications: newPublications };
    });
  };

  const handlePlanSelect = (categoryId, planId) => {
    setOrderSystem(prev => ({
      ...prev,
      categoryPlans: {
        ...prev.categoryPlans,
        [categoryId]: planId
      }
    }));
  };

  const handleAddOnSelect = (addOnId) => {
    setOrderSystem(prev => {
      const currentAddOns = prev.addOns || [];
      const newAddOns = currentAddOns.includes(addOnId)
        ? currentAddOns.filter(id => id !== addOnId)
        : [...currentAddOns, addOnId];
      return { ...prev, addOns: newAddOns };
    });
  };

  const calculateTotal = () => {
    const plan = planService.getPlanById(orderSystem.categoryPlans[selectedCategories[0]?.id]);
    const planPrice = plan?.price || 0;
    
    const addOnsTotal = orderSystem.addOns?.reduce((total, addOnId) => {
      const addOn = availableAddOns.find(a => a.id === addOnId);
      return total + (addOn?.price || 0);
    }, 0) || 0;

    return (planPrice + addOnsTotal).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Save order system to localStorage
    navigate('/order-systems');
  };

  const handleCreateCheckoutPage = () => {
    // Get the first selected publication from the publications array
    const firstPublication = publications.find(pub => 
      orderSystem.publications.includes(pub.id)
    );
    
    // Get the first selected category
    const firstCategory = selectedCategories[0];
    
    // Set the selected publication and category
    setSelectedPublication(firstPublication);
    setSelectedCategory(firstCategory);
    
    // Show the HTML editor
    setShowHtmlEditor(true);
  };

  const renderStep = () => {
    switch (steps[currentStep - 1].id) {
      case 'category':
        return (
          <div className="step-content">
            <h2>Select a Category</h2>
            <div className="categories-grid">
              {Object.entries(categories).map(([industry, categoryList]) => (
                <div key={industry} className="industry-section">
                  <h3>{industry}</h3>
                  <div className="category-cards">
                    {categoryList.map(category => (
                      <div
                        key={category.id}
                        className={`category-card ${selectedCategories[0]?.id === category.id ? 'selected' : ''}`}
                        onClick={() => handleCategorySelect(category.id, category.name)}
                      >
                        <span className="category-icon">{category.icon}</span>
                        <h4>{category.name}</h4>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="selected-categories">
              <h3>Selected Category</h3>
              <div className="selected-tags">
                {selectedCategories.length > 0 && (
                  <span className="category-tag">
                    {selectedCategories[0].name}
                    <button onClick={() => setSelectedCategories([])}>×</button>
                  </span>
                )}
              </div>
            </div>
          </div>
        );
      case 'publication':
        return (
          <div className="step-content">
            <h2>Select a Publication</h2>
            <div className="publications-grid">
              {publications.map(pub => (
                <div 
                  key={pub.id} 
                  className={`publication-card ${orderSystem.publications.includes(pub.id) ? 'selected' : ''}`}
                  onClick={() => handlePublicationSelect(pub.id)}
                >
                  <h3>{pub.name}</h3>
                  <p className="description">{pub.type} ({pub.circulation} circulation)</p>
                </div>
              ))}
            </div>
          </div>
        );
      case 'plan':
        return (
          <div className="step-content">
            <h2>Select a Plan</h2>
            <div className="plans-grid">
              {planService.getPlansByCategory(selectedCategories[0]?.name).map(plan => (
                <div 
                  key={plan.id} 
                  className={`plan-card ${orderSystem.categoryPlans?.[selectedCategories[0]?.id] === plan.id ? 'selected' : ''}`}
                  onClick={() => handlePlanSelect(selectedCategories[0]?.id, plan.id)}
                >
                  <h3>{plan.name}</h3>
                  <p className="price">${plan.price}</p>
                  <p className="description">{plan.description}</p>
                  <ul className="features">
                    {plan.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'addons':
        return (
          <div className="step-content">
            <h2>Select Add-Ons</h2>
            <div className="addons-grid">
              {availableAddOns.map(addOn => (
                <div 
                  key={addOn.id} 
                  className={`addon-card ${orderSystem.addOns?.includes(addOn.id) ? 'selected' : ''}`}
                  onClick={() => handleAddOnSelect(addOn.id)}
                >
                  <span className="addon-icon">{addOn.icon}</span>
                  <h3>{addOn.name}</h3>
                  <p className="description">{addOn.description}</p>
                  <p className="price">${addOn.price}</p>
                  <ul className="features">
                    {addOn.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        );
      case 'checkout':
        return (
          <div className="step-content">
            <h2>Create Checkout Page</h2>
            <div className="checkout-preview">
              <h3>Order Summary</h3>
              <div className="summary-item">
                <span>Plan:</span>
                <span>{planService.getPlanById(orderSystem.categoryPlans[selectedCategories[0]?.id])?.name}</span>
              </div>
              <div className="summary-item">
                <span>Publication:</span>
                <span>{selectedPublication?.name}</span>
              </div>
              <div className="summary-item">
                <span>Category:</span>
                <span>{selectedCategories[0]?.name}</span>
              </div>
              <div className="summary-item total">
                <span>Total:</span>
                <span>${calculateTotal()}</span>
              </div>
            </div>
            <button 
              className="create-checkout-button"
              onClick={handleCreateCheckoutPage}
            >
              Create Checkout Page
            </button>
          </div>
        );
      case 'preview':
        return (
          <div className="step-content">
            <h2>Preview Checkout Page</h2>
            <div className="preview-container">
              <div className="preview-header">
                <h3>Checkout Page Preview</h3>
                <button className="edit-button" onClick={() => setShowHtmlEditor(true)}>
                  Edit
                </button>
              </div>
              <div className="preview-content">
                <div className="preview-order-summary">
                  <h4>Order Summary</h4>
                  <div className="summary-item">
                    <span>Plan:</span>
                    <span>{planService.getPlanById(orderSystem.categoryPlans[selectedCategories[0]?.id])?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Publication:</span>
                    <span>{selectedPublication?.name}</span>
                  </div>
                  <div className="summary-item">
                    <span>Category:</span>
                    <span>{selectedCategories[0]?.name}</span>
                  </div>
                  {orderSystem.addOns?.length > 0 && (
                    <div className="summary-item">
                      <span>Add-Ons:</span>
                      <ul>
                        {orderSystem.addOns.map(addOnId => {
                          const addOn = availableAddOns.find(a => a.id === addOnId);
                          return <li key={addOnId}>{addOn?.name} (${addOn?.price})</li>;
                        })}
                      </ul>
                    </div>
                  )}
                  <div className="summary-item total">
                    <span>Total:</span>
                    <span>${calculateTotal()}</span>
                  </div>
                </div>
                <div className="preview-checkout-form">
                  <h4>Checkout Form</h4>
                  <div className="form-preview">
                    {/* Form fields preview */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'review':
        return (
          <div className="step-content">
            <h2>Review Order System Setup</h2>
            <div className="review-container">
              <div className="review-section">
                <h3>Category & Publication</h3>
                <p>Selected Category: {selectedCategories[0]?.name}</p>
                <p>Selected Publication: {selectedPublication?.name}</p>
              </div>
              <div className="review-section">
                <h3>Plan Details</h3>
                <p>Selected Plan: {planService.getPlanById(orderSystem.categoryPlans[selectedCategories[0]?.id])?.name}</p>
                <p>Price: ${planService.getPlanById(orderSystem.categoryPlans[selectedCategories[0]?.id])?.price}</p>
              </div>
              {orderSystem.addOns?.length > 0 && (
                <div className="review-section">
                  <h3>Selected Add-Ons</h3>
                  <ul>
                    {orderSystem.addOns.map(addOnId => {
                      const addOn = availableAddOns.find(a => a.id === addOnId);
                      return <li key={addOnId}>{addOn?.name} (${addOn?.price})</li>;
                    })}
                  </ul>
                </div>
              )}
              <div className="review-section">
                <h3>Total Cost</h3>
                <p className="total">${calculateTotal()}</p>
              </div>
              <div className="review-actions">
                <button className="save-button" onClick={handleSubmit}>
                  Save Order System
                </button>
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="order-system-setup">
      <div className="setup-header">
        <h1>Check Out Page Builder</h1>
        <div className="header-actions">
          <button className="back-button" onClick={() => navigate(-1)}>
            Back
          </button>
          <button className="start-over-button" onClick={handleStartOver}>
            Start Over
          </button>
        </div>
      </div>

      {!showHtmlEditor ? (
        <>
          <div className="progress-timeline">
            {steps.map((step, index) => (
              <div
                key={step.id}
                className={`timeline-step ${index + 1 === currentStep ? 'active' : ''} ${index + 1 < currentStep ? 'completed' : ''}`}
                onClick={() => handleStepClick(step.id)}
              >
                <span className="step-icon">{step.icon}</span>
                <span className="step-title">{step.title}</span>
              </div>
            ))}
          </div>

          <div className="setup-form">
            {renderStep()}
            <div className="step-actions">
              {currentStep > 1 && (
                <button className="back-button" onClick={handleBack}>
                  Back
                </button>
              )}
              {currentStep < steps.length ? (
                <button className="next-button" onClick={handleNext}>
                  Next
                </button>
              ) : (
                <button className="save-button" onClick={handleSubmit}>
                  Save
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <HtmlEditor
          publication={selectedPublication}
          category={selectedCategory}
          onClose={() => setShowHtmlEditor(false)}
        />
      )}
    </div>
  );
};

export default OrderSystemSetup; 