import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useGetAccountProgressQuery } from '../../services/BackendApi';
import { Card } from 'antd';

const LineChart = ({ timeRange }) => { // Correctly receiving timeRange as a prop
  const [chartData, setChartData] = useState([]);
  const { data: progressData, isLoading, error } = useGetAccountProgressQuery(timeRange);
 
  useEffect(() => {
     if (progressData) {
       setChartData(progressData);
     }
  }, [progressData]);

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: false
      }
    },
    responsive:false,
    
    maintainAspectRatio:true
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <Card>
        <Line
          data={{
            labels: chartData.map(data => new Date(data.dates).toLocaleDateString()),
            datasets: [{
              label: 'Accumulated Profit',
              data: chartData.map(data => data.profit),
              fill: true,
              borderColor: 'rgb(75, 192, 192)',
              tension: 0.4
            }]
          }}
          options={chartOptions}
          width={500}
        height={275}
        />
      </Card>
    </div>
  );
};

export default LineChart;
