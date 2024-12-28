import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faBagShopping, faBolt, faBuilding, faCalculator, 
    faCartShopping, faCloud, faDollarSign, faGraduationCap, 
    faHeartPulse, faHouseUser, faMasksTheater, faMusic, faPiggyBank, faPlane, 
    faShield, faStore, faTaxi, faTruck, faUtensils } from '@fortawesome/free-solid-svg-icons'

const AreaIcon = ({ iconName, styles }: any) => {
  let iconLabel = null;

  switch (iconName) {
    case 'Home':
      iconLabel = faHouseUser;
      break;   
    case 'Building':
      iconLabel = faBuilding;
      break;   
    case 'Healt':
      iconLabel = faHeartPulse;
      break;   
    case 'Entertainment':
      iconLabel = faMasksTheater;
      break;   
    case 'Transport':
      iconLabel = faTaxi;
      break;   
    case 'Truck':
      iconLabel = faTruck;
      break;   
    case 'Flight':
      iconLabel = faPlane;
      break;   
    case 'Market':
      iconLabel = faCartShopping;
      break;   
    case 'Store':
      iconLabel = faStore;
      break;   
    case 'Shopping':
      iconLabel = faBagShopping;
      break;   
    case 'School':
      iconLabel = faGraduationCap;
      break;   
    case 'Baby':
      iconLabel = faBaby;
      break;   
    case 'Money':
      iconLabel = faDollarSign;
      break;   
    case 'Pig':
      iconLabel = faPiggyBank;
      break;   
    case 'Calculate':
      iconLabel = faCalculator;
      break;   
    case 'Cloud':
      iconLabel = faCloud;
      break;   
    case 'Electric':
      iconLabel = faBolt;
      break;   
    case 'Bars':
      iconLabel = faMusic;
      break;   
    case 'Dinner':
      iconLabel = faUtensils;
      break;   
    case 'Protect':
      iconLabel = faShield;
      break;   
    default:
      return null;
  }

  return (
    <FontAwesomeIcon icon={iconLabel} style={styles} />
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