import React from 'react';
import { Layout, Row, Col, Button, Typography, Image } from 'antd';
import { Link } from 'react-router-dom'; // For navigation links

const { Header, Content } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  return (
    <Layout>
      <Header className="header">
        <div className="logo">TradeTracker</div>
        <Link to="/about">About</Link> </Header>
      <Content className="content">
        <Row>
          <Col xs={24} md={12}>
            <div className="hero-image">
              <Image src="path/to/your/image.png" alt="TradeTracker Logo" preview={false} />  {/* Replace with your image path */}
            </div>
          </Col>
          <Col xs={24} md={12}>
            <div className="hero-text">
              <Title>Track Your Trading Performance with Ease.</Title>
              <Paragraph>
                TradeTracker is a powerful tool that helps you monitor and analyze your trading activity. Gain insights into your strengths and weaknesses, optimize your strategies, and achieve your trading goals.
              </Paragraph>
              <Button type="primary" size="large">
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </Col>
        </Row>
        <Row className="features">
          <Col xs={24} md={8}>
            {/* Feature 1 */}
            <div className="feature-card">
              <Icon type="rocketflightOutlined" style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3>Boost Your Performance</h3>
              <Paragraph>Identify patterns, optimize strategies, and improve your trading results.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 2 */}
            <div className="feature-card">
              <Icon type="dollarcircleOutlined" style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3>Gain Valuable Insights</h3>
              <Paragraph>Track key metrics, visualize your progress, and make data-driven decisions.</Paragraph>
            </div>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 3 */}
            <div className="feature-card">
              <Icon type="safetyOutlined" style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3>Manage Risk Effectively</h3>
              <Paragraph>Monitor risk metrics, set stop-loss limits, and trade with confidence.</Paragraph>
            </div>
          </Col>
        </Row>
      </Content>
    </Layout>
  );
};

export default LandingPage;
