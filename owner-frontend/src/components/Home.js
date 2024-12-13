// src/components/PendingOrders.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Welcome to the Owner's Dashboard</h1>
      <div style={{ margin: "20px" }}>
        <Link to="/menu">
          <button style={styles.button}>Menu</button>
        </Link>
        <Link to="/add-order">
          <button style={styles.button}>Add Order</button>
        </Link>
        <Link to="/sales">
          <button style={styles.button}>Sales</button>
        </Link>
        <Link to="/pending-orders">
          <button style={styles.button}>Pending Orders</button>
        </Link>
      </div>
    </div>
  );
};

const styles = {
  button: {
    padding: "10px 20px",
    margin: "10px",
    fontSize: "16px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
  },
};

export default Home;
