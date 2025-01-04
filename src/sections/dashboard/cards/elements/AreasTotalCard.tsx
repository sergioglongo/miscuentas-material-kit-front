import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { IconValueLabelCard } from 'src/components/cards/IconValueLabelCard/IconValueLabelCard';
import { CardContent, Grid, MenuItem, Select, useMediaQuery } from '@mui/material';
import AreaIcon from 'src/components/icon/AreaIcons';

// ----------------------------------------------------------------------

type Props = CardProps & {
    title?: string;
    subheader?: string;
    heightContent?: string;
    list: { iconName: string; color: string; label: string; total: number }[];
};


export function AreasTotalCard({ title, subheader, list, heightContent, sx, ...other }: Props) {
    const isXsDown = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
  console.log("estoy en totalcard con lista");
  
    return (
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          width: '100%',
          alignItems: 'center',
        }}>

          <Grid container spacing={2} sx={{ overflowY: 'auto' }}>
            {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(3, 1fr)"
            sx={{ p: 3, maxHeight: maxHeightContent, overflowY: 'auto', width: '100%' }}> */}
            {list.map((item) => (
              <Grid item key={item.label} xs={4} md={3} lg={4} xl={3}>
                <IconValueLabelCard
                  item={item}
                  children={
                    <AreaIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} />
                  } />
              </Grid>
            ))}
          </Grid>
        </Box>
  );
}
