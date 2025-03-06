import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Box, Grid } from '@mui/material';
import { _tasks, _posts, _timeline } from 'src/_mock';
import AreaIcon from 'src/components/icon/AreaIcons';
import { reportAccountsResumeByUnitId, reportAreasResumeByUnitId, reportAreasMonthToMonthByUnitId } from 'src/services/api/modules/reports.module';
import { fCurrency } from 'src/utils/format-number';
import { AccountsTotalCards } from './cards/AccountsTotalCards';
import { AreasCards } from './cards/AreasCards';
import AreasLinesGraph from './cards/elements/AreasLinesGraph';

const transactionoptions = [
    { value: 'all', label: 'Todos' },
    { value: 'in', label: 'Ingreso' },
    { value: 'out', label: 'Egreso' },
]

const DashboardReports = ({ unitActive, periodo, hoy }: any) => {
    const [areasResumeCircularIn, setAreasResumeCircularIn] = useState([]);
    const [areasResumeCircularOut, setAreasResumeCircularOut] = useState([]);
    const [areasResumeCardsIn, setAreasResumeCardsIn] = useState([]);
    const [areasResumeCardsOut, setAreasResumeCardsOut] = useState([]);
    const [totalIn, setTotalIn] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    const [loadingAreaResume, setLoadingAreaResume] = useState(false);
    const [loadingAcountsReport, setLoadingAccountsReport] = useState(false);
    const [loadingMonthly, setLoadingMonthly] = useState(false);
    const [areasMonthToMonthCards, setAreasMonthToMonthCards] = useState<any>({});
    const [accountsResumeCards, setAccountsResumeCards] = useState<any>([]);
    const processAreasResumeCircular = (areasResumeToProcess: any) => {
        // console.log("areasResumeToProcess", areasResumeToProcess);

        const areasResumeFormated = areasResumeToProcess?.reduce((acc: any, current: any, index: number) => {
            if (index < 3) {
                acc.push({
                    label: current.category.area.name,
                    value: current.total_amount,
                    type: current.type,
                    icon: <AreaIcon iconName={current.category.area.icon} styles={{ fontSize: '36', display: 'flex', color: 'black' }} />
                });
            } else {
                const otrosIndex = acc.findIndex((item: any) => item.label === 'Otros');
                if (otrosIndex === -1) {
                    acc.push({
                        label: 'Otros',
                        value: current.total_amount,
                        type: current.type,
                        icon: <AreaIcon iconName='Home' styles={{ fontSize: '36', display: 'flex', color: 'black' }} />
                    });
                } else {
                    acc[otrosIndex].value += current.total_amount;
                }
            }
            return acc;
        }, []);
        // console.log("areasResumeFormated", areasResumeFormated);
        return areasResumeFormated;
    }
    const processAreasResumeCards = (areasResumeToProcess: any) => {
        const areasResumeFormated = areasResumeToProcess?.map((areaResume: any) => ({
            iconName: areaResume.category.area.icon,
            color: areaResume.category.area.color,
            label: areaResume.category.area.name,
            total: areaResume.total_amount,
            currency: areaResume.currency
        })
        )
        return areasResumeFormated;
    }

    const processAccountsResumeCards = useCallback((accountsResumeToProcess: any) => {
        const areasResumeFormated = accountsResumeToProcess?.map((accountResume: any) => ({
            iconName: accountResume.type,
            color: 'black',
            label: accountResume.name,
            currency: accountResume.currency === 'Dolar' ? 'USD' : accountResume.currency === 'Pesos' ? 'ARS' : 'EUR',
            total: accountResume.balance,
            account: accountResume.id,
            unitId: unitActive
        }));

        return areasResumeFormated;
    }, [unitActive]);
    const processAreasMonthToMonthCards = (areasMonthToMonthToProcess: any, type: any) => {
        const categories: any = [];
        const dataIn: any = [];
        const dataOut: any = [];
        areasMonthToMonthToProcess?.map((areaResume: any) => {
            categories.push(`${areaResume.mes}`);
            dataIn.push(areaResume?.report?.in ? Math.round(parseFloat(areaResume.report.in.total)) : 0);
            dataOut.push(areaResume?.report?.out ? Math.round(parseFloat(areaResume.report.out.total)) : 0);
            return areaResume
        })
        const areasProcessed = {
            dataIn,
            dataOut,
            categories,
        }
        return areasProcessed;
    }
    // item: { iconName: string; color: string; label: string; total: number };
    // { value: 'facebook', label: 'Facebook', total: 323234 }
    const loadingAccountsRef = useRef(false);
    const loadingMonthRef = useRef(false);
    const loadingAreasRef = useRef(false);

    const getAreasReports = useCallback(() => {
        const dataReport: any = {
            unitId: unitActive?.id,
            startDate: periodo,
            endDate: hoy,
        }
        setLoadingAreaResume(true);
        reportAreasResumeByUnitId(dataReport)
            .then((areasResumeResponse: any) => {
                if (areasResumeResponse?.success) {
                    // const categoriesWithArea = areasResumeResponse.result.map((category: any) => ({ ...category, area: category.area.name, type: category.area.type, areaColor: category.area.color}));
                    if (areasResumeResponse.result) {
                        // console.log("areasResumeResponse.result", areasResumeResponse.result.in.reportIn);

                        const areasResumeCircularFormatedIn = processAreasResumeCircular(areasResumeResponse.result.in.reportIn);
                        const areasResumeCircularFormatedOut = processAreasResumeCircular(areasResumeResponse.result.out.reportOut);
                        const areasResumeCardsFormatedIn = processAreasResumeCards(areasResumeResponse.result.in.reportIn);
                        const areasResumeCardsFormatedOut = processAreasResumeCards(areasResumeResponse.result.out.reportOut);
                        setAreasResumeCircularIn(areasResumeCircularFormatedIn);
                        setAreasResumeCircularOut(areasResumeCircularFormatedOut);
                        setAreasResumeCardsIn(areasResumeCardsFormatedIn);
                        setAreasResumeCardsOut(areasResumeCardsFormatedOut);
                        setTotalIn(areasResumeResponse.result.in.total);
                        setTotalOut(areasResumeResponse.result.out.total);
                    } else {
                        setAreasResumeCircularIn([]);
                        setAreasResumeCircularOut([]);
                        setAreasResumeCardsIn([]);
                        setAreasResumeCardsOut([]);
                    }
                } else {
                    console.log("No se pudieron obtener las areas");
                }
            })
            .catch((err: any) => console.log(err))
            .finally(() => {
                loadingAreasRef.current = false;
                setLoadingAreaResume(false);
            })
    }, [unitActive, periodo, hoy]);

    const getAccountsReport = useCallback(() => {
        const dataAccountsReport: any = {
            unitId: unitActive?.id,
        }
        setLoadingAccountsReport(true);
        reportAccountsResumeByUnitId(dataAccountsReport)
            .then((accountsResumeResponse: any) => {
                if (accountsResumeResponse?.success) {
                    if (accountsResumeResponse.result.length > 0) {
                        const areasResumeCardsFormated = processAccountsResumeCards(accountsResumeResponse.result);
                        setAccountsResumeCards(areasResumeCardsFormated);
                    }
                } else {
                    console.log("No se pudieron obtener las cuentas");
                }
            })
            .catch((err: any) => console.log(err))
            .finally(() => {
                loadingAccountsRef.current = false;
                setLoadingAccountsReport(false);
            })
    }, [unitActive, processAccountsResumeCards]);

    const getMonthToMonthReport = useCallback(() => {

        const dataReportMonthIn: any = {
            unitId: unitActive?.id,
            // type: 'in',
            cantMeses: 6
        }
        setLoadingMonthly(true);
        reportAreasMonthToMonthByUnitId(dataReportMonthIn)
            .then((areasMonthToMonthInResponse: any) => {
                if (areasMonthToMonthInResponse?.success) {
                    if (areasMonthToMonthInResponse.result.length > 0) {
                        const areasLineMonthtoMonthInFormated: any = processAreasMonthToMonthCards(areasMonthToMonthInResponse.result, 'in');
                        const series = {
                            categories: areasLineMonthtoMonthInFormated.categories,
                            series: [
                                { name: "Ingresos", data: areasLineMonthtoMonthInFormated.dataIn },
                                { name: "Egresos", data: areasLineMonthtoMonthInFormated.dataOut },
                            ]
                        }
                        setAreasMonthToMonthCards(series);
                    }
                } else {
                    console.log("No se pudieron obtener las areas");
                }
            })
            .catch((err: any) => console.log(err))
            .finally(() => {
                loadingMonthRef.current = false;
                setLoadingMonthly(false);
            })
    }, [unitActive]);

    useEffect(() => {
        if (!loadingAccountsRef.current && unitActive?.id) {
            loadingAccountsRef.current = true;
            getAccountsReport();
        }
        // setTransactionOptionSelected(transactionoptions[0].value); 
    }, [unitActive, getAccountsReport]);

    useEffect(() => {
        if (!loadingAreasRef.current && unitActive?.id && periodo) {
            loadingAreasRef.current = true;
            getAreasReports();
        }
        // setTransactionOptionSelected(transactionoptions[0].value); 
    }, [unitActive, getAreasReports, periodo]);

    useEffect(() => {
        if (!loadingMonthRef.current && unitActive?.id) {
            loadingMonthRef.current = true;
            getMonthToMonthReport();
        }
        // setTransactionOptionSelected(transactionoptions[0].value); 
    }, [unitActive, getMonthToMonthReport]);

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
                <Box display='flex' flexDirection='column' gap={2}>
                    <AreasCards
                        title='Egresos por área'
                        list={areasResumeCardsOut}
                        totalText={`Total: ${fCurrency(totalOut)}`}
                        chart={{
                            series: areasResumeCircularOut,
                        }}
                        loading={loadingAreaResume}
                        // sx={{ height: '500px' }}
                        // heightContent="450px"
                        options={transactionoptions}
                    />
                    <AreasCards
                        title='Ingresos por área'
                        list={areasResumeCardsIn}
                        totalText={`Total: ${fCurrency(totalIn)}`}
                        chart={{
                            series: areasResumeCircularIn,
                        }}
                        loading={loadingAreaResume}
                        // sx={{ height: '500px' }}
                        // heightContent="450px"
                        options={transactionoptions}
                    />
                </Box>
            </Grid>
            <Grid item xs={12} md={8} lg={8}>
                <AreasLinesGraph
                    series={areasMonthToMonthCards.series}
                    categories={areasMonthToMonthCards.categories}
                    heightContent="428px"
                    title='Transacciones mensuales'
                    subheader='Últimos 6 meses'
                    loading={loadingMonthly}
                />
            </Grid>
            <Grid item xs={12} md={4} lg={4}>
                <AccountsTotalCards
                    title="Estado de cuentas"
                    list={accountsResumeCards}
                    heightContent="465px"
                    loading={loadingAcountsReport}
                />
            </Grid>
        </Grid>
    )
}

const mapDispatchToProps = {}

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
    }),
    mapDispatchToProps
)(DashboardReports);