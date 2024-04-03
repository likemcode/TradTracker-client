import React, { useState } from 'react';
import { Avatar, List, Button, Spin, Tag, Flex, Row, Col } from 'antd';
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
    
    setModalVisible(false); 

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
        header={<Flex justify="space-between"  style={{ margin: '16px' }}> 
                  <h3>My Trading Journal 📝</h3> 
                  <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setModalVisible(true)}>
                    Add Journal
                  </Button> 
                </Flex>}
        itemLayout="horizontal"
        dataSource={journals}
        renderItem={(item, index) => (
          <List.Item key={item.id} className="journal-item" style={{ padding: '16px' }} onClick={() => navigate(`/journalDetails/${item.id}`)}>
            <Row gutter={16}>
               
                <Col style={{width:'5%',}} ><Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`}/></Col>
                
                <Col style={{width:'40%',}}>
                    <Flex vertical='true'>
                        <p>{item.title}</p>
                        <div dangerouslySetInnerHTML={{ __html: item.content }}/>
                    </Flex>
                </Col>
                
                <Col style={{width:'15%',}}><p><strong>Symbol:</strong> {item.symbol}</p></Col>
                <Col style={{width:'10%',}}><Tag color={item.buy_or_sell === 'buy' ? '#108ee9' : '#f50'}>{item.buy_or_sell}</Tag></Col>
                <Col style={{width:'10%',}}>
                    <div>
                        {item.experience === 'happy' && <SmileTwoTone twoToneColor='#6dd142' style={{ fontSize: '20px' }} />}
                        {item.experience === 'neutral' && <MehTwoTone twoToneColor='b0bfaa' style={{  fontSize: '20px' }} />}
                        {item.experience === 'sad' && <FrownTwoTone twoToneColor='#d33024' style={{ fontSize: '20px' }} />}
                    </div>
                </Col>
                <Col style={{width:'20%',}}><p><strong>Date:</strong> {moment(item.date).format('MMMM Do, YYYY')}</p></Col>
                
            </Row>
            
            
             
            {/* <List.Item.Meta
              style={{ marginLeft: '16px' }}
              description={
                <Flex justify="space-between" align="middle" wrap="wrap">
                  <div style={{ marginLeft: '16px' }}>
                  
                  </div>
                </Flex>
              }
            /> */}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Journal;
