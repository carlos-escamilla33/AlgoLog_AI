const { create } = require("domain");
const pool = require("../pool");
const bcrypt = require("bcrypt");

async function createUser(userData, client) {
    try {
        const {username, email, password} = userData;

        const saltRounds = 10;
        const hashPassword = await bcrypt.hash(password, saltRounds);

        const {rows:[user]} = await client.query(`
            INSERT INTO users (username, email, password)
            VALUES ($1, $2, $3)
            RETURNING id, username, email, created_at
        `, [username, email, hashPassword]);

        return user;
    } catch (error) {
        console.log(`Error creating user ${userData.username}`, error.message);
        throw error;
    }
}

async function getAllUsers() {
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsers
}


