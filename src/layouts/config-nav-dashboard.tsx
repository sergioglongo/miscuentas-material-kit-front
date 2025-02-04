import path from 'path';
import CommonIcon from 'src/components/icon/CommonIcons';
import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    key: 'home',
    title: 'Inicio',
    path: '/',
    icon: icon('ic-analytics'),
    isMenu: false
  },
  {
    key: 'transactions',
    title: 'Transacciones',
    path: '/transaction',
    icon: <CommonIcon color='gray' iconName="Transaction" styles={{ fontSize: '25', }} />,
    isMenu: false
  },
  {
    key: 'paramsMenu',
    title: 'Parametros',
    path: '',
    icon: <CommonIcon color='gray' iconName="Home" styles={{ fontSize: '25', }} />,
    isMenu: true,
    submenu: [
      {
        key: 'areas',
        title: 'Areas',
        path: '/area',
        icon: <CommonIcon color='gray' iconName="Area" styles={{ fontSize: '25', }} />,

      },
      {
        key: 'categories',
        title: 'Categorias',
        path: '/category',
        icon: <CommonIcon color='gray' iconName="Category" styles={{ fontSize: '25', }} />,

      },
      {
        key: 'accounts',
        title: 'Cuentas',
        path: '/account',
        icon: <CommonIcon color='gray' iconName="Accounts" styles={{ fontSize: '25', }} />,

      },
      {
        key: 'payMethods',
        title: 'Medios Pago',
        path: '/paymethod',
        icon: <CommonIcon color='gray' iconName="PayMethods" styles={{ fontSize: '25', }} />,

      },
    ]
  },
  // {
  //   key: 'accountsMenu',
  //   title: 'Cuentas',
  //   path: '',
  //   icon: <CommonIcon color='gray' iconName="Home" styles={{ fontSize: '25', }} />,
  //   isMenu: true,
  //   submenu: [

  //     // {
  //     //   key: 'payMethods',
  //     //   title: 'Medios Pago',
  //     //   path: '/paymethod',
  //     //   icon: <CommonIcon color='gray' iconName="PayMethods" styles={{ fontSize: '25', }} />,

  //     // },
  //   ]
  // },

  // {
  //   title: 'Productos',
  //   path: '/products',
  //   icon: icon('ic-cart'),
  //   info: (
  //     <Label color="error" variant="inverted">
  //       +3
  //     </Label>
  //   ),
  // },
  // {
  //   title: 'Blog',
  //   path: '/blog',
  //   icon: icon('ic-blog'),
  // },
  // {
  //   title: 'Iniciar sesión',
  //   path: '/sign-in',
  //   icon: icon('ic-lock'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: icon('ic-disabled'),
  // },
];
