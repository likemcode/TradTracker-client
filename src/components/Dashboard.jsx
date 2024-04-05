import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Select, Flex, Spin, Space,Typography } from 'antd';

import { useGetKeyMetricsQuery } from '../services/BackendApi';

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import SemiDoughnutChart from './charts/SemiDoughnut';
import DoughnutChart from './charts/DoughnutChart';

const { Text } = Typography;

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('All');
  const { data: metrics, isLoading, error } = useGetKeyMetricsQuery();
 
  if (isLoading) return <Spin />;
  if (error) return <div>Error: {error.message}</div>;
 
  const handlePeriodChange = (value) => {
     setSelectedPeriod(value);
     // Here you can add logic to filter or display data based on the selected period
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
          <Space direction='horizontal'>
          {renderMetricCard("Balance", metrics.account_balance, '$')}
          {renderMetricCard("Profit/Loss", metrics.pnl, '$')}
          <Col className="metrics-card">
            <Card style={{ width: '100%'}}>
              <Flex justify="space-between">
              
              <div className="metric-info">
                <div className="metric-title">win_rate</div>
                <div className="metric-value">{`${metrics.win_rate.toFixed(2)}${'%'}`}</div>
              </div>
              
                <SemiDoughnutChart timeRange={selectedPeriod} />
              
              </Flex>
            </Card>            
          </Col>

          {renderMetricCard("Avg Ratio",  8, '', 'R')}
          {renderMetricCard("Progress",  80, '', '%')}
          </Space>
        </div>
      </Row>
      <Row gutter={16} style={{ marginLeft: '50px' }}>
        <Col flex={1} style={{ height: '100%',  width:'fit-content'}}>
        <Card style={{ height: '100%', width:'fit-content'}} >
          <LineChart  timeRange={selectedPeriod}/>
        </Card>
        </Col>
        <Col flex={1}>
          <Card style={{ height: '100%',  width:'fit-content'}}>
            <DoughnutChart timeRange={selectedPeriod}/>
          </Card>
        </Col>
      </Row>
      <Row gutter={16}>
        <Col span={24}>
          <Card>
            <BarChart timeRange={selectedPeriod}/>
          </Card>
        </Col>
        
      </Row>
    </div>
  );
};

export default Dashboard;

