import React from 'react';

const Menu = () => {
  return (
    <div style={styles.container}>
      <h2>Menu Management</h2>
      <p>Here you can add, update, or delete menu items.</p>
      {/* Placeholder for menu management functionality */}
      <button style={styles.button}>Add New Menu Item</button>
    </div>
  );
};

const styles = {
  container: { padding: '20px', textAlign: 'center' },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Menu;
