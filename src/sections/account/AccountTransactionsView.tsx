import { Box, Button, MenuItem, Typography, Select } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Iconify } from 'src/components/iconify'
import { useLocation } from 'react-router-dom';
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import { getAllTransactionsByUnitAndAccount } from 'src/services/api/modules/transaction.module';
import AccountTransactionsTable from './AccountTransactionsTable';

interface AccountTransactionViewProps {
    unitActive: any;
    account: any;
}
const formatoFecha = (fecha: Date) => {
    const año = fecha.getFullYear();
    const mes = fecha.getMonth() + 1;
    const dia = fecha.getDate();
    return `${año}-${mes.toString().padStart(2, '0')}-${dia.toString().padStart(2, '0')}`;
};

function getFechas() {
    const fechaActual = new Date();
    const diaActual = fechaActual.getDay();
    const inicioSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - diaActual);
    const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
    const hoyMenos15Dias = new Date(fechaActual.getTime() - 15 * 24 * 60 * 60 * 1000);
    const hoyMenos30Dias = new Date(fechaActual.getTime() - 30 * 24 * 60 * 60 * 1000);

    return [
        { label: 'Semana actual', value: formatoFecha(inicioSemana) },
        { label: 'Mes actual', value: formatoFecha(primerDiaMes) },
        { label: 'Ultimos 15 dias', value: formatoFecha(hoyMenos15Dias) },
        { label: 'Ultimos 30 dias', value: formatoFecha(hoyMenos30Dias) }
    ];
}

function AccountTransactionView({ unitActive, account }: any) {
    const router = useRouter();
    const fechaActual = new Date();
    const diaActual = fechaActual.getDay();
    const [transactions, setTransactions] = useState([]);
    const [accountState, setAccountState] = useState<any>({});
    const [periodo, setPeriodo] = useState(new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - diaActual));
    const [fechasLista, setFechasLista] = useState([]);
    const location = useLocation();
    const transactionData = location.state;

    useEffect(() => {
        const fechas: any = getFechas();
        setFechasLista(fechas);
        setPeriodo(fechas[0].value);
    }, [])

    useEffect(() => {
        const data = {
            unitId: transactionData.unitActive,
            account: transactionData.account,
            dateFrom: periodo,
            dateTo: formatoFecha(new Date()),
        }
        console.log("data a enviar en consulta", transactionData);

        getAllTransactionsByUnitAndAccount(data)
            .then((transactionsResponse: any) => {
                console.log("transactionsResponse", transactionsResponse);
                if (transactionsResponse?.success) {
                    const transactionWithCategoryPayMethod = transactionsResponse.transaction.map((transactionItem: any) => (
                        {
                            ...transactionItem,
                            categoryName: transactionItem.category.name,
                            payMethodName: transactionItem.pay_method.method,
                            areaName: transactionItem.category.area.name,
                            areaid: transactionItem.category.area.id,
                            key: transactionItem.id
                        }
                    ));
                    setTransactions(transactionWithCategoryPayMethod);
                    setAccountState(transactionsResponse?.account);
                } else {
                    console.log("No se pudieron obtener las transaction");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unitActive, account, periodo, transactionData]);
    useEffect(() => {
        console.log("accountState", accountState);
        
    },[accountState]);
    return (
        <DashboardContent>
            <Box display="flex" alignItems="center" mb={5} gap={2}>
                <Typography variant="h4" flexGrow={1}>
                    Movimientos en Cuenta {accountState?.name || ''}
                    </Typography>
            </Box>
            <Box display="flex" alignItems="center" mb={5} gap={2}>
                {/* <Typography variant="h4" flexGrow={1}>
                    Transacciones en cuenta
                </Typography> */}
                <Box display="flex" flexDirection='row' alignItems='center'>
                    <Typography variant="h6" >Fecha:</Typography>
                    <Select
                        name="areaId"
                        style={{ minWidth: '200px', marginLeft: '10px' }}
                        variant="outlined"
                        size='small'
                        value={periodo}
                        onChange={(e: any) => setPeriodo(e.target.value)}
                    >
                        {/* <MenuItem value='30' key='1' >mes actual</MenuItem> */}
                        {fechasLista.map((item: any, index: number) => <MenuItem value={item.value} key={index} >{item.label}</MenuItem>)}
                    </Select>
                </Box>
                <Button
                    variant="contained"
                    color="error"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={() => router.push('/paymentEdit')}
                >
                    Gasto
                </Button>
                <Button
                    variant="contained"
                    color="success"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={() => router.push('/incomeEdit')}
                >
                    Ingreso
                </Button>
            </Box>
            {/* <TransactionTable /> */}
            <AccountTransactionsTable transactions={transactions} />
        </DashboardContent>
    )
}

export default AccountTransactionView