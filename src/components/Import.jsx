// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { FileTextOutlined } from '@ant-design/icons';
import { Modal, Button, Card, message, Flex, Typography} from 'antd';
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
          const response = await fetch('http://127.0.0.1:8000/backend/trades/import-sample-trades/', {
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
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
        
      >
        <Flex  gap={10} >
        <Card title="Import Custom Trades" hoverable>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
            <img src={MetaTrader5Icon} alt="MetaTrader5" style={{ width: '60px',height:'50px', marginRight: '8px', marginBottom:'8px' }} />
            <p style={{ color: '#666', fontSize: '11px', marginBottom: '10px' }}>
              Import your custom trades directly from your MetaTrader5 account. Make sure you have MetaTrader5 installed on your machine.
            </p>
          </div>
          <Button type="primary" onClick={handleOpenformModal}>
            Import Custom Trades
          </Button>
          <ImportModal
            visible={formModalVisible}
            onClose={handleCloseformModal}
          />
        </Card>
        <Card title="Sample Trades" hoverable>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '10px' }}>
            <FileTextOutlined style={{ fontSize: '40px', marginBottom: '19px' }} />
            <p style={{ color: '#666', fontSize: '11px', marginBottom: '10px' }}>
              Import sample trades to see how the system works. These trades are provided for demonstration purposes only.
            </p>
          </div>
          <Button type="primary" onClick={handleImportSampleTrades}>
            Import Sample Trades
          </Button>
        </Card>
        </Flex>
        
      </Modal>
    </>
  );
};

export default ImportComponent;
