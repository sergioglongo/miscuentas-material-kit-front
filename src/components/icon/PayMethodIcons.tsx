import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faCommentDollar,
    faCreditCard,
    faCreditCardAlt,
    faMoneyBill,
    faMoneyBillTransfer
} from '@fortawesome/free-solid-svg-icons';
import{faCreditCard as faCreditcardRegular} from '@fortawesome/free-regular-svg-icons';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

const PayMethodIcon = ({ iconName, styles }: any) => {
    let iconLabel = null;
    const debitIcon : IconProp = ['fas', 'credit-card']

    switch (iconName) {
        case 'credit':
            iconLabel = faCreditCard;
            break;
        case 'debit':
            iconLabel = faCreditcardRegular;
            break;
        case 'cash':
            iconLabel = faMoneyBill;
            break;
        case 'transfer':
            iconLabel = faMoneyBillTransfer;
            break;
        case 'other':
            iconLabel = faCommentDollar;
            break;
        default:
            return null;
    }

    return (
        <FontAwesomeIcon icon={iconLabel} style={styles} />
    );
};

export const PayMethodIconsList = [
    'credit',
    'debit',
    'cash',
    'transfer',
    'other'
  ];

export default PayMethodIcon;