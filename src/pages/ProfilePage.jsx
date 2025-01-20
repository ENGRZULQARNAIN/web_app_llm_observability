/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { User, Mail, Key, Save } from 'lucide-react';

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    name: 'John Doe',
    email: 'john@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className='max-w-3xl mx-auto space-y-6'>
      {/* Profile Information */}
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-6'>
          <h2 className='text-lg font-semibold text-gray-900'>
            Profile Information
          </h2>
          <p className='mt-1 text-sm text-gray-500'>
            Update your account settings
          </p>
        </div>
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
                className='inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500'
              >
                <Save className='w-4 h-4 mr-2' />
                Save Changes
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
