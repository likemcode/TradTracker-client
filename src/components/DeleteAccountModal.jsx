import React, { useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { Modal, Button, Typography, Input, Form, message, Spin } from 'antd';
import { ExclamationCircleOutlined, LoadingOutlined } from '@ant-design/icons';

const { Text } = Typography;

const DeleteAccountModal = ({ visible, onCancel }) => {
  const [loading, setLoading] = useState(false);
  const [confirmInput, setConfirmInput] = useState('');
  const [form] = Form.useForm();
  const navigate= useNavigate();
  const handleDeleteAccount = async () => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('https://tradtracker-backend.onrender.com/auth/delete/', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to delete account');

      message.success('Account deleted successfully');
      localStorage.removeItem('token');
      onCancel();
      // Redirect user 
      navigate('/');
      
    } catch (error) {
      console.error('Error deleting account:', error);
      message.error('Failed to delete account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const validateConfirmInput = (rule, value) => {
    if (value !== 'DELETE') {
      return Promise.reject('Type DELETE to confirm');
    }
    return Promise.resolve();
  };

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      title="Delete Account"
      centered
    >
      <div style={{ textAlign: 'center' }}>
        <ExclamationCircleOutlined style={{ fontSize: '48px', color: '#ff4d4f' }} />
        <Text type="danger" style={{ display: 'block', margin: '20px 0' }}>
          Are you sure you want to delete your account? This action cannot be undone.
        </Text>
        <Form form={form} onFinish={handleDeleteAccount}>
          <Form.Item
            name="confirm"
            rules={[{ validator: validateConfirmInput }]}
          >
            <Input
              placeholder="Type DELETE to confirm"
              value={confirmInput}
              onChange={(e) => setConfirmInput(e.target.value)}
            />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              danger
              loading={loading}
            >
              {loading ? <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} /> : 'Delete Account'}
            </Button>
            <Button onClick={onCancel} style={{ marginLeft: '10px' }}>
              Cancel
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Modal>
  );
};

export default DeleteAccountModal;
