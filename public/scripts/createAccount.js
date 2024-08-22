const { application } = require('express');
const mysql = require('mysql2');
const app = require('../app')

// const connection = mysql.createConnection({
//     host: 'localhost:3306',
//     user: 'olivertenhoor',
//     password: 'RIXs3M0',
//     database: 'rouletteUsers'
//   });

// connection.connect((err) => {
//     if (err) {
//         console.error('Error connecting to the database:', err);
//         return;
//     }
//     console.log('Connected to the database.');
// });

// app.post('/submit', (req, res) => {
//     const {username, password} = req.body;

//     const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//     connection.query(checkEmailQuery, [email], (err, results) => {
//         if(err) {
//             console.error('Database error');
//             res.status(500).send('Database error');
//             return;
//         }
//         if (results.length > 0) {
//             // Email already exists
//             res.status(400).send('Email already exists');
//         }
//         else {
//             connection.query('INSERT INTO rouletteUsers set ?', {username, password}, (err, results) => {
//                 if(err) {
//                     console.error('Error excecuting sql query: ', err    );
//                     return;
//                 }
//                 console.log('Inserted user with id: ', results.insertId);
//             });
//             window.location.href = "index.html"
//         }
//     });
// })


// document.getElementById('createAccountForm').addEventListener('click', function() {
//     const email = document.getElementById('username');
//     const userPassword = document.getElementById('password');
//     const user = {username: email, password: userPassword, balance: 100};
    
//     const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
//     connection.query(checkEmailQuery, email, (err, results) => {
//         if(err) {
//             console.error('Database error');
//             res.status(500).send('Database error');
//         }
//         if (results.length > 0) {
//             // Email already exists
//             res.status(400).send('Email already exists');
//         }
//         else {
//             connection.query('INSERT INTO rouletteUsers set ?', user, (err, results) => {
//                 if(err) {
//                     console.error('Error excecuting sql query: ', err    );
//                     return;
//                 }
//                 console.log('Inserted user with id: ', results.insertId);
//             });
//             window.location.href = "index.html"
//         }
//     });
// });



document.getElementById('homeButton').addEventListener('click', function() {
    window.location.href = 'index.html'; // Redirect to a different page
});