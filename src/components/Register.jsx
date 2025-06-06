import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Register.css";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({ name: "", email: "", password: "" });
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    try {
      if (!user.name || !user.email || !user.password) {
        alert("Please fill in all fields");
        return;
      }

    const url = `https://gcet-node-app-beige.vercel.app/users/register`;

      const response = await axios.post(url, user);
      console.log("Registered:", response.data);
      Navigate("/login");
    } catch (err) {
      console.error("Registration error:", err.response?.data || err.message);
      alert("Registration failed. Check console.");
    }
  };

  return (
    <div className="register-container">
      <h3>Register</h3>
      <input
        type="text"
        placeholder="Name"
        onChange={(e) => setUser({ ...user, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Email address"
        onChange={(e) => setUser({ ...user, email: e.target.value })}
      />
      <input
        type="password"
        placeholder="New Password"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSubmit}>Submit</button>
      <hr />
      {users?.map((value, idx) => (
        <li key={idx}>
          {value.name} - {value.email} - {value.password}
        </li>
      ))}
    </div>
  );
}
