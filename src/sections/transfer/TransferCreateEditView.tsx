import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'src/routes/hooks';
import { initialize, reduxForm } from 'redux-form';
import { createEditCategory } from 'src/services/api/modules/category.module';
import { Box, Typography } from '@mui/material';
import { getAllAccountsForTransfer, transferCreateEdit } from 'src/services/api/modules/account.module';
import TransferCreateEditForm from './TransferCreateEditForm';

function TransferCreateEditView({ transferId, transferForm, init, unit, setTransfersListState, onCancel, updateTransactionsList }: any) {

    const [isNew, setIsNew] = useState(true);
    const loadingCategoryRef = useRef(false);
    const [accountsTransferListIn, setAccountsTransferListIn] = useState([]);
    const [accountsTransferListOut, setAccountsTransferListOut] = useState([]);
    const [accountInSelected, setAccountInSelected] = useState(null);
    const [accountOutSelected, setAccountOutSelected] = useState<number | ''>('');

    useEffect(() => {
        const data = {
            is_active: true,
            unitId: unit?.id
        }
        getAllAccountsForTransfer(data)
            .then((resultAccounts: any) => {
                setAccountsTransferListIn(resultAccounts?.result?.listIn);
                setAccountsTransferListOut(resultAccounts?.result?.listOut);
            })
    }, [unit?.id]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const dataToSave = {
            // id: transferForm?.values?.id,
            // description: transferForm?.values?.description,
            amount: transferForm?.values?.amount,
            accountOutId: accountOutSelected,
            accountInId: accountInSelected,
            date: transferForm?.values?.date
        }
        console.log("formulario a guardar:", dataToSave);
        transferCreateEdit(dataToSave)
            .then((res) => {
                if (res?.success) {
                    // setTransfersListState([]);
                    console.log("success true, updateTransactionsList");
                    
                    onCancel();
                    updateTransactionsList();
                } else {
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                console.log("error catch", err)
            });

    }, [transferForm?.values, onCancel, accountOutSelected, accountInSelected, updateTransactionsList]);

    return (
        <Box>
            <Typography variant='h6'>Nueva transferencia</Typography>
            <Box sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <TransferCreateEditForm
                    handleEdit={handleSave}
                    transferData={transferForm?.values}
                    accountsTransferListIn={accountsTransferListIn}
                    accountsTransferListOut={accountsTransferListOut}
                    unit={unit}
                    accountInSelected={accountInSelected}
                    setAccountInSelected={setAccountInSelected}
                    accountOutSelected={accountOutSelected}
                    setAccountOutSelected={setAccountOutSelected}
                    onCancel={onCancel}
                />
            </Box>
        </Box>
    )
}


const TransferCreateEditViewReduxed = reduxForm({
    form: 'transferForm',
    enableReinitialize: true,
})(TransferCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    // setTransactionsListState: bindActionCreators(setCategoriesList, dispatch),
});

const mapStateToProps = (state: any, ownProps: any) => ({
    transferForm: state.form.transferForm,
    unit: state.units.unitActive,
    onCancel: ownProps.onCancel,
    // list: state.lists,
    updateTransactionsList: ownProps.updateTransactionsList // Agregamos el parámetro categoryId
});

const TransferCreateEditViewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(TransferCreateEditViewReduxed);

export default TransferCreateEditViewForm;