const pool = require("../pool");

async function createJournalProblem({creator_id, is_public, title, code, notes}) {
    try {
        const {rows: [journal]} = await pool.query(`
           INSERT INTO journal_problems(creator_id, is_public, title, code, notes)
           VALUES($1, $2, $3, $4, $5)
           RETURNING *;
        `, [creator_id, is_public, title, code, notes]);
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

async function getJournalProblemById({journalId}) {
    try {
        const {rows: [journal]} = await pool.query(`
            SELECT * FROM journal_problems
            WHERE id=$1;
        `, [journalId]);
        return journal;
    } catch (error) {
        throw error;
    }
}

async function getAllPublicJournalProblems() {
    try {

    } catch (error) {
        throw error;
    }
}

module.exports = {
    createJournalProblem,
    getAllJournalProblems,
    updateJournalProblem,
    getJournalProblemById
}