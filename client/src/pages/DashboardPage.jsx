import React, { useState, useEffect, useCallback } from 'react';
import NotesList from '../components/notes/NotesList';
import NoteForm from '../components/notes/NoteForm';
import api from '../services/api';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../components/common/Button';
import { PlusIcon } from '@heroicons/react/24/solid';
import styles from './DashboardPage.module.css';

const DashboardPage = () => {
  const [notes, setNotes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingNote, setEditingNote] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [formLoading, setFormLoading] = useState(false);

  const fetchNotes = useCallback(async () => {
    // ... fetchNotes logic remains the same
     setLoading(true);
     setError(null);
     try {
       const { data } = await api.get('/notes');
       setNotes(data);
     } catch (err) {
       console.error("Failed to fetch notes:", err);
       setError(err.response?.data?.message || 'Failed to load notes.');
     } finally {
       setLoading(false);
     }
  }, []);

  useEffect(() => {
    fetchNotes();
  }, [fetchNotes]);

  const handleCreateOrUpdate = async (noteData) => {
    // ... handleCreateOrUpdate logic remains the same
     setFormLoading(true);
     setError(null);
     try {
        let updatedNote;
        if (editingNote) {
            const { data } = await api.put(`/notes/${editingNote._id}`, noteData);
            updatedNote = data;
            setNotes(notes.map(n => (n._id === editingNote._id ? updatedNote : n)));
            setEditingNote(null);
        } else {
            const { data } = await api.post('/notes', noteData);
            updatedNote = data;
            setNotes([updatedNote, ...notes]);
        }
         setShowForm(false);
     } catch (err) {
        console.error("Failed to save note:", err);
        setError(err.response?.data?.message || `Failed to ${editingNote ? 'update' : 'create'} note.`);
     } finally {
        setFormLoading(false);
     }
  };

  const handleEdit = (note) => {
    // ... handleEdit logic remains the same
    setEditingNote(note);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = async (id) => {
    // ... handleDelete logic remains the same
     if (window.confirm('Are you sure you want to delete this note?')) {
         // Use main loading state for simplicity, or add a specific delete loading state
         setLoading(true);
         setError(null);
         try {
            await api.delete(`/notes/${id}`);
            setNotes(notes.filter((note) => note._id !== id));
             // If the deleted note was being edited, close the form
             if (editingNote && editingNote._id === id) {
                 setShowForm(false);
                 setEditingNote(null);
             }
         } catch (err) {
            console.error("Failed to delete note:", err);
            setError(err.response?.data?.message || 'Failed to delete note.');
         } finally {
            setLoading(false);
         }
    }
  };

  const handleCancelEdit = () => {
    // ... handleCancelEdit logic remains the same
      setEditingNote(null);
      setShowForm(false);
      setError(null);
  }

  const toggleCreateForm = () => {
    // ... toggleCreateForm logic remains the same
      setEditingNote(null);
      setShowForm(!showForm);
      setError(null);
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className={styles.header}>
        <h2 className={styles.title}>My Notes</h2>
         <Button onClick={toggleCreateForm} variant="primary">
             <PlusIcon className={styles.newNoteButtonIcon} />
             {showForm && !editingNote ? 'Cancel' : 'New Note'}
         </Button>
      </div>

      {error && !formLoading && (
          <div className={styles.errorBanner}>
              {error}
          </div>
      )}

      <AnimatePresence>
         {showForm && (
            <NoteForm
                key={editingNote ? editingNote._id : 'create'}
                onSubmit={handleCreateOrUpdate}
                initialData={editingNote}
                onCancel={editingNote ? handleCancelEdit : null}
                isLoading={formLoading}
            />
          )}
       </AnimatePresence>

      <NotesList
         notes={notes}
         onEdit={handleEdit}
         onDelete={handleDelete}
         // Pass loading state to NotesList
         isLoading={loading && notes.length === 0 && !error}
      />
    </motion.div>
  );
};

export default DashboardPage;