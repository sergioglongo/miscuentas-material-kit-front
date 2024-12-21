import { Box, Button, Typography } from '@mui/material'
import React from 'react'
import { Iconify } from 'src/components/iconify'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import CategoryTable from './CategoryTable';
// import AreaTable from './AreaTable'

function CategoryView() {
  const router = useRouter();

  const onNewCategory = () => { 
    router.push('/categoryEdit');
  }

  return (
    <DashboardContent>
      <Box display="flex" alignItems="center" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gestión de Categorias
        </Typography>
        <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewCategory}
        >
          Nueva Categoria
        </Button>
      </Box>
      {/* <AreaTable /> */}
      <CategoryTable />
    </DashboardContent>
  )
}

export default CategoryView