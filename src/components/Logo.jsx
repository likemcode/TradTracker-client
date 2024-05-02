import React from 'react';
import { Avatar } from 'antd';
import { SlidersTwoTone} from '@ant-design/icons';

const Logo = ({ collapsed }) => {
  return (
    <div className='logo-container' style={{ display: 'flex', alignItems: 'center', marginTop: '15px', marginLeft: '15px' }}>
      <Avatar className={collapsed ? 'avatar-collapsed' : 'avatar-expanded'} icon={<SlidersTwoTone />} />
      {!collapsed && <h3 style={{ marginLeft: '10px', fontSize: '17px', fontWeight: 'bold' }} className='logo-title'>TradeTracker</h3>}
    </div>
  );
};

export default Logo;
