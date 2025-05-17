import ReactECharts from 'echarts-for-react';

const Bargraph = ({ metricType = 'hallucination' }) => {
  const isHallucination = metricType === 'hallucination';
  
  const option = {
    title: {
      text: isHallucination ? 'Hallucination Rate by Difficulty' : 'Helpfulness Score by Difficulty',
      left: 'center',
      textStyle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#333',
        lineHeight: 20,
      },
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter: function (params) {
        const value = params[0].value;
        if (isHallucination) {
          return `${params[0].name} Difficulty<br/>${value}% Hallucination Rate`;
        } else {
          return `${params[0].name} Difficulty<br/>${value}/10 Helpfulness Score`;
        }
      }
    },
    grid: {
      left: '5%',
      right: '5%',
      bottom: '15%',
      top: '15%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: ['Easy', 'Medium', 'Hard'],
      axisTick: { alignWithLabel: true },
      name: 'Difficulty Level',
      nameLocation: 'middle',
      nameGap: 30,
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#666',
      },
      axisLabel: {
        fontSize: 12,
        color: '#666',
      }
    },
    yAxis: {
      type: 'value',
      name: isHallucination ? 'Hallucination Rate (%)' : 'Helpfulness Score (1-10)',
      min: isHallucination ? 0 : 0,
      max: isHallucination ? 10 : 10,
      nameLocation: 'middle',
      nameGap: 40,
      nameRotate: 90,
      nameTextStyle: {
        align: 'right',
        fontWeight: 'bold',
        fontSize: 12,
        color: '#666',
      },
      axisLabel: {
        formatter: isHallucination ? '{value}%' : '{value}',
        fontSize: 12,
        color: '#666',
      }
    },
    series: [
      {
        name: isHallucination ? 'Hallucination Rate' : 'Helpfulness Score',
        type: 'bar',
        barWidth: '50%',
        itemStyle: {
          borderRadius: [8, 8, 0, 0],
        },
        data: isHallucination ? 
          [
            { value: 2.1, itemStyle: { color: '#4CAF50' } }, // Easy - Green
            { value: 4.5, itemStyle: { color: '#FF9800' } }, // Medium - Orange
            { value: 7.8, itemStyle: { color: '#F44336' } }, // Hard - Red
          ] : 
          [
            { value: 8.9, itemStyle: { color: '#4CAF50' } }, // Easy - Green
            { value: 7.5, itemStyle: { color: '#FF9800' } }, // Medium - Orange
            { value: 6.2, itemStyle: { color: '#F44336' } }, // Hard - Red
          ],
        label: {
          show: true,
          position: 'top',
          formatter: isHallucination ? '{c}%' : '{c}',
          fontSize: 12,
          fontWeight: 'bold',
          color: '#555'
        }
      },
    ],
  };

  return (
    <div className="w-full h-full">
      <ReactECharts 
        option={option} 
        style={{ height: '100%', minHeight: '300px', width: '100%' }} 
        opts={{ renderer: 'svg' }}
      />
    </div>
  );
};

export default Bargraph;
