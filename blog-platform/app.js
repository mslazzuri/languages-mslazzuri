const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcryptjs');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory SQLite setup
const db = new sqlite3.Database(':memory:');

// Create users table
db.run(`CREATE TABLE users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
)`);

// Sign up route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    // Hash the password before storing it
    bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
            return res.status(500).json({ message: 'Error hashing password.' });
        }

        // Insert the new user into the database
        const query = `INSERT INTO users (username, password) VALUES (?, ?)`;
        db.run(query, [username, hashedPassword], function(err) {
            if (err) {
                // Handle duplicate username error
                if (err.message.includes('UNIQUE')) {
                    return res.status(400).json({ message: 'Username already exists.' });
                }
                return res.status(500).json({ message: 'Error creating user.' });
            }

            // Respond with success
            res.status(201).json({ message: 'User created successfully!' });
        });
    });
});

// Start server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


// Import bcrypt for password hashing
const bcrypt = require('bcrypt');
const session = require('express-session');

// Add session middleware
app.use(session({
    secret: 'your_secret_key', // Change this to a strong secret
    resave: false,
    saveUninitialized: true
}));

// Login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    // Replace this with your actual user fetching logic
    const user = await getUserByUsername(username); // Implement this function to fetch the user from the database

    if (user && await bcrypt.compare(password, user.password)) {
        // Successful login
        req.session.userId = user.id; // Save user ID in session
        res.status(200).send({ message: 'Login successful' });
    } else {
        // Invalid credentials
        res.status(401).send({ message: 'Invalid username or password' });
    }
});

// Example function to fetch user from the database (replace with your actual logic)
async function getUserByUsername(username) {
    // This function should query your database for the user by username
    // Example (replace with actual SQL query):
    const query = 'SELECT * FROM users WHERE username = ?';
    const [rows] = await db.execute(query, [username]);
    return rows[0]; // Return the first user found
}
