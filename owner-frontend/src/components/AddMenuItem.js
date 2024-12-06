import React, { useState } from "react";
import "/media/tushar-koshti/45a31cc6-7f47-49bd-b214-4ac20877a1fe/Qr_System/owner-frontend/src/AddMenuItem.css";

const AddMenuItem = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const sampleItems = [
    { id: 1, name: "Half Dry Manchurian", image: "https://www.dropbox.com/scl/fi/gn4o3zyrry4u9v9jmksgz/half-dry-manchurian.jpg?rlkey=a2stp1vhfwoo2dbbgcpfxyb9b&st=hd88b2jq&raw=1" },
    { id: 2, name: "Full Dry Manchurian", image: "https://www.dropbox.com/scl/fi/q0knd3ao02zwshsy92aky/full-dry-manchurian.jpg?rlkey=3jjhi8lntjbbemsmzgrusw89u&st=8swt65q4&raw=1"},
    { id: 3, name: "Noodles", image: "https://www.dropbox.com/scl/fi/80qndcd6bemeltp99axar/noodles.jpg?rlkey=yn1vinqj6tg6n8nt8k0sezbi2&st=9pglav76&raw=1"}
  ];    

  const filteredItems = sampleItems.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      <div className="item-list">
        {filteredItems.map((item) => (
          <div key={item.id} className="menu-item">
            <img src={item.image} alt={item.name} className="item-image" />
            <p>{item.name}</p>
            <button onClick={() => alert(`Added: ${item.name}`)}>Add</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AddMenuItem;
