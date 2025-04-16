import ReactECharts from 'echarts-for-react';
import { Text } from 'recharts';

const BarChart = () => {
  const option = {
    title: {
      text: 'Hallucination',
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        lineHeight: 20, // Optional if you're adjusting vertical spacing
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
    },
    xAxis: {
        type: 'category',
        data: ['Easy', 'Medium', 'Hard'],
        axisTick: { alignWithLabel: true },
        name: 'Difficulty Level',
        nameLocation: 'middle',
        nameGap: 40,
        nameTextStyle: {
          fontWeight: 'bold',
          fontSize: 14,
          color: '#666',
        },
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
        name: 'Score',
        type: 'bar',
        barWidth: '30%',
        itemStyle: {
            borderRadius: [8, 8, 0, 0], // top-left, top-right, bottom-right, bottom-left
          },
        data: [
          { value: 400, itemStyle: { color: '#4CAF50' } }, // Green
          { value: 700, itemStyle: { color: '#FF9800' } }, // Orange
          { value: 1000, itemStyle: { color: '#F44336' } }, // Red
        ],
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

export default BarChart;
