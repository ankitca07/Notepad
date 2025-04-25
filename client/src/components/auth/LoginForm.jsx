import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuth from '../../hooks/useAuth';
import InputField from '../common/InputField';
import Button from '../common/Button';
import styles from './AuthForm.module.css'; // Import shared styles

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, loading, error: authError, clearError } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
      // ... (validation logic remains the same)
      if (!email || !password) {
          setFormError('Email and password are required.');
          return false;
      }
      if (!/\S+@\S+\.\S+/.test(email)) {
         setFormError('Please enter a valid email address.');
         return false;
      }
      setFormError('');
      return true;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setFormError('');
    if (!validateForm()) return;
    const success = await login(email, password);
    if (success) {
      navigate('/dashboard');
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      className={styles.form} // Apply form class
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
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
        placeholder="••••••••"
        required
         error={formError.includes('password') || formError.includes('required') ? formError : null}
      />

      {authError && (
         <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className={styles.authError} // Use authError class
          >
              {authError}
          </motion.div>
      )}
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
          {loading ? 'Signing In...' : 'Sign In'}
        </Button>
      </div>
       <p className={styles.linkText}>
          Don't have an account?{' '}
          <Link to="/signup" className={styles.link}>
              Sign up
          </Link>
      </p>
    </motion.form>
  );
};

export default LoginForm;