import React from 'react';
import NoteCard from './NoteCard';
import { AnimatePresence } from 'framer-motion';
import styles from './NotesList.module.css';
import Spinner from '../common/Spinner'; // Import Spinner

const NotesList = ({ notes, onEdit, onDelete, isLoading }) => {

  if (isLoading) {
      return <div className={styles.message}><Spinner size="lg" /></div>; // Show spinner
  }

  if (!notes || notes.length === 0) {
    return <p className={styles.message}>You haven't created any notes yet.</p>;
  }

  return (
    <div className={styles.grid}>
      <AnimatePresence>
          {notes.map((note) => (
              <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={onEdit}
                  onDelete={onDelete}
              />
          ))}
      </AnimatePresence>
    </div>
  );
};

export default NotesList;