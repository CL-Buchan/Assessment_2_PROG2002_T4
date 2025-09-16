// Import express and make app instance 
const express = require('express'); 
const cors = require('cors');
const app = express();
const bodyParser = require('body-parser');
const port = 8080; // Port number (HTTP or HTTPS)

app.use(cors());

// Bodyparse implementation for parsing req.body as JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// Use db-API
const eventsAPI = require('../api/db-api');

// Router
app.use("/events/db", eventsAPI);

// Starts server
app.listen(port, 'localhost', (err) => {
    if (err) console.log(`Error has occurred: ${err}`); 
    console.log(`Server running at http://localhost:${port}/events/db`)
});