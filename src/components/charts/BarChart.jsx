import React from 'react';
import { Bar } from 'react-chartjs-2';

const data = [
{
    "dates": "2023-03-27T17:45:12Z",
    "profit": -8.75
},
{
    "dates": "2023-03-27T17:49:36Z",
    "profit": -12.32
},
{
    "dates": "2023-04-05T16:15:01Z",
    "profit": -4.9
},
{
    "dates": "2023-04-07T16:30:13Z",
    "profit": -7.7
},
{
    "dates": "2023-04-07T16:30:13Z",
    "profit": -38.5
},
{
    "dates": "2023-04-10T18:16:56Z",
    "profit": 211.05
},
{
    "dates": "2023-04-11T19:58:00Z",
    "profit": 24.8
},
{
    "dates": "2023-04-12T16:30:06Z",
    "profit": -4.5
},
{
    "dates": "2023-04-12T16:30:06Z",
    "profit": -29.75
},
{
    "dates": "2023-04-12T17:41:31Z",
    "profit": -83.3
},
{
    "dates": "2023-04-17T10:52:39Z",
    "profit": -147.22
},
{
    "dates": "2023-04-17T10:52:41Z",
    "profit": -147.23
},
{
    "dates": "2023-05-08T17:25:12Z",
    "profit": 533.34
},
{
    "dates": "2023-05-08T17:25:16Z",
    "profit": 511.11
},
{
    "dates": "2023-05-08T17:25:34Z",
    "profit": 487.63
},
{
    "dates": "2023-05-08T18:52:41Z",
    "profit": 1.48
},
{
    "dates": "2023-05-15T16:35:56Z",
    "profit": -172.0
},
{
    "dates": "2023-05-22T18:04:31Z",
    "profit": -16.1
},
{
    "dates": "2023-05-22T18:04:33Z",
    "profit": -16.24
},
{
    "dates": "2023-09-13T02:43:53Z",
    "profit": 132.23
},
{
    "dates": "2023-09-14T16:31:13Z",
    "profit": -33.21
},
{
    "dates": "2023-09-14T16:31:13Z",
    "profit": -1.49
},
{
    "dates": "2023-09-29T13:08:37Z",
    "profit": -178.66
},
{
    "dates": "2023-09-29T13:08:43Z",
    "profit": -7.32
},
{
    "dates": "2023-11-29T19:38:21Z",
    "profit": -53.22
},
{
    "dates": "2023-11-29T19:38:24Z",
    "profit": -53.66
},
{
    "dates": "2023-11-29T19:38:29Z",
    "profit": -52.88
},
{
    "dates": "2023-12-12T16:30:36Z",
    "profit": 1.8199999999999998
},
{
    "dates": "2023-12-12T16:30:40Z",
    "profit": 1.97
},
{
    "dates": "2023-12-12T16:30:44Z",
    "profit": -2.36
},
{
    "dates": "2023-12-12T16:30:48Z",
    "profit": -1.77
},
{
    "dates": "2024-01-15T22:58:53Z",
    "profit": -0.04
},
{
    "dates": "2024-01-26T22:49:53Z",
    "profit": -17.86
},
{
    "dates": "2024-01-26T22:49:56Z",
    "profit": -17.88
},
{
    "dates": "2024-01-26T22:50:01Z",
    "profit": -17.9
},
{
    "dates": "2024-01-26T22:50:06Z",
    "profit": -17.84
}

 // Your data here
];

const BarChart = () => {
 // Preprocess data
 const labels = data.map(item => new Date(item.dates).toLocaleDateString());
 const profits = data.map(item => item.profit);

 const chartData = {
    labels: labels,
    datasets: [
      {
        label: 'Profit',
        data: profits,
        backgroundColor: profits.map(profit => profit >= 0 ? 'green' : 'red'), // Color bars based on profit
        borderWidth: 1,
      },
    ],
 };

 const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
 };

 return (
    <div>
      <Bar data={chartData} options={options} width={400} height={300}/>
    </div>
 );
};

export default BarChart;