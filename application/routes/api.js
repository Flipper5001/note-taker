// * `GET /api/notes` should read the `db.json` file and return all saved notes as JSON.
// * `POST /api/notes` should receive a new note to save on the request body, add it to the `db.json` file, and then return the new note to the client. You'll need to find a way to give each note a unique id when it's saved (look into npm packages that could do this for you).
// * `DELETE /api/notes/:id` should receive a query parameter that contains the id of a note to delete. To delete a note, you'll need to read all notes from the `db.json` file, remove the note with the given `id` property, and then rewrite the notes to the `db.json` file.

const router = require('express').Router();
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

const dbPath = path.join(__dirname,'..', 'db', 'db.json')

// seperated into functions to assist with clarity and understanding
// GET route for notes in db
function getNotes(){
  const db = fs.readFileSync(dbPath, 'utf-8')
  return JSON.parse(db) || [];
}

router.get('/notes', (req,res) => {
  const notes = getNotes();
  res.json(notes)
});

// POST route for new notes saved
function saveNotes(title, text){
  const newNote = {
    title,
    text,
    id: uuidv4(),
  };

  const notes = getNotes();

  notes.push(newNote);

  fs.writeFileSync(dbPath, JSON.stringify(notes), 'utf-8')

  return newNote;
}

router.post('/notes', (req, res) => {
  const rendered = saveNotes(req.body.title, req.body.text)
  res.json(rendered);
});

// DELETE route for notes saved to be removed
function deleteNote(id){
  const notes = getNotes();
  const filtered = notes.filter((note) => {
    return note.id !== id;
  })
  fs.writeFileSync(dbPath, JSON.stringify(filtered), 'utf-8')
}

router.delete('/notes/:id', (req,res) => {
  const removed = deleteNote(req.params.id)
  res.json(removed)
})
  
module.exports = router