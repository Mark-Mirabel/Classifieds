export class ClientPricingAgreement {
  constructor({
    id,
    clientId,
    name,
    description,
    rateCardId,
    customRates = {},
    discounts = [],
    addOns = [],
    startDate,
    endDate,
    isActive = true,
    terms,
    notes,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.clientId = clientId;
    this.name = name;
    this.description = description;
    this.rateCardId = rateCardId;
    this.customRates = customRates;
    this.discounts = discounts;
    this.addOns = addOns;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isActive = isActive;
    this.terms = terms;
    this.notes = notes;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  isActive() {
    if (!this.isActive) return false;
    if (this.startDate && new Date() < this.startDate) return false;
    if (this.endDate && new Date() > this.endDate) return false;
    return true;
  }

  getCustomRate(category, type) {
    return this.customRates[`${category}-${type}`] || null;
  }

  calculatePrice(category, type, quantity = 1) {
    if (!this.isActive()) return null;

    const customRate = this.getCustomRate(category, type);
    if (customRate) {
      return customRate * quantity;
    }

    return null;
  }

  getApplicableDiscounts() {
    if (!this.isActive()) return [];
    return this.discounts.filter(discount => discount.isActive);
  }

  getIncludedAddOns() {
    if (!this.isActive()) return [];
    return this.addOns.filter(addOn => addOn.isActive);
  }

  toJSON() {
    return {
      id: this.id,
      clientId: this.clientId,
      name: this.name,
      description: this.description,
      rateCardId: this.rateCardId,
      customRates: this.customRates,
      discounts: this.discounts.map(d => d.toJSON()),
      addOns: this.addOns.map(a => a.toJSON()),
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive,
      terms: this.terms,
      notes: this.notes,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 