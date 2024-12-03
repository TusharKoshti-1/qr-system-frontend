import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Menu from './components/Menu';
import AddOrder from './components/AddOrder';
import PendingOrders from './components/PendingOrders';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<PendingOrders />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/add-order" element={<AddOrder />} />
      </Routes>
    </Router>
  );
}

export default App;