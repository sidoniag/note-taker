const express = require('express');
const PORT = process.env.PORT || 3001;
const app = express();

const notes = require('.db/db.json');

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