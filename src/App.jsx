import { useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import PublicationSelector from './components/PublicationSelector';
import CategorySelector from './components/CategorySelector';
import HtmlEditor from './components/HtmlEditor';
import Settings from './components/Settings';
import PublicationsAndWebsites from './components/PublicationsAndWebsites';
import PremiumFeatures from './components/PremiumFeatures';
import AddOns from './components/AddOns';
import PremiumAddOns from './components/PremiumAddOns';
import RateCard from './components/RateCard';
import RateCardPage from './pages/RateCardPage';
import DiscountsPage from './pages/DiscountsPage';
import EditDiscount from './pages/EditDiscount';
import CreateDiscount from './pages/CreateDiscount';
import DiscountsAndOverrides from './pages/DiscountsAndOverrides';
import RateCardSetup from './pages/RateCardSetup';
import OrderSystemSetup from './pages/OrderSystemSetup';
import Dashboard from './pages/Dashboard';
import { CartProvider } from './contexts/CartContext';
import Cart from './components/Cart';
import Categories from './pages/Categories';
import UsersGuide from './pages/UsersGuide';
import FeaturesTimeline from './pages/FeaturesTimeline';

function App() {
  const [currentStep, setCurrentStep] = useState('publications');
  const [selectedPublication, setSelectedPublication] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [showPublicationSelector, setShowPublicationSelector] = useState(false);
  const [showCategorySelector, setShowCategorySelector] = useState(false);
  const [showHtmlEditor, setShowHtmlEditor] = useState(false);
  const [activeTab, setActiveTab] = useState('print');
  const [showPremiumFeatures, setShowPremiumFeatures] = useState(false);
  const [showAddOns, setShowAddOns] = useState(false);
  const [showPremiumAddOns, setShowPremiumAddOns] = useState(false);
  const [showRateCard, setShowRateCard] = useState(false);

  const handlePublicationSelect = (publication) => {
    setSelectedPublication(publication);
    setCurrentStep('category');
  };

  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
    setCurrentStep('adContent');
  };

  const renderContent = () => {
    switch (currentPage) {
      case 'publicationsAndWebsites':
        return <PublicationsAndWebsites />;
      case 'adContent':
        return (
          <HtmlEditor 
            publication={selectedPublication}
            category={selectedCategory}
          />
        );
      default:
        return (
          <>
            {currentStep === 'publications' && (
              <PublicationSelector 
                onSelect={handlePublicationSelect} 
                onClose={() => setShowPublicationSelector(false)}
                activeTab={activeTab}
              />
            )}
            {currentStep === 'category' && (
              <CategorySelector 
                onSelect={handleCategorySelect} 
                onClose={() => setShowCategorySelector(false)}
              />
            )}
          </>
        );
    }
  };

  return (
    <CartProvider>
      <BrowserRouter>
        <div className="app">
          <header className="header">
            <div className="header-content">
              <h1>Classifieds</h1>
              <nav className="main-nav">
                <Link to="/" className="nav-item">Dashboard</Link>
                <Link to="/listings" className="nav-item">Listings</Link>
                <Link to="/messages" className="nav-item">Messages</Link>
                <Link to="/analytics" className="nav-item">Analytics</Link>
                <div className="nav-dropdown">
                  <button className="nav-item">Order Systems ▼</button>
                  <div className="nav-dropdown-content">
                    <Link to="/publications-and-websites" className="dropdown-item">
                      Publications and Websites
                    </Link>
                    <Link to="/order-system/setup" className="dropdown-item">
                      Order System Setup
                    </Link>
                    <Link to="/rate-cards/all" className="dropdown-item">
                      Rate Cards
                    </Link>
                    <Link to="/rate-cards/setup" className="dropdown-item">
                      Rate Card Setup
                    </Link>
                    <div className="dropdown-section">
                      <button className="dropdown-item">Rate Card Types ▼</button>
                      <div className="dropdown-submenu">
                        <Link to="/rate-cards/types/flat" className="dropdown-item">
                          🧾 Flat Rate
                        </Link>
                        <Link to="/rate-cards/types/word" className="dropdown-item">
                          📏 Word-Based
                        </Link>
                        <Link to="/rate-cards/types/line" className="dropdown-item">
                          🧱 Line Rate
                        </Link>
                        <Link to="/rate-cards/types/modular" className="dropdown-item">
                          📐 Modular
                        </Link>
                        <Link to="/rate-cards/types/column-inch" className="dropdown-item">
                          📰 Column Inch
                        </Link>
                        <Link to="/rate-cards/types/tiered" className="dropdown-item">
                          📊 Tiered
                        </Link>
                        <Link to="/rate-cards/types/performance" className="dropdown-item">
                          🎯 Performance
                        </Link>
                        <Link to="/rate-cards/types/custom" className="dropdown-item">
                          ⚙️ Custom
                        </Link>
                      </div>
                    </div>
                    <Link to="/discounts" className="dropdown-item">
                      Discounts/Overrides
                    </Link>
                    <Link to="/categories" className="dropdown-item">
                      Categories
                    </Link>
                    <button 
                      className="dropdown-item"
                      onClick={() => setShowPremiumAddOns(true)}
                    >
                      Premium Add-Ons
                    </button>
                  </div>
                </div>
                <div className="nav-dropdown">
                  <button className="nav-item">Admin ▼</button>
                  <div className="nav-dropdown-content">
                    <Link to="/admin" className="dropdown-item">
                      Admin Dashboard
                    </Link>
                    <Link to="/admin/users-guide" className="dropdown-item">
                      Users Guide
                    </Link>
                    <Link to="/admin/features" className="dropdown-item">
                      New Features
                    </Link>
                  </div>
                </div>
                <Link to="/support" className="nav-item">Support</Link>
              </nav>
              <div className="header-actions">
                <div className="user-menu-container">
                  <button 
                    className="user-menu-button"
                    onClick={() => setShowUserMenu(!showUserMenu)}
                  >
                    User Menu ▼
                  </button>
                  {showUserMenu && (
                    <div className="user-menu-dropdown">
                      <Link to="/profile" className="dropdown-item">Profile</Link>
                      <Link to="/billing" className="dropdown-item">Billing</Link>
                      <button 
                        className="dropdown-item"
                        onClick={() => setShowSettings(true)}
                      >
                        Settings
                      </button>
                      <Link to="/rate-cards" className="dropdown-item">Rate Cards</Link>
                      <Link to="/logout" className="dropdown-item">Logout</Link>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className="main-content">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/listings" element={<div>Listings Page</div>} />
              <Route path="/messages" element={<div>Messages Page</div>} />
              <Route path="/analytics" element={<div>Analytics Page</div>} />
              <Route path="/publications-and-websites" element={<PublicationsAndWebsites />} />
              <Route path="/order-system/setup" element={<OrderSystemSetup />} />
              <Route path="/rate-cards/:category" element={<RateCardPage />} />
              <Route path="/rate-cards/setup" element={<RateCardSetup />} />
              <Route path="/rate-cards/types/flat" element={<RateCardPage type="flat" />} />
              <Route path="/rate-cards/types/word" element={<RateCardPage type="word" />} />
              <Route path="/rate-cards/types/line" element={<RateCardPage type="line" />} />
              <Route path="/rate-cards/types/modular" element={<RateCardPage type="modular" />} />
              <Route path="/rate-cards/types/column-inch" element={<RateCardPage type="column-inch" />} />
              <Route path="/rate-cards/types/tiered" element={<RateCardPage type="tiered" />} />
              <Route path="/rate-cards/types/performance" element={<RateCardPage type="performance" />} />
              <Route path="/rate-cards/types/custom" element={<RateCardPage type="custom" />} />
              <Route path="/discounts" element={<DiscountsPage />} />
              <Route path="/discounts/edit/:id" element={<EditDiscount />} />
              <Route path="/discounts/new" element={<CreateDiscount />} />
              <Route path="/discounts-and-overrides" element={<DiscountsAndOverrides />} />
              <Route path="/support" element={<div>Support Page</div>} />
              <Route path="/profile" element={<div>Profile Page</div>} />
              <Route path="/billing" element={<div>Billing Page</div>} />
              <Route path="/logout" element={<div>Logout Page</div>} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/admin/users-guide" element={<UsersGuide />} />
              <Route path="/admin/features" element={<FeaturesTimeline />} />
            </Routes>
          </main>

          {showSettings && (
            <Settings onClose={() => setShowSettings(false)} />
          )}

          {showPremiumFeatures && (
            <PremiumFeatures onClose={() => setShowPremiumFeatures(false)} />
          )}

          {showAddOns && (
            <AddOns onClose={() => setShowAddOns(false)} />
          )}

          {showPremiumAddOns && (
            <PremiumAddOns onClose={() => setShowPremiumAddOns(false)} />
          )}

          <Cart />
        </div>
      </BrowserRouter>
    </CartProvider>
  );
}

export default App;
