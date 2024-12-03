import React, { useState } from 'react';

const AddOrder = () => {
  const [order, setOrder] = useState({
    tableId: '',
    items: '',
    total: '',
  });

  const handleChange = (e) => {
    setOrder({ ...order, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Order Added:', order);
    // Placeholder for API call to add order
  };

  return (
    <form onSubmit={handleSubmit} style={styles.form}>
      <h2>Add Order</h2>
      <input
        type="text"
        name="tableId"
        placeholder="Table ID"
        value={order.tableId}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <textarea
        name="items"
        placeholder="Menu Items (e.g., Khaman, Jalebi)"
        value={order.items}
        onChange={handleChange}
        required
        style={styles.textarea}
      />
      <input
        type="number"
        name="total"
        placeholder="Total Price"
        value={order.total}
        onChange={handleChange}
        required
        style={styles.input}
      />
      <button type="submit" style={styles.button}>Add Order</button>
    </form>
  );
};

const styles = {
  form: { padding: '20px', textAlign: 'center' },
  input: {
    display: 'block',
    width: '80%',
    margin: '10px auto',
    padding: '10px',
    fontSize: '16px',
  },
  textarea: {
    display: 'block',
    width: '80%',
    margin: '10px auto',
    padding: '10px',
    fontSize: '16px',
    height: '100px',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default AddOrder;
