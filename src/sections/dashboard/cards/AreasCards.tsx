import Card, { CardProps } from '@mui/material/Card';
import { Box, CardHeader, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import { ChartOptions } from 'src/components/chart';
import AreasCircleGraph from './elements/AreasCircleGraph';
import { AreasTotalCard } from './elements/AreasTotalCard';

type Props = CardProps & {
    title?: string;
    subheader?: string;
    heightContent?: string;
    chart: {
        colors?: string[];
        series: {
            label: string;
            value: number;
        }[];
        options?: ChartOptions;
    }
    options: { value: string; label: string }[];
    onSelectOption: (option: string) => void;
    transactionOptionSelected: string;
    list: { iconName: string; color: string; label: string; total: number }[];
};

export function AreasCards({ title,
    subheader,
    chart,
    list,
    transactionOptionSelected,
    options,
    onSelectOption,
    ...other }: Props) {
    const isXsDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

    return (
        <Card  {...other}>
            <Box
                display='flex'
                flexDirection={isXsDown ? 'column' : 'row'}
                gap={3}
                paddingX={2}
                paddingY={2}
                alignItems={isXsDown ? 'center' : 'flex-start'}
                justifyContent="flex-start"
            >
                <Box display='flex' flexDirection='column' alignItems="center" rowGap={2} minWidth='40%'>
                    <Box display='flex' flexDirection='row' gap={4} alignItems="center" justifyContent="flex-start" padding={2}>
                        <Typography variant="h5" sx={{ color: 'text.secondary' }}>
                            {title}
                        </Typography>
                        <Box
                            display="flex"
                            flexDirection='row'
                            alignItems='center'
                        >
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
                    <AreasCircleGraph chart={chart} />
                </Box>
                <Box
                    display='flex'
                    width='100%'
                    flexDirection='column'
                    alignItems="center"
                    justifyContent='flex-start'
                    rowGap={2}
                >
                    <Typography variant="h5" sx={{ color: 'text.secondary',mt:2 }}>
                        Totales por area seleccionada
                    </Typography>
                    <AreasTotalCard list={list} />
                    {/* <Box width='100%' height='auto' sx={{ backgroundColor: 'blue' }} /> */}
                </Box>
            </Box>
        </Card>
    )
}
