/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setApiMessage({
        text: 'Passwords do not match',
        type: 'error',
      });
      return;
    }

    setApiMessage({ text: '', type: '' });
    setIsLoading(true);

    try {
      const response = await fetch(
        'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            accept: 'application/json',
          },
          body: JSON.stringify({
            name: formData.name,
            email: formData.email,
            password: formData.password,
          }),
        }
      );

      const data = await response.json();

      setApiMessage({
        text: data.message,
        type: data.status === 'ok' ? 'success' : 'error',
      });

      if (data.status === 'ok') {
        console.log('Registration successful:', data);
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

  const isPasswordMatch = formData.password === formData.confirmPassword;
  const isFormValid =
    formData.name &&
    formData.email &&
    formData.password &&
    formData.confirmPassword &&
    isPasswordMatch;

  return (
    <div className='flex flex-col justify-center min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <img
          src='https://sarihorganics.com/wp-content/uploads/2024/12/Purple_and_White_Modern_AI_Technology_Logo-removebg.png'
          alt='Logo'
          className='w-32 h-auto mx-auto'
        />
        <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
          Create your account
        </h2>
        <p className='mt-2 text-sm text-center text-gray-600'>
          Already have an account?{' '}
          <Link
            to='/login'
            className='font-medium text-indigo-600 hover:text-indigo-500'
          >
            Login
          </Link>
        </p>
      </div>

      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          {apiMessage.text && (
            <div
              className={`mb-4 px-4 py-2 rounded text-center ${
                apiMessage.type === 'error'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              {apiMessage.text}
            </div>
          )}

          <form className='space-y-6' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Full Name
              </label>
              <div className='mt-1'>
                <input
                  id='name'
                  name='name'
                  type='text'
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
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
              <div className='mt-1'>
                <input
                  id='email'
                  name='email'
                  type='email'
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
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <div className='mt-1'>
                <input
                  id='confirmPassword'
                  name='confirmPassword'
                  type='password'
                  required
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-indigo-500 focus:border-indigo-500'
                />
              </div>
              {!isPasswordMatch && formData.confirmPassword && (
                <p className='mt-2 text-sm text-red-600'>
                  Passwords do not match
                </p>
              )}
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading || !isFormValid}
                className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50'
              >
                {isLoading ? 'Processing...' : 'Sign Up'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
