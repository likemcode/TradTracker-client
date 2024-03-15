import React from 'react';
import { Avatar, List } from 'antd';
import { Link } from 'react-router-dom';

const data = [
 {
    title: 'Ant Design Title 1',
 },
 {
    title: 'Ant Design Title 2',
 },
 {
    title: 'Ant Design Title 3',
 },
 {
    title: 'Ant Design Title 4',
 },
];

const Journal = () => (
 <List
    itemLayout="horizontal"
    dataSource={data}
    renderItem={(item, index) => (
      <List.Item
        key={index}
      >
        <List.Item.Meta
          avatar={<Avatar src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${index}`} />}
          title={<Link to={`/journalDetails/${index + 1}`}>{item.title}</Link>}
          description="Ant Design, a design language for background applications, is refined by Ant UED Team"
        />
      </List.Item>
    )}
 />
);

export default Journal;
