import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { IconValueLabelCard } from 'src/components/cards/IconValueLabelCard/IconValueLabelCard';
import AccountIcon from 'src/components/icon/AccountIcon';
import { CardContent, Grid } from '@mui/material';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  heightContent?: string;
  list: { iconName: string; color: string; label: string; total: number }[];
};


export function AccountsTotalCards({ title, subheader, list, heightContent, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}> */}
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: heightContent
      }}>
        <Grid container spacing={2} sx={{ overflowY: 'auto' }}>
          {list.map((item) => (
            <Grid item key={item.label} xs={6} md={4} lg={6}>
              <IconValueLabelCard item={item} children={
                <AccountIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} />
              } />
            </Grid>
          ))}
        </Grid>
      </CardContent>
    </Card>
  );
}
