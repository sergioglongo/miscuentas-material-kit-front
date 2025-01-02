import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faAppleWhole, faBaby, faBan, faBaseball, faBasketball, faBell, faBicycle,
    faBitcoinSign, faBolt, faBook, faBowlingBall, faBoxArchive, faBuilding, faBuildingColumns,
    faBurger, faBus, faCakeCandles, faCalendarDays, faCapsules, faCar, faCarRear, faCarrot, faCarSide,
    faCartShopping, faCashRegister, faCat, faChampagneGlasses, faChild, faChildDress, faChurch,
    faCircleCheck, faCircleUser, faCity, faCloud, faComment, faComments, faComputer, faCow, faDog,
    faDroplet, faDumbbell, faEnvelope, faFaceLaughBeam, faFaceSmile, faFaceSurprise, faFile, faFileInvoiceDollar, faFilm,
    faFire, faFishFins, faFlaskVial, faFootball, faFutbol, faGasPump, faGift, faGraduationCap,
    faHandHoldingDollar,
    faHeart, faHorse, faHospital, faHotel, faHourglass, faHouseChimney, faHouseSignal, faIceCream,
    faInfinity, faLaptop, faLightbulb, faList, faMagnifyingGlass, faMedal, faMessage, faMobileScreen,
    faMobileScreenButton, faMoneyBill1, faMoneyBills, faMoneyCheckDollar, faMotorcycle, faMugHot, faMusic, faPaintRoller, faPencil, faPeopleGroup,
    faPerson, faPersonDigging, faPersonDress, faPersonMilitaryRifle, faPersonPregnant, faPersonSwimming,
    faPersonWalking, faPhone, faPiggyBank, faPizzaSlice, faPlaneDeparture, faPlug, faPoo, faPrint,
    faReceipt,
    faRecycle, faRestroom, faRoad, faSchoolFlag, faScissors, faScrewdriverWrench, faShield, faShip,
    faShirt,
    faShop, faSmoking, faSpider, faStapler, faStar, faStarOfLife, faStethoscope, faStore, faSyringe,
    faTableTennis, faTaxi, faThumbsDown, faThumbsUp, faTowerCell, faTractor, faTrain, faTruck,
    faTruckPickup, faTv, faUmbrellaBeach, faUser, faUsers, faUserSecret, faUserShield, faUserTie,
    faUtensils, faWallet, faWheatAwn, faWheelchair, faWifi, faWineGlass
} from '@fortawesome/free-solid-svg-icons';
import {
    faAmazon, faApple, faEbay, faEthereum, faGoogle, faLinkedin, faMeta, faMicrosoft,
    faPlaystation, faSpotify, faYoutube
} from '@fortawesome/free-brands-svg-icons';


