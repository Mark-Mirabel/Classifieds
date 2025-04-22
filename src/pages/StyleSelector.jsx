import React, { useState } from 'react';
import './StyleSelector.css';

const StyleSelector = () => {
  const [selectedStyle, setSelectedStyle] = useState(null);

  const stylesheets = [
    {
      id: 'modern-minimal',
      name: 'Modern Minimal',
      description: 'Clean, minimalist design with ample white space and subtle shadows',
      previewColors: ['#FFFFFF', '#F5F5F5', '#333333', '#2196F3'],
      features: ['Lightweight', 'Responsive', 'Modern typography', 'Subtle animations']
    },
    {
      id: 'material-design',
      name: 'Material Design',
      description: 'Google\'s Material Design with depth, motion, and bold colors',
      previewColors: ['#FFFFFF', '#E3F2FD', '#1976D2', '#0D47A1'],
      features: ['Elevation shadows', 'Material icons', 'Responsive grid', 'Motion effects']
    },
    {
      id: 'dark-mode',
      name: 'Dark Mode',
      description: 'Elegant dark theme with high contrast and reduced eye strain',
      previewColors: ['#121212', '#1E1E1E', '#BB86FC', '#03DAC6'],
      features: ['Dark backgrounds', 'High contrast', 'Reduced eye strain', 'Modern aesthetics']
    },
    {
      id: 'bootstrap-inspired',
      name: 'Bootstrap Inspired',
      description: 'Familiar Bootstrap-like design with custom enhancements',
      previewColors: ['#FFFFFF', '#F8F9FA', '#007BFF', '#6C757D'],
      features: ['Bootstrap grid', 'Component library', 'Responsive utilities', 'Custom components']
    },
    {
      id: 'neon-glow',
      name: 'Neon Glow',
      description: 'Vibrant neon colors with glowing effects and modern aesthetics',
      previewColors: ['#0A0A0A', '#1A1A1A', '#FF00FF', '#00FFFF'],
      features: ['Neon effects', 'Dark background', 'Vibrant accents', 'Modern UI elements']
    },
    {
      id: 'glass-morphism',
      name: 'Glass Morphism',
      description: 'Frosted glass effect with transparency and blur',
      previewColors: ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.2)', '#FFFFFF', '#000000'],
      features: ['Glass effects', 'Blur backgrounds', 'Transparency', 'Modern aesthetics']
    },
    {
      id: 'retro-wave',
      name: 'Retro Wave',
      description: '80s inspired design with gradients and retro elements',
      previewColors: ['#2D1B69', '#1B1B3A', '#FF71CE', '#01CDFE'],
      features: ['Retro gradients', 'Neon accents', 'Vintage typography', 'Nostalgic elements']
    },
    {
      id: 'nature-inspired',
      name: 'Nature Inspired',
      description: 'Organic design with natural colors and textures',
      previewColors: ['#F5F5F5', '#E8F5E9', '#2E7D32', '#1B5E20'],
      features: ['Natural colors', 'Organic shapes', 'Eco-friendly design', 'Calming aesthetics']
    },
    {
      id: 'futuristic',
      name: 'Futuristic',
      description: 'High-tech design with geometric patterns and modern elements',
      previewColors: ['#000000', '#1A1A1A', '#00FF00', '#FF00FF'],
      features: ['Geometric patterns', 'Tech-inspired', 'Modern UI', 'Innovative design']
    },
    {
      id: 'classic-elegant',
      name: 'Classic Elegant',
      description: 'Timeless design with traditional elements and refined aesthetics',
      previewColors: ['#FFFFFF', '#F5F5F5', '#333333', '#8B4513'],
      features: ['Traditional typography', 'Refined spacing', 'Classic colors', 'Elegant design']
    }
  ];

  const handleStyleSelect = (styleId) => {
    setSelectedStyle(styleId);
    // TODO: Implement style application logic
  };

  return (
    <div className="style-selector">
      <h1>Select Application Style</h1>
      <p className="description">Choose from our curated selection of modern stylesheets to customize your application's appearance.</p>
      
      <div className="styles-grid">
        {stylesheets.map(style => (
          <div 
            key={style.id}
            className={`style-card ${selectedStyle === style.id ? 'selected' : ''}`}
            onClick={() => handleStyleSelect(style.id)}
          >
            <div className="style-preview">
              {style.previewColors.map((color, index) => (
                <div 
                  key={index}
                  className="color-block"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
            <div className="style-info">
              <h3>{style.name}</h3>
              <p>{style.description}</p>
              <ul className="style-features">
                {style.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StyleSelector; 