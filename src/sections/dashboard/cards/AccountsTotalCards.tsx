import type { CardProps } from '@mui/material/Card';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Typography from '@mui/material/Typography';

import { fShortenNumber } from 'src/utils/format-number';

import { varAlpha } from 'src/theme/styles';

import { Iconify } from 'src/components/iconify';
import { IconValueLabelCard } from 'src/components/cards/IconValueLabelCard/IconValueLabelCard';
import AccountIcon from 'src/components/icon/account-icons';

// ----------------------------------------------------------------------

type Props = CardProps & {
  title?: string;
  subheader?: string;
  list: { iconName: string; color: string; label: string; total: number }[];
};


export function AccountsTotalCards({ title, subheader, list, sx, ...other }: Props) {
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}>
        {list.map((item) => (
          <IconValueLabelCard key={item.label} item={item} children={
            <AccountIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} />
          } />
        ))}
      </Box>
    </Card>
  );
}
