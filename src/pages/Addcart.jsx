
import React, { useState, useEffect } from 'react';
import './Homestore.css';
import { Link } from 'react-router-dom';

const Addcart = () => {
  const [cart, setCart] = useState([]);

  // Load cart from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCart(storedCart);
  }, []);

  // Remove item from cart
  const removeFromCart = (indexToRemove) => {
    const updatedCart = cart.filter((_, index) => index !== indexToRemove);
    setCart(updatedCart);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  if (cart.length === 0) {
    return (
      <div className="cart-container">
        <h1>No Items in your Cart</h1>
        <Link to="/homestore">← Go for Shopping</Link>
      </div>
    );
  }

  return (
    <div className="cart-container">
      <h1>🛒 Items in your Cart</h1>
      {cart.map((item, index) => (
        <div key={index} className="product-card">
          <img src={item.image} alt={item.title} className="product-image" />
          <h3>{item.title}</h3>
          <h2>Price: 💲{item.price}</h2>
          <p>{item.description.slice(0, 100)}...</p>
          <button onClick={() => removeFromCart(index)}>❌ Remove</button>
        </div>
      ))}
      <Link to="/homestore">← Continue Shopping</Link>
    </div>
  );
};

export default Addcart;
