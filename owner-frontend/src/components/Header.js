import React, { useEffect, useState } from 'react';

const Header = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header style={styles.header}>
      <h1>Restaurant Name</h1>
      <div>
        <p>{dateTime.toLocaleDateString()}</p>
        <p>{dateTime.toLocaleTimeString()}</p>
      </div>
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#f8f9fa',
    borderBottom: '1px solid #ddd',
  },
};

export default Header;
