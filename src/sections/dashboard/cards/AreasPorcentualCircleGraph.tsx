import type { CardProps } from '@mui/material/Card';
import type { ChartOptions } from 'src/components/chart';

import Card from '@mui/material/Card';
import Divider from '@mui/material/Divider';
import { useTheme } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';

import { fNumber } from 'src/utils/format-number';

import { Chart, useChart, ChartLegends } from 'src/components/chart';
import { CardContent, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type Props = CardProps & {
    title?: string;
    subheader?: string;
    chart: {
        colors?: string[];
        series: {
            label: string;
            value: number;
        }[];
        options?: ChartOptions;
    };
};

export function AreasPorcentualCircleGraph({ title, subheader, chart, ...other }: Props) {
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
        stroke: { width: 0 },
        dataLabels: {
            enabled: true,
            // dropShadow: {
            //     enabled: true,
            //     left: 2,
            //     top: 2,
            //     opacity: 0.5
            // },
            textAnchor: 'end',
            // formatter:  (val:any, opt) => `${opt?.w?.config?.labels?.[opt?.seriesIndex]}: ${fNumber(val)}%`,
        },
        tooltip: {
            y: {
                formatter: (value: number) => fNumber(value),
                title: { formatter: (seriesName: string) => `${seriesName}` },
            },
        },
        plotOptions: { pie: { donut: { labels: { show: false } } } },
        ...chart.options,
    });

    return (
        <Card {...other}>
            <CardHeader title={title} subheader={subheader} />
            {chartSeries.length === 0 ?
                <CardContent sx={{ display: 'flex', justifyContent: 'center' }}>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        Sin datos en el periodo seleccionado
                    </Typography>
                </CardContent>
                :
                <CardContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                    <Chart
                        type="pie"
                        series={chartSeries}
                        options={chartOptions}
                        width={{ xs: 240, xl: 260 }}
                        height={{ xs: 240, xl: 260 }}
                        sx={{ my: 6, mx: 'auto' }}
                    />

                    <Divider sx={{ borderStyle: 'dashed' }} />

                    <ChartLegends
                        labels={chartOptions?.labels}
                        colors={chartOptions?.colors}
                        sx={{ p: 3, justifyContent: 'center' }}
                    />
                </CardContent>
            }
        </Card>
    );
}
