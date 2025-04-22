import { RateCard } from '../models/pricing/RateCard';
import { Package } from '../models/pricing/Package';
import { Rule } from '../models/pricing/Rule';
import { Discount } from '../models/pricing/Discount';
import { PromoCode } from '../models/pricing/PromoCode';
import { ClientPricingAgreement } from '../models/pricing/ClientPricingAgreement';

class PricingEngine {
  constructor() {
    this.rules = [];
    this.discounts = [];
    this.promoCodes = [];
    this.clientAgreements = [];
    this.stackabilityRules = {
      promoCode: {
        stackable: true,
        maxStackCount: 1,
        exclusiveWith: ['bundleOverride', 'vipPricing']
      },
      multiPubDiscount: {
        stackable: true,
        maxStackCount: 3,
        exclusiveWith: []
      },
      bundleOverride: {
        stackable: false,
        exclusiveWith: ['promoCode', 'vipPricing', 'multiPubDiscount']
      },
      vipPricing: {
        stackable: false,
        exclusiveWith: ['promoCode', 'bundleOverride', 'multiPubDiscount']
      }
    };
  }

  // Add pricing components to the engine
  addRule(rule) {
    this.rules.push(rule);
    this.rules.sort((a, b) => b.priority - a.priority);
  }

  addDiscount(discount) {
    this.discounts.push(discount);
  }

  addPromoCode(promoCode) {
    this.promoCodes.push(promoCode);
  }

  addClientAgreement(agreement) {
    this.clientAgreements.push(agreement);
  }

  // Calculate the final price for a cart
  calculatePrice(cart) {
    const context = this.createPricingContext(cart);
    let finalPrice = this.calculateBasePrice(cart);
    let appliedDiscounts = [];
    let allStackCounts = {};

    // Apply rules in priority order
    for (const rule of this.rules) {
      if (rule.evaluate(context)) {
        const result = rule.apply(context, finalPrice);
        finalPrice = result.price;
        if (result.discount) {
          appliedDiscounts.push({
            type: rule.type || 'rule',
            value: result.discount,
            name: rule.name
          });
        }
      }
    }

    // Apply discounts with stackability logic
    const applicableDiscounts = this.getApplicableDiscounts(context);
    const stackedDiscounts = this.applyStackableDiscounts(applicableDiscounts, finalPrice);
    finalPrice = stackedDiscounts.finalPrice;
    appliedDiscounts = [...appliedDiscounts, ...stackedDiscounts.appliedDiscounts];
    allStackCounts = { ...allStackCounts, ...stackedDiscounts.stackCounts };

    // Apply promo codes with stackability logic
    const applicablePromoCodes = this.getApplicablePromoCodes();
    const stackedPromoCodes = this.applyStackableDiscounts(applicablePromoCodes, finalPrice);
    finalPrice = stackedPromoCodes.finalPrice;
    appliedDiscounts = [...appliedDiscounts, ...stackedPromoCodes.appliedDiscounts];
    allStackCounts = { ...allStackCounts, ...stackedPromoCodes.stackCounts };

    // Apply client agreements (non-stackable)
    for (const agreement of this.clientAgreements) {
      if (agreement.isActive()) {
        const result = agreement.calculatePrice(finalPrice);
        finalPrice = result.price;
        if (result.discount) {
          appliedDiscounts.push({
            type: 'clientAgreement',
            value: result.discount,
            name: agreement.name
          });
        }
      }
    }

    return {
      basePrice: this.calculateBasePrice(cart),
      finalPrice,
      savings: this.calculateBasePrice(cart) - finalPrice,
      appliedDiscounts,
      appliedRules: this.getAppliedRules(context),
      appliedPromoCodes: this.getAppliedPromoCodes(),
      appliedAgreements: this.getAppliedAgreements(),
      stackCounts: allStackCounts
    };
  }

