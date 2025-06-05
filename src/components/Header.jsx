import React from "react";
import { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";
import "./Header.css"; // 👈 Import the new CSS

export default function Header() {
  const { user } = useContext(AppContext);
  return (
    <div className="header">
      <h1>My Online Shop</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/cart">Cart</Link>
        {user.token ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
}
