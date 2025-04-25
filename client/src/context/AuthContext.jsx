import React, { createContext, useState, useEffect, useMemo, useCallback } from 'react';
import api from '../services/api'; // Your Axios instance

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [token, setToken] = useState(() => localStorage.getItem('authToken') || null); // Initialize token from localStorage
    const [loading, setLoading] = useState(true); // Start as true to check auth status
    const [error, setError] = useState(null);

    // Function to clear errors
    const clearError = useCallback(() => setError(null), []);

    // Function to perform logout
    const logout = useCallback(() => {
        setToken(null);
        setUser(null);
        localStorage.removeItem('authToken');
        delete api.defaults.headers.common['Authorization'];
        // No need to setLoading(false) here, as the effect below handles it
    }, []); // Dependencies: setToken, setUser

    // Effect to manage token changes and fetch user profile
    useEffect(() => {
        if (token) {
            // Set auth header for subsequent requests
            api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            localStorage.setItem('authToken', token);

            // If we have a token but no user info (e.g., page refresh), fetch profile
            if (!user) {
                setLoading(true); // Ensure loading is true while fetching profile
                api.get('/auth/profile')
                    .then(res => {
                        setUser(res.data);
                        setError(null); // Clear any previous error on successful fetch
                    })
                    .catch(err => {
                        console.error("Failed to fetch profile:", err.response?.data?.message || err.message);
                        // If profile fetch fails (e.g., invalid token), log out
                        logout();
                        setError('Session expired or invalid. Please log in again.'); // Set specific error
                    })
                    .finally(() => {
                        setLoading(false); // Set loading false after fetch attempt
                    });
            } else {
                // If token and user exist, we are authenticated and not loading
                setLoading(false);
            }
        } else {
            // No token, ensure cleanup and set loading to false
            delete api.defaults.headers.common['Authorization'];
            localStorage.removeItem('authToken');
            setUser(null);
            setLoading(false); // No token means auth check is complete (not logged in)
        }
    }, [token, user, logout]); // Rerun when token changes, or user state changes


    // Login function
    const login = async (email, password) => {
        setLoading(true);
        clearError();
        try {
            const { data } = await api.post('/auth/login', { email, password });
            // Success: set user and token, which triggers the useEffect
            setUser(data); // Store user data returned from API (_id, name, email, etc.)
            setToken(data.token); // Store the token
            // setLoading(false); // Let the useEffect handle setting loading to false
            return true;
        } catch (err) {
            const message = err.response?.data?.message || 'Login failed. Please check credentials.';
            console.error("Login error:", message);
            setError(message);
            setLoading(false); // Explicitly set loading false on error
            return false;
        }
    };

    // Signup function
    const signup = async (name, email, password) => {
        setLoading(true);
        clearError();
        try {
            const { data } = await api.post('/auth/signup', { name, email, password });
            // Success: set user and token, which triggers the useEffect
            setUser(data); // Store user data returned from API
            setToken(data.token); // Store the token
            // setLoading(false); // Let the useEffect handle setting loading to false
            return true;
        } catch (err) {
            const message = err.response?.data?.message || 'Signup failed. Please try again.';
            console.error("Signup error:", message);
            setError(message);
            setLoading(false); // Explicitly set loading false on error
            return false;
        }
    };

    // Memoize the context value
    const contextValue = useMemo(() => ({
        user,
        token,
        isAuthenticated: !!user && !!token, // User must be loaded and token present
        loading,
        error,
        login,
        signup,
        logout,
        clearError,
    }), [user, token, loading, error, logout, clearError]); // Include all dependencies

    return (
        <AuthContext.Provider value={contextValue}>
            {/* Optionally, prevent rendering children until initial check is done,
                but the routes handle the loading state now. */}
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;