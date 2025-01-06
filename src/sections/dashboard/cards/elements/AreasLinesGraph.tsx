import React from 'react'
import { Box, Card, CardContent, CardHeader, CardProps, Divider, Typography } from '@mui/material';
import { Chart, ChartLegends, ChartOptions, useChart } from 'src/components/chart';
import { useTheme } from '@mui/material/styles';
import { fNumber } from 'src/utils/format-number';

type Props = CardProps & {
    colors?: string[];
    categories: string[];
    series: number[];
    title: string;
    subheader?: string;
    options?: ChartOptions;
    heightContent?: string;
};

const AreasLinesGraph = ({ categories, series, options, colors, title, subheader, heightContent }: Props) => {

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
        // yaxis: [
        //     {
        //       axisTicks: {
        //         show: true
        //       },
        //       axisBorder: {
        //         show: true,
        //         color: "#FF1654"
        //       },
        //       labels: {
        //         style: {
        //           colors: "#FF1654"
        //         }
        //       },
        //       title: {
        //         text: "Series A",
        //         style: {
        //           color: "#FF1654"
        //         }
        //       }
        //     },
        //     {
        //       opposite: true,
        //       axisTicks: {
        //         show: true
        //       },
        //       axisBorder: {
        //         show: true,
        //         color: "#247BA0"
        //       },
        //       labels: {
        //         style: {
        //           colors: "#247BA0"
        //         }
        //       },
        //       title: {
        //         text: "Series B",
        //         style: {
        //           color: "#247BA0"
        //         }
        //       }
        //     }
        //   ],
        // tooltip: {
        //     enabled: true,
        // },
        // plotOptions: { pie: { donut: { labels: { show: false } } } },
        // ...chart.options,
    });

    return (
        <Card>
            <CardHeader title={title} subheader={subheader} />
            {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}> */}
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: heightContent
            }}>

                <Box >
                    {categories?.length === 0 ?
                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                                Sin datos en el periodo seleccionado
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
                            {/* <Divider sx={{ borderStyle: 'dashed' }} /> */}

                        </Box>
                    }
                </Box>
            </CardContent>
        </Card>
    );
}

export default AreasLinesGraph