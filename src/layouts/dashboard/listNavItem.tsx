import React from 'react'
import { Box, ListItem, ListItemButton, Typography } from '@mui/material';
import { RouterLink } from 'src/routes/components';

const listNavItem = (item: any, isActived: boolean) => (
    <ListItem disableGutters disablePadding key={item.title}>
        <ListItemButton
            disableGutters
            component={RouterLink}
            href={item.path || '#'}
            sx={{
                pl: 2,
                py: 1,
                gap: 2,
                pr: 1.5,
                borderRadius: 0.75,
                typography: 'body2',
                fontWeight: 'fontWeightMedium',
                color: 'var(--layout-nav-item-color)',
                minHeight: 'var(--layout-nav-item-height)',
                ...(isActived && {
                    fontWeight: 'fontWeightSemiBold',
                    bgcolor: 'var(--layout-nav-item-active-bg)',
                    color: 'var(--layout-nav-item-active-color)',
                    '&:hover': {
                        bgcolor: 'var(--layout-nav-item-hover-bg)',
                    },
                }),
            }}
        >
            <Box component="span" sx={{ width: 24, height: 24 }}>
                {item.icon}
            </Box>

            <Box component="span" flexGrow={1}>
                <Typography variant="subtitle1">{item.title}</Typography>
            </Box>

            {item.info && item.info}
        </ListItemButton>
    </ListItem>
)

export default listNavItem