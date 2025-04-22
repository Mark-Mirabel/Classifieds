export class Discount {
  constructor({
    id,
    name,
    description,
    type,
    value,
    minPurchase,
    maxDiscount,
    startDate,
    endDate,
    isActive = true,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.type = type;
    this.value = value;
    this.minPurchase = minPurchase;
    this.maxDiscount = maxDiscount;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  calculateDiscount(originalPrice) {
    if (!this.isActive) return 0;
    if (this.startDate && new Date() < this.startDate) return 0;
    if (this.endDate && new Date() > this.endDate) return 0;
    if (this.minPurchase && originalPrice < this.minPurchase) return 0;

    let discount = 0;
    if (this.type === 'percentage') {
      discount = originalPrice * (this.value / 100);
    } else if (this.type === 'fixed') {
      discount = this.value;
    }

    if (this.maxDiscount && discount > this.maxDiscount) {
      discount = this.maxDiscount;
    }

    return discount;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      type: this.type,
      value: this.value,
      minPurchase: this.minPurchase,
      maxDiscount: this.maxDiscount,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export class PromoCode {
  constructor({
    id,
    code,
    description,
    discountId,
    maxUses,
    currentUses = 0,
    isSingleUse = false,
    startDate,
    endDate,
    isActive = true,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.code = code;
    this.description = description;
    this.discountId = discountId;
    this.maxUses = maxUses;
    this.currentUses = currentUses;
    this.isSingleUse = isSingleUse;
    this.startDate = startDate;
    this.endDate = endDate;
    this.isActive = isActive;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  canBeUsed() {
    if (!this.isActive) return false;
    if (this.startDate && new Date() < this.startDate) return false;
    if (this.endDate && new Date() > this.endDate) return false;
    if (this.maxUses && this.currentUses >= this.maxUses) return false;
    return true;
  }

  use() {
    if (!this.canBeUsed()) return false;
    this.currentUses++;
    this.updatedAt = new Date();
    return true;
  }

  toJSON() {
    return {
      id: this.id,
      code: this.code,
      description: this.description,
      discountId: this.discountId,
      maxUses: this.maxUses,
      currentUses: this.currentUses,
      isSingleUse: this.isSingleUse,
      startDate: this.startDate,
      endDate: this.endDate,
      isActive: this.isActive,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 