const pgCon = require('../postgresql/app'); 
const connection = pgCon.getConnection(); // Calls getConnection() from database.js

// Imports express and makes Router() instance
const express = require('express');

// Used for mapping endpoints (GET, PUT, POST etc)
const router = express.Router();

// GET method for retrieving data from DB
router.get('/', (req, res) => {
    connection.query('SELECT * FROM event', (err, result) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        } else {
            return res.status(200).send({message: 'Successful GET', events: result.rows});
        }
    });
});

// POST method to update DB
router.post('/', (req, res) => {
	const {EventName, Location, EventDate} = req.body

    // Uses placeholder $ symbol for values unpacked from req.body
    const postSql = 'INSERT INTO event (eventName, location, eventDate) VALUES ($1, $2, $3) RETURNING id';

    connection.query(postSql, [EventName, Location, EventDate], (err, result) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        } else {
            return res.status(201).send({message: 'Successful insertion', id: result.rows[0].id});
        }
    });
});

// Delete SQL query to delete from DB
router.delete('/', (req, res) => {
    const {EventName} = req.body;

    const deleteSql = 'DELETE FROM event WHERE eventname = $1';

    connection.query(deleteSql, [EventName], (err, result) => {
        if (err) {
            return res.status(500).send({error: 'Database error'});
        } else {
            return res.status(200).send({message: 'Successful deletion', affectedRows: result.rowCount});
        }
    });
});

module.exports = router;