import React from 'react';
import { Modal, Form, Input, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import { importData } from '../services/BackendApi';

const ImportModal = ({ visible, onClose }) => {
 const [form] = Form.useForm();
 const dispatch = useDispatch();

 const handleLogin = async () => {
    const values = form.getFieldsValue();
    const payload = {
      accountNumber: parseInt(values.accountNumber, 10),
      password: values.password,
      brokerName: values.brokerName,
    };

    try {
      // Dispatch the importData action with the payload
      await dispatch(importData(payload));
      onClose();
      // Show success message
      if (!response.ok) {
        throw new Error('Failed to import Data ');
      }
      message.success('Your Trading was imported Data successfully');
    } catch (error) {
      message.error('Error saving journal entry:', error.error);
    }
     
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
          Import Data
        </Button>
      </Form>
    </Modal>
 );
};

export default ImportModal;
