const express = require('express');
const notes = require('./db/db.json');
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

// functions
function filterByQuery(query, notesArray) {
    let filteredResults = notesArray;
    if (query.title) {
        filteredResults = filteredResults.filter(note => note.title === query.title);
    }
    if (query.text) {
        filteredResults = filteredResults.filter(note => note.text === query.text);
    }
    return filteredResults;
}

function findById(id, notesArray) {
    const result = notesArray.filter(notes => notes.id === id)[0];
    return result;
}

function createNewNote(body, notesArray) {
    const newNote = body;
    notesArray.push(newNote);
    fs.writeFileSync(path.join(__dirname, './db/db.json'),
    JSON.stringify(notes, null, 2)
    );
    
    return newNote;
}

function validateNote(note) {
    if (!notes.title || typeof notes.title !== 'string') {
        return false;
    }
    if (!notes.text || typeof notes.text !== 'string') {
        return false;
    }
    return true;
}

// route to notes
app.get('/api/notes', (req, res) => {
    let results = notes;
    if (req.query) {
        results = filterByQuery(req.query, results)
    }
    res.json(results);
});

// connect index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// connect notes.html file
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'));
});

app.listen(PORT, () => {
    console.log('API server now on port ${PORT}!');
})