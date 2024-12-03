const express = require('express');
const router = express.Router();
const db = require('../db/config');

// Add a menu item
router.post('/', (req, res) => {
  const { name, price, description } = req.body;
  const sql = "INSERT INTO menu (name, price, description) VALUES (?, ?, ?)";
  db.query(sql, [name, price, description], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Menu item added successfully!' });
  });
});

// Fetch all menu items
router.get('/', (req, res) => {
  const sql = "SELECT * FROM menu";
  db.query(sql, (err, results) => {
    if (err) return res.status(500).json(err);
    res.status(200).json(results);
  });
});

// Update menu item
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, price, description } = req.body;
  const sql = "UPDATE menu SET name = ?, price = ?, description = ? WHERE id = ?";
  db.query(sql, [name, price, description, id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Menu item updated successfully!' });
  });
});

// Delete menu item
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM menu WHERE id = ?";
  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json(err);
    res.status(200).json({ message: 'Menu item deleted successfully!' });
  });
});

module.exports = router;
