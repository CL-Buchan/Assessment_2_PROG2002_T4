// Import PG (PostgreSQL) module
const { Client } = require('pg');

// Connect using user login details
const client = new Client({
    host: 'localhost',
    user: 'postgres',
    database: 'events',
    password: 'kyzxe7-hotvAt-jyhxow',
    port: 5432,
});

// Make connection
client.connect();

// Export the connection
module.exports = {
    getConnection: () => client
};