import React, {useState} from 'react'
import { Row,Col,Card,Statistic,Radio, Flex  } from 'antd'


const Dashboard = () => {
  
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
          <Statistic title="Balance" value={1000} prefix='$' />
        </Card>
        <Card>
          <Statistic title="Profit/Loss" value={25000} prefix="$" />
        </Card>
        <Card>
          <Statistic title="Win Rate" value={70} suffix="%" />
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

      </Row>
      <Row>
        
      </Row>
    </>
  )
}

export default Dashboard
