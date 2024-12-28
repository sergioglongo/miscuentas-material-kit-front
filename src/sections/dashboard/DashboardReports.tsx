import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { createTheme, ThemeProvider, useTheme } from '@mui/material/styles';
import { Box, Checkbox, Grid, IconButton, Tooltip } from '@mui/material';
import { useRouter } from 'src/routes/hooks';
import MUIDataTable from 'mui-datatables';
import CategoryIcon from 'src/components/icon/category-icons';
import InternalIcon from 'src/components/icon/internal-icons';
import { getAllCategoriesByUnitId } from 'src/services/api/modules/category.module';
import { _tasks, _posts, _timeline } from 'src/_mock';
import { reportAccountsResumeByUnitId, reportAreasResumeByUnitId } from 'src/services/api/modules/reports.module';
import { AnalyticsCurrentVisits } from '../overview/analytics-current-visits';
import { AnalyticsTasks } from '../overview/analytics-tasks';
import { AnalyticsWidgetSummary } from '../overview/analytics-widget-summary';
import { AnalyticsConversionRates } from '../overview/analytics-conversion-rates';
import { AnalyticsCurrentSubject } from '../overview/analytics-current-subject';
import { AnalyticsTrafficBySite } from '../overview/analytics-traffic-by-site';
import { AreasTotalCards } from './cards/AreasTotalCards';
import { AccountsTotalCards } from './cards/AccountsTotalCards';

const DashboardReports = ({ unitActive, periodo, hoy }: any) => {
    const [areasResumeCircular, setAreasResumeCircular] = useState([]);
    const [areasResumeCards, setAreasResumeCards] = useState([]);
    const [accountsResumeCards, setAccountsResumeCards] = useState([]);
    const rowsPerPage = 10;
    const router = useRouter();
    const processAreasResumeCircular = (areasResumeToProcess: any) => {
        const areasResumeFormated = areasResumeToProcess.map((areaResume: any) => ({
            label: areaResume.category.area.name,
            value: areaResume.total_amount
        })
        )
        return areasResumeFormated;
    }
    const processAreasResumeCards = (areasResumeToProcess: any) => {
        const areasResumeFormated = areasResumeToProcess.map((areaResume: any) => ({
            iconName: areaResume.category.area.icon,
            color: areaResume.category.area.color,
            label: areaResume.category.area.name,
            total: areaResume.total_amount
        })
        )
        return areasResumeFormated;
    }
    const processAccountsResumeCards = (accountsResumeToProcess: any) => {
        const areasResumeFormated = accountsResumeToProcess.map((accountResume: any) => ({
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
    useEffect(() => {
        const dataReport = {
            unitId: unitActive?.id,
            startDate: periodo,
            endDate: hoy
        }
        reportAreasResumeByUnitId(dataReport)
            .then((areasResumeResponse: any) => {
                console.log("areasResumeResponse", areasResumeResponse);
                if (areasResumeResponse?.success) {
                    // const categoriesWithArea = areasResumeResponse.result.map((category: any) => ({ ...category, area: category.area.name, type: category.area.type, areaColor: category.area.color}));
                    const areasResumeCircularFormated = processAreasResumeCircular(areasResumeResponse.result);
                    const areasResumeCardsFormated = processAreasResumeCards(areasResumeResponse.result);
                    setAreasResumeCircular(areasResumeCircularFormated);
                    setAreasResumeCards(areasResumeCardsFormated);
                    console.log("Formated", areasResumeCardsFormated, areasResumeCircularFormated);
                } else {
                    console.log("No se pudieron obtener las areas");
                }
            })
            .catch((err: any) => console.log(err));
        reportAccountsResumeByUnitId(dataReport)
            .then((accountsResumeResponse: any) => {
                console.log("accountsResumeResponse", accountsResumeResponse);
                if (accountsResumeResponse?.success) {
                    // const categoriesWithArea = accountsResumeResponse.result.map((category: any) => ({ ...category, area: category.area.name, type: category.area.type, areaColor: category.area.color}));
                    const areasResumeCardsFormated = processAccountsResumeCards(accountsResumeResponse.result);
                    setAccountsResumeCards(areasResumeCardsFormated);
                    console.log("Formated", areasResumeCardsFormated);
                } else {
                    console.log("No se pudieron obtener las cuentas");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unitActive, periodo, hoy]);

    return (
        <Grid container spacing={3} gap={2} padding={2}>
            <Grid xs={12} md={6} lg={4}>
                <AnalyticsCurrentVisits
                    title="Gastos de areas"
                    chart={{
                        series: areasResumeCircular,
                    }}
                />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
                <AreasTotalCards
                    title="Gastos de areas"
                    list={areasResumeCards}
                />
            </Grid>
            <Grid xs={12} md={6} lg={4}>
                <AccountsTotalCards
                    title="Estado de cuentas"
                    list={accountsResumeCards}
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