/* eslint-disable no-unused-vars */
import React, { useState } from 'react';

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
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
    setApiMessage({ text: '', type: '' });
    setIsLoading(true);

    try {
      const url = isLogin
        ? 'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com/login/'
        : 'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com/register/';

      const payload = isLogin
        ? {
            email: formData.email,
            password: formData.password,
          }
        : {
            name: formData.name,
            email: formData.email,
            password: formData.password,
          };

      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (!isLogin && data.status === 'ok') {
        setApiMessage({
          text: data.message,
          type: 'success',
        });
      } else {
        setApiMessage({
          text: data.message,
          type:
            data.status === 'success' || data.status === 'ok'
              ? 'success'
              : 'error',
        });
      }

      if (data.status === 'success' || data.status === 'ok') {
        console.log('Operation successful:', data);
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

  const handleModeSwitch = () => {
    setIsLogin(!isLogin);
    setApiMessage({ text: '', type: '' });
    setFormData({ name: '', email: '', password: '', confirmPassword: '' });
  };

  const isPasswordMatch =
    isLogin || formData.password === formData.confirmPassword;
  const isFormValid = isLogin
    ? formData.email && formData.password
    : formData.name &&
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      isPasswordMatch;

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='w-full max-w-md p-8 bg-white rounded-lg shadow-md'>
        <img
          src='https://sarihorganics.com/wp-content/uploads/2024/12/Purple_and_White_Modern_AI_Technology_Logo-removebg.png'
          alt='Logo'
          className='w-40 h-auto mb-6 mr-auto'
        />
        {apiMessage.text && (
          <div
            className={`p-4 mb-4 text-center rounded-lg text-sm font-medium ${
              apiMessage.type === 'error'
                ? 'bg-red-100 text-red-700 border border-red-300'
                : 'bg-green-100 text-green-700 border border-green-300'
            }`}
          >
            {apiMessage.text}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {!isLogin && (
            <input
              type='text'
              name='name'
              placeholder='Full Name'
              className='w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          )}

          <input
            type='email'
            name='email'
            placeholder='Email'
            className='w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={formData.email}
            onChange={handleInputChange}
            required
          />

          <input
            type='password'
            name='password'
            placeholder='Password'
            className='w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
            value={formData.password}
            onChange={handleInputChange}
            required
          />

          {!isLogin && (
            <>
              <input
                type='password'
                name='confirmPassword'
                placeholder='Confirm Password'
                className='w-full p-3 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500'
                value={formData.confirmPassword}
                onChange={handleInputChange}
                required
              />
              {formData.confirmPassword && !isPasswordMatch && (
                <div className='mb-4 text-sm text-red-600'>
                  Passwords do not match
                </div>
              )}
            </>
          )}

          <button
            type='submit'
            className={`w-full p-3 text-white rounded-lg text-lg font-medium ${
              isLoading || !isFormValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-purple-500 hover:bg-purple-600'
            }`}
            disabled={isLoading || !isFormValid}
          >
            {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
          </button>

          <p className='mt-4 text-sm text-center'>
            {isLogin ? "Don't have an account? " : 'Already have an account? '}
            <span
              className='text-purple-500 underline cursor-pointer hover:text-purple-600'
              onClick={handleModeSwitch}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
