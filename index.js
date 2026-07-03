const express = require("express");
require("dotenv").config();
const app = express();

app.use(express.json());

const books = [

  { id: 1, title: 'The Great Gatsby', author: 'F. Scott Fitzgerald', year: 1925 },

  { id: 2, title: 'To Kill a Mockingbird', author: 'Harper Lee', year: 1960 },

  { id: 3, title: '1984', author: 'George Orwell', year: 1949 }

];

const todos = [

  { id: 1, title: 'Water the plants', day: 'Saturday' },

  { id: 2, title: 'Go for a walk', day: 'Sunday' }

];

app.get("/", (req, res) => {
  res.send("Hello, From Express Server.");
});

app.post("/books", (req, res)=> {
    const newBook = req.body;

    if(!newBook.title || !newBook.author || !newBook.year) {
        res.status(400).json({ error: "Title, author, and year are required" });
    } else {
        books.push(newBook);
        res.status(201).json({ message: "Book added successfully", book: newBook });
    }
});

app.get("/books", (req, res) => {
    res.send(books);
});

app.post("/todos", (req, res) => {
    const newTodo = req.body;
    if(!newTodo.title || !newTodo.day) {
        res.status(400).json({ error: "Title and day are required" });
    } else {
        todos.push(newTodo);
        res.status(201).json({ message: "Todo added successfully", todo: newTodo });    
    }
});

app.get("/todos", (req, res) => {
    res.send(todos);
});

app.delete("/todos/:id", (req, res) => {
    const todoId = req.params.id;
    const index = todos.findIndex((todo) => todo.id == todoId);

    if (index === -1) {
        res.status(404).json({ error: "Todo does not exist" });
    } else {
        todos.splice(index, 1);
        res.status(200).json({ message: "Todo deleted successfully" });
    }
});

app.delete("/books/:id", (req, res) => {
    const bookId = req.params.id;
    const index = books.findIndex((book) => book.id == bookId);

    if (index === -1) {
        res.status(404).json({ error: "Book not found" });
    } else {
        books.splice(index, 1);
        res.status(200).json({ message: "Book deleted successfully" });
    }
});

app.post("/books/:id", (req, res) => {
    const bookId = parseInt(req.params.id);
    const updatedBook = req.body;
    const bookToUpdate = books.find((book) => book.id === bookId);

    if(!bookToUpdate){
        res.status(404).json({ error: "Book not found" });

    } else {
        if(!updatedBook.title || !updatedBook.author || !updatedBook.year) {
            res.status(400).json({ error: "Title, author, and year are required" });
        } else {
            Object.assign(bookToUpdate, updatedBook);
            res.status(200).json({ message: "Book updated successfully", book: updatedBook }); 
        }         
    }
});

app.post("/todos/:id", (req, res) => {
    const todoId = parseInt(req.params.id);
    const updatedTodo = req.body;
    const todoToUpdate = todos.find((todo) => todo.id === todoId);

    if(!todoToUpdate){
        res.status(404).json({ error: "Todo does not exist" });

    } else {
        if(!updatedTodo.title || !updatedTodo.day) {
            res.status(400).json({ error: "Title and day are required" });
        } else {
            Object.assign(todoToUpdate, updatedTodo);
            res.status(200).json({ message: "Todo updated successfully", todo: updatedTodo }); 
        }         
    }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});