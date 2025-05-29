const pool = require("./pool");
const { seed } = require("./populatedb.js");

seed()
    .catch(console.error)
    .finally(async () => pool.end());