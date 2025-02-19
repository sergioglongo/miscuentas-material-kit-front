import { useCallback, useEffect, useState } from 'react';
import IconList from 'src/components/list/IconList';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import AreaIcon, { AreaIconsList } from 'src/components/icon/AreaIcons';
import { IArea } from 'src/config/types/types';
import { TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, FormControl, Grid, ListItemIcon, MenuItem, Select, Switch, Typography } from '@mui/material'
import { Field, Form } from 'redux-form'
import styles from './area.module.css';

interface AreaEditModalProps {
    handleEdit: any;
    areaData: IArea;
    icon: string;
    setIcon: any;
    isActive: boolean;
    setIsActive: any;
    onCancel: any;
    color: string;
    setColor: any;
    isNew: boolean;
    presetColors: string[];
}

function AreaCreateEditModalForm({ handleEdit, areaData, icon, setIcon, isActive, setIsActive, onCancel, color, setColor, presetColors, isNew }: AreaEditModalProps) {

    const [openmodal, setOpenmodal] = useState(false);
    const [openmodalColor, setOpenmodalColor] = useState(false);

    const onSelectIcon = (iconSelected: string) => {
        setOpenmodal(false);
        setIcon(iconSelected);
    }
    console.log("areaData", areaData);

    const onSelectColor = (colorSelected: string) => {
        setOpenmodalColor(false);
        setColor(colorSelected);
    }
    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} gap={5} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    <FormControl fullWidth>
                        <Field
                            name="name"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese el nombre'
                            label="Nombre"
                            value={areaData?.name || ''}
                        />
                    </FormControl>

                </Grid>
                <Grid item xs={12} sm={12} gap={5} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'flex-start' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            label="Descripción"
                            placeholder='Ingrese la descripción'
                            InputLabelProps={{ shrink: true }}
                            value={areaData?.description || ''}
                        />
                    </FormControl>


                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                    <Box gap={2} display='flex' flexDirection='row' justifyContent='flex-start' >
                        <Button
                            variant='contained'
                            style={{ height: '40px', padding: '20px' }}
                            onClick={() => setOpenmodal(true)} >
                            Elegir Icono
                        </Button>
                        <Button
                            variant='contained'
                            style={{ height: '40px', padding: '20px' }}
                            onClick={() => setOpenmodalColor(true)} >
                            Elegir color
                        </Button>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
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
                    </Box>
                    {!isNew &&
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h6">Activado:</Typography>
                            <Checkbox
                                size="large"
                                onChange={(e: any) => setIsActive(e.target.checked)}
                                checked={isActive}
                            />
                        </Box>
                    }
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                    <Grid item xs={12} sm={6} width='100%' marginTop='10px'>
                        <Button fullWidth size="large" color="inherit" variant="contained" onClick={() => onCancel()}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} width='100%' marginTop='10px' >

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
                    <Box width="300px" display="grid" gap={1} gridTemplateColumns="repeat(4, 1fr)" sx={{ p: 1 }}>
                        {
                            AreaIconsList.map((iconItem: any, index: number) => (
                                <IconList
                                    key={index}
                                    icon={iconItem}
                                    index={index}
                                    onSelectIcon={onSelectIcon}
                                    separation='1px'
                                >
                                    <AreaIcon iconName={iconItem} styles={{ fontSize: 20 }} />
                                </IconList>
                            ))
                        }
                    </Box>
                }
                buttonPrimaryAction={() => setOpenmodal(false)}
                buttonSecondaryAction={() => setOpenmodal(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
                inert={openmodal}
            />
            <ModalConfirm
                openmodal={openmodalColor}
                setOpenmodal={setOpenmodalColor}
                titulo="Elija un icono"
                children={
                    <Box width="300px" display="grid" gap={1} gridTemplateColumns="repeat(4, 1fr)" sx={{ p: 1 }}>
                        {presetColors.map((presetColor, index) => (
                            <Button
                                key={index}
                                className={styles.pickerSwatches}
                                style={{
                                    background: presetColor,
                                    border: `3px solid ${presetColor !== color ? presetColor : '#FAAC40'}`,
                                    height: '30px',
                                    width: '30px',
                                }}
                                // onClick={() => setColor(presetColor)}
                                onClick={() => onSelectColor(presetColor)}
                            />
                        ))}
                    </Box>
                }
                buttonPrimaryAction={() => setOpenmodalColor(false)}
                buttonSecondaryAction={() => setOpenmodalColor(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Form >
    )
}

export default AreaCreateEditModalForm;