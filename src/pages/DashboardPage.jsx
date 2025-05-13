import { useState } from "react";
import { Activity, Clock, AlertCircle, CheckCircle, SearchIcon, Download, Filter, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import MetricCard from "../components/cards/MetricCard";

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-10">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Monitor your projects and performance</p>
        </div>
        
        <div className="flex items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-64 focus:outline-none focus:ring-2 focus:ring-[#8a3aff]/50 focus:border-[#8a3aff]"
            />
            <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
          
          <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-300">
            <Filter className="h-4 w-4" /> 
            Filter
          </button>
          
          <button className="px-4 py-2 text-sm bg-white border border-gray-200 rounded-lg flex items-center gap-2 hover:bg-gray-50 transition-all duration-300">
            <Download className="h-4 w-4" /> 
            Export
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard 
          label="Benchmark Data" 
          value="Uni Bot Data" 
          icon="activity"
          trend={true}
          percentage={12}
          trendType="positive"
        />
        <MetricCard 
          label="Last Run" 
          value="9 pm" 
          icon="time"
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

      {/* Summary Stats */}
      <div className="bg-white rounded-xl p-5 border border-gray-200 shadow-sm mb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Performance Metrics</h2>
          <div className="flex gap-2">
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 bg-white">Today</button>
            <button className="px-3 py-1 text-sm bg-[#8a3aff] text-white rounded-md hover:bg-[#7a2ff5]">This Week</button>
            <button className="px-3 py-1 text-sm border border-gray-200 rounded-md hover:bg-gray-50 bg-white">This Month</button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="border border-gray-100 rounded-lg p-4 text-center bg-gray-50/50">
            <p className="text-sm text-gray-500 mb-2">Total Questions</p>
            <p className="text-3xl font-bold text-gray-800">427</p>
            <div className="flex justify-center mt-2">
              <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">↑ 12% from last week</span>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4 text-center bg-gray-50/50">
            <p className="text-sm text-gray-500 mb-2">Match Rate</p>
            <p className="text-3xl font-bold text-gray-800">76%</p>
            <div className="flex justify-center mt-2">
              <span className="text-xs px-2 py-1 bg-green-50 text-green-600 rounded-full">↑ 5% from last week</span>
            </div>
          </div>
          
          <div className="border border-gray-100 rounded-lg p-4 text-center bg-gray-50/50">
            <p className="text-sm text-gray-500 mb-2">Response Time</p>
            <p className="text-3xl font-bold text-gray-800">1.2s</p>
            <div className="flex justify-center mt-2">
              <span className="text-xs px-2 py-1 bg-red-50 text-red-600 rounded-full">↓ 0.3s from last week</span>
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-800">Recent Responses</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                    Questions <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                    Chatbot Answers <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                    Necessary Answers <ArrowUpDown size={14} />
                  </div>
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                  <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                    Flag <ArrowUpDown size={14} />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <TableRow
                question="How can I create a new project in OBAM AI?"
                chatbotAnswer="To create a new project, click on 'Add Project' button in the sidebar, fill in the required fields and click 'Create'."
                necessaryAnswer="Click 'Add Project' in the sidebar, fill out project details in the multi-step form, then click 'Create Project' to complete the process."
                flag="Matched"
              />

              <TableRow
                question="What metrics are available for analysis in the dashboard?"
                chatbotAnswer="Dashboard provides metrics like hallucination rate, relevance, match rate and benchmark comparisons."
                necessaryAnswer="The dashboard shows benchmark data, last run time, average hallucination rate, average relevance score, total questions, match rate, and response time statistics."
                flag="Mis-Matched"
              />

              <TableRow
                question="How do I toggle a project's active status?"
                chatbotAnswer="Click the three dots menu next to a project, then toggle the 'Make it active' switch."
                necessaryAnswer="Click the three dots menu next to a project, then toggle the 'Make it active' switch."
                flag="Matched"
              />

              <TableRow
                question="Where can I find my API credentials?"
                chatbotAnswer="API credentials can be found in the profile settings page."
                necessaryAnswer="API credentials can be accessed from the profile page under the 'API Access' section."
                flag="Mis-Matched"
              />

              <TableRow
                question="How to export dashboard data?"
                chatbotAnswer="Click the 'Export' button in the top-right corner of the dashboard."
                necessaryAnswer="Click the 'Export' button in the top-right corner of the dashboard."
                flag="Matched"
              />
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="p-5 flex items-center justify-between border-t border-gray-200">
          <div className="text-sm text-gray-500">Showing 5 of 25 results</div>
          <div className="flex gap-2">
            <button className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed">
              <ChevronLeft size={16} />
            </button>
            <button className="w-9 h-9 rounded-md flex items-center justify-center border border-[#8a3aff] bg-[#8a3aff]/10 text-[#8a3aff] font-medium">1</button>
            <button className="w-9 h-9 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-50">2</button>
            <button className="w-9 h-9 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-50">3</button>
            <button className="w-9 h-9 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-50">4</button>
            <button className="w-9 h-9 rounded-md flex items-center justify-center border border-gray-200 hover:bg-gray-50">5</button>
            <button className="p-2 rounded-md border border-gray-200 hover:bg-gray-50">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function TableRow({ question, chatbotAnswer, necessaryAnswer, flag }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 text-sm max-w-[250px] truncate">{question}</td>
      <td className="px-6 py-4 text-sm max-w-[250px] truncate">{chatbotAnswer}</td>
      <td className="px-6 py-4 text-sm max-w-[250px] truncate">{necessaryAnswer}</td>
      <td className="px-6 py-4">
        {flag === "Matched" && (
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-[#ecfdf3] text-[#12b76a]">Matched</span>
        )}
        {flag === "Mis-Matched" && (
          <span className="px-2 py-1 text-xs font-medium rounded-md bg-[#fef3f2] text-[#f04438]">Mis-Matched</span>
        )}
      </td>
    </tr>
  );
}
