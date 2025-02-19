import { Box, Button, MenuItem, Typography, Select, useMediaQuery } from '@mui/material'
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
    const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
    const fechaActual = new Date();
    const diaActual = fechaActual.getDay();
    const [transactions, setTransactions] = useState([]);
    const [accountState, setAccountState] = useState<any>({});
    const [periodo, setPeriodo] = useState(new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - diaActual));
    const [fechasLista, setFechasLista] = useState([]);
    const [totalIn, setTotalIn] = useState(0);
    const [totalOut, setTotalOut] = useState(0);
    const [totalBalance, setTotalBalance] = useState(0);

    const location = useLocation();
    const transactionData = location.state;

    useEffect(() => {
        const fechas: any = getFechas();
        setFechasLista(fechas);
        setPeriodo(fechas[0].value);
    }, [])
    const calcAcumulated = (transactionsToAcumulate: any, balance: any) => {
        const totalInCalc = transactionsToAcumulate.filter((transactionItem: any) => transactionItem.type === 'in').reduce((acc: any, transactionItem: any) => acc + transactionItem.amount, 0);
        const totalOutCalc = transactionsToAcumulate.filter((transactionItem: any) => transactionItem.type === 'out').reduce((acc: any, transactionItem: any) => acc + transactionItem.amount, 0);
        setTotalIn(totalInCalc);
        setTotalOut(totalOutCalc);
        setTotalBalance(totalInCalc - totalOutCalc);
        console.log("transactionsToAcumulate", transactionsToAcumulate);
        let acumulado = balance  - (totalInCalc - totalOutCalc);
        
        const transactionsWithAcumulado = transactionsToAcumulate.map((transaction: any, index: number) => {
            if (transaction.type === 'in') {
                acumulado += transaction.amount;
            } else {
                acumulado -= transaction.amount;
            }
            transaction.acumulated = acumulado;
            return transaction;
        });
        const initialRow = {
            description: "Balance inicial",
            amount: balance - (totalInCalc - totalOutCalc),
            acumulated: '-',
            date: periodo,
            categoryName: '-',
            payMethodName: '-',
            areaName: '-',
            areaid: 0,
            key: 0
        };
        const todayRow = {
            description: "Balance actual",
            amount: balance,
            acumulated: '-',
            date: fechaActual,
            categoryName: '-',
            payMethodName: '-',
            areaName: '-',
            areaid: 0,
            key: 0
        };
        const transactionsWithInitialRow = [initialRow, ...transactionsWithAcumulado, todayRow];
        console.log("transactionsWithAcumulado", transactionsWithInitialRow);
        return transactionsWithInitialRow;
    }
    const onNewTransaction = (value: any) => {
        router.navigateState('/transactionEdit', { type: value, });
      }
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
                            categoryName: transactionItem?.category?.name || 'Ajuste',
                            payMethodName: transactionItem.pay_method.method,
                            areaName: transactionItem.category?.area?.name || 'Ajuste',
                            areaid: transactionItem.category?.area.id || 0,
                            key: transactionItem.id + 1
                        }
                    ));
                    // setTransactions(transactionWithCategoryPayMethod);
                    setAccountState(transactionsResponse?.account);
                    // calcTotals(transactionsResponse.transaction);
                    const transactionsWithAcumulado: any = calcAcumulated(transactionWithCategoryPayMethod, transactionsResponse.account.balance);
                    setTransactions(transactionsWithAcumulado);
                } else {
                    console.log("No se pudieron obtener las transaction");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unitActive, account, periodo, transactionData]); // eslint-disable-line
    useEffect(() => {
        console.log("accountState", accountState);

    }, [accountState]);
    return (
        <DashboardContent>
            <Box
                display="flex"
                flexDirection={isMdDown ? 'column' : 'row'}
                justifyContent='space-between'
                alignItems="center"
                mb={5}
                gap={2}
            >
                <Typography variant="h4" flexGrow={1}>
                    Movimientos en Cuenta {accountState?.name || ''}
                </Typography>
                <Box
                    display="flex"
                    flexDirection={isMdDown ? 'column' : 'row'}
                    justifyContent='space-between'
                    alignItems="center"
                    mb={3}
                    gap={2}
                >
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
                    <Box display='flex' flexDirection='row' gap={2}>
                        <Button
                            variant="contained"
                            color="error"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                            onClick={() => onNewTransaction('out')}
                        >
                            Gasto
                        </Button>
                        <Button
                            variant="contained"
                            color="success"
                            startIcon={<Iconify icon="mingcute:add-line" />}
                            onClick={() => onNewTransaction('in')}
                        >
                            Ingreso
                        </Button>
                    </Box>
                </Box>
                {/* <TransactionTable /> */}
            </Box>
            <AccountTransactionsTable
                transactions={transactions}
                account={accountState}
                totalIn={totalIn}
                totalOut={totalOut}
                totalBalance={totalBalance}
            />

        </DashboardContent>
    )
}

export default AccountTransactionView