import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { IAccount } from 'src/config/types/types';
import { setAccountsList } from 'src/redux/slices/lists.slice';
import { createEditAccount } from 'src/services/api/modules/account.module';
import AccountCreateEditForm from './AccountCreateEditForm';

const accountInitialDataEmpty = {
    currency: 'Pesos',
    type: 'cash',
}

const AccountCreateEditView = ({ accountForm, init, unit, setAccountsListState }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [areas, setAreas] = useState([]);
    const location = useLocation();
    const accountInitialData = location.state;
    const [isNew, setIsNew] = useState(true);
    const [is_active, setIsActive] = useState(accountForm?.is_active || true);

    useEffect(() => {
        if (accountInitialData) {
            init('accountForm', accountInitialData);
            console.log("inicializacion de accountData", accountInitialData);
            setIsNew(false);
            setIsActive(accountInitialData?.is_active);
        }
    }, [init, accountInitialData]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave:IAccount = {
            id: accountForm?.values?.id,
            name: accountForm?.values?.name,
            balance: accountForm?.values?.balance,
            currency: accountForm?.values?.currency,
            type: accountForm?.values?.type,
            deleted: accountForm?.values?.deleted,
            is_active,
            unitId: accountForm?.values?.unitId || unit?.id
        }
        console.log("formulario a guardar:", dataToSave);
        createEditAccount(dataToSave)
            .then((res) => {
                if (res?.success) {
                    setAccountsListState([]);
                    router.back();
                } else {
                    setErrorMessage(res?.message);
                    setErrorShow(true);
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                setErrorMessage(err?.message);
                setErrorShow(true);
                console.log("error catch", err)
            });

    }, [router, accountForm?.values, unit?.id, is_active, setAccountsListState]);

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
});

const AccountCreateEditViewForm = connect(
    (state: any) => ({
        accountForm: state.form.accountForm,
        unit: state.units.unitActive,
    }),
    mapDispatchToProps
)(AccountCreateEditFormReduxed);

export default AccountCreateEditViewForm;