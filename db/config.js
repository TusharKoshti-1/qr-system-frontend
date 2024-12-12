const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'sql307.infinityfree.com',
  user: 'if0_37905014',
  password: '9824243834',
  database: 'qr_ordering_system'
});

connection.connect((err) => {
  if (err) {
      console.error('Error connecting to the database:', err.stack);
      return;
  }
  console.log('Connected to the database');
});

module.exports = connection;
