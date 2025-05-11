import React from 'react';

const Logo = ({ size = 40 }) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="30" cy="30" r="30" fill="url(#paint0_linear)" />
      <path
        d="M18 25C18 21.6863 20.6863 19 24 19H36C39.3137 19 42 21.6863 42 25V35C42 38.3137 39.3137 41 36 41H24C20.6863 41 18 38.3137 18 35V25Z"
        fill="white"
        fillOpacity="0.2"
      />
      <path
        d="M22 28.5L30 23L38 28.5V36.5L30 42L22 36.5V28.5Z"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M30 23V42"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M22 28.5L38 36.5"
        stroke="white"
        strokeWidth="2"
      />
      <path
        d="M38 28.5L22 36.5"
        stroke="white"
        strokeWidth="2"
      />
      <defs>
        <linearGradient
          id="paint0_linear"
          x1="0"
          y1="0"
          x2="60"
          y2="60"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#8a3aff" />
          <stop offset="1" stopColor="#6023bf" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default Logo; 