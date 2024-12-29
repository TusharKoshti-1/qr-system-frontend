import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditOrder.css";

const EditOrder = () => {
  const { state } = useLocation();
  const { order } = state || {}; // Get the order from state
  const navigate = useNavigate();

  const [menuItems, setMenuItems] = useState([]); // Available menu items
  const [editedItems, setEditedItems] = useState(order.items || []); // Items in the order
  const [total, setTotal] = useState(order.total_amount || 0);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/menu" , {
          headers: {
            'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
          } });
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };

    fetchMenu();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = editedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalAmount);
    };

    calculateTotal();
  }, [editedItems]);

  const handleAddItem = (item) => {
    const existingItem = editedItems.find((editedItem) => editedItem.id === item.id);
    if (existingItem) {
      setEditedItems(
        editedItems.map((editedItem) =>
          editedItem.id === item.id
            ? { ...editedItem, quantity: editedItem.quantity + 1 }
            : editedItem
        )
      );
    } else {
      setEditedItems([...editedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (item) => {
    setEditedItems(
      editedItems.map((editedItem) =>
        editedItem.id === item.id
          ? { ...editedItem, quantity: editedItem.quantity + 1 }
          : editedItem
      )
    );
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setEditedItems(
        editedItems.map((editedItem) =>
          editedItem.id === item.id
            ? { ...editedItem, quantity: editedItem.quantity - 1 }
            : editedItem
        )
      );
    } else {
      setEditedItems(
        editedItems.filter((editedItem) => editedItem.id !== item.id)
      );
    }
  };

  const handleRemoveItem = (item) => {
    setEditedItems(editedItems.filter((editedItem) => editedItem.id !== item.id));
  };

  const handleSaveOrder = async () => {
    const updatedOrder = {
      ...order,
      items: editedItems,
      total_amount: total,
    };
  
    try {
      await axios.put(`https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/updateorders/${order.id}`, updatedOrder , {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        } });
      navigate("/pending-orders"); // Ensure it redirects to the correct path
    } catch (error) {
      console.error("Error saving updated order:", error);
    }
  };
  
  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="edit-order-wrapper">
      <h2 className="edit-order-title">Edit Order for {order.customer_name}</h2>
      <p className="edit-order-subtitle">
        <strong>Phone:</strong> {order.phone}
      </p>
      <div className="edit-order-container">
        {/* Left Section: Menu Items */}
        <div className="edit-order-left">
          <input
            type="text"
            placeholder="Search for items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="edit-order-search-bar"
          />

          <div className="edit-order-menu">
            {filteredMenuItems.map((item) => (
              <div key={item.id} className="edit-order-menu-item">
                <img src={item.image} alt={item.name} className="edit-order-item-image" />
                <div className="edit-order-item-info">
                  <p className="edit-order-item-name">{item.name}</p>
                  <p className="edit-order-item-price">₹{item.price}</p>
                </div>
                <button
                  className="edit-order-add-btn"
                  onClick={() => handleAddItem(item)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section: Order Items */}
        <div className="edit-order-right">
          <h3 className="edit-order-cart-title">Order Items</h3>
          <ul className="edit-order-cart-list">
            {editedItems.map((item) => (
              <li key={item.id} className="edit-order-cart-item">
                <div className="edit-order-cart-item-info">
                  <p className="edit-order-cart-item-name">{item.name}</p>
                  <p className="edit-order-cart-item-price">
                    ₹{item.price} x {item.quantity}
                  </p>
                </div>
                <div className="edit-order-cart-item-actions">
                  <button onClick={() => handleIncreaseQuantity(item)}>+</button>
                  <button onClick={() => handleDecreaseQuantity(item)}>-</button>
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <h4 className="edit-order-total-amount">Total: ₹{total}</h4>
          <button className="edit-order-save-btn" onClick={handleSaveOrder}>
            Save Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditOrder;
