const dbConnection = require('../databaseMySql/database'); 
const connection = dbConnection.getConnection(); // Calls getConnection() from database.js

// Imports express and makes Router() instance
const express = require('express');

// Used for mapping endpoints (GET, PUT, POST etc)
const router = express.Router();

connection.connect(); // Opens connection

// GET method for retrieving data from DB
router.get('/', (req, res) => {
    connection.query('SELECT * FROM event', (err, result) => {
        if (err) {
            console.error('Error getting data!', err);
            return res.status(500).send({error: 'Database error'});
        } else {
            return res.status(200).send({message: 'Successful GET', events: result});
        }
    });
});

// POST method to update DB
router.post('/', (req, res) => {
	const {EventName, Location, EventDate} = req.body

    const postSql = 'INSERT INTO event (EventName, Location, EventDate) VALUES (?, ?, ?)';

    connection.query(postSql, [EventName, Location, EventDate], (err, result) => {
        if (err) {
            console.log('Error while retrieve the data' + err);
            return res.status(500).send({error: 'Database error'});
        } else {
            return res.status(201).send({message: 'Successful insertion', id: result.insertId});
        }
    });
});

// Delete SQL query to delete from DB
router.delete('/', (req, res) => {
    const {EventName} = req.body;

    const deleteSql = 'DELETE from event WHERE EventName = ?';

    connection.query(deleteSql, [EventName], (err, result) => {
        if (err) {
            console.log('Error while retrieve the data' + err);
            return res.status(500).send({error: 'Database error'});
        } else {
            return res.status(200).send({message: 'Successful deletion', affectedRows: result.affectedRows});
        }
    });
});

module.exports = router;