import React from 'react'
import { Routes, Route, Link } from 'react-router-dom';
import {Layout} from 'antd'
import {Navbar,Dashboard,History,Import,} from './components'

const {Header, Sider}= Layout;

const App = () => {
  return (
    
    <Layout>
        <Sider className='sidebar'>
          <Navbar/>
        
        </Sider>
        
    </Layout>
    
  )
}

export default App