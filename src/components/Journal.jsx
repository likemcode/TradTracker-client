import React, { useState } from 'react';
import { Avatar, List, Button, Tag, Flex, Card, Row, Col, message } from 'antd';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';
import NewJournalModal from './NewJournalModal';
import { SmileTwoTone, FrownTwoTone, MehTwoTone, DeleteOutlined } from '@ant-design/icons'; // Import emoji icons
import moment from 'moment';
import DeleteConfirmationModal from './DeleteConfirmationModal';

const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

const extractText = (htmlContent) => {
  const withoutTags = htmlContent.replace(/<[^>]*>/g, '');
  const normalizedText = withoutTags.replace(/\s+/g, ' ');
  return normalizedText;
};

const extractImageUrls = (htmlContent) => {
  const imageUrls = [];
  const imageRegex = /<img[^>]*src="([^"]+)"\s*\/?>/g;
  let match;
  while ((match = imageRegex.exec(htmlContent)) !== null) {
    imageUrls.push(match[1]);
  }
  return imageUrls;
};

const processContent = (htmlContent) => {
  const plainText = extractText(htmlContent);
  const imageUrls = extractImageUrls(htmlContent);
  const truncatedText = truncateText(plainText, 100);
  return {
    text: truncatedText,
    images: imageUrls,
  };
};

const Journal = () => {
  const { data: journals, error, isLoading , refetch } = useGetJournalListQuery();
  const [deleteModalVisible, setDeleteModalVisible] = useState(false); // State for delete confirmation modal
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateJournal = (values) => {
    const { title, symbol, buySell, experience, date } = values;
    const newId = journals.length > 0 ? Math.max(...journals.map(journal => journal.id)) + 1 : 1;
    console.log('Creating journal entry with title:', title);
    setModalVisible(false);

    navigate(`/JournalDetails/${newId}`, { state: { ...values, date: date.format('YYYY-MM-DD') } });
  };

  const deleteInstance = async (entryId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await fetch(`http://127.0.0.1:8000/backend/trades/journal_entry/${entryId}/`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${token}`,
        },
      });
      if (!response.ok) {
        throw new Error('Failed to delete journal entry');
      }
      message.success('Journal entry deleted successfully');
      refetch();
      // Optionally, you can update the state or perform any other actions after successful deletion
    } catch (error) {
      message.error('Error deleting journal entry:', error);
    }
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div>
      <NewJournalModal
        visible={modalVisible}
        onCreate={handleCreateJournal}
        onCancel={() => setModalVisible(false)}
      />
       <DeleteConfirmationModal
        visible={deleteModalVisible}
        onCancel={() => setDeleteModalVisible(false)}
        onConfirm={() => {
          deleteInstance(selectedEntryId);
          setDeleteModalVisible(false);
        }}
      />
      <List
        header={<Flex justify="space-between" style={{ margin: '16px' }}>
          <h3>My Trading Journal 📝</h3>
          <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setModalVisible(true)}>
            Add Journal
          </Button>
        </Flex>}
        itemLayout="horizontal"
        dataSource={journals}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="journal-item" 
            style={{ marginBottom: '4px' }}
          >
            <Card style={{ width: '100%', marginBottom: '4px', cursor: 'pointer', padding: '5px' }}>
              <Row>
                <Col span={1}>
                  <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />
                </Col>
                <Col span={8}>
                  <Row>
                    <Link to={`/journalDetails/${item.id}`}>{item.title}</Link>
                  </Row>
                  <Row>
                    {processContent(item.content).text}
                  </Row>
                </Col>
                <Col span={4}>
                  <p><strong>Symbol:</strong> {item.symbol}</p>
                </Col>
                <Col span={3}>
                  <Tag color={item.buy_or_sell === 'buy' ? '#108ee9' : '#f50'}>{item.buy_or_sell}</Tag>
                </Col>
                <Col span={2}>
                  <div>
                    {item.experience === 'happy' && <SmileTwoTone twoToneColor='#6dd142' style={{ fontSize: '20px' }} />}
                    {item.experience === 'neutral' && <MehTwoTone twoToneColor='b0bfaa' style={{ fontSize: '20px' }} />}
                    {item.experience === 'sad' && <FrownTwoTone twoToneColor='#d33024' style={{ fontSize: '20px' }} />}
                  </div>
                </Col>
                <Col span={5}>
                  <p><strong>Date:</strong> {moment(item.date).format('MMMM Do, YYYY')}</p>
                </Col>
                <Col span={1}>
                <DeleteOutlined onClick={() => {
                    setSelectedEntryId(item.id); // Set the selected entry id
                    setDeleteModalVisible(true); // Show the delete confirmation modal
                  }} />
                </Col>
              </Row>
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Journal;
