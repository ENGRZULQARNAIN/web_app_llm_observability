import ReactECharts from 'echarts-for-react';

const MultiLineChart = () => {
  const option = {
    title: {
      text: 'Average Hallucination',
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 20, // Optional if you're adjusting vertical spacing
      },
    },
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      bottom: 0,
      data: ['High', 'Medium', 'Low'],
    },
    xAxis: {
      type: 'category',
      boundaryGap: false,
      data: Array.from({ length: 24 }, (_, i) => i + 1), // Time: 1 to 24
      name: 'Time',
      nameTextStyle: {
       // Align it toward the right
        fontWeight: 'bold',
        fontSize: 14,
        color: '#666',
      },
      nameLocation: 'middle',
      
      nameGap: 30,
    },
    yAxis: {
        type: 'value',
        name: 'Score',
        nameLocation: 'middle',
        nameGap: 30,
        nameRotate: 90, // Rotate the label vertically
        nameTextStyle: {
          align: 'right', // Align it toward the right
          fontWeight: 'bold',
          fontSize: 14,
          color: '#666',
        },
      },
      
    series: [
      {
        // name: 'High',
        type: 'line',
        smooth: true,
        symbol: 'none', // ✅ no dots
        data: [
          20, 70,88.4, 110, 410, 340, 670, 700, 740, 760, 790, 800,
          820, 850, 860, 880, 900, 930, 950, 960, 970, 980, 990, 1000,
        ],
        lineStyle: {
          color: '#F44336',
          width: 3,
        },
        areaStyle: {
          color: 'rgba(244, 67, 54, 0.1)',
        },
      },
      {
        // name: 'Medium',
        type: 'line',
        smooth: true,
        symbol: 'none', // ✅ no dots
        data: Array.from({ length: 24 }, (_, i) => 400 + Math.sin(i / 2) * 30),
        lineStyle: {
          color: '#FF9800',
          width: 3,
        },
        areaStyle: {
          color: 'rgba(255, 152, 0, 0.1)',
        },
      },
      {
        // name: 'Low',
        type: 'line',
        smooth: true,
        symbol: 'none', // ✅ no dots
        data: Array.from({ length: 24 }, (_, i) => 200 + Math.sin(i / 1.5) * 25),
        lineStyle: {
          color: '#4CAF50',
          width: 3,
        },
        areaStyle: {
          color: 'rgba(76, 175, 80, 0.1)',
        },
      },
    ],
  };

  return (
    <div
      style={{
        width: '50%',
        margin: '',
        border: '1px solid #ddd',
        borderRadius: '2px',
        padding: '5px',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
      }}
    >
      <ReactECharts option={option} style={{ height: 300, width: '100%' }} />
    </div>
  );
};

export default MultiLineChart;
