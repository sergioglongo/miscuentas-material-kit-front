import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import TransactionTable from './TransactionTable';

function PaymentView() {
  const router = useRouter();

  const onNewPayment = () => { 
    router.push('/paymentEdit');
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Egresos
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewPayment}
        >
          Nuevo egreso
        </Button>
      </Box>
      <TransactionTable />
    </DashboardContent>
  )
}

export default PaymentView