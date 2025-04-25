import React from 'react';
import { motion } from 'framer-motion';
import LoginForm from '../components/auth/LoginForm';
import styles from './AuthPage.module.css'; // Import shared page styles

const LoginPage = () => {
  return (
    <div className={styles.pageWrapper}>
      <motion.div
         className={styles.formCard}
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
      >
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>
            Sign in to your account
          </h2>
        </div>
        <LoginForm />
      </motion.div>
    </div>
  );
};

export default LoginPage;