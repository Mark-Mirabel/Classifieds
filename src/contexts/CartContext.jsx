import React, { createContext, useContext, useState, useCallback } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);

  const addToCart = useCallback((item) => {
    setCart(prevCart => [...prevCart, item]);
    setShowCart(true);
  }, []);

  const removeFromCart = useCallback((itemId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== itemId));
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const updateCartItem = useCallback((itemId, updates) => {
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === itemId ? { ...item, ...updates } : item
      )
    );
  }, []);

  const value = {
    cart,
    showCart,
    setShowCart,
    addToCart,
    removeFromCart,
    clearCart,
    updateCartItem
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}; 