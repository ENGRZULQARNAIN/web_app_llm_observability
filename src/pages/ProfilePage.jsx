/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { User, Mail, Key, Save, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const ProfilePage = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [message, setMessage] = useState({ text: '', type: '' });
  const [loading, setLoading] = useState(false);

  // Load user data from context when component mounts
  useEffect(() => {
    if (user) {
      setFormData(prevData => ({
        ...prevData,
        name: user.name || '',
        email: user.email || '',
      }));
    }
  }, [user]);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: '', type: '' });

    // Validate passwords if changing password
    if (formData.newPassword) {
      if (formData.newPassword !== formData.confirmPassword) {
        setMessage({ text: 'New passwords do not match', type: 'error' });
        setLoading(false);
        return;
      }
      if (!formData.currentPassword) {
        setMessage({ text: 'Current password is required', type: 'error' });
        setLoading(false);
        return;
      }
    }

    try {
      // For now, we'll just update the local profile data
      // In a real app, you would send this to your API
      updateUserProfile({
        name: formData.name,
        email: formData.email,
      });
      
      setMessage({ text: 'Profile updated successfully', type: 'success' });
      
      // Reset password fields
      setFormData(prev => ({
        ...prev,
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
      }));
    } catch (error) {
      console.error('Error updating profile:', error);
      setMessage({ text: 'Failed to update profile', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      {/* Profile Information */}
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-6 flex justify-between items-center'>
          <div>
            <h2 className='text-lg font-semibold text-gray-900'>
              Profile Information
            </h2>
            <p className='mt-1 text-sm text-gray-500'>
              Update your account settings
            </p>
          </div>
          <button
            onClick={handleLogout}
            className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500'
          >
            <LogOut className='w-4 h-4 mr-2' />
            Logout
          </button>
        </div>

        {message.text && (
          <div className={`mx-6 p-4 rounded-md ${
            message.type === 'error' ? 'bg-red-50 text-red-700' : 'bg-green-50 text-green-700'
          }`}>
            {message.text}
          </div>
        )}

        <div className='border-t border-gray-200'>
          <form onSubmit={handleSubmit} className='p-6 space-y-6'>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Full Name
              </label>
              <div className='relative mt-1 rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <User className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  type='text'
                  name='name'
                  id='name'
                  value={formData.name}
                  onChange={handleInputChange}
                  className='block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <div className='relative mt-1 rounded-md shadow-sm'>
                <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                  <Mail className='w-5 h-5 text-gray-400' />
                </div>
                <input
                  type='email'
                  name='email'
                  id='email'
                  value={formData.email}
                  onChange={handleInputChange}
                  className='block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
            </div>

            <div className='pt-6 border-t border-gray-200'>
              <h3 className='text-lg font-medium text-gray-900'>
                Change Password
              </h3>

              <div className='mt-6 space-y-6'>
                <div>
                  <label
                    htmlFor='currentPassword'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Current Password
                  </label>
                  <div className='relative mt-1 rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <Key className='w-5 h-5 text-gray-400' />
                    </div>
                    <input
                      type='password'
                      name='currentPassword'
                      id='currentPassword'
                      value={formData.currentPassword}
                      onChange={handleInputChange}
                      className='block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='newPassword'
                    className='block text-sm font-medium text-gray-700'
                  >
                    New Password
                  </label>
                  <div className='relative mt-1 rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <Key className='w-5 h-5 text-gray-400' />
                    </div>
                    <input
                      type='password'
                      name='newPassword'
                      id='newPassword'
                      value={formData.newPassword}
                      onChange={handleInputChange}
                      className='block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor='confirmPassword'
                    className='block text-sm font-medium text-gray-700'
                  >
                    Confirm New Password
                  </label>
                  <div className='relative mt-1 rounded-md shadow-sm'>
                    <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
                      <Key className='w-5 h-5 text-gray-400' />
                    </div>
                    <input
                      type='password'
                      name='confirmPassword'
                      id='confirmPassword'
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className='block w-full py-2 pl-10 pr-3 border border-gray-300 rounded-md focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-end'>
              <button
                type='submit'
                disabled={loading}
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50'
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save className='w-4 h-4 mr-2' />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
