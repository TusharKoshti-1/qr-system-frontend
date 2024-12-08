import React, { useState, useEffect } from "react";
import axios from "axios";
import "./CustomerPage.css";

const CustomerPage = () => {
  const [showPopup, setShowPopup] = useState(true);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [orderMessage, setOrderMessage] = useState("");

  useEffect(() => {
    if (!showPopup) {
      const fetchMenu = async () => {
        try {
          const response = await axios.get("http://localhost:5000/api/menu");
          setMenuItems(response.data);
          setFilteredMenu(response.data); // Initialize filtered menu
        } catch (error) {
          console.error("Error fetching menu items:", error);
        }
      };
      fetchMenu();
    }
  }, [showPopup]);

  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchTerm(query);
    const filtered = menuItems.filter((item) =>
      item.name.toLowerCase().includes(query)
    );
    setFilteredMenu(filtered);
  };

  const handleAddItem = (item) => {
    setSelectedItems([...selectedItems, item]);
  };

  const handleRemoveItem = (item) => {
    setSelectedItems(selectedItems.filter((selectedItem) => selectedItem.id !== item.id));
  };

  const handleSubmitOrder = async () => {
    if (selectedItems.length === 0) {
      setOrderMessage("Please select at least one item to place an order.");
      return;
    }

    try {
      const orderDetails = selectedItems.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
      }));
      await axios.post("http://localhost:5000/api/place-order", {
        name,
        phone,
        items: orderDetails,
      });
      setOrderMessage("Your order has been placed successfully!");
      setSelectedItems([]);
    } catch (error) {
      console.error("Error placing order:", error);
      setOrderMessage("There was an error placing your order.");
    }
  };

  const handleSubmitPopup = () => {
    if (!name || !phone) {
      alert("Please enter both name and phone number.");
      return;
    }
    setShowPopup(false);
  };

  return (
    <div className="customer-page-container">
      {showPopup ? (
        <div className="popup">
          <h2>Enter Your Details</h2>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <button onClick={handleSubmitPopup}>Submit</button>
        </div>
      ) : (
        <>
          <h2>Welcome, {name}!</h2>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for items..."
              value={searchTerm}
              onChange={handleSearch}
            />
          </div>
          <div className="menu-items">
            <h3>Menu</h3>
            <div className="menu-horizontal">
              {filteredMenu.map((item) => (
                <div key={item.id} className="menu-item">
                  <img src={item.image} alt={item.name} className="item-image" />
                  <p>{item.name}</p>
                  <p>₹{item.price}</p>
                  <button onClick={() => handleAddItem(item)}>Add</button>
                </div>
              ))}
            </div>
          </div>

          <div className="selected-items">
            <h3>Your Order</h3>
            <ul>
              {selectedItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ₹{item.price}
                  <button onClick={() => handleRemoveItem(item)}>Remove</button>
                </li>
              ))}
            </ul>
          </div>

          <button onClick={handleSubmitOrder} className="submit-order-btn">
            Submit Order
          </button>

          {orderMessage && <p>{orderMessage}</p>}
        </>
      )}
    </div>
  );
};

export default CustomerPage;
