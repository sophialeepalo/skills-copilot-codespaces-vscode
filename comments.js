// Create web server
const express = require('express');
const app = express();

// Create path
const path = require('path');
const publicPath = path.join(__dirname, '../public');

// Use public path
app.use(express.static(publicPath));

// Use port
const port = process.env.PORT || 3000;

// Listen to port
app.listen(port, () => {
    console.log('Server is up!');
});