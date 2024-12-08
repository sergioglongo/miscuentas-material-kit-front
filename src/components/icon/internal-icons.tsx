import React from 'react';
import Home from '@mui/icons-material/Home';
import AirlineSeatReclineNormal from '@mui/icons-material/AirlineSeatReclineNormal';
import LocalShipping from '@mui/icons-material/LocalShipping';
import AssignmentTurnedIn from '@mui/icons-material/AssignmentTurnedIn';
import People from '@mui/icons-material/People';
import CurrencyExchange from '@mui/icons-material/CurrencyExchange';
import Garage from '@mui/icons-material/Garage';
import ExitToApp from '@mui/icons-material/ExitToApp';
import Person from '@mui/icons-material/Person';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import {
  Assignment, AssignmentLate, Cancel, DataSaverOn, Domain, EventBusy, FileOpen,
  Info,
  SvgIconComponent,
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
    case 'LocalShipping':
      IconComponent = LocalShipping;
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
    case 'Garage':
      IconComponent = Garage;
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
    case 'Vencido':
      IconComponent = EventBusy;
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
