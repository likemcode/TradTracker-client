import React, { useState } from 'react';
import { Modal, Button } from 'antd';

const DeleteConfirmationModal = ({ visible, onConfirm, onCancel }) => {
  return (
    <Modal
      title="Confirm Deletion"
      open={visible}
      onCancel={onCancel}
      footer={[
        <Button key="cancel" onClick={onCancel}>
          Cancel
        </Button>,
        <Button key="confirm" type="primary" onClick={onConfirm}>
          Confirm
        </Button>,
      ]}
    >
      <p>Are you sure you want to delete this journal entry?</p>
    </Modal>
  );
};

export default DeleteConfirmationModal;
