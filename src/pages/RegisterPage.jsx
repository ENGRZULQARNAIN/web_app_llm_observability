{
  /* eslint-disable no-unused-vars */
}
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { api } from '../services/api';
import Footer from '../components/Footer';
import img from './logo.png';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
      const response = await api.register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });

      setApiMessage({
        text: response.message,
        type: response.status === 'ok' ? 'success' : 'error',
      });

      if (response.status === 'ok') {
        setTimeout(() => {
          navigate('/login');
        }, 1000);
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
    <div className='flex flex-col items-center justify-center bg-gray-50'>
      <div className='w-full max-w-md px-4'>
        <div className='mb-6 text-center'>
          <img
            src={img}
            alt='Logo'
            className='w-24 h-auto mx-auto'
          />
          <h2 className='mt-4 text-2xl font-bold text-gray-900'>
            Create your account
          </h2>
          <h3 className='text-sm'>Sign up to create an account</h3>
        </div>

        <div className='p-6 bg-white rounded-lg shadow'>
          {apiMessage.text && (
            <div
              className={`mb-4 px-3 py-2 rounded text-center text-sm ${
                apiMessage.type === 'error'
                  ? 'bg-red-100 text-red-600'
                  : 'bg-green-100 text-green-600'
              }`}
            >
              {apiMessage.text}
            </div>
          )}

          <form className='space-y-4' onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor='name'
                className='block text-sm font-medium text-gray-700'
              >
                Full Name
              </label>
              <input
                id='name'
                name='name'
                type='text'
                placeholder='Enter Name'
                required
                value={formData.name}
                onChange={handleInputChange}
                className='mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='email'
                className='block text-sm font-medium text-gray-700'
              >
                Email Address
              </label>
              <input
              placeholder='Enter Email'
                id='email'
                name='email'
                type='email'
                required
                value={formData.email}
                onChange={handleInputChange}
                className='mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='password'
                className='block text-sm font-medium text-gray-700'
              >
                Password
              </label>
              <input
              placeholder='Enter Password'
                id='password'
                name='password'
                type='password'
                required
                value={formData.password}
                onChange={handleInputChange}
                className='mt-1 block w-full px-3 py-1.5 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              />
            </div>

            <div>
              <label
                htmlFor='confirmPassword'
                className='block text-sm font-medium text-gray-700'
              >
                Confirm Password
              </label>
              <input
              placeholder='Confirm Your Password'
                id='confirmPassword'
                name='confirmPassword'
                type='password'
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-1.5 border rounded-md shadow-sm focus:outline-none focus:ring-purple-500 focus:border-purple-500 ${
                  !isPasswordMatch && formData.confirmPassword
                    ? 'border-red-500'
                    : 'border-gray-300'
                }`}
              />
              {!isPasswordMatch && formData.confirmPassword && (
                <p className='mt-1 text-xs text-red-600'>
                  Passwords do not match
                </p>
              )}
            </div>

            <button
              type='submit'
              disabled={isLoading || !isFormValid}
              className='w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50'
            >
              {isLoading ? 'Processing...' : 'Get started'}
            </button>
            <div className="flex items-center gap-2 my-5">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span className="text-gray-500">OR</span>
                <div className="h-px flex-1 bg-gray-300"></div>
              </div>
           
               <p className='text-center my-3'>Already have an account? <Link to='/login' className='text-purple-600 font-semibold'>Sign in</Link></p>
               
          </form>
        </div>
      </div>

      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
};

export default RegisterPage;
