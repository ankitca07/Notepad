import React from 'react';
import { motion } from 'framer-motion';
import Button from '../common/Button';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/outline';
import styles from './NoteCard.module.css';

const NoteCard = ({ note, onEdit, onDelete }) => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, transition: { duration: 0.2 } }}
      className={styles.card}
    >
      <div className={styles.contentWrapper}>
        <h3 className={styles.title}>{note.title}</h3>
        <p className={styles.content}>{note.content}</p>
      </div>
      <div className={styles.footer}>
        <span className={styles.timestamp}>
          {new Date(note.updatedAt).toLocaleDateString()}
        </span>
         <Button
              onClick={() => onEdit(note)}
              variant="secondary"
              size="sm" // Button size handles icon container size mostly
              className={styles.actionButton} // Fine-tune padding if needed
              aria-label="Edit Note"
          >
              <PencilSquareIcon /> {/* Let CSS handle icon size */}
         </Button>
         <Button
              onClick={() => onDelete(note._id)}
              variant="danger"
              size="sm"
              className={styles.actionButton}
              aria-label="Delete Note"
          >
              <TrashIcon />
         </Button>
      </div>
    </motion.div>
  );
};

export default NoteCard;