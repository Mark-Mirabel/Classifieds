import { useState } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import './App.css';
import PublicationSelector from './components/PublicationSelector';
import CategorySelector from './components/CategorySelector';
import HtmlEditor from './components/HtmlEditor';
import Settings from './components/Settings';
import PublicationsAndWebsites from './components/PublicationsAndWebsites';
import PremiumFeatures from './components/PremiumFeatures';
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
import CategoriesByIndustry from './pages/CategoriesByIndustry';
import UsersGuide from './pages/UsersGuide';
import FeaturesTimeline from './pages/FeaturesTimeline';
import RateCardTypesPage from './pages/RateCardTypesPage';
import RateCardTypePage from './pages/RateCardTypePage';
import PlansPage from './pages/PlansPage';
import AdminSection from './components/AdminSection';
import AddOnsPage from './pages/AddOnsPage';
import RateCardTypes from './pages/RateCardTypes';
import PlanBuilder from './pages/PlanBuilder';

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
  const [showRateCard, setShowRateCard] = useState(false);
  const [showAdminSection, setShowAdminSection] = useState(false);

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
                    Check Out Page Builder
                  </Link>
                  <Link to="/plans" className="dropdown-item">
                    Plans
                  </Link>
                  <Link to="/add-ons" className="dropdown-item">
                    Add-Ons
                  </Link>
                  <Link to="/rate-cards/setup" className="dropdown-item">
                    Plan Builder
                  </Link>
                  <Link to="/rate-cards/types" className="dropdown-item">
                    Rate Card Types
                  </Link>
                  <Link to="/discounts" className="dropdown-item">
                    Discounts/Overrides
                  </Link>
                  <Link to="/categories" className="dropdown-item">
                    Categories
                  </Link>
                </div>
              </div>
              <div className="nav-dropdown">
                <button className="nav-item">Admin ▼</button>
                <div className="nav-dropdown-content">
                  <button 
                    className="dropdown-item"
                    onClick={() => setShowAdminSection(true)}
                  >
                    Admin Dashboard
                  </button>
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
            <Route path="/plans" element={<PlansPage />} />
            <Route path="/add-ons" element={<AddOnsPage />} />
            <Route path="/plan-builder" element={<PlanBuilder />} />
            <Route path="/plan-builder/:id" element={<PlanBuilder />} />
            <Route path="/rate-cards" element={<RateCardPage />} />
            <Route path="/rate-cards/:category" element={<RateCardPage />} />
            <Route path="/rate-cards/setup" element={<RateCardSetup />} />
            <Route path="/rate-cards/types" element={<RateCardTypesPage />} />
            <Route path="/rate-cards/types/:typeId" element={<RateCardTypePage />} />
            <Route path="/discounts" element={<DiscountsPage />} />
            <Route path="/discounts/edit/:id" element={<EditDiscount />} />
            <Route path="/discounts/new" element={<CreateDiscount />} />
            <Route path="/discounts-and-overrides" element={<DiscountsAndOverrides />} />
            <Route path="/support" element={<div>Support Page</div>} />
            <Route path="/profile" element={<div>Profile Page</div>} />
            <Route path="/billing" element={<div>Billing Page</div>} />
            <Route path="/logout" element={<div>Logout Page</div>} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/categories/by-industry" element={<CategoriesByIndustry />} />
            <Route path="/admin/users-guide" element={<UsersGuide />} />
            <Route path="/admin/features" element={<FeaturesTimeline />} />
            <Route path="/rate-card-types" element={<RateCardTypes />} />
          </Routes>
        </main>

        {showSettings && (
          <Settings onClose={() => setShowSettings(false)} />
        )}

        {showPremiumFeatures && (
          <PremiumFeatures onClose={() => setShowPremiumFeatures(false)} />
        )}

        {showAdminSection && (
          <AdminSection onClose={() => setShowAdminSection(false)} />
        )}

        <Cart />
      </div>
    </CartProvider>
  );
}

export default App;
