import React from 'react';
import useTheme from '../hooks/useTheme';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import styles from './DarkModeToggle.module.css';

const DarkModeToggle = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className={styles.toggleButton}
      aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {theme === 'dark' ? (
        <SunIcon className={styles.icon} />
      ) : (
        <MoonIcon className={styles.icon} />
      )}
    </button>
  );
};

export default DarkModeToggle;