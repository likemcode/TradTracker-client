import React,  { useState } from 'react';
import {Menu} from 'antd';
import{Link} from 'react-router-dom';
import {CloudDownloadOutlined, TableOutlined,AreaChartOutlined,UserOutlined} from '@ant-design/icons';
import  ImportComponent  from './Import';

const Navbar = ({darkTheme}) => {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);

  const handleOpenImportModal = () => {
    console.log('working quite well');
    setIsImportModalVisible(true);
    console.log(isImportModalVisible)
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
              {isImportModalVisible && (
                <ImportComponent isImportModalVisible={isImportModalVisible} handleCloseImportModal={handleCloseImportModal} />
              )}
          </Menu.Item>
            <Menu.Item key='Profile' icon={<UserOutlined />}>
              <Link to="/Profile">Profile</Link>
            </Menu.Item>

        </Menu>
        
        </>
      
  )
}

export default Navbar
