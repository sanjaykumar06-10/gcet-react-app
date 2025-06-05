import React, { useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";
import "./Cart.css";

export default function Cart() {
  const { cart, setCart, user } = useContext(AppContext);
  const API = import.meta.env.VITE_API_URL;

  const handleQuantityChange = (index, delta) => {
    const newCart = [...cart];
    const currentQty = newCart[index].quantity || 1;
    const updatedQty = currentQty + delta;

    if (updatedQty <= 0) {
      newCart.splice(index, 1); // remove item
    } else {
      newCart[index].quantity = updatedQty;
    }

    setCart(newCart);
  };

  const calculateTotal = () => {
    return cart.reduce(
      (total, item) => total + item.price * (item.quantity || 1),
      0
    );
  };

  const handlePay = async () => {
    if (!user || !user.email) {
      alert("Please login before placing an order");
      return;
    }

    if (cart.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    const orderValue = calculateTotal();

    try {
      const orderPayload = {
        email: user.email,
        products: cart.map((item) => ({
          productId: item._id,
          name: item.name,
          price: item.price,
          quantity: item.quantity || 1,
        })),
        orderValue,
      };

      const res = await axios.post(`${API}/orders/new`, orderPayload);

      alert("Order placed successfully!");

      setCart([]); // clear cart after order

    } catch (error) {
      console.error("Order placement failed:", error);
      alert("Failed to place order. Please try again.");
    }
  };

  return (
    <div className="cart-container">
      <h2>🛒 My Cart</h2>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="cart-list">
          {cart.map((item, index) => (
            <li key={index} className="cart-item">
              <span className="item-name">{item.name}</span>
              <span className="item-price">₹{item.price}</span>
              <div className="item-controls">
                <button onClick={() => handleQuantityChange(index, -1)}>-</button>
                <span className="qty">{item.quantity || 1}</span>
                <button onClick={() => handleQuantityChange(index, 1)}>+</button>
              </div>
            </li>
          ))}
        </ul>
      )}

      {cart.length > 0 && (
        <div className="cart-total">
          <h3>Total: ₹{calculateTotal()}</h3>
          <button className="pay-btn" onClick={handlePay}>Pay</button>
        </div>
      )}
    </div>
  );
}
