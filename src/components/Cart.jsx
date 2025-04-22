import React from 'react';
import { useCart } from '../contexts/CartContext';
import './Cart.css';

const Cart = () => {
  const { cart, showCart, setShowCart, removeFromCart, clearCart } = useCart();

  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.basePrice + 
      (item.addOns?.reduce((addOnTotal, addOn) => addOnTotal + addOn.price, 0) || 0), 0);
  };

  if (!showCart) return null;

  return (
    <div className="cart-overlay">
      <div className="cart-container">
        <div className="cart-header">
          <h2>Shopping Cart</h2>
          <button className="close-button" onClick={() => setShowCart(false)}>
            ×
          </button>
        </div>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="cart-items">
              {cart.map((item, index) => (
                <div key={index} className="cart-item">
                  <div className="item-details">
                    <h3>{item.category} Listing</h3>
                    <p>Duration: {item.duration} days</p>
                    <p>Base Price: ${item.basePrice.toFixed(2)}</p>
                    {item.addOns && item.addOns.length > 0 && (
                      <div className="item-addons">
                        <p>Add-ons:</p>
                        <ul>
                          {item.addOns.map((addOn, i) => (
                            <li key={i}>
                              {addOn.name} - ${addOn.price.toFixed(2)}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                  <button
                    className="remove-item"
                    onClick={() => removeFromCart(index)}
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>

            <div className="cart-summary">
              <div className="total">
                <span>Total:</span>
                <span>${calculateTotal().toFixed(2)}</span>
              </div>
              <div className="cart-actions">
                <button className="clear-cart" onClick={clearCart}>
                  Clear Cart
                </button>
                <button className="checkout-button">
                  Proceed to Checkout
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 