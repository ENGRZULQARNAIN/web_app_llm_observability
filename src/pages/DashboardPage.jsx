import { useState, useEffect } from "react";
import { Activity, Clock, AlertCircle, CheckCircle, SearchIcon, ChevronLeft, ChevronRight, ArrowUpDown, Flag } from "lucide-react";
import MetricCard from "../components/cards/MetricCard";
import { api } from "../services/api";

// This assumes you have some context or state management to access the selected project
// A real implementation would use Context API, Redux, or another state management solution
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("home");
  const [searchQuery, setSearchQuery] = useState("");
  
  // In a real implementation, you would get this from context/props/state management
  // This is a simulation of getting the selected project from the Sidebar
  const [sidebarSelectedProject, setSidebarSelectedProject] = useState(null);
  
  const [dashboardData, setDashboardData] = useState(null);
  const [loadingDashboard, setLoadingDashboard] = useState(false);
  const [dashboardError, setDashboardError] = useState(null);
  
  // Fetch the selected project from the sidebar on component mount and when it changes
  useEffect(() => {
    // Simulating getting the selected project from sidebar
    // In real implementation, this would come from context or props
    const storedSelectedProject = localStorage.getItem('selectedProject');
    if (storedSelectedProject) {
      try {
        setSidebarSelectedProject(JSON.parse(storedSelectedProject));
      } catch (e) {
        console.error("Error parsing selected project", e);
      }
    }
    
    // Listen for changes in the selected project from sidebar
    const handleStorageChange = (e) => {
      if (e.key === 'selectedProject' && e.newValue) {
        try {
          setSidebarSelectedProject(JSON.parse(e.newValue));
        } catch (error) {
          console.error("Error parsing selected project", error);
        }
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  useEffect(() => {
    if (sidebarSelectedProject && sidebarSelectedProject.project_id) {
      setLoadingDashboard(true);
      setDashboardError(null);
      api.getDashboardData(sidebarSelectedProject.project_id)
        .then((res) => {
          setDashboardData(res.data);
        })
        .catch((err) => {
          setDashboardError("Failed to load dashboard data");
        })
        .finally(() => setLoadingDashboard(false));
    } else {
      setDashboardData(null);
    }
  }, [sidebarSelectedProject]);
  
  // If no project is selected in sidebar, show a default name
  const projectName = sidebarSelectedProject?.project_name || "No Project Selected";

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 pb-10">
      {/* Dashboard Header */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-500">Monitor your projects and performance</p>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <MetricCard 
          label="Benchmark Data" 
          value={dashboardData ? dashboardData.bench_mark_data_title : "-"}
          icon="activity"
        />
        <MetricCard 
          label="Last Run" 
          value={dashboardData ? formatTime(dashboardData.last_run) : "-"}
          icon="time"
        />
        <MetricCard 
          label="Avg. Hallucination" 
          value={dashboardData ? dashboardData.avg_hallucination_score : "-"}
          icon="alert"
        />
        <MetricCard 
          label="Avg. Helpfulness" 
          value={dashboardData ? dashboardData.avg_helpfulness : "-"}
          icon="success"
        />
        <MetricCard 
          label="Total Questions" 
          value="427" 
          icon="activity"
          trend={true}
          percentage={12}
          trendType="positive"
        />
        <MetricCard 
          label="Response Time" 
          value="1.2s" 
          icon="time"
          trend={true}
          percentage={0.3}
          trendType="negative"
        />
      </div>

      {/* Test Samples Table */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex flex-col">
              <h2 className="text-lg font-semibold text-gray-800">Test Samples</h2>
              <div className="text-sm text-gray-500 mt-1">
                Showing data for: <span className="font-medium text-[#8a3aff]">{projectName}</span>
              </div>
            </div>
            
            {/* Search moved to Test Samples header */}
            <div className="relative w-full md:w-64">
              <input
                type="text"
                placeholder="Search test samples..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 rounded-lg border border-gray-200 w-full focus:outline-none focus:ring-2 focus:ring-[#8a3aff]/50 focus:border-[#8a3aff]"
              />
              <SearchIcon className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>
        </div>

        {!sidebarSelectedProject ? (
          <div className="p-10 text-center text-gray-500">
            <AlertCircle className="h-10 w-10 mx-auto mb-3 text-[#8a3aff]" />
            <p className="text-lg font-medium">No project selected</p>
            <p className="mt-1">Please select a project from the sidebar to view test samples</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                        Query <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                        Reference Answer <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                        Difficulty <ArrowUpDown size={14} />
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
                    query="How can I create a new project in OBAM AI?"
                    projectResponse="To create a new project, click on 'Add Project' button in the sidebar, fill in the required fields and click 'Create'."
                    referenceAnswer="Click 'Add Project' in the sidebar, fill out project details in the multi-step form, then click 'Create Project' to complete the process."
                    difficulty="Easy"
                    flag="matched"
                  />

                  <TableRow
                    query="What metrics are available for analysis in the dashboard?"
                    projectResponse="Dashboard provides metrics like hallucination rate, relevance, match rate and benchmark comparisons."
                    referenceAnswer="The dashboard shows benchmark data, last run time, average hallucination rate, average relevance score, total questions, match rate, and response time statistics."
                    difficulty="Medium"
                    flag="mismatched"
                  />

                  <TableRow
                    query="How do I toggle a project's active status?"
                    projectResponse="Click the three dots menu next to a project, then toggle the 'Make it active' switch."
                    referenceAnswer="Click the three dots menu next to a project, then toggle the 'Make it active' switch."
                    difficulty="Easy"
                    flag="matched"
                  />

                  <TableRow
                    query="Where can I find my API credentials?"
                    projectResponse="API credentials can be found in the profile settings page."
                    referenceAnswer="API credentials can be accessed from the profile page under the 'API Access' section."
                    difficulty="Medium"
                    flag="mismatched"
                  />

                  <TableRow
                    query="How to export dashboard data?"
                    projectResponse="Click the 'Export' button in the top-right corner of the dashboard."
                    referenceAnswer="Click the 'Export' button in the top-right corner of the dashboard."
                    difficulty="Hard"
                    flag="matched"
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
          </>
        )}
      </div>
    </div>
  );
}

function TableRow({ query, projectResponse, referenceAnswer, difficulty, flag }) {
  return (
    <tr className="hover:bg-gray-50 transition-colors duration-150">
      <td className="px-6 py-4 relative group cursor-help">
        <div className="text-sm max-w-[250px] truncate">
          {query}
        </div>
        <div className="absolute z-50 left-0 top-full mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm">
          {query}
        </div>
      </td>
      <td className="px-6 py-4 relative group cursor-help">
        <div className="text-sm max-w-[250px] truncate">
          {projectResponse}
        </div>
        <div className="absolute z-50 left-0 top-full mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm">
          {projectResponse}
        </div>
      </td>
      <td className="px-6 py-4 relative group cursor-help">
        <div className="text-sm max-w-[250px] truncate">
          {referenceAnswer}
        </div>
        <div className="absolute z-50 left-0 top-full mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm">
          {referenceAnswer}
        </div>
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        <span className={`px-2 py-1 text-xs font-medium rounded-md ${
          difficulty === 'Easy' 
            ? 'bg-green-50 text-green-600' 
            : difficulty === 'Medium' 
              ? 'bg-yellow-50 text-yellow-600' 
              : 'bg-red-50 text-red-600'
        }`}>
          {difficulty}
        </span>
      </td>
      <td className="px-6 py-4">
        {flag === "matched" ? (
          <Flag className="h-5 w-5 text-green-600 fill-green-100" />
        ) : (
          <Flag className="h-5 w-5 text-red-600 fill-red-100" />
        )}
      </td>
    </tr>
  );
}

function formatTime(dateString) {
  if (!dateString) return "-";
  const date = new Date(dateString);
  if (isNaN(date)) return "-";
  // Format as e.g. '2:30 PM' or '2025-06-19 14:17' as needed
  return date.toLocaleString();
}
