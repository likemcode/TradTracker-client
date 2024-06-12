import React, { useState } from 'react';
import { Empty, Button, Typography } from 'antd';
import ImportComponent from './Import';

const { Text } = Typography;

const CustomEmpty = () => {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  const handleOpenImportModal = () => {
    setIsImportModalVisible(true);    
  };
  
  const handleCloseImportModal = () => {
    setIsImportModalVisible(false);
  };

  return (
    <div style={{ position: 'relative', height: '100vh', width: '100vw' }}>
      <div style={{ 
        position: 'absolute', 
        top: '50%', 
        left: '50%', 
        transform: 'translate(-50%, -50%)' 
      }}>
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{
            height: 60,
          }}
          description={
            <span>
              Import your Trading Data to get started
            </span>
          }
        >
          <Button type="primary" onClick={handleOpenImportModal}>Import now</Button>
          <ImportComponent visible={isImportModalVisible} onClose={handleCloseImportModal} />
        </Empty>
      </div>
    </div>
  );
};

export default CustomEmpty;
