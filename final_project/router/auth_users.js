const express = require('express');
const jwt = require('jsonwebtoken');
let books = require("./booksdb.js");
const regd_users = express.Router();

let users = [];

const isValid = (username) => {
    return users.some(user => user.username === username);
}

const authenticatedUser = (username, password) => {
    return users.some(user => user.username === username && user.password === password);
}

//only registered users can login
regd_users.post("/login", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    // Check if user exists and password matches
    if (authenticatedUser(username, password)) {
        // Create JWT access token
        let accessToken = jwt.sign(
            { username: username },
            "access",
            { expiresIn: 60 * 60 } // 1 hour
        );

        // Save user credentials in session
        req.session.authorization = {
            accessToken,
            username
        };

        return res.status(200).json({ message: "User logged in successfully", token: accessToken });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});

// Add a book review
regd_users.put("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const review = req.query.review;
    const username = req.session.authorization.username;

    if (!books[isbn]) {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }

    if (!review) {
        return res.status(400).json({ message: "Review text is required" });
    }

    // Add or update the review by this user
    books[isbn].reviews[username] = review;

    return res.status(200).json({ message: `Review added/updated successfully for ISBN ${isbn}`, reviews: books[isbn].reviews });
});

regd_users.delete("/auth/review/:isbn", (req, res) => {
    const isbn = req.params.isbn;
    const username = req.session.authorization.username;

    if (!books[isbn]) {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }

    if (books[isbn].reviews[username]) {
        delete books[isbn].reviews[username];
        return res.status(200).json({ message: `Review by '${username}' deleted successfully`, reviews: books[isbn].reviews });
    } else {
        return res.status(404).json({ message: `No review by '${username}' found for ISBN ${isbn}` });
    }
});

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
