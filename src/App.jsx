import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Collapse, Layout, Button } from 'antd';
import { Navbar, Dashboard, History, NotFound, Journal, JournalDetails, LandingPage , LoginPage, SignUp} from './components';
import  ProtectedRoutes  from './utils/ProtectedRoutes';
// import ToggleThemeButton from './components/ToggleThemeButton';

const { Header, Sider, Content } = Layout;

// Create a new component that uses useLocation
const App = () => {
 const [darkTheme, setDarkTheme] = useState(false);
 const [collapsed, setCollapsed] = useState(false);
 
//  const toggleTheme = () => {
//     setDarkTheme(!darkTheme);

//  };

 // Use useLocation hook to get the current location
 const location = useLocation();
 return (
  <div className='app'>
    {location.pathname === '/' && <LandingPage />}
    {location.pathname === '/Login' && <LoginPage />}
    {location.pathname === '/signup' && <SignUp />}
    {/* {location.pathname === '*' && <Notf />} */}
    {/* Renders the rest of the app only for other routes */}
    {!['/', '/Login', '/signup'].includes(location.pathname) &&  (
        <Layout hasSider>
        <Sider
          collapsed={collapsed}
          collapsible
          theme={darkTheme ? 'dark' : 'light'}
          className='sidebar'
          style={{
            height: '100vh',
            position: 'fixed',
            left: 0,
            top: 0,
            bottom: 0,
          }}
          onCollapse={(collapsed) => setCollapsed(collapsed)}
        >
            <div className='toggle'>
              {/* <Button type='text' onClick={() => setCollapsed(!collapsed)} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined  />}  /> */}
            </div>
            
            <Navbar darkTheme={darkTheme} className='navbar' />
          </Sider>
          <Layout>   
            <div className='app-header'>
              <Navbar darkTheme={darkTheme} className='navbar' />
            </div>
          <Content className='page-content' style={{
            paddingLeft: collapsed ? '80px' : '200px',
            overflow: 'hidden',
          }}>
            <div className='routes'>
              <Routes>
                <Route element={<ProtectedRoutes/>}>
                  <Route path='/Dashboard' element={<Dashboard />} />
                  <Route path='/History' element={<History />} />
                  <Route path='/Journal' element={<Journal />} />
                  <Route path='/JournalDetails/:journalId' element={<JournalDetails />} /> 
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </div>
          </Content>
          </Layout>
        </Layout>
      )}
    </div>
 );
};


export default App;