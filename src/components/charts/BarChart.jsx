import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { useGetBarChartDataQuery } from '../../services/BackendApi';
import Loader from '../Loader';

const BarChart = ({ timeRange }) => {
  
  const { data, isLoading, error } = useGetBarChartDataQuery(timeRange);
 
  

    if (isLoading) return <Loader/>;
    if (error) return <div>Error: {error.message}</div>;
    
 // Preprocess data
 const labels = data.map(item => new Date(item.dates).toLocaleDateString());
 const profits = data.map(item => item.profit);

 const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Profit',
        data: profits,
        backgroundColor: profits.map(profit => profit >= 0 ? 'rgba(70, 149, 252, 0.900)' : 'rgba(228, 49, 49, 0.900)'), // Color bars based on profit
        borderWidth: 1,
        borderRadius:4,
      },
    ],
 };

 const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
    responsive: true,
    maintainAspectRatio: false
 };

 return (
  <div style={{ width: '100%', height: 'auto' }}>
  <div style={{ width: '100%', height: '300px' }}>
      <Bar data={chartData} options={options} />
    </div>
    </div>
 );
};

export default BarChart;