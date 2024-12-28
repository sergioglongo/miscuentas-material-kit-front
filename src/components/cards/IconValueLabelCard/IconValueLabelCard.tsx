import type { CardProps } from '@mui/material/Card';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { fCurrency } from 'src/utils/format-number';
import { varAlpha } from 'src/theme/styles';
import AreaIcon from 'src/components/icon/area-icons';

type Props = CardProps & {
  item: { iconName: string; color: string; label: string; total: number };
  children?: React.ReactNode;
};

export function IconValueLabelCard({ item, children, sx, ...other }: Props) {
  return (
    <Box
      key={item.label}
      sx={(theme) => ({
        py: 2.5,
        display: 'flex',
        borderRadius: 1.5,
        textAlign: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
      })}
    >
      {/* <AreaIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} /> */}
      {children}
      <Typography variant="h6" sx={{ mt: 1 }}>
        {fCurrency(item.total)}
      </Typography>

      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {item.label}
      </Typography>
    </Box>
  );
}
