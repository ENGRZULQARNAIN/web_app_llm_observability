import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import MetricCard from '../components/cards/MetricCard';
import img from './logo.png';
import Logo from '../assets/Logo';

const API_BASE_URL = 'http://obamai.us-east-1.elasticbeanstalk.com';

const AdminPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loadingData, setLoadingData] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  // Fetch all users (stub, replace with real API if available)
  const fetchUsers = async () => {
    // Replace with real API endpoint for users if available
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/v1/all-users/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: token })
      });
      const data = await response.json();
      if (data.status === 'ok') {
        setUsers(data.users || []);
      } else {
        setUsers([]);
      }
    } catch (error) {
      setUsers([]);
    }
  };

  // Fetch all projects (reuse Sidebar logic)
  const fetchProjects = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await fetch(`${API_BASE_URL}/api/v1/all-projects/`, {
        method: 'POST',
        headers: {
          'accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ access_token: token })
      });
      const data = await response.json();
      if (data.status === 'ok') {
        setProjects(data.projects || []);
      } else {
        setProjects([]);
      }
    } catch (error) {
      setProjects([]);
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      setLoadingData(true);
      Promise.all([fetchUsers(), fetchProjects()]).finally(() => setLoadingData(false));
    }
  }, [isLoggedIn]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage({ text: '', type: '' });
    setIsLoading(true);
    try {
      const result = await login(formData);
      if (result.success) {
        setIsLoggedIn(true);
      } else {
        setApiMessage({ text: result.message || 'Login failed', type: 'error' });
      }
    } catch (error) {
      setApiMessage({ text: 'An error occurred. Please try again.', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleDeleteUser = async (userId) => {
    // TODO: Implement delete user API call
    alert('Delete user ' + userId + ' (API not implemented)');
  };

  if (!isLoggedIn) {
    return (
      <div className='flex flex-col justify-between min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8'>
        <div className='sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='flex justify-center'>
            <img src={img} className='w-24 h-auto' />
          </div>
          <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
            Admin Login
          </h2>
          <h3 className='text-center my-3 text-gray-700'>Sign in as admin</h3>
        </div>
        <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
          <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
            {apiMessage.text && (
              <div className={`p-4 mb-4 text-sm rounded-md text-center ${apiMessage.type === 'error' ? 'text-red-700 bg-red-100' : 'text-green-700 bg-green-100'}`}>{apiMessage.text}</div>
            )}
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div>
                <label htmlFor='email' className='block text-sm font-medium text-gray-700'>Email address</label>
                <div className='mt-1'>
                  <input id='email' placeholder='Please Enter The Email' name='email' type='email' autoComplete='email' required value={formData.email} onChange={handleInputChange} className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500' />
                </div>
              </div>
              <div>
                <label htmlFor='password' className='block text-sm font-medium text-gray-700'>Password</label>
                <div className='mt-1'>
                  <input placeholder='Please Enter The Password' id='password' name='password' type='password' autoComplete='current-password' required value={formData.password} onChange={handleInputChange} className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500' />
                </div>
              </div>
              <div className='flex items-center justify-between'>
                <div className='flex gap-2 items-center'>
                  <input className='mt-[2px]' type="checkbox" />
                  <p>Remember Me</p>
                </div>
              </div>
              <div>
                <button type='submit' disabled={isLoading} className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50'>{isLoading ? 'Processing...' : 'Sign in'}</button>
              </div>
            </form>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Dashboard view
  const totalUsers = users.length;
  const totalProjects = projects.length;
  const activeProjects = projects.filter(p => p.is_active).length;
  const deactiveProjects = projects.filter(p => !p.is_active).length;

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex flex-row items-start container mx-auto px-6 py-8 gap-8">
        {/* Left: Logo */}
        <div className="hidden md:flex flex-col items-center pt-6 pr-8 min-w-[120px]">
          <Logo size={80} />
        </div>
        {/* Right: Dashboard Content */}
        <div className="flex-1 flex flex-col gap-8">
          <h1 className="text-3xl font-bold mb-6 text-[#8a3aff]">Admin Dashboard</h1>
          {loadingData ? (
            <div>Loading data...</div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <MetricCard label="Total Users" value={totalUsers} icon="activity" />
                <MetricCard label="Total Projects" value={totalProjects} icon="time" />
                <MetricCard label="Active Projects" value={activeProjects} icon="success" trendType="positive" />
                <MetricCard label="Deactive Projects" value={deactiveProjects} icon="alert" trendType="negative" />
              </div>
              <div className="bg-white rounded-lg shadow p-6">
                <h2 className="text-xl font-semibold mb-4">Users List</h2>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                      <tr>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                        <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {users.map((user) => (
                        <tr key={user.user_id || user.id}>
                          <td className="px-4 py-2 whitespace-nowrap">{user.user_id || user.id}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{user.name || user.email}</td>
                          <td className="px-4 py-2 whitespace-nowrap">{user.email}</td>
                          <td className="px-4 py-2 whitespace-nowrap">
                            <button onClick={() => handleDeleteUser(user.user_id || user.id)} className="text-red-600 hover:text-red-800 font-semibold">Delete</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {users.length === 0 && <div className="text-center text-gray-500 py-4">No users found.</div>}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminPage; 