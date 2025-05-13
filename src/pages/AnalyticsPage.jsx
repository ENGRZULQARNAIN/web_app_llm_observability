import React, { useState } from 'react';
import Bargraph from '../Graphs/Bargraph';
import Linegraph from '../Graphs/Linegraph';
import MetricCard from "../components/cards/MetricCard";
import { DownloadCloud, Calendar, BarChart2, LineChart, ArrowDown, ArrowUp, Filter, RefreshCw } from 'lucide-react';

function AnalyticsPage() {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [timeframe, setTimeframe] = useState('week');

  return (
    <div className="min-h-screen bg-gray-50 pb-10 space-y-6">
      {/* Header with filters */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500">Insights and performance metrics</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="flex items-center space-x-1 bg-white border border-gray-200 rounded-lg overflow-hidden">
            <button 
              className={`px-3 py-2 text-sm font-medium ${timeframe === 'day' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setTimeframe('day')}
            >
              Day
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium ${timeframe === 'week' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setTimeframe('week')}
            >
              Week
            </button>
            <button 
              className={`px-3 py-2 text-sm font-medium ${timeframe === 'month' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setTimeframe('month')}
            >
              Month
            </button>
          </div>

          <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-300">
            <Calendar className="h-4 w-4" /> 
            Date Range
          </button>
          
          <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-300">
            <Filter className="h-4 w-4" /> 
            Filter
          </button>
          
          <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-300">
            <DownloadCloud className="h-4 w-4" /> 
            Export
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Benchmark Data" 
          value="Uni Bot Data" 
          icon="activity"
          trend={true}
          percentage={12}
          trendType="positive"
        />
        <MetricCard 
          label="Total Tests" 
          value="1,247" 
          icon="activity"
          trend={true}
          percentage={8}
          trendType="positive"
        />
        <MetricCard 
          label="Avg. Hallucination" 
          value="5.5" 
          icon="alert"
          trend={true}
          percentage={3.2}
          trendType="negative"
        />
        <MetricCard 
          label="Avg. Relevance" 
          value="6.5" 
          icon="success"
          trend={true}
          percentage={8.1}
          trendType="positive"
        />
      </div>

      {/* Key metrics highlight */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Performance Trends</h2>
          <div className="flex items-center space-x-2">
            <button 
              className={`p-2 rounded-lg ${selectedChart === 'bar' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-400 hover:bg-gray-100'}`}
              onClick={() => setSelectedChart('bar')}
            >
              <BarChart2 className="h-5 w-5" />
            </button>
            <button 
              className={`p-2 rounded-lg ${selectedChart === 'line' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-400 hover:bg-gray-100'}`}
              onClick={() => setSelectedChart('line')}
            >
              <LineChart className="h-5 w-5" />
            </button>
            <button className="p-2 rounded-lg text-gray-400 hover:bg-gray-100">
              <RefreshCw className="h-5 w-5" />
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-4 gap-6 mb-6">
          <div className="col-span-1">
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Match Rate</h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                    <ArrowUp className="h-3 w-3" /> 12%
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">76.4%</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Relevance Score</h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                    <ArrowUp className="h-3 w-3" /> 5%
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">8.2/10</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Hallucination Rate</h3>
                  <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                    <ArrowDown className="h-3 w-3" /> 3%
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-800">4.2%</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-3 min-h-[300px]">
            {selectedChart === 'bar' ? (
              <Bargraph />
            ) : (
              <Linegraph />
            )}
          </div>
        </div>
      </div>

      {/* Additional charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Question Categories</h2>
          <Bargraph />
        </div>
        
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Over Time</h2>
          <Linegraph />
        </div>
      </div>
      
      {/* Comparative analysis */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Benchmark Comparison</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Current Model</h3>
              <div className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded-full">Active</div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">76.4%</p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-[#8a3aff] rounded-full" style={{ width: '76.4%' }}></div>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Previous Version</h3>
              <div className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">Inactive</div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">68.2%</p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-400 rounded-full" style={{ width: '68.2%' }}></div>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-500">Industry Avg.</h3>
              <div className="px-2 py-1 bg-gray-50 text-gray-600 text-xs font-medium rounded-full">Benchmark</div>
            </div>
            <p className="text-2xl font-bold text-gray-800 mb-2">72.1%</p>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-yellow-400 rounded-full" style={{ width: '72.1%' }}></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
