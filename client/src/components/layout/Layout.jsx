import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <div className={styles.layout}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar />
        <main className={styles.scrollablePane}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;