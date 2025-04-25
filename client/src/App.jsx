import React from 'react';
import { Routes, Route, Navigate, useLocation, Link } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import DashboardPage from './pages/DashboardPage';
import useAuth from './hooks/useAuth';
import Layout from './components/layout/Layout'; // Dashboard layout
import Spinner from './components/common/Spinner'; // Import Spinner

// Global loading indicator styles (can be basic)
const loadingOverlayStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.1)', // Semi-transparent background
    zIndex: 9999,
};

// Component to protect routes
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    // Show a full-screen loading indicator while checking authentication
    return (
        <div style={loadingOverlayStyle}>
            <Spinner size="lg" />
        </div>
    );
  }

  // If finished loading and not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If finished loading and authenticated, render the children (Dashboard with Layout)
  return children;
};

// Component to redirect authenticated users away from public pages (Login/Signup)
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useAuth();
    const location = useLocation(); // Get location to check for redirect state

    if (loading) {
        // Also show loading indicator here to prevent flicker
        return (
            <div style={loadingOverlayStyle}>
                <Spinner size="lg" />
            </div>
        );
    }

    // If finished loading and IS authenticated, redirect away from public route
    // Check location.state?.from to prevent redirect loops if coming from a protected route
    if (isAuthenticated) {
        const from = location.state?.from?.pathname || '/dashboard';
        return <Navigate to={from} replace />;
    }

    // If finished loading and NOT authenticated, render the public page (Login/Signup)
    return children;
}

function App() {
   const location = useLocation(); // Needed for AnimatePresence page transition key

  return (
    // AnimatePresence allows exit animations for routes
    <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          {/* Public Routes */}
          <Route
              path="/login"
              element={
                  <PublicRoute>
                      <LoginPage />
                  </PublicRoute>
              }
          />
          <Route
              path="/signup"
              element={
                  <PublicRoute>
                      <SignupPage />
                  </PublicRoute>
              }
          />

          {/* Private Routes */}
          <Route
            path="/dashboard/*" // Use /* if dashboard has nested routes later
            element={
              <PrivateRoute>
                 {/* Layout wraps ALL pages inside the protected area */}
                 <Layout>
                     {/* Define routes *relative* to /dashboard/ here */}
                     <Routes>
                          <Route index element={<DashboardPage />} />
                          {/* Example nested route:
                          <Route path="settings" element={<SettingsPage />} /> */}
                     </Routes>
                 </Layout>
              </PrivateRoute>
            }
          />

          {/* Redirect base path */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />


          {/* Catch-all 404 Not Found Route */}
          <Route path="*" element={
              <div style={{ textAlign: 'center', padding: '50px', fontSize: '1.5rem'}}>
                  <h2>404 - Page Not Found</h2>
                  {/* Link usage requires the import */}
                  <Link to="/">Go Home</Link>
              </div>
          } />
        </Routes>
     </AnimatePresence>
  );
}

export default App;