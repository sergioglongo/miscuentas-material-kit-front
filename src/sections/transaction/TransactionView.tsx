import { Box, Button, MenuItem, Select, Snackbar, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useCallback, useEffect, useState } from 'react'
import { Iconify } from 'src/components/iconify'
import { fDateYYmmdd } from 'src/utils/format-time';
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import { connect } from 'react-redux';
import { setTransactions } from 'src/redux/slices/transactions.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { deleteTransaction, getAllTransactionsBody } from 'src/services/api/modules/transaction.module';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import { AlertSnack } from 'src/components/notifications/AlertSnack';
import TransactionTable from './TransactionTable';
import TransferCreateEditViewForm from '../transfer/TransferCreateEditView';

function getFechas() {
  const fechaActual = new Date();
  const diaActual = fechaActual.getDay();
  const inicioSemana = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), fechaActual.getDate() - diaActual);
  const primerDiaMes = new Date(fechaActual.getFullYear(), fechaActual.getMonth(), 1);
  const hoyMenos15Dias = new Date(fechaActual.getTime() - 15 * 24 * 60 * 60 * 1000);
  const hoyMenos30Dias = new Date(fechaActual.getTime() - 30 * 24 * 60 * 60 * 1000);
  const hoyMenos60Dias = new Date(fechaActual.getTime() - 60 * 24 * 60 * 60 * 1000);

  return [
    { label: 'Semana actual', value: fDateYYmmdd(inicioSemana) },
    { label: 'Mes actual', value: fDateYYmmdd(primerDiaMes) },
    { label: 'Ultimos 15 dias', value: fDateYYmmdd(hoyMenos15Dias) },
    { label: 'Ultimos 30 dias', value: fDateYYmmdd(hoyMenos30Dias) },
    { label: 'Ultimos 60 dias', value: fDateYYmmdd(hoyMenos60Dias) }
  ];
}

