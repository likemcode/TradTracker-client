import React from 'react';
import {Menu} from 'antd';
import{Link} from 'react-router-dom';
import {CloudDownloadOutlined, TableOutlined,AreaChartOutlined,UserOutlined} from '@ant-design/icons';


const Navbar = ({darkTheme}) => {
  return (
        
        <Menu theme={darkTheme ? 'dark' : 'light'} mode="inline" className='menu-bar'>
            <Menu.Item key='Dashoard' icon={<AreaChartOutlined />}>
              Dashboard  
            </Menu.Item>
            <Menu.Item key='History' icon={<TableOutlined />}>
              History  
            </Menu.Item>
            <Menu.Item key='Import' icon={<CloudDownloadOutlined />}>
              Import 
            </Menu.Item>
            <Menu.Item key='Profile' icon={<UserOutlined />}>
              Profile
            </Menu.Item>
        </Menu>

      
  )
}

export default Navbar
