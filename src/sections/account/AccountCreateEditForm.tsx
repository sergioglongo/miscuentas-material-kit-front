import { useEffect, useState } from 'react';
import { IAccount } from 'src/config/types/types';
import { CheckboxRedux, SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, FormControl, Grid, ListItemIcon, MenuItem, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import AccountIcon from 'src/components/icon/AccountIcon';
import { grey } from '../../theme/core/palette';
import AccountPayMethodsEditFrom from './AccountPayMethodsEditFrom';

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
    isNew: boolean;
    is_active: boolean;
    setIsActive: any;
    payMethodsSelected: string[];
    setPayMethodsSelected: any;
}

function AccountCreateEditForm({ handleEdit, accountData, isNew, is_active, setIsActive, payMethodsSelected, setPayMethodsSelected }: CategoryEditProps) {

    const router = useRouter();

    // useEffect(() => {
    //     if (accountData) {
    //         console.log("inicializacion de accountData", accountData);

    //     }
    // }, [accountData, isNew])

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
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Grid container spacing={2} columnSpacing={1} >
                        <Grid item xs={12} sm={6} md={4} >
                            <Box>
                                <FormControl >
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
                            </Box>
                        </Grid>
                        <Grid item xs={12} sm={6} md={4}>
                            <Box style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                <Typography variant="h6">Activada:</Typography>
                                <Checkbox
                                    size="large"
                                    onChange={(e: any) => setIsActive(e.target.checked)}
                                    checked={is_active}
                                />
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6" style={{}}>Moneda:</Typography>
                    <FormControl >
                        <Field
                            name="currency"
                            component={SelectRedux}
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            variant="outlined"
                            size='small'
                            value={accountData?.currency}
                        >
                            {currencyLista.map((item, index) => (
                                <MenuItem
                                    value={item} key={index}
                                    // defaultValue={accountData?.currency === item ? accountData?.currency : ''}
                                >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <AccountIcon iconName={item} styles={{ fontSize: '20', display: 'flex', color: grey[700] }} />
                                        {item}
                                    </ListItemIcon>
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
                    <Typography variant="h6" style={{ marginLeft: '16px' }}>Tipo de cuentas:</Typography>
                    <FormControl >
                        <Field
                            name="type"
                            component={SelectRedux}
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            variant="outlined"
                            size='small'
                            defaultValue='Efectivo'
                        >
                            {typesLista.map((item, index) => (
                                <MenuItem
                                    value={item.id} key={index}
                                    defaultValue={accountData?.type === item.id ? accountData?.type : ''}
                                >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <AccountIcon iconName={item?.id} styles={{ fontSize: '25', display: 'flex', color: grey[700] }} />
                                        {item?.name}
                                    </ListItemIcon>
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
                </Grid>
                <AccountPayMethodsEditFrom
                    sx={{ width: '100%', boxShadow: 2 }}
                    title='Metodos de Pago de esta cuenta'
                    subheader='Seleccione los metodos que desea incorporar como medio de pago para esta cuenta'
                    payMethodsSelected={payMethodsSelected}
                    setPayMethodsSelected={setPayMethodsSelected}
                />
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