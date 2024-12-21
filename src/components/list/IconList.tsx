import { Button } from '@mui/material';
import React from 'react';
import { Iconify } from '../iconify';
import AreaIcon from '../icon/area-icons';

const IconList = ({ icons, width, height, separation, onSelectIcon }:any) => {
  const styles:any = {
    container: {
      display: 'flex',
      flexWrap: 'wrap',
      width,
      height,
      justifyContent: 'space-around',
    },
    icon: {
        width: 'auto',
        height: 'auto',
        margin: separation,
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    },
  };

  return (
    <div style={styles.container}>
      {icons.map((icon:any, index:any) => (
        <Button key={index} style={styles.icon} onClick={() => onSelectIcon(icon)}>
          {/* <Iconify icon={icon} /> */}
          <AreaIcon iconName={icon} />
        </Button>
      ))}
    </div>
  );
};

export default IconList;