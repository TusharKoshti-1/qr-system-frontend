// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/MenuPage";
import AddOrder from "./components/AddOrder";
import PendingOrders from "./components/PendingOrders";
import AddMenuItem from "./components/AddMenuItem";
import Sales from "./components/Sales";
import CartPage from "./components/CartPage";
import LandingPage from "./components/LandingPage";
import CustomerPage from "./components/CustomerPage"; // Import the new Sales component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PendingOrders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-menu" element={<AddMenuItem />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/customer" element={<CustomerPage/>} />
        <Route path="/cartpage" element={<CartPage/>}/>
        <Route path="/customerform" element={<LandingPage/>}/>
        <Route path="/sales" element={<Sales />} /> {/* New Sales Route */}
      </Routes>
    </Router>
  );
}

export default App;
