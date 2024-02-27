import React, { useEffect, useState } from 'react';
import Chart from 'chart.js/auto';

const LineChart = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/backend/trades/progress');
      const data = await response.json();
      setChartData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (chartData.length > 0) {
      renderChart();
    }
  }, [chartData]);

  const renderChart = () => {
    const dates = chartData.map(data => data.dates);
    const accumulatedProfit = chartData.map(data => data.accumulated_profit);

    const ctx = document.getElementById('myLineChart');
    if (ctx) {
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Accumulated Profit',
            data: accumulatedProfit,
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: false
            }
          }
        }
      });
    }
  };

  return (
    <div>
      <canvas id="myLineChart" width="400" height="400"></canvas>
    </div>
  );
};

export default LineChart;
