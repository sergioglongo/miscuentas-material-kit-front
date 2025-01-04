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
  options: { value: string; label: string }[];
  onSelectOption: (option: string) => void;
  transactionOptionSelected: string;
  list: { iconName: string; color: string; label: string; total: number }[];
};


export function AreasTotalCards({ title, subheader, list, heightContent, options, transactionOptionSelected, onSelectOption, sx, ...other }: Props) {
    const isXsDown = useMediaQuery((theme: any) => theme.breakpoints.down('xs'));
  console.log("list", list);
  
  return (
    <Card sx={sx} {...other}>
      <Box display='flex' flexDirection={isXsDown ? 'row' : 'column'} gap={2} alignItems="center" justifyContent="space-arround" sx={{ pl: 2, pt: 2 }} >
        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
          {title}
        </Typography>
        <Box display="flex" flexDirection='row' alignItems='center'>
          <Typography variant="h6" >Tipo:</Typography>
          <Select
            name="areaId"
            style={{ width: '100px', marginLeft: '10px' }}
            variant="outlined"
            size='small'
            value={transactionOptionSelected}
            onChange={(e: any) => onSelectOption(e.target.value)}
          >
            {/* <MenuItem value='30' key='1' >mes actual</MenuItem> */}
            {options.map((item: any, index: number) =>
              <MenuItem value={item.value} key={index} >
                {item.label}
              </MenuItem>)
            }
          </Select>
        </Box>
      </Box>
      {list.length > 0 ?
        <CardContent sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-start',
          alignItems: 'center',
          height: heightContent
        }}>

          <Grid container spacing={2} sx={{ overflowY: 'auto' }}>
            {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(3, 1fr)"
            sx={{ p: 3, maxHeight: maxHeightContent, overflowY: 'auto', width: '100%' }}> */}
            {list.map((item) => (
              <Grid item key={item.label} xs={6} md={4} lg={6}>
                <IconValueLabelCard
                  item={item}
                  children={
                    <AreaIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} />
                  } />
              </Grid>
            ))}
          </Grid>
        </CardContent>
        :
        <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="body2" sx={{ p: 3, textAlign: 'center' }}>
            Sin datos en el periodo seleccionado
          </Typography>
        </CardContent>
      }
    </Card >
  );
}
