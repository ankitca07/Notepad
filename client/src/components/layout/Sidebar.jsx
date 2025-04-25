import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import Button from '../common/Button';
import { HomeIcon, DocumentTextIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';
import styles from './Sidebar.module.css';

const Sidebar = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    // Combine base and active class checking
    const getNavLinkClass = ({ isActive }) =>
      `${styles.navLink} ${isActive ? styles.navLinkActive : ''}`;


    return (
        // Wrapper div controls visibility via CSS media query
        <div className={styles.sidebar}>
            <div className={styles.sidebarInner}>
                <div className={styles.scrollable}>
                    <div className={styles.logoArea}>
                        <span className={styles.logoText}>NotesApp</span>
                    </div>
                    <nav className={styles.nav}>
                        <NavLink to="/dashboard" end className={getNavLinkClass}>
                            <HomeIcon className={styles.navLinkIcon} />
                            Dashboard
                        </NavLink>
                        {/* Assuming notes are on dashboard index for now */}
                         <NavLink to="/dashboard" end className={getNavLinkClass}>
                            <DocumentTextIcon className={styles.navLinkIcon} />
                            My Notes
                        </NavLink>
                        {/* Add other links similarly */}
                    </nav>
                </div>
                <div className={styles.logoutSection}>
                    <Button
                        onClick={handleLogout}
                        variant="secondary"
                        className={styles.logoutButton}
                    >
                        <ArrowLeftOnRectangleIcon className={styles.logoutIcon} />
                        Logout
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;