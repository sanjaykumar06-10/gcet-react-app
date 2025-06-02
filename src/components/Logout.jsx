import React, { useEffect, useContext, useState } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const { setUser } = useContext(AppContext);
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Log out the user
    setUser(null);
    navigate("/login");

    // ✅ Fetch products correctly
    fetch("http://localhost:8080/product")
      .then((res) => res.json()) // ✅ fix here
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <div>
      <div>Logging out...</div>
      <div>
        <h3>Products (fetched on logout):</h3>
        {products.length === 0 ? (
          <p>No products loaded.</p>
        ) : (
          <ul>
            {products.map((prod) => (
              <li key={prod.id}>
                {prod.name} - ${prod.price}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
