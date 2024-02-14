import React from 'react';
import {Menu} from 'antd';
import{Link} from 'react-router-dom';
import {HomeOutlined, MoneyCollectOutlined,AreaChartOutlined, BulbOutlined,FundOutlined, MenuOutlined} from '@ant-design/icons';


const Navbar = () => {
  return (
        
        <Menu theme='dark' mode="inline" className='menu-bar'>
            <Menu.Item key='Dashoard' icon={<AreaChartOutlined />}>
              Dashboard  
            </Menu.Item>
            <Menu.Item key='History' icon={<AreaChartOutlined />}>
              History  
            </Menu.Item>
            <Menu.Item key='Import' icon={<AreaChartOutlined />}>
              Import 
            </Menu.Item>
            <Menu.Item key='User' icon={<AreaChartOutlined />}>
              User
            </Menu.Item>
        </Menu>

      
  )
}

export default Navbar
