import React, { useState, useEffect } from 'react';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { loginStart, loginSuccess, loginFailure } from '../services/loginSlice';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';
import Logo from './Logo'

const { Title } = Typography;

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (loading) {
      messageApi.open({
        type: 'loading',
        content: 'Logging you in...',
        duration: 0,
      });
    } else {
      messageApi.destroy();
    }
  }, [loading, messageApi]);

  const onFinish = async (values) => {
    setLoading(true);
    dispatch(loginStart());
    try {
      const response = await fetch('https://tradtracker-backend.onrender.com/auth/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (data.token) {
        dispatch(loginSuccess(data));
        localStorage.setItem('token', data.token);
        message.success('Logged in successfully!');
        navigate('/Dashboard');
      } else {
        message.error(data.error);
      }
    } catch (error) {
      dispatch(loginFailure(error.message));
      message.error('Failed to log in. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="login-container">
      {contextHolder}
      <Logo/>
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
          <Button type="primary" htmlType="submit" className="login-form-button" loading={loading}>
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