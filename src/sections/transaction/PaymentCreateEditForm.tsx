import { useCallback, useEffect, useState } from 'react';
import { IArea, ICategory, IPayMethod } from 'src/config/types/types';
import { SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, ListItemIcon, MenuItem, Select, Switch, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import CategoryIcon from 'src/components/icon/CategoryIcon';
import PayMethodIcon from 'src/components/icon/PayMethodIcons';
import AreaIcon from 'src/components/icon/AreaIcons';

const methodsList = [
    { id: 'debit', name: 'Debito' },
    { id: 'credit', name: 'Credito' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'transfer', name: 'Transferencia' },
    { id: 'other', name: 'Otro' },
]
interface PaymentEditProps {
    handleEdit: any;
    transactionData: any;
    areasList: IArea[];
    categoriesList: ICategory[];
    payMethodList: IPayMethod[];
    type: any;
    setType: any;
}

function PaymentCreateEditForm({ handleEdit, transactionData, areasList, categoriesList, payMethodList, type, setType }: PaymentEditProps) {

    const [openmodal, setOpenmodal] = useState(false);
    const [areaSelected, setAreaSelected] = useState<number | ''>('');
    const [categorySelected, setCategorySelected] = useState<number | ''>('');
    const [payMethodSelected, setPaymethodSelected] = useState<number | ''>('');
    const [categoriesListToShow, setCategoriesListToShow] = useState<ICategory[]>([]);
    const [payMethodsListToShow, setPayMethodsListToShow] = useState<IPayMethod[]>([]);
    const router = useRouter();
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
    const categoriesFilter = useCallback(
        () => categoriesList.filter((categoryItem: any) => categoryItem.areaId === areaSelected),
        [categoriesList, areaSelected]
    );
    const onChangePayMethod = (e: any) => {
        setPaymethodSelected(e.target.value);
    }
    const onChangeCategory = (e: any) => {
        setCategorySelected(e.target.value);
    }
    const onChangeArea = (e: any) => {
        setAreaSelected(e.target.value);
    }
    useEffect(() => {
        setType(transactionData?.type || 'out');
    }, [transactionData?.type, setType])


    useEffect(() => {
        if (transactionData) {
            console.log(transactionData);
        }
    }, [transactionData])

    // useEffect(() => {
    //     setCategoriesListToShow(categoriesFilter());
    //     // setPayMethodsListToShow(payMethodsFilter());
    // }, [type, categoriesFilter, payMethodsFilter]);
    useEffect(() => {
        setCategoriesListToShow(categoriesFilter());
        
    },[areaSelected, categoriesFilter])
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
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%' }}>
                    <FormControl >
                        <Field
                            name="amount"
                            component={TextFieldErrorRedux}
                            placeholder='1500'
                            label="Monto"
                            type='number'
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={transactionData?.amount || ''}
                        />
                    </FormControl>
                    <FormControl variant="standard" >
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
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6" >Areas:</Typography>
                    <FormControl >
                        <Select
                            name="areaId"
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            variant="outlined"
                            size='small'
                            value={areaSelected || ''}
                            // onChange={onChangeArea}
                            onChange={(e: any) => setAreaSelected(e.target.value)}
                        >
                            <MenuItem value='' key='' >
                                Seleccione un area
                            </MenuItem>
                            {areasList.map((item, index) => (
                                <MenuItem value={item.id} key={index}  >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <AreaIcon iconName={item?.icon} styles={{ fontSize: '20', display: 'flex', color: 'black' }} />
                                        {item?.name}
                                    </ListItemIcon>
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Typography variant="h6" >Categoria:</Typography>
                    <FormControl >
                        <Field
                            name="categoryId"
                            component={SelectRedux}
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                            // onChange={(e: any) => console.log(e.target.id)}
                            value={!transactionData?.categoryId ? '' : transactionData?.categoryId}
                        // defaultValue={transactionData?.categoryId}
                        >
                            <MenuItem value='' key='' >
                                Seleccione una categoría
                            </MenuItem>
                            {categoriesListToShow.map((item, index) => (
                                <MenuItem value={item.id} key={index} onChange={onChangeCategory} >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <CategoryIcon iconName={item?.icon} styles={{ fontSize: '20', display: 'flex', color: 'black' }} />
                                        {item?.name}
                                    </ListItemIcon>
                                </MenuItem>
                                
                            ))}
                        </Field>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6" >Metodo:</Typography>
                    <FormControl >
                        <Field
                            name="payMethodId"
                            component={SelectRedux}
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                            // onChange={(e: any) => console.log(e.target.id)}
                            // value={payMethodSelected || ''}
                            value={!transactionData ? '' : transactionData?.payMethodId}
                        // defaultValue=''
                        >
                            <MenuItem value='' key='' >
                                Seleccione un método
                            </MenuItem>
                            {payMethodList.map((item, index) => (
                                <MenuItem value={item.id} key={index} onChange={onChangePayMethod}>
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <PayMethodIcon iconName={item?.method} styles={{ fontSize: '20', display: 'flex', color: 'black' }} />
                                        {item?.name}
                                    </ListItemIcon>
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
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

export default PaymentCreateEditForm;