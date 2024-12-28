import React from 'react';
import Home from '@mui/icons-material/Home';
import AirlineSeatReclineNormal from '@mui/icons-material/AirlineSeatReclineNormal';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import People from '@mui/icons-material/People';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Person from '@mui/icons-material/Person';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import {
  ArrowCircleDown,
  ArrowCircleUp,
  Assignment, AssignmentLate, AutoAwesomeMosaic, AutoAwesomeMotion, Cancel, CreditCard, DataSaverOn, DeleteForever, Domain, DownloadForOffline, Edit, EventBusy, FileOpen,
  Info,
  Outbound,
  Payments,
  Receipt,
  TableChart,
  Visibility,
  Warning
} from '@mui/icons-material';
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';

const InternalIcon = ({ iconName, styles }: any) => {
  let IconComponent = null;

  switch (iconName) {
    case 'Home':
      IconComponent = Home;
      break;
    case 'AirlineSeatReclineNormal':
      IconComponent = AirlineSeatReclineNormal;
      break;
    case 'View':
      IconComponent = Visibility;
      break;
    case 'Edit':
      IconComponent = Edit;
      break;
    case 'DocumentOk':
      IconComponent = AssignmentTurnedIn;
      break;
    case 'Document':
      IconComponent = Assignment;
      break;
    case 'Documents':
      IconComponent = FileOpen;
      break;
    case 'DocumentExclamation':
      IconComponent = AssignmentLate;
      break;
    case 'People':
      IconComponent = People;
      break;
    case 'CurrencyExchange':
      IconComponent = CurrencyExchange;
      break;
    case 'CircleChart':
      IconComponent = DonutSmallIcon;
      break;
    case 'CircleChartPlus':
      IconComponent = DataSaverOn;
      break;
    case 'StackChart':
      IconComponent = StackedBarChartIcon;
      break;
    case 'Area':
      IconComponent = AutoAwesomeMosaic;
      break;
    case 'Category':
      IconComponent = TableChart;
      break;
    case 'Accounts':
      IconComponent = Payments;
      break;
    case 'PayMethods':
      IconComponent = CreditCard;
      break;
    case 'Transactions':
      IconComponent = Receipt;
      break;
    case 'Delete':
      IconComponent = DeleteForever;
      break;
    case 'Bussines':
      IconComponent = Domain;
      break;
    case 'Info':
      IconComponent = Info;
      break;
    case 'Warning':
      IconComponent = Warning;
      break;
    case 'Cancel':
      IconComponent = Cancel;
      break;
    case 'ArrowDown':
      IconComponent = ArrowCircleDown;
      break;
    case 'ArrowUp':
      IconComponent = ArrowCircleUp;
      break;
    case 'ArrowUpRight':
      IconComponent = Outbound;
      break;
    case 'Download':
      IconComponent = DownloadForOffline;
      break;
    case 'Person':
      IconComponent = Person;
      break;
    case 'ExitToApp':
      IconComponent = ExitToApp;
      break;
    default:
      return null;
  }

  return (
    <IconComponent style={styles} />
  );
};


export default InternalIcon;
