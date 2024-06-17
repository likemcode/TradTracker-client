import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Layout, Button, Select } from 'antd';
import { Navbar, Dashboard, History, NotFound, Journal, JournalDetails, LandingPage, LoginPage, SignUp, CustomEmpty, Loader } from './components';
import ProtectedRoutes from './utils/ProtectedRoutes';
import { useGetAccountListQuery } from './services/BackendApi';

const { Header, Sider, Content } = Layout;

const App = () => {
  const [darkTheme, setDarkTheme] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const location = useLocation();

  const { data: accounts, isLoading: accountsLoading, error: accountsError } = useGetAccountListQuery();

  useEffect(() => {
    if (accounts && accounts.length > 0 && !selectedAccount) {
      setSelectedAccount(accounts[0].id);
    }
  }, [accounts, selectedAccount]);

  if (accountsLoading) {
    return <Loader />;
  }

  return (
    <div className='app'>
      {location.pathname === '/' && <LandingPage />}
      {location.pathname === '/Login' && <LoginPage />}
      {location.pathname === '/signup' && <SignUp />}
      {!['/', '/Login', '/signup'].includes(location.pathname) && (
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

            <Navbar darkTheme={darkTheme} collapsed={collapsed} className='navbar' />
          </Sider>
          <Layout>
            <div className='app-header'>
              <Navbar darkTheme={darkTheme} className='navbar' />
            </div>
            {!location.pathname.includes('/Journal') && !location.pathname.includes('/journalDetails/') && (
              <Header className='custom-header' style={{ marginLeft: collapsed ? '80px' : '200px' }}>
                <Select
                  value={selectedAccount}
                  style={{ width: 200 }}
                  onChange={(value) => setSelectedAccount(value)}
                  options={accounts?.map((account) => ({ value: account.id, label: `${account.broker_name} (${account.login})` }))}
                  loading={accountsLoading}
                />
              </Header>
            )}
            <Content
              className='page-content'
              style={{
                paddingLeft: collapsed ? '80px' : '200px',
                overflow: 'hidden',
              }}
            >
              <Routes>
                <Route element={<ProtectedRoutes />}>
                  <Route
                    path='/Dashboard'
                    element={accounts && accounts.length > 0 ? <Dashboard selectedAccount={selectedAccount} /> : <CustomEmpty />}
                  />
                  <Route
                    path='/History'
                    element={accounts && accounts.length > 0 ? <History selectedAccount={selectedAccount} /> : <CustomEmpty />}
                  />
                  <Route
                    path='/Journal'
                    element={<Journal />}
                  />
                  <Route
                    path='/JournalDetails/:journalId'
                    element={ <JournalDetails />}
                  />
                  <Route path='*' element={<NotFound />} />
                </Route>
              </Routes>
            </Content>
          </Layout>
        </Layout>
      )}
    </div>
  );
};

export default App;
