import React from 'react';
import {
AccountBalance,  Agriculture,  AirportShuttle,  Apartment,  Article,
  Audiotrack,  BeachAccess,  Build,  CalendarMonth,  CardGiftcard,  ChildFriendly,
  CloudQueue,  Construction,  Cottage,  CurrencyBitcoin,  Dining,  DirectionsSubway,
  DoneOutline,  DriveEta,  ElectricBolt,  Face,  Face3,  FamilyRestroom,  Flight,
  FreeBreakfast,  Group,  HealthAndSafety,  Hotel,  Icecream,  InsertEmoticon,  Inventory,
  LocalBar,  LocalCafe,  LocalGroceryStore,  LocalHospital,  LocalTaxi,  Man,  MedicalServices,
  Medication,  Notifications,  Paid,  PhoneIphone,  Recycling,  Savings,  School,  Science,
  Search,  SmartDisplay,  SportsBar,  SportsSoccer,  StarOutline,  Store,  Storefront,
  ThumbUp,  Tv,  TwoWheeler,  Vaccines,  Woman,  Work
} from '@mui/icons-material';

const CategoryIcon = ({ iconName, styles }: any) => {
  let IconComponent = null;

  switch (iconName) {
    case 'Home':
      IconComponent = Cottage;
      break;   
    case 'Market':
      IconComponent = LocalGroceryStore;
      break;   
    case 'Store':
      IconComponent = Storefront;
      break;   
    case 'Store2':
      IconComponent = Store;
      break;   
    case 'Medication':
      IconComponent = Medication;
      break;   
    case 'Hospital':
      IconComponent = LocalHospital;
      break;   
    case 'Vaccines':
      IconComponent = Vaccines;
      break;   
    case 'Medic':
      IconComponent = MedicalServices;
      break;   
    case 'Bank':
      IconComponent = AccountBalance;
      break;   
    case 'Agriculture':
      IconComponent = Agriculture;
      break;   
    case 'Bus':
      IconComponent = AirportShuttle;
      break;   
    case 'Apartment':
      IconComponent = Apartment;
      break;   
    case 'Docs':
      IconComponent = Article;
      break;   
    case 'Music':
      IconComponent = Audiotrack;
      break;   
    case 'Beach':
      IconComponent = BeachAccess;
      break;   
    case 'Build':
      IconComponent = Build;
      break;   
    case 'Calendar':
      IconComponent = CalendarMonth;
      break;   
    case 'Gift':
      IconComponent = CardGiftcard;
      break;   
    case 'Baby':
      IconComponent = ChildFriendly;
      break;   
    case 'Cloud':
      IconComponent = CloudQueue;
      break;   
    case 'Construction':
      IconComponent = Construction;
      break;   
    case 'Bitcoin':
      IconComponent = CurrencyBitcoin;
      break;   
    case 'Dining':
      IconComponent = Dining;
      break;   
    case 'Subway':
      IconComponent = DirectionsSubway;
      break;   
    case 'Done':
      IconComponent = DoneOutline;
      break;   
    case 'Car':
      IconComponent = DriveEta;
      break;   
    case 'Electric':
      IconComponent = ElectricBolt;
      break;   
    case 'Face':
      IconComponent = Face;
      break;   
    case 'Face3':
      IconComponent = Face3;
      break;   
    case 'Family':
      IconComponent = FamilyRestroom;
      break;   
    case 'Flight':
      IconComponent = Flight;
      break;   
    case 'Coffe':
      IconComponent = FreeBreakfast;
      break;   
    case 'Group':
      IconComponent = Group;
      break;   
    case 'Safety':
      IconComponent = HealthAndSafety;
      break;   
    case 'Hotel':
      IconComponent = Hotel;
      break;   
    case 'Icecream':
      IconComponent = Icecream;
      break;   
    case 'Smile':
      IconComponent = InsertEmoticon;
      break;   
    case 'Box':
      IconComponent = Inventory;
      break;   
    case 'Bar':
      IconComponent = LocalBar;
      break;   
    case 'Cafe':
      IconComponent = LocalCafe;
      break;   
    case 'Taxi':
      IconComponent = LocalTaxi;
      break;   
    case 'Man':
      IconComponent = Man;
      break;   
    case 'Notifications':
      IconComponent = Notifications;
      break;   
    case 'Paid':
      IconComponent = Paid;
      break;   
    case 'Phone':
      IconComponent = PhoneIphone;
      break;   
    case 'Recycling':
      IconComponent = Recycling;
      break;   
    case 'School':
      IconComponent = School;
      break;   
    case 'Savings':
      IconComponent = Savings;
      break;   
    case 'Science':
      IconComponent = Science;
      break;   
    case 'Search':
      IconComponent = Search;
      break;   
    case 'Youtube':
      IconComponent = SmartDisplay;
      break;   
    case 'Chop':
      IconComponent = SportsBar;
      break;   
    case 'Soccer':
      IconComponent = SportsSoccer;
      break;   
    case 'Star':
      IconComponent = StarOutline;
      break;   
    case 'ThumbUp':
      IconComponent = ThumbUp;
      break;   
    case 'Tv':
      IconComponent = Tv;
      break;   
    case 'Motorcycle':
      IconComponent = TwoWheeler;
      break;   
    case 'Woman':
      IconComponent = Woman;
      break;   
    case 'Work':
      IconComponent = Work;
      break;   
    default:
      return null;
  }

  return (
    <IconComponent style={styles} />
  );
};

export const CategoryIconsList = [
  'Home',
  'Market',
  'Store',
  'Store2',
  'Medication',
  'Hospital',
  'Vaccines',
  'Medic',
  'Bank',
  'Agriculture',
  'Bus',
  'Apartment',
  'Docs',
  'Music',
  'Beach',
  'Build',
  'Calendar',
  'Gift',
  'Baby',
  'Cloud',
  'Construction',
  'Bitcoin',   
  'Dining',
  'Subway',
  'Done',
  'Car',
  'Electric',
  'Face',
  'Face3',
  'Family',
  'Flight',
  'Coffe',
  'Group',
  'Safety',
  'Hotel',
  'Icecream',
  'Smile',
  'Box',
  'Bar',
  'Cafe',
  'Taxi',
  'Man',
  'Notifications',
  'Paid',
  'Phone',
  'Recycling',
  'School',
  'Savings',
  'Science',
  'Search',
  'Youtube',
  'Chop',
  'Soccer',
  'Star',
  'ThumbUp',
  'Tv',
  'Motorcycle',
  'Woman',
  'Work',
];

export default CategoryIcon;