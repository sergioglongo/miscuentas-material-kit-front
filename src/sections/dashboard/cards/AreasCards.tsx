import Card, { CardProps } from '@mui/material/Card';
import { Box, CardHeader, CircularProgress, MenuItem, Select, Typography, useMediaQuery } from '@mui/material';
import { varAlpha } from 'src/theme/styles';
import { ChartOptions } from 'src/components/chart';
import AreasCircleGraph from './elements/AreasCircleGraph';
import { AreasTotalCard } from './elements/AreasTotalCard';

type Props = CardProps & {
    title?: string;
    subheader?: string;
    heightContent?: string;
    totalText?: string;
    chart: {
        colors?: string[];
        series: {
            label: string;
            value: number;
        }[];
        options?: ChartOptions;
    }
    loading?: boolean;
    options: { value: string; label: string }[];
    list: { iconName: string; color: string; currency: string; label: string; total: number }[];
};

export function AreasCards({ title,
    subheader,
    chart,
    list,
    totalText,
    loading,
    options,
    ...other }: Props) {
    const isXsDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    // console.log("list", list);

    return (
        <Card  {...other}>
            <CardHeader title={title} sx={{ textAlign: 'center' }} titleTypographyProps={{ variant: 'h4', color: 'text.secondary' }} />
            {loading ?
                <Box display='flex' justifyContent='center' alignItems='center' height='100%' padding={5}>
                    <CircularProgress />
                </Box>
                :
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
                        {/* <Typography variant="h5" sx={{ color: 'text.secondary', mt: 2 }}>
                        Totales por area seleccionada
                    </Typography> */}
                        <AreasTotalCard list={list} />
                        <Box
                            sx={(theme) => ({
                                p: 2,
                                display: 'flex',
                                borderRadius: 1.5,
                                textAlign: 'center',
                                alignItems: 'center',
                                flexDirection: 'column',
                                border: `solid 1px ${varAlpha(theme.vars.palette.grey['500Channel'], 0.12)}`,
                            })}
                        // onClick={onClick ? () => onClick(item) : () => { }}
                        >
                            {/* <AreaIcon iconName={item.iconName} styles={{ fontSize: '40', display: 'flex', color: item.color }} /> */}
                            <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                                {totalText}
                            </Typography>
                        </Box>
                        {/* <Box width='100%' height='auto' sx={{ backgroundColor: 'blue' }} /> */}
                    </Box>
                </Box>
            }
        </Card>
    )
}
