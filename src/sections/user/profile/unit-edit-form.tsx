import { useState } from 'react';
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, Typography } from '@mui/material'
import { Field, Form } from 'redux-form'
import { CheckboxRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { useRouter } from 'src/routes/hooks';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import UnitIcon, { UnitIconsList } from 'src/components/icon/unit-icons';

const styles: any = {
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '300px',
        height: 'auto',
        justifyContent: 'space-around',
    },
    icon: {
        width: 'auto',
        height: 'auto',
        margin: '4px',
        boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
    },
};

function UnitEditForm({ handleSave, unitData, icon, setIcon }: any) {
    let dropzoneRef: any;
    const router = useRouter();
    const [openmodal, setOpenmodal] = useState(false);
    const onSelectIcon = (iconSelected: string) => {
        console.log("icono seleccionado", iconSelected);
        setOpenmodal(false);
        setIcon(iconSelected);
    }
    return (
        <Form onSubmit={handleSave} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} style={{ width: '100%' }} >
                    <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {(!!unitData?.photo || !!icon) &&
                            <UnitIcon
                                iconName={icon || unitData?.photo}
                                styles={{
                                    fontSize: 100,
                                    display: 'flex',
                                    color: 'black',
                                    borderRadius: '5px',
                                    // border: '1px solid #ccc',
                                    boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                    padding: '5px'
                                }}
                            />}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="name"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese el nombre de la unidad'
                            label="Nombre de unidad"
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={unitData?.name || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            label="Descripción"
                            placeholder='Ingrese una descripcion sobre la unidad'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            aria-multiline
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={unitData?.description || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Typography variant="h6" width='200px'>Unidad principal:</Typography>
                        <FormControl fullWidth>
                            <Field
                                name="is_main_unit"
                                component={CheckboxRedux}
                                label="Principal"
                                size="large"
                                style={{ width: '50px' }}
                                onChange={(e: any) => console.log(e.target.value)}
                                value={unitData?.is_main_unit || false}
                            />
                        </FormControl>
                    </Box>
                    <Box style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                        <Typography variant="h6" width='150px'>Elija un icono:</Typography>
                        <Button variant='contained' style={{ width: '200px' }} onClick={() => setOpenmodal(true)} >Elegir</Button>

                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                    <Grid item xs={12} sm={6} style={{ width: '100%', marginTop: '10px' }}>
                        <Button fullWidth size="large" color="inherit" variant="contained" onClick={() => router.back()}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ width: '100%', marginTop: '10px' }}>

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            color="primary"
                            variant="contained"
                        // onClick={handleSignUp}
                        >
                            Guardar
                        </LoadingButton>
                    </Grid>
                </Grid>
            </Grid>
            <ModalConfirm
                openmodal={openmodal}
                setOpenmodal={setOpenmodal}
                titulo="Elija un icono"
                children={
                    // <IconList
                    //     icons={CategoryIconsList}
                    //     width="300px"
                    //     height="auto"
                    //     separation="4px"
                    //     onSelectIcon={onSelectIcon}
                    // >
                    //     <CategoryIcon iconName={icon} />
                    // </IconList>
                    <div style={styles.container}>
                        {UnitIconsList.map((iconCategory: any, index: any) => (
                            <Button key={index} style={styles.icon} onClick={() => onSelectIcon(iconCategory)}>
                                {/* <Iconify icon={icon} /> */}
                                <UnitIcon iconName={iconCategory} styles={{ color: '#343434FF' }} />
                            </Button>
                        ))}
                    </div>
                }
                buttonPrimaryAction={() => setOpenmodal(false)}
                buttonSecondaryAction={() => setOpenmodal(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Form>
    )
}

export default UnitEditForm;