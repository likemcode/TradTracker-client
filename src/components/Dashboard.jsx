import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Select, Flex, Spin } from 'antd';

import { useGetKeyMetricsQuery } from '../services/BackendApi';

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import SemiDoughnutChart from './charts/SemiDoughnut';
import DoughnutChart from './charts/DoughnutChart';

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
     <Col flex={1}>
       <Card style={{ height: '100%', width:'100%' }}>
         <Statistic title={title} value={value.toFixed(2)} prefix={prefix} suffix={suffix} />
       </Card>
     </Col>
  );
 
  return (
     <>
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
          {renderMetricCard("Balance", metrics.account_balance, '$')}
          {renderMetricCard("Profit/Loss", metrics.pnl, '$')}
          <Col flex={1}>
            <Card style={{ height: '100%', width: '100%' }}>
              <Flex justify="space-between">
              <Col><Statistic title='Win Rate' value={metrics.win_rate.toFixed(2)} prefix='' suffix='%' /></Col>
              <Col flex={1} style={{ maxWidth: '300px' }}>
                <SemiDoughnutChart timeRange={selectedPeriod} />
              </Col>
              </Flex>
            </Card>
            
          </Col>

          {renderMetricCard("Avg Ratio",  8, '', 'R')}
          {renderMetricCard("Progress",  80, '', '%')}
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
      <Row>
        <Card>
        <BarChart timeRange={selectedPeriod}/>
        </Card>
        
      </Row>
    </>
  );
};

export default Dashboard;

