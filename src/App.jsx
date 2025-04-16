<<<<<<< HEAD
/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
=======

>>>>>>> origin/master
import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
<<<<<<< HEAD
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
=======
  Navigate, 
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Forgotpassword from './pages/Forgotpassword';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import { useAuth } from './context/AuthContext';
import Verifyaccount from './pages/verification'
>>>>>>> origin/master

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
<<<<<<< HEAD
=======
          <Route path='/forgotpassword' element={<Forgotpassword/>}/>
          <Route path='verification' element={<Verifyaccount/>}/>
>>>>>>> origin/master

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
<<<<<<< HEAD
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
=======
          
>>>>>>> origin/master
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
<<<<<<< HEAD
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

=======
         
>>>>>>> origin/master
          {/* Redirect root to dashboard */}
          <Route path='/' element={<Navigate to='/dashboard' replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
<<<<<<< HEAD
=======



 
>>>>>>> origin/master
