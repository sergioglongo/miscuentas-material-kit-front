import { useCallback, useEffect, useState } from 'react';
import { IAccount, IArea, ICategory, IPayMethod, ITransaction } from 'src/config/types/types';
import { SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, ListItemIcon, MenuItem, Select, Typography, useMediaQuery } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import CategoryIcon from 'src/components/icon/CategoryIcon';
import AreaIcon from 'src/components/icon/AreaIcons';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import AreaCategoriesCreateEditViewForm from '../area/AreaCategoriesCreateEditView';
import AreaCreateEditModalViewForm from '../area/AreaCreateEditModalView';

interface TransactionEditProps {
    handleEdit: any;
    transferData: any;
    accountsTransferListIn: any[];
    accountsTransferListOut: any[];
    unit: any;
    accountInSelected: any;
    setAccountInSelected: any;
    accountOutSelected: any;
    setAccountOutSelected: any;
    onCancel: any;
}

function TransferCreateEditForm({ handleEdit, transferData, accountsTransferListIn, accountsTransferListOut,
    unit, accountInSelected, setAccountInSelected, accountOutSelected, setAccountOutSelected, onCancel }: TransactionEditProps) {

    const isMdDown = useMediaQuery((theme: any) => theme.breakpoints.down('sm'));

    const [accountInListToShow, setAccountInListToShow] = useState<any[]>([]);
    const router = useRouter();

    const onChangeAccountIn = (e: any) => {
        setAccountInSelected(e.target.value);
    }
    const onChangeAccountOut = (e: any) => {
        setAccountOutSelected(e.target.value);
        setAccountInSelected('');
        setAccountInListToShow(accountsTransferListIn.filter((accountInItem: any) => accountInItem.id !== e.target.value))
    }

    // useEffect(() => {
    //     setCategoriesListToShow(categoriesList.filter((categoryItem: any) => categoryItem.areaId === accountOutSelected))
    // }, [accountOutSelected, categoriesList, areasList])


    useEffect(() => {
        if (transferData?.id) {
            console.log("Transaccion a editar", transferData);
            // setAccountOutSelected(transferData?.category.area.id);
            setAccountOutSelected(transferData?.category.area.id);
            setAccountInSelected(transferData?.categoryId);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [transferData?.id])

    return (
        <Box sx={{ width: '100%' }}>
            <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
                <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='flex-start'>
                    <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                        <FormControl fullWidth>
                            <Field
                                name="description"
                                component={TextFieldErrorRedux}
                                placeholder='Ingrese la descripcion de la transferencia'
                                label="Descripcion"
                                // InputLabelProps={{ shrink: true }}
                                // onChange={(e: any) => console.log(e.target.value)}
                                value={transferData?.description || ''}
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
                                value={transferData?.amount || ''}
                            />
                        </FormControl>
                        <FormControl variant="standard">
                            <Field
                                name="date"
                                component={TextFieldErrorRedux}
                                label="Fecha"
                                type="date"
                                variant="standard"
                                // value={transferData?.date}
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
                                    <Typography variant="h6">Cuenta de origen:</Typography>
                                </Box>
                                <FormControl >
                                    <Select
                                        name="accountIdOut"
                                        style={{ minWidth: '200px' }}
                                        variant="outlined"
                                        size='small'
                                        value={(accountsTransferListOut.length > 0 && accountOutSelected) ? accountOutSelected : ''}
                                        // onChange={(e: any) => setAccountOutSelected(e.target.value)}
                                        onChange={(e: any) => onChangeAccountOut(e)}
                                    >
                                        <MenuItem value='' key='' >
                                            Seleccione un area
                                        </MenuItem>
                                        {accountsTransferListOut.map((item, index) => (
                                            <MenuItem value={item.id} key={index} onChange={onChangeAccountOut} >
                                                <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                    {/* <AreaIcon iconName={item?.icon} styles={{ fontSize: '20', display: 'flex', color: item?.color }} /> */}
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
                                        <Typography variant="h6" >Cuenta de destino:</Typography>
                                    </Box>
                                    <FormControl >
                                        <Select
                                            name="accountIdIn"
                                            style={{ minWidth: '200px' }}
                                            variant="outlined"
                                            size='small'
                                            value={(accountInListToShow.length > 0 && accountInSelected) ? accountInSelected : ''}
                                            // onChange={(e: any) => setAccountOutSelected(e.target.value)}
                                            onChange={(e: any) => onChangeAccountIn(e)}
                                            disabled={accountOutSelected === ''}
                                        >
                                            <MenuItem value='' key='' >
                                                Seleccione una cuenta
                                            </MenuItem>
                                            {accountInListToShow.map((item, index) => (
                                                <MenuItem value={item.id} key={index} >
                                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                                        {/* <CategoryIcon iconName={item?.icon} styles={{ fontSize: '20', display: 'flex', color: item?.color }} /> */}
                                                        {item?.name}
                                                    </ListItemIcon>
                                                </MenuItem>

                                            ))}
                                        </Select>
                                    </FormControl>

                                </Box>
                            </Box>
                        </Box>
                        {/* </Grid> */}
                    </Grid>
                    <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                        <Grid item xs={12} sm={6} style={{ width: '100%', marginTop: '10px' }}>
                            <Button fullWidth size="large" color="inherit" variant="contained" onClick={onCancel}>Cancelar</Button>
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
                                Transferir
                            </LoadingButton>
                        </Grid>

                    </Grid>
                </Grid>
            </Form >                        
        </Box>
    )
}

export default TransferCreateEditForm;