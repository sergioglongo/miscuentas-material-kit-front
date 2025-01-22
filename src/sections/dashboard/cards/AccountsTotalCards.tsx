import type { CardProps } from '@mui/material/Card';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import { useRouter } from 'src/routes/hooks';
import Typography from '@mui/material/Typography';
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
      const router = useRouter();
  const onClickAccount = (item:any) => {
    const data = { unitActive: item.unitId.id, account: item.account}
    console.log("item data ", data);
    router.navigateState('/accountTransactions', data);
    
  };
  return (
    <Card sx={sx} {...other}>
      <CardHeader title={title} subheader={subheader} />
      {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}> */}
      <CardContent sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: list.length === 0 ? 'auto' : heightContent
      }}>
        {list.length === 0 ?
          <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Sin datos en cuentas para mostrar
            </Typography>
          </CardContent>
          :
          <Grid container spacing={2} sx={{ overflowY: 'auto' }}>
            {list.map((item) => (
              <Grid item key={item.label} xs={6} sm={3} md={6} lg={6}>
                <IconValueLabelCard
                  item={item}
                  onClick={onClickAccount}
                  children={
                    <AccountIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} />
                  } />
              </Grid>
            ))}
          </Grid>
        }
      </CardContent>
    </Card>
  );
}
