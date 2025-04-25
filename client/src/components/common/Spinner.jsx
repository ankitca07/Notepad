import React from 'react';
import styles from './Spinner.module.css';

const Spinner = ({ size = 'md' }) => { // Default to medium size
  const spinnerClasses = `${styles.spinner} ${styles[size] || styles.md}`;
  return <div className={spinnerClasses} role="status" aria-label="Loading..."></div>;
};

export default Spinner;