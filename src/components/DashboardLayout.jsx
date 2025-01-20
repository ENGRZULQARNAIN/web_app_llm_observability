/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Code2, BarChart3, HelpCircle, User } from 'lucide-react';

const DashboardLayout = ({ children }) => {
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/dashboard', icon: Home },
    { name: 'API Functions', href: '/api-functions', icon: Code2 },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Help', href: '/help', icon: HelpCircle },
    { name: 'Profile', href: '/profile', icon: User },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div className='flex h-screen bg-gray-100'>
      {/* Sidebar */}
      <div className='w-64 bg-white shadow-lg'>
        <div className='flex items-center justify-center h-16 border-b'>
          <img
            src='http://sarihorganics.com/wp-content/uploads/2025/01/wide-logo-png.png'
            alt='Logo'
            className='w-auto h-12'
          />
        </div>
        <nav className='mt-6'>
          {navigation.map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm ${
                  isActive(item.href)
                    ? 'bg-purple-50 text-purple-600 border-r-4 border-purple-600'
                    : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Icon className='w-5 h-5 mr-3' />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Main Content */}
      <div className='flex-1 overflow-auto'>
        <header className='bg-white shadow-sm'>
          <div className='px-6 py-4'>
            <h1 className='text-2xl font-semibold text-gray-800'>
              {navigation.find((item) => isActive(item.href))?.name ||
                'Dashboard'}
            </h1>
          </div>
        </header>
        <main className='p-6'>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
