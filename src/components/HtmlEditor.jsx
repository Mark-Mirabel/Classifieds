import React, { useState, useEffect } from 'react';
import './HtmlEditor.css';

const HtmlEditor = ({ publication, category }) => {
  const [htmlContent, setHtmlContent] = useState('');
  const [previewContent, setPreviewContent] = useState('');
  const [enabledFeatures, setEnabledFeatures] = useState({
    bold: false,
    italic: false,
    underline: false,
    largerFont: false,
    customFonts: false,
    backgroundColor: false,
    border: false
  });

  useEffect(() => {
    // Load enabled features from localStorage or API
    const loadEnabledFeatures = () => {
      const savedFeatures = localStorage.getItem('enabledFeatures');
      if (savedFeatures) {
        setEnabledFeatures(JSON.parse(savedFeatures));
      }
    };
    loadEnabledFeatures();
  }, []);

  const handleInputChange = (e) => {
    const content = e.target.value;
    setHtmlContent(content);
    setPreviewContent(content);
  };

  const applyFormat = (format) => {
    if (!enabledFeatures[format]) return;
    
    const textarea = document.querySelector('.html-input');
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const selectedText = htmlContent.substring(start, end);
    
    let newContent = htmlContent;
    let newText = '';
    
    switch (format) {
      case 'bold':
        newText = `<strong>${selectedText}</strong>`;
        break;
      case 'italic':
        newText = `<em>${selectedText}</em>`;
        break;
      case 'underline':
        newText = `<u>${selectedText}</u>`;
        break;
      case 'largerFont':
        newText = `<span style="font-size: 1.2em">${selectedText}</span>`;
        break;
      case 'customFonts':
        newText = `<span style="font-family: Arial, sans-serif">${selectedText}</span>`;
        break;
      case 'backgroundColor':
        newText = `<span style="background-color: #ffff00">${selectedText}</span>`;
        break;
      case 'border':
        newText = `<span style="border: 1px solid #000">${selectedText}</span>`;
        break;
    }
    
    newContent = htmlContent.substring(0, start) + newText + htmlContent.substring(end);
    setHtmlContent(newContent);
    setPreviewContent(newContent);
  };

  return (
    <div className="html-editor">
      <div className="editor-header">
        <h2>Create Your Ad Content</h2>
        <div className="ad-info">
          <span className="publication">Publication: {publication?.name}</span>
          <span className="category">Category: {category?.name}</span>
        </div>
      </div>
      
      <div className="formatting-toolbar">
        <button 
          className={`format-button ${enabledFeatures.bold ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('bold')}
          title={enabledFeatures.bold ? 'Bold' : 'Bold (Add-on required)'}
        >
          B
        </button>
        <button 
          className={`format-button ${enabledFeatures.italic ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('italic')}
          title={enabledFeatures.italic ? 'Italic' : 'Italic (Add-on required)'}
        >
          I
        </button>
        <button 
          className={`format-button ${enabledFeatures.underline ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('underline')}
          title={enabledFeatures.underline ? 'Underline' : 'Underline (Add-on required)'}
        >
          U
        </button>
        <button 
          className={`format-button ${enabledFeatures.largerFont ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('largerFont')}
          title={enabledFeatures.largerFont ? 'Larger Font' : 'Larger Font (Add-on required)'}
        >
          A+
        </button>
        <button 
          className={`format-button ${enabledFeatures.customFonts ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('customFonts')}
          title={enabledFeatures.customFonts ? 'Custom Font' : 'Custom Font (Add-on required)'}
        >
          F
        </button>
        <button 
          className={`format-button ${enabledFeatures.backgroundColor ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('backgroundColor')}
          title={enabledFeatures.backgroundColor ? 'Background Color' : 'Background Color (Add-on required)'}
        >
          🎨
        </button>
        <button 
          className={`format-button ${enabledFeatures.border ? 'enabled' : 'disabled'}`}
          onClick={() => applyFormat('border')}
          title={enabledFeatures.border ? 'Border' : 'Border (Add-on required)'}
        >
          □
        </button>
      </div>
      
      <div className="editor-container">
        <div className="input-section">
          <h3>HTML Input</h3>
          <textarea
            className="html-input"
            value={htmlContent}
            onChange={handleInputChange}
            placeholder="Enter your HTML content here..."
            rows={15}
          />
        </div>
        
        <div className="preview-section">
          <h3>Preview</h3>
          <div 
            className="preview-content"
            dangerouslySetInnerHTML={{ __html: previewContent }}
          />
        </div>
      </div>

      <div className="editor-actions">
        <button className="save-button">Save Draft</button>
        <button className="preview-button">Preview</button>
        <button className="submit-button">Submit Ad</button>
      </div>
    </div>
  );
};

export default HtmlEditor; 