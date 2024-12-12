import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./CustomerPage.css";

const CustomerPage = () => {
  const { state } = useLocation();
  const { name, phone } = state || {};
  const [menuItems, setMenuItems] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [categories, setCategories] = useState([]); // For filter
  const [selectedCategory, setSelectedCategory] = useState(""); // Selected category
  const [searchTerm, setSearchTerm] = useState(""); // Search term
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

    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchMenu();
    fetchCategories();
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

  const filteredMenuItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory
      ? item.category === selectedCategory
      : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="customer-page-container">
      <h2>Hello, {name}!</h2>

      <div className="filter-search-container">
        {/* Search Bar */}
        <input
          type="text"
          className="search-bar"
          placeholder="Search for items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        {/* Category Filter */}
        <select
          className="category-filter"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-items">
        {filteredMenuItems.map((item) => (
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
            <li key={item.id} className="cart-item">
              <div className="item-details">
                {item.name} <br></br>
                ₹{item.price} x {item.quantity}
              </div>
              <div className="item-actions">
                <button
                  className="quantity-btn"
                  onClick={() => handleIncreaseQuantity(item)}
                >
                  +
                </button>
                <button
                  className="quantity-btn"
                  onClick={() => handleDecreaseQuantity(item)}
                >
                  -
                </button>
                <button
                  className="remove-btn"
                  onClick={() => handleRemoveItem(item)}
                >
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
        <h4>Total: ₹{total}</h4>
        <button className="submit-order-btn" onClick={handleGoToCart}>
          Go to Cart
        </button>
      </div>
    </div>
  );
};

export default CustomerPage;
