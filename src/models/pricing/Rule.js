export class Rule {
  constructor({
    id,
    name,
    description,
    priority = 0,
    conditions = [],
    actions = [],
    isActive = true,
    startDate,
    endDate,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.name = name;
    this.description = description;
    this.priority = priority;
    this.conditions = conditions;
    this.actions = actions;
    this.isActive = isActive;
    this.startDate = startDate;
    this.endDate = endDate;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  evaluate(context) {
    if (!this.isActive) return false;
    if (this.startDate && new Date() < this.startDate) return false;
    if (this.endDate && new Date() > this.endDate) return false;

    return this.conditions.every(condition => condition.evaluate(context));
  }

  apply(context) {
    if (!this.evaluate(context)) return context;

    let result = { ...context };
    this.actions.forEach(action => {
      result = action.apply(result);
    });
    return result;
  }

  toJSON() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      priority: this.priority,
      conditions: this.conditions.map(c => c.toJSON()),
      actions: this.actions.map(a => a.toJSON()),
      isActive: this.isActive,
      startDate: this.startDate,
      endDate: this.endDate,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export class RuleCondition {
  constructor({
    id,
    target,
    operator,
    value,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.target = target;
    this.operator = operator;
    this.value = value;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  evaluate(context) {
    const contextValue = context[this.target];
    
    switch (this.operator) {
      case 'equals':
        return contextValue === this.value;
      case 'notEquals':
        return contextValue !== this.value;
      case 'greaterThan':
        return contextValue > this.value;
      case 'lessThan':
        return contextValue < this.value;
      case 'greaterThanOrEqual':
        return contextValue >= this.value;
      case 'lessThanOrEqual':
        return contextValue <= this.value;
      case 'contains':
        return Array.isArray(contextValue) && contextValue.includes(this.value);
      case 'notContains':
        return Array.isArray(contextValue) && !contextValue.includes(this.value);
      case 'in':
        return Array.isArray(this.value) && this.value.includes(contextValue);
      case 'notIn':
        return Array.isArray(this.value) && !this.value.includes(contextValue);
      case 'startsWith':
        return typeof contextValue === 'string' && contextValue.startsWith(this.value);
      case 'endsWith':
        return typeof contextValue === 'string' && contextValue.endsWith(this.value);
      case 'matches':
        return typeof contextValue === 'string' && new RegExp(this.value).test(contextValue);
      case 'dateInRange':
        if (!contextValue || !this.value.start || !this.value.end) return false;
        const date = new Date(contextValue);
        return date >= new Date(this.value.start) && date <= new Date(this.value.end);
      case 'countGreaterThan':
        return Array.isArray(contextValue) && contextValue.length > this.value;
      case 'countLessThan':
        return Array.isArray(contextValue) && contextValue.length < this.value;
      default:
        return false;
    }
  }

  toJSON() {
    return {
      id: this.id,
      target: this.target,
      operator: this.operator,
      value: this.value,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
}

export class RuleAction {
  constructor({
    id,
    type,
    value,
    target,
    createdAt = new Date(),
    updatedAt = new Date()
  }) {
    this.id = id;
    this.type = type;
    this.value = value;
    this.target = target;
    this.createdAt = createdAt;
    this.updatedAt = updatedAt;
  }

  apply(context) {
    const result = { ...context };

    switch (this.type) {
      case 'overridePrice':
        result.price = this.value;
        break;
      case 'applyDiscount':
        if (typeof this.value === 'number') {
          result.price = result.price * (1 - this.value / 100);
        } else if (typeof this.value === 'object' && this.value.amount) {
          result.price = result.price - this.value.amount;
        }
        break;
      case 'addFreeAddOn':
        if (!result.addOns) result.addOns = [];
        if (!result.addOns.includes(this.value)) {
          result.addOns.push(this.value);
        }
        break;
      case 'removeAddOn':
        if (result.addOns) {
          result.addOns = result.addOns.filter(addOn => addOn !== this.value);
        }
        break;
      case 'setDuration':
        result.duration = this.value;
        break;
      case 'setPublicationCount':
        result.publicationCount = this.value;
        break;
      case 'setCategory':
        result.category = this.value;
        break;
      case 'setClient':
        result.client = this.value;
        break;
      case 'applyBulkDiscount':
        if (result.quantity >= this.value.minQuantity) {
          result.price = result.price * (1 - this.value.discount / 100);
        }
        break;
      case 'setCustomField':
        if (!result.customFields) result.customFields = {};
        result.customFields[this.target] = this.value;
        break;
    }

    return result;
  }

  toJSON() {
    return {
      id: this.id,
      type: this.type,
      value: this.value,
      target: this.target,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }
} 