import { bindActionCreators } from '@reduxjs/toolkit';
import { connect } from 'react-redux';
import React, { useEffect, useMemo, useRef, useState } from 'react'
import { useRouter } from 'src/routes/hooks';
import { initialize, reduxForm } from 'redux-form';
import { setAreasList } from 'src/redux/slices/lists.slice';
import { basePalette } from 'src/theme/core';
import { createEditCategory, getCategoryById } from 'src/services/api/modules/category.module';
import { createEditArea, getAreaById } from 'src/services/api/modules/area.module';
import { Box, Typography } from '@mui/material';
import AreaCreateEditModalForm from './AreaCreateEditModalForm';

const getColors = () => {
    const colors = [];
    const length = Object.keys(basePalette.listColors).length/2 + 1;
    for (let i = 1; i < length; i += 1) {
      colors.push(basePalette.listColors[i]);
    }
    return colors;
}
function AreaCreateEditModalView({ areaId, areaModalForm, type, unitId, init, setAreasListState, onCancel, updateAreasList }: any) {

    const router = useRouter();
    const [isNew, setIsNew] = useState(true);
    const loadingCategoryRef = useRef(false);
    const [icon, setIcon] = useState("Home");
    const [color, setColor] = useState("black");
    const [isActive, setIsActive] = useState(true);

    const presetColors = getColors();

    useEffect(() => {
        if (!loadingCategoryRef.current && areaId) {
            loadingCategoryRef.current = true;
            getAreaById(areaId).then((resultArea: any) => {
                if (resultArea?.success) {
                    const dataInit = {
                        ...resultArea?.result,
                        unitId
                    }
                    init('areaModalForm', dataInit);
                    setIsNew(false);
                    setIcon(dataInit?.icon);
                    setColor(dataInit?.color);
                    setIsActive(dataInit?.is_active);
                }
            })
                .finally(() => {
                    loadingCategoryRef.current = false;
                });
        }
    }, [init, areaId, unitId]);
    
    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        e.stopPropagation();
        const dataToSave = {
            id: areaModalForm?.values?.id,
            name: areaModalForm?.values?.name,
            description: areaModalForm?.values?.description,
            color,
            icon,
            type,
            is_active: isActive,
            unitId
        }
        console.log("formulario area a guardar:", dataToSave);
        createEditArea(dataToSave)
            .then((res) => {
                if (res?.success) {
                    setAreasListState([]);
                    onCancel();
                    updateAreasList();
                } else {
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                console.log("error catch", err)
            });

    }, [areaModalForm?.values, icon, isActive, setAreasListState, color, onCancel, updateAreasList, type, unitId]);

    return (
        <Box>
            <Typography variant='h6'>{isNew ? 'Nueva Area' : 'Editar Area'}</Typography>
            <Box sx={{ width: '100%', gap: 2, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'flex-start' }}>
                <AreaCreateEditModalForm
                    handleEdit={handleSave}
                    areaData={areaModalForm?.values}
                    icon={icon}
                    setIcon={setIcon}
                    isActive={isActive}
                    setIsActive={setIsActive}
                    onCancel={onCancel}
                    color={color}
                    setColor={setColor}
                    isNew={isNew}
                    presetColors={presetColors}
                />
            </Box>
        </Box>
    )
}


const AreaCreateEditModalViewReduxed = reduxForm({
    form: 'areaModalForm',
    enableReinitialize: true,
})(AreaCreateEditModalView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
    setAreasListState: bindActionCreators(setAreasList, dispatch),
});

const mapStateToProps = (state: any, ownProps: any) => ({
    areaModalForm: state.form.areaModalForm,
    unit: state.units.unitActive,
    areaId: ownProps.areaId,
    type: ownProps.type,
    onCancel: ownProps.onCancel,
    updateAreasList: ownProps.updateAreasList
});

const AreaCreateEditModalViewForm = connect(
    mapStateToProps,
    mapDispatchToProps
)(AreaCreateEditModalViewReduxed);

export default AreaCreateEditModalViewForm;