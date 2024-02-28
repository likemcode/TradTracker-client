import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { Card } from 'antd';

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

  const chartOptions = {
    scales: {
      y: {
        beginAtZero: false
      }
    }
  };

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
              tension: 0.1
            }]
          }}
          options={chartOptions}
        />
      </Card>
    </div>
  );
};

export default LineChart;
