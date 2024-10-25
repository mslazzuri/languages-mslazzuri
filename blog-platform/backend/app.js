const express = require('express');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('./database');
const app = express();

app.use(bodyParser.json());

const secretKey = 'supersecretkey'; // You should change this in production

// Signup route
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 8);

    db.run(`INSERT INTO users (username, password) VALUES (?, ?)`, [username, hashedPassword], function(err) {
        if (err) return res.status(500).send("User registration failed.");
        res.status(201).send({ message: "User registered successfully!" });
    });
});

// Login route
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    db.get(`SELECT * FROM users WHERE username = ?`, [username], (err, user) => {
        if (err || !user) return res.status(404).send("User not found.");
        if (!bcrypt.compareSync(password, user.password)) return res.status(401).send("Invalid credentials.");

        const token = jwt.sign({ id: user.id }, secretKey, { expiresIn: 86400 });
        res.status(200).send({ auth: true, token });
    });
});

// Middleware to protect routes
function authenticateToken(req, res, next) {
    const token = req.headers['x-access-token'];
    if (!token) return res.status(403).send("No token provided.");

    jwt.verify(token, secretKey, (err, decoded) => {
        if (err) return res.status(500).send("Failed to authenticate token.");
        req.userId = decoded.id;
        next();
    });
}

// CRUD for Blog Posts
app.post('/posts', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    db.run(`INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)`, [title, content, req.userId], function(err) {
        if (err) return res.status(500).send("Error creating post.");
        res.status(201).send({ message: "Post created successfully!" });
    });
});

app.get('/posts', (req, res) => {
    db.all(`SELECT * FROM posts`, [], (err, posts) => {
        if (err) return res.status(500).send("Error retrieving posts.");
        res.status(200).json(posts);
    });
});

app.put('/posts/:id', authenticateToken, (req, res) => {
    const { title, content } = req.body;
    const postId = req.params.id;

    db.run(`UPDATE posts SET title = ?, content = ? WHERE id = ? AND user_id = ?`, [title, content, postId, req.userId], function(err) {
        if (err) return res.status(500).send("Error updating post.");
        if (this.changes === 0) return res.status(403).send("You don't have permission to edit this post.");
        res.status(200).send({ message: "Post updated successfully!" });
    });
});

app.delete('/posts/:id', authenticateToken, (req, res) => {
    const postId = req.params.id;

    db.run(`DELETE FROM posts WHERE id = ? AND user_id = ?`, [postId, req.userId], function(err) {
        if (err) return res.status(500).send("Error deleting post.");
        if (this.changes === 0) return res.status(403).send("You don't have permission to delete this post.");
        res.status(200).send({ message: "Post deleted successfully!" });
    });
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
