import React from 'react';
import {
    Apartment,
    AttachMoney,
    Blind,
    Business,
    Cabin,
  Castle,
  Cottage,
  CurrencyExchange,
  Face,
  Face2,
  Face3,
  Face4,
  Factory,
  Gite,
  Hail,
  Handyman,
  HolidayVillage,
  HomeWork,
  House,
  Inventory,
  LocationCity,
  Museum,
  OtherHouses,
  Paid,
  People,
  Person,
  PersonOutline,
  Store,
  Storefront,
  Wc,
  Woman,
} from '@mui/icons-material';

const UnitIcon = ({ iconName, styles }: any) => {
  let IconComponent = null;

  switch (iconName) {
    case 'Home':
      IconComponent = Cottage;
      break;   
    case 'Forest':
      IconComponent = Gite;
      break;   
    case 'Cabin':
      IconComponent = Cabin;
      break;   
    case 'Village':
      IconComponent = HolidayVillage;
      break;   
    case 'House':
      IconComponent = House;
      break;   
    case 'OtherHouses':
      IconComponent = OtherHouses;
      break;   
    case 'LocationCity':
      IconComponent = LocationCity;
      break;   
    case 'Business':
      IconComponent = Business;
      break;   
    case 'HomeWork':
      IconComponent = HomeWork;
      break;   
    case 'Apartment':
      IconComponent = Apartment;
      break;   
    case 'People':
      IconComponent = People;
      break;   
    case 'Person':
      IconComponent = Person;
      break;   
    case 'PersonOutline':
      IconComponent = PersonOutline;
      break;   
    case 'Blind':
      IconComponent = Blind;
      break;   
    case 'Wc':
      IconComponent = Wc;
      break;   
    case 'Hail':
      IconComponent = Hail;
      break;   
    case 'Face':
      IconComponent = Face;
      break;   
    case 'Face2':
      IconComponent = Face2;
      break;   
    case 'Face3':
      IconComponent = Face3;
      break;   
    case 'Face4':
      IconComponent = Face4;
      break;   
    case 'Castle':
      IconComponent = Castle;
      break;   
    case 'Factory':
      IconComponent = Factory;
      break;   
    case 'Woman':
      IconComponent = Woman;
      break;   
    case 'Handyman':
      IconComponent = Handyman;
      break;   
    case 'Storefront':
      IconComponent = Storefront;
      break;   
    case 'Store':
      IconComponent = Store;
      break;   
    case 'Museum':
      IconComponent = Museum;
      break;   
    case 'Inventory':
      IconComponent = Inventory;
      break;   
    case 'AttachMoney':
      IconComponent = AttachMoney;
      break;   
    case 'Paid':
      IconComponent = Paid;
      break;   
    case 'CurrencyExchange':
      IconComponent = CurrencyExchange;
      break;   
    default:
      return null;
  }

  return (
    <IconComponent style={styles} />
  );
};

export const UnitIconsList = [
  'Home',
  'Forest',
  'Cabin',
  'Village',
  'House',
  'OtherHouses',
  'LocationCity',
  'Business',
  'HomeWork',
  'Apartment',
  'People',
  'HomeWork',
  'Person',
  'PersonOutline',
  'Blind',
  'Wc',
  'Hail',
  'Face',
  'Face2',
  'Face3',
  'Face4',
  'Castle',
  'Factory',
  'Woman',
  'Handyman',
  'Storefront',
  'Store',
  'Museum',
  'Inventory',
  'AttachMoney',
  'Paid',
  'CurrencyExchange',
];

export default UnitIcon;