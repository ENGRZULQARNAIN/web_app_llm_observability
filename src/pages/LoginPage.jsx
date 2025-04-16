/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Footer from '../components/Footer';
import img from  './logo.png'
 

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage({ text: '', type: '' });
    setIsLoading(true);

    try {
      const result = await login(formData);

      if (result.success) {
        navigate('/dashboard');
      } else {
        setApiMessage({
          text: result.message || 'Login failed',
          type: 'error',
        });
      }
    } catch (error) {
      setApiMessage({
        text: 'An error occurred. Please try again.',
        type: 'error',
      });
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
    <div className='flex flex-col justify-between min-h-screen py-12 bg-gray-50 sm:px-6 lg:px-8'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='flex justify-center'>
          <img
            src={img}
            className='w-24 h-auto'
          />
        </div>
        <h2 className='mt-6 text-3xl font-extrabold text-center text-gray-900'>
          Sign in to your account
        </h2>
        <h3 className='text-center my-3 text-gray-700'>Sign up to create an account </h3>
       
      </div>
      <div className='mt-8 sm:mx-auto sm:w-full sm:max-w-md'>
        <div className='px-4 py-8 bg-white shadow sm:rounded-lg sm:px-10'>
          {apiMessage.text && (
            <div
              className={`p-4 mb-4 text-sm rounded-md text-center ${apiMessage.type === 'error'
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
                  placeholder='Please Enter The Email'
                  name='email'
                  type='email'
                  autoComplete='email'
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500'
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
                  placeholder='Please Enter The Password'
                  id='password'
                  name='password'
                  type='password'
                  autoComplete='current-password'
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className='block w-full px-3 py-2 placeholder-gray-400 border border-gray-300 rounded-md shadow-sm appearance-none focus:outline-none focus:ring-purple-500 focus:border-purple-500'
                />
              </div>
            </div>

            <div className='flex items-center justify-between'>
              <div className='flex gap-2 items-center'>
                <input className='mt-[2px]' type="checkbox" />
                <p>Remember Me</p>
              </div>
              <a>
                <Link className='text-purple-600' to="/forgotpassword">Forgot Password</Link>
              </a>
            </div>

            <div>
              <button
                type='submit'
                disabled={isLoading}
                className='flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-purple-600 border border-transparent rounded-md shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50'
              >
                {isLoading ? 'Processing...' : 'Sign in'}
              </button>
              <div className="flex items-center gap-2 my-5">
                <div className="h-px flex-1 bg-gray-300"></div>
                <span className="text-gray-500">OR</span>
                <div className="h-px flex-1 bg-gray-300 "></div>
              </div>

              {/*  */}
              
              {/*  */}

              <p className='text-center my-3'>Have no account? <Link to="/register" className='text-purple-600 font-semibold'>Sign up</Link></p>
             
            </div>
          </form>
        </div>
      </div>




      {/* Dynamic Footer */}
      <Footer />
    </div>
  );
};

export default LoginPage;
