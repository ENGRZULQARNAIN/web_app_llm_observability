<<<<<<< HEAD
/* eslint-disable no-unused-vars */
import React from 'react';
import { BarChart3, TrendingUp, Users, Clock } from 'lucide-react';

const AnalyticsPage = () => {
  const metrics = [
    {
      name: 'API Usage',
      value: '45.8k',
      change: '+12.3%',
      description: 'Total API calls this month',
      icon: BarChart3,
    },
    {
      name: 'Success Rate',
      value: '99.9%',
      change: '+0.5%',
      description: 'Average success rate',
      icon: TrendingUp,
    },
    {
      name: 'Active Users',
      value: '1,234',
      change: '+8.2%',
      description: 'Users this month',
      icon: Users,
    },
    {
      name: 'Response Time',
      value: '123ms',
      change: '-5.1%',
      description: 'Average response time',
      icon: Clock,
    },
  ];

  return (
    <div className='space-y-6'>
      {/* Metrics Grid */}
      <div className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4'>
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <div
              key={metric.name}
              className='p-6 bg-white rounded-lg shadow-sm'
            >
              <div className='flex items-center justify-between'>
                <div>
                  <p className='text-sm font-medium text-gray-600'>
                    {metric.name}
                  </p>
                  <p className='mt-2 text-3xl font-semibold text-gray-900'>
                    {metric.value}
                  </p>
                </div>
                <Icon className='w-8 h-8 text-purple-500' />
              </div>
              <div className='mt-4'>
                <span
                  className={`inline-flex items-center text-sm ${
                    metric.change.startsWith('+')
                      ? 'text-green-600'
                      : 'text-red-600'
                  }`}
                >
                  {metric.change}
                </span>
                <span className='block mt-1 text-sm text-gray-500'>
                  {metric.description}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Charts Section */}
      <div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900'>
            API Usage Over Time
          </h3>
          <div className='flex items-center justify-center h-64 mt-4 rounded-lg bg-gray-50'>
            <span className='text-gray-500'>Chart placeholder</span>
          </div>
        </div>
        <div className='p-6 bg-white rounded-lg shadow-sm'>
          <h3 className='text-lg font-semibold text-gray-900'>
            Response Time Distribution
          </h3>
          <div className='flex items-center justify-center h-64 mt-4 rounded-lg bg-gray-50'>
            <span className='text-gray-500'>Chart placeholder</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
=======
import React from 'react'
import Bargraph from '../Graphs/Bargraph'
import Linegraph from '../Graphs/Linegraph'




function AnalyticsPage() {
  return (
    <>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard label="Benchmark Data" value="Uni Bot Data" />
          <MetricCard label="Last Run" value="9 pm" />
          <MetricCard label="Avg. Hallucination" value="5.5" />
          <MetricCard label="Avg. Relevance" value="6.5" />
        </div>
    <div className='flex items-center justify-center'>
     <Bargraph/>
     <Bargraph/>
    </div>
    <div className='flex items-center justify-center'>
     <Linegraph/>
     <Linegraph/>
    </div>

    


    </>
  )
  function MetricCard({ label, value }) {
    return (
      <div className="bg-white border border-gray-200 rounded-md p-4">
        <div className="text-sm text-gray-500 mb-2">{label}</div>
        <div className="text-2xl font-semibold">{value}</div>
      </div>
    );
  }
}

export default AnalyticsPage
>>>>>>> origin/master
