import React, { useState } from 'react';
import { Modal, Form, Input, Button, Select, DatePicker } from 'antd';
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons'; // Import emoji icons

const { Option } = Select;

const NewJournalModal = ({ visible, onCreate, onCancel }) => {
  const [form] = Form.useForm();

  const handleCreate = () => {
    form
      .validateFields()
      .then(values => {
        onCreate(values);
        console.log(values);
        form.resetFields();
      })
      .catch(err => {
        console.error('Validation failed:', err);
      });
  };

  // Options for mood selection
  const moodOptions = [
    { label: <SmileOutlined />, value: 'happy' },
    { label: <MehOutlined />, value: 'neutral' },
    { label: <FrownOutlined />, value: 'sad' },
  ];

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
        <Form.Item name="symbol" label="Symbol">
          <Input />
        </Form.Item>
        <Form.Item name="buySell" label="Buy/Sell">
          <Select>
            <Option value="buy">Buy</Option>
            <Option value="sell">Sell</Option>
          </Select>
        </Form.Item>

        <Form.Item name="experience" label="Experience">
          <Select options={moodOptions} />
        </Form.Item>
        <Form.Item name="date" label="Date">
          <DatePicker format="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default NewJournalModal;
