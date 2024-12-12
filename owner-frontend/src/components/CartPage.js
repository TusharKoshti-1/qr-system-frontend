import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const CartPage = () => {
  const { state } = useLocation();
  const { name, phone, selectedItems, total } = state || {};
  const navigate = useNavigate();

  const handleIncreaseQuantity = (item) => {
    // Increase item quantity in selectedItems
  };

  const handleDecreaseQuantity = (item) => {
    // Decrease item quantity in selectedItems
  };

  const handleRemoveItem = (item) => {
    // Remove item from selectedItems
  };

  const handleSubmitOrder = () => {
    // Submit the order and proceed to payment page
  };

  return (
    <div className="cart-page-container">
      <h2>Order Summary</h2>
      <div className="order-details">
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
        <p>Total: ₹{total}</p>
      </div>
      <button onClick={handleSubmitOrder}>Submit Order</button>
      <div className="payment-options">
        <button>Pay with Cash</button>
        <button>Pay Online</button>
      </div>
    </div>
  );
};

export default CartPage;
