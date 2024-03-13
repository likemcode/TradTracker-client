// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { Modal, Button, Card, message} from 'antd';

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
      
      try {
          const response = await fetch('http://127.0.0.1:8000/backend/trades/import-sample-trades/', {
              method: 'POST',
              headers: {
                  'Content-Type': 'application/json',
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
        message.error('An error occurred while importing sample trades. Please try again.');
      }

  };

  return (
    <>
      <Modal
        open={visible}
        onCancel={onClose}
        footer={null}
      >
        <div className='import-cards' style={{marginTop:'15px'}}>
          <Card title="Import Custom Trades" hoverable>
            <Button type="primary" onClick={handleOpenformModal}>
              Import Custom Trades
            </Button>
            <ImportModal
              visible={formModalVisible}
              onClose={handleCloseformModal}
            />
          </Card>
          <Card title="Sample Trades" hoverable>
            <Button type="primary" onClick={handleImportSampleTrades}>
              Import Sample Trades
            </Button>
          </Card>
        </div>
        
      </Modal>
    </>
  );
};

export default ImportComponent;
