import React, { useState } from 'react';
import { Empty, Button, Typography } from 'antd';
import ImportComponent from './Import';
import nimage from '../assets/no-data.gif'
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
    <div className='empty'>
      
        <Empty
          image={nimage}
          imageStyle={{
            height: 100,
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

  );
};

export default CustomEmpty;
