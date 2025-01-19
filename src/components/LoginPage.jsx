/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage({ text: '', type: '' });
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      setApiMessage({
        text: data.message,
        type: data.status === 'success' ? 'success' : 'error',
      });

      if (data.status === 'success') {
        // Save token or perform other actions
        console.log('Login successful:', data);
        navigate('/dashboard');
      }
    } catch (error) {
      setApiMessage({
        text: 'An error occurred. Please try again.',
        type: 'error',
      });
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className='flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <img
            src='https://sarihorganics.com/wp-content/uploads/2024/12/Purple_and_White_Modern_AI_Technology_Logo-removebg.png'
            alt='Logo'
            className='w-24 h-auto'
          />
        </div>
        <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
          Sign in to your account
        </h2>
        <p className='mt-2 text-sm text-center text-gray-600'>
          Or{' '}
          <Link
            to='/register'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            create a new account
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          {apiMessage.text && (
            <div
              className={`p-4 mb-4 text-sm rounded-md text-center ${
                apiMessage.type === 'error'
                  ? 'text-red-700 bg-red-100'
                  : 'text-green-700 bg-green-100'
              }`}
            >
              {apiMessage.text}
            </div>
          )}

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email address
              </label>
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <div className='mt-1'>
                <input
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                {isLoading ? 'Processing...' : 'Sign in'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
