import { Box, Button, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import DashboardReports from './DashboardReports';
// import AreaTable from './AreaTable'

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

function DashboardView() {
  const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const router = useRouter();
  const [periodo, setPeriodo] = useState(null);
  const [fechasLista, setFechasLista] = useState([]);
  const hoy = formatoFecha(new Date());
  const onNewTransaction = (value: any) => {
    router.navigateState('/transactionEdit', { type: value, });
  }
  useEffect(() => {
    const fechas: any = getFechas();
    setFechasLista(fechas);
    setPeriodo(fechas[0].value);
  }, [])
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
        <Typography variant="h4" >
          Bienvenido, mirá un poco tus estadísticas
        </Typography>
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
      {/* <AreaTable /> */}
      <DashboardReports periodo={periodo} hoy={hoy} />
    </DashboardContent>
  )
}

export default DashboardView