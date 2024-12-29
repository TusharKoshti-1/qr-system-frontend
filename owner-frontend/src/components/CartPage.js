import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CartPage.css";

const CartPage = () => {
  const { state } = useLocation();
  const { name, phone, selectedItems, } = state || {};
  const navigate = useNavigate();
  const [items, setItems] = useState(selectedItems || []);

  useEffect(() => {
    if (!selectedItems || selectedItems.length === 0) {
      navigate("/customerpage");
    }
  }, [selectedItems, navigate]);

  const handleIncreaseQuantity = (item) => {
    setItems(
      items.map((selectedItem) =>
        selectedItem.id === item.id
          ? { ...selectedItem, quantity: selectedItem.quantity + 1 }
          : selectedItem
      )
    );
  };

  const handleDecreaseQuantity = (item) => {
    if (item.quantity > 1) {
      setItems(
        items.map((selectedItem) =>
          selectedItem.id === item.id
            ? { ...selectedItem, quantity: selectedItem.quantity - 1 }
            : selectedItem
        )
      );
    }
  };

  const handleRemoveItem = (item) => {
    setItems(items.filter((selectedItem) => selectedItem.id !== item.id));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const handleCashPayment = async () => {
    const total = calculateTotal();
    try {
      await axios.post("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/orders", {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        } } ,{
        customer_name: name,
        phone,
        items,
        total_amount: total,
        payment_method: "Cash",
      });
      alert("Your order has been placed successfully! Please pay with cash at the counter.");
      navigate("/thankyou", { state: { name, phone, items, total, payment: "Cash" } });
    } catch (error) {
      console.error("Error placing order:", error);
      alert("Failed to place order. Please try again.");
    }
  };
  

  const handleOnlinePayment = () => {
    alert("Redirecting to online payment gateway...");
    navigate("/thankyou", { state: { name, phone, items, total: calculateTotal(), payment: "Online" } });
  };

  return (
    <div className="cart-page-container">
      <h2>Cart</h2>
      <div className="cart-items">
        {items.map((item) => (
          <div key={item.id} className="cart-item">
            <div className="item-details">
              {item.name} <br></br>₹{item.price} x {item.quantity}
            </div>
            <div className="item-actions">
              <button className="quantity-btn" onClick={() => handleIncreaseQuantity(item)}>
                +
              </button>
              <button className="quantity-btn" onClick={() => handleDecreaseQuantity(item)}>
                -
              </button>
              <button className="remove-btn" onClick={() => handleRemoveItem(item)}>
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="cart-total">
        <h3>Total Amount: ₹{calculateTotal()}</h3>
      </div>
      <div className="payment-options">
        <button className="payment-btn cash-btn" onClick={handleCashPayment}>
          Cash Payment
        </button>
        <button className="payment-btn online-btn" onClick={handleOnlinePayment}>
          Online Payment
        </button>
      </div>
    </div>
  );
};

export default CartPage;
