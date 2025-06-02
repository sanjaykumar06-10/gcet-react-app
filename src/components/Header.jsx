import React, { useContext } from "react";
import { AppContext } from "../App";
import { Link } from "react-router-dom";

export default function Header() {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h1>My Online Shop</h1>
      <Link to="/">Home</Link>-<Link to="/cart">Cart</Link>-
      {user ? (
        <Link to="/logout">Logout</Link>
      ) : (
        <Link to="/login">Login</Link>
      )}
      <hr />
    </div>
  );
}
