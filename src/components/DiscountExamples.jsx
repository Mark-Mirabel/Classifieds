import React from 'react';
import './DiscountExamples.css';

const DiscountExamples = () => {
  const formatPrice = (price) => {
    if (typeof price !== 'number') return price;
    return `$${price.toFixed(2)}`;
  };

  const formatDiscount = (discount) => {
    if (typeof discount.value !== 'number') return discount.value;
    return `-${discount.value}${discount.type === 'percentage' ? '%' : '$'}`;
  };

  const examples = [
    {
      type: 'promoCode',
      title: 'Promo Code Discounts',
      description: 'Optional stackable discounts that can be combined with other discounts up to a configurable limit.',
      scenarios: [
        {
          title: 'Single Promo Code',
          description: 'Apply a single promo code for a 20% discount',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'promoCode', value: 20, name: 'SUMMER20' }
            ],
            finalPrice: 80,
            stackCounts: { promoCode: 1 }
          }
        },
        {
          title: 'Stacked Promo Codes',
          description: 'Apply multiple promo codes up to the maximum stack count (e.g., 2)',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'promoCode', value: 20, name: 'SUMMER20' },
              { type: 'promoCode', value: 15, name: 'WELCOME15' }
            ],
            finalPrice: 65,
            stackCounts: { promoCode: 2 }
          }
        }
      ],
      rules: {
        stackable: true,
        maxStackCount: 2,
        exclusiveWith: ['bundleOverride', 'vipPricing']
      }
    },
    {
      type: 'multiPubDiscount',
      title: 'Multi-Publication Discounts',
      description: 'Automatically applied discounts based on the number of publications selected.',
      scenarios: [
        {
          title: 'Single Publication',
          description: 'No discount for single publication',
          example: {
            basePrice: 100,
            discounts: [],
            finalPrice: 100,
            stackCounts: { multiPubDiscount: 0 }
          }
        },
        {
          title: 'Multiple Publications',
          description: 'Stacking discounts for multiple publications (up to 3)',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'multiPubDiscount', value: 10, name: '2 Publications' },
              { type: 'multiPubDiscount', value: 15, name: '3 Publications' },
              { type: 'multiPubDiscount', value: 20, name: '4 Publications' }
            ],
            finalPrice: 55,
            stackCounts: { multiPubDiscount: 3 }
          }
        }
      ],
      rules: {
        stackable: true,
        maxStackCount: 3,
        exclusiveWith: []
      }
    },
    {
      type: 'bundleOverride',
      title: 'Bundle Override Discounts',
      description: 'Exclusive discounts that override other discount types when applied.',
      scenarios: [
        {
          title: 'Bundle Only',
          description: 'Apply a bundle discount of 25%',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'bundleOverride', value: 25, name: 'Premium Bundle' }
            ],
            finalPrice: 75,
            stackCounts: { bundleOverride: 1 }
          }
        },
        {
          title: 'Bundle with Promo Code',
          description: 'Bundle discount overrides promo code',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'promoCode', value: 20, name: 'SUMMER20' },
              { type: 'bundleOverride', value: 25, name: 'Premium Bundle' }
            ],
            finalPrice: 75,
            stackCounts: { bundleOverride: 1 }
          }
        }
      ],
      rules: {
        stackable: false,
        exclusiveWith: ['promoCode', 'vipPricing', 'multiPubDiscount']
      }
    },
    {
      type: 'vipPricing',
      title: 'VIP Pricing Discounts',
      description: 'Exclusive pricing agreements for VIP clients that override other discounts.',
      scenarios: [
        {
          title: 'VIP Only',
          description: 'Apply VIP pricing of 30% off',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'vipPricing', value: 30, name: 'VIP Client' }
            ],
            finalPrice: 70,
            stackCounts: { vipPricing: 1 }
          }
        },
        {
          title: 'VIP with Other Discounts',
          description: 'VIP pricing overrides all other discounts',
          example: {
            basePrice: 100,
            discounts: [
              { type: 'promoCode', value: 20, name: 'SUMMER20' },
              { type: 'multiPubDiscount', value: 15, name: '2 Publications' },
              { type: 'vipPricing', value: 30, name: 'VIP Client' }
            ],
            finalPrice: 70,
            stackCounts: { vipPricing: 1 }
          }
        }
      ],
      rules: {
        stackable: false,
        exclusiveWith: ['promoCode', 'bundleOverride', 'multiPubDiscount']
      }
    }
  ];

  return (
    <div className="discount-examples">
      <h1>Discount Examples</h1>
      <p className="examples-intro">
        Below are examples of how different discount types work and interact with each other.
        Each example shows the base price, applied discounts, and final price.
      </p>

      {examples.map((discountType) => (
        <div key={discountType.type} className="discount-type-section">
          <h2>{discountType.title}</h2>
          <p className="discount-description">{discountType.description}</p>
          
          <div className="rules-summary">
            <h3>Rules</h3>
            <ul>
              <li>Stackable: {discountType.rules.stackable ? 'Yes' : 'No'}</li>
              {discountType.rules.maxStackCount && (
                <li>Maximum Stack Count: {discountType.rules.maxStackCount}</li>
              )}
              <li>Exclusive With: {discountType.rules.exclusiveWith.join(', ') || 'None'}</li>
            </ul>
          </div>

          <div className="scenarios-grid">
            {discountType.scenarios.map((scenario, index) => (
              <div key={index} className="scenario-card">
                <h3>{scenario.title}</h3>
                <p>{scenario.description}</p>
                
                <div className="price-breakdown">
                  <div className="price-row">
                    <span>Base Price:</span>
                    <span>{formatPrice(scenario.example.basePrice)}</span>
                  </div>
                  
                  {scenario.example.discounts.map((discount, i) => (
                    <div key={i} className="price-row discount">
                      <span>{discount.name}:</span>
                      <span>{formatDiscount(discount)}</span>
                    </div>
                  ))}
                  
                  <div className="price-row total">
                    <span>Final Price:</span>
                    <span>{formatPrice(scenario.example.finalPrice)}</span>
                  </div>
                </div>

                <div className="stack-counts">
                  <h4>Stack Counts:</h4>
                  <ul>
                    {Object.entries(scenario.example.stackCounts).map(([type, count]) => (
                      <li key={type}>
                        {type}: {count}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DiscountExamples; 