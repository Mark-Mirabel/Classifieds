import React, { createContext, useContext, useState, useEffect } from 'react';
import { AppContextType, AppState } from '../types';

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    rateCards: [],
    plans: [],
    addOns: [],
    discounts: [],
    rateTypes: []
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Load all data from localStorage on mount
  useEffect(() => {
    const loadData = () => {
      try {
        const savedRateCards = localStorage.getItem('rateCards');
        const savedPlans = localStorage.getItem('plans');
        const savedAddOns = localStorage.getItem('addOns');
        const savedDiscounts = localStorage.getItem('discounts');
        const savedRateTypes = localStorage.getItem('rateTypes');

        setState({
          rateCards: savedRateCards ? JSON.parse(savedRateCards) : [],
          plans: savedPlans ? JSON.parse(savedPlans) : [],
          addOns: savedAddOns ? JSON.parse(savedAddOns) : [],
          discounts: savedDiscounts ? JSON.parse(savedDiscounts) : [],
          rateTypes: savedRateTypes ? JSON.parse(savedRateTypes) : []
        });
      } catch (err) {
        setError('Failed to load data from storage');
        console.error('Error loading data:', err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('rateCards', JSON.stringify(state.rateCards));
      localStorage.setItem('plans', JSON.stringify(state.plans));
      localStorage.setItem('addOns', JSON.stringify(state.addOns));
      localStorage.setItem('discounts', JSON.stringify(state.discounts));
      localStorage.setItem('rateTypes', JSON.stringify(state.rateTypes));
    } catch (err) {
      setError('Failed to save data to storage');
      console.error('Error saving data:', err);
    }
  }, [state]);

  const addRateCard = (rateCard: AppState['rateCards'][0]) => {
    setState(prev => ({
      ...prev,
      rateCards: [...prev.rateCards, rateCard]
    }));
  };

  const updateRateCard = (id: string, updates: Partial<AppState['rateCards'][0]>) => {
    setState(prev => ({
      ...prev,
      rateCards: prev.rateCards.map(card => 
        card.id === id ? { ...card, ...updates } : card
      )
    }));
  };

  const deleteRateCard = (id: string) => {
    setState(prev => ({
      ...prev,
      rateCards: prev.rateCards.filter(card => card.id !== id)
    }));
  };

  const addPlan = (plan: AppState['plans'][0]) => {
    setState(prev => ({
      ...prev,
      plans: [...prev.plans, plan]
    }));
  };

  const updatePlan = (id: string, updates: Partial<AppState['plans'][0]>) => {
    setState(prev => ({
      ...prev,
      plans: prev.plans.map(plan => 
        plan.id === id ? { ...plan, ...updates } : plan
      )
    }));
  };

  const deletePlan = (id: string) => {
    setState(prev => ({
      ...prev,
      plans: prev.plans.filter(plan => plan.id !== id)
    }));
  };

  const value: AppContextType = {
    ...state,
    addRateCard,
    updateRateCard,
    deleteRateCard,
    addPlan,
    updatePlan,
    deletePlan,
    setAddOns: (addOns) => setState(prev => ({ ...prev, addOns })),
    setDiscounts: (discounts) => setState(prev => ({ ...prev, discounts })),
    setRateTypes: (rateTypes) => setState(prev => ({ ...prev, rateTypes }))
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}; 