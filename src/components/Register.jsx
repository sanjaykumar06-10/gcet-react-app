import React, { useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const { users, setUsers } = useContext(AppContext);
  const [user, setUser] = useState({ name: "", email: "", pass: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!user.name.trim() || !user.email.trim() || !user.pass.trim()) {
      setError("All fields are required.");
      return;
    }

    // Check if email already registered
    if (users.find((u) => u.email === user.email.trim())) {
      setError("Email already registered.");
      return;
    }

    setUsers([...users, user]);
    setError("");
    navigate("/login");
  };

  return (
    <div style={{ margin: "30px" }}>
      <h3>Register</h3>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <p>
        <input
          type="text"
          placeholder="Name"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
      </p>
      <p>
        <input
          type="text"
          placeholder="Email address"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
      </p>
      <p>
        <input
          type="password"
          placeholder="New Password"
          value={user.pass}
          onChange={(e) => setUser({ ...user, pass: e.target.value })}
        />
      </p>
      <button onClick={handleSubmit}>Submit</button>

      <hr />
      <h4>Registered Users:</h4>
      <ul>
        {users.map((value, idx) => (
          <li key={idx}>
            {value.name} - {value.email} - {value.pass}
          </li>
        ))}
      </ul>
    </div>
  );
}
