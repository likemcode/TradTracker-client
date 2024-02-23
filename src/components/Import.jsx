import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const LoginForm = () => {
  const [form] = Form.useForm();
  const [loginStatus, setLoginStatus] = useState('');

  const handleLogin = async () => {
    const values = form.getFieldsValue();
    const payload = {
      accountNumber: parseInt(values.accountNumber,  10),
      password: values.password,
      brokerName: values.brokerName,
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/backend/connect_to_mt5/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // Assuming you have a way to get the CSRF token in React
          'X-CSRFToken': 'your_csrf_token_here',
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();
      setLoginStatus(data.message);
    } catch (error) {
      console.error('Error:', error);
      setLoginStatus('An error occurred. Please try again.');
    }
  };

  return (
    <div className="container">
      <h1>Connexion à MetaTrader  5</h1>
      <Form {...layout} form={form} layout="vertical" >
        <Form.Item label="Numéro de compte" name="accountNumber">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Mot de passe" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Nom du courtier" name="brokerName">
          <Input />
        </Form.Item>

        <Form.Item>
          <Button type="primary" onClick={handleLogin}>
            Se connecter
          </Button>
        </Form.Item>
      </Form>

      <div id="login-status" className="status">{loginStatus}</div>
    </div>
  );
};

export default LoginForm;
