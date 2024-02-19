import React from 'react'
import { Row,Col,Card,Statistic } from 'antd'

const Dashboard = () => {
  return (
    <>
      <Row>
      <div className='metrics-row'>
        <Card>
          <Statistic title="Active Users" value={1000} />
        </Card>
        <Card>
          <Statistic title="Revenue" value={25000} prefix="$" />
        </Card>
        <Card>
          <Statistic title="Conversion Rate" value={70} suffix="%" />
        </Card>
        <Card>
          <Statistic title="Progress" value={80} suffix="%" />
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
