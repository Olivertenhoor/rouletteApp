const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));




app.get('/home', (req, res) => {
    res.render(path.join(__dirname, 'public', 'home.html'));
});

app.get('/RouletteWheel', (req, res) => {
    res.render(path.join(__dirname, 'public', 'index.html'));
});





app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
