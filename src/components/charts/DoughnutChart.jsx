import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useGetDoughnutDataQuery } from '../../services/BackendApi';
import 'chart.js/auto';


const MyDoughnutChartComponent = ({timeRange}) => {
  const chartRef = useRef(null);
  const { data, isLoading, error } = useGetDoughnutDataQuery(timeRange);

  

  // Component-level cleanup using useEffect
  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  // Handle loading state
  if (isLoading) return 'Loading...';

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  const options = {
    responsive:false,
    aspectRatio:1,
    maintainAspectRatio:true
  };

  // Render chart when data is available
  return (
    <div className="my-chart">
      <Doughnut
        ref={chartRef}
        data={{
          labels: data.map(item => item.symbol),
          datasets: [{
            data: data.map(item => item.frequency),
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            cutout:'75%',
          }],
        }}
        options={options}
        width={300}
        height={300}
      />
    </div>
  );
};

export default MyDoughnutChartComponent;
