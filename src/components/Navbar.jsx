import React,  { useState } from 'react';
import {Menu,Avatar} from 'antd';
import{Link, useNavigate} from 'react-router-dom';
import {CloudDownloadOutlined, TableOutlined,LogoutOutlined,AreaChartOutlined,UserOutlined, ReadOutlined, StopOutlined} from '@ant-design/icons';
import  ImportComponent  from './Import';


const Navbar = ({darkTheme}) => {
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const navigate= useNavigate()
  const handleOpenImportModal = () => {
    setIsImportModalVisible(true);    
  };

  const handleCloseImportModal = () => {
    setIsImportModalVisible(false);
  };

  const handleLogout= async () => {
    const response = await fetch('http://127.0.0.1:8000/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
        
      });
    const data = await response.json();
    console.log(data);
    localStorage.removeItem('token')
    navigate('/')
  };

  return (
        <>
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="vertical" className='menu-bar' >
            <Menu.Item key='Dashboard' icon={<AreaChartOutlined />}>
              <Link to="/Dashboard">Dashboard</Link>
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
            <Menu.SubMenu 
              key="Profile" icon={<UserOutlined />} 
              title="Profile" 
            >
              <Menu.Item key="User" icon={<UserOutlined />}>
                <Link to="/user">User</Link>
              </Menu.Item>
              <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Menu.Item>
              <Menu.Item key="Delete" icon={<StopOutlined /> } danger='true'>
                <Link to="/delete">Delete</Link>
              </Menu.Item>
        </Menu.SubMenu>
          
        </Menu>
        
        <ImportComponent visible={isImportModalVisible} onClose={handleCloseImportModal} />
        
        </>
      
  )
}


export default Navbar
