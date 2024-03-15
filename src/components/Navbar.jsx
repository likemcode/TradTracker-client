import React,  { useState } from 'react';
import {Menu} from 'antd';
import{Link} from 'react-router-dom';
import {CloudDownloadOutlined, TableOutlined,AreaChartOutlined,UserOutlined, ReadOutlined} from '@ant-design/icons';
import  ImportComponent  from './Import';

const Navbar = ({darkTheme}) => {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  const handleOpenImportModal = () => {
    setIsImportModalVisible(true);
    
  };

  const handleCloseImportModal = () => {
    setIsImportModalVisible(false);
  };
  return (
        <>
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className='menu-bar'>
            <Menu.Item key='Dashboard' icon={<AreaChartOutlined />}>
              <Link to="/">Dashboard</Link>
            </Menu.Item>
            <Menu.Item key='History' icon={<TableOutlined />}>
              <Link to="/History">History</Link>
            </Menu.Item>
            <Menu.Item key="Import" icon={<CloudDownloadOutlined />} onClick={handleOpenImportModal}>
              Import
          </Menu.Item>
          <Menu.Item key='Journal' icon={<ReadOutlined />}>
              <Link to="/Journal">Journal</Link>
            </Menu.Item>
            <Menu.Item key='Profile' icon={<UserOutlined />}>
              <Link to="/Profile">Profile</Link>
            </Menu.Item>
        </Menu>
        
        <ImportComponent visible={isImportModalVisible} onClose={handleCloseImportModal} />
        
        </>
      
  )
}

export default Navbar
