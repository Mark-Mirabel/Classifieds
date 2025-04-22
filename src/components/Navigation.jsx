import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  const location = useLocation();

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="header">
      <div className="header-content">
        <h1>Classifieds</h1>
        <nav className="main-nav">
          <Link 
            to="/" 
            className={`nav-item ${isActive('/') ? 'active' : ''}`}
          >
            Dashboard
          </Link>
          <Link 
            to="/rate-cards" 
            className={`nav-item ${isActive('/rate-cards') ? 'active' : ''}`}
          >
            Rate Cards
          </Link>
          <Link 
            to="/rate-card-types" 
            className={`nav-item ${isActive('/rate-card-types') ? 'active' : ''}`}
          >
            Rate Card Types
          </Link>
          <Link 
            to="/plans" 
            className={`nav-item ${isActive('/plans') ? 'active' : ''}`}
          >
            Plans
          </Link>
          <Link 
            to="/plan-builder" 
            className={`nav-item ${isActive('/plan-builder') ? 'active' : ''}`}
          >
            Plan Builder
          </Link>
          <Link 
            to="/add-ons" 
            className={`nav-item ${isActive('/add-ons') ? 'active' : ''}`}
          >
            Add-Ons
          </Link>
          <Link 
            to="/discounts" 
            className={`nav-item ${isActive('/discounts') ? 'active' : ''}`}
          >
            Discounts
          </Link>
          <Link 
            to="/order-system" 
            className={`nav-item ${isActive('/order-system') ? 'active' : ''}`}
          >
            Order System
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Navigation; 