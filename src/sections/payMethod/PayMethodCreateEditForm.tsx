import { useEffect, useState } from 'react';
import { IAccount, IPayMethod } from 'src/config/types/types';
import { SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, FormControl, Grid, ListItemIcon, MenuItem, Switch, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import PayMethodIcon from 'src/components/icon/PayMethodIcons';
import AccountIcon from 'src/components/icon/AccountIcon';
import { grey } from 'src/theme/core';

const methodsList = [
    { id: 'debit', name: 'Debito' },
    { id: 'credit', name: 'Credito' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'transfer', name: 'Transferencia' },
    { id: 'other', name: 'Otro' },
]
interface PayMethodEditProps {
    handleEdit: any;
    payMethodData: IPayMethod;
    accountsList: IAccount[];
    type: any;
    setType: any;
    isActive: boolean
    setIsActive: any
}

function PayMethodCreateEditForm({ handleEdit, payMethodData, accountsList, type, setType, isActive, setIsActive }: PayMethodEditProps) {

    const [openmodal, setOpenmodal] = useState(false);
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
        setType(payMethodData?.type || 'out');
    }, [payMethodData?.type, setType])

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
                            value={payMethodData?.name || ''}
                        />
                    </FormControl>
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
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6">Activado:</Typography>
                        <Checkbox
                            size="large"
                            onChange={(e: any) => setIsActive(e.target.checked)}
                            checked={isActive}
                        />
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6" >Cuenta:</Typography>
                    <FormControl >
                        <Field
                            name="accountId"
                            component={SelectRedux}
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                            // onChange={(e: any) => console.log(e.target.id)}
                            value={payMethodData?.accountId || ''}
                        >
                            {accountsList.map((item, index) => (
                                <MenuItem
                                    value={item.id} key={index}
                                    defaultValue={payMethodData?.accountId === item?.id ? payMethodData?.accountId : ''}
                                // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <AccountIcon iconName={item?.type} styles={{ fontSize: '30', display: 'flex', color: grey[700]  }} />
                                        {item?.name}
                                    </ListItemIcon>
                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
                    <Typography variant="h6" >Metodo:</Typography>
                    <FormControl >
                        <Field
                            name="method"
                            component={SelectRedux}
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                            // onChange={(e: any) => console.log(e.target.id)}
                            value={payMethodData?.accountId || ''}
                        >
                            {methodsList.map((item, index) => (
                                <MenuItem
                                    value={item.id} key={index}
                                    defaultValue={payMethodData?.method === item?.id ? payMethodData?.accountId : ''}
                                // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <PayMethodIcon iconName={item?.id} styles={{ fontSize: '30', display: 'flex', color: grey[700] }} />
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

export default PayMethodCreateEditForm;