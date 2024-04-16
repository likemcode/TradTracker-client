import React, { useEffect, useRef, useState } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useGetDoughnutDataQuery } from '../../services/BackendApi';
import Loader from '../Loader';
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
  if (isLoading) return <Loader />;

  // Handle error state
  if (error) return <div>Error: {error.message}</div>;

  const doughnutLabel={
    id: 'doughnutLabel',
    afterDatasetsDraw(chart,args,plugins){
      const {ctx,data} = chart;

      const centerX= chart.getDatasetMeta(0).data[0].x;
      const centerY= chart.getDatasetMeta(0).data[0].y;

      ctx.save();
      ctx.fillStyle='black';
      ctx.textAlign='center';
      ctx.textBaseline='middle';
      ctx.fillText(`${data.datasets[0].data[0]} symbols`, centerX, centerY);
    }
  }
  const options = {
    responsive:true,
    
    maintainAspectRatio:false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true, // Use circles instead of squares
          
          pointRadius: 2,
          
        },

        
      },
    },
    doughnutLabel:doughnutLabel
  };

  // Render chart when data is available
  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <div style={{ width: '100%', height: '300px' }}>
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
      />
      </div>
    </div>
  );
};


export default MyDoughnutChartComponent;
