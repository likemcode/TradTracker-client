import React, { useState, useEffect } from 'react';
import { Table , Tag} from 'antd';

const History = () => {
  const [data, setData] = useState([]);

  // Simulate fetching data from the backend
  useEffect(() => {
    const fetchData = async () => {
      // Replace this with your actual API call
      const response = await fetch('http://127.0.0.1:8000/backend/trades/list');
      console.log(response)
      const result = await response.json();
      setData(result);
    };

    fetchData();
  }, []);

  // Define the columns for the table
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Date',
      dataIndex: 'dates',
      key: 'dates',
      render: (text) => new Date(text).toLocaleString(),
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
    },
    {
      title: 'Buy/Sell',
      dataIndex: 'buy_sell',
      key: 'buy_sell',
      render: (text) => (text === '1' ? 'Buy' : 'Sell'),
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
    },
    {
      title: 'Profit',
      dataIndex: 'profit',
      key: 'profit',
      render: (text) => (
        <Tag color={text >=  0 ? 'green' : 'red'}>
          {text >=  0 ? `+${text}` : text} $
        </Tag>
      )
    },
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={data}
      rowKey="id"
      pagination={{ pageSize: 30 }}
    />
  );
};

export default History;