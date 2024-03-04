import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';

const SemiDoughnutChart = () => {
  const [tradeData, setTradeData] = useState(null);
  const [error, setError] = useState(null);
  const apiUrl = 'http://127.0.0.1:8000/backend/trades/win-rate/';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        setTradeData(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchData();
  }, []);

  const chartData = {
    labels: ['Won', 'Lost', 'Zero Profit'],
    datasets: [
      {
        data: tradeData ? [tradeData.won, tradeData.lost, tradeData.zero_profit] : [0, 0, 0],
        backgroundColor: ['green', 'red', 'blue'],
        circumference: 180,
        rotation:270,
      },
    ],
  };

  const options = {
    cutout:25,
    responsive: true,
    aspectRatio: 6,
    maintainAspectRatio: true,
    plugins: {
        legend: false,
        textInside: true // Enable the custom plugin
      }

  };
  return (
    <div>
      {error && <div>Error: {error}</div>}
      {tradeData && (
        <Doughnut
          data={chartData}
          options={options}
          width={400}
          height={400}
        />
      )}
    </div>
  );
};

export default SemiDoughnutChart;