import React from 'react';
import {
    AccountBalance,
    AttachMoney,
    CreditCard,
    CreditScore,
    CurrencyExchange,
    Euro,
    FolderShared,
    Home,
    LocalAtm,
    MoneyOff,
    PriceChange,
    Wallet,
} from '@mui/icons-material';

const PayMethodIcon = ({ iconName, styles }: any) => {
  let IconComponent = null;

  switch (iconName) {
    case 'credit':
      IconComponent = CreditCard;
      break;
    case 'debit':
      IconComponent = CreditScore;
      break;
    case 'cash':
      IconComponent = Wallet;
      break;
    case 'transfer':
      IconComponent = CurrencyExchange;
      break;
    case 'other':
      IconComponent = PriceChange;
      break;
    default:
      return null;
  }

  return (
    <IconComponent style={styles} />
  );
};


export default PayMethodIcon;
