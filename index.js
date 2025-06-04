const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

const FILE_PATH = path.join(__dirname, 'board.md');

app.use(express.json());
app.use(express.static('public')); // serves your HTML+JS

// Get board
app.get('/board', (req, res) => {
    fs.readFile(FILE_PATH, 'utf8', (err, data) => {
        if (err) return res.status(500).json({ error: 'Failed to load board' });
        res.json({ markdown: data });
    });
});

// Save board
app.post('/board', (req, res) => {
    const { markdown } = req.body;
    if (typeof markdown !== 'string') return res.status(400).json({ error: 'Invalid data' });

    fs.writeFile(FILE_PATH, markdown, err => {
        if (err) return res.status(500).json({ error: 'Failed to save board' });
        res.json({ status: 'saved' });
    });
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
