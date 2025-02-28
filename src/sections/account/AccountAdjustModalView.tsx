import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'src/routes/hooks';
import { initialize, reduxForm } from 'redux-form';
import { Box, Typography } from '@mui/material';
import { ITransaction } from 'src/config/types/types';
import { localToUtc } from 'src/utils/format-time';
import { createEditTransaction } from 'src/services/api/modules/transaction.module';
import { adjustAccountBalance } from 'src/services/api/modules/account.module';
import { setAccountsList } from 'src/redux/slices/lists.slice';
import AccountAdjustModalForm from './AccountAdjustModalForm';

function AreaCreateEditModalView({ accountData, accountAdjustModalForm, unitId, init, setAccountListState, onCancel, updateList }: any) {

    const [type, setType] = useState('out');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (accountData) {
            init('accountAdjustModalForm', {
                description: `Ajuste en ${accountData?.name}`,
                accountId: accountData?.id
            });
            console.log("accountData init", {
                description: accountData?.name,
                accountId: accountData?.id
            });
        }
        
    }, [init, accountData, unitId]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const dataToSave: any = {
            description: accountAdjustModalForm?.values?.description,
            amount,
            type,
            accountId: accountData?.id
        }
        console.log("Ajuste a crear:", dataToSave);
        adjustAccountBalance(dataToSave)
            .then((res) => {
                if (res?.success) {
                    onCancel();
                    updateList();
                } else {
                    console.log("error handlesave else", res)
                }
            }
            )
            .catch((err: any) => {
                console.log("error handlesave catch", err)
            });

    }, [accountAdjustModalForm?.values, setAccountListState, updateList, type, unitId, accountData, amount]); // eslint-disable-line

    return (
        <Box>
            <Typography variant='h6'>Ajuste de cuenta</Typography>
            <Box sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <AccountAdjustModalForm
                    handleAdjust={handleSave}
                    type={type}
                    setType={setType}
                    amount={amount}
                    setAmount={setAmount}
                    transactionData={accountAdjustModalForm?.values}
                    accountData={accountData}
                    onCancel={onCancel}
                />
            </Box>
        </Box>
    )
}


const AccountAdjustModalViewReduxed = reduxForm({
    form: 'accountAdjustModalForm',
    enableReinitialize: true,
})(AreaCreateEditModalView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    setAccountListState: bindActionCreators(setAccountsList, dispatch),
});

const mapStateToProps = (state: any, ownProps: any) => ({
    accountAdjustModalForm: state.form.accountAdjustModalForm,
    unit: state.units.unitActive,
    accountData: ownProps.accountData,
    onCancel: ownProps.onCancel,
    updateList: ownProps.updateList
});

const AccountAdjustModalViewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AccountAdjustModalViewReduxed);

export default AccountAdjustModalViewForm;