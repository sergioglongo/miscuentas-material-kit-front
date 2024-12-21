import React from 'react';
import {
  Cottage, Apartment, Healing, TheaterComedy, DriveEta, LocalShipping, Flight,
  LocalGroceryStore, Store, ShoppingBag, School, ChildFriendly, AttachMoney, Savings,
  Calculate, CloudQueue, ElectricBolt, Equalizer, Flatware, GppGood
} from '@mui/icons-material';

const AreaIcon = ({ iconName, styles }: any) => {
  let IconComponent = null;

  switch (iconName) {
    case 'Home':
      IconComponent = Cottage;
      break;   
    case 'Building':
      IconComponent = Apartment;
      break;   
    case 'Healt':
      IconComponent = Healing;
      break;   
    case 'Entertainment':
      IconComponent = TheaterComedy;
      break;   
    case 'Trasport':
      IconComponent = DriveEta;
      break;   
    case 'Truck':
      IconComponent = LocalShipping;
      break;   
    case 'Flight':
      IconComponent = Flight;
      break;   
    case 'Market':
      IconComponent = LocalGroceryStore;
      break;   
    case 'Store':
      IconComponent = Store;
      break;   
    case 'Shopping':
      IconComponent = ShoppingBag;
      break;   
    case 'School':
      IconComponent = School;
      break;   
    case 'Baby':
      IconComponent = ChildFriendly;
      break;   
    case 'Money':
      IconComponent = AttachMoney;
      break;   
    case 'Pig':
      IconComponent = Savings;
      break;   
    case 'Calculate':
      IconComponent = Calculate;
      break;   
    case 'Cloud':
      IconComponent = CloudQueue;
      break;   
    case 'Electric':
      IconComponent = ElectricBolt;
      break;   
    case 'Bars':
      IconComponent = Equalizer;
      break;   
    case 'Dinner':
      IconComponent = Flatware;
      break;   
    case 'Protect':
      IconComponent = GppGood;
      break;   
    default:
      return null;
  }

  return (
    <IconComponent style={styles} />
  );
};

export const AreaIconsList = [
  'Home',
  'Building',
  'Healt',
  'Entertainment',
  'Trasport',
  'Truck',
  'Flight',
  'Market',
  'Store',
  'Shopping',
  'School',
  'Baby',
  'Money',
  'Pig',
  'Calculate',
  'Cloud',
  'Electric',
  'Bars',
  'Dinner',
  'Protect'
];

export default AreaIcon;