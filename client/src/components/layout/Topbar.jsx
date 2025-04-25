import React from 'react';
import useAuth from '../../hooks/useAuth';
import DarkModeToggle from '../DarkModeToggle';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import styles from './Topbar.module.css';

const Topbar = () => {
  const { user } = useAuth();

  return (
    <header className={styles.topbar}>
      <div className={styles.content}>
        <div className={styles.left}>
            <h1 className={styles.title}>Dashboard</h1>
        </div>

        <div className={styles.right}>
          <DarkModeToggle />
          <div className={styles.userInfo}>
              <span className={styles.userName}>
                  Welcome, {user?.name || 'User'}
              </span>
               <UserCircleIcon className={styles.userIcon} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Topbar;