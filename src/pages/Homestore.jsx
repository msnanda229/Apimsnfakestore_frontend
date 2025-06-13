
import React, { useEffect, useState } from 'react';
import './Homestore.css';
import { Link, useNavigate } from 'react-router-dom';


const Homestore = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_URL}/api/msnfakestore`)
      .then(response => response.json())
      .then((data) => {
        setProducts(data.data);
        setFilteredProducts(data.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const gotocart = (item) => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = [...storedCart, item];
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  };

  const logout = () => {
    localStorage.clear();
    navigate('/');
  };

  const filterByCategory = (category) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter(product => product.category === category));
    }
  };

  return (
    <div className="store-container">

      {/* NavBar */}
      <header className="navbar">
        <div className="navbar-logo">🛍 MSN FAKE STORE</div>
        <nav className="nav-links">
          <Link to="/homestore" className="nav-link">Home</Link>
          <Link to="/addcart" className="nav-link">Cart</Link>
          <button onClick={logout} className="logout-button">Logout</button>
        </nav>
      </header>

      {/* Category Buttons */}
      <div className="category-buttons">
        <button onClick={() => filterByCategory('all')}>All</button>
        <button onClick={() => filterByCategory("men's clothing")}>Men</button>
        <button onClick={() => filterByCategory("women's clothing")}>Women</button>
        <button onClick={() => filterByCategory("jewelry")}>Jewelery</button>
        <button onClick={() => filterByCategory("electronics")}>Devices</button>
        <button onClick={() => filterByCategory("footwear")}>Footwear</button>
        <button onClick={() => filterByCategory("kitchen")}>kitchen</button>
      </div>
<div className="product-grid">
  {filteredProducts && filteredProducts.length > 0 ? (
    filteredProducts.map(product => (
      <div className="product-card" key={product._id || product.id}>
        <img 
          src={product.image} 
          alt={product.title || "Product image"} 
          className="product-image" 
        />
        <div className="product-title">{product.title || "No title"}</div>
        <div className="product-price">
          ${product.price != null ? product.price.toFixed(2) : "N/A"}
        </div>
        <div className="product-desc">
          {product.description ? product.description.slice(0, 80) + "..." : "No description"}
        </div>
        <button onClick={() => gotocart(product)}>Add to Cart</button>
      </div>
    ))
  ) : (
    <p>No products found</p>
  )}
</div>



    </div>
  );
};

export default Homestore;
