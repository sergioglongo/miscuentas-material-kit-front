import InternalIcon from 'src/components/icon/internal-icons';
import { Label } from 'src/components/label';
import { SvgColor } from 'src/components/svg-color';

// ----------------------------------------------------------------------

const icon = (name: string) => (
  <SvgColor width="100%" height="100%" src={`/assets/icons/navbar/${name}.svg`} />
);

export const navData = [
  {
    title: 'Inicio',
    path: '/',
    icon: icon('ic-analytics'),
  },
  {
    title: 'Areas',
    path: '/area',
    icon: <InternalIcon color='gray' iconName="Area" />,

  },
  {
    title: 'Categorias',
    path: '/category',
    icon: <InternalIcon color='gray' iconName="Category" />,

  },
  {
    title: 'Cuentas',
    path: '/account',
    icon: <InternalIcon color='gray' iconName="Accounts" />,

  },
  {
    title: 'Medios Pago',
    path: '/paymethod',
    icon: <InternalIcon color='gray' iconName="PayMethods" />,

  },
  {
    title: 'Transacciones',
    path: '/transaction',
    icon: <InternalIcon color='gray' iconName="Transactions" />,
  },
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
