import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const API = import.meta.env.VITE_API_URL;

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products/all`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleAddToCart = (product) => {
    setCart([...cart, product]);        
    navigate("/cart");                  
  };

  return (
    <div className="product-container">
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <h4>🛒 Product List</h4>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <div className="product-grid">
          {products.map((product) => (
            <div className="product-card" key={product._id}>
              <div className="product-name">{product.name}</div>
              <div className="product-price">₹{product.price}</div>
              <button className="buy-btn" onClick={() => handleAddToCart(product)}>
                Add To Cart
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
