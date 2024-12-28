import { useCallback, useEffect, useState } from 'react';
import { IAccount, IArea } from 'src/config/types/types';
import { CheckboxRedux, SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, ListItemIcon, MenuItem, Switch, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import ModalConfirm from 'src/components/modal/ModalConfirm';
import CategoryIcon, { CategoryIconsList } from 'src/components/icon/category-icons';
import AreaIcon from 'src/components/icon/area-icons';

const currencyLista = [
    'Pesos',
    'Dolar',
    'Euro',
]
const typesLista = [
    { id: 'bank', name: 'Banco' },
    { id: 'electronic', name: 'Electrónica' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'debt', name: 'Deuda' },
    { id: 'other', name: 'Otra' },
]

interface CategoryEditProps {
    handleEdit: any;
    accountData: IAccount;
    isNew: boolean
}

function AccountCreateEditForm({ handleEdit, accountData, isNew }: CategoryEditProps) {

    const [openmodal, setOpenmodal] = useState(false);
    const [is_active, setIsActive] = useState(accountData?.is_active || true);
    const [currencySelected, setCurrencySelected] = useState('Pesos');
    const [typeSelected, setTypeSelected] = useState('cash');

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

    useEffect(() => {
        if (accountData) {
            console.log("inicializacion de accountData", accountData);
        }
    }, [accountData, isNew])
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
                            value={accountData?.name || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="balance"
                            component={TextFieldErrorRedux}
                            label="Balance"
                            placeholder='Ingrese el monto'
                            type="number"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={accountData?.balance || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6">Activado:</Typography>
                    <FormControl fullWidth>
                        <Field
                            name="is_active"
                            component={CheckboxRedux}
                            label="Activado"
                            size="large"
                            style={{ width: '50px' }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={accountData?.is_active || true}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6" style={{ marginLeft: '16px' }}>Moneda:</Typography>
                    <FormControl >
                        <Field
                            name="currency"
                            component={SelectRedux}
                            // label="Area"
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // placeholder='Ingrese area'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                            // onChange={(e: any) => console.log(e.target.id)}
                            value={accountData?.currency}
                        >
                            {currencyLista.map((item, index) => (
                                <MenuItem
                                    value={item} 
                                    key={index}
                                // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {item}
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
                    <Typography variant="h6" style={{ marginLeft: '16px' }}>Tipo de cuentas:</Typography>
                    <FormControl >
                        <Field
                            name="type"
                            component={SelectRedux}
                            // label="Area"
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // placeholder='Ingrese area'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                        // onChange={(e: any) => console.log(e.target.id)}
                        defaultValue='Efectivo'
                        // value={typeSelected}
                        >
                            {typesLista.map((item, index) => (
                                <MenuItem
                                    value={item.id}
                                    key={index}
                                    // defaultValue='cash'
                                    // defaultValue={accountData?.type === item.id ?? accountData?.type}
                                // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    {item.name}
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

export default AccountCreateEditForm;