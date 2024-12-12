import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LandingPage.css";

const LandingPage = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (!name || !phone) {
      alert("Please enter both name and phone number.");
      return;
    }

    // Redirect to customer page with name and phone
    navigate("/customer", { state: { name, phone } });
  };

  return (
    <div className="landing-page">
      <div className="popup">
        <h2>Welcome to Our Restaurant!</h2>
        <input
          type="text"
          placeholder="Enter Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="tel"
          placeholder="Enter Your Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default LandingPage;
