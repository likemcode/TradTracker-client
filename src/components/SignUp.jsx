import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Checkbox, Typography, message } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../services/authSlice';
import { Link } from 'react-router-dom';
import './SignUpPage.css';

const { Title } = Typography;

const SignUp = () => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (loading) {
      messageApi.open({
        type: 'loading',
        content: 'Creating your account...',
        duration: 0,
      });
    } else {
      messageApi.destroy();
    }
  }, [loading, messageApi]);

  const onFinish = async (values) => {
    setLoading(true);
    dispatch(signupStart());
    try {
      const response = await fetch('http://127.0.0.1:8000/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }
      dispatch(signupSuccess(data));
      localStorage.setItem('token', data.token);
      message.success('Account created successfully!');
      navigate('/Login');
    } catch (error) {
      const errorData = JSON.parse(error.message);
      dispatch(signupFailure(errorData));
      // Handle specific field errors
      Object.keys(errorData).forEach(field => {
        form.setFields([
          {
            name: field,
            errors: Array.isArray(errorData[field]) ? errorData[field] : [errorData[field]],
          },
        ]);
      });
      message.error('Failed to create account. Please check the form for errors.');
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmPassword = (_, value) => {
    const password = form.getFieldValue('password');
    if (value && value !== password) {
      return Promise.reject('Passwords do not match!');
    }
    return Promise.resolve();
  };

  return (
    <div className="signup-container">
      {contextHolder}
      <Title level={2} className="signup-title">TradeTracker</Title>
      <Form
        form={form}
        name="normal_signup"
        className="signup-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
          ]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email address!' },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 8, message: 'Password must be at least 8 characters!' },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            { validator: validateConfirmPassword },
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            placeholder="Confirm Password"
          />
        </Form.Item>
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>I agree to TradeTracker's Terms of Service</Checkbox>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="signup-form-button" loading={loading}>
            Sign Up
          </Button>
          <span className="signup-form-or">or</span>
          <Link to="/Login" className="signup-form-link">
            Already have an account? Login here
          </Link>
        </Form.Item>
      </Form>
    </div>
  );
};

export default SignUp;