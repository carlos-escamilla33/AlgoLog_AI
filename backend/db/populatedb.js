const { createUser } = require("./");
const { pool } = require("./index");

async function dropTables() {
    try {
        console.log("Starting seed process...");

        // Drop all tables
        await pool.query(`
            DROP TABLE IF EXISTS users;
            DROP TABLE IF EXISTS journal_problems;
            DROP TABLE IF EXISTS gpt_conversations;
            `);

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
                created_at TIMESTAMPTZ DEFAULT NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOT NULL DEFAULT NOW()
            );

            CREATE TABLE journal_problems (
                id SERIAL PRIMARY KEY,
                creator_id INTEGER REFERENCES users(id),
                is_public BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOT NULL DEFAULT NOW()
            );

            CREATE TABLE gpt_conversations (
                id SERIAL PRIMARY KEY,
                journal_id INTEGER REFERENCES journal_problems(id),
                prompt TEXT,
                response TEXT,
                created_at TIMESTAMPTZ DEFAULT NOT NULL DEFAULT NOW()
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