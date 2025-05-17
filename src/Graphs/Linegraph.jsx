import ReactECharts from 'echarts-for-react';

const Linegraph = ({ metricType = 'hallucination' }) => {
  const isHallucination = metricType === 'hallucination';
  
  // Sample data points based on timeframe
  const timeData = Array.from({ length: 7 }, (_, i) => `Day ${i+1}`);
  
  // Generate sample data with realistic patterns
  const generateData = (base, variation, trend) => {
    return Array.from({ length: 7 }, (_, i) => {
      // Add some natural variation + slight trend
      return (base + Math.sin(i) * variation + (i * trend)).toFixed(1);
    });
  };

  const option = {
    title: {
      text: isHallucination ? 'Hallucination Rate Over Time' : 'Helpfulness Score Over Time',
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
      axisPointer: {
        type: 'cross',
        label: {
          backgroundColor: '#6a7985'
        }
      },
      formatter: function(params) {
        let result = params[0].name + '<br/>';
        params.forEach(param => {
          const color = param.color;
          const seriesName = param.seriesName;
          const value = param.value;
          const marker = `<span style="display:inline-block;margin-right:4px;border-radius:10px;width:10px;height:10px;background-color:${color};"></span>`;
          
          if (isHallucination) {
            result += `${marker} ${seriesName}: ${value}%<br/>`;
          } else {
            result += `${marker} ${seriesName}: ${value}/10<br/>`;
          }
        });
        return result;
      }
    },
    legend: {
      data: ['Easy', 'Medium', 'Hard'],
      bottom: 0,
      icon: 'circle',
      itemWidth: 10,
      itemHeight: 10,
      textStyle: {
        fontSize: 12,
        color: '#666'
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
      boundaryGap: false,
      data: timeData,
      name: 'Time',
      nameTextStyle: {
        fontWeight: 'bold',
        fontSize: 12,
        color: '#666',
      },
      nameLocation: 'middle',
      nameGap: 30,
      axisLabel: {
        fontSize: 12,
        color: '#666'
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
        color: '#666'
      }
    },
    series: [
      {
        name: 'Easy',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: isHallucination 
          ? generateData(2.1, 0.5, 0.05) // Low hallucination with slight increase
          : generateData(8.8, 0.3, -0.05), // High helpfulness with slight decrease
        lineStyle: {
          color: '#4CAF50',
          width: 3,
        },
        itemStyle: {
          color: '#4CAF50',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(76, 175, 80, 0.3)'
            }, {
              offset: 1, color: 'rgba(76, 175, 80, 0.05)'
            }],
          }
        }
      },
      {
        name: 'Medium',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: isHallucination 
          ? generateData(4.5, 0.7, 0) // Medium hallucination, stable
          : generateData(7.5, 0.5, 0.1), // Medium helpfulness with increase
        lineStyle: {
          color: '#FF9800',
          width: 3,
        },
        itemStyle: {
          color: '#FF9800',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(255, 152, 0, 0.3)'
            }, {
              offset: 1, color: 'rgba(255, 152, 0, 0.05)'
            }],
          }
        }
      },
      {
        name: 'Hard',
        type: 'line',
        smooth: true,
        symbol: 'circle',
        symbolSize: 6,
        data: isHallucination 
          ? generateData(7.8, 0.9, -0.2) // High hallucination with improvement
          : generateData(6.2, 0.7, 0.15), // Lower helpfulness with improvement
        lineStyle: {
          color: '#F44336',
          width: 3,
        },
        itemStyle: {
          color: '#F44336',
          borderWidth: 2,
          borderColor: '#fff'
        },
        areaStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [{
              offset: 0, color: 'rgba(244, 67, 54, 0.3)'
            }, {
              offset: 1, color: 'rgba(244, 67, 54, 0.05)'
            }],
          }
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

export default Linegraph;
