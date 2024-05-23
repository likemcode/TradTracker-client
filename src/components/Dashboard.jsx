import React, { useState , useEffect} from 'react';
import { Row, Col, Card, Select, Flex, Spin,Dropdown , Tag, Table, Empty } from 'antd';
import Loader from './Loader';
import {WalletOutlined, DollarOutlined, ArrowDownOutlined, ArrowUpOutlined, BankOutlined } from '@ant-design/icons';
import { useGetTradesQuery , useGetKeyMetricsQuery, useGetAccountListQuery} from '../services/BackendApi';

import moment from 'moment';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import SemiDoughnutChart from './charts/SemiDoughnut';
import DoughnutChart from './charts/DoughnutChart';
import './Dashboard.css';
const skipToken = typeof Symbol === 'function' ? Symbol.for('skip') : '__skip';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const [selectedAccount, setSelectedAccount] = useState(null);
  const { data: accounts, isLoading: accountsLoading, error: accountsError } = useGetAccountListQuery(); // Fetch the accounts
  console.log(selectedAccount)
  useEffect(() => {
    if (accounts && accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0].id); // Set the first account as the default selected account
    }
  }, [accounts, selectedAccount]);
  console.log(selectedAccount)
  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useGetKeyMetricsQuery(
    selectedAccount && selectedPeriod ? { timeRange: selectedPeriod, accountId: selectedAccount } :{ timeRange: selectedPeriod, accountId: selectedAccount }
  );
  const { data: trades, isLoading: tradesLoading, error: tradesError } = useGetTradesQuery(selectedAccount); // Use selectedAccount

  if (accountsLoading || (selectedAccount && (metricsLoading || tradesLoading))) return <Loader />;
  if (!metrics || !trades || accounts.length === 0) return <Empty />;
  if (accountsError) return <div>Error: {accountsError.message}</div>;
  if (metricsError) return <div>Error: {metricsError.message}</div>;
  if (tradesError) return <div>Error: {tradesError.message}</div>;
  

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
      loading={tradesLoading}
      locale={{
        emptyText: tradesLoading ? 'Loading...' : tradesError ? `Error: ${tradesError.message}` : 'No data',
      }}
    />
  );
 
  const handlePeriodChange = (value) => {
     setSelectedPeriod(value);

  };

  const handleAccountChange = (value) => {
    setSelectedAccount(value);
    console.log(selectedAccount)
  };

  
 
  // const renderMetricCard = (title, value, prefix = '', suffix = '') => (
  //   <Col className="metrics-card">
  //     <Card>
  //       <div className="metric-info">
  //         <div className="metric-title">{title}</div>
  //         <div className="metric-value">{`${prefix}${value.toFixed(2)}${suffix}`}</div>
          
  //       </div>
  //     </Card>
  //   </Col>
  // );
 
  return (
     <div >
       <Row style={{marginLeft:'15px', marginTop:'10px'}}>
         <Col span={24}>
         <Select
            value={selectedAccount}
            style={{ width: 200 }}
            onChange={handleAccountChange}
            options={accounts.map(account => ({ value: account.id, label: `${account.broker_name} (${account.login})` }))}
          />
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
                <div className="metric-title" >Avg win/loss</div>
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
        
          <Col flex={3}  style={{ height: '100%', width:'60%'  }}>
            <Card style={{ height: '100%', width:'100%'  }}> 
                <LineChart  timeRange={selectedPeriod} account_id={selectedAccount}/>
            </Card>
            
          
          </Col>
          <Col flex={2} style={{ height: '100%', width:'40%' }}>
            <Card style={{ height: '100%',  width:'100%' }}>
              <DoughnutChart timeRange={selectedPeriod} account_id={selectedAccount}/>
            </Card>
          </Col>
        
        
        
      </Row>
      <Row gutter={16} style={{ marginLeft: '50px', marginRight:'50px',marginTop:'20px',marginBottom: '20px '}}>
        <Col span={24}>
          <Card style={{ height: '100%' }} >
            <BarChart timeRange={selectedPeriod} account_id={selectedAccount}/>
          </Card>
        </Col>
        
      </Row>
    </div>
  );
};

export default Dashboard;

