import React, { useState } from 'react';
import { Layout, Row, Col, Button, Typography, Card, Avatar } from 'antd';
import { Link } from 'react-router-dom';
import { RocketOutlined, DollarCircleOutlined, SafetyOutlined, MenuOutlined, SlidersTwoTone, ImportOutlined, TeamOutlined, LineChartOutlined, RobotOutlined, BookOutlined } from '@ant-design/icons';
import './LandingPage.css';
import Logo from './Logo';

const { Header, Content, Footer } = Layout;
const { Title, Paragraph } = Typography;

const LandingPage = () => {
  const [showNavbar, setShowNavbar] = useState(false);

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  }

  return (
    <Layout>
      <Header className="header">
        <div className='logo-container' style={{ display: 'flex', alignItems: 'center' }}>
          <Avatar className='avatar-expanded' icon={<SlidersTwoTone />} />
          <h3 style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }} className='logo-title'>TradeTracker</h3>
        </div>
        <div className={`nav-links ${showNavbar ? 'active' : ''}`}>
          <Button type="link">
            <Link to="/Login">Login</Link>
          </Button>
          <Button type="primary">
            <Link to="/signup" style={{ color: 'white' }}>SignUp</Link>
          </Button>
        </div>
        <div className='nav-button'>
          <Button onClick={handleShowNavbar}>
            <MenuOutlined />
          </Button>
        </div>
      </Header>
      <Content className="content" style={{ padding: '50px', backgroundColor: '#fff' }}>
        <Row gutter={[24, 24]} justify="center">
          <Col xs={24} md={12}>
            <div className="hero-text" style={{ textAlign: 'center' }}>
              <Title level={2} className='gradient-title' style={{ color: '#333', fontWeight: 'bold', fontSize: '41px' }}>Unlock Your Trading Potential with TradeTracker.</Title>
              <Paragraph style={{ color: '#666' }}>
                TradeTracker is an all-in-one trading platform that empowers you to monitor, analyze, and optimize your trading performance. Gain valuable insights, journal your trades, and leverage AI-powered recommendations to achieve your trading goals.
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
              <BookOutlined style={{ fontSize: '48px', marginBottom: '16px', color: 'green' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Journal Your Trades</h3>
              <Paragraph style={{ color: '#666' }}>Maintain a detailed log of your trades, including entry and exit points, trading rationale, and market conditions.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 2 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <ImportOutlined style={{ fontSize: '48px', marginBottom: '16px', color: 'purple' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Import Trades from MT5</h3>
              <Paragraph style={{ color: '#666' }}>Easily import your trades directly from MetaTrader 5 for seamless tracking and analysis.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 3 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <TeamOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Multiple Account Support</h3>
              <Paragraph style={{ color: '#666' }}>Manage and track trades across multiple accounts, brokers, and asset classes with ease.</Paragraph>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="additional-features" style={{ marginTop: '50px' }}>
          <Col xs={24} md={8}>
            {/* Feature 4 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <RocketOutlined style={{ fontSize: '48px', marginBottom: '16px', color: 'blue' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Boost Your Performance</h3>
              <Paragraph style={{ color: '#666' }}>Identify patterns, optimize strategies, and improve your trading results with powerful analytics.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 5 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <DollarCircleOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Gain Valuable Insights</h3>
              <Paragraph style={{ color: '#666' }}>Track key metrics, visualize your progress, and make data-driven decisions for better trading outcomes.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={8}>
            {/* Feature 6 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <SafetyOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Manage Risk Effectively</h3>
              <Paragraph style={{ color: '#666' }}>Monitor risk metrics, set stop-loss limits, and trade with confidence using advanced risk management tools.</Paragraph>
            </Card>
          </Col>
        </Row>
        <Row gutter={[24, 24]} className="upcoming-features" style={{ marginTop: '50px' }}>
          <Col xs={24} md={12}>
            {/* Upcoming Feature 1 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <RobotOutlined style={{ fontSize: '48px', marginBottom: '16px', color: 'orange' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>AI-Powered Trading Assistant</h3>
              <Paragraph style={{ color: '#666' }}>Get personalized trading insights, recommendations, and alerts powered by advanced AI algorithms.</Paragraph>
            </Card>
          </Col>
          <Col xs={24} md={12}>
            {/* Upcoming Feature 2 */}
            <Card hoverable style={{ width: '100%', textAlign: 'center' }}>
              <LineChartOutlined style={{ fontSize: '48px', marginBottom: '16px' }} />
              <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>Advanced Trade Tracking</h3>
              <Paragraph style={{ color: '#666' }}>Keep a detailed record of all your trades, monitor their performance, and identify areas for improvement.</Paragraph>
            </Card>
          </Col>
        </Row>
        <Row style={{ marginTop: '50px' }}>
         <div className="demo-video" style={{ textAlign: 'center', width: '100%' }}>
           <iframe
             width="560"
             height="315"
             src="https://www.youtube.com/embed/your-video-id"
             title="YouTube video player"
             frameBorder="0"
             allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
             allowFullScreen
           ></iframe>
         </div>
       </Row>
       <Row gutter={[24, 24]} justify="center" style={{ marginTop: '50px' }}>
         <Col xs={24} md={12}>
           <div className="testimonial-card" style={{ textAlign: 'center' }}>
             <Avatar size={64} src="https://example.com/avatar.jpg" />
             <Title level={4} style={{ marginTop: '16px' }}>
               "TradeTracker has been a game-changer for my trading journey."
             </Title>
             <Paragraph style={{ color: '#666' }}>
               "With TradeTracker, I can easily track my trades, analyze my performance, and gain valuable insights. The AI assistant is a real game-changer, providing personalized recommendations and helping me stay on top of my game."
             </Paragraph>
             <Title level={5}>- John Doe, Professional Trader</Title>
           </div>
         </Col>
       </Row>
     </Content>
     <Footer className="footer">
       <div className="footer-content">
         <p>© 2023 TradeTracker. All rights reserved.</p>
       </div>
     </Footer>
   </Layout>
 );
};

export default LandingPage;