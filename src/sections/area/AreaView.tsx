import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import AreaTable from './AreaTable'

function AreaView() {
  const router = useRouter();

  const onNewArea = () => { 
    router.push('/areaEdit');
    // router.push('/areaEdit');
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gestión de Areas
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewArea}
        >
          Nueva Area
        </Button>
      </Box>
      <AreaTable />
    </DashboardContent>
  )
}

export default AreaView