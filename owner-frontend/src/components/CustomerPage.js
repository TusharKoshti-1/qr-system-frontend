import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerPage.css";

const CustomerPage = () => {
  const { state } = useLocation();
  const { name, phone } = state || {};
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [total, setTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/menu");
        setMenuItems(response.data);
      } catch (error) {
        console.error("Error fetching menu items:", error);
      }
    };
    fetchMenu();
  }, []);

  useEffect(() => {
    const calculateTotal = () => {
      const totalAmount = selectedItems.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
      setTotal(totalAmount);
    };
    calculateTotal();
  }, [selectedItems]);

  const handleAddItem = (item) => {
    const existingItem = selectedItems.find(
      (selectedItem) => selectedItem.id === item.id
    );
    if (existingItem) {
      setSelectedItems(
        selectedItems.map((selectedItem) =>
          selectedItem.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
            : selectedItem
        )
      );
    } else {
      setSelectedItems([...selectedItems, { ...item, quantity: 1 }]);
    }
  };

  const handleIncreaseQuantity = (item) => {
    setSelectedItems(
      selectedItems.map((selectedItem) =>
        selectedItem.id === item.id
          ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
          : selectedItem
      )
    );
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setSelectedItems(
        selectedItems.map((selectedItem) =>
          selectedItem.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity - 1 }
            : selectedItem
        )
      );
    } else {
      setSelectedItems(
        selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
      );
    }
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(
      selectedItems.filter((selectedItem) => selectedItem.id !== item.id)
    );
  };

  const handleGoToCart = () => {
    navigate("/cartpage", { state: { name, phone, selectedItems, total } });
  };

  return (
    <div className="customer-page-container">
      <h2>Hello, {name}!</h2>
      <div className="menu-items">
        {menuItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} />
            <p>{item.name}</p>
            <p>₹{item.price}</p>
            <button onClick={() => handleAddItem(item)}>Add</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h3>Your Cart</h3>
        <ul>
          {selectedItems.map((item) => (
            <li key={item.id}>
              {item.name} - ₹{item.price} x {item.quantity}
              <button onClick={() => handleIncreaseQuantity(item)}>+</button>
              <button onClick={() => handleDecreaseQuantity(item)}>-</button>
              <button onClick={() => handleRemoveItem(item)}>Remove</button>
            </li>
          ))}
        </ul>
        <h4>Total: ₹{total}</h4>
        <button onClick={handleGoToCart}>Go to Cart</button>
      </div>
    </div>
  );
};

export default CustomerPage;
