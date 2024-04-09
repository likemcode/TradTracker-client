import React, { useState } from 'react';
import { Avatar, List, Button, Spin, Tag, Flex, Card } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';
import NewJournalModal from './NewJournalModal';
import { SmileTwoTone, FrownTwoTone, MehTwoTone } from '@ant-design/icons'; // Import emoji icons
import moment from 'moment';

// add Row and Column (Row, Col from ant-design)

const Journal = () => {
  const { data: journals, error, isLoading } = useGetJournalListQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateJournal = (values) => {
    const { title, symbol, buySell, experience, date } = values;
    const newId = journals.length > 0 ? Math.max(...journals.map(journal => journal.id)) + 1 : 1;
    // Perform action to create new journal entry with the provided title
    console.log('Creating journal entry with title:', title);
    setModalVisible(false); // Close the modal after creating the entry

    navigate(`/JournalDetails/${newId}`, { state: { ...values, date: date.format('YYYY-MM-DD') } });
  };

  if (isLoading) {
    return <div><Spin /></div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const itemContentTruncated = (content) => {
    
    
  
    // Truncate to the first 30 characters
    const truncatedContent = sanitizedContent.slice(0, 30);
  
    return truncatedContent;
  };

  return (
    <div>
      {/* Button to add new journal entry */}
      <NewJournalModal
        visible={modalVisible}
        onCreate={handleCreateJournal}
        onCancel={() => setModalVisible(false)}
      />
      <List
        header={<Flex justify="space-between"  style={{ margin: '16px' }}> 
                  <h3>My Trading Journal 📝</h3> 
                  <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setModalVisible(true)}>
                    Add Journal
                  </Button> 
                </Flex>}
        itemLayout="horizontal"
        dataSource={journals}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="journal-item" onClick={() => navigate(`/journalDetails/${item.id}`)}>
  <Card
    style={{ width: '100%', marginBottom: '16px', cursor: 'pointer' }} // Removed padding
  >
    <List.Item.Meta
      avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />} // Consider adding a fallback for the avatar
      title={<Link to={`/journalDetails/${item.id}`}>{item.title}</Link>}
      description={<div dangerouslySetInnerHTML={{ __html: item.content }} />}
    />
    <List.Item.Meta
      description={
        <Flex justify="space-between" align="middle" wrap="wrap">
          <div>
            <p><strong>Symbol:</strong> {item.symbol}</p>
            <Tag color={item.buy_or_sell === 'buy' ? '#108ee9' : '#f50'}>{item.buy_or_sell}</Tag>
          </div>
          <div>
            <div>
              {item.experience === 'happy' && <SmileTwoTone twoToneColor='#6dd142' style={{ fontSize: '20px' }} />}
              {item.experience === 'neutral' && <MehTwoTone twoToneColor='b0bfaa' style={{ fontSize: '20px' }} />}
              {item.experience === 'sad' && <FrownTwoTone twoToneColor='#d33024' style={{ fontSize: '20px' }} />}
            </div>
          </div>
          <div>
            <p><strong>Date:</strong> {moment(item.date).format('MMMM Do, YYYY')}</p>
          </div>
        </Flex>
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
