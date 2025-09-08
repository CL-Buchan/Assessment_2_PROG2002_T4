const dbCon = require('../databaseMySql/database'); 
const connection = dbCon.getConnection(); // Calls getConnection() from database.js

// Imports express and makes Router() instance
const express = require('express');

// Used for mapping endpoints (GET, PUT, POST etc)
const router = express.Router();

connection.connect(); // Opens connection

// .get() route defined for '/' path
router.get('/', (req, res) => {
    connection.query('SELECT * FROM Event', (err, records) => {
        if (err) {
            console.error('Error getting data!', err);
        } else {
            res.send(records);
        }
    });
});

module.exports = router;