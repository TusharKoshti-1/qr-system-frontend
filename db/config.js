const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost', // Hostname provided by InfinityFree
  user: 'your_username',            // MySQL Username
  password: 'your_password',          // MySQL Password
  database: 'qr_ordering_system',    // MySQL Database Name (replace XXX with your actual database name)                     // Optional, default MySQL port
});

// const connection = mysql.createConnection({
//   host: 'sql307.infinityfree.com ', // Hostname provided by InfinityFree
//   user: 'if0_37905014',            // MySQL Username
//   password: '9824243834',          // MySQL Password
//   database: 'if0_37905014_qr_ordering_system',    // MySQL Database Name (replace XXX with your actual database name)                     // Optional, default MySQL port
// });


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
