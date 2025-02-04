import { useEffect, useState } from 'react';
import IconList from 'src/components/list/IconList';
import { IArea } from 'src/config/types/types';
import { TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, Typography, Switch, Checkbox } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import AreaIcon, { AreaIconsList } from 'src/components/icon/AreaIcons';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import styles from './area.module.css';
import AreaCategoriesAdminForm from './AreaCategoriesAdminForm';
import AreaIconCustom from './AreaIconCustom';
import AreaCategoriesCreateEditViewForm from './AreaCategoriesCreateEditView';

interface AreaEditProps {
    handleEdit: any;
    areaData: IArea;
    color: string;
    setColor: any;
    icon: string;
    setIcon: any;
    type: string;
    setType: any;
    presetColors: string[],
    isActive: boolean,
    setIsActive: any,
    isNew: boolean,
    categoriesList: any,
    updateCategoriesList: any
}

function AreaCreateEditForm({ handleEdit, areaData, color, setColor, icon, setIcon, type, setType, presetColors, isActive, setIsActive, isNew, categoriesList, updateCategoriesList }: AreaEditProps) {

    const [openmodalIcon, setOpenmodalIcon] = useState(false);
    const [openmodalColor, setOpenmodalColor] = useState(false);
    const [openmodalCategoryEdit, setOpenmodalCategoryEdit] = useState(false);
    const [categorySelected, setCategorySelected] = useState<any>('');

    // const [color, setColor] = useState("#b32aa9");
    const router = useRouter();
    const onSelectIcon = (iconSelected: string) => {
        setOpenmodalIcon(false);
        setIcon(iconSelected);
    }
    const onSelectColor = (colorSelected: string) => {
        setOpenmodalColor(false);
        setColor(colorSelected);
    }
    const onEditCategory = (category: any) => {
        setCategorySelected(category);
        setOpenmodalCategoryEdit(true);
    }
    const onNewCategory = () => {
        setCategorySelected(null);
        setOpenmodalCategoryEdit(true);
    }
    useEffect(() => {
        if (categorySelected) {
            // setOpenmodalCategoryEdit(true);
            console.log("Seleccionada categoria: ", categorySelected);
            
        }
    }, [categorySelected])

    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={5} display='flex' flexDirection='row' alignItems='center'>
                <Grid item xs={12} sm={7} style={{ width: '100%' }}>
                    <Box paddingY={2}>
                        <FormControl fullWidth>
                            <Field
                                name="name"
                                component={TextFieldErrorRedux}
                                placeholder='Ingrese el nombre'
                                label="Nombre"
                                value={areaData?.name || ''}
                            />
                        </FormControl>
                    </Box>
                    <Box paddingY={2}>
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
                    </Box>
                </Grid>
                <Grid item xs={12} sm={5} style={{ width: '100%' }}>
                    <Box gap={2} style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                        {!isNew &&
                            <Box paddingY={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                <Typography variant="h6">Activado:</Typography>
                                <Checkbox
                                    size="large"
                                    onChange={(e: any) => setIsActive(e.target.checked)}
                                    checked={isActive}
                                />
                            </Box>
                        }
                        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                            <Typography variant="h6">Ingreso</Typography>
                            <Switch
                                // defaultChecked
                                onClick={(e: any) => setType(e.target.checked ? "out" : "in")}
                                checked={type === 'out'}
                            />
                            <Typography variant="h6" style={{ marginLeft: '8px' }}>Gasto</Typography>
                        </Box>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <Box gap={4} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                        <AreaIconCustom
                            areaData={areaData}
                            icon={icon}
                            color={color}
                            setOpenmodalIcon={setOpenmodalIcon}
                            setOpenmodalColor={setOpenmodalColor}
                        />
                        {!isNew &&
                            <AreaCategoriesAdminForm
                                type={type}
                                title='Categorias'
                                sx={{ boxShadow: 2, minWidth:'300px', maxWidth:'100%' }}
                                categoriesList={categoriesList || []}
                                onEditCategory={(id:any) => onEditCategory(id)}
                                onNewCategory={() => onNewCategory()}
                            />
                        }
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
                openmodal={openmodalIcon}
                setOpenmodal={setOpenmodalIcon}
                titulo="Elija un icono"
                children={
                    <Box width="300px" display="grid" gap={1} gridTemplateColumns="repeat(4, 1fr)" sx={{ p: 1 }}>
                        {
                            AreaIconsList.map((iconItem, index) => (
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
                buttonPrimaryAction={() => setOpenmodalIcon(false)}
                buttonSecondaryAction={() => setOpenmodalIcon(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
            <ModalConfirm
                openmodal={openmodalColor}
                setOpenmodal={setOpenmodalColor}
                titulo="Elija un icono"
                children={
                    <Box width="300px" display="grid" gap={1} gridTemplateColumns="repeat(4, 1fr)" sx={{ p: 1 }}>
                        {/* {
                            AreaIconsList.map((iconItem, index) => (
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
                        } */}
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
            <ModalConfirm
                openmodal={openmodalCategoryEdit}
                setOpenmodal={setOpenmodalCategoryEdit}
                children={
                        <AreaCategoriesCreateEditViewForm
                            categoryId={categorySelected}
                            onCancel={() => setOpenmodalCategoryEdit(false)}
                            color={color}
                            areaId={areaData?.id}
                            updateCategoriesList={updateCategoriesList}
                        />
                }
                buttonPrimaryAction={() => setOpenmodalCategoryEdit(false)}
                buttonSecondaryAction={() => setOpenmodalCategoryEdit(false)}
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