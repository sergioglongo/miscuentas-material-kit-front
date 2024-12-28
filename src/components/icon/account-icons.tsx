import React from 'react';
import {
    AccountBalance,
    AttachMoney,
    CreditCard,
    Euro,
    FolderShared,
    Home,
    LocalAtm,
    MoneyOff,
    Wallet,
} from '@mui/icons-material';

const AccountIcon = ({ iconName, styles }: any) => {
  let IconComponent = null;

  switch (iconName) {
    case 'Pesos':
      IconComponent = LocalAtm;
      break;
    case 'Dolar':
      IconComponent = AttachMoney;
      break;
    case 'Euro':
      IconComponent = Euro;
      break;
    case 'bank':
      IconComponent = AccountBalance;
      break;
    case 'cash':
      IconComponent = Wallet;
      break;
    case 'electronic':
      IconComponent = CreditCard;
      break;
    case 'debt':
      IconComponent = MoneyOff;
      break;
    case 'other':
      IconComponent = FolderShared;
      break;
    default:
      return null;
  }

  return (
    <IconComponent style={styles} />
  );
};


export default AccountIcon;
