import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { getAllAreas } from 'src/services/api/modules/area.module';
import { InOutType, IPayMethod } from 'src/config/types/types';
import { createEditCategory } from 'src/services/api/modules/category.module';
import { setAccountsList } from 'src/redux/slices/lists.slice';
import { createEditPayMethod, getAllPayMethods } from 'src/services/api/modules/payMethod.module';
import { getAllAccounts } from 'src/services/api/modules/account.module';
import PayMethodCreateEditForm from './PayMethodCreateEditForm';

const CategoryCreateEditView = ({ payMethodForm, init, unit, lists, setAccountsListState }: any) => {
    const router = useRouter();
    const [isNew, setIsNew] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [accounts, setAccounts] = useState([]);
    const location = useLocation();
    const payMethodInitialData = location.state;
    const [type, setType] = useState<InOutType>(payMethodInitialData?.type || "out");
    const [isActive, setIsActive] = useState<boolean>(payMethodInitialData?.is_active || true);

    useEffect(() => {
        if (lists.accountsList.length === 0) {
            getAllAccounts(`?unitId=${unit?.id}&is_active=1`)
                .then((accountsResponse: any) => {
                    console.log("accountsResponse", accountsResponse);
                    if (accountsResponse?.success) {
                        setAccountsListState(accountsResponse.result);

                    } else {
                        console.log("No se pudieron obtener las cuentas");
                    }
                })
                .catch((err: any) => console.log(err));
        }
    }, [unit?.id, payMethodInitialData, setAccountsListState, lists.accountsList]);

    useEffect(() => {
        if (payMethodInitialData) {
            init('payMethodForm', payMethodInitialData);
            console.log("inicializacion de paymethodData", payMethodInitialData);
            setIsNew(false);
            setIsActive(payMethodInitialData?.is_active);
        }

    }, [init, payMethodInitialData]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave: IPayMethod = {
            id: payMethodForm?.values?.id,
            name: payMethodForm?.values?.name,
            method: payMethodForm?.values?.method,
            type,
            deleted: payMethodForm?.values?.deleted || false,
            is_active: payMethodForm?.values?.is_active,
            accountId: payMethodForm?.values?.accountId
        }
        console.log("formulario a guardar:", dataToSave);
        createEditPayMethod(dataToSave)
            .then((res) => {
                if (res?.success) {
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

    }, [router, payMethodForm?.values, type]);

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
                title={isNew ? "Nuevo Metodo de Pago" : "Editar Metodo de Pago"}
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
            // iconColor={color}
            >
                <PayMethodCreateEditForm
                    handleEdit={handleSave}
                    accountsList={lists.accountsList}
                    payMethodData={payMethodForm?.values}
                    type={type}
                    setType={setType}
                    isActive={isActive}
                    setIsActive={setIsActive}
                />
            </SectionCard>
        </Box>
    );
}

const PaymethodCreateEditFormReduxed = reduxForm({
    form: 'payMethodForm',
    enableReinitialize: true,
})(CategoryCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    setAccountsListState: bindActionCreators(setAccountsList, dispatch),
});

const PaymethodCreateEditViewForm = connect(
    (state: any) => ({
        payMethodForm: state.form.payMethodForm,
        unit: state.units.unitActive,
        lists: state.lists
    }),
    mapDispatchToProps
)(PaymethodCreateEditFormReduxed);

export default PaymethodCreateEditViewForm;