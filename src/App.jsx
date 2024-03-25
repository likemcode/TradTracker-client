import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Collapse, Layout, Button } from 'antd';
import { Navbar, Dashboard, History, Profile, Journal, JournalDetails, LandingPage } from './components';
import ToggleThemeButton from './components/ToggleThemeButton';

const { Header, Sider, Content } = Layout;

// Create a new component that uses useLocation
const MainContent = () => {
 const [darkTheme, setDarkTheme] = useState(true);
 const [collapsed, setCollapsed] = useState(false);
 const toggleTheme = () => {
    setDarkTheme(!darkTheme);
 };

 // Use useLocation hook to get the current location
 const location = useLocation();

 // Determine if the current route is the landing page
 const isLandingPage = location.pathname === '/Landing';

 return (
    <>
      {/* Conditionally render the LandingPage component */}
      {isLandingPage && <LandingPage />}

      {/* Render the rest of the app only if not on the landing page */}
      {!isLandingPage && (
        <Layout>
          <Sider collapsed={collapsed} collapsible trigger={null} theme={darkTheme ? 'dark' : 'light'} className='sidebar'>
            <div className='toggle'>
              <Button type='text' onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
            </div>
            <Navbar darkTheme={darkTheme} />
            <ToggleThemeButton darkTheme={darkTheme} toggleTheme={toggleTheme} />
          </Sider>
          <Header style={{ padding: 0 }}>
            {/* <Button type='text' className='toggle' onClick={()=>setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined/>: <MenuFoldOutlined/> }/> */}
          </Header>

          <Content>
            <div className='routes'>
              <Routes>
                <Route path='/' element={<Dashboard />} />
                <Route path='/History' element={<History />} />
                <Route path='/Journal' element={<Journal />} />
                <Route path='/JournalDetails/:journalId' element={<JournalDetails />} />
                <Route path='/Profile' element={<Profile />} />
              </Routes>
            </div>
          </Content>
        </Layout>
      )}
    </>
 );
};

const App = () => {
 return (
    <Router>
      <MainContent />
    </Router>
 );
};

export default App;
