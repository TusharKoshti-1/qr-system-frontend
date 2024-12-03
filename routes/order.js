const express = require('express');
const router = express.Router();
const db = require('../db/config');

// Place an order
router.post('/', (req, res) => {
  const { table_id, menu_items, total_price } = req.body;
  const sql = "INSERT INTO orders (table_id, menu_items, total_price, status) VALUES (?, ?, ?, 'pending')";
  db.query(sql, [table_id, JSON.stringify(menu_items), total_price], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Order placed successfully!' });
  });
});

// Fetch all orders
router.get('/', (req, res) => {
  const sql = "SELECT * FROM orders";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// Update order status
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Order status updated successfully!' });
  });
});

module.exports = router;
