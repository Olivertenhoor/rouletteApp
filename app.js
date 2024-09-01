const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const port = process.env.PORT || 3000;
const connection = require('./public/scripts/db')


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));



app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/RouletteWheel', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'roulettewheel.html'));
});

app.get('/AboutUs', (req,res) => {
    res.sendFile(path.join(__dirname, 'public' , 'aboutUs.html'))
});

app.get('/CreateAccount', (req,res) => {
    res.sendFile(path.join(__dirname, 'public' , 'createAccount.html'))
});

app.get('/Login', (req,res) => {
    res.sendFile(path.join(__dirname, 'public' , 'login.html'))
});

app.get('/Concept', (req,res) => {
    res.sendFile(path.join(__dirname, 'public' , 'concept.html'))
});


app.post('/submit', (req, res) => {
    const {username, password} = req.body;

    const checkEmailQuery = 'SELECT * FROM users WHERE email = ?';
    connection.query(checkEmailQuery, [email], (err, results) => {
        if(err) {
            console.error('Database error');
            res.status(500).send('Database error');
            return;
        }
        if (results.length > 0) {
            // Email already exists
            res.status(400).send('Email already exists');
        }
        else {
            connection.query('INSERT INTO rouletteUsers set ?', {username, password}, (err, results) => {
                if(err) {
                    console.error('Error excecuting sql query: ', err    );
                    return;
                }
                console.log('Inserted user with id: ', results.insertId);
            });
            window.location.href = "index.html"
        }
    });
});



app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

module.exports = app;