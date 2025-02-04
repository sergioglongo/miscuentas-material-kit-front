import { useState, useMemo, useEffect, useRef } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { IAccount } from 'src/config/types/types';
import { setAccountsList, setPayMethodsList } from 'src/redux/slices/lists.slice';
import { createEditAccount, getAccountById } from 'src/services/api/modules/account.module';
import AccountCreateEditForm from './AccountCreateEditForm';

const accountInitialDataEmpty = {
    currency: 'Pesos',
    type: 'cash',
}

const methodsList = [
    { id: 'debit', name: 'Tarjeta Debito' },
    { id: 'credit', name: 'Tarjeta Credito' },
    { id: 'transfer', name: 'Transferencia' },
    { id: 'other', name: 'Otro' },
]

const AccountCreateEditView = ({ accountForm, init, unit, setAccountsListState, setPayMethodsListState }: any) => {
    const router = useRouter();
    const [payMethodsSelected, setPayMethodsSelected] = useState([]);
    const location = useLocation();
    const accountInitialData = location.state;
    const [isNew, setIsNew] = useState(true);
    const [is_active, setIsActive] = useState(accountForm?.is_active || true);
    const loadingAccountRef = useRef(false);

    const processPaymethods = (accountData: any) => {
        if (accountData?.pay_methods.length > 0) {
            const payMethods = accountData?.pay_methods;
            const payMethodsInAccount:any = [...new Set(payMethods.map((payMethod: any) => payMethod.method))];
            console.log("payMethodsInAccount", payMethodsInAccount);
            setPayMethodsSelected(payMethodsInAccount);
        }
    }
    useEffect(() => {
        if (!loadingAccountRef.current && accountInitialData?.id) {
            loadingAccountRef.current = true;
            getAccountById(accountInitialData?.id).then((resultTransaction: any) => {
                if (resultTransaction?.success) {
                    init('accountForm', accountInitialData);
                    setIsNew(false);
                    processPaymethods(resultTransaction.result);
                }
            })
                .finally(() => {
                    loadingAccountRef.current = false;
                });
        }
    }, [init, accountInitialData]);
    useEffect(() => {
        console.log("payMethodsSelected", payMethodsSelected);
        
    },[payMethodsSelected]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave: IAccount & { pay_methods: string[] } = {
            id: accountForm?.values?.id,
            name: accountForm?.values?.name,
            balance: accountForm?.values?.balance,
            currency: accountForm?.values?.currency,
            type: accountForm?.values?.type,
            deleted: accountForm?.values?.deleted,
            is_active,
            unitId: accountForm?.values?.unitId || unit?.id,
            pay_methods: payMethodsSelected
        }
        console.log("formulario a guardar:", dataToSave);
        createEditAccount(dataToSave)
            .then((res) => {
                if (res?.success) {
                    setAccountsListState([]);
                    setPayMethodsListState([]);

                    router.back();
                } else {
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                console.log("error catch", err)
            });

    }, [router, accountForm?.values, unit?.id, is_active, setAccountsListState, payMethodsSelected, setPayMethodsListState]);

    const theme = useTheme();
    const layoutQuery: Breakpoint = 'md';

    return (
        <Box
            component="main"
            sx={{
                display: 'flex',
                flex: '1 1 auto',
                alignItems: 'center',
                flexDirection: 'column',
                p: theme.spacing(3, 2, 10, 2),
                [theme.breakpoints.up(layoutQuery)]: {
                    justifyContent: 'center',
                    p: theme.spacing(2, 10, 10, 10),
                },
            }}
            rowGap={2}
        >
            {/* <FormLayout > */}
            <SectionCard
                title={isNew ? "Nueva Cuenta" : "Editar Cuenta"}

                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
            // iconColor={color}
            >
                {/* <ProfileEditForm handleEdit={handleSave} userData={{}} /> */}
                {/* <UnitEditForm units={units} /> */}
                {/* <CategoryCreateEditForm
                    handleEdit={handleSave}
                    categoryData={accountForm?.values}
                    color={color}
                    setColor={setColor}
                    icon={icon}
                    setIcon={setIcon}
                    presetColors={presetColors}
                    areasList={areas}
                /> */}
                <AccountCreateEditForm
                    handleEdit={handleSave}
                    accountData={accountForm?.values || accountInitialDataEmpty}
                    isNew={isNew}
                    is_active={is_active}
                    setIsActive={setIsActive}
                    payMethodsSelected={payMethodsSelected}
                    setPayMethodsSelected={setPayMethodsSelected}
                />
            </SectionCard>
        </Box>
    );
}

const AccountCreateEditFormReduxed = reduxForm({
    form: 'accountForm',
    enableReinitialize: true,
})(AccountCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    setAccountsListState: bindActionCreators(setAccountsList, dispatch),
    setPayMethodsListState: bindActionCreators(setPayMethodsList, dispatch),
});

const AccountCreateEditViewForm = connect(
    (state: any) => ({
        accountForm: state.form.accountForm,
        unit: state.units.unitActive,
    }),
    mapDispatchToProps
)(AccountCreateEditFormReduxed);

export default AccountCreateEditViewForm;