// Import express and make app instance 
const express = require('express'); 
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const host = 'localhost';
const port = 8080; // Port number (HTTP or HTTPS)

// Bodyparse implementation for parsing req.body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use/require db-API
const eventsAPI = require('../api/db-api');

// Router to DB API
app.use("/events/db", eventsAPI);

// Serve/use using express.static() middleware for .html pages w/ CSS and JS
// Path module allows ease of access of file paths
app.use(express.static(path.join(__dirname, '../public')));

// Starts server
app.listen(port, 'localhost', (err) => {
    if (err) console.log(`Error has occurred: ${err}`); 
    console.log(`Server running at http://${host}:${port}`)
});