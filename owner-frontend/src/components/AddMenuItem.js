import React, { useState } from "react";

const AddMenuItem = ({ onMenuUpdated }) => {
  const [name, setName] = useState("");
  const [price, setRate] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newItem = { name, price };
    try {
      const response = await fetch("http://localhost:5000/api/add-item", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        alert("Item added successfully!");
        setName("");
        setRate("");
        if (onMenuUpdated) onMenuUpdated({ name, price }); 
      } else {
        console.error("Failed to add item:", data.message || "Unknown error");
        alert("Failed to add item: " + (data.message || "Unknown error"));
      }
    } catch (error) {
      console.error("Error adding menu item:", error);
      alert("There was an error adding the menu item. Please try again.");
    }
  };

  return (
    <div>
      <h2>Add New Menu Item</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Rate:</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setRate(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default AddMenuItem;
