import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useGetAccountProgressQuery } from '../../services/BackendApi';
import Loader from '../Loader';


const LineChart = ({ timeRange, accountId }) => { // Correctly receiving timeRange as a prop
  const [chartData, setChartData] = useState([]);
  const { data: progressData, isLoading, error } = useGetAccountProgressQuery({ timeRange, accountId });
  
  useEffect(() => {
    if (progressData) {
      setChartData(progressData);
    }
  }, [progressData]);

  // Create gradient
  const ctx = document.createElement('canvas').getContext('2d');
  const gradient = ctx.createLinearGradient(0, 0, 0, 275); // Adjust the height as per your chart's height
  gradient.addColorStop(0, 'rgba(70, 149, 252, 0.400)'); // Start color
  gradient.addColorStop(1, 'rgba(70, 149, 252, 0.093)'); // End color

  const chartOptions = {
    scales: {
      x: {
        grid: {
          display: false, // This hides the y-axis grid lines
        }, 
        beginAtZero: false
      },

      y: {
        grid: {
          display: true, // This hides the y-axis grid lines
        },
      }
    },
    responsive: true,
    animations: {
      tension: {
        duration: 1000,
        easing: 'linear',
        from: 1,
        to: 0,
        loop: true
      }
    },
    maintainAspectRatio: false
  };

  if (isLoading) return <Loader/>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <div style={{ width: '100%', height: '300px' }}> {/* Adjust the height as needed */}
        <Line
          data={{
            labels: chartData.map(data => new Date(data.dates).toLocaleDateString()),
            datasets: [{
              label: 'Accumulated Profit',
              data: chartData.map(data => data.profit),
              fill: true,
              backgroundColor: gradient,
              borderWidth: 2,
              pointRadius: 1,
              borderColor: 'rgba(70, 149, 252, 0.815)',
              tension: 0.4
            }]
          }}
          options={chartOptions}
        />
      </div>
    </div>
  );
};

export default LineChart;
