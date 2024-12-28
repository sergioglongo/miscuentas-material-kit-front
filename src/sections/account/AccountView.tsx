import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import AccountTable from './AccountTable';

function AccountView() {
  const router = useRouter();

  const onNewCategory = () => { 
    router.push('/accountEdit');
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gestión de Cuentas
        </Typography>
        <Button
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