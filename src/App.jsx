import React, { useState } from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {Collapse, Layout, Button, theme} from 'antd'
import {Navbar,Dashboard,History,Import,Profile} from './components'
import ToggleThemeButton from './components/ToggleThemeButton';

const {Header, Sider}= Layout;

const App = () => {
  const [darkTheme, setDarkTheme]=useState(true);
  const [collapsed, setCollapsed]=useState(false);
  const toggleTheme=()=>{
    setDarkTheme(!darkTheme);
  }
  const {
    token:{colorBgContainer},

  }=theme.useToken();
  return (
    
    <Layout>
        <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme? 'dark' : 'light'} className='sidebar'>
          <Button type='text' className='toggle' onClick={()=>setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> } style={{padding:0, background: colorBgContainer}}/>
          <Navbar darkTheme={darkTheme}/>
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme}/>
        </Sider>
        <Header style={{padding:0, background: colorBgContainer}}>
            {/* <Button type='text' className='toggle' onClick={()=>setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> }/> */}
        </Header>
        {/* <Layout>
        <div className='routes'>
                <Routes>
                    <Route exact path='/' element={<Dashboard/>} />
                    <Route exact path='/History' element={<History/>} />
                    <Route exact path='/Import' element={<Import/>} />
                    <Route exact path='/Profile' element={<Profile/>} />
                    
                </Routes>

                </div>
        </Layout> */}
        
    </Layout>
    
  )
}

export default App