import React, { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import axios from "axios";

export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);

 
  //const API = import.meta.env.VITE_API_URL || "http://localhost:8080";
const API = import.meta.env.VITE_API_URL 
  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${API}/products`);
      setProducts(res.data);
    } catch (err) {
      console.error("Error fetching products:", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <h3>Welcome {user?.name || "Guest"}! </h3>
      <h4>Product Lists</h4>
      {products.length === 0 ? (
        <p>No products found.</p>
      ) : (
        <ul>
          {products.map((value) => (
            <li key={value.id}>{value.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
