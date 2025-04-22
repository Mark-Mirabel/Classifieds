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