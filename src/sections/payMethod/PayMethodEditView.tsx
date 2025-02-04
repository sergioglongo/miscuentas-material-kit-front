import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'src/routes/hooks';
import { initialize, reduxForm } from 'redux-form';
import { setCategoriesList, setPayMethodsList } from 'src/redux/slices/lists.slice';
import { createEditCategory, getCategoryById } from 'src/services/api/modules/category.module';
import { Box, Card, CardContent, CardProps, Typography } from '@mui/material';
import { createEditPayMethod, getPayMethodById } from 'src/services/api/modules/payMethod.module';
import PayMethodEditForm from './PayMethodEditForm';

function AreaCategoriesCreateEditView({ payMethodId, payMethodForm, init, setPayMethodListState, onCancel, setOpenmodalPayMethodEdit }: any) {

    const router = useRouter();
    const [isNew, setIsNew] = useState(true);
    const loadingPayMethodRef = useRef(false);
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!loadingPayMethodRef.current && payMethodId) {
            console.log("Categoria recibida", payMethodId);
            loadingPayMethodRef.current = true;
            getPayMethodById(payMethodId).then((resultPayMethod: any) => {
                if (resultPayMethod?.success) {
                    init('payMethodForm', resultPayMethod?.result);
                    setIsNew(false);
                    setIsActive(resultPayMethod?.result?.is_active);
                    console.log("resultPayMethod", resultPayMethod?.result);
                    // setCategoriesList(resultCategory?.result?.categories);
                }
            })
                .finally(() => {
                    loadingPayMethodRef.current = false;
                });
        }
    }, [init, payMethodId]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave = {
            id: payMethodForm?.values?.id,
            name: payMethodForm?.values?.name,
            method: payMethodForm?.values?.method,
            // deleted: false,
            is_active: isActive,
            accountId: payMethodForm?.values?.accountId
        }
        console.log("formulario a guardar:", dataToSave);
        createEditPayMethod(dataToSave)
            .then((res) => {
                if (res?.success) {
                    setPayMethodListState([]);
                    // router.back();
                    setOpenmodalPayMethodEdit(false);
                    onCancel();
                } else {
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                console.log("error catch", err)
            });

    }, [payMethodForm?.values, isActive, setPayMethodListState, onCancel, setOpenmodalPayMethodEdit]);
    useEffect(() => {
        console.log("setIsActive", isActive);
        
    },[isActive]);
    return (
        <Box>
            <Typography variant='h6'>{isNew ? 'Nueva Categoria' : 'Editar Categoria'}</Typography>
            <Box sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <PayMethodEditForm
                    handleEdit={handleSave}
                    payMethodData={payMethodForm?.values}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    onCancel={onCancel}
                />
            </Box>
        </Box>
    )
}


const PayMethodEditViewReduxed = reduxForm({
    form: 'payMethodForm',
    enableReinitialize: true,
})(AreaCategoriesCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    setPayMethodListState: bindActionCreators(setPayMethodsList, dispatch),
});

const mapStateToProps = (state: any, ownProps: any) => ({
    payMethodForm: state.form.payMethodForm,
    unit: state.units.unitActive,
    payMethodId: ownProps.payMethodId,
    onCancel: ownProps.onCancel,
    color: ownProps.color,
    areaId: ownProps.areaId,
    updateCategoriesList: ownProps.updateCategoriesList // Agregamos el parámetro payMethodId
});

const PayMethodEditViewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(PayMethodEditViewReduxed);

export default PayMethodEditViewForm;