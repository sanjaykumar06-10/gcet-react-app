import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Product from "./components/Product";
import Cart from "./components/Cart";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
    <BrowserRouter>
    <header>
      <h1> Venkat Sanjay </h1>
          <Link to="/">Home</Link>-
          <Link to="/cart">Cart</Link>
         <Link to="/login">login</Link>
      <hr />
    </header>
    <main>
          <Routes>
            <Route index element={<Product />} />
            <Route path="/" element={<Product/>}></Route>
            <Route path="/cart" element={<Cart/>}></Route>
            <Route path="/login" element={<Login/>}></Route>
          </Routes>
      <hr />
    </main>
    <footer>
      <p>&copy; 2025 MyPortfolio. All rights reserved.</p>
      <hr />
    </footer>
    <hr />
    </BrowserRouter>
    </div>
  );
}
export default App
