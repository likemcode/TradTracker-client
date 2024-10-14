import React,  { useState, useEffect } from 'react';
import {Menu,Avatar, Button, Flex} from 'antd';
import{Link, useNavigate} from 'react-router-dom';
import Logo from './Logo'
import {CloudDownloadOutlined, TableOutlined,LogoutOutlined,AreaChartOutlined,UserOutlined, ReadOutlined, StopOutlined, MenuOutlined} from '@ant-design/icons';
import AccountModal from './User';
import DeleteAccountModal from './DeleteAccountModal';
import  ImportComponent  from './Import';


const Navbar = ({darkTheme, collapsed }) => {
  const [activeMenu, setActiveMenu]= useState(true)
  const [screenSize, setScreenSize] = useState(null)
  const [isImportModalVisible, setIsImportModalVisible] = useState(false);
  const [userId, setUserId] = useState(null);
  const [isAccountModalVisible, setAccountModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const navigate= useNavigate()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);

    window.addEventListener('resize', handleResize);

    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 800) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  const handleOpenImportModal = () => {
    setIsImportModalVisible(true);    
  };

  const handleCloseImportModal = () => {
    setIsImportModalVisible(false);
  };


  const handleOpenAccountModal = () => {
    setAccountModalVisible(true);    
  };

  const handleCloseAccountModal = () => {
    setAccountModalVisible(false);
  };

  const showDeleteModal = () => {
    setIsDeleteModalVisible(true);
  };

  const handleCancel = () => {
    setIsDeleteModalVisible(false);
  };

  useEffect(() => {
    // Fetch user details to get the user id
    const fetchUserId = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const response = await fetch('https://tradtracker-backend.onrender.com/auth/user/', {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Token ${token}`,
            },
          });
          if (response.ok) {
            const data = await response.json();
            setUserId(data.id); // Assuming the user object has an id field
          }
        } catch (error) {
          console.error('Error fetching user id:', error);
        }
      }
    };
    fetchUserId();
  }, []);

  const handleLogout= async () => {
    const response = await fetch('https://tradtracker-backend.onrender.com/auth/logout/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        }
      });
    const data = await response.json();
    localStorage.removeItem('token')
    navigate('/')
  };

  return (
        <div className='nav-container'>
          <Logo collapsed={collapsed} />
         <Button className="menu-control-container" onClick={() => setActiveMenu(!activeMenu)} style={{paddingLeft:'10px', paddingRight:'10px'}}><MenuOutlined /></Button>
        {activeMenu && (
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
              <Menu.Item key="User" icon={<UserOutlined />} onClick={handleOpenAccountModal}>
                My Account
              </Menu.Item>
              <Menu.Item key="Logout" icon={<LogoutOutlined />} onClick={handleLogout}>
                Logout
              </Menu.Item>
              <Menu.Item key="Delete" icon={<StopOutlined /> } danger='true' onClick={showDeleteModal}>
                Delete
              </Menu.Item>
        </Menu.SubMenu>
          
        </Menu>
        )}
        <ImportComponent visible={isImportModalVisible} onClose={handleCloseImportModal} />

        <AccountModal visible={isAccountModalVisible} onCancel={handleCloseAccountModal} userId={userId}/>

        <DeleteAccountModal visible={isDeleteModalVisible} onCancel={handleCancel} />
        </div>
      
  )
}


export default Navbar
