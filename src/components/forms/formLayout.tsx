import { Box, Divider } from '@mui/material';
import { useTheme, Theme, SxProps, Breakpoint } from '@mui/material/styles';
import React from 'react'
import { layoutClasses } from 'src/layouts/classes';

export type FormLayoutProps = {
    sx?: SxProps<Theme>;
    children: React.ReactNode;
  };

function FormLayout({children, sx}: FormLayoutProps) {
    const theme = useTheme();
    const layoutQuery: Breakpoint = 'md';

    return (
        <Box
            component="main"
            className={layoutClasses.main}
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'center',
                flexDirection: 'column',
                p: theme.spacing(3, 2, 10, 2),
                [theme.breakpoints.up(layoutQuery)]: {
                    justifyContent: 'center',
                    p: theme.spacing(4, 10, 10, 10),
                },
            }}
        >
            <Box
                sx={{
                    py: 5,
                    px: 3,
                    width: 1,
                    // position: 'fixed',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: theme.vars.palette.common.white,
                    maxWidth: 'var(--layout-auth-content-width)',
                }}
            >
                <Divider sx={{ borderStyle: 'dashed' }} />

                {children}
            </Box>
        </Box>
    )
}

export default FormLayout;