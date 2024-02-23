// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { Button, Card } from 'antd';

const ImportComponent = () => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleImportSampleTrades = () => {
    // Handle import sample trades logic here
    console.log('Importing sample trades...');
     
  };

  return (
    <div className='import-cards'>
      <Card title="Import Custom Trades" hoverable>
        <Button type="primary" onClick={handleOpenModal}>
          Import Custom Trades
        </Button>
      </Card>
      <ImportModal
        visible={modalVisible}
        onClose={handleCloseModal}
      />
      <Card title="sample Trades" hoverable>
        <Button type="primary" onClick={handleImportSampleTrades}>
          Import Sample Trades
        </Button>
      </Card>

    </div>
  );
};

export default ImportComponent;
