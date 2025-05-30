const { Pool } = require("pg");
const pool = new Pool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
    max: 10,
    idleTimeoutmMillis: 30000,
    connectionTimeoutMillis: 2000
});

pool.on("error", (err) => {
    console.log("Unexpected error on idle client", err);
    process.exit(-1);
})

module.exports = pool;