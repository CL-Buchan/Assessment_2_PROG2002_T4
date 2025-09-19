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

// Uses async await to await for connection and check for connection error if any
const connectDb = async () => {
    try {
        // Make connection
        await client.connect();
        console.log('Database connected.')
    } catch (error) {
        console.log('Connection failed', error)
    }
}

connectDb();

// Export the connection
module.exports = {
    getConnection: () => client
};