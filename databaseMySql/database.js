const dbDetails = require('./db-details'); // Import db-details from file
const mySQL = require('mysql2'); // Import MySQL2
const bodyParser = require('body-parser'); // Import body-parser for js objects
const http = require('http'); // Import http for running with server

// Exports connection as object function

module.exports = {
    getConnection: () => {
        return mySQL.createConnection({
            host: dbDetails.host,
            user: dbDetails.user,
            password: dbDetails.password,
            database: dbDetails.database
        });
    }
}