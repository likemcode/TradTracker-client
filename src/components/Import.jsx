// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { FileTextOutlined } from '@ant-design/icons';
import { Modal, Button, Card, message, Flex, Typography,Row, Col} from 'antd';
import MetaTrader5Icon from '../assets/mt5 svg.svg' ;

const { Title, Paragraph } = Typography;

const ImportComponent = ({ visible, onClose  }) => {
  const [formModalVisible, setformModalVisible] = useState(false);

  const handleOpenformModal = () => {
    setformModalVisible(true);
  };
  const handleCloseformModal = () => {
    setformModalVisible(false);
  };

  const handleImportSampleTrades = async () => {
    // Handle import sample trades logic here
    const token = localStorage.getItem('token');
      try {
          const response = await fetch('https://tradtracker-backend-production.up.railway.app/backend/trades/import-sample-trades/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Token ${token}`
              }

          });
  
          if (!response.ok) {
              throw new Error('Network response was not ok');
          }
  
          const data = await response.json();
          onClose()
          if (data.message){
            message.success(data.message)
        }
          
          if (data.sorry){
              message.error(data.sorry)
          }
      } catch (error) {
        message.error('An error occurred while importing sample trades. Please try again.', error);
      }

  };

  return (
    <Modal open={visible} onCancel={onClose} footer={null} centered>
      <Row gutter={[16, 16]}>
        <Col xs={24} sm={12}>
          <Card title="Custom Trades" hoverable>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
              <img src={MetaTrader5Icon} alt="MetaTrader5" style={{ width: '60px', height: '50px', marginRight: '8px', marginBottom: '8px' }} />
              <Paragraph style={{ color: '#666', fontSize: '11px', marginBottom: '10px', textAlign: 'center' }}>
                Import your custom trades directly from your MetaTrader5 account. Make sure you have MetaTrader5 installed on your machine.
              </Paragraph>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={handleOpenformModal}>
                Import Custom Trades
              </Button>
            </div>
            <ImportModal visible={formModalVisible} onClose={handleCloseformModal} />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card title="Sample Trades" hoverable>
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
              <FileTextOutlined style={{ fontSize: '40px', marginBottom: '19px' }} />
              <Paragraph style={{ color: '#666', fontSize: '11px', marginBottom: '10px', textAlign: 'center' }}>
                Import sample trades to see how the system works. These trades are provided for demonstration purposes only.
              </Paragraph>
            </div>
            <div style={{ textAlign: 'center' }}>
              <Button type="primary" onClick={handleImportSampleTrades}>
                Import Sample Trades
              </Button>
            </div>
          </Card>
        </Col>
      </Row>
    </Modal>
  );
};

export default ImportComponent;