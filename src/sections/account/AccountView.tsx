import { Box, Button, Tooltip, Typography, useMediaQuery } from '@mui/material'
import React, { useState } from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import AccountTable from './AccountTable';

function AccountView() {
  const router = useRouter();
  const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));
  const [transferCreateEditShow, setTransferCreateEditShow] = useState(false);

  const onNewAccount = () => {
    router.push('/accountEdit');
  }
  const onNewTransfer = () => {
    setTransferCreateEditShow(true);
  }
  return (
    <DashboardContent>
      <Box display="flex" flexDirection={isMdDown ? 'column' : 'row'} justifyContent='space-arround' alignItems="flex-start" mb={5} >
        <Box display="flex" width='100%' flexDirection='column' alignItems="flex-start" mb={isMdDown ? 3 : 0}>
          <Typography variant="h4" flexGrow={1}>
            Gestión de Cuentas
          </Typography>
          <Typography variant="h6" flexGrow={1} color='text.secondary'>
            Lista de cuentas disponibles. Monedas disponibles Pesos, Dolares y Euros.
          </Typography>
        </Box>
        <Box display='flex' flexDirection='row' gap={2}>
          <Tooltip title="Transfiere de una cuenta propia a otra">
            <Button
              style={{color: 'white',}}
              variant="contained"
              color="warning"
              startIcon={<Iconify icon="mingcute:add-line" />}
              onClick={() => onNewTransfer()}
            >
              Transferencia
            </Button>
          </Tooltip>
          <Button
            sx={{ height: 40, minWidth: 180, alignSelf: 'center' }}
            variant="contained"
            color="inherit"
            startIcon={<Iconify icon="mingcute:add-line" />}
            onClick={onNewAccount}
          >
            Nueva Cuenta
          </Button>
        </Box>
      </Box>
      {/* <AreaTable /> */}
      {/* <CategoryTable /> */}
      <AccountTable
        transferCreateEditShow={transferCreateEditShow}
        setTransferCreateEditShow={setTransferCreateEditShow}
      />

    </DashboardContent>
  )
}

export default AccountView