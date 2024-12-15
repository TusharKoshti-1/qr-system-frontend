const express = require("express");
const router = express.Router();
const connection = require("../db/config");

// Add a new order
router.post('/api/orders', (req, res) => {
  const { customer_name, phone, items, total_amount, payment_method } = req.body;

  const query = `
    INSERT INTO orders (customer_name, phone, items, total_amount, payment_method, status)
    VALUES (?, ?, ?, ?, ?, 'Pending')
  `;
  connection.query(
    query,
    [customer_name, phone, JSON.stringify(items), total_amount, payment_method],
    (err, result) => {
      if (err) {
        console.error('Error adding order:', err);
        return res.status(500).send('Database error');
      }

      // Notify all WebSocket clients
      const newOrder = { id: result.insertId, customer_name, phone, items, total_amount, payment_method, status: 'Pending' };
      req.wss.broadcast({ type: "new_order", order: newOrder });

      res.status(201).json({ message: 'Order added successfully', orderId: result.insertId });
    }
  );
});

// Fetch all orders
router.get('/api/orders', (req, res) => {
  const query = 'SELECT * FROM orders WHERE status = "Pending" ORDER BY created_at DESC';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});
// Update an order
router.put("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  const query = "UPDATE orders SET status = ? WHERE id = ?";
  connection.query(query, [status, orderId], (err, result) => {
    if (err) {
      console.error("Error updating order status:", err);
      res.status(500).send("Database error");
    } else {
      res.json({ message: "Order updated successfully" });
    }
  });
});

module.exports = router;
