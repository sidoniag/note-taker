const express = require('express');
const notes = require('.db/db.json');
const PORT = process.env.PORT || 3001;
const app = express();
const fs = require('fs');
const path = require ('path');

// middleware
app.use(express.static('public'));
// parse incoming string or array data
app.use(express.urlencoded({ extended: true }));
// parse incoming JSON data
app.use(express.json());

app.get('/db/db', (req, res) => {
    res.json(notes);
});

// connect index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '.public/index.html'));
});

// connect notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
})