import React,  { useState } from 'react';
import {Menu, Dropdown} from 'antd';
import{Link} from 'react-router-dom';
import {CloudDownloadOutlined, TableOutlined,LogoutOutlined,AreaChartOutlined,UserOutlined, ReadOutlined, StopOutlined} from '@ant-design/icons';
import  ImportComponent  from './Import';

const Navbar = ({darkTheme}) => {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [isProfileDropdownVisible, setIsProfileDropdownVisible] = useState(false);

  const handleOpenImportModal = () => {
    setIsImportModalVisible(true);
    
  };

  const handleCloseImportModal = () => {
    setIsImportModalVisible(false);
  };

  const handleProfileDropdownVisibleChange = (visible) => {
    setIsProfileDropdownVisible(visible);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item key="Profile" icon={<UserOutlined />}>
        <Link to="/Profile">Profile</Link>
      </Menu.Item>
      <Menu.Item key="Profile" icon={<LogoutOutlined />}>
        <Link to="/logout">Logout</Link>
      </Menu.Item>
      <Menu.Item key="Delete" color='red' icon={<StopOutlined /> }>
        <Link to="/delete">Delete</Link>
      </Menu.Item>
      {/* Add more menu items here if needed */}
    </Menu>
  );
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
            <Dropdown
              overlay={profileMenu}
              placement="bottomRight"
              open={isProfileDropdownVisible}
              onOpenChange={handleProfileDropdownVisibleChange}
            >
          <Menu.Item key='Profile' icon={<UserOutlined />}>
            Profile
          </Menu.Item>
        </Dropdown>
        </Menu>
        
        <ImportComponent visible={isImportModalVisible} onClose={handleCloseImportModal} />
        
        </>
      
  )
}

export default Navbar
