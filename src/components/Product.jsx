import React, { useContext } from "react";
import { AppContext } from "../App";

export default function Product() {
  const { user } = useContext(AppContext);

  return (
    <div>
      <h3>Welcome {user ? user.name : "Guest"}!</h3>
      <p>Product List</p>
    </div>
  );
}
