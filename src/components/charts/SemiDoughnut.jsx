import React, { useEffect, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useGetSemiDoughnutDataQuery } from '../../services/BackendApi'; // Adjust the import path as necessary
import Loader from '../Loader';
const SemiDoughnutChart = ({timeRange}) => {
  const { data: tradeData, isLoading, error } = useGetSemiDoughnutDataQuery(timeRange);

    if (isLoading) return <Loader/>;
    if (error) return <div>Error: {error.message}</div>;

  const chartData = {
    labels: ['Won', 'Lost', 'Zero Profit'],
    datasets: [
      {
        data: tradeData ? [tradeData.won, tradeData.lost, tradeData.zero_profit] : [0, 0, 0],
        backgroundColor: ['green', 'red', 'blue'],
        cutout:'84%',
        circumference: 180,
        rotation:270,
      },
    ],
  };

  const options = {
    responsive: true,
    aspectRatio: 10,
    maintainAspectRatio: false,
    plugins: {
        legend: false,
        textInside: true // Enable the custom plugin
      },
    backgroundColor: 'transparent',

  };
  return (
    <div>
      {error && <div>Error: {error}</div>}
      {tradeData && (
        <Doughnut
          data={chartData}
          options={options}
          width={300}
          height={400}
        />
      )}
    </div>
  );
};

export default SemiDoughnutChart;