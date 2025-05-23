const { createUser } = require("./");
const { pool } = require("./index");

async function dropTables() {
    try {
        console.log("Starting seed process...");

        // Drop all tables
        await pool.query("DROP TABLE IF EXISTS users;");

        // Log tables were dropped
        console.log("Completed dropping tables...")
    } catch (error) {
        console.log("Error while dropping tables!");
        throw error;
    }
}

async function initializeTables() {
    try {
        console.log("Initializing tables...");
        await pool.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIME NOT NULL now(),
                updated_at TIME NOT NULL now()
            );
        `);
        console.log("Finished intializing data!");
    } catch (error) {
        console.log("Error initializing tables!");
        throw error;
    }
}

async function seed() {
    try {
        // Dropping tables
        await dropTables();
        // Init tables
        await initializeTables();
    } catch (error) {
        console.log("Seeding data failed!");
        throw error;
    }
}

module.exports = {
    seed
};