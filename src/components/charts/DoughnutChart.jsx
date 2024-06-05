import React, { useEffect, useRef } from 'react';
import { Doughnut } from 'react-chartjs-2';
import { useGetDoughnutDataQuery } from '../../services/BackendApi';
import Loader from '../Loader';
import 'chart.js/auto';

const MyDoughnutChartComponent = ({ timeRange, accountId }) => {
  const chartRef = useRef(null);
  const { data, isLoading, error } = useGetDoughnutDataQuery({ timeRange, accountId });

  useEffect(() => {
    return () => {
      if (chartRef.current && chartRef.current.chartInstance) {
        chartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const totalSymbols = data.reduce((sum, item) => sum + item.frequency, 0);

  const doughnutLabel = {
    id: 'doughnutLabel',
    afterDatasetsDraw(chart, args, plugins) {
      const { ctx, data } = chart;
      const centerX = chart.getDatasetMeta(0).data[0].x;
      const centerY = chart.getDatasetMeta(0).data[0].y;
      ctx.save();
      ctx.fillStyle = 'black';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.font = 'bold 24px Arial';
      ctx.fillText(`Total`, centerX, centerY - 15);
      ctx.font = 'bold 32px Arial';
      ctx.fillText(`${totalSymbols}`, centerX, centerY + 15);
      ctx.restore();
    },
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          pointRadius: 4,
          padding: 20,
          font: {
            size: 8,
          },
        },
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const dataset = context.dataset;
            const value = dataset.data[context.dataIndex];
            const label = context.label;
            const percentage = ((value / totalSymbols) * 100).toFixed(1);
            return `${label}: ${value} (${percentage}%)`;
          },
        },
      },
    },
    onHover: (event, chartElement) => {
      event.native.target.style.cursor = chartElement[0] ? 'pointer' : 'default';
    },
    doughnutLabel: doughnutLabel,
  };

  const handleSegmentClick = (event, elements) => {
    if (elements.length > 0) {
      const index = elements[0].index;
      const chartInstance = chartRef.current.chartInstance;
      chartInstance.detachSegment(index);
    }
  };

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <div style={{ width: '100%', height: '300px' }}>
      <Doughnut
        ref={chartRef}
        data={{
          labels: data.map((item) => item.symbol),
          datasets: [
            {
              data: data.map((item) => item.frequency),
              backgroundColor: [
                'rgba(75, 192, 192, 0.6)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(54, 162, 235, 0.6)',
                'rgba(255, 206, 86, 0.6)',
                'rgba(153, 102, 255, 0.6)',
                'rgba(255, 159, 64, 0.6)',
              ],
              borderColor: [
                'rgba(75, 192, 192, 1)',
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
              cutout: '70%',
              hoverOffset: 15,
            },
          ],
        }}
        options={options}
        onClick={handleSegmentClick}

      />
      </div>
    </div>
  );
};

export default MyDoughnutChartComponent;