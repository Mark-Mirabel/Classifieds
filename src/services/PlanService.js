import { Package } from '../models/pricing/Package';

class PlanService {
  constructor(plans = []) {
    this.plans = plans.map(plan => new Package(plan));
  }

  getAllPlans() {
    return this.plans;
  }

  getPlanById(id) {
    return this.plans.find(plan => plan.id === id);
  }

  getPlansByCategory(category) {
    return this.plans.filter(plan => plan.category === category);
  }

  getActivePlans() {
    return this.plans.filter(plan => plan.isActive);
  }

  createPlan(planData) {
    const newPlan = new Package(planData);
    this.plans.push(newPlan);
    return newPlan;
  }

  updatePlan(id, updates) {
    const index = this.plans.findIndex(plan => plan.id === id);
    if (index === -1) return null;
    
    const updatedPlan = new Package({
      ...this.plans[index].toJSON(),
      ...updates,
      updatedAt: new Date()
    });
    
    this.plans[index] = updatedPlan;
    return updatedPlan;
  }

  deletePlan(id) {
    const index = this.plans.findIndex(plan => plan.id === id);
    if (index === -1) return false;
    
    this.plans.splice(index, 1);
    return true;
  }
}

export default PlanService; 