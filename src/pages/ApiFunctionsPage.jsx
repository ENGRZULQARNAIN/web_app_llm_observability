/* eslint-disable no-unused-vars */
import React from 'react';
import { Code2, Play, Clock, CheckCircle } from 'lucide-react';

const ApiFunctionsPage = () => {
  const apis = [
    {
      name: 'User Authentication',
      endpoint: '/api/auth',
      status: 'Active',
      latency: '89ms',
      lastCalled: '2 minutes ago',
    },
    {
      name: 'Data Processing',
      endpoint: '/api/process',
      status: 'Active',
      latency: '245ms',
      lastCalled: '5 minutes ago',
    },
    {
      name: 'Analytics',
      endpoint: '/api/analytics',
      status: 'Active',
      latency: '156ms',
      lastCalled: '10 minutes ago',
    },
  ];

  return (
    <div className='space-y-6'>
      <div className='bg-white rounded-lg shadow-sm'>
        <div className='p-6'>
          <h2 className='text-lg font-semibold text-gray-900'>API Functions</h2>
          <p className='mt-1 text-sm text-gray-500'>
            Monitor and test your API endpoints
          </p>
        </div>
        <div className='border-t border-gray-200'>
          {apis.map((api, index) => (
            <div
              key={api.name}
              className={`p-6 ${
                index !== apis.length - 1 ? 'border-b border-gray-200' : ''
              }`}
            >
              <div className='flex items-center justify-between'>
                <div className='flex items-center'>
                  <Code2 className='w-5 h-5 mr-3 text-purple-500' />
                  <div>
                    <h3 className='text-sm font-medium text-gray-900'>
                      {api.name}
                    </h3>
                    <p className='text-sm text-gray-500'>{api.endpoint}</p>
                  </div>
                </div>
                <div className='flex items-center space-x-4'>
                  <div className='flex items-center'>
                    <Clock className='w-4 h-4 mr-1 text-gray-400' />
                    <span className='text-sm text-gray-500'>{api.latency}</span>
                  </div>
                  <div className='flex items-center'>
                    <CheckCircle className='w-4 h-4 mr-1 text-green-500' />
                    <span className='text-sm text-green-600'>{api.status}</span>
                  </div>
                  <button className='px-3 py-1 text-sm text-purple-600 bg-purple-100 rounded-md hover:bg-purple-200'>
                    <Play className='w-4 h-4' />
                  </button>
                </div>
              </div>
              <div className='mt-2'>
                <span className='text-xs text-gray-500'>
                  Last called: {api.lastCalled}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApiFunctionsPage;
