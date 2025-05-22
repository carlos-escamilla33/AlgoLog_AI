const { createUser } = require("./");
const { pool } = require("./index");

async function dropTables() {
    try {
        console.log("Starting seed process");

        // Drop all tables
        await pool.query("DROP TABLE IF EXISTS users CASCADE;");
    } catch (error) {
        console.log("Error while dropping tables!");
        throw error;
    }
}

async function seed() {
    try {
        // Dropping tables
        dropTables();
    } catch (error) {

    }
}