function TransactionView({ unitActive, transactionsList, setTransactionsListState }: any) {
  const router = useRouter();
  const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const [errorShow, setErrorShow] = useState(false);
  const [successShow, setSuccessShow] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [deleteConfirmShow, setDeleteConfirmShow] = useState(false);
  const [deleteItemSelected, setDeleteItemSelected] = useState(0);
  const [periodo, setPeriodo] = useState();
  const [fechasLista, setFechasLista] = useState([]);
  const [transferCreateEditShow, setTransferCreateEditShow] = useState(false);

  const onNewTransaction = (value: any) => {
    router.navigateState('/transactionEdit', { type: value, });
  }
  const onNewTransfer = () => {
    setTransferCreateEditShow(true);
  }
  const getSetAllTransactions = useCallback(() => {
    const data: any = {
      unitId: unitActive?.id,
    }
    if (periodo !== 'all') {
      data.dateFrom = periodo;
    }
    getAllTransactionsBody(data)
      .then((transactionsResponse: any) => {
        if (transactionsResponse?.success) {
          const transactionWithCategoryPayMethod = transactionsResponse.result.map((transactionItem: any) => (
            {
              ...transactionItem,
              categoryName: transactionItem?.category?.name || '-',
              payMethodName: transactionItem.pay_method.method,
              areaName: transactionItem?.category?.area?.name || '-',
              areaid: transactionItem?.category?.area?.id || 0,
              key: transactionItem.id
            }
          ));
          setTransactionsListState(transactionWithCategoryPayMethod);
        } else {
          setErrorMessage("No se pudieron obtener las transactiones");
          setErrorShow(true);
          console.log("No se pudieron obtener las transactions");
        }
      })
      .catch((err: any) => console.log(err));
  }, [unitActive, setTransactionsListState, periodo]);

  const onDelete = (value: any) => {
    setDeleteItemSelected(value);
    setDeleteConfirmShow(true);
  }
  const onDeleteConfirm = () => {
    // console.log("Elegido editar id: ", value);
    deleteTransaction(deleteItemSelected)
      .then((response: any) => {
        console.log("response", response);
        if (response.success) {
          getSetAllTransactions();
          setSuccessShow(true);
          setDeleteConfirmShow(false);
        } else {
          setDeleteConfirmShow(false);
          setErrorMessage(response.message);
          setErrorShow(true);
        }
      })
      .catch((err: any) => {
        setDeleteConfirmShow(false);
        setErrorMessage(err.message);
        setErrorShow(true);
      });
  };

  useEffect(() => {
    const fechas: any = getFechas();
    setFechasLista(fechas);
    setPeriodo(fechas[0].value);
  }, [])

  useEffect(() => {
    if (periodo) {
      getSetAllTransactions();
    }
  }, [getSetAllTransactions, periodo]);

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
          Gestión de Transacciones
        </Typography>
        <Box display="flex" flexDirection='row' alignItems='center'>
          <Typography variant="h6" >Fecha:</Typography>
          {periodo !== undefined &&
            <Select
              name="areaId"
              style={{ minWidth: '200px', marginLeft: '10px' }}
              variant="outlined"
              size='small'
              value={periodo}
              onChange={(e: any) => setPeriodo(e.target.value)}
            >
              {fechasLista.map((item: any, index: number) => <MenuItem value={item.value} key={index} >{item.label}</MenuItem>)}
              <MenuItem value='all' key='0' >Todas</MenuItem>
            </Select>
          }
        </Box>
        <Box display='flex' flexDirection='row' gap={2}>
          <Tooltip title="Transfiere de una cuenta propia a otra">
            <Button
              variant="contained"
              color="warning"
              style={{color: 'white',}}
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => onNewTransfer()}
            >
              Transferencia
            </Button>
          </Tooltip>
          <Tooltip title="Registra un nuevo gasto">
            <Button
              variant="contained"
              color="error"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => onNewTransaction('out')}
            >
              Gasto
            </Button>
          </Tooltip>
          <Tooltip title="Registra un nuevo ingreso">
            <Button
              variant="contained"
              color="success"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => onNewTransaction('in')}
            >
              Ingreso
            </Button>
          </Tooltip>
        </Box>
      </Box>
      {/* <AreaTable /> */}
      {/* <CategoryTable /> */}
      {/* <PayMethodTable /> */}
      <TransactionTable onDelete={onDelete} />
      <Snackbar
        open={errorShow}
        // message={errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorShow(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <AlertSnack onClose={() => setErrorShow(false)} severity="error">
          {errorMessage}
        </AlertSnack>
      </Snackbar>
      <Snackbar
        open={successShow}
        // message={errorMessage}
        autoHideDuration={5000}
        onClose={() => setSuccessShow(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        <AlertSnack onClose={() => setSuccessShow(false)} severity="success">
          Transacción eliminada satisfactoriamente
        </AlertSnack>
      </Snackbar>
      <ModalConfirm
        openmodal={deleteConfirmShow}
        setOpenmodal={setDeleteConfirmShow}
        children={<Box>¿Seguro que desea eliminar la transacción? <br />
          Se revertira el movimiento en la cuenta correspondiente
        </Box>}
        buttonPrimaryAction={onDeleteConfirm}
        buttonSecondaryAction={() => setDeleteConfirmShow(false)}
        loading={false}
        buttonSecondaryText="Cancelar"
        buttonPrimaryText="Aceptar"
        buttonSecondaryShow
        buttonPrimaryShow
      />
      <ModalConfirm
        openmodal={transferCreateEditShow}
        setOpenmodal={setTransferCreateEditShow}
        children={
          <TransferCreateEditViewForm
            onCancel={() => setTransferCreateEditShow(false)}
            updateTransactionsList={() => getSetAllTransactions()}
          />
        }
        buttonPrimaryAction={() => setTransferCreateEditShow(false)}
        buttonSecondaryAction={() => setTransferCreateEditShow(false)}
        loading={false}
        buttonSecondaryText="Cancelar"
        buttonPrimaryText="Aceptar"
        buttonSecondaryShow={false}
        buttonPrimaryShow={false}
      />
    </DashboardContent>
  )
}
const mapDispatchToProps = (dispatch: any) => ({
  setTransactionsListState: bindActionCreators(setTransactions, dispatch),
})

export default connect(
  (state: any) => ({
    unitActive: state.units.unitActive,
    transactionsList: state.transactions.transactionsList
  }),
  mapDispatchToProps
)(TransactionView);