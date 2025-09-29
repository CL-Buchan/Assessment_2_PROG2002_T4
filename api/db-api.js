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
        const result = await connection.query(`SELECT * FROM event`);

        if (result.rows.length === 0) {
            return res.status(404).send({message: 'Event not found!'});
        }

        res.status(200).send({message: 'Successful GET', events: result.rows});
    } catch (error) {
        res.status(500).send({error: 'Database error'});
    }
});


// GET search functionality
router.get('/search', async (req, res) => {
    
    // Unpacks query in object to know what its searching for 
    const {eventid, eventname, location} = req.query;
    
    // Allows storage of conditions for sql query and storing of values to fill placeholders
    const sqlCondition = [];
    const values = [];

    try {

        // Adds values and condition to corresponding arrays for later use
        if (eventid) {
            values.push(eventid);
            sqlCondition.push(`eventid = $${values.length}`);
        }
    
        if (eventname) {
            values.push(eventname);

            // Used ILIKE to make it case insensitive. Referenced from: https://www.geeksforgeeks.org/python/postgresql-ilike-operator/ 
            sqlCondition.push(`eventname ILIKE '%' || $${values.length} || '%'`);
        }
    
        if (location) {
            values.push(location);
            sqlCondition.push(`location ILIKE '%' || $${values.length} || '%'`);
        }

        // If no condition is invoked error 400
        if (sqlCondition.length == 0) {
            return res.status(400).send({error: 'No searches provided'});
        }
    
        // Constructs query for sql db search
        let sql = 'SELECT * FROM event WHERE ' + sqlCondition.join(' AND ');
        const result = await connection.query(sql, values);

        // Sends rows from DB
        res.status(200).send({message: 'Successful search', rows: result.rows});
    } catch (error) {
        res.status(500).send({error: 'Database error'});
    }
});

// GET filters
router.get('/filter', async (req, res) => {
    const {category} = req.query;

    const sqlCondition = [];
    const values = [];

    if (category) {
        // Uses map to make new array, trims white space 
        const categories = category.split(',').map(choice => choice.trim());
        const placeholder = categories.map((_, i) => `$${i + 1}`);
        sqlCondition.push(` category IN (${placeholder.join(', ')})`);
        
        // Array is using spread syntax: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax
        values.push(...categories);
    }
    
    try {
        // If no condition is invoked error 400
        if (sqlCondition.length == 0) {
            return res.status(400).send({error: 'No filters provided'});
        }

        // Constructs query for sql db search
        let sql = 'SELECT * FROM event WHERE ' + sqlCondition.join(' AND ');
        const result = await connection.query(sql, values);

        res.status(200).send({message: 'Successful filter', rows: result.rows});
    } catch (error) {
        res.status(500).send({error: 'Filtering error'});
    }
});

// POST method to update DB
router.post('/', async (req, res) => {
	const {EventName, Location, EventDate} = req.body

    // Uses placeholder $ symbol for values unpacked from req.body
    const postSql = 'INSERT INTO event (eventName, location, eventDate) VALUES ($1, $2, $3) RETURNING id';

    try {
        const result = await connection.query(postSql, [EventName, Location, EventDate]);
        res.status(201).send({message: 'Successful post', id: result.rows[0].id});
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