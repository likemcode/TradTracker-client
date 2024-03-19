import React, {useState} from 'react';
import { Avatar, List, Button } from 'antd';
import { useNavigate } from 'react-router-dom';
import { Link} from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';
import NewJournalModal from './NewJournalModal';

const Journal = () => {
  const { data: journals, error, isLoading } = useGetJournalListQuery();
  const [modalVisible, setModalVisible] = useState(false);
  const navigate = useNavigate();

  const handleCreateJournal = title => {
   const newId = journals.length > 0 ? Math.max(...journals.map(journal => journal.id)) + 1 : 1;
   // Perform action to create new journal entry with the provided title
   console.log('Creating journal entry with title:', title);
   setModalVisible(false); // Close the modal after creating the entry
   
   navigate(`/JournalDetails/${newId}`,  { state: { title } });
 };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  
  console.log(journals)
  return (
   <div>
   {/* Button to add new journal entry */}
   <Button type="primary" style={{ marginBottom: '16px' }} onClick={() => setModalVisible(true)}>
      Add Journal
   </Button>
 
   <NewJournalModal
        visible={modalVisible}
        onCreate={handleCreateJournal}
        onCancel={() => setModalVisible(false)}
   />
    <List
      itemLayout="horizontal"
      dataSource={journals}
      renderItem={(item, index) => (
        <List.Item key={index}>
          <List.Item.Meta
            avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
            title={<Link to={`/journalDetails/${item.id}`}>{item.title}</Link>}
            description={item.created_at}
          />
        </List.Item>
      )}
    />
    </div>
  );
};

export default Journal;
