import React, {useState} from 'react'
import { Row,Col,Card,Statistic,Radio, Flex, Spin  } from 'antd'

import { useGetKeyMetricsQuery } from '../services/BackendApi';

import LineChart from './charts/LineChart'; 
import BarChart from './charts/BarChart'; 
import PieChart from './charts/PieChart'; 
const Dashboard = () => {
  const { data: metrics, isLoading, error } = useGetKeyMetricsQuery();

  if (isLoading) return (<Spin/>)
  if (error) return <div>Error: {error.message}</div>;
  
  const [selectedPeriod, setSelectedPeriod] =useState('daily');
  const handlePeriodChange = (e) => {
    setSelectedPeriod(e.target.value);
  };
  return (
    <>
    <Row>
      <Col span={24}>
      <Flex  justify="start" align="center" gap='middle'>
            <Radio.Group
              value={selectedPeriod}
              onChange={handlePeriodChange}
              style={{ gap: '10px' }}
            >
              <Radio.Button value="daily"  style={{ margin: '5px',borderRadius: '10px' }}>Daily</Radio.Button>
              <Radio.Button value="weekly"style={{ margin: '5px',borderRadius: '10px' }}>Weekly</Radio.Button>
              <Radio.Button value="monthly" style={{ margin: '5px',borderRadius: '10px' }}>Monthly</Radio.Button>
              <Radio.Button value="yearly" style={{ margin: '5px' ,borderRadius: '10px'}}>Yearly</Radio.Button>
            </Radio.Group>
          </Flex>
      </Col>
      
    </Row>
      <Row>
      <div className='metrics-row'>
        <Card>
          <Statistic title="Balance" value={metrics.account_balance} prefix='$' />
        </Card>
        <Card>
          <Statistic title="Profit/Loss" value={metrics.pnl} prefix="$" />
        </Card>
        <Card>
          <Statistic title="Win Rate" value={metrics.win_rate} suffix="%" />
        </Card>
        <Card>
          <Statistic title="Avg Ratio" value={8} suffix="R" />
        </Card>
        <Card>
          <Statistic title="Progress" value={80} suffix="%" />
        </Card>
        </div>
      </Row>
      <Row>
        <Col>
          <BarChart/>
        </Col>
        <Col>
          <PieChart/>
        </Col>
      </Row>
      <Row>
        <LineChart/>
      </Row>
    </>
  )
}

export default Dashboard
