const express = require('express');
const bodyParser = require('body-parser');
const cors = require("cors");
const WebSocket = require("ws");
const menuRoutes = require('./routes/menu'); 
const orderRoutes = require('./routes/order');
const salesRoutes = require('./routes/sales')

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Initialize WebSocket server
const wss = new WebSocket.Server({ port: 5001 });
console.log('WebSocket server running on port 5001');

// Broadcast to all WebSocket clients
wss.broadcast = (data) => {
  wss.clients.forEach((client) => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify(data));
    }
  });
};

// Middleware to pass `wss` to routes
app.use((req, res, next) => {
  req.wss = wss;
  next();
});

// Route definitions
app.use(menuRoutes);
app.use(orderRoutes);
app.use(salesRoutes);

// Start the server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});
