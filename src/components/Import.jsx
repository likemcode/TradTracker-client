// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { Modal, Button, Card } from 'antd';

const ImportComponent = ({ visible, onClose  }) => {
  const [formModalVisible, setformModalVisible] = useState(false);

  const handleOpenformModal = () => {
    setformModalVisible(true);
  };
  const handleCloseformModal = () => {
    setformModalVisible(false);
  };

  const handleImportSampleTrades = () => {
    // Handle import sample trades logic here
    console.log('Importing sample trades...');
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
