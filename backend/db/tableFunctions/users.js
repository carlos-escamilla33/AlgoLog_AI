const { create } = require("domain");
const pool = require("../pool");

async function createUser({username, password}) {
    try {
        
    } catch (error) {
        throw error;
    }
}

async function getAllUsernames() {
    try {
        const { rows } = await pool.query("SELECT * FROM leetcode_db");
        return rows;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createUser,
    getAllUsernames
}


