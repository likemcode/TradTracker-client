import React, { useState } from 'react';
import { Form, Input, Button, Checkbox, Typography, Select } from 'antd';
import { UserOutlined, LockOutlined, MailOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { signupStart, signupSuccess, signupFailure } from '../services/authSlice';

import { Link } from 'react-router-dom'; // For navigation link
import './SignUpPage.css'; // Ensure you import your CSS file
const { Title } = Typography;


const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const dispatch = useDispatch();

  

  const onFinish =  async (values) => {
    dispatch(signupStart());
    try {
      const response = await fetch('http://127.0.0.1:8000/api/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      dispatch(signupSuccess(data));
    } catch (error) {
      dispatch(signupFailure(error.message));
    }
  };

  const validateConfirmPassword = (_, value) => {
    if (value !== password) {
      return Promise.reject('Passwords do not match!');
    }
    return Promise.resolve();
  };

  return (
    <div className="signup-container">
      <Title level={2} className="signup-title">TradeTracker</Title>
      <Form
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
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Invalid email address!' },
          ]}
        >
          <Input prefix={<MailOutlined className="site-form-item-icon" />} placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters!' },
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
        <Form.Item
          name="confirm"
          dependencies={['password']}
          hasFeedback
          rules={[
            { required: true, message: 'Please confirm your password!' },
            ({ getFieldValue }) => ({
              validator: validateConfirmPassword,
              shouldUpdate: (next, prev) => next !== prev,
            }),
          ]}
        >
          <Input.Password
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Item>
        {/* <Form.Item name="country"> */}
          {/* <Select
            defaultValue={country}
            options={countries}
            onChange={(value) => setCountry(value)}
          >
            Country options rendered dynamically */}
            {/* {countries.map((country) => (
              <Select.Option key={country.value} value={country.value}>
                {country.label}
              </Select.Option> */}
            {/* ))}
          </Select> */}
        {/* </Form.Item> */}
        <Form.Item name="remember" valuePropName="checked" noStyle>
          <Checkbox>I agree to TradeTracker's Terms of Service</Checkbox>
        </Form.Item>
        <Form.Item>
        <Button type="primary" htmlType="submit" className="signup-form-button">
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
