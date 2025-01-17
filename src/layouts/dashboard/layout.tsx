import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import Alert from '@mui/material/Alert';
import { useTheme } from '@mui/material/styles';

import { _langs, _notifications } from 'src/_mock';

import { Iconify } from 'src/components/iconify';

import { IUnit, IUser } from 'src/config/types/types';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setUnitActive } from 'src/redux/slices/units.slice';
import { setUser } from 'src/redux/slices/user.slice';
import { connect } from 'react-redux';
import { setUnitsList } from 'src/redux/slices/lists.slice';
import { Main } from './main';
import { layoutClasses } from '../classes';
import { NavMobile, NavDesktop } from './nav';
import { navData } from '../config-nav-dashboard';
import { Searchbar } from '../components/searchbar';
import { _workspaces } from '../config-nav-workspace';
import { MenuButton } from '../components/menu-button';
import { LayoutSection } from '../core/layout-section';
import { HeaderSection } from '../core/header-section';
import { AccountPopover } from '../components/account-popover';
import { LanguagePopover } from '../components/language-popover';
import { NotificationsPopover } from '../components/notifications-popover';

// ----------------------------------------------------------------------

export type DashboardLayoutProps = {
  sx?: SxProps<Theme>;
  children: React.ReactNode;
  header?: {
    sx?: SxProps<Theme>;
  };
  units: IUnit[];
  setUnitActiveData: any;
  setUnitsData: any;
  userData: IUser;
  setUserData: any
};

function DashboardLayoutReduxed({ sx, children, header, units, setUnitActiveData, setUnitsData, userData, setUserData }: DashboardLayoutProps) {
  const theme = useTheme();
  const [unitsList, setUnitsListState] = useState<any[]>([]);

  useEffect(() => {
    if (units?.length !== 0) {
      const unitsFormatted:any = units?.map((unit: IUnit) => (
        {
          id: unit.id,
          name: unit.name,
          logo: unit.photo || '',
          main: unit?.user_unit && unit?.user_unit.is_main_unit || false,
          is_main_unit: unit?.user_unit && unit?.user_unit.is_main_unit || false
        }
      ));
      setUnitsListState(unitsFormatted);
    }
  }, [units])

  const [navOpen, setNavOpen] = useState(false);

  const layoutQuery: Breakpoint = 'lg';

  return (
    <LayoutSection
      /** **************************************
       * Header
       *************************************** */
      headerSection={
        <HeaderSection
          layoutQuery={layoutQuery}
          slotProps={{
            container: {
              maxWidth: false,
              sx: { px: { [layoutQuery]: 5 } },
            },
          }}
          sx={header?.sx}
          slots={{
            topArea: (
              <Alert severity="info" sx={{ display: 'none', borderRadius: 0 }}>
                This is an info Alert.
              </Alert>
            ),
            leftArea: (
              <>
                <MenuButton
                  onClick={() => setNavOpen(true)}
                  sx={{
                    ml: -1,
                    [theme.breakpoints.up(layoutQuery)]: { display: 'none' },
                  }}
                />
                <NavMobile
                  data={navData}
                  open={navOpen}
                  onClose={() => setNavOpen(false)}
                  workspaces={unitsList}
                />
              </>
            ),
            rightArea: (
              <Box gap={1} display="flex" alignItems="center">
                <Searchbar />
                <LanguagePopover data={_langs} />
                <NotificationsPopover data={_notifications} />
                <AccountPopover
                  menuData={[
                    {
                      label: 'Inicio',
                      href: '/',
                      icon: <Iconify width={22} icon="solar:home-angle-bold-duotone" />,
                    },
                    {
                      label: 'Perfil',
                      href: '/profileEdit',
                      icon: <Iconify width={22} icon="solar:shield-keyhole-bold-duotone" />,
                    },
                    {
                      label: 'Configuración',
                      href: '#',
                      icon: <Iconify width={22} icon="solar:settings-bold-duotone" />,
                    },
                  ]}
                  userData={userData}
                  setUserData={setUserData}
                />
              </Box>
            ),
          }}
        />
      }
      /** **************************************
       * Sidebar
       *************************************** */
      sidebarSection={
        <NavDesktop data={navData} layoutQuery={layoutQuery} workspaces={unitsList} />
      }
      /** **************************************
       * Footer
       *************************************** */
      footerSection={null}
      /** **************************************
       * Style
       *************************************** */
      cssVars={{
        '--layout-nav-vertical-width': '300px',
        '--layout-dashboard-content-pt': theme.spacing(1),
        '--layout-dashboard-content-pb': theme.spacing(8),
        '--layout-dashboard-content-px': theme.spacing(5),
      }}
      sx={{
        [`& .${layoutClasses.hasSidebar}`]: {
          [theme.breakpoints.up(layoutQuery)]: {
            pl: 'var(--layout-nav-vertical-width)',
          },
        },
        ...sx,
      }}
    >
      <Main>{children}</Main>
    </LayoutSection>
  );
}
const mapDispatchToProps = (dispatch: any) => ({
  setUnitsData: bindActionCreators(setUnitsList, dispatch),
  setUnitActiveData: bindActionCreators(setUnitActive, dispatch),
  setUserData: bindActionCreators(setUser, dispatch),
});

const DashboardLayout = connect(
  (state: any) => ({
    units: state.units.unitsList,
    userData: state.user.userData
  }),
  mapDispatchToProps
)(DashboardLayoutReduxed);

export default DashboardLayout;