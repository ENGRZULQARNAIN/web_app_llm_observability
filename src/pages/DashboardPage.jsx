<<<<<<< HEAD
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
=======
import { useState } from "react";
import { Bell, HelpCircle, MoreVertical, Plus } from "lucide-react";
import { Link } from "react-router-dom";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");

  return (
    <div className="min-h-screen flex flex-col bg-white">

      <div className="flex flex-1">

        {/* Main Content */}
        <main className="flex-1 ">
         
          {/* Metrics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          <MetricCard label="Benchmark Data" value="Uni Bot Data" />
          <MetricCard label="Last Run" value="9 pm" />
          <MetricCard label="Avg. Hallucination" value="5.5" />
          <MetricCard label="Avg. Relevance" value="6.5" />
        </div>

          {/* Table */}
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="grid grid-cols-4 border-b border-gray-200">
              <div className="p-4 font-medium text-gray-700">Questions</div>
              <div className="p-4 font-medium text-gray-700">Chatbot Answers</div>
              <div className="p-4 font-medium text-gray-700">Necessary Answers</div>
              <div className="p-4 font-medium text-gray-700">Flag</div>
            </div>

            <TableRow
              question="Lorem ipsum dolor sit amet consectetur. Risus est vitae eget."
              chatbotAnswer="Lorem ipsum dolor sit amet consectetur. Lacus malesuada viverra."
              necessaryAnswer="Lorem ipsum dolor sit amet consectetur. Tellus urna leo id mollis a."
              flag="Matched"
            />

            <TableRow
              question="Lorem ipsum dolor sit amet consectetur. Pretium molestie enim."
              chatbotAnswer="Lorem ipsum dolor sit amet consectetur. Molestie tellus interdum."
              necessaryAnswer="Lorem ipsum dolor sit amet consectetur. Aliquam turpis turpis."
              flag="Mis-Matched"
            />

            <TableRow
              question="Lorem ipsum dolor sit amet consectetur. Sodales curabitur morbi."
              chatbotAnswer=""
              necessaryAnswer="Lorem ipsum dolor sit amet consectetur. At sollicitudin nec ut."
              flag="Matched"
            />

            <TableRow
              question="Lorem ipsum dolor sit amet consectetur. Etiam metus mi ac sed."
              chatbotAnswer="Lorem ipsum dolor sit amet consectetur. Nec convallis venenatis."
              necessaryAnswer="Lorem ipsum dolor sit amet consectetur. Dapibus viverra tempus."
              flag="Mis-Matched"
            />

            <TableRow
              question=""
              chatbotAnswer="Lorem ipsum dolor sit amet consectetur. Faucibus quis venenatis."
              necessaryAnswer=""
              flag=""
            />

            {/* Pagination */}
            <div className="p-4 flex items-center justify-between border-t border-gray-200">
              <div className="flex gap-2">
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">
                  Previous
                </button>
                <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50">Next</button>
              </div>
              <div className="text-sm text-gray-500">Page 1 of 10</div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

function MetricCard({ label, value }) {
  return (
    <div className="bg-white border border-gray-200 rounded-md p-4">
      <div className="text-sm text-gray-500 mb-2">{label}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  );
}

function TableRow({ question, chatbotAnswer, necessaryAnswer, flag }) {
  return (
    <div className="grid grid-cols-4 border-b border-gray-200">
      <div className="p-4 text-sm">{question}</div>
      <div className="p-4 text-sm">{chatbotAnswer}</div>
      <div className="p-4 text-sm">{necessaryAnswer}</div>
      <div className="p-4">
        {flag === "Matched" && (
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-[#ecfdf3] text-[#12b76a]">Matched</span>
        )}
        {flag === "Mis-Matched" && (
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-[#fef3f2] text-[#f04438]">Mis-Matched</span>
        )}
      </div>
    </div>
  );
}
>>>>>>> origin/master
