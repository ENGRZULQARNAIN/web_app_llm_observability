import React from 'react';

const Logo = ({ size = 40 }) => {
  return (
    <img
      src="https://sarihorganics.com/wp-content/uploads/2025/05/Purple-and-White-Modern-AI-Technology-Logo.jpg"
      alt="Obam AI Logo"
      width={size}
      height={size}
      style={{ 
        borderRadius: '50%',
        objectFit: 'cover'
      }}
    />
  );
};

export default Logo; 