import React from 'react';
import './BundlePreview.css';

const BundlePreview = ({ bundle, comparisonBundle = null }) => {
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  const formatDate = (date) => {
    if (!date) return 'Not set';
    return new Date(date).toLocaleDateString();
  };

  const renderComparison = () => {
    if (!comparisonBundle) return null;

    const comparison = bundle.compareWith(comparisonBundle);
    const priceDiff = comparison.priceDifference;
    const isCheaper = priceDiff < 0;

    return (
      <div className="comparison-section">
        <h3>Comparison with {comparisonBundle.name}</h3>
        <div className="price-comparison">
          <span className={`price-difference ${isCheaper ? 'cheaper' : 'more-expensive'}`}>
            {isCheaper ? 'Cheaper by' : 'More expensive by'} {formatPrice(Math.abs(priceDiff))}
          </span>
        </div>

        <div className="features-comparison">
          <div className="add-ons-comparison">
            <h4>Add-Ons</h4>
            {comparison.features.addOns.uniqueToThis.length > 0 && (
              <div className="unique-features">
                <h5>Unique to this bundle:</h5>
                <ul>
                  {comparison.features.addOns.uniqueToThis.map(addOn => (
                    <li key={addOn}>{addOn}</li>
                  ))}
                </ul>
              </div>
            )}
            {comparison.features.addOns.uniqueToOther.length > 0 && (
              <div className="missing-features">
                <h5>Missing from this bundle:</h5>
                <ul>
                  {comparison.features.addOns.uniqueToOther.map(addOn => (
                    <li key={addOn}>{addOn}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div className="enhancements-comparison">
            <h4>Placement Enhancements</h4>
            {comparison.features.placementEnhancements.uniqueToThis.length > 0 && (
              <div className="unique-features">
                <h5>Unique to this bundle:</h5>
                <ul>
                  {comparison.features.placementEnhancements.uniqueToThis.map(enh => (
                    <li key={enh}>{enh}</li>
                  ))}
                </ul>
              </div>
            )}
            {comparison.features.placementEnhancements.uniqueToOther.length > 0 && (
              <div className="missing-features">
                <h5>Missing from this bundle:</h5>
                <ul>
                  {comparison.features.placementEnhancements.uniqueToOther.map(enh => (
                    <li key={enh}>{enh}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="bundle-preview">
      <div className="bundle-header">
        <h2>{bundle.name}</h2>
        <p className="description">{bundle.description}</p>
        <div className="price-tag">
          {formatPrice(bundle.bundlePrice)}
        </div>
      </div>

      <div className="bundle-details">
        <div className="section">
          <h3>Base Rate Card</h3>
          <p>{bundle.baseRateCardId}</p>
        </div>

        <div className="section">
          <h3>Included Add-Ons</h3>
          <ul className="feature-list">
            {bundle.includedAddOns.map(addOn => (
              <li key={addOn}>{addOn}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Placement Enhancements</h3>
          <ul className="feature-list">
            {bundle.placementEnhancements.map(enh => (
              <li key={enh}>{enh}</li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Conditions</h3>
          <ul className="conditions-list">
            {bundle.conditions.map((condition, index) => (
              <li key={index}>
                {condition.type}: {condition.value}
                {condition.startDate && ` (${formatDate(condition.startDate)} to ${formatDate(condition.endDate)})`}
                {condition.startTime && ` (${condition.startTime} to ${condition.endTime})`}
              </li>
            ))}
          </ul>
        </div>

        <div className="section">
          <h3>Active Period</h3>
          <p>From: {formatDate(bundle.startDate)}</p>
          <p>To: {formatDate(bundle.endDate)}</p>
        </div>
      </div>

      {renderComparison()}
    </div>
  );
};

export default BundlePreview; 