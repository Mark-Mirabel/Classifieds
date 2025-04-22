import React from 'react';
import './UsersGuide.css';

const UsersGuide = () => {
  return (
    <div className="users-guide">
      <h1>User Guide</h1>
      
      <section className="guide-section">
        <h2>Getting Started</h2>
        <p>Welcome to the Classifieds Management System. This guide will help you navigate and utilize all the features available in the system.</p>
        
        <h3>System Overview</h3>
        <p>The system is designed to manage classified advertisements across multiple publications and websites. It provides tools for creating, managing, and tracking advertisements with various pricing structures and features.</p>
      </section>

      <section className="guide-section">
        <h2>Navigation</h2>
        <p>The main navigation bar provides access to all major sections of the system:</p>
        <ul>
          <li><strong>Dashboard:</strong> Overview of your account and recent activities</li>
          <li><strong>Listings:</strong> Manage your classified advertisements</li>
          <li><strong>Messages:</strong> Communication center for customer inquiries</li>
          <li><strong>Analytics:</strong> Performance metrics and reporting tools</li>
          <li><strong>Order Systems:</strong> Configuration and management tools</li>
          <li><strong>Admin:</strong> Administrative functions and settings</li>
          <li><strong>Support:</strong> Access to help resources and documentation</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Order Systems</h2>
        <p>The Order Systems section contains tools for managing your publication and advertising setup:</p>
        
        <h3>Publications and Websites</h3>
        <p>Manage your publication and website properties:</p>
        <ul>
          <li>Add new publications or websites</li>
          <li>Configure publication details and settings</li>
          <li>Set up publication-specific features and requirements</li>
          <li>Manage publication categories and sections</li>
        </ul>

        <h3>Check Out Page Builder</h3>
        <p>Configure the overall order system settings:</p>
        <ul>
          <li>Set up order processing workflows</li>
          <li>Configure payment gateways and methods</li>
          <li>Define order statuses and transitions</li>
          <li>Set up notification preferences</li>
        </ul>

        <h3>Rate Card Setup</h3>
        <p>Create and manage rate cards for your publications:</p>
        <ul>
          <li>Define base pricing structures</li>
          <li>Set up publication-specific rates</li>
          <li>Configure rate card validity periods</li>
          <li>Manage rate card versions and updates</li>
        </ul>

        <h3>Rate Card Types</h3>
        <p>Configure different types of rate cards to suit various advertising needs:</p>
        <ul>
          <li>
            <strong>Flat Rate:</strong> Fixed price per ad, regardless of size or content
            <ul>
              <li><strong>Base Flat Rate:</strong> The fixed cost for the ad (e.g., $50)</li>
              <li><strong>Currency:</strong> USD, EUR, etc.</li>
              <li><strong>Rate Effective Date:</strong> When this rate becomes active</li>
              <li><strong>Rate Expiration Date (optional):</strong> When the rate becomes inactive</li>
              <li><strong>Minimum Run Length (optional):</strong> Minimum days or issues the ad must run</li>
              <li><strong>Maximum Run Length (optional):</strong> Cap on how long the flat rate applies</li>
              <li>
                <strong>Flat Rate Type:</strong> Select one to define how the flat rate is calculated
                <ul>
                  <li>Per Ad</li>
                  <li>Per Word (with fixed word count tiers)</li>
                  <li>Per Day</li>
                  <li>Per Publication</li>
                </ul>
              </li>
              <li>
                <strong>Discounting & Overrides:</strong>
                <ul>
                  <li><strong>Bundle Eligible:</strong> Whether this flat rate can be included in a multi-ad or multi-publication bundle</li>
                  <li><strong>Multi-Publication Discount Allowed:</strong> Whether this rate can participate in multi-publication discounts</li>
                  <li><strong>Promo Code Support:</strong> Whether this rate can be overridden with a promo or discount code</li>
                  <li><strong>Account-Level Override Allowed:</strong> Whether admins can override for specific accounts</li>
                  <li><strong>Package Association (optional):</strong> Links this flat rate to predefined packages or upsell bundles</li>
                </ul>
              </li>
              <li>
                <strong>Add-ons / Enhancements Configuration:</strong>
                <ul>
                  <li><strong>Enhancements Allowed:</strong> Whether visual or position-based add-ons are allowed</li>
                  <li><strong>Included Add-ons (optional):</strong> List of enhancements included at no extra cost</li>
                  <li>
                    <strong>Add-on Selection Mode:</strong>
                    <ul>
                      <li>Manual (user selects)</li>
                      <li>Auto-Bundled (included by default)</li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </li>
          <li><strong>Word-Based:</strong> Pricing based on word count</li>
          <li><strong>Line Rate:</strong> Pricing based on number of lines</li>
          <li><strong>Modular:</strong> Pricing based on ad size in modular units</li>
          <li><strong>Column Inch:</strong> Pricing based on column inches</li>
          <li><strong>Tiered:</strong> Pricing with multiple tiers or levels</li>
          <li><strong>Performance:</strong> Pricing based on performance metrics</li>
          <li><strong>Custom:</strong> Create your own pricing structure</li>
        </ul>

        <h3>Discounts and Overrides</h3>
        <p>Manage special pricing and discounts:</p>
        <ul>
          <li>Create and manage discount codes</li>
          <li>Set up volume discounts</li>
          <li>Configure special rates for specific clients</li>
          <li>Manage seasonal promotions</li>
        </ul>

        <h3>Categories</h3>
        <p>Organize your classified advertisements:</p>
        <ul>
          <li>Create and manage ad categories</li>
          <li>Set up category-specific features</li>
          <li>Configure category display settings</li>
          <li>Manage category hierarchies</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Creating Advertisements</h2>
        <p>Step-by-step guide to creating classified advertisements:</p>
        <ol>
          <li>Select the target publication(s)</li>
          <li>Choose the appropriate category</li>
          <li>Enter ad content and details</li>
          <li>Select ad placement options</li>
          <li>Choose pricing and duration</li>
          <li>Review and submit the ad</li>
        </ol>
      </section>

      <section className="guide-section">
        <h2>Managing Advertisements</h2>
        <p>Tools and features for managing your ads:</p>
        <ul>
          <li>View and edit active advertisements</li>
          <li>Track ad performance and statistics</li>
          <li>Renew or extend ad duration</li>
          <li>Manage ad responses and inquiries</li>
          <li>Generate reports and analytics</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Account Management</h2>
        <p>Manage your account settings and preferences:</p>
        <ul>
          <li>Update profile information</li>
          <li>Manage billing and payment methods</li>
          <li>Configure notification preferences</li>
          <li>Set up user permissions and access levels</li>
        </ul>
      </section>

      <section className="guide-section">
        <h2>Support and Resources</h2>
        <p>Access help and support resources:</p>
        <ul>
          <li>Contact support team</li>
          <li>Access knowledge base</li>
          <li>View system status</li>
          <li>Submit feature requests</li>
        </ul>
      </section>
    </div>
  );
};

export default UsersGuide; 