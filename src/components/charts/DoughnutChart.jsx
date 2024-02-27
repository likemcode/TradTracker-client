import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const MyDoughnutChartComponent = () => {
  const chartRef = useRef(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:8000/backend/trades/pie-chart-data');
        const data = await response.json();
        setChartData(data);
      } catch (error) {
        console.error('Error fetching pie chart data:', error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    renderPieChart();
  }, [chartData]);

  const renderPieChart = () => {
    const ctx = chartRef.current.getContext('2d');
    if (ctx && chartData.length > 0) {
      const labels = chartData.map(item => item.symbol);
      const frequencies = chartData.map(item => item.frequency);

      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            data: frequencies,
            backgroundColor: [
              'rgba(255, 99, 132, 0.2)',
              'rgba(54, 162, 235, 0.2)',
              'rgba(255, 206, 86, 0.2)',
              'rgba(75, 192, 192, 0.2)',
              'rgba(153, 102, 255, 0.2)',
              'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
          }]
        },
        options: {
          // Add chart options as needed
        }
      });
    }
  };

  return (
    <div>
      <canvas ref={chartRef} width="400" height="400"></canvas>
    </div>
  );
};

export default MyDoughnutChartComponent;
