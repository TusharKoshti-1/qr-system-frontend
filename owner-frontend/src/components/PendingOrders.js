import React, { useState } from 'react';

const PendingOrders = () => {
  const [orders, setOrders] = useState([
    { id: 1, tableId: '1', items: 'Khaman, Jalebi', total: 200, status: 'pending' },
    { id: 2, tableId: '2', items: 'Fafda, Dhokla', total: 150, status: 'pending' },
  ]);

  const handleAction = (id, action) => {
    console.log(`Action: ${action}, Order ID: ${id}`);
    // Placeholder for API calls to handle actions
  };

  return (
    <div style={styles.container}>
      <h2>Pending Orders</h2>
      {orders.map(order => (
        <div key={order.id} style={styles.order}>
          <p>Table: {order.tableId}</p>
          <p>Items: {order.items}</p>
          <p>Total: ₹{order.total}</p>
          <div style={styles.actions}>
            <button onClick={() => handleAction(order.id, 'generate')} style={styles.button}>Generate Receipt</button>
            <button onClick={() => handleAction(order.id, 'edit')} style={styles.button}>Edit</button>
            <button onClick={() => handleAction(order.id, 'cancel')} style={styles.buttonDanger}>Cancel</button>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center' },
  order: { margin: '10px 0', padding: '10px', border: '1px solid #ddd', borderRadius: '5px' },
  actions: { marginTop: '10px' },
  button: {
    padding: '5px 10px',
    margin: '0 5px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  buttonDanger: {
    padding: '5px 10px',
    margin: '0 5px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default PendingOrders;
