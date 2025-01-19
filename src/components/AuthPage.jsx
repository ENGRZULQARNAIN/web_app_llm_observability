/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
// import './styles.css';

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

  const formContainerStyle = {
    backgroundColor: 'white',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '400px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  };

  const logoStyle = {
    width: '200px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 2rem',
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem',
  };

  const buttonStyle = (isDisabled) => ({
    width: '100%',
    padding: '0.75rem',
    backgroundColor: isDisabled ? '#cccccc' : '#8a3aff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    marginBottom: '1rem',
  });

  const linkStyle = {
    color: '#8a3aff',
    textDecoration: 'underline',
    cursor: 'pointer',
  };

  const messageStyle = (type) => ({
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '4px',
    textAlign: 'center',
    backgroundColor: type === 'error' ? '#ffe6e6' : '#e6ffe6',
    color: type === 'error' ? '#ff0000' : '#008000',
  });

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

      // Handle signup success case separately
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
        // Add your success logic here (e.g., redirect, store token, etc.)
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

  // Validate password match for signup
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
    <div style={formContainerStyle}>
      <img
        src='https://sarihorganics.com/wp-content/uploads/2024/12/Purple_and_White_Modern_AI_Technology_Logo-removebg.png'
        alt='Logo'
        style={logoStyle}
      />

      {apiMessage.text && (
        <div style={messageStyle(apiMessage.type)}>{apiMessage.text}</div>
      )}

      <form onSubmit={handleSubmit}>
        {!isLogin && (
          <input
            type='text'
            name='name'
            placeholder='Full Name'
            style={inputStyle}
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        )}

        <input
          type='email'
          name='email'
          placeholder='Email'
          style={inputStyle}
          value={formData.email}
          onChange={handleInputChange}
          required
        />

        <input
          type='password'
          name='password'
          placeholder='Password'
          style={inputStyle}
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
              style={inputStyle}
              value={formData.confirmPassword}
              onChange={handleInputChange}
              required
            />
            {formData.confirmPassword && !isPasswordMatch && (
              <div style={messageStyle('error')}>Passwords do not match</div>
            )}
          </>
        )}

        <button
          type='submit'
          style={buttonStyle(isLoading || !isFormValid)}
          disabled={isLoading || !isFormValid}
        >
          {isLoading ? 'Processing...' : isLogin ? 'Login' : 'Sign Up'}
        </button>

        <p style={{ textAlign: 'center' }}>
          {isLogin ? "Don't have an account? " : 'Already have an account? '}
          <span style={linkStyle} onClick={handleModeSwitch}>
            {isLogin ? 'Sign Up' : 'Login'}
          </span>
        </p>
      </form>
    </div>
  );
};

export default AuthPage;
