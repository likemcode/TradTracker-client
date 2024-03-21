import React, { useState } from 'react';
import { Avatar, List, Button, Spin, Tag, Flex } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';
import NewJournalModal from './NewJournalModal';
import { SmileOutlined, FrownOutlined, MehOutlined } from '@ant-design/icons'; // Import emoji icons

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

  return (
    <div>
      {/* Button to add new journal entry */}
      <NewJournalModal
        visible={modalVisible}
        onCreate={handleCreateJournal}
        onCancel={() => setModalVisible(false)}
      />
      <List
        header={<div> <p>My Trading Journal 📝</p> <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setModalVisible(true)}>
          Add Journal
        </Button> </div>}
        itemLayout="horizontal"
        dataSource={journals}
        renderItem={(item, index) => (
          <List.Item key={index}>
            <List.Item.Meta
              avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
              title={<Link to={`/journalDetails/${item.id}`}>{item.title}</Link>}
              description={
                <div style={{ display: 'grid', gridTemplateColumns: 'auto auto', alignItems: 'center', gap: '8px' }}>
                  <Flex>
                  <div>
                    
                    <p><strong>Symbol:</strong> {item.symbol}</p>
                    <Tag color={item.buy_or_sell === 'buy' ? '#108ee9' : '#f50'}>{item.buy_or_sell}</Tag>
                  </div>
                  <div>
                    <p><strong>Experience:</strong></p>
                    <div>
                      {item.experience === 'happy' && <SmileOutlined style={{ color: 'green' }} />}
                      {item.experience === 'neutral' && <MehOutlined style={{ color: 'grey' }} />}
                      {item.experience === 'sad' && <FrownOutlined style={{ color: 'red' }} />}
                    </div>
                  </div>
                  <div>
                    <p><strong>Date:</strong> {item.date}</p>
                    <p><strong>Created At:</strong> {item.created_at}</p>
                  </div>
                  </Flex>
                </div>
              }
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Journal;
