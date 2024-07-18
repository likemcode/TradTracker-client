import React from 'react';
import { motion } from 'framer-motion';
import { SlidersFilled } from '@ant-design/icons';

const Logo = ({ collapsed }) => {
  return (
    <motion.div 
      className="flex items-center"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      style={{ marginTop: '15px', marginLeft: collapsed ? '15px' : '15px' }}
    >
      <motion.div 
        className={`w-8 h-8 flex items-center justify-center bg-blue-500 rounded-md ${
          collapsed ? 'avatar-collapsed' : 'avatar-expanded'
        }`}
        animate={{ marginLeft: collapsed ? '10px' : '0px' }}
        transition={{ duration: 0.3 }}
      >
        <SlidersFilled  className="text-xl  text-white" />
      </motion.div>
      {!collapsed && (
        <motion.h3 
          className="text-xl font-semibold text-gray-900 ml-2"
          initial={{ opacity: 0, width: 0 }}
          animate={{ opacity: 1, width: 'auto' }}
          transition={{ duration: 0.3 }}
        >
          Trade<span className="text-blue-500">Tracker</span>
        </motion.h3>
      )}
    </motion.div>
  );
};

export default Logo;