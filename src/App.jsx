import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Collapse, Layout, Button } from 'antd';
import { Navbar, Dashboard, History, Profile, Journal, JournalDetails, LandingPage , LoginPage, SignUp} from './components';
import  ProtectedRoutes  from './utils/ProtectedRoutes';
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
 return (
  <>
    {location.pathname === '/Landing' && <LandingPage />}
    {location.pathname === '/Login' && <LoginPage />}
    {location.pathname === '/signup' && <SignUp />}

    {/* Render the rest of the app only for other routes */}
    {!['/Landing', '/Login', '/signup'].includes(location.pathname) &&  (
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
                <Route element={<ProtectedRoutes/>}>
                  <Route path='/' element={<Dashboard />} />
                  <Route path='/History' element={<History />} />
                  <Route path='/Journal' element={<Journal />} />
                  <Route path='/JournalDetails/:journalId' element={<JournalDetails />} />
                  
                </Route>
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