  // Get applicable discounts based on stackability rules
  getApplicableDiscounts(context) {
    return this.discounts
      .filter(discount => discount.isActive())
      .map(discount => ({
        type: discount.type,
        value: discount.value,
        name: discount.name,
        isStackable: this.stackabilityRules[discount.type]?.stackable || false,
        exclusiveWith: this.stackabilityRules[discount.type]?.exclusiveWith || []
      }));
  }

  // Get applicable promo codes based on stackability rules
  getApplicablePromoCodes() {
    return this.promoCodes
      .filter(promoCode => promoCode.canBeUsed())
      .map(promoCode => ({
        type: 'promoCode',
        value: promoCode.discount,
        name: promoCode.code,
        isStackable: this.stackabilityRules.promoCode.stackable,
        exclusiveWith: this.stackabilityRules.promoCode.exclusiveWith
      }));
  }

  // Apply stackable discounts
  applyStackableDiscounts(discounts, currentPrice) {
    let finalPrice = currentPrice;
    const appliedDiscounts = [];
    const exclusiveDiscounts = new Set();
    const stackCounts = new Map();

    // Sort discounts by type to handle exclusivity
    discounts.sort((a, b) => {
      if (a.isStackable && !b.isStackable) return -1;
      if (!a.isStackable && b.isStackable) return 1;
      return 0;
    });

    for (const discount of discounts) {
      // Check if discount is exclusive with any already applied discounts
      const hasExclusiveConflict = discount.exclusiveWith.some(type => 
        exclusiveDiscounts.has(type)
      );

      if (!hasExclusiveConflict) {
        // Check stack count limits
        const currentStackCount = stackCounts.get(discount.type) || 0;
        const maxStackCount = this.stackabilityRules[discount.type]?.maxStackCount || 1;

        if (currentStackCount < maxStackCount) {
          // Apply discount
          const discountAmount = discount.type === 'percentage' 
            ? (finalPrice * discount.value) / 100
            : discount.value;

          finalPrice -= discountAmount;
          appliedDiscounts.push(discount);

          // Update stack count
          stackCounts.set(discount.type, currentStackCount + 1);

          // Track exclusive discounts
          if (!discount.isStackable) {
            exclusiveDiscounts.add(discount.type);
          }
        } else {
          console.warn(`Maximum stack count (${maxStackCount}) reached for discount type: ${discount.type}`);
        }
      }
    }

    return {
      finalPrice,
      appliedDiscounts,
      stackCounts: Object.fromEntries(stackCounts)
    };
  }

  // Create pricing context from cart
  createPricingContext(cart) {
    return {
      category: cart.category,
      publicationCount: cart.publicationCount,
      client: cart.client,
      date: new Date(),
      quantity: cart.quantity,
      bundle: cart.bundle,
      promoCode: cart.promoCode
    };
  }

  // Calculate base price from rate card
  calculateBasePrice(cart) {
    let basePrice = 0;

    if (cart.rateCard) {
      basePrice += cart.rateCard.calculatePrice(cart.quantity);
    }

    return basePrice;
  }

  // Get list of applied rules
  getAppliedRules(context) {
    return this.rules
      .filter(rule => rule.evaluate(context))
      .map(rule => ({
        name: rule.name,
        description: rule.description,
        priority: rule.priority
      }));
  }

  // Get list of applied client agreements
  getAppliedAgreements() {
    return this.clientAgreements
      .filter(agreement => agreement.isActive())
      .map(agreement => ({
        name: agreement.name,
        client: agreement.clientId
      }));
  }

  // Update pricing in real-time
  updatePricing(cart, callback) {
    const pricing = this.calculatePrice(cart);
    callback(pricing);
  }

  // Subscribe to pricing changes
  subscribeToPricingChanges(cart, callback) {
    const updatePricing = () => this.updatePricing(cart, callback);
    cart.onChange = updatePricing;
    updatePricing();
    return () => {
      cart.onChange = null;
    };
  }

  // Configure stackability rules
  configureStackability(type, config) {
    if (this.stackabilityRules[type]) {
      this.stackabilityRules[type] = {
        ...this.stackabilityRules[type],
        ...config
      };
    }
  }
}

export default new PricingEngine(); 