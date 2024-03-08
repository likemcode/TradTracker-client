import React, {useState, useEffect} from 'react';
import { Bar } from 'react-chartjs-2';
import { useGetBarChartDataQuery } from '../../services/BackendApi';



const BarChart = ({ timeRange }) => {
  
  const { data, isLoading, error } = useGetBarChartDataQuery(timeRange);
 
  

    if (isLoading) return <div>Loading...</div>;
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
        backgroundColor: profits.map(profit => profit >= 0 ? 'green' : 'red'), // Color bars based on profit
        borderWidth: 1,
      },
    ],
 };

 const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
 };

 return (
    <div>
      <Bar data={chartData} options={options} width={400} height={300}/>
    </div>
 );
};

export default BarChart;