/* eslint-disable react-refresh/only-export-components */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored auth token and user data on mount
    const token = localStorage.getItem('access_token');
    const userData = localStorage.getItem('user_data');
    
    if (token) {
      if (userData) {
        setUser({ token, ...JSON.parse(userData) });
      } else {
        setUser({ token });
      }
    }
    setLoading(false);
  }, []);

  const login = async (credentials) => {
    try {
      const response = await api.login(credentials);
      console.log("API Login Response:", response);
      
      if (response.status === 'ok' && response.data && response.data.verification_token) {
        const token = response.data.verification_token;
        localStorage.setItem('access_token', token);
        
        // Store user data in localStorage
        const userData = {
          email: credentials.email,
          name: response.data.name || credentials.email.split('@')[0], // Use name from response or fallback to username from email
          userId: response.data.user_id || '',
        };
        
        localStorage.setItem('user_data', JSON.stringify(userData));
        setUser({ token, ...userData });
        return { success: true, data: response.data };
      }
      return { success: false, message: response.message };
    } catch (error) {
      console.error("Login error:", error);
      return { success: false, message: 'An error occurred during login' };
    }
  };

  const logout = () => {
    // Clear all localStorage data
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_data');
    localStorage.removeItem('selectedProject');
    setUser(null);
  };

  const updateUserProfile = (updatedData) => {
    if (user) {
      const updatedUser = { ...user, ...updatedData };
      localStorage.setItem('user_data', JSON.stringify({
        email: updatedUser.email,
        name: updatedUser.name,
        userId: updatedUser.userId,
      }));
      setUser(updatedUser);
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    updateUserProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
