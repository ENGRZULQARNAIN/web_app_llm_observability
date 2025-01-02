// First create a new file LoginPage.jsx
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [apiMessage, setApiMessage] = useState({ text: '', type: '' });
  const [isLoading, setIsLoading] = useState(false);

  const formContainerStyle = {
    backgroundColor: 'white',
    border: '2px solid #8a3aff',
    padding: '2rem',
    borderRadius: '10px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '400px',
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)'
  };

  const logoStyle = {
    width: '200px',
    height: 'auto',
    display: 'block',
    margin: '0 auto 2rem'
  };

  const inputStyle = {
    width: '90%',
    padding: '0.75rem',
    marginBottom: '1rem',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '1rem'
  };

  const buttonStyle = (isDisabled) => ({
    width: '98%',
    padding: '0.75rem',
    backgroundColor: isDisabled ? '#cccccc' : '#8a3aff',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    fontSize: '1rem',
    cursor: isDisabled ? 'not-allowed' : 'pointer',
    marginBottom: '1rem'
  });

  const linkStyle = {
    color: '#8a3aff',
    textDecoration: 'underline'
  };

  const messageStyle = (type) => ({
    padding: '10px',
    marginBottom: '1rem',
    borderRadius: '4px',
    textAlign: 'center',
    backgroundColor: type === 'error' ? '#ffe6e6' : '#e6ffe6',
    color: type === 'error' ? '#ff0000' : '#008000'
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiMessage({ text: '', type: '' });
    setIsLoading(true);

    try {
      const response = await fetch('http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      
      setApiMessage({
        text: data.message,
        type: data.status === 'success' ? 'success' : 'error'
      });

      if (data.status === 'success') {
        // Add your success logic here
        console.log('Login successful:', data);
      }

    } catch (error) {
      setApiMessage({
        text: 'An error occurred. Please try again.',
        type: 'error'
      });
      console.error('API Error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={formContainerStyle}>
      <img 
        src="https://sarihorganics.com/wp-content/uploads/2024/12/Purple_and_White_Modern_AI_Technology_Logo-removebg.png" 
        alt="Logo" 
        style={logoStyle} 
      />
      
      {apiMessage.text && (
        <div style={messageStyle(apiMessage.type)}>
          {apiMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          style={inputStyle}
          value={formData.email}
          onChange={handleInputChange}
          required
        />
        
        <input
          type="password"
          name="password"
          placeholder="Password"
          style={inputStyle}
          value={formData.password}
          onChange={handleInputChange}
          required
        />
        
        <button 
          type="submit" 
          style={buttonStyle(isLoading)}
          disabled={isLoading}
        >
          {isLoading ? 'Processing...' : 'Login'}
        </button>
        
        <p style={{ textAlign: 'center' }}>
          Don't have an account? {' '}
          <Link to="/register" style={linkStyle}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginPage;