import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Modal, Form, Input, Upload, Button, message, Spin } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

const AccountModal = ({ visible, onCancel }) => {
  const { id } = useParams();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        console.log('This is the id: ',id)
        
        const response = await fetch(`http://127.0.0.1:8000/auth/user/${id}/`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Token ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await response.json();
        setUserData(data);
        form.setFieldsValue({
          name: data.name,
          email: data.email,
          profileImage: data.profile_image ? [{ url: data.profile_image }] : [],
        });
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    if (visible) {
      fetchUserData();
    }
  }, [visible, form]);

  const handleUpload = ({ file, onSuccess, onError }) => {
    const isValidFile = file.type === 'image/jpeg' || file.type === 'image/png';

    if (!isValidFile) {
      message.error('You can only upload JPG/PNG file!');
      return isValidFile;
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreviewImage(reader.result);
    };

    return isValidFile;
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const token = localStorage.getItem('token');

    try {
      const response = await fetch('http://127.0.0.1:8000/auth/user/', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
        body: JSON.stringify({
          name: values.name,
          email: values.email,
          password: values.password,
          profile_image: previewImage,
        }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      message.success('Profile updated successfully');
      onCancel();
    } catch (error) {
      console.error('Error updating user data:', error);
      message.error('An error occurred while updating your profile. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <Modal
      visible={visible}
      onCancel={onCancel}
      footer={null}
      title="Account Settings"
      width={600}
    >
      {userData ? (
        <Form form={form} onFinish={handleSubmit} layout="vertical">
          <Form.Item
            name="profileImage"
            label="Profile Image"
            valuePropName="fileList"
            getValueFromEvent={handleUpload}
          >
            <Upload
              name="avatar"
              listType="picture-card"
              showUploadList={false}
              beforeUpload={handleUpload}
            >
              {previewImage || (userData.profile_image && (
                <img src={userData.profile_image} alt="avatar" style={{ width: '100%' }} />
              )) || uploadButton}
            </Upload>
          </Form.Item>
          <Form.Item
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Enter your name" />
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
          <Form.Item
            name="password"
            label="Password"
            rules={[{ required: true, message: 'Please enter your password' }]}
          >
            <Input.Password placeholder="Enter your new password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" loading={loading}>
              Save
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Spin />
      )}
    </Modal>
  );
};

export default AccountModal;