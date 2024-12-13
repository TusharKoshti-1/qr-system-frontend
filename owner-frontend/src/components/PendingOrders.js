import React, { useState, useEffect } from "react";
import axios from "axios";
import "./PendingOrders.css";

const PendingOrders = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [updatedItems, setUpdatedItems] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
    fetchOrders();
  }, []);

  const handleMarkCompleted = async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${id}`, { status: "Completed" });
      setOrders(orders.map(order => order.id === id ? { ...order, status: "Completed" } : order));
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/orders/${id}`);
      setOrders(orders.filter(order => order.id !== id));
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  const handlePrintOrder = (order) => {
    const orderDetails = `
      Customer: ${order.customer_name}\n
      Phone: ${order.phone}\n
      Items: ${order.items.map(item => `${item.name} x ${item.quantity}`).join(", ")}\n
      Total: ₹${order.total_amount}\n
      Payment Method: ${order.payment_method}
    `;
    window.alert(orderDetails);
    window.print();
  };

  const handleEditOrder = (order) => {
    setEditingOrder(order);
    setUpdatedItems(order.items); // Initialize with current items
  };

  const handleSaveOrder = async (orderId) => {
    try {
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        items: updatedItems,
        total_amount: updatedItems.reduce((total, item) => total + item.price * item.quantity, 0),
      });
      setEditingOrder(null);
      setOrders(
        orders.map(order =>
          order.id === orderId ? { ...order, items: updatedItems } : order
        )
      );
    } catch (error) {
      console.error("Error saving updated order:", error);
    }
  };

  const handleItemChange = (index, field, value) => {
    setUpdatedItems(
      updatedItems.map((item, i) =>
        i === index ? { ...item, [field]: value } : item
      )
    );
  };

  return (
    <div className="pending-orders-container">
      <h2>Pending Orders</h2>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order.id} className="order-card">
            <h3>{order.customer_name}</h3>
            <p>Phone: {order.phone}</p>
            <p>Payment Method: {order.payment_method}</p>
            <p>Total Amount: ₹{order.total_amount}</p>
            <p>Status: {order.status}</p>
            <div className="order-items">
              <h4>Items:</h4>
              <ul>
                {editingOrder?.id === order.id
                  ? updatedItems.map((item, index) => (
                      <li key={index}>
                        <input
                          type="text"
                          value={item.name}
                          onChange={(e) => handleItemChange(index, "name", e.target.value)}
                        />
                        <input
                          type="number"
                          value={item.quantity}
                          onChange={(e) => handleItemChange(index, "quantity", e.target.value)}
                        />
                        <input
                          type="number"
                          value={item.price}
                          onChange={(e) => handleItemChange(index, "price", e.target.value)}
                        />
                      </li>
                    ))
                  : order.items.map((item, index) => (
                      <li key={index}>
                        {item.name} - ₹{item.price} x {item.quantity}
                      </li>
                    ))}
              </ul>
            </div>
            <div className="order-actions">
              {editingOrder?.id === order.id ? (
                <button onClick={() => handleSaveOrder(order.id)}>Save</button>
              ) : (
                <button onClick={() => handleEditOrder(order)}>Edit</button>
              )}
              <button onClick={() => handleMarkCompleted(order.id)}>Mark as Completed</button>
              <button onClick={() => handlePrintOrder(order)}>Print</button>
              <button onClick={() => handleDeleteOrder(order.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PendingOrders;
