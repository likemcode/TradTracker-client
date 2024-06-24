import React, { useState, useEffect, useCallback } from 'react';
import { Modal, Form, Input, Upload, Button, message, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined, EditOutlined } from '@ant-design/icons';

const AccountModal = ({ visible, onCancel }) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [userData, setUserData] = useState(null);
  const [isPasswordModalVisible, setIsPasswordModalVisible] = useState(false);
  const [passwordForm] = Form.useForm();

  const fetchUserData = useCallback(async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/auth/user/', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });

      if (!response.ok) throw new Error('Failed to fetch user data');

      const data = await response.json();
      setUserData(data);
      form.setFieldsValue({
        username: data.username,
        email: data.email,
        profileImage: data.profile.profile_image ? [{ url: data.profile.profile_image }] : [],
      });
    } catch (error) {
      console.error('Error fetching user data:', error);
      message.error('Failed to load user data. Please try again.');
    }
  }, [form]);

  useEffect(() => {
    if (visible) fetchUserData();
  }, [visible, fetchUserData]);

  const handleUpload = ({ file }) => {
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      message.error('You can only upload JPG/PNG files!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = (e) => setPreviewImage(e.target.result);
    reader.readAsDataURL(file);
    return false;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const token = localStorage.getItem('token');
    const body = {
      username: values.username,
      email: values.email,
      profile: {
        profile_image: previewImage,
      },
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/user/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify(body),
      });

      if (!response.ok) throw new Error('Failed to update profile');

      message.success('Profile updated successfully');
      onCancel();
    } catch (error) {
      console.error('Error updating user data:', error);
      message.error('Failed to update profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePasswordChange = async (values) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://127.0.0.1:8000/auth/user/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          old_password: values.old_password,
          new_password: values.new_password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to change password');
      }

      message.success('Password changed successfully');
      setIsPasswordModalVisible(false);
      passwordForm.resetFields();
    } catch (error) {
      console.error('Error changing password:', error);
      message.error(error.message || 'Failed to change password. Please try again.');
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Modal
        visible={visible}
        onCancel={onCancel}
        footer={null}
        title="Account Settings"
        width={600}
      >
        {userData ? (
          <Form form={form} onFinish={handleSubmit} layout="vertical">
            <Form.Item name="profileImage" label="Profile Image">
              <Upload
                name="avatar"
                listType="picture-card"
                showUploadList={false}
                beforeUpload={handleUpload}
              >
                {uploadButton}
              </Upload>
            </Form.Item>
            <Form.Item
              name="username"
              label="Username"
              rules={[{ required: true, message: 'Please enter your username' }]}
            >
              <Input placeholder="Enter your username" />
            </Form.Item>
            <Form.Item
              name="email"
              label="Email"
              rules={[
                { required: true, message: 'Please enter your email' },
                { type: 'email', message: 'Please enter a valid email' },
              ]}
            >
              <Input placeholder="Enter your email" />
            </Form.Item>
            <Form.Item label="Password">
              <Button icon={<EditOutlined />} onClick={() => setIsPasswordModalVisible(true)}>
                Change Password
              </Button>
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" loading={loading}>
                Save Changes
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <Spin size="large" />
        )}
      </Modal>

      <Modal
        visible={isPasswordModalVisible}
        onCancel={() => setIsPasswordModalVisible(false)}
        footer={null}
        title="Change Password"
      >
        <Form form={passwordForm} onFinish={handlePasswordChange} layout="vertical">
          <Form.Item
            name="old_password"
            label="Old Password"
            rules={[{ required: true, message: 'Please enter your old password' }]}
          >
            <Input.Password placeholder="Enter your old password" />
          </Form.Item>
          <Form.Item
            name="new_password"
            label="New Password"
            rules={[{ required: true, message: 'Please enter your new password' }]}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Change Password
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default AccountModal;