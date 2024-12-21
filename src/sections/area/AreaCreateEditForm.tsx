import { useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import IconList from 'src/components/list/IconList';
import { IArea } from 'src/config/types/types';
import { CheckboxRedux, SwitchRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, Typography, Switch} from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import ModalConfirm from 'src/components/modal/ModalConfirm';
import AreaIcon, { AreaIconsList } from 'src/components/icon/area-icons';
import styles from './area.module.css';

interface AreaEditProps {
    handleEdit: any;
    areaData: IArea;
    color: string;
    setColor: any;
    icon: string;
    setIcon: any;
    type: string;
    setType: any;
    presetColors: string[]
}

// const iconNames = [
//     'eva:shopping-bag-fill',
//     'eva:color-palette-fill',
//     'eva:book-fill',
//     'eva:home-fill',
//     'eva:shopping-cart-fill',
//     'eva:car-fill',
//     'eva:music-fill',
//     'eva:phone-fill',
//     'eva:tv-fill',
//     'eva:wifi-fill',
//     'eva:gift-fill',
//     'eva:file-fill',
//     'eva:credit-card-fill',
//     'eva:gift-fill',
//     'eva:clock-fill',
//     'eva:at-fill',
//     'eva:activity-fill',
//     'eva:cube-fill',
//     'eva:droplet-fill',
//     'eva:folder-fill',
//   ];

function AreaCreateEditForm({ handleEdit, areaData, color, setColor, icon, setIcon, type, setType, presetColors }: AreaEditProps) {

    const [openmodal, setOpenmodal] = useState(false);
    // const [color, setColor] = useState("#b32aa9");
    const router = useRouter();
    console.log("areaData", areaData, areaData ? areaData?.is_active : true)
    const onSelectIcon = (iconSelected: string) => {
        console.log("icono seleccionado", iconSelected);
        setOpenmodal(false);
        setIcon(iconSelected);
    }

    useEffect(() => {
        if (areaData) {
            console.log(areaData);
        }
    }, [areaData])
    useEffect(() => {
        console.log("color", color);

    }, [color])
    useEffect(() => {
        console.log("icon", icon);

    }, [icon])
    useEffect(() => {
        console.log("type", type);

    }, [type])
    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="name"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese el nombre'
                            label="Nombre"
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={areaData?.name || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            label="Descripción"
                            placeholder='Ingrese la descripción'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={areaData?.description || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Grid container spacing={2} style={{ width: '80%' }}>
                        <Grid item xs={12} sm={12} style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }} >
                            <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                                <Typography variant="h6">Elija un color:</Typography>
                                {presetColors.map((presetColor) => (
                                    <Button
                                        key={presetColor}
                                        className={styles.pickerSwatches}
                                        style={{
                                            background: presetColor,
                                            border: `3px solid ${presetColor !== color ? presetColor : '#FAAC40'}`,
                                            height: '30px',
                                        }}
                                        onClick={() => setColor(presetColor)}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Box sx={{ gap: 2, width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}>
                                <Typography variant="h6">Elija un icono:</Typography>
                                <Button variant='contained' style={{ width: '200px' }} onClick={() => setOpenmodal(true)} >Elegir</Button>
                            </Box>
                        </Grid>
                    </Grid>
                    <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {(!!areaData?.icon || !!icon) &&
                            <AreaIcon
                                iconName={icon || areaData?.icon}
                                styles={{
                                    fontSize: 100,
                                    display: 'flex',
                                    color: color || 'black',
                                    borderRadius: '5px',
                                    // border: '1px solid #ccc',
                                    boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                    padding: '5px'
                                }}
                            />}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6">Activado:</Typography>
                        <FormControl fullWidth>
                            <Field
                                name="is_active"
                                component={CheckboxRedux}
                                label="Activado"
                                size="large"
                                style={{ width: '50px' }}
                                
                                onChange={(e: any) => console.log(e.target.value)}
                                checked={areaData?.is_active || true}
                            />
                        </FormControl>
                    </Box>

                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6">Entrada</Typography>
                        <Switch
                            // defaultChecked
                            onClick={(e: any) => setType(e.target.checked ? "out" : "in" )}
                            checked={type === 'out'}
                        />
                        <Typography variant="h6" style={{ marginLeft: '8px' }}>Salida</Typography>
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
                    <IconList
                        icons={AreaIconsList}
                        width="300px"
                        height="auto"
                        separation="4px"
                        onSelectIcon={onSelectIcon}
                    />
                }
                buttonPrimaryAction={() => setOpenmodal(false)}
                buttonSecondaryAction={() => setOpenmodal(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Form >
    )
}

export default AreaCreateEditForm;