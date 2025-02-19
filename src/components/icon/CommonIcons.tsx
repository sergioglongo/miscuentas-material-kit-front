import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { 
    faAddressCard,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowRotateLeft,
    faArrowRotateRight,
    faArrowUp,
    faBan,
    faBarcode,
    faBell,
    faBellSlash,
    faChartColumn,
    faChartLine,
    faChartPie,
    faCircleDown,
    faCircleLeft,
    faCircleRight,
    faCircleUp,
    faClone,
    faCodeCompare,
    faCopy,
    faCube,
    faCubes,
    faEye,
    faFile,
    faFileCircleCheck,
    faFileExport,
    faFileInvoice,
    faFileInvoiceDollar,
    faFolder,
    faFolderOpen,
    faGear,
    faGears,
    faHandHoldingDollar,
    faHouseUser,
    faList,
    faMagnifyingGlass,
    faMinusCircle,
    faMoneyBill,
    faMoneyBills,
    faMoneyBillTransfer,
    faMoneyCheck,
    faPenToSquare,
    faPlusCircle,
    faRightFromBracket,
    faScissors,
    faScrewdriverWrench,
    faSliders,
    faStar,
    faTrashCan,
    faUpRightFromSquare,
    faUser, 
    } from '@fortawesome/free-solid-svg-icons'

const CommonIcon = ({ iconName, styles }: any) => {
  let iconLabel = null;

  switch (iconName) {
    case 'Home':
      iconLabel = faHouseUser;
      break;   
    case 'View':
      iconLabel = faEye;
      break;   
    case 'Edit':
      iconLabel = faPenToSquare;
      break;   
    case 'DocumentOk':
      iconLabel = faFileCircleCheck;
      break;   
    case 'Document':
      iconLabel = faFile;
      break;   
    case 'Clone':
      iconLabel = faClone;
      break;   
    case 'Cut':
      iconLabel = faScissors;
      break;   
    case 'Copy':
      iconLabel = faCopy;
      break;   
    case 'Delete':
      iconLabel = faTrashCan;
      break;   
    case 'Adjust':
      iconLabel = faCodeCompare;
      break;   
    case 'Folder':
      iconLabel = faFolder;
      break;   
    case 'Export':
      iconLabel = faFileExport;
      break;   
    case 'FolderOpen':
      iconLabel = faFolderOpen;
      break;   
    case 'Invoice':
      iconLabel = faFileInvoice;
      break;   
    case 'InvoiceDollar':
      iconLabel = faFileInvoiceDollar;
      break;   
    case 'Plus':
      iconLabel = faPlusCircle;
      break;   
    case 'Minus':
      iconLabel = faMinusCircle;
      break;   
    case 'ArrowUp':
      iconLabel = faArrowUp;
      break;   
    case 'ArrowDown':
      iconLabel = faArrowDown;
      break;   
    case 'Arrowleft':
      iconLabel = faArrowLeft;
      break;   
    case 'ArrowRight':
      iconLabel = faArrowRight;
      break;   
    case 'SquareArrowRight':
      iconLabel = faUpRightFromSquare;
      break;   
    case 'Logout':
      iconLabel = faRightFromBracket;
      break;   
    case 'CircleUp':
      iconLabel = faCircleUp;
      break;   
    case 'CircleDown':
      iconLabel = faCircleDown;
      break;   
    case 'Circleleft':
      iconLabel = faCircleLeft;
      break;   
    case 'CircleRight':
      iconLabel = faCircleRight;
      break;   
    case 'RotateLeft':
      iconLabel = faArrowRotateLeft;
      break;   
    case 'RotateRight':
      iconLabel = faArrowRotateRight;
      break;   
    case 'Bell':
      iconLabel = faBell;
      break;   
    case 'BellSlash':
      iconLabel = faBellSlash;
      break;   
    case 'Search':
      iconLabel = faMagnifyingGlass;
      break;   
    case 'Profile':
      iconLabel = faUser;
      break;   
    case 'ProfileCard':
      iconLabel = faAddressCard;
      break;   
    case 'Config':
      iconLabel = faGear;
      break;   
    case 'Configs':
      iconLabel = faGears;
      break;   
    case 'Params':
      iconLabel = faSliders;
      break;   
    case 'Tools':
      iconLabel = faScrewdriverWrench;
      break;   
    case 'Bill':
      iconLabel = faMoneyBill;
      break;   
    case 'Bills':
      iconLabel = faMoneyBills;
      break;   
    case 'Cancel':
      iconLabel = faBan;
      break;   
    case 'List':
      iconLabel = faList;
      break;   
    case 'Star':
      iconLabel = faStar;
      break;   
    case 'Barcode':
      iconLabel = faBarcode;
      break;   
    case 'Area':
      iconLabel = faCube;
      break;   
    case 'Category':
      iconLabel = faCubes;
      break;   
    case 'Accounts':
      iconLabel = faAddressCard;
      break;   
    case 'PayMethods':
      iconLabel = faMoneyCheck;
      break;   
    case 'Transaction':
      iconLabel = faHandHoldingDollar;
      break;   
    case 'Transfers':
      iconLabel = faMoneyBillTransfer;
      break;   
    case 'ChartLine':
      iconLabel = faChartLine;
      break;   
    case 'ChartColumn':
      iconLabel = faChartColumn;
      break;   
    case 'ChartPie':
      iconLabel = faChartPie;
      break;   
    default:
      return null;
  }

  return (
    <FontAwesomeIcon icon={iconLabel} style={styles} />
  );
};

export const CommonIconsList = [
  'Home',
  'View',
  'Edit',
  'DocumentOk',
  'Document',
  'Clone',
  'Cut',
  'Copy',
  'Delete',
  'Folder',
  'Export',
  'FolderOpen',
  'Invoice',
  'InvoiceDollar',
  'Plus',
  'Minus',
  'ArrowUp',
  'ArrowDown',
  'Arrowleft',
  'ArrowRight',
  'SquareArrowRight',
  'Logout',
  'CircleUp',
  'CircleDown',
  'Circleleft',
  'CircleRight',
  'RotateLeft',
  'RotateRight',
  'Bell',
  'BellSlash',
  'Search',
  'Profile',
  'ProfileCard',
  'Config',
  'Configs',
  'Params',
  'Tools',
  'Bill',
  'Bills',
  'Cancel',
  'List',
  'Star',
  'Barcode',
  'Area',
  'Category',
  'Accounts',
  'PayMethods',
  'Transaction',
  'Transfers',
  'ChartLine',
  'ChartColumn',
  'ChartPie',
];

export default CommonIcon;