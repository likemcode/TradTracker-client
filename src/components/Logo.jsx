import React from 'react';
import { Avatar } from 'antd';
import { SlidersOutlined} from '@ant-design/icons';

const Logo = () => {
  return (
    <div className='logo-container' style={{ display: 'flex', alignItems: 'center', marginTop:'15px', marginLeft:'15px' }}>
      <Avatar style={{ backgroundColor: 'rgba(70, 149, 252, 0.900)' }} icon={<SlidersOutlined />} />
      <h3 style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }} className='logo-title'>TradeTracker</h3>
    </div>
  );
};

export default Logo;
