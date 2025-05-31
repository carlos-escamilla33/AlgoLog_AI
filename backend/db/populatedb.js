const { createUser } = require("./");
const { pool } = require("./pool");

async function dropTables(client) {
    try {
        console.log("Starting seed process...");

        // Drop all tables
        await client.query(`
            DROP TABLE IF EXISTS gpt_conversations;
            DROP TABLE IF EXISTS journal_problems;
            DROP TABLE IF EXISTS users;
        `);

        // Log tables were dropped
        console.log("Completed dropping tables...")
    } catch (error) {
        console.log("Error while dropping tables!");
        throw error;
    }
}

async function initializeTables(client) {
    try {
        console.log("Initializing tables...");
        await client.query(`
            CREATE TABLE users (
                id SERIAL PRIMARY KEY,
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );

            CREATE TABLE journal_problems (
                id SERIAL PRIMARY KEY,
                creator_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
                title VARCHAR(500) NOT NULL,
                code TEXT,
                notes TEXT,
                difficulty VARCHAR(20) CHECK (difficulty IN('Easy', 'Medium', 'Hard')),
                tags TEXT[],
                is_public BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
                updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );

            CREATE TABLE gpt_conversations (
                id SERIAL PRIMARY KEY,
                journal_id INTEGER REFERENCES journal_problems(id) ON DELETE CASCADE,
                prompt TEXT,
                response TEXT,
                created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
            );

            CREATE INDEX idx_journal_creator ON journal_problems(creator_id);
            CREATE INDEX idx_journal_public ON journal_problems(is_public);
            CREATE INDEX idx_journal_difficulty ON journal_problems(difficulty);
            CREATE INDEX idk_conversations_journal ON gpt_conversations(journal_id);
        `);
        console.log("Finished intializing data!");
    } catch (error) {
        console.log("Error initializing tables!");
        throw error;
    }
}

async function createInitialUsers(client) {
    console.log("Starting to create users...");
    try {
        const usersToCreate = [
            {username:"riley", password:"riley1234"},
            {username:"wade", password:"wade1234"},
            {username:"luna", password:"luna1234"},
        ];
        const users = [];
        for (const userData of usersToCreate) {
            const user = await createUser(userData, client);
            users.push(user);
        }

        console.log("Users created: ");
        console.log(users);
        console.log("Finished creating users!");

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function createInitialJournals(client, users) {
    console.log("Creating initial journal entries...");
    try {
        const journalsToCreate = [
            {
                creator_id: users[0].id,
                title: "Two Sum",
                code: ` 
                def twoSum(nums, target):
                    hashmap = {}
                    for i, num in enumerate(nums):
                        complement = target - num
                        if complement in hashmap:
                            return [hashmap[complement], i]
                        hashmap[num] = i
                    return []
                `,
                notes: "Classic hash map problem. Time:O(n), Space:O(n)",
                difficulty: "Easy",
                tags: ["Array", "Hash Table"],
                is_public: true
            },
            {
                creator_id: users[1].id,
                title: "Valid Parentheses",
                code: `
                def isValid(s):
                    stack = []
                    mapping = {")": "(", "}": "{", "]": "["}
                    
                    for char in s:
                        if char in mapping:
                            if not stack or stack.pop() != mapping[char]:
                                return False
                        else:
                            stack.append(char)
                    
                    return not stack`,
                notes: "Stack based solution. Remember to check if stack is empty before popping!",
                difficulty: "Easy",
                tags: ["Stack", "String"],
                is_public: false
            }
        ];
        for (const entry of entries) {
            
        }

    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function seed() {
    const client = await pool.connect();
    try {
        // adding BEGIN transaction
        await client.query("BEGIN");
        // Dropping tables
        await dropTables(client);
        // Init tables
        await initializeTables(client);
        // Create Users
        const users = await createInitialUsers(client);
        // Create journal
        await createInitialJournals(client, users);
        // adding COMMIT transaction
        await client.query("COMMIT");
        console.log("✅ Seed completed successfully!");
    } catch (error) {
        await client.query("ROLLBACK");
        console.log('❌ Seeding failed, rolling back!');
        console.error(error);
        throw error;
    } finally {
        client.release();
    }
}

module.exports = {
    seed
};