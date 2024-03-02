import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';
import { useGetAccountProgressQuery } from '../../services/BackendApi';
import { Card } from 'antd';

const LineChart = () => {
  const [chartData, setChartData] = useState([]);
  const { data: progressData, isLoading, error } = useGetAccountProgressQuery();

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
    }
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
