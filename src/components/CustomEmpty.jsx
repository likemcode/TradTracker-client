import React, { useState } from 'react';
import { Empty, Button, Typography } from 'antd';
import ImportComponent from './Import';
import nimage from '../assets/no-data.png'
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
            height: 250,
          }}
          description={
            <div style={{display:'grid'}}>
            <Text>No data yet</Text>
            <Text>
              Import your Trading Data to get started
            </Text>
          </div>
          }
        >
          <Button type="primary" onClick={handleOpenImportModal}>Import now</Button>
          <ImportComponent visible={isImportModalVisible} onClose={handleCloseImportModal} />
        </Empty>
      </div>

  );
};

export default CustomEmpty;
