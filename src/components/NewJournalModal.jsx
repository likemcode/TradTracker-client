import React, { useState } from 'react';
import { Modal, Form, Input, Button } from 'antd';

const NewJournalModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleCreate = () => {
    form
      .validateFields()
      .then(values => {
        onCreate(values.title);
        form.resetFields();
      })
      .catch(err => {
        console.error('Validation failed:', err);
      });
  };

  return (
    <Modal
      open={visible}
      title="Create New Journal Entry"
      okText="Create"
      cancelText="Cancel"
      onCancel={onCancel}
      onOk={handleCreate}
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="title"
          label="Title"
          rules={[
            {
              required: true,
              message: 'Please enter a title for the journal entry',
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewJournalModal;