const CategoryIcon = ({ iconName, styles }: any) => {
    let iconLabel = null;


    switch (iconName) {
        case 'Home':
            iconLabel = faHouseChimney;
            break;
        case 'Market':
            iconLabel = faCartShopping;
            break;
        case 'Store':
            iconLabel = faShop;
            break;
        case 'Store2':
            iconLabel = faStore;
            break;
        case 'Medication':
            iconLabel = faCapsules;
            break;
        case 'Hospital':
            iconLabel = faHospital;
            break;
        case 'Vaccines':
            iconLabel = faSyringe;
            break;
        case 'Medic':
            iconLabel = faStethoscope;
            break;
        case 'Heart':
            iconLabel = faHeart;
            break;
        case 'Bank':
            iconLabel = faBuildingColumns;
            break;
        case 'Agriculture':
            iconLabel = faTractor;
            break;
        case 'Taxi':
            iconLabel = faTaxi;
            break;
        case 'Bus':
            iconLabel = faBus;
            break;
        case 'Apartment':
            iconLabel = faBuilding;
            break;
        case 'Flight':
            iconLabel = faPlaneDeparture;
            break;
        case 'Computer':
            iconLabel = faComputer;
            break;
        case 'Laptop':
            iconLabel = faLaptop;
            break;
        case 'Docs':
            iconLabel = faFile;
            break;
        case 'Book':
            iconLabel = faBook;
            break;
        case 'Music':
            iconLabel = faMusic;
            break;
        case 'Beach':
            iconLabel = faUmbrellaBeach;
            break;
        case 'City':
            iconLabel = faCity;
            break;
        case 'Church':
            iconLabel = faChurch;
            break;
        case 'Calendar':
            iconLabel = faCalendarDays;
            break;
        case 'Gift':
            iconLabel = faGift;
            break;
        case 'Birthday':
            iconLabel = faCakeCandles;
            break;
        case 'Party':
            iconLabel = faChampagneGlasses;
            break;
        case 'Baby':
            iconLabel = faBaby;
            break;
        case 'Wear':
            iconLabel = faShirt;
            break;
        case 'Cloud':
            iconLabel = faCloud;
            break;
        case 'Construction':
            iconLabel = faPersonDigging;
            break;
        case 'Tools':
            iconLabel = faScrewdriverWrench;
            break;
        case 'Paint':
            iconLabel = faPaintRoller;
            break;
        case 'Bitcoin':
            iconLabel = faBitcoinSign;
            break;
        case 'Dinner':
            iconLabel = faUtensils;
            break;
        case 'Burger':
            iconLabel = faBurger;
            break;
        case 'Coffee':
            iconLabel = faMugHot;
            break;
        case 'Subway':
            iconLabel = faTrain;
            break;
        case 'Ship':
            iconLabel = faShip;
            break;
        case 'Done':
            iconLabel = faCircleCheck;
            break;
        case 'Time':
            iconLabel = faHourglass;
            break;
        case 'List':
            iconLabel = faList;
            break;
        case 'Phone':
            iconLabel = faPhone;
            break;
        case 'Roas':
            iconLabel = faRoad;
            break;
        case 'Car':
            iconLabel = faCar;
            break;
        case 'Car2':
            iconLabel = faCarSide;
            break;
        case 'Car3':
            iconLabel = faCarRear;
            break;
        case 'Truck':
            iconLabel = faTruck;
            break;
        case 'Pickup':
            iconLabel = faTruckPickup;
            break;
        case 'Gas':
            iconLabel = faGasPump;
            break;
        case 'CashRegister':
            iconLabel = faCashRegister;
            break;
        case 'Electric':
            iconLabel = faBolt;
            break;
        case 'Light':
            iconLabel = faLightbulb;
            break;
        case 'Water':
            iconLabel = faDroplet;
            break;
        case 'Fire':
            iconLabel = faFire;
            break;
        case 'Internet':
            iconLabel = faHouseSignal;
            break;
        case 'Wifi':
            iconLabel = faWifi;
            break;
        case 'Tv':
            iconLabel = faTv;
            break;
        case 'CellService':
            iconLabel = faTowerCell;
            break;
        case 'SecureService':
            iconLabel = faUserShield;
            break;
        case 'Plug':
            iconLabel = faPlug;
            break;
        case 'Smile':
            iconLabel = faFaceSmile;
            break;
        case 'Surprise':
            iconLabel = faFaceSurprise;
            break;
        case 'Laugh':
            iconLabel = faFaceLaughBeam;
            break;
        case 'Poo':
            iconLabel = faPoo;
            break;
        case 'Laboral':
            iconLabel = faUserTie;
            break;
        case 'MoneyCheck':
            iconLabel = faMoneyCheckDollar;
            break;
        case 'Bills':
            iconLabel = faMoneyBills;
            break;
        case 'Bill':
            iconLabel = faMoneyBill1;
            break;
        case 'HandMoney':
            iconLabel = faHandHoldingDollar;
            break;
        case 'Wallet':
            iconLabel = faWallet;
            break;
        case 'Receipt':
            iconLabel = faReceipt;
            break;
        case 'Invoice':
            iconLabel = faFileInvoiceDollar;
            break;
        case 'Police':
            iconLabel = faPersonMilitaryRifle;
            break;
        case 'ManWoman':
            iconLabel = faRestroom;
            break;
        case 'Person':
            iconLabel = faPerson;
            break;
        case 'PersonDress':
            iconLabel = faPersonDress;
            break;
        case 'Child':
            iconLabel = faChild;
            break;
        case 'ChildDress':
            iconLabel = faChildDress;
            break;
        case 'PersonWalking':
            iconLabel = faPersonWalking;
            break;
        case 'User':
            iconLabel = faUser;
            break;
        case 'Users':
            iconLabel = faUsers;
            break;
        case 'UserCircle':
            iconLabel = faCircleUser;
            break;
        case 'Spy':
            iconLabel = faUserSecret;
            break;
        case 'Pregnant':
            iconLabel = faPersonPregnant;
            break;
        case 'WheelChair':
            iconLabel = faWheelchair;
            break;
        case 'Group':
            iconLabel = faPeopleGroup;
            break;
        case 'Safety':
            iconLabel = faShield;
            break;
        case 'Scissors':
            iconLabel = faScissors;
            break;
        case 'OfficeUtils':
            iconLabel = faStapler;
            break;
        case 'Printer':
            iconLabel = faPrint;
            break;
        case 'Stethoscope':
            iconLabel = faStethoscope;
            break;
        case 'Dog':
            iconLabel = faDog;
            break;
        case 'Cat':
            iconLabel = faCat;
            break;
        case 'Horse':
            iconLabel = faHorse;
            break;
        case 'Spider':
            iconLabel = faSpider;
            break;
        case 'Fish':
            iconLabel = faFishFins;
            break;
        case 'Cow':
            iconLabel = faCow;
            break;
        case 'Hotel':
            iconLabel = faHotel;
            break;
        case 'Icecream':
            iconLabel = faIceCream;
            break;
        case 'Box':
            iconLabel = faBoxArchive;
            break;
        case 'Comment':
            iconLabel = faComment;
            break;
        case 'Bell':
            iconLabel = faBell;
            break;
        case 'Comments':
            iconLabel = faComments;
            break;
        case 'Message':
            iconLabel = faMessage;
            break;
        case 'Envelope':
            iconLabel = faEnvelope;
            break;
        case 'Pencil':
            iconLabel = faPencil;
            break;
        case 'Ban':
            iconLabel = faBan;
            break;
        case 'StarOfLife':
            iconLabel = faStarOfLife;
            break;
        case 'Cellphone':
            iconLabel = faMobileScreenButton;
            break;
        case 'Cellphone2':
            iconLabel = faMobileScreen;
            break;
        case 'Recycling':
            iconLabel = faRecycle;
            break;
        case 'Infinity':
            iconLabel = faInfinity;
            break;
        case 'Film':
            iconLabel = faFilm;
            break;
        case 'School':
            iconLabel = faSchoolFlag;
            break;
        case 'Graduate':
            iconLabel = faGraduationCap;
            break;
        case 'Savings':
            iconLabel = faPiggyBank;
            break;
        case 'Science':
            iconLabel = faFlaskVial;
            break;
        case 'Search':
            iconLabel = faMagnifyingGlass;
            break;
        case 'Wine':
            iconLabel = faWineGlass;
            break;
        case 'Pizza':
            iconLabel = faPizzaSlice;
            break;
        case 'Vegetable':
            iconLabel = faCarrot;
            break;
        case 'Wheat':
            iconLabel = faWheatAwn;
            break;
        case 'Fruit':
            iconLabel = faAppleWhole;
            break;
        case 'Soccer':
            iconLabel = faFutbol;
            break;
        case 'Basketball':
            iconLabel = faBasketball;
            break;
        case 'Baseball':
            iconLabel = faBaseball;
            break;
        case 'Bowling':
            iconLabel = faBowlingBall;
            break;
        case 'Rugby':
            iconLabel = faFootball;
            break;
        case 'Gym':
            iconLabel = faDumbbell;
            break;
        case 'Bike':
            iconLabel = faBicycle;
            break;
        case 'Swimming':
            iconLabel = faPersonSwimming;
            break;
        case 'Tennis':
            iconLabel = faTableTennis;
            break;
        case 'Star':
            iconLabel = faStar;
            break;
        case 'Medal':
            iconLabel = faMedal;
            break;
        case 'Smoke':
            iconLabel = faSmoking;
            break;
        case 'ThumbUp':
            iconLabel = faThumbsUp;
            break;
        case 'ThumbDown':
            iconLabel = faThumbsDown;
            break;
        case 'Motorcycle':
            iconLabel = faMotorcycle;
            break;
        case 'Youtube':
            iconLabel = faYoutube;
            break;
        case 'Spotify':
            iconLabel = faSpotify;
            break;
        case 'Linkedin':
            iconLabel = faLinkedin;
            break;
        case 'Apple':
            iconLabel = faApple;
            break;
        case 'Google':
            iconLabel = faGoogle;
            break;
        case 'PlayStation':
            iconLabel = faPlaystation;
            break;
        case 'Microsoft':
            iconLabel = faMicrosoft;
            break;
        case 'Meta':
            iconLabel = faMeta;
            break;
        case 'Amazon':
            iconLabel = faAmazon;
            break;
        case 'Ebay':
            iconLabel = faEbay;
            break;
        case 'Ethereum':
            iconLabel = faEthereum;
            break;
        default:
            return null;
    }

    return (
        <FontAwesomeIcon icon={iconLabel} style={styles} />
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
    'Heart',
    'Bank',
    'Agriculture',
    'Taxi',
    'Bus',
    'Apartment',
    'Flight',
    'Computer',
    'Laptop',
    'Docs',
    'Book',
    'Music',
    'Beach',
    'City',
    'Church',
    'Calendar',
    'Gift',
    'Wear',
    'Birthday',
    'Party',
    'Baby',
    'Cloud',
    'Construction',
    'Tools',
    'Paint',
    'Bitcoin',
    'Dinner',
    'Burger',
    'Coffee',
    'Subway',
    'Ship',
    'Done',
    'Time',
    'List',
    'Phone',
    'Roas',
    'Car',
    'Car2',
    'Car3',
    'Truck',
    'Pickup',
    'Gas',
    'CashRegister',
    'Electric',
    'Light',
    'Water',
    'Fire',
    'Internet',
    'Wifi',
    'Tv',
    'CellService',
    'SecureService',
    'Plug',
    'Smile',
    'Surprise',
    'Laugh',
    'Poo',
    'Laboral',
    'MoneyCheck',
    'Bills',
    'Bill',
    'HandMoney',
    'Wallet',
    'Receipt',
    'Invoice',
    'Police',
    'ManWoman',
    'Person',
    'PersonDress',
    'Child',
    'ChildDress',
    'PersonWalking',
    'User',
    'Users',
    'UserCircle',
    'Spy',
    'Pregnant',
    'WheelChair',
    'Group',
    'Safety',
    'Scissors',
    'OfficeUtils',
    'Printer',
    'Stethoscope',
    'Dog',
    'Cat',
    'Horse',
    'Spider',
    'Fish',
    'Cow',
    'Hotel',
    'Icecream',
    'Box',
    'Comment',
    'Bell',
    'Comments',
    'Message',
    'Envelope',
    'Pencil',
    'Ban',
    'StarOfLife',
    'Cellphone',
    'Cellphone2',
    'Recycling',
    'Infinity',
    'Film',
    'School',
    'Graduate',
    'Savings',
    'Science',
    'Search',
    'Wine',
    'Pizza',
    'Vegetable',
    'Wheat',
    'Fruit',
    'Soccer',
    'Basketball',
    'Baseball',
    'Bowling',
    'Rugby',
    'Gym',
    'Bike',
    'Swimming',
    'Tennis',
    'Star',
    'Medal',
    'Smoke',
    'ThumbUp',
    'ThumbDown',
    'Motorcycle',
    'Youtube',
    'Spotify',
    'Linkedin',
    'Apple',
    'Google',
    'PlayStation',
    'Microsoft',
    'Meta',
    'Amazon',
    'Ebay',
    'Ethereum',
];

export default CategoryIcon;