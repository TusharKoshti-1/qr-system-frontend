// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./components/Header";
import Menu from "./components/Menu";
import AddOrder from "./components/AddOrder";
import PendingOrders from "./components/PendingOrders";
import AddMenuItem from "./components/AddMenuItem";
import Sales from "./components/Sales"; // Import the new Sales component

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PendingOrders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-menu" element={<AddMenuItem />} />
        <Route path="/add-order" element={<AddOrder />} />
        <Route path="/sales" element={<Sales />} /> {/* New Sales Route */}
      </Routes>
    </Router>
  );
}

export default App;
