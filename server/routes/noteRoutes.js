const express = require('express');
const {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
} = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Apply protect middleware to all note routes
router.use(protect);

router.route('/')
    .get(getNotes)
    .post(createNote);

router.route('/:id')
    .get(getNoteById)
    .put(updateNote)
    .delete(deleteNote);

module.exports = router;