const express = require('express');
const bodyParser = require('body-parser');
const menuRoutes = require('./routes/menu');  // Import your routes file
const cors = require("cors");

const app = express();  // Initialize express app

app.use(cors());  // Set up CORS middleware after initializing 'app'
app.use(bodyParser.json());  // Middleware to parse JSON request bodies

// Use the menu routes for handling menu-related requests
app.use(menuRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
