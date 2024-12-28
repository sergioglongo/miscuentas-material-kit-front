import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import PayMethodTable from './PayMethodTable';

function PayMethodView() {
  const router = useRouter();

  const onNewPayMethod = () => { 
    router.push('/payMethodEdit');
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gestión de Métodos de pago
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewPayMethod}
        >
          Nuevo Metodo de Pago
        </Button>
      </Box>
      {/* <AreaTable /> */}
      {/* <CategoryTable /> */}
      <PayMethodTable />
    </DashboardContent>
  )
}

export default PayMethodView