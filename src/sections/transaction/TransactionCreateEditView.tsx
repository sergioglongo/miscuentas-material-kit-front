import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { IArea, ICategory, InOutType, IPayMethod, ITransaction } from 'src/config/types/types';
import { getAllAccounts } from 'src/services/api/modules/account.module';
import { fDate, fDateDbToDatePicker, localToUtc, utcToLocal } from 'src/utils/format-time';
import { basePalette } from 'src/theme/core';
import { createEditTransaction, getTransactionById } from 'src/services/api/modules/transaction.module';
import { getAllCategoriesByUnitId } from 'src/services/api/modules/category.module';
import { getAllPayMethodsByUnitId } from 'src/services/api/modules/payMethod.module';
import { getAllAreasByUnitId } from 'src/services/api/modules/area.module';
import TransactionCreateEditForm from './TransactionCreateEditForm';

const TransactionCreateEditView = ({ transactionForm, init, unit }: any) => {
    const router = useRouter();
    const [isNew, setIsNew] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [areasList, setareasList] = useState<IArea[]>([]);
    const [categoriesList, setCategoriesList] = useState<ICategory[]>([]);
    const [payMethodsList, setPayMethodsList] = useState<IPayMethod[]>([]);
    const location = useLocation();
    const TransactionInitialData = location.state;
    const [type, setType] = useState<InOutType>(TransactionInitialData?.type || "out");

    useEffect(() => {
        getAllAreasByUnitId(unit?.id, type)
            .then((areasResponse: any) => {
                // console.log("areasResponse", areasResponse);
                if (areasResponse?.success) {
                    setareasList(areasResponse.result);
                } else {
                    console.log("No se pudieron obtener las areas");
                }
            }).catch((err: any) => console.log(err));
        getAllCategoriesByUnitId(unit?.id, '')
            .then((categoriesResponse: any) => {
                // console.log("categoriesResponse", categoriesResponse);
                if (categoriesResponse?.success) {
                    setCategoriesList(categoriesResponse.result);
                } else {
                    console.log("No se pudieron obtener las categorias");
                }
            }).catch((err: any) => console.log(err));
        getAllPayMethodsByUnitId(unit?.id, type)
            .then((payMethodsResponse: any) => {
                // console.log("payMethodsResponse", payMethodsResponse);
                if (payMethodsResponse?.success) {
                    setPayMethodsList(payMethodsResponse.result);
                } else {
                    console.log("No se pudieron obtener los metodos de pago");
                }
            }).catch((err: any) => console.log(err));

    }, [type, unit?.id]);

    useEffect(() => {
        if (TransactionInitialData?.id) {
            getTransactionById(TransactionInitialData?.id).then((resultTransaction: any) => {
                if (resultTransaction?.success) {
                    console.log("transaction by Id", resultTransaction.result);
                    const dataToInit = { ...resultTransaction.result, date: utcToLocal(resultTransaction.result?.date) };
                    init('transactionForm', dataToInit);
                    setIsNew(false);
                    setType(resultTransaction.result.type);
                }
            })
        }
        console.log("TransactionInitialData", TransactionInitialData);

    }, [init, TransactionInitialData]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave: ITransaction = {
            id: transactionForm?.values?.id,
            name: transactionForm?.values?.name,
            description: transactionForm?.values?.description,
            amount: transactionForm?.values?.amount,
            discount: transactionForm?.values?.discount,
            date: localToUtc(transactionForm?.values?.date),
            type,
            deleted: transactionForm?.values?.deleted || false,
            categoryId: transactionForm?.values?.categoryId,
            payMethodId: transactionForm?.values?.payMethodId,
            unitId: transactionForm?.values?.unitId || unit?.id
        }
        console.log("formulario a guardar:", dataToSave);
        createEditTransaction(dataToSave)
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

    }, [router, transactionForm?.values, unit?.id, type]);

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
                title={
                    isNew ?
                        `${type === "out" ? "Nuevo gasto" : "Nuevo ingreso"}`
                        : `${type === "out" ? "Editar gasto" : "Editar ingreso"}`
                }
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
                iconColor={type === "out" ? basePalette.error.main : basePalette.success.main}
            >
                {/* <PayMethodCreateEditForm
                    handleEdit={handleSave}
                    accountsList={accounts}
                    payMethodData={transactionForm?.values}
                /> */}
                <TransactionCreateEditForm
                    handleEdit={handleSave}
                    areasList={areasList}
                    categoriesList={categoriesList}
                    payMethodList={payMethodsList}
                    transactionData={transactionForm?.values}
                    type={type}
                    setType={setType}
                // areaId={TransactionInitialData?.areaId}
                />
            </SectionCard>
        </Box>
    );
}

const TransactionCreateEditFormReduxed = reduxForm({
    form: 'transactionForm',
    enableReinitialize: true,
})(TransactionCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
});

const TransactionCreateEditViewForm = connect(
    (state: any) => ({
        transactionForm: state.form.transactionForm,
        unit: state.units.unitActive,
    }),
    mapDispatchToProps
)(TransactionCreateEditFormReduxed);

export default TransactionCreateEditViewForm;