import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { createContext } from "react";
import "./App.css"; // includes layout, header, footer styling
import Product from "./components/Product";
import Cart from "./components/Cart";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Header from "./components/Header";
import Footer from "./components/Footer";

// App-wide context
export const AppContext = createContext();

function App() {
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  const [cart, setCart] = useState([]); 

  return (
    <AppContext.Provider value={{ users, setUsers, user, setUser ,cart ,setCart }}>
      <BrowserRouter>
        <div className="app-container">
          {/* Header section */}
          <Header />

          {/* Main content section */}
          <main className="main-content">
            <Routes>
              <Route index element={<Product />} />
              <Route path="/" element={<Product />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>

          {/* Footer section */}
          <Footer />
        </div>
      </BrowserRouter>
    </AppContext.Provider>
  );
}

export default App;
