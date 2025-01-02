import type { Theme, SxProps, Breakpoint } from '@mui/material/styles';

import { useEffect, useState } from 'react';

import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import { useTheme } from '@mui/material/styles';
import ListItemButton from '@mui/material/ListItemButton';
import Drawer, { drawerClasses } from '@mui/material/Drawer';

import { usePathname } from 'src/routes/hooks';
import { RouterLink } from 'src/routes/components';

import { varAlpha } from 'src/theme/styles';

import { Logo } from 'src/components/logo';
import { Scrollbar } from 'src/components/scrollbar';
import { Accordion, AccordionDetails, AccordionSummary, Collapse, Typography } from '@mui/material';
import { ExpandMore } from '@mui/icons-material';

import { NavUpgrade } from '../components/nav-upgrade';
import WorkspacesPopover from '../components/workspaces-popover';

import type { WorkspacesPopoverProps } from '../components/workspaces-popover';
import listNavItem from './listNavItem';

// ----------------------------------------------------------------------


export type NavContentProps = {
  data: {
    key: string;
    path: string;
    title: string;
    icon: React.ReactNode;
    info?: React.ReactNode;
    isMenu?: boolean;
    submenu?: {
      key: string;
      path: string;
      title: string;
      icon: React.ReactNode;
      info?: React.ReactNode;
    }[]
  }[];
  slots?: {
    topArea?: React.ReactNode;
    bottomArea?: React.ReactNode;
  };
  workspaces: WorkspacesPopoverProps['data'];
  sx?: SxProps<Theme>;
};

export function NavDesktop({
  sx,
  data,
  slots,
  workspaces,
  layoutQuery,
}: NavContentProps & { layoutQuery: Breakpoint }) {
  const theme = useTheme();

  return (
    <Box
      sx={{
        pt: 2.5,
        px: 2.5,
        top: 0,
        left: 0,
        height: 1,
        display: 'none',
        position: 'fixed',
        flexDirection: 'column',
        bgcolor: 'var(--layout-nav-bg)',
        zIndex: 'var(--layout-nav-zIndex)',
        width: 'var(--layout-nav-vertical-width)',
        borderRight: `1px solid var(--layout-nav-border-color, ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)})`,
        [theme.breakpoints.up(layoutQuery)]: {
          display: 'flex',
        },
        ...sx,
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Box>
  );
}

// ----------------------------------------------------------------------

export function NavMobile({
  sx,
  data,
  open,
  slots,
  onClose,
  workspaces,
}: NavContentProps & { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  useEffect(() => {
    if (open) {
      onClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <Drawer
      open={open}
      onClose={onClose}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          pt: 2.5,
          px: 2.5,
          overflow: 'unset',
          bgcolor: 'var(--layout-nav-bg)',
          width: 'var(--layout-nav-mobile-width)',
          ...sx,
        },
      }}
    >
      <NavContent data={data} slots={slots} workspaces={workspaces} />
    </Drawer>
  );
}

// ----------------------------------------------------------------------

export function NavContent({ data, slots, workspaces, sx }: NavContentProps) {
  const pathname = usePathname();
  const [open, setOpen] = useState<boolean[]>([false, false, false]);
  return (
    <>
      <Box display="flex" flexDirection="row" alignItems="center" justifyContent="flex-start" gap={2}>
        <Logo />
        <Typography variant="h5">Mis Cuentas</Typography>
      </Box>

      {slots?.topArea}
      <Box mt={3}>
        <Typography variant="h6" >
          Cuenta a gestionar
        </Typography>
      </Box>
      <WorkspacesPopover data={workspaces} sx={{ my: 2, mb: 4 }} />

      <Scrollbar fillContent>
        <Box component="nav" display="flex" flex="1 1 auto" flexDirection="column" sx={sx}>
          <Box component="ul" gap={0} display="flex" flexDirection="column">
            {data.map((item) => {
              let isActived = item.path === pathname;
              if (item.isMenu) {
                return (
                  <Accordion key={item.title}>
                    <AccordionSummary
                      expandIcon={<ExpandMore />}
                    // aria-controls="panel1a-content"
                    >
                      <Typography variant="subtitle1">{item.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails >
                      {item.submenu?.map((subItem) => {
                        isActived = subItem.path === pathname;
                        return listNavItem(subItem, isActived);
                      }
                      )
                      }
                    </AccordionDetails>
                  </Accordion>
                )
              }
              return listNavItem(item, isActived);
            })}
          </Box>
        </Box>
      </Scrollbar>

      {slots?.bottomArea}

      {/* <NavUpgrade /> */}
    </>
  );
}
