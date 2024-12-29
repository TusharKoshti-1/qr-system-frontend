import React, { useState } from "react";
import "./MenuItemAdd.css"; // Import the unique CSS file

const MenuItemAdd = () => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");

  // Handle file input change
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  // Form submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!name || !category || !image) {
      setMessage("Please fill out all fields.");
      return;
    }
  
    // Prepare FormData to send to the server
    const formData = new FormData();
    formData.append("name", name);
    formData.append("category", category);
    formData.append("image", image);
  
    try {
      // Make the API request to add the menu item
      const response = await fetch("https://67f3-2409-40c1-5004-fc74-37ee-99ef-5e2b-10ad.ngrok-free.app/api/add-menuitem", {
        method: "POST",
        headers: {
          'ngrok-skip-browser-warning': 'true',  // Add this header to skip the warning
          // Don't set 'Content-Type' here, FormData will handle it
        },
        body: formData,
      });
  
      const textResponse = await response.text();  // Get raw response to debug
  
      console.log("Response Text:", textResponse); // Log raw response text
  
      if (response.ok) {
        // Success
        setMessage("Item added successfully!");
        setName("");  // Clear name input field
        setCategory("");  // Clear category input field
        setImage(null);  // Clear image input field
      } else {
        // Handle non-OK response
        try {
          const errorData = JSON.parse(textResponse);  // Try to parse the error response as JSON
          setMessage(`Failed to add item: ${errorData.message || "Unknown error"}`);
        } catch (jsonError) {
          // If JSON parsing fails, log the raw error text
          setMessage(`Failed to add item: ${textResponse}`);
          console.error("Error parsing response:", jsonError);
        }
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Error occurred while adding item.");
    }
  };

  return (
    <div className="menu-item-add">
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <input
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label>Image:</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            required
          />
        </div>

        <button type="submit" className="submit-btn">Add Item</button>
      </form>

      {message && <p className="message">{message}</p>}
    </div>
  );
};

export default MenuItemAdd;
