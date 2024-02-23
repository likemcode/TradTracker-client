import React from 'react';
import { Modal, Form, Input, Button } from 'antd';
// import './LoginForm.css'; // Ensure you import your CSS file

const ImportModal = ({ visible, onClose }) => {
  const [form] = Form.useForm();

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
  ;

  };


  return (
    <Modal
      title="Import Data"
      open={visible}
      onCancel={onClose}
      footer={null} // Remove default footer
    >
      <Form form={form} layout="vertical" className="form-container">
        <Form.Item label="Account number" name="accountNumber">
          <Input type="number" />
        </Form.Item>

        <Form.Item label="Password" name="password">
          <Input.Password />
        </Form.Item>

        <Form.Item label="Broker Name" name="brokerName">
          <Input />
        </Form.Item>

        <Button type="primary" block onClick={handleLogin}>
          Se connecter
        </Button>

      </Form>
    </Modal>
  );
};

export default ImportModal;