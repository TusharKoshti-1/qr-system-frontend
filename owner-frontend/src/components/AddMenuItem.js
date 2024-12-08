import React, { useState } from "react";
import "./AddMenuItem.css"; // Update with your CSS path

const AddMenuItem = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [message, setMessage] = useState("");

  const sampleItems = [
    {
      id: 1,
      name: "Half Dry Manchurian",
      image:
        "https://www.dropbox.com/scl/fi/gn4o3zyrry4u9v9jmksgz/half-dry-manchurian.jpg?rlkey=a2stp1vhfwoo2dbbgcpfxyb9b&st=ynt2lhla&raw=1",
    },
    {
      id: 2,
      name: "Full Dry Manchurian",
      image:
        "https://www.dropbox.com/scl/fi/q0knd3ao02zwshsy92aky/full-dry-manchurian.jpg?rlkey=3jjhi8lntjbbemsmzgrusw89u&st=c10pfxxn&raw=1",
    },
    {
      id: 3,
      name: "Noodles",
      image:
        "https://www.dropbox.com/scl/fi/80qndcd6bemeltp99axar/noodles.jpg?rlkey=yn1vinqj6tg6n8nt8k0sezbi2&st=iyv4s9u8&raw=1",
    },
    {
      id: 4,
      name: "Manchow Soup",
      image:
        "https://www.dropbox.com/scl/fi/l8sl6wrb62lwkxbmhkagr/manchow-soup.jpg?rlkey=eih9ye7v8mgtuka5b4dn8hsoc&st=pjx63b41&raw=1",
    },
  ];

  const filteredItems = sampleItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const addItemToMenu = async (item) => {
  try {
    // Fetch existing menu items to check for duplicates
    const existingMenuResponse = await fetch("http://localhost:5000/api/menu");
    const existingMenu = await existingMenuResponse.json();

    // Check if the item is already in the menu
    const itemExists = existingMenu.some((menuItem) => menuItem.name === item.name);

    if (itemExists) {
      setMessage(`${item.name} is already in the menu`);
      return;
    }

    // If the item doesn't exist, proceed to add it
    const response = await fetch("http://localhost:5000/api/add-item", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: item.name, image: item.image, price: 0 }), // Add a default price of 0
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
      <input
        type="text"
        className="search-bar"
        placeholder="Search items..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {message && <p>{message}</p>}
      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <p>{item.name}</p>
            <button onClick={() => addItemToMenu(item)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMenuItem;