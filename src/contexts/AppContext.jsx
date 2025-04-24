import React, { createContext, useContext, useState, useEffect } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Centralized state
  const [rateCards, setRateCards] = useState([]);
  const [plans, setPlans] = useState([]);
  const [addOns, setAddOns] = useState([]);
  const [discounts, setDiscounts] = useState([]);
  const [rateTypes, setRateTypes] = useState([]);
  const [error, setError] = useState(null);

  // Load all data from localStorage on mount
  useEffect(() => {
    try {
      const loadData = () => {
        const savedRateCards = localStorage.getItem('rateCards');
        const savedPlans = localStorage.getItem('plans');
        const savedAddOns = localStorage.getItem('addOns');
        const savedDiscounts = localStorage.getItem('discounts');
        const savedRateTypes = localStorage.getItem('rateTypes');

        if (savedRateCards) setRateCards(JSON.parse(savedRateCards));
        if (savedPlans) {
          const parsedPlans = JSON.parse(savedPlans);
          setPlans(parsedPlans);
        } else {
          // Initialize with sample plans if none exist
          const samplePlans = [
            {
              id: '1',
              name: 'Basic Real Estate Listing',
              description: 'Standard real estate listing with basic features',
              category: 'Real Estate',
              duration: 30,
              price: 29.99,
              isRecurring: true,
              renewalDiscount: 10,
              maxRenewals: 12,
              isActive: true,
              features: [
                '30-day listing duration',
                'Basic listing format',
                'One photo included',
                'Standard placement'
              ]
            },
            {
              id: '2',
              name: 'Premium Real Estate Listing',
              description: 'Enhanced real estate listing with premium features',
              category: 'Real Estate',
              duration: 60,
              price: 49.99,
              isRecurring: true,
              renewalDiscount: 15,
              maxRenewals: 12,
              isActive: true,
              features: [
                '60-day listing duration',
                'Enhanced listing format',
                'Up to 5 photos',
                'Priority placement',
                'Featured badge'
              ]
            }
          ];
          setPlans(samplePlans);
          localStorage.setItem('plans', JSON.stringify(samplePlans));
        }
        if (savedAddOns) setAddOns(JSON.parse(savedAddOns));
        if (savedDiscounts) setDiscounts(JSON.parse(savedDiscounts));
        if (savedRateTypes) setRateTypes(JSON.parse(savedRateTypes));
      };

      loadData();
    } catch (err) {
      setError('Failed to load data from storage');
      console.error('Error loading data:', err);
    }
  }, []);

  // Save data to localStorage when it changes
  useEffect(() => {
    try {
      localStorage.setItem('rateCards', JSON.stringify(rateCards));
      localStorage.setItem('plans', JSON.stringify(plans));
      localStorage.setItem('addOns', JSON.stringify(addOns));
      localStorage.setItem('discounts', JSON.stringify(discounts));
      localStorage.setItem('rateTypes', JSON.stringify(rateTypes));
    } catch (err) {
      setError('Failed to save data to storage');
      console.error('Error saving data:', err);
    }
  }, [rateCards, plans, addOns, discounts, rateTypes]);

  // Helper functions
  const addRateCard = (rateCard) => {
    setRateCards(prev => [...prev, rateCard]);
  };

  const updateRateCard = (id, updates) => {
    setRateCards(prev => 
      prev.map(card => card.id === id ? { ...card, ...updates } : card)
    );
  };

  const deleteRateCard = (id) => {
    setRateCards(prev => prev.filter(card => card.id !== id));
  };

  const addPlan = (plan) => {
    const newPlan = {
      ...plan,
      id: Date.now().toString(),
      isActive: true,
      features: plan.features || []
    };
    setPlans(prevPlans => {
      const updatedPlans = [...prevPlans, newPlan];
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      console.log('Added new plan:', newPlan);
      console.log('Updated plans array:', updatedPlans);
      return updatedPlans;
    });
    return newPlan;
  };

  const updatePlan = (id, updates) => {
    setPlans(prevPlans => {
      const updatedPlans = prevPlans.map(plan => 
        plan.id === id ? { ...plan, ...updates } : plan
      );
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      console.log('Updated plan with ID:', id);
      console.log('Updated plans array:', updatedPlans);
      return updatedPlans;
    });
  };

  const deletePlan = (id) => {
    setPlans(prevPlans => {
      const updatedPlans = prevPlans.filter(plan => plan.id !== id);
      localStorage.setItem('plans', JSON.stringify(updatedPlans));
      console.log('Deleted plan with ID:', id);
      console.log('Updated plans array:', updatedPlans);
      return updatedPlans;
    });
  };

  const value = {
    rateCards,
    plans,
    addOns,
    discounts,
    rateTypes,
    error,
    addRateCard,
    updateRateCard,
    deleteRateCard,
    addPlan,
    updatePlan,
    deletePlan,
    setAddOns,
    setDiscounts,
    setRateTypes
  };

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