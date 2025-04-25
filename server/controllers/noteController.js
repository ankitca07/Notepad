const Note = require('../models/Note');

// @desc    Get logged in user's notes
// @route   GET /api/notes
// @access  Private
const getNotes = async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user._id }).sort({ createdAt: -1 }); // Get notes for logged-in user
    res.json(notes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error fetching notes' });
  }
};

// @desc    Create a new note
// @route   POST /api/notes
// @access  Private
const createNote = async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
      return res.status(400).json({ message: 'Please add a title and content' });
  }

  try {
    const note = new Note({
      title,
      content,
      user: req.user._id, // Associate note with logged-in user
    });

    const createdNote = await note.save();
    res.status(201).json(createdNote);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error creating note' });
  }
};

// @desc    Get single note by ID
// @route   GET /api/notes/:id
// @access  Private
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }

        // Check if the note belongs to the logged-in user
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: 'Not authorized to view this note' });
        }

        res.json(note);
    } catch (error) {
        console.error(error);
         if (error.kind === 'ObjectId') {
             return res.status(404).json({ message: 'Note not found' });
         }
        res.status(500).json({ message: 'Server Error fetching note' });
    }
};


// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = async (req, res) => {
  const { title, content } = req.body;

  try {
    let note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    // Update fields if provided
    if (title) note.title = title;
    if (content) note.content = content;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } catch (error) {
    console.error(error);
     if (error.kind === 'ObjectId') {
         return res.status(404).json({ message: 'Note not found' });
     }
    res.status(500).json({ message: 'Server Error updating note' });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    // Check if the note belongs to the logged-in user
    if (note.user.toString() !== req.user._id.toString()) {
      return res.status(401).json({ message: 'User not authorized' });
    }

    await note.deleteOne(); // Use deleteOne() on the document

    res.json({ message: 'Note removed' });
  } catch (error) {
    console.error(error);
     if (error.kind === 'ObjectId') {
         return res.status(404).json({ message: 'Note not found' });
     }
    res.status(500).json({ message: 'Server Error deleting note' });
  }
};

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};