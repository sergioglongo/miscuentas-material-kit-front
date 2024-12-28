import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import TransactionTable from './TransactionTable';

function TransactionView() {
  const router = useRouter();

  const onNewTransaction = () => { 
    router.push('/transactionEdit');
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gestión de Transacciones
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewTransaction}
        >
          Nueva transacción
        </Button>
      </Box>
      {/* <AreaTable /> */}
      {/* <CategoryTable /> */}
      {/* <PayMethodTable /> */}
      <TransactionTable />
    </DashboardContent>
  )
}

export default TransactionView