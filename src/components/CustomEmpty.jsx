import React, { useState } from 'react';
import { Empty, Button, Typography } from 'antd';
import ImportComponent from './Import';
import nimage from '../assets/no-data.png'
const { Title, Text, Paragraph} = Typography;

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
            <Title level={3}>Welcome aboard</Title>
            <Paragraph>
                Import your trading data to see your progress and insights
            </Paragraph>
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
