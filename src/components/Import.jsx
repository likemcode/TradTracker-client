// ImportComponent.js
import React, { useState } from 'react';
import ImportModal from './ImportModal';
import { Modal, Button, Card } from 'antd';

const ImportComponent = ({ isImportModalVisible, handleCloseImportModal }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [formModalVisible, setformModalVisible] = useState(false);
  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleOpenformModal = () => {
    setformModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
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
        open={modalVisible}
        onCancel={handleCloseModal}
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
