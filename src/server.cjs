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
    const query = 'SELECT id, title, description, startDate, endDate, habitContribution FROM habits';

    db.all(query, [], (err, rows) => {
        if (err) {
            return res.status(500).json({ message: 'Server error: Unable to fetch data in habits table.' });
        } else {
            const parsedRows = rows.map(row => ({
                ...row,
                desc: row.description,
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
app.post('/update-habit-contribution/:id', (req, res) => {
    const { id } = req.params;
    const { newHabitContribution } = req.body;

    if (!id || !newHabitContribution) {
        return res.status(400).json({ message: 'Missing id or habitContribution array.' });
    }

    const query = 'UPDATE habits SET habitContribution = ? WHERE id = ?';
    const values = [JSON.stringify(newHabitContribution), id];

    db.run(query, values, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Server error: Unable to update commit of habit.' });
        } else {
            return res.status(200).json({ message: 'Successfully updated commit of contribution array.' });
        }
    })
})

// deletes the habit from the database
app.delete('/delete-habit/:id', (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ message: 'Missing id.' });
    }

    const query = 'DELETE FROM habits WHERE id = ?';

    db.run(query, [id], function(err) {
        if (err) {
            return res.status(500).json({ message: 'Server error: Unable to delete the habit.' });
        } else {
            return res.status(200).json({ message: 'Successfully deleted habit from database.' });
        }
    })
})

// edits the title or descrption of the habit in the database
app.post('/edit-habit/:id', (req, res) => {
    const { id } = req.params;
    const { editTitle, editDesc } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'Missing id.' });
    } else if (!editTitle && !editDesc) {
        return res.status(400).json({ message: 'Missing edited title and description.'});
    }

    const query = 'UPDATE habits SET title = ?, description = ? WHERE id = ?';
    const values = [editTitle, editDesc, id];

    db.run(query, values, function(err) {
        if (err) {
            return res.status(500).json({ message: 'Server error: Unable to edit habit title or description.' });
        } else {
            return res.status(200).json({ message: 'Successfully edited habit title or description' });
        }
    })
})


// Start server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});