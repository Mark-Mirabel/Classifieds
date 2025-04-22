import { useState } from 'react';
import './RateCardTypes.css';

const RateCardTypes = () => {
  const [selectedType, setSelectedType] = useState('flat');
  const [flatRate, setFlatRate] = useState({
    amount: '',
    duration: '',
    includedAddOns: [],
    imageLimit: '',
    renewalFee: '',
    tax: '',
    description: 'A fixed price is charged per ad, regardless of size, length, or content. Often used for digital-only listings or simple categories like "Garage Sales."',
    useCases: [
      'Online-only platforms',
      'Short-term ads',
      'Self-service publishing'
    ]
  });

  const [wordBased, setWordBased] = useState({
    baseRate: '',
    includedWords: '',
    costPerAdditionalWord: '',
    maxWordLimit: '',
    freeWords: '',
    headlineCharge: '',
    description: 'Price is determined by the number of words in the ad. A base fee is charged for a minimum word count, and additional words are billed incrementally.',
    useCases: [
      'Print classifieds',
      'Obituaries',
      'Announcements'
    ]
  });

  const [sizeBased, setSizeBased] = useState({
    baseRate: '',
    sizeOptions: [],
    maxSize: '',
    minSize: '',
    description: 'Pricing is based on the physical size or space occupied by the ad. Common in print media where space is a premium.',
    useCases: [
      'Print newspapers',
      'Magazines',
      'Display ads'
    ]
  });

  const [lineBased, setLineBased] = useState({
    baseRate: '',
    linesIncluded: '',
    costPerAdditionalLine: '',
    maxLines: '',
    description: 'Pricing is calculated based on the number of lines in the ad. Each line has a fixed height and width.',
    useCases: [
      'Newspaper classifieds',
      'Legal notices',
      'Public announcements'
    ]
  });

  const [categoryBased, setCategoryBased] = useState({
    baseRate: '',
    categories: [],
    premiumCategories: [],
    description: 'Different prices for different categories of ads. Some categories may be premium priced.',
    useCases: [
      'Multi-category platforms',
      'Specialized listings',
      'Premium sections'
    ]
  });

  const handleFlatRateChange = (field, value) => {
    setFlatRate(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleWordBasedChange = (field, value) => {
    setWordBased(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSizeBasedChange = (field, value) => {
    setSizeBased(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleLineBasedChange = (field, value) => {
    setLineBased(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleCategoryBasedChange = (field, value) => {
    setCategoryBased(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddOnToggle = (addOnId) => {
    setFlatRate(prev => ({
      ...prev,
      includedAddOns: prev.includedAddOns.includes(addOnId)
        ? prev.includedAddOns.filter(id => id !== addOnId)
        : [...prev.includedAddOns, addOnId]
    }));
  };

  return (
    <div className="rate-card-types">
      <div className="type-header">
        <h1>Rate Card Types</h1>
        <p>Configure different pricing structures for your listings</p>
      </div>

      <div className="type-selector">
        <button
          className={`type-option ${selectedType === 'flat' ? 'active' : ''}`}
          onClick={() => setSelectedType('flat')}
        >
          🧾 Flat Rate
        </button>
        <button
          className={`type-option ${selectedType === 'word' ? 'active' : ''}`}
          onClick={() => setSelectedType('word')}
        >
          📏 Word-Based
        </button>
        <button
          className={`type-option ${selectedType === 'size' ? 'active' : ''}`}
          onClick={() => setSelectedType('size')}
        >
          📐 Size-Based
        </button>
        <button
          className={`type-option ${selectedType === 'line' ? 'active' : ''}`}
          onClick={() => setSelectedType('line')}
        >
          📝 Line-Based
        </button>
        <button
          className={`type-option ${selectedType === 'category' ? 'active' : ''}`}
          onClick={() => setSelectedType('category')}
        >
          📑 Category-Based
        </button>
      </div>

      {selectedType === 'flat' && (
        <div className="rate-card-form">
          <div className="form-section">
            <h2>Flat Rate Configuration</h2>
            <p className="type-description">{flatRate.description}</p>
            
            <div className="use-cases">
              <h3>Common Use Cases:</h3>
              <ul>
                {flatRate.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="amount">Flat Rate Amount</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="amount"
                    value={flatRate.amount}
                    onChange={(e) => handleFlatRateChange('amount', e.target.value)}
                    placeholder="Enter amount"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="duration">Duration (days)</label>
                <input
                  type="number"
                  id="duration"
                  value={flatRate.duration}
                  onChange={(e) => handleFlatRateChange('duration', e.target.value)}
                  placeholder="Enter duration"
                  min="1"
                />
              </div>

              <div className="form-group">
                <label htmlFor="imageLimit">Number of Images Allowed</label>
                <input
                  type="number"
                  id="imageLimit"
                  value={flatRate.imageLimit}
                  onChange={(e) => handleFlatRateChange('imageLimit', e.target.value)}
                  placeholder="Enter image limit"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="renewalFee">Renewal Fee (optional)</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="renewalFee"
                    value={flatRate.renewalFee}
                    onChange={(e) => handleFlatRateChange('renewalFee', e.target.value)}
                    placeholder="Enter renewal fee"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="tax">Tax Rate (%)</label>
                <div className="input-group">
                  <input
                    type="number"
                    id="tax"
                    value={flatRate.tax}
                    onChange={(e) => handleFlatRateChange('tax', e.target.value)}
                    placeholder="Enter tax rate"
                    min="0"
                    max="100"
                    step="0.01"
                  />
                  <span className="percent">%</span>
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button">Save Rate Card</button>
              <button className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedType === 'word' && (
        <div className="rate-card-form">
          <div className="form-section">
            <h2>Word-Based Pricing Configuration</h2>
            <p className="type-description">{wordBased.description}</p>
            
            <div className="use-cases">
              <h3>Common Use Cases:</h3>
              <ul>
                {wordBased.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="baseRate">Base Rate</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={wordBased.baseRate}
                    onChange={(e) => handleWordBasedChange('baseRate', e.target.value)}
                    placeholder="Enter base rate"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="includedWords">Words Included in Base Rate</label>
                <input
                  type="number"
                  id="includedWords"
                  value={wordBased.includedWords}
                  onChange={(e) => handleWordBasedChange('includedWords', e.target.value)}
                  placeholder="Enter number of words"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="costPerAdditionalWord">Cost per Additional Word</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="costPerAdditionalWord"
                    value={wordBased.costPerAdditionalWord}
                    onChange={(e) => handleWordBasedChange('costPerAdditionalWord', e.target.value)}
                    placeholder="Enter cost per word"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="maxWordLimit">Maximum Word Limit</label>
                <input
                  type="number"
                  id="maxWordLimit"
                  value={wordBased.maxWordLimit}
                  onChange={(e) => handleWordBasedChange('maxWordLimit', e.target.value)}
                  placeholder="Enter maximum words"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="headlineCharge">Headline Charge (optional)</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="headlineCharge"
                    value={wordBased.headlineCharge}
                    onChange={(e) => handleWordBasedChange('headlineCharge', e.target.value)}
                    placeholder="Enter headline charge"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button">Save Rate Card</button>
              <button className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedType === 'size' && (
        <div className="rate-card-form">
          <div className="form-section">
            <h2>Size-Based Pricing Configuration</h2>
            <p className="type-description">{sizeBased.description}</p>
            
            <div className="use-cases">
              <h3>Common Use Cases:</h3>
              <ul>
                {sizeBased.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="baseRate">Base Rate</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={sizeBased.baseRate}
                    onChange={(e) => handleSizeBasedChange('baseRate', e.target.value)}
                    placeholder="Enter base rate"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="minSize">Minimum Size (sq. in.)</label>
                <input
                  type="number"
                  id="minSize"
                  value={sizeBased.minSize}
                  onChange={(e) => handleSizeBasedChange('minSize', e.target.value)}
                  placeholder="Enter minimum size"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="maxSize">Maximum Size (sq. in.)</label>
                <input
                  type="number"
                  id="maxSize"
                  value={sizeBased.maxSize}
                  onChange={(e) => handleSizeBasedChange('maxSize', e.target.value)}
                  placeholder="Enter maximum size"
                  min="0"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button">Save Rate Card</button>
              <button className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedType === 'line' && (
        <div className="rate-card-form">
          <div className="form-section">
            <h2>Line-Based Pricing Configuration</h2>
            <p className="type-description">{lineBased.description}</p>
            
            <div className="use-cases">
              <h3>Common Use Cases:</h3>
              <ul>
                {lineBased.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="baseRate">Base Rate</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={lineBased.baseRate}
                    onChange={(e) => handleLineBasedChange('baseRate', e.target.value)}
                    placeholder="Enter base rate"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="linesIncluded">Lines Included in Base Rate</label>
                <input
                  type="number"
                  id="linesIncluded"
                  value={lineBased.linesIncluded}
                  onChange={(e) => handleLineBasedChange('linesIncluded', e.target.value)}
                  placeholder="Enter number of lines"
                  min="0"
                />
              </div>

              <div className="form-group">
                <label htmlFor="costPerAdditionalLine">Cost per Additional Line</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="costPerAdditionalLine"
                    value={lineBased.costPerAdditionalLine}
                    onChange={(e) => handleLineBasedChange('costPerAdditionalLine', e.target.value)}
                    placeholder="Enter cost per line"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="maxLines">Maximum Line Limit</label>
                <input
                  type="number"
                  id="maxLines"
                  value={lineBased.maxLines}
                  onChange={(e) => handleLineBasedChange('maxLines', e.target.value)}
                  placeholder="Enter maximum lines"
                  min="0"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button">Save Rate Card</button>
              <button className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {selectedType === 'category' && (
        <div className="rate-card-form">
          <div className="form-section">
            <h2>Category-Based Pricing Configuration</h2>
            <p className="type-description">{categoryBased.description}</p>
            
            <div className="use-cases">
              <h3>Common Use Cases:</h3>
              <ul>
                {categoryBased.useCases.map((useCase, index) => (
                  <li key={index}>{useCase}</li>
                ))}
              </ul>
            </div>

            <div className="form-fields">
              <div className="form-group">
                <label htmlFor="baseRate">Base Rate</label>
                <div className="input-group">
                  <span className="currency">$</span>
                  <input
                    type="number"
                    id="baseRate"
                    value={categoryBased.baseRate}
                    onChange={(e) => handleCategoryBasedChange('baseRate', e.target.value)}
                    placeholder="Enter base rate"
                    min="0"
                    step="0.01"
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="categories">Standard Categories</label>
                <textarea
                  id="categories"
                  value={categoryBased.categories.join('\n')}
                  onChange={(e) => handleCategoryBasedChange('categories', e.target.value.split('\n'))}
                  placeholder="Enter categories (one per line)"
                  rows="4"
                />
              </div>

              <div className="form-group">
                <label htmlFor="premiumCategories">Premium Categories</label>
                <textarea
                  id="premiumCategories"
                  value={categoryBased.premiumCategories.join('\n')}
                  onChange={(e) => handleCategoryBasedChange('premiumCategories', e.target.value.split('\n'))}
                  placeholder="Enter premium categories (one per line)"
                  rows="4"
                />
              </div>
            </div>

            <div className="form-actions">
              <button className="save-button">Save Rate Card</button>
              <button className="cancel-button">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RateCardTypes; 