/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import ApiFunctionsPage from './pages/ApiFunctionsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import HelpPage from './pages/HelpPage';
import ProfilePage from './pages/ProfilePage';
import { useAuth } from './context/AuthContext';

const PrivateRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? children : <Navigate to='/login' />;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public Routes */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />

          {/* Protected Routes */}
          <Route
            path='/dashboard'
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <DashboardPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/api-functions'
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ApiFunctionsPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/analytics'
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <AnalyticsPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/help'
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <HelpPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
          <Route
            path='/profile'
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <ProfilePage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />

          {/* Redirect root to dashboard */}
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
