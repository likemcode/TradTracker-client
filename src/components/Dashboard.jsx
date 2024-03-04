import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Radio, Flex, Spin } from 'antd';

import { useGetKeyMetricsQuery } from '../services/BackendApi';

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
import SemiDoughnutChart from './charts/SemiDoughnut';
import DoughnutChart from './charts/DoughnutChart';

const Dashboard = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('daily');
  const { data: metrics, isLoading, error } = useGetKeyMetricsQuery();

  if (isLoading) return <Spin />;
  if (error) return <div>Error: {error.message}</div>;

  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };

  const renderMetricCard = (title, value, prefix = '', suffix = '') => (
    <Col flex={1}>
      <Card style={{ height: '100%', width:'100%' }}>
        <Statistic title={title} value={value.toFixed(2)} prefix={prefix} suffix={suffix}  />
      </Card>
    </Col>
  );

  return (
    <>
      <Row>
        <Col span={24}>
          <Flex justify="start" align="center" gap="middle">
            <Radio.Group value={selectedPeriod} onChange={handlePeriodChange} style={{ gap: '10px' }}>
              {['Daily', 'Weekly', 'Monthly', 'Yearly'].map((period) => (
                <Radio.Button key={period.toLowerCase()} value={period.toLowerCase()} style={{ margin: '5px', borderRadius: '10px' }}>
                  {period}
                </Radio.Button>
              ))}
            </Radio.Group>
          </Flex>
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
                <SemiDoughnutChart />
              </Col>
              </Flex>
            </Card>
            
          </Col>

          {renderMetricCard("Avg Ratio",  8, '', 'R')}
          {renderMetricCard("Progress",  80, '', '%')}
        </div>
      </Row>
      <Row gutter={16} style={{ marginLeft: '50px' }}>
        <Col flex={8}>
        <Card style={{ height: '100%' }}>
          <LineChart />
        </Card>
        </Col>
        <Col flex={2}>
          <Card style={{ height: '100%' }}>
            <DoughnutChart />
          </Card>
        </Col>
      </Row>
      <Row>
        <Card>
        <BarChart />
        </Card>
        
      </Row>
    </>
  );
};

export default Dashboard;

