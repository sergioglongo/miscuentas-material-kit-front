import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBuildingColumns,
    faCloudArrowUp,
    faCommentDollar,
    faCreditCard,
    faCreditCardAlt,
    faDollarSign,
    faEuroSign,
    faMoneyBill,
    faMoneyBillTransfer,
    faMoneyBillWave,
    faS,
    faU
} from '@fortawesome/free-solid-svg-icons';
import { Box } from '@mui/material';

const AccountIcon = ({ iconName, styles }: any) => {
    let iconLabel = null;

    switch (iconName) {
        case 'Pesos':
            iconLabel = faDollarSign;
            break;
        case 'Dolar':
            return (
                <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
                    <FontAwesomeIcon icon={faU} size='1x'/>
                    <FontAwesomeIcon icon={faDollarSign} size='lg' />
                    <FontAwesomeIcon icon={faS} size='1x' />
                </Box>
            )
        case 'Euro':
            iconLabel = faEuroSign;
            break;
        case 'bank':
            iconLabel = faBuildingColumns;
            break;
        case 'cash':
            iconLabel = faMoneyBillWave;
            break;
        case 'electronic':
            iconLabel = faCloudArrowUp;
            break;
        case 'debt':
            iconLabel = faCreditCard;
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

export const AccountIconsList = [
    'credit',
    'debit',
    'cash',
    'transfer',
    'other'
];

export default AccountIcon;