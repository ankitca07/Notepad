import React from 'react';
import { motion } from 'framer-motion';
import SignupForm from '../components/auth/SignupForm'; // Import the SignupForm
import styles from './AuthPage.module.css'; // Import shared page styles

const SignupPage = () => {
  return (
    <div className={styles.pageWrapper}> {/* Use shared page wrapper style */}
      <motion.div
         className={styles.formCard} // Use shared form card style
         initial={{ opacity: 0, y: -50 }}
         animate={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.5 }}
      >
        <div className={styles.headingContainer}>
          <h2 className={styles.heading}>
            Create your account
          </h2>
        </div>
        <SignupForm /> {/* Render the SignupForm */}
      </motion.div>
    </div>
  );
};

export default SignupPage;