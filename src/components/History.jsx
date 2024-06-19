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
  const handleDateFilter = (dates) => {
    // Filter trades based on selected date range
    const filteredTrades = trades.filter(
      (trade) =>
        new Date(trade.dates) >= dates[0].startOf('day') &&
        new Date(trade.dates) <= dates[1].endOf('day')
    );
    setFilteredData(filteredTrades);
  };

  if (!filteredData || filteredData.length === 0) {
   
    return (
      
        <CustomEmpty description={<Text>No trades data available</Text>} />
    );
  }

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
      <RangePicker onChange={handleDateFilter} style={{ marginBottom: '16px', marginTop: '16px' }} />
      <Table
        columns={columns}
        dataSource={filteredData} // Use filteredData instead of trades
        rowKey="id"
        size="middle" // or "small"
        pagination={{ pageSize: 30 }}
        format="YYYY-MM-DD"
      />
    </div>
  );
};

export default History;
