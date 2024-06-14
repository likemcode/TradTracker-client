import React, { useState, useEffect } from 'react';
import { Table, Tag, DatePicker, Typography, Button, Result } from 'antd';
import { useGetTradesQuery } from '../services/BackendApi';
import CustomEmpty from './CustomEmpty';
import Loader from './Loader';

const { RangePicker } = DatePicker;
const { Text } = Typography;

const History = ({ selectedAccount }) => {
  const { data: trades, isLoading, error } = useGetTradesQuery(selectedAccount);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    if (trades) {
      setFilteredData(trades);
    }
  }, [trades]);

  if (isLoading) return <Loader />;

  if (error) {
    
    return (
        <Result
          status="500"
          title="500"
          subTitle={error.error}
          extra={<Button type="primary">Back Home</Button>}
        />
      );
      
  }

  if (!filteredData || filteredData.length === 0) {
   
    return (
      
        <CustomEmpty description={<Text>No trades data available</Text>} />
    );
  }

  const columns = [
    {
      title: 'Trade ID',
      dataIndex: 'tradeId',
      key: 'tradeId',
    },
    {
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      render: symbol => <Tag color="blue">{symbol}</Tag>,
    },
    {
      title: 'Type',
      dataIndex: 'type',
      key: 'type',
      render: type => (type === 'buy' ? <Tag color="green">Buy</Tag> : <Tag color="red">Sell</Tag>),
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
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  return (
    <div>
      <RangePicker style={{ marginBottom: 16 }} />
      <Table columns={columns} dataSource={filteredData} rowKey="tradeId" />
    </div>
  );
};

export default History;
