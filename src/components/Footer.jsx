/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const [message, setMessage] = useState('OBAM AI All rights reserved.');

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await fetch(
          'http://fypobservabillity-env.eba-una3djfn.us-east-1.elasticbeanstalk.com'
        );
        const data = await response.json();
        if (data.message) {
          setMessage(data.message);
        }
      } catch (error) {
        console.error('Error fetching the message:', error);
        setMessage('OBAM AI All rights reserved.'); // Fallback message
      }
    };

    fetchMessage();
  }, []);

  return (
    <footer className='mt-8 text-sm text-center text-gray-600'>
      <p>
        © {new Date().getFullYear()} {message}
      </p>
      <div className='space-x-4'>
        <Link
          to='/privacy-policy'
          className='text-purple-600 hover:text-purple-500'
        >
          Privacy Policy
        </Link>
        <Link
          to='/terms-of-service'
          className='text-purple-600 hover:text-purple-500'
        >
          Terms of Service
        </Link>
      </div>
    </footer>
  );
};

export default Footer;
