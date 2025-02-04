import { Box, Button, Typography, useMediaQuery } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import AccountTable from './AccountTable';

function AccountView() {
  const router = useRouter();
  const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('md'));

  const onNewCategory = () => {
    router.push('/accountEdit');
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
        <Button
          sx={{ height: 40, width: 200, alignSelf:'center' }}
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewCategory}
        >
          Nueva Cuenta
        </Button>
      </Box>
      {/* <AreaTable /> */}
      {/* <CategoryTable /> */}
      <AccountTable />
    </DashboardContent>
  )
}

export default AccountView