import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'src/routes/hooks';
import { initialize, reduxForm } from 'redux-form';
import { setCategoriesList } from 'src/redux/slices/lists.slice';
import { createEditCategory, getCategoryById } from 'src/services/api/modules/category.module';
import { Box, Card, CardContent, CardProps, Typography } from '@mui/material';
import AreaCategoriesCreateEditForm from './AreaCategoriesCreateEditForm';

function AreaCategoriesCreateEditView({ categoryId, categoryForm, init, setCategoriesListState, onCancel, color, areaId, updateCategoriesList }: any) {

    const router = useRouter();
    const [isNew, setIsNew] = useState(true);
    const loadingCategoryRef = useRef(false);
    const [icon, setIcon] = useState("Home");
    const [isActive, setIsActive] = useState(true);

    useEffect(() => {
        if (!loadingCategoryRef.current && categoryId) {
            console.log("Categoria recibida", categoryId);

            loadingCategoryRef.current = true;
            getCategoryById(categoryId).then((resultCategory: any) => {
                if (resultCategory?.success) {
                    init('categoryForm', resultCategory?.result);
                    setIsNew(false);
                    setIcon(resultCategory?.result?.icon);
                    setIsActive(resultCategory?.result?.is_active);
                    console.log("resultCategory", resultCategory?.result);
                    // setCategoriesList(resultCategory?.result?.categories);
                }
            })
                .finally(() => {
                    loadingCategoryRef.current = false;
                });
        }
    }, [init, categoryId]);
    
    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const dataToSave = {
            id: categoryForm?.values?.id,
            name: categoryForm?.values?.name,
            description: categoryForm?.values?.description,
            color,
            icon,
            deleted: false,
            is_active: isActive,
            areaId
        }
        console.log("formulario a guardar:", dataToSave);
        createEditCategory(dataToSave)
            .then((res) => {
                if (res?.success) {
                    setCategoriesListState([]);
                    onCancel();
                    updateCategoriesList();
                } else {
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                console.log("error catch", err)
            });

    }, [categoryForm?.values, icon, isActive, setCategoriesListState, color, onCancel, areaId, updateCategoriesList]);

    return (
        <Box>
            <Typography variant='h6'>{isNew ? 'Nueva Categoria' : 'Editar Categoria'}</Typography>
            <Box sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <AreaCategoriesCreateEditForm
                    handleEdit={handleSave}
                    categoryData={categoryForm?.values}
                    icon={icon}
                    setIcon={setIcon}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    onCancel={onCancel}
                    color={color}
                    isNew={isNew}
                />
            </Box>
        </Box>
    )
}


const AreaCategoriesCreateEditViewReduxed = reduxForm({
    form: 'categoryForm',
    enableReinitialize: true,
})(AreaCategoriesCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    setCategoriesListState: bindActionCreators(setCategoriesList, dispatch),
});

const mapStateToProps = (state: any, ownProps: any) => ({
    categoryForm: state.form.categoryForm,
    unit: state.units.unitActive,
    categoryId: ownProps.categoryId,
    onCancel: ownProps.onCancel,
    color: ownProps.color,
    areaId: ownProps.areaId,
    updateCategoriesList: ownProps.updateCategoriesList // Agregamos el parámetro categoryId
});

const AreaCategoriesCreateEditViewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AreaCategoriesCreateEditViewReduxed);

export default AreaCategoriesCreateEditViewForm;