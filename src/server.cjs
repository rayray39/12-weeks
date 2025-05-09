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


// get all the Habit objects in the database and populate the habits array in App.tsx`
app.get('/get-all-habits', (req, res) => {
    const query = 'SELECT title, description, startDate, endDate, habitContribution FROM habits';

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Server error: Unable to fetch data in habits table.' });
        } else {
            const parsedRows = rows.map(row => ({
                ...row,
                habitContribution: JSON.parse(row.habitContribution)
            }));
            return res.status(200).json({ allHabits: parsedRows, message: 'Successfully fetched all habits.' });
        }
    })
})

// add a new habit into the habits array in App.tsx
app.post('/add-new-habit', (req, res) => {
    const { title, description, startDate, endDate, habitContribution } = req.body;

    if (!title || !description || !startDate || !endDate || !habitContribution) {
        return res.status(400).json({ message: 'Missing habit attribute(s), failed to add new habit.' });
    }

    const query = 'INSERT INTO habits (title, description, startDate, endDate, habitContribution) VALUES (?, ?, ?, ?, ?)';
    const values = [title, description, startDate, endDate, JSON.stringify(habitContribution)];

    db.run(query, values, function (err) {
        if (err) {
            return res.status(500).json({ message: 'Server error: Unable to add new habit into database.' });
        } else {
            return res.status(200).json({ message: 'Successfully added new habit into database.' });
        }
    })
})

// update the commit of the habit in habits array



// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});