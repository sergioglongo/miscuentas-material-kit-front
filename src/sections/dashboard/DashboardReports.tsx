import React, { useCallback, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { Grid } from '@mui/material';
import { _tasks, _posts, _timeline } from 'src/_mock';
import AreaIcon from 'src/components/icon/AreaIcons';
import { reportAccountsResumeByUnitId, reportAreasResumeByUnitId } from 'src/services/api/modules/reports.module';
import { AreasTotalCards } from './cards/AreasTotalCards';
import { AccountsTotalCards } from './cards/AccountsTotalCards';
import { AreasPorcentualCircleGraph } from './cards/AreasPorcentualCircleGraph';
import AreasCircleGraph from './cards/elements/AreasCircleGraph';
import { AreasCards } from './cards/AreasCards';

const transactionoptions = [
    { value: 'all', label: 'Todos' },
    { value: 'in', label: 'Ingreso' },
    { value: 'out', label: 'Egreso' },
]

const DashboardReports = ({ unitActive, periodo, hoy }: any) => {
    const [areasResumeCircular, setAreasResumeCircular] = useState([]);
    const [areasResumeCards, setAreasResumeCards] = useState([]);
    const [accountsResumeCards, setAccountsResumeCards] = useState([]);
    const [transactionOptionSelected, setTransactionOptionSelected] = useState('all');
    const processAreasResumeCircular = (areasResumeToProcess: any) => {
        const areasResumeFormated = areasResumeToProcess?.reduce((acc: any, current: any, index: number) => {
            if (index < 3) {
                acc.push({
                    label: current.category.area.name,
                    value: current.total_amount,
                    icon: <AreaIcon iconName={current.category.area.icon} styles={{ fontSize: '36', display: 'flex', color: 'black' }} />
                });
            } else {
                const otrosIndex = acc.findIndex((item: any) => item.label === 'Otros');
                if (otrosIndex === -1) {
                    acc.push({
                        label: 'Otros',
                        value: current.total_amount,
                        icon: <AreaIcon iconName='Home' styles={{ fontSize: '36', display: 'flex', color: 'black' }} />
                    });
                } else {
                    acc[otrosIndex].value += current.total_amount;
                }
            }
            return acc;
        }, []);
        return areasResumeFormated;
    }
    const processAreasResumeCards = (areasResumeToProcess: any) => {
        const areasResumeFormated = areasResumeToProcess?.map((areaResume: any) => ({
            iconName: areaResume.category.area.icon,
            color: areaResume.category.area.color,
            label: areaResume.category.area.name,
            total: areaResume.total_amount
        })
        )
        return areasResumeFormated;
    }
    const processAccountsResumeCards = (accountsResumeToProcess: any) => {
        const areasResumeFormated = accountsResumeToProcess?.map((accountResume: any) => ({
            iconName: accountResume.type,
            color: 'black',
            label: accountResume.name,
            total: accountResume.balance
        })
        )
        return areasResumeFormated;
    }
    // item: { iconName: string; color: string; label: string; total: number };
    // { value: 'facebook', label: 'Facebook', total: 323234 }
    const loadingRef = useRef(false);

    const getReports = useCallback(() => {
        const dataReport: any = {
            unitId: unitActive?.id,
            startDate: periodo,
            endDate: hoy,
        }
        if (transactionOptionSelected !== 'all') {
            dataReport.type = transactionOptionSelected
        }
        reportAreasResumeByUnitId(dataReport)
            .then((areasResumeResponse: any) => {
                if (areasResumeResponse?.success) {
                    // const categoriesWithArea = areasResumeResponse.result.map((category: any) => ({ ...category, area: category.area.name, type: category.area.type, areaColor: category.area.color}));
                    if (areasResumeResponse.result.length > 0) {
                        const areasResumeCircularFormated = processAreasResumeCircular(areasResumeResponse.result);
                        const areasResumeCardsFormated = processAreasResumeCards(areasResumeResponse.result);
                        setAreasResumeCircular(areasResumeCircularFormated);
                        setAreasResumeCards(areasResumeCardsFormated);
                    }
                } else {
                    console.log("No se pudieron obtener las areas");
                }
            })
            .catch((err: any) => console.log(err))
            .finally(() => {
                reportAccountsResumeByUnitId(dataReport)
                    .then((accountsResumeResponse: any) => {
                        if (accountsResumeResponse?.success) {
                            // const categoriesWithArea = accountsResumeResponse.result.map((category: any) => ({ ...category, area: category.area.name, type: category.area.type, areaColor: category.area.color}));
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
                        loadingRef.current = false;
                    })
            })
    }, [unitActive, periodo, hoy, transactionOptionSelected]);

    useEffect(() => {

        if ((areasResumeCircular.length === 0 || areasResumeCards.length === 0) && !loadingRef.current) {
            loadingRef.current = true;
            getReports();
        }
        // setTransactionOptionSelected(transactionoptions[0].value); 
    }, [unitActive, periodo, hoy, areasResumeCircular, areasResumeCards, accountsResumeCards, getReports]);
    useEffect(() => {
        getReports();
        console.log("transactionOptionSelected", transactionOptionSelected);
        
    }, [transactionOptionSelected, getReports]);
    return (
        <Grid container spacing={2}>
            <Grid item xs={12} md={12} lg={12}>
                {/* <AreasPorcentualCircleGraph
                    title="Gastos de areas"
                    chart={{
                        series: areasResumeCircular,
                    }}
                    sx={{ height: '500px' }}
                /> */}
                <AreasCards
                    title='Areas'
                    list={areasResumeCards}
                    chart={{
                        series: areasResumeCircular,
                    }}
                    // sx={{ height: '500px' }}
                    // heightContent="450px"
                    options={transactionoptions}
                    transactionOptionSelected={transactionOptionSelected}
                    onSelectOption={setTransactionOptionSelected}
                />
            </Grid>
            {/* <Grid item xs={12} md={6} lg={4}>
                <AreasTotalCards
                    title="Transacciones de areas"
                    list={areasResumeCards}
                    sx={{ width: '100%' }}
                    heightContent="450px"
                    options={transactionoptions}
                    transactionOptionSelected={transactionOptionSelected}
                    onSelectOption={setTransactionOptionSelected}
                />
            </Grid> */}
            <Grid item xs={12} md={4} lg={4}>
                <AccountsTotalCards
                    title="Estado de cuentas"
                    list={accountsResumeCards}
                    heightContent="450px"
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