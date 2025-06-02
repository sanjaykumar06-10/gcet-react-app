import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const { users, user, setUser } = useContext(AppContext);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [msg, setMsg] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    const found = users.find(
      (u) => u.email === email.trim() && u.pass === pass.trim()
    );
    if (found) {
      setUser(found);
      setMsg("");
      navigate("/");
    } else {
      setMsg("Invalid email or password.");
    }
  };

  const goToRegister = () => {
    navigate("/register");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Login</h3>
      {msg && <p style={{ color: "red" }}>{msg}</p>}
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="Password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>
      <p>
        <button onClick={goToRegister}>Create Account</button>
      </p>
    </div>
  );
}
