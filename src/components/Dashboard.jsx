import React, { useState } from 'react';
import { Row, Col, Card, Statistic, Radio, Flex, Spin } from 'antd';

import { useGetKeyMetricsQuery } from '../services/BackendApi';

import LineChart from './charts/LineChart';
import BarChart from './charts/BarChart';
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
    <Col>
      <Card>
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
      <Row gutter={16}>
        <div className="metrics-row">
          {renderMetricCard("Balance", metrics.account_balance, '$')}
          {renderMetricCard("Profit/Loss", metrics.pnl, '$')}
          {renderMetricCard("Win Rate", metrics.win_rate, '', '%')}
          {renderMetricCard("Avg Ratio",  8, '', 'R')}
          {renderMetricCard("Progress",  80, '', '%')}
        </div>
      </Row>
      <Row>
        <Col>
          <BarChart />
        </Col>
        <Col>
        <Card>
          <DoughnutChart />
          </Card>
        </Col>
      </Row>
      <Row>
        <LineChart />
      </Row>
    </>
  );
};

export default Dashboard;

