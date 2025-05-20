const pool = require("../pool");

async function getAllUsernames() {
    const {rows} = await pool.query("SELECT * FROM leetcode_db");
    return rows;
}