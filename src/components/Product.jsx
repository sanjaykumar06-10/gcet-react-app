import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Product.css";

export default function Product() {
  const { user, cart, setCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const [showAddedMsg, setShowAddedMsg] = useState(false);
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
    const updatedCart = [...cart];
    const existingIndex = updatedCart.findIndex((item) => item._id === product._id);

    if (existingIndex !== -1) {
      updatedCart[existingIndex].quantity = (updatedCart[existingIndex].quantity || 1) + 1;
    } else {
      updatedCart.push({ ...product, quantity: 1 });
    }

    setCart(updatedCart);

    // Show confirmation message
    setShowAddedMsg(true);
    setTimeout(() => {
      setShowAddedMsg(false);
    }, 1000); // Hide after 2 seconds
  };

  const goToCart = () => {
    navigate("/cart");
  };

  return (
    <div className="product-container">
      <h3>Hello {user?.name || "Guest"}!</h3>
      <h4>🛒 Product List</h4>

      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <>
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

          {cart.length > 0 && (
            <div className="go-to-cart">
              {showAddedMsg && (
                <div className="added-message">
                  ✔️ Product added to cart!
                </div>
              )}
              <button onClick={goToCart}>🛒 Go to Cart</button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
