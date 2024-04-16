import React, { useState, useEffect } from 'react';
import { Table, Tag, DatePicker, Typography } from 'antd'; // Import DatePicker component
import { useGetTradesQuery } from '../services/BackendApi';
import Loader from './Loader';

const { RangePicker } = DatePicker;
const {Text}=Typography;

const History = () => {
  const { data: trades, isLoading, error } = useGetTradesQuery();
  const [filteredData, setFilteredData] = useState(trades); // State to hold filtered data

  useEffect(() => {
    setFilteredData(trades); // Initialize filtered data with trades
  }, [trades]); // Update filtered data when trades change

  if (isLoading) return <Loader />;
  if (error) return <div>Error: {error.message}</div>;

  const handleDateFilter = (dates) => {
    // Filter trades based on selected date range
    const filteredTrades = trades.filter(
      (trade) =>
        new Date(trade.dates) >= dates[0].startOf('day') &&
        new Date(trade.dates) <= dates[1].endOf('day')
    );
    setFilteredData(filteredTrades);
  };

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
      // render : (text) => {
      //   return <Text strong >{text}</Text>
      // }
    },
    {
      title: 'Buy/Sell',
      dataIndex: 'buy_sell',
      key: 'buy_sell',
      render: (text, record) => {
        if (record.profit >= 0 && text !== '0' && text !== '1') {
          // Display "Deposit" in green
          return <Tag color="green">Deposit</Tag>;
        } else if (record.profit < 0 && text !== '0' && text !== '1') {
          return <Tag color="red">Withdrawal</Tag>;  
        } else {
          return <Tag color={text === '1' ? 'blue' : 'red'}>
          {text === '1' ? 'Buy' : 'Sell'}
        </Tag>;
        }
      },
    },
    {
      title: 'Volume',
      dataIndex: 'volume',
      key: 'volume',
      render:(text)=>{
        if (text==0){
          return '_'
        }
        else{
          return text
        }
      }
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
    
  ];

  return (
    <div style={{marginLeft:'20px', marginRight:'20px'}}>
      {/* Add the RangePicker component for date filtering */}
      <RangePicker onChange={handleDateFilter} style={{ marginBottom: '16px' }} />
      <Table
        columns={columns}
        dataSource={filteredData} // Use filteredData instead of trades
        rowKey="id"
        pagination={{ pageSize: 30 }}
        format="YYYY-MM-DD"
      />
    </div>
  );
};

export default History;
