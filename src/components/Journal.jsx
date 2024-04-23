import React, { useState } from 'react';
import { Avatar, List, Button, Tag, Flex, Card, Row , Col} from 'antd';
import Loader from './Loader';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';
import NewJournalModal from './NewJournalModal';
import { SmileTwoTone, FrownTwoTone, MehTwoTone } from '@ant-design/icons'; // Import emoji icons
import moment from 'moment';

// add Row and Column (Row, Col from ant-design)
const truncateText = (text, maxLength) => {
  if (text.length <= maxLength) {
    return text;
  }
  return `${text.slice(0, maxLength)}...`;
};

const extractText = (htmlContent) => {
  // Remove HTML tags
  const withoutTags = htmlContent.replace(/<[^>]*>/g, '');

  // Remove whitespace and multiple spaces
  const normalizedText = withoutTags.replace(/\s+/g, ' ');

  return normalizedText;
};

const extractImageUrls = (htmlContent) => {
  const imageUrls = [];

  // Regex to match <img> tags and extract src attribute
  const imageRegex = /<img[^>]*src="([^"]+)"\s*\/?>/g;

  let match;
  while ((match = imageRegex.exec(htmlContent)) !== null) {
    imageUrls.push(match[1]); // Capture the image URL
  }

  return imageUrls;
};

const processContent = (htmlContent) => {
  const plainText = extractText(htmlContent);
  const imageUrls = extractImageUrls(htmlContent);
  const truncatedText = truncateText(plainText, 30);

  // Combine text and image URLs into a structured format
  const processedContent = {
    text: truncatedText,
    images: imageUrls,
  };

  return processedContent;
};



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
    return <Loader />;
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
          <List.Item key={item.id} className="journal-item" onClick={() => navigate(`/journalDetails/${item.id}`)}>
  <Card style={{ width: '100%', marginBottom: '4px', cursor: 'pointer' }}>
    <Row>
      <Col span={1}>
        <Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} /> {/* Consider adding a fallback for the avatar */}
      
      </Col>
      <Col span={6}>
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
        <Tag color={item.buy_or_sell === 'buy' ? '#108ee9' : '#f50'}>{item.buy_or_sell}</Tag></Col>
      <Col span={5}>
        <div>
          {item.experience === 'happy' && <SmileTwoTone twoToneColor='#6dd142' style={{ fontSize: '20px' }} />}
          {item.experience === 'neutral' && <MehTwoTone twoToneColor='b0bfaa' style={{ fontSize: '20px' }} />}
          {item.experience === 'sad' && <FrownTwoTone twoToneColor='#d33024' style={{ fontSize: '20px' }} />}
        </div>
      </Col>
      <Col span={5}>
        <p><strong>Date:</strong> {moment(item.date).format('MMMM Do, YYYY')}</p>
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
