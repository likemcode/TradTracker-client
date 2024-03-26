import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom'; // For navigation link
import './LoginPage.css'; // Ensure you import your CSS file

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const onFinish = (values) => {
    console.log('Received values of form:', values);
    // Handle login logic here (e.g., API call)
  };

  return (
    <div className="login-container">
      <Title level={2} className="login-title">TradeTracker</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          <span className="login-form-or">or</span>
          <Link to="/signup" className="login-form-signup">
            Create a new account
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default LoginPage;
