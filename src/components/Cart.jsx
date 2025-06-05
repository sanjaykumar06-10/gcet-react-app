import React, { useContext } from "react";
import { AppContext } from "../App";
import "./Cart.css"; // 👈 Import the CSS

export default function Cart() {
  const { cart } = useContext(AppContext);

  return (
    <div className="cart-container">
      <h2>🛒 My Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item, index) => (
            <li key={index}>
              <span>{item.name}</span>
              <span>₹{item.price}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
