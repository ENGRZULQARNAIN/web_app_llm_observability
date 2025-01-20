/* eslint-disable no-unused-vars */
import React from 'react';
import { Activity, Users, Code, Database } from 'lucide-react';

const DashboardPage = () => {
  const stats = [
    { name: 'Active Users', value: '1,234', icon: Users, change: '+12%' },
    { name: 'API Calls', value: '45.8k', icon: Code, change: '+8%' },
    { name: 'Response Time', value: '123ms', icon: Activity, change: '-5%' },
    { name: 'Data Points', value: '890k', icon: Database, change: '+24%' },
  ];

  return (
    <div className='space-y-6'>
      {/* Stats Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div key={stat.name} className='p-6 bg-white rounded-lg shadow-sm'>
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    {stat.name}
                  </p>
                  <p className='text-2xl font-semibold text-gray-900'>
                    {stat.value}
                  </p>
                </div>
                <Icon className='w-8 h-8 text-purple-500' />
              </div>
              <div className='mt-2'>
                <span
                  className={`text-sm ${
                    stat.change.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {stat.change} from last month
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Recent Activity */}
      <div className='p-6 bg-white rounded-lg shadow-sm'>
        <h2 className='text-lg font-semibold text-gray-900'>Recent Activity</h2>
        <div className='mt-4 space-y-4'>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className='flex items-center p-4 rounded-lg bg-gray-50'
            >
              <Activity className='w-5 h-5 mr-3 text-purple-500' />
              <div>
                <p className='text-sm font-medium text-gray-900'>
                  API Endpoint Called
                </p>
                <p className='text-sm text-gray-500'>
                  GET /api/data • 2 minutes ago
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
