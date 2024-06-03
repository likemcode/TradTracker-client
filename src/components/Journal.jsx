import React, { useState } from 'react';
import { Avatar, List, Button, Tag, Flex, Card, Row, Col, message, Typography, Popconfirm } from 'antd';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';
import NewJournalModal from './NewJournalModal';
import { SmileTwoTone, FrownTwoTone, MehTwoTone, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import moment from 'moment';

const { Paragraph } = Typography;

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
  const { data: journals, error, isLoading, refetch } = useGetJournalListQuery();
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
      <List
        header={
          <Flex justify="space-between" align="middle" style={{ margin: '16px' }}>
            <Typography.Title level={4} style={{ margin: 0 }}>My Trading Journal 📝</Typography.Title>
            <Button type="primary" onClick={() => setModalVisible(true)}>
              Add Journal
            </Button>
          </Flex>
        }
        itemLayout="vertical"
        dataSource={journals}
        renderItem={(item, index) => (
          <List.Item key={item.id}>
            <Card
              style={{ width: '100%', marginBottom: '16px', cursor: 'pointer' }}
              actions={[
                <EditOutlined key="edit" onClick={() => navigate(`/journalDetails/${item.id}`)} />,
                <Popconfirm
                  title="Are you sure you want to delete this journal entry?"
                  onConfirm={() => deleteInstance(item.id)}
                  okText="Yes"
                  cancelText="No"
                >
                  <DeleteOutlined key="delete" />
                </Popconfirm>,
              ]}
            >
              <Card.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
                title={<Link to={`/journalDetails/${item.id}`}>{item.title}</Link>}
                description={
                  <>
                    <Paragraph ellipsis={{ rows: 2 }}>{processContent(item.content).text}</Paragraph>
                    <Row gutter={16}>
                      <Col>
                        <Tag color={item.buy_or_sell === 'buy' ? 'success' : 'error'}>{item.buy_or_sell.toUpperCase()}</Tag>
                      </Col>
                      <Col>
                        {item.experience === 'happy' && <SmileTwoTone twoToneColor="#52c41a" />}
                        {item.experience === 'neutral' && <MehTwoTone twoToneColor="#d9d9d9" />}
                        {item.experience === 'sad' && <FrownTwoTone twoToneColor="#f5222d" />}
                      </Col>
                      <Col>
                        <Typography.Text type="secondary">{moment(item.date).format('MMMM Do, YYYY')}</Typography.Text>
                      </Col>
                    </Row>
                  </>
                }
              />
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default Journal;