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
      res.status(201).json({ message: 'Order added successfully', orderId: result.insertId });
    }
  );
});

// Fetch all orders
router.get('/api/orders', (req, res) => {
  connection.query('SELECT * FROM orders', (err, results) => {
    if (err) {
      console.error('Error fetching orders:', err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// Delete an order
router.delete("/api/orders/:id", (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM orders WHERE id = ?";
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      res.status(500).send("Database error");
    } else {
      res.json({ message: "Order deleted successfully" });
    }
  });
});

module.exports = router;