const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost:3306',
    user: 'olivertenhoor',
    password: 'RIXs3M0',
    database: 'rouletteUsers'
  });

connection.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
        return;
    }
    console.log('Connected to the database.');
});

document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to a different page
});