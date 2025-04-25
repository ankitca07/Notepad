import React from 'react';
import styles from './InputField.module.css';

const InputField = ({ id, label, type = 'text', value, onChange, placeholder, error, required = false }) => {
  const inputClasses = [
      styles.input,
      error ? styles.inputError : ''
  ].filter(Boolean).join(' ');

  return (
    <div className={styles.fieldWrapper}>
      <label htmlFor={id} className={styles.label}>
        {label} {required && <span className={styles.labelRequired}>*</span>}
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className={inputClasses}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      {error && <p id={`${id}-error`} className={styles.errorMessage}>{error}</p>}
    </div>
  );
};

export default InputField;