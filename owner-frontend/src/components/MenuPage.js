import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./MenuPage.css";

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

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [editingItemId, setEditingItemId] = useState(null);
  const [newRate, setNewRate] = useState("");

  // Fetch menu items and categories from the backend
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/menu" , {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        }});
      setMenuItems(response.data);
      setFilteredItems(response.data);

      // Extract unique categories from the data
      const uniqueCategories = [
        ...new Set(response.data.map((item) => item.category)),
      ];
      setCategories(uniqueCategories);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === "") {
      setFilteredItems(menuItems); // Show all items if no category is selected
    } else {
      setFilteredItems(
        menuItems.filter((item) => item.category === category)
      );
    }
  };

  const handleRateChange = async (id, newRate) => {
    try {
      await axios.put(`https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/update-item/${id}`, {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        } } , {
        price: newRate,
      });
      fetchMenuItems(); // Refresh menu after updating rate
      setEditingItemId(null); // Stop editing the rate
    } catch (error) {
      console.error("Error updating rate:", error);
    }
  };

  const handleRemoveItem = async (id) => {
    try {
      await axios.delete(`https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/delete-item/${id}` , {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        } });
      fetchMenuItems(); // Refresh menu after removing item
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <div className="menu-page">
      <h2>Menu</h2>
      <div className="menu-controls">
        <Link to="/add-menu">
          <button style={styles.button}>Add Menu Items</button>
        </Link>

        {/* Category Filter Dropdown */}
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryFilter(e.target.value)}
          className="category-filter"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="menu-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="menu-image" />
            <p>{item.name}</p>

            {/* Display current price below the image */}
            {item.price && <p className="current-price">₹{item.price}</p>}

            {/* If this item is being edited, show an input to update the price */}
            {editingItemId === item.id ? (
              <div className="rate-edit">
                <input
                  type="number"
                  value={newRate}
                  onChange={(e) => setNewRate(e.target.value)}
                  placeholder="Enter new rate"
                />
                <button onClick={() => handleRateChange(item.id, newRate)}>
                  Save Rate
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setEditingItemId(item.id);
                  setNewRate("");
                }}
              >
                Set Rate
              </button>
            )}

            {/* Remove item button */}
            <button
              className="remove-btn"
              onClick={() => handleRemoveItem(item.id)}
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
