import React, { useState } from 'react';
import { Row, Col, Card, Select, Dropdown, Tag, Table, Typography , Result, Button} from 'antd';
import Loader from './Loader';
import { WalletOutlined, DollarOutlined, ArrowDownOutlined, ArrowUpOutlined, BankOutlined, MoneyCollectOutlined } from '@ant-design/icons';
import { useGetTradesQuery, useGetKeyMetricsQuery } from '../services/BackendApi';
import moment from 'moment';
import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import CustomEmpty from './CustomEmpty';
import SemiDoughnutChart from './charts/SemiDoughnut';
import DoughnutChart from './charts/DoughnutChart';
import './Dashboard.css';

const { Text } = Typography;

const Dashboard = ({ selectedAccount }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');

  const { data: metrics, isLoading: metricsLoading, error: metricsError } = useGetKeyMetricsQuery(
    selectedAccount && selectedPeriod ? { timeRange: selectedPeriod, accountId: selectedAccount } : { timeRange: selectedPeriod, accountId: selectedAccount }
  );
  const { data: trades, isLoading: tradesLoading, error: tradesError } = useGetTradesQuery(selectedAccount);

  if (metricsLoading || tradesLoading) return <Loader />;

  if (metricsError || tradesError) {
    return (
      <Result
        status="500"
        title="500"
        subTitle={metricsError.error|| tradesError.error}
        extra={<Button type="primary">Back Home</Button>}
      />
    );
  }


  if (!metrics || metrics.length === 0) {
    return (
        <CustomEmpty />
    );
  }

  if (!trades || trades.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '50px' }}>
        <CustomEmpty description={<Text>No trades data available</Text>} />
      </div>
    );
  }

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

  
        <div className="metrics-row"  >
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
              <Flex align="middle">
              <div className={`metric-value ${metrics.pnl >= 0 ? 'positive-value' : 'negative-value'}`} style={{ marginRight: '25px' }}>
                {`${'$'}${metrics.pnl.toFixed(2)}`}
              </div>
              <Dropdown
                      overlay={
                        menu
                      }
                      placement="bottomLeft"
                      trigger={['click']}
                    >
                    <Tag color='blue' bordered={false} >
                      <MoneyCollectOutlined />
                    </Tag>
                  </Dropdown>
                  </Flex>
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
      <Row gutter={16} className='chart-row' style={{ marginLeft: '30px', marginRight:'30px' }}>
        
          <Col flex={3} className="chart-col"  style={{ height: '100%', width:'60%'  }}>
            <Card style={{ height: '100%', width:'100%'  }}> 
                <LineChart  timeRange={selectedPeriod} accountId={selectedAccount}/>
            </Card>
            
          </Col>
          
          <Col flex={2} className="chart-col" style={{ height: '100%', width:'40%' }}>
            <Card style={{ height: '100%',  width:'100%' }}>
              <DoughnutChart timeRange={selectedPeriod} accountId={selectedAccount}/>
            </Card>
          </Col>

      </Row>
      <Row gutter={16} style={{ marginLeft: '30px', marginRight:'30px',marginTop:'20px',marginBottom: '20px '}} >
        <Col span={24}>
          <Card style={{ height: '100%' }} >
            <BarChart timeRange={selectedPeriod} accountId={selectedAccount}/>
          </Card>
        </Col>
        
      </Row>
    </div>
  );
};

export default Dashboard;

