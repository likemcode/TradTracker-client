import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useGetDoughnutDataQuery } from '../services/BackendApi';

const MyDoughnutChartComponent = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);
  const { data: data, isLoading, error } = useGetDoughnutDataQuery();
  
  if (isLoading) return 'loading';
  if (error) return <div>Error: {error.message}</div>;

  // Set chart data when data is available
  useEffect(() => {
    if (data) {
      setChartData(data);
    }
  }, [data]);


  // Component-level cleanup using useEffect
  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);
  


  const options = {
    // aspectRatio:2
    // Add your desired chart options here
  };

  return (
    <div className="my-chart">
      <Doughnut
        ref={chartRef}
        data={{
          labels: chartData.map(item => item.symbol),
          datasets: [{
            data: chartData.map(item => item.frequency),
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
          }],
        }}
        options={options}
      />
    </div>
  );
};

export default MyDoughnutChartComponent;
