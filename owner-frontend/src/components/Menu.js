import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    fetchMenu();
  }, []);

  const fetchMenu = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/menu");
      const data = await response.json();
      setMenuItems(data);
    } catch (error) {
      console.error("Error fetching menu items:", error);
    }
  };

  return (
    <div>
      <h1>Menu</h1>

      {/* Add Menu Item Button */}
      <div style={{ marginBottom: "20px" }}>
        <Link to="/add-menu">
          <button>Add New Item</button>
        </Link>
      </div>

      {/* Menu Table */}
      <table>
        <thead>
          <tr>
            <th>Photo</th>
            <th>Name</th>
            <th>Rate</th>
          </tr>
        </thead>
        <tbody>
          {menuItems.map((item) => (
            <tr key={item.id}>
              <td>
                <img src={item.photo} alt={item.name} width="50" />
              </td>
              <td>{item.name}</td>
              <td>₹{item.price}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
