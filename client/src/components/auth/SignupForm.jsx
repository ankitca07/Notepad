import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import InputField from '../common/InputField';
import Button from '../common/Button';
import styles from './AuthForm.module.css'; // Import shared auth form styles

const SignupForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState(''); // For local form validation errors
  const { signup, loading, error: authError, clearError } = useAuth(); // Use signup function
  const navigate = useNavigate();

  const validateForm = () => {
    if (!name || !email || !password) {
      setFormError('Name, email, and password are required.');
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setFormError('Please enter a valid email address.');
      return false;
    }
    if (password.length < 6) { // Example: Basic password length validation
        setFormError('Password must be at least 6 characters long.');
        return false;
    }
    setFormError(''); // Clear error if validation passes
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError(); // Clear previous auth errors
    setFormError(''); // Clear previous form errors

    if (!validateForm()) {
      return; // Stop submission if form is invalid
    }

    const success = await signup(name, email, password);
    if (success) {
      navigate('/dashboard'); // Redirect to dashboard on successful signup
    }
    // Auth error (like 'User already exists') is handled by useAuth and displayed below
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={styles.form} // Use shared form class
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <InputField
        id="name"
        label="Full Name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="John Doe"
        required
        error={formError.includes('Name') || formError.includes('required') ? formError : null}
      />
      <InputField
        id="email"
        label="Email Address"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="you@example.com"
        required
        error={formError.includes('email') || formError.includes('required') ? formError : null}
      />
      <InputField
        id="password"
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="•••••••• (min. 6 characters)"
        required
        error={formError.includes('password') || formError.includes('required') ? formError : null}
      />

      {/* Display Auth Error (e.g., user exists) */}
      {authError && (
         <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.authError} // Use authError class
          >
              {authError}
          </motion.div>
      )}
      {/* Display Form Validation Error */}
       {formError && !authError && (
         <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.formError} // Use formError class
          >
              {formError}
          </motion.div>
      )}

      <div style={{ marginTop: '1.5rem' }}> {/* Add space before button */}
        <Button type="submit" isLoading={loading} disabled={loading} fullWidth>
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </div>

       <p className={styles.linkText}>
          Already have an account?{' '}
          <Link to="/login" className={styles.link}>
              Sign in
          </Link>
      </p>
    </motion.form>
  );
};

export default SignupForm;