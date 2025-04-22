class BundleTemplate {
  constructor({
    id,
    name,
    description,
    baseRateCardId,
    includedAddOns = [],
    placementEnhancements = [],
    bundlePrice,
    conditions = [],
    priority = 0,
    isActive = true,
    startDate = null,
    endDate = null,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.baseRateCardId = baseRateCardId;
    this.includedAddOns = includedAddOns;
    this.placementEnhancements = placementEnhancements;
    this.bundlePrice = bundlePrice;
    this.conditions = conditions;
    this.priority = priority;
    this.isActive = isActive;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;

    // Validate the bundle
    this.validate();
  }

  validate() {
    const errors = [];

    if (!this.name) errors.push('Bundle name is required');
    if (!this.baseRateCardId) errors.push('Base rate card is required');
    if (this.bundlePrice === undefined || this.bundlePrice === null) {
      errors.push('Bundle price is required');
    }
    if (this.bundlePrice < 0) errors.push('Bundle price cannot be negative');
    if (this.startDate && this.endDate && this.startDate > this.endDate) {
      errors.push('Start date cannot be after end date');
    }

    // Validate add-ons and placement enhancements
    if (!Array.isArray(this.includedAddOns)) {
      errors.push('Included add-ons must be an array');
    }
    if (!Array.isArray(this.placementEnhancements)) {
      errors.push('Placement enhancements must be an array');
    }

    // Validate conditions
    if (!Array.isArray(this.conditions)) {
      errors.push('Conditions must be an array');
    } else {
      this.conditions.forEach((condition, index) => {
        if (!this.isValidCondition(condition)) {
          errors.push(`Invalid condition at index ${index}`);
        }
      });
    }

    if (errors.length > 0) {
      throw new Error(`Bundle validation failed: ${errors.join(', ')}`);
    }
  }

  isValidCondition(condition) {
    const validTypes = [
      'category',
      'publicationCount',
      'clientType',
      'dateRange',
      'custom',
      'adSize',
      'adDuration',
      'clientTier',
      'geographicLocation',
      'dayOfWeek',
      'timeOfDay',
      'totalSpend',
      'bundleCompatibility'
    ];

    if (!validTypes.includes(condition.type)) return false;

    switch (condition.type) {
      case 'category':
        return typeof condition.value === 'string';
      case 'publicationCount':
        return typeof condition.value === 'number' && condition.value > 0;
      case 'clientType':
        return typeof condition.value === 'string';
      case 'dateRange':
        return condition.startDate instanceof Date && condition.endDate instanceof Date;
      case 'adSize':
        return typeof condition.value === 'string' && ['small', 'medium', 'large'].includes(condition.value);
      case 'adDuration':
        return typeof condition.value === 'number' && condition.value > 0;
      case 'clientTier':
        return typeof condition.value === 'string' && ['basic', 'premium', 'enterprise'].includes(condition.value);
      case 'geographicLocation':
        return Array.isArray(condition.value) && condition.value.every(loc => typeof loc === 'string');
      case 'dayOfWeek':
        return Array.isArray(condition.value) && condition.value.every(day => 
          ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'].includes(day.toLowerCase())
        );
      case 'timeOfDay':
        return condition.startTime && condition.endTime && 
               typeof condition.startTime === 'string' && 
               typeof condition.endTime === 'string';
      case 'totalSpend':
        return typeof condition.value === 'number' && condition.value > 0;
      case 'bundleCompatibility':
        return Array.isArray(condition.value) && condition.value.every(id => typeof id === 'string');
      case 'custom':
        return typeof condition.evaluate === 'function';
      default:
        return true;
    }
  }

  isActive() {
    if (!this.isActive) return false;
    
    const now = new Date();
    if (this.startDate && now < this.startDate) return false;
    if (this.endDate && now > this.endDate) return false;
    
    return true;
  }

  meetsConditions(context) {
    if (!this.isActive()) return false;
    
    return this.conditions.every(condition => {
      switch (condition.type) {
        case 'category':
          return context.category === condition.value;
        case 'publicationCount':
          return context.publicationCount >= condition.value;
        case 'clientType':
          return context.clientType === condition.value;
        case 'dateRange':
          const now = new Date();
          return now >= condition.startDate && now <= condition.endDate;
        case 'adSize':
          return context.adSize === condition.value;
        case 'adDuration':
          return context.duration >= condition.value;
        case 'clientTier':
          return context.clientTier === condition.value;
        case 'geographicLocation':
          return condition.value.includes(context.location);
        case 'dayOfWeek':
          return condition.value.includes(context.dayOfWeek.toLowerCase());
        case 'timeOfDay':
          const currentTime = new Date().toTimeString().slice(0, 5);
          return currentTime >= condition.startTime && currentTime <= condition.endTime;
        case 'totalSpend':
          return context.totalSpend >= condition.value;
        case 'bundleCompatibility':
          return !condition.value.includes(context.currentBundleId);
        case 'custom':
          return condition.evaluate(context);
        default:
          return false;
      }
    });
  }

  calculateBundlePrice(context) {
    if (!this.meetsConditions(context)) return null;

    let finalPrice = this.bundlePrice;
    
    if (context.dynamicPricingRules) {
      context.dynamicPricingRules.forEach(rule => {
        if (rule.evaluate(context)) {
          finalPrice = rule.apply(finalPrice);
        }
      });
    }

    return finalPrice;
  }

  getIncludedFeatures() {
    return {
      baseRateCard: this.baseRateCardId,
      addOns: this.includedAddOns,
      placementEnhancements: this.placementEnhancements
    };
  }

  compareWith(otherBundle) {
    const comparison = {
      priceDifference: this.bundlePrice - otherBundle.bundlePrice,
      features: {
        addOns: {
          uniqueToThis: this.includedAddOns.filter(addOn => !otherBundle.includedAddOns.includes(addOn)),
          uniqueToOther: otherBundle.includedAddOns.filter(addOn => !this.includedAddOns.includes(addOn)),
          common: this.includedAddOns.filter(addOn => otherBundle.includedAddOns.includes(addOn))
        },
        placementEnhancements: {
          uniqueToThis: this.placementEnhancements.filter(enh => !otherBundle.placementEnhancements.includes(enh)),
          uniqueToOther: otherBundle.placementEnhancements.filter(enh => !this.placementEnhancements.includes(enh)),
          common: this.placementEnhancements.filter(enh => otherBundle.placementEnhancements.includes(enh))
        }
      },
      conditions: {
        thisBundle: this.conditions,
        otherBundle: otherBundle.conditions
      }
    };

    return comparison;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      baseRateCardId: this.baseRateCardId,
      includedAddOns: this.includedAddOns,
      placementEnhancements: this.placementEnhancements,
      bundlePrice: this.bundlePrice,
      conditions: this.conditions,
      priority: this.priority,
      isActive: this.isActive,
      startDate: this.startDate,
      endDate: this.endDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export default BundleTemplate; 