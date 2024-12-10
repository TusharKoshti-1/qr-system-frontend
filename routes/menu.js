const express = require('express');
const router = express.Router();
const connection = require('../db/config');

// API to fetch all menu items
router.get('/api/menu', (req, res) => {
  connection.query('SELECT * FROM menu', (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json(results);
  });
});

// API to add a new menu item
router.post('/api/add-item', (req, res) => {
  const { name, image, price, category } = req.body;
  const query = 'INSERT INTO menu (name, image, price, category) VALUES (?, ?, ?, ?)';
  connection.query(query, [name, image, price || 0, category], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json({ message: 'Menu item added successfully' });
  });
});

// API to update an item's price
router.put('/api/update-item/:id', (req, res) => {
  const { id } = req.params;
  const { price } = req.body;
  const query = 'UPDATE menu SET price = ? WHERE id = ?';
  connection.query(query, [price, id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json({ message: 'Menu item updated successfully' });
  });
});

// API to delete a menu item
router.delete('/api/delete-item/:id', (req, res) => {
  const { id } = req.params;
  const query = 'DELETE FROM menu WHERE id = ?';
  connection.query(query, [id], (err, result) => {
    if (err) {
      console.error(err);
      return res.status(500).send('Database error');
    }
    res.json({ message: 'Menu item deleted successfully' });
  });
});

router.get('/api/categories', (req, res) => {
  const query = 'SELECT DISTINCT category FROM menu';
  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching categories:', err);
      return res.status(500).send('Database error');
    }
    res.json(results.map(row => row.category)); // Extract the category names
  });
});

module.exports = router;
