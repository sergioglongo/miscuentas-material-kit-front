import { useCallback, useEffect, useState } from 'react';
import { IAccount, IArea, ICategory, IPayMethod, ITransaction } from 'src/config/types/types';
import { SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, ListItemIcon, MenuItem, Select, Switch, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import CategoryIcon from 'src/components/icon/CategoryIcon';
import PayMethodIcon from 'src/components/icon/PayMethodIcons';
import AreaIcon from 'src/components/icon/AreaIcons';
import { Iconify } from 'src/components/iconify';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import AreaCategoriesCreateEditViewForm from '../area/AreaCategoriesCreateEditView';
import { buttonStyles } from './TransactionStyles';
import AreaCreateEditModalViewForm from '../area/AreaCreateEditModalView';

const methodsList = [
    { id: 'debit', name: 'Debito', type: 'out'},
    { id: 'credit', name: 'Credito', type: 'out' },
    { id: 'cash', name: 'Efectivo', type: 'in/out' },
    { id: 'transfer', name: 'Transferencia', type: 'in/out' },
    { id: 'other', name: 'Otro', type: 'out' },
]
interface TransactionEditProps {
    handleEdit: any;
    transactionData: any;
    areasList: IArea[];
    categoriesList: ICategory[];
    payMethodList: IPayMethod[];
    unit: any;
    type: any;
    setType: any;
    getSetCategoriesList: any;
    getSetAreasList: any;
    categorySelected: any;
    setCategorySelected: any;
}

function TransactionCreateEditForm({ handleEdit, transactionData, areasList, categoriesList,
    unit, payMethodList, getSetCategoriesList, getSetAreasList, type, setType,
    categorySelected, setCategorySelected }: TransactionEditProps) {

    const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    const [areaSelected, setAreaSelected] = useState<number | ''>('');
    const [areaColorSelected, setAreaColorSelected] = useState<string>('black');
    const [methodType, setMethodType] = useState<string>('cash');
    const [categoriesListToShow, setCategoriesListToShow] = useState<ICategory[]>(categoriesList);
    const [payMethodsListToShow, setPayMethodsListToShow] = useState<any[]>(payMethodList);
    const [openmodalCategoryEdit, setOpenmodalCategoryEdit] = useState(false);
    const [openmodalAreaEdit, setOpenmodalAreaEdit] = useState(false);
    const router = useRouter();

    const onChangeCategory = (e: any) => {
        setCategorySelected(e.target.value);
    }
    const onChangeArea = (e: any) => {
        setAreaSelected(e.target.value);
        setCategorySelected('');
    }
    const onChangeMethod = (e: any) => {
        setMethodType(e.target.value);
    }
    const onClickNewCategory = () => {
        setCategorySelected('');
        setOpenmodalCategoryEdit(true);
    }
    const onClickEditCategory = () => {
        setOpenmodalCategoryEdit(true);
    }
    const onClickEditArea = () => {
        setOpenmodalAreaEdit(true);
    }
    const onClickCreateArea = () => {
        setOpenmodalAreaEdit(true);
        setAreaColorSelected('black');
        setAreaSelected('');
    }

    useEffect(() => {
        setCategoriesListToShow(categoriesList.filter((categoryItem: any) => categoryItem.areaId === areaSelected))
        setAreaColorSelected(areasList.find((area: IArea) => area.id === areaSelected)?.color || 'black');
    }, [areaSelected, categoriesList, areasList])

    useEffect(() => {
        setPayMethodsListToShow(payMethodList.filter((payMethodItem: any) => 
            (payMethodItem.method === methodType && payMethodItem.account.is_active) 
        || (payMethodItem.method === methodType && payMethodItem.id === transactionData?.payMethodId)
    ));
    }, [methodType, payMethodList, transactionData?.payMethodId]);

    useEffect(() => {
        if (transactionData?.id) {
            console.log("Transaccion a editar", transactionData);
            // setAreaSelected(transactionData?.category.area.id);
            setAreaSelected(transactionData?.category.area.id);
            setCategorySelected(transactionData?.categoryId);
            setMethodType(transactionData?.pay_method.method);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionData?.id])

    return (
        <Box>
            <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
                <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='flex-start'>
                    <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <Field
                                name="description"
                                component={TextFieldErrorRedux}
                                placeholder='Ingrese la descripcion de la transaccion'
                                label="Descripcion"
                                // InputLabelProps={{ shrink: true }}
                                // onChange={(e: any) => console.log(e.target.value)}
                                value={transactionData?.description || ''}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} gap={2} display='flex' flexDirection='row' alignItems='center' justifyContent='center'>
                        <FormControl >
                            <Field
                                name="amount"
                                component={TextFieldErrorRedux}
                                placeholder='1500'
                                label="Monto"
                                type='number'
                                // InputLabelProps={{ shrink: true }}
                                // onChange={(e: any) => console.log(e.target.value)}
                                value={transactionData?.amount || ''}
                            />
                        </FormControl>
                        <FormControl variant="standard">
                            <Field
                                name="date"
                                component={TextFieldErrorRedux}
                                label="Fecha"
                                type="date"
                                variant="standard"
                                // value={transactionData?.date}
                                // onChange={(event) => handleInputChange('fecha_alta', event.target.value)}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={12} gap={4} width='100%'>
                        <Box width='100%' display='flex' flexDirection={isMdDown ? 'column' : 'row'} gap={4} flexWrap='wrap'
                            // sx={{ backgroundColor: 'red' }} 
                            alignItems='center' justifyContent={isMdDown ? 'center' : 'flex-start'}>
                            <Box >
                                <Box
                                    display="flex"
                                    // width={'90%'}
                                    flexDirection='row'
                                    justifyContent='space-arround'
                                    sx={{ paddingY: '2px' }}
                                >
                                    <Typography variant="h6">Areas:</Typography>
                                    <Box
                                        onClick={onClickCreateArea}
                                        sx={buttonStyles(0, 'success.main')}
                                        className='button'
                                    >
                                        <Iconify icon="mingcute:add-line" />
                                    </Box>
                                    <Box
                                        onClick={areaSelected !== '' ? onClickEditArea : () => { }}
                                        sx={buttonStyles(areaSelected, 'warning.main')}
                                    >
                                        <Iconify icon="mingcute:edit-line" />
                                    </Box>
                                </Box>
                                <FormControl >
                                    <Select
                                        name="areaId"
                                        style={{ minWidth: '200px' }}
                                        variant="outlined"
                                        size='small'
                                        value={(areasList.length > 0 && areaSelected) ? areaSelected : ''}
                                        // onChange={(e: any) => setAreaSelected(e.target.value)}
                                        onChange={(e: any) => onChangeArea(e)}
                                    >
                                        <MenuItem value='' key='' >
                                            Seleccione un area
                                        </MenuItem>
                                        {areasList.map((item, index) => (
                                            <MenuItem value={item.id} key={index} onChange={onChangeArea} >
                                                <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                    <AreaIcon iconName={item?.icon} styles={{ fontSize: '20', display: 'flex', color: item?.color }} />
                                                    {item?.name}
                                                </ListItemIcon>
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Box>
                            <Box>
                                <Box>
                                    <Box
                                        display="flex"
                                        // width={'90%'}
                                        flexDirection='row'
                                        justifyContent='space-arround'
                                        sx={{ paddingY: '2px' }}
                                    >
                                        <Typography variant="h6" >Categoria:</Typography>
                                        <Box
                                            onClick={areaSelected !== '' ? onClickNewCategory : () => { }}
                                            sx={buttonStyles(areaSelected, 'success.main')}
                                            className={areaSelected === '' ? 'button disabled' : 'button'}
                                        >
                                            <Iconify icon="mingcute:add-line" />
                                        </Box>
                                        <Box
                                            onClick={categorySelected !== '' ? onClickEditCategory : () => { }}
                                            sx={buttonStyles(categorySelected, 'warning.main')}
                                        >
                                            <Iconify icon="mingcute:edit-line" />
                                        </Box>
                                    </Box>
                                    <FormControl >
                                        <Select
                                            name="categoryId"
                                            style={{ minWidth: '200px' }}
                                            variant="outlined"
                                            size='small'
                                            value={(categoriesListToShow.length > 0 && categorySelected) ? categorySelected : ''}
                                            // onChange={(e: any) => setAreaSelected(e.target.value)}
                                            onChange={(e: any) => onChangeCategory(e)}
                                            disabled={areaSelected === ''}
                                        >
                                            <MenuItem value='' key='' >
                                                Seleccione una categoría
                                            </MenuItem>
                                            {categoriesListToShow.map((item, index) => (
                                                <MenuItem value={item.id} key={index} >
                                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                        <CategoryIcon iconName={item?.icon} styles={{ fontSize: '20', display: 'flex', color: item?.color }} />
                                                        {item?.name}
                                                    </ListItemIcon>
                                                </MenuItem>

                                            ))}
                                        </Select>
                                    </FormControl>

                                </Box>
                            </Box>
                            <Box >
                                <Box >
                                    <Box
                                        display="flex"
                                        // width={'90%'}
                                        flexDirection='row'
                                        justifyContent='space-arround'
                                        sx={{ paddingY: '2px' }}
                                    >
                                        <Typography variant="h6">Metodo Pago:</Typography>
                                    </Box>
                                    <FormControl >
                                        <Select
                                            name="methodId"
                                            style={{ minWidth: '200px' }}
                                            variant="outlined"
                                            size='small'
                                            value={methodType || ''}
                                            // onChange={(e: any) => setAreaSelected(e.target.value)}
                                            onChange={(e: any) => onChangeMethod(e)}
                                        >
                                            <MenuItem value='' key='' >
                                                Elija método de pago
                                            </MenuItem>
                                            {methodsList.map((item, index) => (
                                                item.type.includes(type) &&
                                                <MenuItem value={item.id} key={index} onChange={onChangeMethod} >
                                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                        <PayMethodIcon iconName={item?.id} styles={{ fontSize: '20', display: 'flex', color: 'black' }} />
                                                        {item?.name}
                                                    </ListItemIcon>
                                                </MenuItem>
                                            ))}
                                        </Select>
                                    </FormControl>
                                </Box>
                            </Box>
                            <Box>
                                <Box>
                                    <Typography variant="h6" sx={{ paddingY: '2px' }}>Medio:</Typography>
                                    <FormControl >
                                        <Field
                                            name="payMethodId"
                                            component={SelectRedux}
                                            style={{ minWidth: '200px' }}
                                            variant="outlined"
                                            size='small'
                                            value={payMethodsListToShow.length > 0 && transactionData?.payMethodId ? transactionData?.payMethodId : ''}
                                        >
                                            <MenuItem value='' key='' >
                                                Seleccione un medio
                                            </MenuItem>
                                            {payMethodsListToShow.map((item, index) => (
                                                <MenuItem value={item.id} key={index}>
                                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                        <PayMethodIcon iconName={item?.method} styles={{ fontSize: '20', display: 'flex', color: 'black' }} />
                                                        {item?.name}
                                                    </ListItemIcon>
                                                </MenuItem>
                                            ))}
                                        </Field>

                                    </FormControl>
                                </Box>
                            </Box>
                        </Box>
                        {/* </Grid> */}
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
            </Form >
            <ModalConfirm
                openmodal={openmodalCategoryEdit}
                setOpenmodal={setOpenmodalCategoryEdit}
                children={
                    <AreaCategoriesCreateEditViewForm
                        categoryId={categorySelected}
                        onCancel={() => setOpenmodalCategoryEdit(false)}
                        color={areaColorSelected}
                        areaId={areaSelected}
                        updateCategoriesList={getSetCategoriesList}
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
            <ModalConfirm
                openmodal={openmodalAreaEdit}
                setOpenmodal={setOpenmodalAreaEdit}
                children={
                    <AreaCreateEditModalViewForm
                        onCancel={() => setOpenmodalAreaEdit(false)}
                        color={areaColorSelected}
                        areaId={areaSelected}
                        unitId={unit?.id}
                        type={type}
                        updateAreasList={getSetAreasList}
                    />
                }
                buttonPrimaryAction={() => setOpenmodalAreaEdit(false)}
                buttonSecondaryAction={() => setOpenmodalAreaEdit(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Box>
    )
}

export default TransactionCreateEditForm;