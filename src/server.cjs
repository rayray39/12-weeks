const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 5000;

// Middleware
app.use(cors());
app.use(express.json());

const db = new sqlite3.Database('./src/database/habits.db', (err) => {
    if (err) return console.error(err.message);
    console.log('Connected to the SQLite database (habits.db).');
});

// Create the habits table in the sqlite3 database
db.run(`
    CREATE TABLE IF NOT EXISTS habits (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        startDate TEXT NOT NULL,
        endDate TEXT NOT NULL,
        habitContribution TEXT NOT NULL DEFAULT '[]'
    )
    `, (err) => {
    if (err) {
        console.error('Error creating table:', err.message);
    } else {
        console.log('Habits table created or already exists.');
    }
});



// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});