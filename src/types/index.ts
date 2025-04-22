export interface RateCard {
  id: string;
  name: string;
  type: string;
  description: string;
  category: string;
  rates: Record<string, number>;
  addOns: string[];
  isActive: boolean;
  createdAt: string;
}

export interface Plan {
  id: string;
  name: string;
  description: string;
  category: string;
  duration: number;
  price: number;
  isRecurring: boolean;
  renewalDiscount: number;
  maxRenewals: number;
  isActive: boolean;
  features: string[];
}

export interface AddOn {
  id: string;
  name: string;
  icon: string;
  category: string;
  description: string;
  price: number;
  features: string[];
  active: boolean;
}

export interface Discount {
  id: string;
  name: string;
  icon: string;
  description: string;
  rules: {
    type: 'fixed' | 'percentage' | 'tiered';
    discount: number;
    duration?: number;
    tiers?: Array<{
      quantity: number;
      discount: number;
    }>;
  };
  conditions: string[];
  isActive: boolean;
  category: string;
}

export interface RateType {
  id: string;
  name: string;
  icon: string;
  description: string;
  useCases: string[];
  examples: string[];
  features: string[];
  fields: string[];
}

export interface AppState {
  rateCards: RateCard[];
  plans: Plan[];
  addOns: AddOn[];
  discounts: Discount[];
  rateTypes: RateType[];
}

export interface AppContextType extends AppState {
  addRateCard: (rateCard: RateCard) => void;
  updateRateCard: (id: string, updates: Partial<RateCard>) => void;
  deleteRateCard: (id: string) => void;
  addPlan: (plan: Plan) => void;
  updatePlan: (id: string, updates: Partial<Plan>) => void;
  deletePlan: (id: string) => void;
  setAddOns: (addOns: AddOn[]) => void;
  setDiscounts: (discounts: Discount[]) => void;
  setRateTypes: (rateTypes: RateType[]) => void;
} 