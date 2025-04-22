import BundleTemplate from '../models/pricing/BundleTemplate';

class BundleService {
  constructor(bundles = []) {
    this.bundles = bundles.map(bundle => new BundleTemplate(bundle));
  }

  // Bundle Management
  addBundle(bundle) {
    try {
      const newBundle = new BundleTemplate(bundle);
      this.bundles.push(newBundle);
      return newBundle;
    } catch (error) {
      throw new Error(`Failed to add bundle: ${error.message}`);
    }
  }

  updateBundle(id, updates) {
    const index = this.bundles.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Bundle not found');

    try {
      const updatedBundle = new BundleTemplate({
        ...this.bundles[index].toJSON(),
        ...updates,
        id // Preserve the original ID
      });
      this.bundles[index] = updatedBundle;
      return updatedBundle;
    } catch (error) {
      throw new Error(`Failed to update bundle: ${error.message}`);
    }
  }

  deleteBundle(id) {
    const index = this.bundles.findIndex(b => b.id === id);
    if (index === -1) throw new Error('Bundle not found');
    this.bundles.splice(index, 1);
  }

  getBundle(id) {
    return this.bundles.find(b => b.id === id);
  }

  getAllBundles() {
    return this.bundles;
  }

  // Bundle Recommendations
  getRecommendedBundles(context) {
    const activeBundles = this.bundles.filter(bundle => bundle.isActive());
    
    return activeBundles
      .map(bundle => ({
        bundle,
        score: this.calculateBundleScore(bundle, context)
      }))
      .filter(result => result.score > 0)
      .sort((a, b) => b.score - a.score)
      .map(result => result.bundle);
  }

  calculateBundleScore(bundle, context) {
    let score = 0;

    // Check if bundle meets all conditions
    if (!bundle.meetsConditions(context)) return 0;

    // Base score for meeting conditions
    score += 50;

    // Category match bonus
    if (context.category && bundle.conditions.some(c => c.type === 'category' && c.value === context.category)) {
      score += 20;
    }

    // Client tier match bonus
    if (context.clientTier && bundle.conditions.some(c => c.type === 'clientTier' && c.value === context.clientTier)) {
      score += 15;
    }

    // Publication count bonus
    if (context.publicationCount) {
      const pubCountCondition = bundle.conditions.find(c => c.type === 'publicationCount');
      if (pubCountCondition && context.publicationCount >= pubCountCondition.value) {
        score += 10;
      }
    }

    // Price competitiveness
    const individualPrice = this.calculateIndividualPrice(context);
    if (individualPrice > 0) {
      const savings = individualPrice - bundle.bundlePrice;
      if (savings > 0) {
        score += (savings / individualPrice) * 100; // Percentage savings as bonus
      }
    }

    // Feature match bonus
    if (context.requiredFeatures) {
      const matchingFeatures = context.requiredFeatures.filter(feature => 
        bundle.includedAddOns.includes(feature) || 
        bundle.placementEnhancements.includes(feature)
      );
      score += matchingFeatures.length * 5;
    }

    return Math.min(score, 100); // Cap score at 100
  }

  calculateIndividualPrice(context) {
    // This would be implemented based on your pricing logic
    // For now, returning a placeholder value
    return context.basePrice || 0;
  }

  // Bundle Validation
  validateBundle(bundle) {
    const errors = [];

    // Check for duplicate names
    if (this.bundles.some(b => b.name === bundle.name && b.id !== bundle.id)) {
      errors.push('A bundle with this name already exists');
    }

    // Check for overlapping active periods
    const overlappingBundles = this.bundles.filter(b => {
      if (b.id === bundle.id) return false;
      if (!b.isActive() || !bundle.isActive()) return false;

      const bStart = b.startDate || new Date(0);
      const bEnd = b.endDate || new Date('9999-12-31');
      const bundleStart = bundle.startDate || new Date(0);
      const bundleEnd = bundle.endDate || new Date('9999-12-31');

      return (
        (bundleStart >= bStart && bundleStart <= bEnd) ||
        (bundleEnd >= bStart && bundleEnd <= bEnd) ||
        (bundleStart <= bStart && bundleEnd >= bEnd)
      );
    });

    if (overlappingBundles.length > 0) {
      errors.push('Active period overlaps with existing bundles');
    }

    // Check for conflicting conditions
    const conflictingBundles = this.bundles.filter(b => {
      if (b.id === bundle.id) return false;
      return b.conditions.some(bc => 
        bundle.conditions.some(c => 
          bc.type === c.type && 
          bc.value === c.value &&
          bc.startDate === c.startDate &&
          bc.endDate === c.endDate
        )
      );
    });

    if (conflictingBundles.length > 0) {
      errors.push('Bundle has conflicting conditions with existing bundles');
    }

    return errors;
  }

  // Bundle Comparison
  compareBundles(bundleId1, bundleId2) {
    const bundle1 = this.getBundle(bundleId1);
    const bundle2 = this.getBundle(bundleId2);

    if (!bundle1 || !bundle2) {
      throw new Error('One or both bundles not found');
    }

    return bundle1.compareWith(bundle2);
  }
}

export default BundleService; 