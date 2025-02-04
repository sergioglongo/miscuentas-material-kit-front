import { Box, Typography } from '@mui/material'
import React, { useState } from 'react'
import { DashboardContent } from 'src/layouts/dashboard'
import { useRouter } from 'src/routes/hooks';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import PayMethodTable from './PayMethodTable';
import PayMethodEditViewForm from './PayMethodEditView';

function PayMethodView() {
  const router = useRouter();
  const [paymethodSelected, setPayMethodSelected] = useState({});
  const [openmodalPayMethodEdit, setOpenmodalPayMethodEdit] = useState(false);

  return (
    <DashboardContent>
      <Box display="flex" flexDirection='column' alignItems="flex-start" mb={5}>
        <Typography variant="h4" flexGrow={1}>
          Gestión de Métodos de pago
        </Typography>
        <Typography variant="h6" flexGrow={1} color='text.secondary'>
          Lista de medios de pago disponibles. Su creación se realiza desde cada cuenta.
        </Typography>
        {/* <Button
          variant="contained"
          color="inherit"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={onNewPayMethod}
        >
          Nuevo Metodo de Pago
        </Button> */}
      </Box>
      {/* <AreaTable /> */}
      {/* <CategoryTable /> */}
      <PayMethodTable setPayMethodSelected={setPayMethodSelected} setOpenmodalPayMethodEdit={setOpenmodalPayMethodEdit} />
      <ModalConfirm
        openmodal={openmodalPayMethodEdit}
        setOpenmodal={setOpenmodalPayMethodEdit}
        children={
          // <AreaCategoriesCreateEditViewForm
          //   categoryId={categorySelected}
          //   onCancel={() => setOpenmodalCategoryEdit(false)}
          //   color={color}
          //   areaId={areaData?.id}
          //   updateCategoriesList={updateCategoriesList}
          // />
          <PayMethodEditViewForm
            payMethodId={paymethodSelected}
            onCancel={() => setOpenmodalPayMethodEdit(false)}
            setOpenmodalPayMethodEdit={setOpenmodalPayMethodEdit}
            // updateCategoriesList={updateCategoriesList}
          />
        }
        buttonPrimaryAction={() => setOpenmodalPayMethodEdit(false)}
        buttonSecondaryAction={() => setOpenmodalPayMethodEdit(false)}
        loading={false}
        buttonSecondaryText="Cancelar"
        buttonPrimaryText="Aceptar"
        buttonSecondaryShow={false}
        buttonPrimaryShow={false}
      />
    </DashboardContent>
  )
}

export default PayMethodView