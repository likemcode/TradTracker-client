import React, { useState } from 'react';
import { Card, Collapse } from 'antd';

const { Panel } = Collapse;

const CollapsibleCard = ({ title, children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Card
      title={title}
      extra={<span onClick={toggleCollapse}>{collapsed ? 'Expand' : 'Collapse'}</span>}
    >
      <Collapse bordered={false} activeKey={collapsed ? [] : ['1']}>
        <Panel key="1">
          {children}
        </Panel>
      </Collapse>
    </Card>
  );
};

export default CollapsibleCard;
