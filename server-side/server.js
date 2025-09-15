// Import express and make app instance 
const express = require('express'); 
const app = express();
const bodyParser = require('body-parser');
const port = 8080; // Port number (HTTP or HTTPS)

// Bodyparse implementation for parsing req.body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

const eventsAPI = require('../api/db-api'); // Use db-API

// Router
app.use("/events/db", eventsAPI);

// Starts server
app.listen(port, 'localhost', (err) => {
    if (err) console.log(`Error has occurred: ${err}`); 
    console.log(`Server running at http://localhost:${port}/events/db`)
});