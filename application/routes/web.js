// * `GET /notes` should return the `notes.html` file.
// * `GET *` should return the `index.html` file.

const router = require('express').Router();
const path = require('path');

// GET Route for notes page
router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public','notes.html'))
}
);

// GET Route for homepage
router.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', 'public','index.html'))
);

module.exports = router