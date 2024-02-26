import React, { useState, useEffect } from 'react';
import { Table , Tag, Spin} from 'antd';
import { useGetTradesQuery } from '../services/BackendApi';


const History = () => {
  const { data: trades, isLoading, error } = useGetTradesQuery();

  if (isLoading) return (<Spin/>)
  if (error) return <div>Error: {error.message}</div>;

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
      dataSource={trades}
      rowKey="id"
      pagination={{ pageSize: 30 }}
    />
  );
};

export default History;