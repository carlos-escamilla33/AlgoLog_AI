const pool = require("./pool");
const { seed } = require("./index");

seed()
    .catch(console.error)
    .finally(async () => pool.end());