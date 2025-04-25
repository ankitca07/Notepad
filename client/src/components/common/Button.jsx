import React from 'react';
import { motion } from 'framer-motion';
import Spinner from './Spinner';
import styles from './Button.module.css';

const Button = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size,
  isLoading = false,
  disabled = false,
  className = '',
  fullWidth = false,
  ...props
}) => {
  const buttonClasses = [
    styles.button,
    styles[variant] || styles.primary,
    size ? styles[size] : '',
    fullWidth ? styles.fullWidth : '',
    className // Allow pass-through classes
  ].filter(Boolean).join(' '); // Filter out falsy values and join

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={buttonClasses}
      disabled={disabled || isLoading}
      whileHover={{ scale: disabled || isLoading ? 1 : 1.03 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      {...props}
    >
      {isLoading ? <Spinner size="sm" /> : children}
    </motion.button>
  );
};

export default Button;