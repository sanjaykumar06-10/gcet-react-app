import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Login.css";

export default function Login() {
  const { user, setUser } = useContext(AppContext);
  const [msg, setMsg] = useState();
  const Navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleSubmit = async () => {
    if (!user.email || !user.pass) {
      setMsg("Please enter both email and password.");
      return;
    }

    try {
      const url = `${API}/users/login`;
      const found = await axios.post(url, user);
      console.log("Login response:", found.data);

      if (found.data.loggedIn) {
        setUser(found.data);
        Navigate("/");
      } else {
        setMsg(found.data.message || "Invalid User or Password");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setMsg("Login failed. Check credentials or server.");
    }
  };

  const goToRegister = () => {
    Navigate("/register");
  };

  return (
    <div className="login-container">
      <h3>Login</h3>
      {msg && <div className="msg">{msg}</div>}
      <p>
        <input
          type="text"
          placeholder="Email address"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
