import React from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate, 
} from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import DashboardLayout from './components/DashboardLayout';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import Forgotpassword from './pages/Forgotpassword';
import DashboardPage from './pages/DashboardPage';
import AnalyticsPage from './pages/AnalyticsPage';
import LandingPage from './pages/LandingPage';
import DemoPage from './pages/DemoPage';
import { useAuth } from './context/AuthContext';
import Verifyaccount from './pages/verification'

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
          <Route path='/' element={<LandingPage />} />
          <Route path='/demo' element={<DemoPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/forgotpassword' element={<Forgotpassword/>}/>
          <Route path='verification' element={<Verifyaccount/>}/>

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
            path='/analytics'
            element={
              <PrivateRoute>
                <DashboardLayout>
                  <AnalyticsPage />
                </DashboardLayout>
              </PrivateRoute>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;



 
