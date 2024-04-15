import React, { useState } from 'react';
import { Row, Col, Card, Select, Flex, Spin,Dropdown , Tag, Table} from 'antd';
import {WalletOutlined, DollarOutlined, ArrowDownOutlined, ArrowUpOutlined, BankOutlined } from '@ant-design/icons';
import { useGetTradesQuery } from '../services/BackendApi';
import { useGetKeyMetricsQuery } from '../services/BackendApi';
import moment from 'moment';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import SemiDoughnutChart from './charts/SemiDoughnut';
import DoughnutChart from './charts/DoughnutChart';
import './Dashboard.css';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const { data: metrics, isLoading, error } = useGetKeyMetricsQuery();
  const { data: trades, Loading, errorr } = useGetTradesQuery();
 
  if (isLoading) return <Spin />;
  if (error) return <div>Error: {error.message}</div>;
  

  const columns = [
    {
      title: 'Date',
      dataIndex: 'dates',
      key: 'dates',
      render: (text) => moment(text).format('MMMM Do YYYY, h:mm:ss a'),
    },
    {
      title: 'Transaction',
      dataIndex: 'buy_sell',
      key: 'buy_sell',
      render: (text, record) => {
        if (text === '0' || text === '1') {
          return null; // Exclude rendering if text is '0' or '1'
        }
      
        if (record.profit >= 0) {
          return <Tag color="green">Deposit</Tag>;
        } else {
          return <Tag color="red">Withdrawal</Tag>;
  
        }
      },
    },
    {
      title: 'Amount',
      dataIndex: 'profit',
      key: 'profit',
      render: (text) => (
        <Tag color={text >=  0 ? 'green' : 'red'}>
          {text >=  0 ? `+${text}` : text} $
        </Tag>
      )

    },
  ];

  const filteredTrades= trades.filter(record => record.buy_sell !== '0' && record.buy_sell !== '1');

  const menu = (
    <Table
      dataSource={filteredTrades || []}
      columns={columns}
      pagination={false}
      loading={isLoading}
      locale={{
        emptyText: isLoading ? 'Loading...' : error ? `Error: ${error.message}` : 'No data',
      }}
    />
  );
 
  const handlePeriodChange = (value) => {
     setSelectedPeriod(value);
  };

  
 
  const renderMetricCard = (title, value, prefix = '', suffix = '') => (
    <Col className="metrics-card">
      <Card>
        <div className="metric-info">
          <div className="metric-title">{title}</div>
          <div className="metric-value">{`${prefix}${value.toFixed(2)}${suffix}`}</div>
          
        </div>
      </Card>
    </Col>
  );
 
  return (
     <div >
       <Row>
         <Col span={24}>
           <Select
             defaultValue="All"
             style={{ width: 120 }}
             popupMatchSelectWidth={false}
             onChange={handlePeriodChange}
             options={[
               { value: 'All', label: 'All' },
               { value: 'year', label: 'Year' },
               { value: 'week', label: 'Week' },
               { value: 'month', label: 'Month' },
               { value: 'day', label: 'Day' },
             ]}
           />
         </Col>
       </Row>

      <Row gutter={16} style={{ marginBottom: '16px' }}>

  
        <div className="metrics-row">
            <Col className="metrics-card">
            <Card>
              <div className="metric-info">
                <div className="metric-title">Balance</div>
                <Flex align="middle">
                  <div className="metric-value" style={{ marginRight: '25px' }}>{`$${metrics.account_balance.toFixed(2)}`}</div>
                  <Dropdown
                      overlay={
                        menu
                      }
                      placement="bottomLeft"
                      trigger={['click']}
                    >
                    <Tag color='blue' bordered={false} >
                      <BankOutlined />
                    </Tag>
                  </Dropdown>
                </Flex>
              </div>
            </Card>
          </Col>
          <Col className="metrics-card">
          <Card>
            <div className="metric-info">
              <div className="metric-title">Profit/Loss</div>
              <div className={`metric-value ${metrics.pnl >= 0 ? 'positive-value' : 'negative-value'}`}>
                {`${'$'}${metrics.pnl.toFixed(2)}`}
              </div>
            </div>
          </Card>
        </Col>
          <Col className="metrics-card">
            <Card style={{ width: '100%'}}>
              <Flex justify="space-between">
              
              <div className="metric-info">
                <div className='head'>
                  <div className="metric-title">Win%</div>
                    <div className="tag-container">
                      <Tag style={{fontSize:'10px', fontWeight:'bold', paddingLeft:'6px', paddingRight:'5px' }} color="green" bordered = {false} >{metrics.winning_trades}</Tag>
                      <Tag  style={{fontSize:'10px' , fontWeight:'bold', paddingLeft:'6px', paddingRight:'5px'}} color="red" bordered = {false} >{metrics.losing_trades}</Tag>
                    </div> 
                </div>
                
                <div className="metric-value">{`${metrics.win_rate.toFixed(2)}${'%'}`}</div>
                
              </div>
              
                {/* <SemiDoughnutChart timeRange={selectedPeriod} /> */}
              
              </Flex>
            </Card>            
          </Col>
          
          <Col className="metrics-card">
            <Card>
              <div className="metric-info">
                <div className="metric-title">Progress</div>
                
                  <div className="metric-value">
                  <Flex>
                    <div className='progress-icon'> 
                      {metrics.progress > 0 ? <ArrowUpOutlined style={{ color: 'green', fontSize: '20px' }} /> : <ArrowDownOutlined style={{ color: 'red', fontSize: '20px' }} />}
                    </div>
                    <div style={{ color: metrics.progress > 0 ? 'green' : 'red' }}>
                      {`${metrics.progress.toFixed(2)}${'%'}`}
                    </div>
                  </Flex>                      
                </div>
         
              </div>
            </Card>
          </Col>

          <Col className="metrics-card" >
            <Card>
              <div className="metric-info">
                <div className="metric-title" >Avg win/loss trade</div>
                <div className="metric-value" style={{ display: 'flex', justifyContent: 'space-between', marginTop:'10px' }}>
                  <Tag style={{ fontSize: '12px', color: '#41c641' }}>
                    <DollarOutlined style={{ marginRight: 5 }}/>
                    {metrics.avg_win_trade.toFixed(2)}
                  </Tag>
                  <Tag style={{ fontSize: '12px', color: 'red' }}>
                    <DollarOutlined style={{ marginRight: 5 }}/>
                    {metrics.avg_loss_trade.toFixed(2)}
                  </Tag>
                </div>
              </div>
            </Card>
          </Col>
          
          
         
        </div>
      </Row>
      <Row gutter={16} style={{ marginLeft: '50px', marginRight:'50px' }}>
        
        <Col flex={1}>
          <Card style={{ height: '100%'   }}>
              <BarChart timeRange={selectedPeriod}/>
            </Card>
        
        </Col>
        <Col flex={1}>
          <Card style={{ height: '100%'}}>
            <DoughnutChart timeRange={selectedPeriod}/>
          </Card>
        </Col>
        
        
      </Row>
      <Row gutter={16} style={{ marginLeft: '50px', marginRight:'50px'  }}>
        <Col span={24}>
          <Card style={{ height: '100%' }} >
          <LineChart  timeRange={selectedPeriod}/>
        </Card>
        </Col>
        
      </Row>
    </div>
  );
};

export default Dashboard;

