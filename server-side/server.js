// Import express and make app instance 
const express = require('express');

// Root application
const app = express();

const eventsAPI = require('../databaseAPI/db-api-controller'); // Use db-API
const bodyParser = require('body-parser');

const port = 8080; // Port number (HTTP or HTTPS)

// Router
app.use("/events/db", eventsAPI);

// Starts server
app.listen(port, 'localhost', () => 
    console.log(`Server running at http://localhost:${port}`)
);