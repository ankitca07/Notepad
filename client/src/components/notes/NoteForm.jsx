import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import InputField from '../common/InputField';
import Button from '../common/Button';
import styles from './NoteForm.module.css';

const NoteForm = ({ onSubmit, initialData = null, onCancel, isLoading }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setContent(initialData.content);
    } else {
      setTitle('');
      setContent('');
    }
    setError('');
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
        setError('Title and content cannot be empty.');
        return;
    }
    setError('');
    onSubmit({ title, content });
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={styles.formWrapper}
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className={styles.formTitle}>
          {initialData ? 'Edit Note' : 'Create New Note'}
      </h2>
      <InputField
        id="noteTitle"
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Note title"
        required
      />
      <div className={styles.textareaWrapper}>
         <label htmlFor="noteContent" className={styles.label}>
              Content <span className={styles.labelRequired}>*</span>
          </label>
         <textarea
              id="noteContent"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Your note content..."
              required
              className={styles.textarea}
          />
      </div>

       {error && (
         <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.error}
          >
              {error}
          </motion.div>
      )}

      <div className={styles.buttonGroup}>
        {onCancel && (
          <Button type="button" onClick={onCancel} variant="secondary" disabled={isLoading}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" isLoading={isLoading} disabled={isLoading}>
           {isLoading ? 'Saving...' : (initialData ? 'Update Note' : 'Create Note')}
        </Button>
      </div>
    </motion.form>
  );
};

export default NoteForm;