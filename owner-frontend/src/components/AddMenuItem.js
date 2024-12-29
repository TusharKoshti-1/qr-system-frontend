import React, { useState , useEffect } from "react";
import axios from "axios";
import "./AddMenuItem.css"; // Update with your CSS path

const AddMenuItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [message, setMessage] = useState("");

  // Fetch menu items and categories from the backend
  useEffect(() => {
      fetchMenuItems();
    }, []);
  
    const fetchMenuItems = async () => {
      try {
        const response = await axios.get("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/menuitems" , {
          headers: {
            'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
          } });
        console.log("API response: ", response.data); // Log response
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
  

  const addItemToMenu = async (item) => {
    try {
      // Fetch existing menu items to check for duplicates
      const existingMenuResponse = await fetch("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/menu" , {
        headers: {
          'ngrok-skip-browser-warning': 'true'  // Add this header to skip the warning
        } });
      const existingMenu = await existingMenuResponse.json();

      // Check if the item is already in the menu
      const itemExists = existingMenu.some((menuItem) => menuItem.name === item.name);

      if (itemExists) {
        setMessage(`${item.name} is already in the menu`);
        return;
      }

      // If the item doesn't exist, proceed to add it
      const response = await fetch("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/add-item", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          'ngrok-skip-browser-warning': 'true'
        },
        body: JSON.stringify({
          name: item.name,
          image: item.image,
          price: 0, // Add a default price of 0
          category: item.category, // Include category in the request body
        }),
      });

      if (response.ok) {
        setMessage(`Added: ${item.name}`);
      } else {
        setMessage("Failed to add item");
      }
    } catch (error) {
      console.error("Error adding item:", error);
      setMessage("Error occurred while adding item");
    }
  };

  return (
    <div className="add-menu-item">
      <h2>Menu Items</h2>
      <div className="filters">
        <input
          type="text"
          className="search-bar"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
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
      {message && <p>{message}</p>}
      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <p>{item.name}</p>
            <p>Category: {item.category}</p>
            <button onClick={() => addItemToMenu(item)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMenuItem;