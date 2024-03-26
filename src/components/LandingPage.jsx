import React from 'react';
import { Layout, Row, Col, Button, Typography, Image, Card } from 'antd';
import { Link } from 'react-router-dom'; 
import { RocketOutlined, DollarCircleOutlined, SafetyOutlined, MenuOutlined } from '@ant-design/icons';


import logo from '../logoLarge.png';
import another from '../logoSmall.png'
import './LandingPage.css';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  
 return (
    <Layout>
      <Header className="header">
        <div className="logo">
        <Image src={another} alt="TradeTracker Logo" preview={false} style={{ width: '20%', height: 'auto' }} /> {/* Replace with your image path */}
            
        </div>
        <div className="nav-links">
          <Link to="/about">About</Link>
          <Button type="link" className="nav-button" >Login</Button>
          <Button type="primary" className="nav-button">Sign Up</Button>
        </div>
      </Header>
      <Content className="content" style={{ padding: '50px', backgroundColor: '#fff' }}>
      <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12}>
            <div className="hero-text" style={{ textAlign: 'center' }}>
              <Title level={2} className='gradient-title' style={{ color: '#333', fontWeight: 'bold', fontSize: '36px' }}>Track Your Trading Performance with Ease.</Title>
              <Paragraph style={{ color: '#666' }}>
                TradeTracker is a powerful tool that helps you monitor and analyze your trading activity. Gain insights into your strengths and weaknesses, optimize your strategies, and achieve your trading goals.
              </Paragraph>
              <Button type="primary" size="large" style={{ marginTop: '24px' }}>
                <Link to="/signup">Get Started</Link>
              </Button>
            </div>
          </Col> 
        </Row>
        <Row gutter={[24, 24]} className="features" style={{ marginTop: '50px' }}>
          <Col xs={24} md={8}>
            {/* Feature 1 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <RocketOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Boost Your Performance</h3>
              <Paragraph style={{ color: '#666' }}>Identify patterns, optimize strategies, and improve your trading results.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 2 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <DollarCircleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Gain Valuable Insights</h3>
              <Paragraph style={{ color: '#666' }}>Track key metrics, visualize your progress, and make data-driven decisions.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 3 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <SafetyOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Manage Risk Effectively</h3>
              <Paragraph style={{ color: '#666' }}>Monitor risk metrics, set stop-loss limits, and trade with confidence.</Paragraph>
            </Card>
          </Col>

        </Row>
      </Content>
      <div className="demo-video">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/your-video-id" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
        <Footer className="footer">
        <div className="footer-content">
          <p>© 2023 TradeTracker. All rights reserved.</p>
        </div>
      </Footer>
    </Layout>
 );
};

export default LandingPage;
