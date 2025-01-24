import { useCallback, useEffect, useState } from 'react';
import { IAccount, IArea, ICategory, IPayMethod, ITransaction } from 'src/config/types/types';
import { CheckboxRedux, SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, ListItemIcon, MenuItem, Select, Switch, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import CategoryIcon from 'src/components/icon/CategoryIcon';
import PayMethodIcon from 'src/components/icon/PayMethodIcons';
import { setAreasList } from 'src/redux/slices/lists.slice';
import AreaIcon from 'src/components/icon/AreaIcons';

const methodsList = [
    { id: 'debit', name: 'Debito' },
    { id: 'credit', name: 'Credito' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'transfer', name: 'Transferencia' },
    { id: 'other', name: 'Otro' },
]
interface TransactionEditProps {
    handleEdit: any;
    transactionData: any;
    areasList: IArea[];
    categoriesList: ICategory[];
    payMethodList: IPayMethod[];
    type: any;
    setType: any;
}

function TransactionCreateEditForm({ handleEdit, transactionData, areasList, categoriesList, payMethodList, type, setType }: TransactionEditProps) {

    const [areaSelected, setAreaSelected] = useState<number | ''>('');
    const [categorySelected, setCategorySelected] = useState<number | ''>('');
    const [categoriesListToShow, setCategoriesListToShow] = useState<ICategory[]>(categoriesList);
    const router = useRouter();

    const categoriesFilter = useCallback(
        () => categoriesList.filter((categoryItem: any) => categoryItem.area.id === areaSelected),
        [categoriesList, areaSelected]
    );
    const onChangeCategory = (e: any) => {
        setCategorySelected(e.target.value);
    }
    const onChangeArea = (e: any) => {
        setAreaSelected(e.target.value);
    }

    useEffect(() => {
        setCategoriesListToShow(categoriesList.filter((categoryItem: any) => categoryItem.areaId === areaSelected))
    }, [areaSelected, categoriesList])

    useEffect(() => {
        if (transactionData?.id) {
            console.log("Transaccion a editar", transactionData);
            // setAreaSelected(transactionData?.category.area.id);
            setAreaSelected(transactionData?.category.area.id);
            setCategorySelected(transactionData?.categoryId);
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transactionData?.id])

    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese la descripcion de la transaccion'
                            label="Descripcion"
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={transactionData?.description || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
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
                <Grid item xs={12} sm={12} gap={4} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Grid container spacing={2} columnSpacing={2} >
                        <Grid item xs={12} sm={6} md={4} >
                            <Box>
                                <Typography variant="h6" >Areas:</Typography>
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box>
                                <Typography variant="h6" >Categoria:</Typography>
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
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box>
                                <Typography variant="h6" >Metodo:</Typography>
                                <FormControl >
                                    <Field
                                        name="payMethodId"
                                        component={SelectRedux}
                                        style={{ minWidth: '200px' }}
                                        variant="outlined"
                                        size='small'
                                        value={payMethodList.length > 0 && transactionData?.payMethodId ? transactionData?.payMethodId : ''}
                                    >
                                        <MenuItem value='' key='' >
                                            Seleccione un método
                                        </MenuItem>
                                        {payMethodList.map((item, index) => (
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
                        </Grid>
                    </Grid>
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
    )
}

export default TransactionCreateEditForm;