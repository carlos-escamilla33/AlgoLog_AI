const pool = require("../pool");

async function createJournalProblem({title, code, notes}) {
    try {
        const {rows: [journal]} = await pool.query(`
           INSERT INTO journal_problems(title, code, notes)
           VALUES($1, $2)
           RETURNING *;
        `, [title, code, notes]);
        return journal;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createJournalProblem,
    
}