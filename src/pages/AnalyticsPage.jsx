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
