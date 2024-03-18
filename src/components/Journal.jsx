import React from 'react';
import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';
import { useGetJournalListQuery } from '../services/BackendApi';

const Journal = () => {
  const { data: journals, error, isLoading } = useGetJournalListQuery();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
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
  );
};

export default Journal;
