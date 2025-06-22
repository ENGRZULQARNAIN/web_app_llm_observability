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
  
  const [testSamples, setTestSamples] = useState([]);
  const [testSamplesPagination, setTestSamplesPagination] = useState(null);
  const [testSamplesLoading, setTestSamplesLoading] = useState(false);
  const [testSamplesError, setTestSamplesError] = useState(null);
  const [testSamplesPage, setTestSamplesPage] = useState(1);
  const TEST_SAMPLES_PAGE_SIZE = 5;
  
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
  
  // Fetch dashboard data
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

  // Fetch test samples when project or page changes
  useEffect(() => {
    if (sidebarSelectedProject && sidebarSelectedProject.project_id) {
      setTestSamplesLoading(true);
      setTestSamplesError(null);
      api.getTestSamples(sidebarSelectedProject.project_id, testSamplesPage, TEST_SAMPLES_PAGE_SIZE)
        .then((res) => {
          setTestSamples(res.qa_pairs || []);
          setTestSamplesPagination(res.pagination || null);
        })
        .catch(() => {
          setTestSamplesError("Failed to load test samples");
        })
        .finally(() => setTestSamplesLoading(false));
    } else {
      setTestSamples([]);
      setTestSamplesPagination(null);
    }
  }, [sidebarSelectedProject, testSamplesPage]);
  
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
          value={testSamplesPagination ? testSamplesPagination.total_qa_pairs : "-"}
          icon="activity"
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
                        Student Answer <ArrowUpDown size={14} />
                      </div>
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider whitespace-nowrap">
                      <div className="flex items-center gap-1 cursor-pointer hover:text-[#8a3aff]">
                        Difficulty <ArrowUpDown size={14} />
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {testSamplesLoading ? (
                    <tr><td colSpan={4} className="text-center py-8">Loading...</td></tr>
                  ) : testSamplesError ? (
                    <tr><td colSpan={4} className="text-center py-8 text-red-500">{testSamplesError}</td></tr>
                  ) : testSamples.length === 0 ? (
                    <tr><td colSpan={4} className="text-center py-8">No test samples found.</td></tr>
                  ) : (
                    testSamples.map((item, idx) => {
                      const difficulty = item.difficulty_level ? item.difficulty_level.charAt(0).toUpperCase() + item.difficulty_level.slice(1) : "";
                      return (
                        <TableRow
                          key={idx}
                          query={item.question}
                          referenceAnswer={item.factual_answer}
                          studentAnswer={item.student_answer}
                          difficulty={difficulty}
                        />
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {testSamplesPagination && (
              <div className="p-5 flex items-center justify-between border-t border-gray-200">
                <div className="text-sm text-gray-500">
                  Showing {testSamples.length} of {testSamplesPagination.total_qa_pairs} results
                </div>
                <div className="flex gap-2">
                  <button
                    className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setTestSamplesPage(testSamplesPagination.current_page - 1)}
                    disabled={!testSamplesPagination.has_previous}
                  >
                    <ChevronLeft size={16} />
                  </button>
                  {Array.from({ length: testSamplesPagination.total_pages }, (_, i) => (
                    <button
                      key={i + 1}
                      className={`w-9 h-9 rounded-md flex items-center justify-center border ${testSamplesPagination.current_page === i + 1 ? 'border-[#8a3aff] bg-[#8a3aff]/10 text-[#8a3aff] font-medium' : 'border-gray-200 hover:bg-gray-50'}`}
                      onClick={() => setTestSamplesPage(i + 1)}
                    >
                      {i + 1}
                    </button>
                  ))}
                  <button
                    className="p-2 rounded-md border border-gray-200 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                    onClick={() => setTestSamplesPage(testSamplesPagination.current_page + 1)}
                    disabled={!testSamplesPagination.has_next}
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function parseStudentAnswer(rawAnswer) {
  try {
    // Clean the string by removing extra content outside the JSON structure
    const jsonString = rawAnswer.substring(0, rawAnswer.lastIndexOf('}') + 1);
    const parsed = JSON.parse(jsonString);
    const aiMessage = parsed.result?.messages?.find(msg => msg.ai);
    return aiMessage ? aiMessage.ai : rawAnswer;
  } catch (error) {
    // If parsing fails, return the raw string
    return rawAnswer;
  }
}

function TableRow({ query, referenceAnswer, studentAnswer, difficulty }) {
  const displayStudentAnswer = parseStudentAnswer(studentAnswer);
  
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
          {referenceAnswer}
        </div>
        <div className="absolute z-50 left-0 top-full mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm">
          {referenceAnswer}
        </div>
      </td>
      <td className="px-6 py-4 relative group cursor-help">
        <div className="text-sm max-w-[250px] truncate">
          {displayStudentAnswer}
        </div>
        <div className="absolute z-50 left-0 top-full mt-2 w-72 p-3 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 text-sm">
          {displayStudentAnswer}
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
