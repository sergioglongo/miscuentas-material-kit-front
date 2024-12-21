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
import { createEditCategory } from 'src/services/api/modules/category.module';
import CategoryCreateEditForm from './CategoryCreateEditForm';

const CategoryCreateEditView = ({ categoryForm, init, unit }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [areas, setAreas] = useState([]);
    const location = useLocation();
    const categoryInitialData = location.state;
    const [color, setColor] = useState(categoryInitialData?.color || categoryInitialData?.areaColor || "#b32aa9");
    const [icon, setIcon] = useState(categoryInitialData?.icon || "Home");
    const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

    useEffect(() => {

        getAllAreas(`?unitId=${unit?.id}&is_active=1`)
            .then((areasResponse: any) => {
                console.log("areasResponse", areasResponse);
                if (areasResponse?.success) {
                    setAreas(areasResponse.result);
                } else {
                    console.log("No se pudieron obtener las areas");
                }
            })
            .catch((err: any) => console.log(err));
    }, [unit?.id, categoryInitialData]);

    useEffect(() => {
        if (categoryInitialData) {
            init('categoryForm', categoryInitialData);
            setColor(categoryInitialData?.color);
            console.log("inicializacion de userData", categoryInitialData);
        }

    }, [init, categoryInitialData]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave = {
            id: categoryForm?.values?.id,
            name: categoryForm?.values?.name,
            description: categoryForm?.values?.description,
            type: 'out',
            color,
            icon,
            deleted: categoryForm?.values?.deleted,
            is_active: categoryForm?.values?.is_active,
            areaId: categoryForm?.values?.areaId
        }
        console.log("formulario a guardar:", dataToSave);
        createEditCategory(dataToSave)
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

    }, [router, categoryForm?.values, color, icon]);

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
                title="Editar Categoría"
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
                // iconColor={color}
            >
                {/* <ProfileEditForm handleEdit={handleSave} userData={{}} /> */}
                {/* <UnitEditForm units={units} /> */}
                <CategoryCreateEditForm
                    handleEdit={handleSave}
                    categoryData={categoryForm?.values}
                    color={color}
                    setColor={setColor}
                    icon={icon}
                    setIcon={setIcon}
                    presetColors={presetColors}
                    areasList={areas}
                />
            </SectionCard>
        </Box>
    );
}

const CategoryCreateEditFormReduxed = reduxForm({
    form: 'categoryForm',
    enableReinitialize: true,
})(CategoryCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
});

const CategoryCreateEditViewForm = connect(
    (state: any) => ({
        categoryForm: state.form.categoryForm,
        unit: state.units.unitActive,
    }),
    mapDispatchToProps
)(CategoryCreateEditFormReduxed);

export default CategoryCreateEditViewForm;