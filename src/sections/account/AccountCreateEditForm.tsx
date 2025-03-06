import { useCallback, useEffect, useState } from 'react';
import { IAccount } from 'src/config/types/types';
import { connect } from 'react-redux'
import { CheckboxRedux, SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, FormControl, Grid, IconButton, ListItemIcon, MenuItem, Typography, Tooltip, TextField } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import AccountIcon from 'src/components/icon/AccountIcon';
import { setAccountsList } from 'src/redux/slices/lists.slice';
import ModalConfirm from 'src/components/modal/ModalConfirm';
import { getAllAccountsByUnitId } from 'src/services/api/modules/account.module';
import CommonIcon from 'src/components/icon/CommonIcons';
import { bindActionCreators } from '@reduxjs/toolkit';
import AccountPayMethodsEditFrom from './AccountPayMethodsEditFrom';
import AccountAdjustModalViewForm from './AccountAdjustModalView';
import { grey } from '../../theme/core/palette';

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
    unitActive: any;
    setAccountsListState: any;
}

function AccountCreateEditForm({ handleEdit, accountData, isNew, is_active, setIsActive, unitActive, payMethodsSelected, setPayMethodsSelected, setAccountsListState }: CategoryEditProps) {

    const router = useRouter();
    const onAdjust = () => {
        setOpenmodalAdjust(true);
    }
    const [openmodalAdjust, setOpenmodalAdjust] = useState(false);
    const [balanceAdjusted, setBalanceAdjusted] = useState(accountData?.balance);

    const getAccountsList = useCallback(() => {
        getAllAccountsByUnitId(unitActive?.id, null)
            .then((accountResponse: any) => {
                if (accountResponse?.success) {
                    const categoriesWithArea = accountResponse.result.map((account: any) => ({ ...account, account: account.unit.name, description: account.unit.description, accountPhoto: account.unit.photo }));
                    setAccountsListState(categoriesWithArea);
                    const accountRenew = categoriesWithArea.find((item: any) => item.id === accountData?.id);
                    setBalanceAdjusted(accountRenew?.balance ?? 0);
                } else {
                    console.log("No se pudieron obtener las accounts");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unitActive?.id, setAccountsListState, accountData?.id]);

    useEffect(() => {
        setBalanceAdjusted(accountData?.balance);
    }, [accountData?.balance]);

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
                    <Grid container spacing={2} columnSpacing={1} gap={2}>
                        <Grid item xs={12} sm={6} md={4} >
                            {isNew ?
                                <FormControl >
                                    <Field
                                        name="balance"
                                        component={TextFieldErrorRedux}
                                        label="Balance"
                                        placeholder='Ingrese el monto'
                                        type="number"
                                        // InputProps={{  }}
                                        InputLabelProps={{ shrink: true }}
                                        // onChange={(e: any) => console.log(e.target.value)}
                                        value={accountData?.balance || ''}
                                        disabled={!isNew}
                                    />
                                </FormControl>
                                :
                                <Box width='100%' display='flex' flexDirection='row' alignItems='center' justifyContent='flex-start'>
                                    <TextField
                                        variant="standard"
                                        name="balanceEdit"
                                        label="Balance"
                                        placeholder='Ingrese el monto'
                                        type="number"
                                        value={balanceAdjusted}
                                        disabled
                                        fullWidth
                                    />
                                    <Tooltip title="Ajustar Balance">
                                        <IconButton aria-label="Ajustar" onClick={() => onAdjust()}>
                                            <CommonIcon color='gray' iconName="Adjust" />
                                        </IconButton>
                                    </Tooltip>
                                </Box>}
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
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                    </Box>
                    <Box gap={2} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'center' }}>
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
                    </Box>
                </Grid>
                {
                    accountData?.type !== 'cash' &&
                    <AccountPayMethodsEditFrom
                        sx={{ width: '100%', boxShadow: 2 }}
                        title='Metodos de Pago de esta cuenta'
                        subheader='Seleccione los metodos que desea tener como medio de pago para esta cuenta'
                        payMethodsSelected={payMethodsSelected}
                        setPayMethodsSelected={setPayMethodsSelected}
                    />
                }
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
                openmodal={openmodalAdjust}
                setOpenmodal={setOpenmodalAdjust}
                children={
                    // <AreaCreateEditModalViewForm
                    //     onCancel={() => setOpenmodalAdjust(false)}
                    //     color={areaColorSelected}
                    //     areaId={areaSelected}
                    //     unitId={unit?.id}
                    //     type={type}
                    //     updateAreasList={getSetAreasList}
                    // />
                    <AccountAdjustModalViewForm
                        onCancel={() => setOpenmodalAdjust(false)}
                        accountData={accountData}
                        updateList={getAccountsList}
                    />
                }
                buttonPrimaryAction={() => setOpenmodalAdjust(false)}
                buttonSecondaryAction={() => setOpenmodalAdjust(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Form >
    )
}

const mapDispatchToProps = (dispatch: any) => ({
    setAccountsListState: bindActionCreators(setAccountsList, dispatch),
})

export default connect(
    (state: any) => ({
        unitActive: state.units.unitActive,
    }),
    mapDispatchToProps
)(AccountCreateEditForm);
// export default AccountCreateEditForm;