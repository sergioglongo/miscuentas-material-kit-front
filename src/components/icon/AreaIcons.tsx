import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBaby, faBagShopping, faBasketball, faBasketShopping, faBolt, faBook, faBuilding, 
    faBuildingColumns, faBurger, faBus, faCalculator, faCar, 
    faCartShopping, faChartPie, faChurch, faCity, faClock, faCloud, faCouch, faDollarSign, 
    faFishFins, faGift, faGraduationCap, faHeart, 
    faHeartPulse, faHouseUser, faListCheck, faMasksTheater, faMugSaucer, faMusic, faPaw, 
    faPersonDigging, faPersonRunning, faPiggyBank, faPlane, faRecycle, 
    faShield, faShirt, faSplotch, faStore, faSuitcaseMedical, faTruck, faUsers, faUserSecret, faUtensils, 
    faWheelchair, 
    faWrench} from '@fortawesome/free-solid-svg-icons'
import { faBtc } from '@fortawesome/free-brands-svg-icons';

const AreaIcon = ({ iconName, styles }: any) => {
  let iconLabel = null;

  switch (iconName) {
    case 'Home':
      iconLabel = faHouseUser;
      break;   
    case 'Building':
      iconLabel = faBuilding;
      break;   
    case 'City':
      iconLabel = faCity;
      break;   
    case 'Health':
      iconLabel = faHeartPulse;
      break;   
    case 'Medic':
      iconLabel = faSuitcaseMedical;
      break;   
    case 'Athletic':
      iconLabel = faPersonRunning;
      break;   
    case 'Sport':
      iconLabel = faBasketball;
      break;   
    case 'Entertainment':
      iconLabel = faMasksTheater;
      break;   
    case 'Transport':
      iconLabel = faCar;
      break;   
    case 'Bus':
      iconLabel = faBus;
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
    case 'Minimarket':
      iconLabel = faBasketShopping;
      break;   
    case 'Burguer':
      iconLabel = faBurger;
      break;   
    case 'Shopping':
      iconLabel = faBagShopping;
      break;   
    case 'Dress':
      iconLabel = faShirt;
      break;   
    case 'Gift':
      iconLabel = faGift;
      break;   
    case 'Coffe':
      iconLabel = faMugSaucer;
      break;   
    case 'School':
      iconLabel = faGraduationCap;
      break;   
    case 'Book':
      iconLabel = faBook;
      break;
    case 'Church':
      iconLabel = faChurch;
      break;   
    case 'Pet':
      iconLabel = faPaw;
      break;   
    case 'Fish':
      iconLabel = faFishFins;
      break;   
    case 'Baby':
      iconLabel = faBaby;
      break;   
    case 'Heart':
      iconLabel = faHeart;
      break;   
    case 'People':
      iconLabel = faUsers;
      break;   
    case 'WheelChair':
      iconLabel = faWheelchair;
      break;   
    case 'Money':
      iconLabel = faDollarSign;
      break;   
    case 'Bank':
      iconLabel = faBuildingColumns;
      break;
    case 'Bitcoin':
      iconLabel = faBtc;
      break;
    case 'Chart':
      iconLabel = faChartPie;
      break;
    case 'Pig':
      iconLabel = faPiggyBank;
      break;   
    case 'Calculate':
      iconLabel = faCalculator;
      break;   
    case 'List':
      iconLabel = faListCheck;
      break;   
    case 'Secret':
      iconLabel = faUserSecret;
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
    case 'Construction':
      iconLabel = faPersonDigging;
      break;   
    case 'Furniture':
      iconLabel = faCouch;
      break;   
    case 'Tools':
      iconLabel = faWrench;
      break;   
    case 'Recycle':
      iconLabel = faRecycle;
      break;   
    case 'Clock':
      iconLabel = faClock;
      break;   
    case 'Star':
      iconLabel = faSplotch;
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
  'City',
  'Health',
  'Medic',
  'Athletic',
  'Sport',
  'Entertainment',
  'Transport',
  'Bus',
  'Truck',
  'Flight',
  'Market',
  'Store',
  'Minimarket',
  'Burguer',
  'Coffe',
  'Dinner',
  'Shopping',
  'Dress',
  'Gift',
  'School',
  'Book',
  'Church',
  'Baby',
  'Pet',
  'Fish',
  'Heart',
  'People',
  'WheelChair',
  'Money',
  'Bank',
  'Bitcoin',
  'Chart',
  'Pig',
  'Calculate',
  'List',
  'Secret',
  'Cloud',
  'Electric',
  'Bars',
  'Protect',
  'Construction',
  'Furniture',
  'Tools',
  'Recycle',
  'Clock',
  'Star',
];

export default AreaIcon;