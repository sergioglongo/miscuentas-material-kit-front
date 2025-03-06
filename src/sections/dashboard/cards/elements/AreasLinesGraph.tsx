import React, { useEffect } from 'react'
import { Box, Card, CardContent, CardHeader, CardProps, CircularProgress, Divider, Typography } from '@mui/material';
import { Chart, ChartLegends, ChartOptions, useChart } from 'src/components/chart';
import { useTheme } from '@mui/material/styles';
import { fNumber } from 'src/utils/format-number';

type Props = CardProps & {
    colors?: string[];
    categories: string[];
    series: any[];
    title: string;
    subheader?: string;
    options?: ChartOptions;
    heightContent?: string;
    loading?: boolean;
};

const AreasLinesGraph = ({ categories, series, options, colors, title, subheader, heightContent, loading }: Props) => {
    const [isEmpty, setIsEmpty] = React.useState(true);
    const chartOptions = useChart({
        // chart: { sparkline: { enabled: true } },
        // colors: chartColors,
        // labels: chart.series.map((item) => item.label),
        xaxis: { categories },
        // stroke: { width: 0 },
        dataLabels: {
            enabled: true,
            textAnchor: 'end',
        },

    });
    useEffect(() => {
        const empty = series ? series[0]?.data?.every((item: any) => item === 0) : true;
        setIsEmpty(empty);
    }, [series]);
    return (
        <Card >
            {/* <CardHeader title={title} subheader={subheader} /> */}
            <Box display='flex' flexDirection='row' gap={4} alignItems="center" justifyContent="flex-start" paddingX={2}>
                <Box display='flex' flexDirection='column' alignItems="flex-start" justifyContent="flex-start" padding={2} >
                    <Typography variant="h5" sx={{ color: 'text.primary' }}>
                        {title}
                    </Typography>
                    <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                        {subheader}
                    </Typography>
                </Box>
                <ChartLegends
                    labels={series?.map((item) => item.name)}
                    colors={chartOptions?.colors}
                    sx={{ p: 3, justifyContent: 'center' }}
                />
            </Box>
            {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}> */}
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: isEmpty || loading ? 'auto' : heightContent,
                padding: 0,
            }}>

                <Box >
                    {
                        loading ?
                            <Box display='flex' justifyContent='center' alignItems='center' height='100%' padding={5}>
                                < CircularProgress />
                            </Box>
                            :
                            isEmpty ?
                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                        Sin datos en los últimos 6 meses
                                    </Typography>
                                </Box>
                                :
                                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0 }}>
                                    <Chart
                                        type="line"
                                        series={series}
                                        options={chartOptions}
                                        width={{ xs: 300, sm: 550, xl: 650 }}
                                        height={{ xs: 340, sm: 350, xl: 350 }}
                                        sx={{ my: 5, mx: 'auto' }}
                                    />
                                    <Divider sx={{ borderStyle: 'dashed' }} />

                                </Box>
                    }
                </Box>
            </CardContent>
        </Card >
    );
}

export default AreasLinesGraph