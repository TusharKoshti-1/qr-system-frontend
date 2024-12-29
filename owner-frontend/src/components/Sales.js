import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Sales.css";

const Sales = () => {
  const [dailySales, setDailySales] = useState([]);
  const [weeklySales, setWeeklySales] = useState([]);
  const [monthlySales, setMonthlySales] = useState([]);
  const [error, setError] = useState("");
  const [viewMode, setViewMode] = useState("daily"); // Options: 'daily', 'weekly', 'monthly'

  useEffect(() => {
    const fetchSalesData = async () => {
      try {
        if (viewMode === "daily") {
          const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/sales/daily" , {
            headers: {
              'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
            } });
          setDailySales(response.data);
        } else if (viewMode === "weekly") {
          const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/sales/weekly" , {
            headers: {
              'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
            } });
          setWeeklySales(response.data);
        } else if (viewMode === "monthly") {
          const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/sales/monthly" , {
            headers: {
              'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
            } });
          setMonthlySales(response.data);
        }
        setError(""); // Clear any previous error
      } catch (err) {
        console.error("Error fetching sales data:", err);
        setError("Failed to load sales data. Please try again later.");
      }
    };

    fetchSalesData();
  }, [viewMode]);

  const calculateTotalRevenue = (salesData) => {
    return salesData.reduce(
      (sum, order) => sum + parseFloat(order.total_revenue || 0),
      0
    ).toFixed(2);
  };

  const getTopSellingItems = (salesData) => {
    const itemMap = {};
    salesData.forEach((order) => {
      order.items.forEach((item) => {
        if (itemMap[item.name]) {
          itemMap[item.name].quantity += item.quantity;
          itemMap[item.name].revenue += item.quantity * item.price;
        } else {
          itemMap[item.name] = {
            name: item.name,
            quantity: item.quantity,
            revenue: item.quantity * item.price,
          };
        }
      });
    });

    // Convert to array and sort by quantity sold
    const itemArray = Object.values(itemMap);
    return itemArray.sort((a, b) => b.quantity - a.quantity).slice(0, 5); // Top 5 items
  };

  const renderSalesTable = (salesData) => (
    <table>
      <thead>
        <tr>
          <th>Item Name</th>
          <th>Quantity Sold</th>
          <th>Total Revenue (₹)</th>
        </tr>
      </thead>
      <tbody>
        {salesData.map((order, index) =>
          order.items.map((item, itemIndex) => (
            <tr key={`${index}-${itemIndex}`}>
              <td>{item.name}</td>
              <td>{item.quantity}</td>
              <td>₹{(item.quantity * item.price).toFixed(2)}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );

  const salesData =
    viewMode === "daily"
      ? dailySales
      : viewMode === "weekly"
      ? weeklySales
      : monthlySales;

  return (
    <div className="sales-container">
      <h1>Sales Analytics</h1>
      <div className="view-mode-buttons">
        <button
          className={viewMode === "daily" ? "active" : ""}
          onClick={() => setViewMode("daily")}
        >
          Daily
        </button>
        <button
          className={viewMode === "weekly" ? "active" : ""}
          onClick={() => setViewMode("weekly")}
        >
          Weekly
        </button>
        <button
          className={viewMode === "monthly" ? "active" : ""}
          onClick={() => setViewMode("monthly")}
        >
          Monthly
        </button>
      </div>
      {error ? (
        <p className="error-message">{error}</p>
      ) : (
        <>
          <div className="daily-revenue">
            <h2>{viewMode.charAt(0).toUpperCase() + viewMode.slice(1)} Revenue</h2>
            <p>
              <strong>
                Total Revenue: ₹{calculateTotalRevenue(salesData || [])}
              </strong>
            </p>
          </div>
          <div className="item-wise-sales">
            <h2>Item-Wise Sales</h2>
            {salesData.length > 0 ? (
              renderSalesTable(salesData)
            ) : (
              <p>No sales data available.</p>
            )}
          </div>
          <div className="top-selling-items">
            <h2>Top-Selling Items</h2>
            {salesData.length > 0 ? (
              <ul>
                {getTopSellingItems(salesData).map((item, index) => (
                  <li key={index}>
                    {item.name} - {item.quantity} sold (₹{item.revenue.toFixed(2)})
                  </li>
                ))}
              </ul>
            ) : (
              <p>No top-selling items available.</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Sales;
