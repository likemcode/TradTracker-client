// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { Modal, Button, Card, message, Flex, Typography} from 'antd';

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
        <Flex gap={20}>
          <Card title="Import Custom Trades" hoverable>
            <Paragraph style={{color: '#666' , fontSize:'13px'}}>You can import trades directly from your MetaTrader5 account, make sure you have metatrader5 installed on your Machine</Paragraph>
            <Button type="primary" onClick={handleOpenformModal}>
              Import Custom Trades
            </Button>
            <ImportModal
              visible={formModalVisible}
              onClose={handleCloseformModal}
            />
          </Card>
          <Card title="Sample Trades" hoverable>
          <Paragraph style={{color: '#666', fontSize:'13px'}}>You can import trades directly from your MetaTrader5 account, make sure you have metatrader5 installed on your Machine</Paragraph>
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
