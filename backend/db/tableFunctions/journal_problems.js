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

async function getAllJournalProblems() {
    try {
        const {rows} = await pool.query(`
            SELECT * FROM journal_problems;
        `);
        return rows;
    } catch (error) {
        throw error;
    }
}

async function updateJournalProblem({id, title, code, notes}) {
    try {
        const {rows: [journal]} = await pool.query(`
            UPDATE journal_problems
            SET title=$1, code=$2, notes=$3
            WHERE id=$4
            RETURNING *;
        `, [title, code, notes, id]);
        return journal;
    } catch (error) {
        throw error;
    }
}

module.exports = {
    createJournalProblem,
    getAllJournalProblems,

}