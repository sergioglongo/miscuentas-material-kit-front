import React from 'react'
import { Box, CardContent, CardHeader, CardProps, Divider, Typography } from '@mui/material';
import { Chart, ChartLegends, ChartOptions, useChart } from 'src/components/chart';
import { useTheme } from '@mui/material/styles';
import { fNumber } from 'src/utils/format-number';

type Props = CardProps & {
    chart: {
        colors?: string[];
        series: {
            label: string;
            value: number;
        }[];
        options?: ChartOptions;
    };
};
const AreasCircleGraph = ({ chart }: Props) => {
    const theme = useTheme();

    const chartSeries = chart.series.map((item) => item.value);

    const chartColors = chart.colors ?? [
        theme.palette.primary.main,
        theme.palette.warning.main,
        theme.palette.secondary.dark,
        theme.palette.error.main,
    ];

    const chartOptions = useChart({
        chart: { sparkline: { enabled: true } },
        colors: chartColors,
        labels: chart.series.map((item) => item.label),
        // series: chart.series.map((item) => ({ name: item.label, data: [item.value], icon: { name: item.icon } })), 
        stroke: { width: 0 },
        dataLabels: {
            enabled: true,
            textAnchor: 'end',
            // formatter: (value: number, opts: any) => {
            //     console.log("opts", opts);
                
            //     return `${fNumber(value)}%`
            // }
        },
        tooltip: {
            enabled: true,
            // y: {
            //     formatter: (value: number) => fNumber(value),
            //     title: { formatter: (seriesName: string) => `${seriesName}` },
            // },
        },
        plotOptions: { pie: { donut: { labels: { show: false } } } },
        ...chart.options,
    });

    return (
        <Box >
            {chartSeries.length === 0 ?
                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Sin datos en el periodo seleccionado
                    </Typography>
                </Box>
                :
                <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: 0 }}>
                    <Chart
                        type="pie"
                        series={chartSeries}
                        options={chartOptions}
                        width={{ xs: 240, xl: 260 }}
                        height={{ xs: 240, xl: 250 }}
                        sx={{ my: 5, mx: 'auto' }}
                    />

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <ChartLegends
                        labels={chartOptions?.labels}
                        colors={chartOptions?.colors}
                        sx={{ p: 3, justifyContent: 'center' }}
                    />
                </Box>
            }
        </Box>
    );
}

export default AreasCircleGraph