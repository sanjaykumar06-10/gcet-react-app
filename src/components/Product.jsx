import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AppContext } from '../App';  // Adjust path if needed

export default function Product() {
  const { user } = useContext(AppContext);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div>
      <h3>Welcome {user?.name || "Guest"}!</h3>
      <h4>Product List:</h4>
      {products.length === 0 ? (
        <p>No products available.</p>
      ) : (
        <ul>
          {products.map(prod => (
            <li key={prod.id}>
              {prod.name} - ₹{prod.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
