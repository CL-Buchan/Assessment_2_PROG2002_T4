const pgCon = require('../postgresql/app'); 
const EventEmitter = require('events');

const connection = pgCon.getConnection(); // Calls getConnection() from database.js
const eventEmitter = new EventEmitter(); // Calls new EventEmitter() to initialise new emitter

// Imports express and makes Router() instance
const express = require('express');

// Used for mapping endpoints (GET, PUT, POST etc)
const router = express.Router();

eventEmitter.on('dbEvent', (event) => {
    console.log('New event for db:', event);
});

// GET method for retrieving data from DB
router.get('/', async (req, res) => {
    try {
        const result = await connection.query('SELECT * FROM event');

        res.status(200).send({message: 'Successful GET', events: result.rows});
    } catch (error) {
        res.status(500).send({error: 'Database error'});
    }
});

// POST method to update DB
router.post('/', async (req, res) => {
	const {EventName, Location, EventDate} = req.body

    // Uses placeholder $ symbol for values unpacked from req.body
    const postSql = 'INSERT INTO event (eventName, location, eventDate) VALUES ($1, $2, $3) RETURNING id';

    try {
        const result = await connection.query(postSql, [EventName, Location, EventDate]);
        res.status(201).send({message: 'Successful insertion', id: result.rows[0].id});
    } catch (error) {
        res.status(500).send({error: 'Database error'});
    }
});

// Delete SQL query to delete from DB
router.delete('/', async (req, res) => {
    const {EventName} = req.body;

    const deleteSql = 'DELETE FROM event WHERE eventname = $1';

    try {
        const result = await connection.query(deleteSql, [EventName]);
        res.status(200).send({message: 'Successful deletion', affectedRows: result.rowCount});
    } catch (error) {
        res.status(500).send({error: 'Database error'});
    }
});

module.exports = router;