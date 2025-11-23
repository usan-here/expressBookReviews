const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body;

    // Check if username and password are provided
    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const { users, isValid } = require("./auth_users.js");

    // Check if username already exists
    if (isValid(username)) {
        return res.status(409).json({ message: "Username already exists" });
    }

    // Register new user
    users.push({ username: username, password: password });
    return res.status(201).json({ message: "User registered successfully" });
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
    return res.status(200).send(JSON.stringify(books, null, 4));
  });
  

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).send(JSON.stringify(books[isbn], null, 4));
    } else {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }
});
  
// Get book details based on author
public_users.get('/author/:author', function (req, res) {
    const author = req.params.author;
    const bookKeys = Object.keys(books);
    const result = {};

    bookKeys.forEach((key) => {
        if (books[key].author.toLowerCase() === author.toLowerCase()) {
            result[key] = books[key];
        }
    });

    if (Object.keys(result).length > 0) {
        return res.status(200).send(JSON.stringify(result, null, 4));
    } else {
        return res.status(404).json({ message: `No books found by author '${author}'` });
    }
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;
    const bookKeys = Object.keys(books);
    const result = {};

    bookKeys.forEach((key) => {
        if (books[key].title.toLowerCase() === title.toLowerCase()) {
            result[key] = books[key];
        }
    });

    if (Object.keys(result).length > 0) {
        return res.status(200).send(JSON.stringify(result, null, 4));
    } else {
        return res.status(404).json({ message: `No books found with title '${title}'` });
    }
});

//  Get book review
public_users.get('/review/:isbn', function (req, res) {
    const isbn = req.params.isbn;

    if (books[isbn]) {
        return res.status(200).json(books[isbn].reviews);
    } else {
        return res.status(404).json({ message: `Book with ISBN ${isbn} not found` });
    }
});

// --------------- Task 10: Get all books asynchronously -----------------
const axios = require("axios");

const getAllBooksAsync = async () => {
    try {
        const response = await axios.get("http://localhost:5000/");
        // Pretty-print JSON with indentation
        console.log("===== Task 10: All Books =====");
        console.log(JSON.stringify(response.data, null, 4));
        console.log("===== End of Task 10 =====");
    } catch (error) {
        console.log("Error fetching books:", error.message);
    }
};

// Call the function
getAllBooksAsync();

// --------------- Task 11: Get Book by ISBN asynchronously -----------------
const getBookByISBNAsync = async (isbn) => {
    try {
        const response = await axios.get(`http://localhost:5000/isbn/${isbn}`);
        console.log(`===== Task 11: Book with ISBN ${isbn} =====`);
        console.log(JSON.stringify(response.data, null, 4));
        console.log(`===== End of Task 11 =====`);
    } catch (error) {
        console.log(`Error fetching book with ISBN ${isbn}:`, error.message);
    }
};

// Call the function for testing
getBookByISBNAsync(1); 

// --------------- Task 12: Get Books by Author asynchronously -----------------
const getBooksByAuthorAsync = async (author) => {
    try {
        const response = await axios.get(`http://localhost:5000/author/${encodeURIComponent(author)}`);
        console.log(`===== Task 12: Books by Author '${author}' =====`);
        console.log(JSON.stringify(response.data, null, 4));
        console.log(`===== End of Task 12 =====`);
    } catch (error) {
        console.log(`Error fetching books by author '${author}':`, error.message);
    }
};

// Call the function for testing
getBooksByAuthorAsync("Chinua Achebe");

// --------------- Task 13: Get Books by Title asynchronously -----------------
const getBooksByTitleAsync = async (title) => {
    try {
        const response = await axios.get(`http://localhost:5000/title/${encodeURIComponent(title)}`);
        console.log(`===== Task 13: Books with Title '${title}' =====`);
        console.log(JSON.stringify(response.data, null, 4));
        console.log(`===== End of Task 13 =====`);
    } catch (error) {
        console.log(`Error fetching books with title '${title}':`, error.message);
    }
};

// Call the function for testing
getBooksByTitleAsync("Things Fall Apart");

module.exports.general = public_users;
