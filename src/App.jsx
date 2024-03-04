import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import {MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import {Collapse, Layout, Button, theme} from 'antd'
import {Navbar,Dashboard,History,Profile} from './components'
import ToggleThemeButton from './components/ToggleThemeButton';

const {Header, Sider, Content}= Layout;

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
    <Router>
    <Layout>
        <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme? 'dark' : 'light'} className='sidebar'>
          <Button type='text' className='toggle' onClick={()=>setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> } style={{padding:0, background: colorBgContainer}}/>
          <Navbar darkTheme={darkTheme}/>
          <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme}/>
        </Sider>
        <Header style={{padding:0, background: colorBgContainer}}>
            {/* <Button type='text' className='toggle' onClick={()=>setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> }/> */}
        </Header>
        <Content>
          <div className='routes'>
                <Routes>
                    <Route exact path='/' element={<Dashboard/>} />
                    <Route exact path='/History' element={<History/>} />
                    <Route exact path='/Profile' element={<Profile/>} />
                </Routes>
          </div>
          </Content>
        
    </Layout>
    </Router>
  )
}

export default App