import React, { useEffect, useState } from "react";
import axios from "axios";
import "./MenuPage.css";
import { Link } from "react-router-dom";


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
  const [editingItemId, setEditingItemId] = useState(null);
  const [newRate, setNewRate] = useState("")

  // Fetch menu items from the backend
  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/menu");
      setMenuItems(response.data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  const handleRateChange = async (id, newRate) => {
    try {
      await axios.put(`http://localhost:5000/api/update-item/${id}`, {
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
      await axios.delete(`http://localhost:5000/api/delete-item/${id}`);
      fetchMenuItems(); // Refresh menu after removing item
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    
    <div className="menu-page">
      <h2>Menu</h2>
      <div style={{ margin: "20px" }}>
        <Link to="/add-menu">
          <button style={styles.button}>Add Menu Items</button>
        </Link></div>
      <div className="menu-list">
        {menuItems.map((item) => (
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
              <button onClick={() => { setEditingItemId(item.id); setNewRate(""); }}>
                Set Rate
              </button>
            )}

            {/* Remove item button */}
            <button
            className="remove-btn" 
            onClick={() => handleRemoveItem(item.id)}>Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
