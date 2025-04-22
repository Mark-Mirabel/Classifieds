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

        console.log('Loading plans from localStorage:', savedPlans);

        if (savedRateCards) setRateCards(JSON.parse(savedRateCards));
        if (savedPlans) {
          const parsedPlans = JSON.parse(savedPlans);
          console.log('Parsed plans:', parsedPlans);
          setPlans(parsedPlans);
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
      console.log('Saving plans to localStorage:', plans);
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
    console.log('Adding new plan:', plan);
    const newPlan = {
      ...plan,
      id: Date.now().toString()
    };
    setPlans(prevPlans => {
      const updatedPlans = [...prevPlans, newPlan];
      console.log('Updated plans array:', updatedPlans);
      return updatedPlans;
    });
    return newPlan;
  };

  const updatePlan = (id, updates) => {
    console.log('Updating plan:', id, updates);
    setPlans(prevPlans => {
      const updatedPlans = prevPlans.map(plan => 
        plan.id === id ? { ...plan, ...updates } : plan
      );
      console.log('Updated plans array:', updatedPlans);
      return updatedPlans;
    });
  };

  const deletePlan = (id) => {
    console.log('Deleting plan:', id);
    setPlans(prevPlans => {
      const updatedPlans = prevPlans.filter(plan => plan.id !== id);
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