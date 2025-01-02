import React from 'react';
import { Button } from '@mui/material';

const IconList = ({ icon, index, children, separation, onSelectIcon }: any) => {
  const styles: any = {
    icon: {
      margin: separation,
      boxShadow: '0px 0px 8px 0px rgba(0,0,0,0.1)',
    },
  };
  return (
      <Button key={index} style={styles.icon} onClick={() => onSelectIcon(icon)}>
        {children}
      </Button>
  );
};

export default IconList;