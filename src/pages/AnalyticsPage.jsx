import React, { useState } from 'react';
import Bargraph from '../Graphs/Bargraph';
import Linegraph from '../Graphs/Linegraph';
import MetricCard from "../components/cards/MetricCard";
import { BarChart2, LineChart, ArrowDown, ArrowUp, RefreshCw } from 'lucide-react';

function AnalyticsPage() {
  const [selectedChart, setSelectedChart] = useState('bar');
  const [metricType, setMetricType] = useState('hallucination');

  return (
    <div className="min-h-screen bg-gray-50 pb-10 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Analytics</h1>
          <p className="text-gray-500">LLM Performance Monitoring</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          label="Total Tests" 
          value="1,247" 
          icon="activity"
          trend={true}
          percentage={8}
          trendType="positive"
        />
        <MetricCard 
          label="Easy Hallucination Rate" 
          value="2.1%" 
          icon="alert"
          trend={true}
          percentage={1.5}
          trendType="negative"
        />
        <MetricCard 
          label="Medium Hallucination Rate" 
          value="4.5%" 
          icon="alert"
          trend={true}
          percentage={3.2}
          trendType="negative"
        />
        <MetricCard 
          label="Hard Hallucination Rate" 
          value="7.8%" 
          icon="alert"
          trend={true}
          percentage={2.4}
          trendType="positive"
        />
      </div>

      {/* Performance Metric Toggle */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-2">
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium ${metricType === 'hallucination' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setMetricType('hallucination')}
            >
              Hallucination
            </button>
            <button 
              className={`px-4 py-2 rounded-lg text-sm font-medium ${metricType === 'helpfulness' ? 'bg-[#8a3aff]/10 text-[#8a3aff]' : 'text-gray-600 hover:bg-gray-50'}`}
              onClick={() => setMetricType('helpfulness')}
            >
              Helpfulness
            </button>
          </div>
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
                  <h3 className="text-sm font-medium text-gray-500">Easy Difficulty</h3>
                  {metricType === 'hallucination' ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      <ArrowDown className="h-3 w-3" /> 2.1%
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      <ArrowUp className="h-3 w-3" /> 8.9/10
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800">{metricType === 'hallucination' ? '2.1%' : '8.9/10'}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Medium Difficulty</h3>
                  {metricType === 'hallucination' ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium">
                      <ArrowDown className="h-3 w-3" /> 4.5%
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-green-50 text-green-600 text-xs font-medium">
                      <ArrowUp className="h-3 w-3" /> 7.5/10
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800">{metricType === 'hallucination' ? '4.5%' : '7.5/10'}</p>
              </div>
              
              <div>
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-medium text-gray-500">Hard Difficulty</h3>
                  {metricType === 'hallucination' ? (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-red-50 text-red-600 text-xs font-medium">
                      <ArrowDown className="h-3 w-3" /> 7.8%
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-yellow-50 text-yellow-600 text-xs font-medium">
                      <ArrowUp className="h-3 w-3" /> 6.2/10
                    </div>
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800">{metricType === 'hallucination' ? '7.8%' : '6.2/10'}</p>
              </div>
            </div>
          </div>
          
          <div className="col-span-3 min-h-[300px]">
            {selectedChart === 'bar' ? (
              <Bargraph metricType={metricType} />
            ) : (
              <Linegraph metricType={metricType} />
            )}
          </div>
        </div>
      </div>

      {/* Performance over time */}
      <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Performance Over Time</h2>
        <div className="grid grid-cols-1 gap-6">
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Hallucination Rate Trends</h3>
            <Linegraph metricType="hallucination" />
          </div>
          <div>
            <h3 className="text-md font-medium text-gray-700 mb-2">Helpfulness Score Trends</h3>
            <Linegraph metricType="helpfulness" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default AnalyticsPage;
