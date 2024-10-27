// index.js
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

let notes = [];  // Array to hold notes

// Serve HTML file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

// Handle form submission
// app.post('/add-note', (req, res) => {
//   const note = req.body.note;
//   if (note) {
//     notes.push(note);
//   }
//   res.redirect('/');
app.post('/add-note', (req, res) => {
  const noteText = req.body.note;
  if (noteText) {
    const timestamp = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
    const note = { text: noteText, time: timestamp };
    notes.push(note);
    // Log the note and its timestamp to the console
    console.log(`Note added: "${note.text}" at ${note.time}`);
  } else {
    console.log("No note text provided."); // Log if no note text was received
  }

  res.redirect('/');


});

// Get all notes
app.get('/notes', (req, res) => {
  res.json(notes);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
