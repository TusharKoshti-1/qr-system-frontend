import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PendingOrders.css";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [aggregatedItems, setAggregatedItems] = useState([]);
  const navigate = useNavigate();

  // Function to aggregate items across orders
  const aggregateItems = (orders) => {
    const itemMap = {};

    orders.forEach((order) => {
      order.items.forEach((item) => {
        if (itemMap[item.name]) {
          itemMap[item.name].quantity += item.quantity;
        } else {
          itemMap[item.name] = {
            name: item.name,
            quantity: item.quantity,
          };
        }
      });
    });

    const aggregatedList = Object.values(itemMap);
    setAggregatedItems(aggregatedList);
  };

  // Fetch orders and sort them
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/orders" , {
          headers: {
            'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
          } });
        setOrders(response.data);
        aggregateItems(response.data); // Aggregate items for totals
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    fetchOrders();
  
    // Set up WebSocket connection
    const ws = new WebSocket("ws://localhost:5001");
  
    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "new_order") {
        // Prepend new order to the orders list
        setOrders((prevOrders) => {
          const updatedOrders = [data.order, ...prevOrders];
          aggregateItems(updatedOrders); // Aggregate items with the new order included
          return updatedOrders;
        });
      } else if (data.type === "update_order") {
        setOrders((prevOrders) =>
          prevOrders.map((order) =>
            order.id === data.id ? { ...order, status: data.status } : order
          )
        );
        aggregateItems(orders); // Recompute aggregated items after order update
      }
    };
  
    return () => {
      ws.close(); // Clean up WebSocket connection
    };
  }, []);

  const handleEditOrder = (order) => {
    navigate("/edititems", { state: { order } });
  };

  const handlePrintOrder = (order) => {
    const orderDetails = `
      Customer: ${order.customer_name}
      Phone: ${order.phone}
      Items:
      ${order.items.map((item) => ` - ${item.name}: ₹${item.price} x ${item.quantity}`).join("\n")}
      Total Amount: ₹${order.total_amount}
      Payment Method: ${order.payment_method}
    `;
    const newWindow = window.open("", "Print", "height=600,width=800");
    newWindow.document.write(`<pre>${orderDetails}</pre>`);
    newWindow.document.close();
    newWindow.print();
  };

  const handleOrderComplete = async (id) => {
    try {
      await axios.put(`https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/orders/${id}`, { status: "Completed" } , {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        } });
      const updatedOrders = orders.filter((order) => order.id !== id); // Remove from pending list
      setOrders(updatedOrders);
      aggregateItems(updatedOrders); // Recompute item totals
    } catch (error) {
      console.error("Error marking order as completed:", error);
    }
  };

  return (
    <div className="pending-orders-container">
      <h2>Pending Orders</h2>

      {/* Aggregated Items Section */}
      <div className="aggregated-items-container">
        <h3>Total Quantities</h3>
        <ul className="aggregated-items-list">
          {aggregatedItems.map((item, index) => (
            <li key={index} className="aggregated-item">
              <span className="item-name"><strong>{item.name}</strong></span>
              <span className="quantity">{item.quantity}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.customer_name}</h3>
            <p>Phone: {order.phone}</p>
            <p>Payment Method: {order.payment_method}</p>
            <p><strong>Total Amount: ₹{order.total_amount}</strong></p>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {order.items.map((item, index) => (
                  <li key={index}>
                    <span className="item-name">{item.name}</span>
                    <span className="item-details"> - ₹{item.price} x {item.quantity}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="order-actions">
              <button className="edit-btn" onClick={() => handleEditOrder(order)}>
                Edit
              </button>
              <button className="print-btn" onClick={() => handlePrintOrder(order)}>
                Print
              </button>
              <button
                className="complete-btn"
                onClick={() => handleOrderComplete(order.id)}
              >
                Order Complete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
