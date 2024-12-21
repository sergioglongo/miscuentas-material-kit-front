import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { useLocation } from 'react-router-dom';
import { connect } from 'react-redux';
import { createEditUser } from 'src/services/api/modules/user.module';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
// import ProfileEditForm from '../user/profile/profile-edit-form';
import { createEditArea } from 'src/services/api/modules/area.module';
import AreaCreateEditForm from './AreaCreateEditForm';
// import ProfileEditForm from '../user/profile/profile-edit-form'

const AreaCreateEditView = ({ areaForm, init, unit }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const location = useLocation();
    const areaInitialData = location.state;
    const [color, setColor] = useState(areaInitialData?.color ||"#b32aa9");
    const [icon, setIcon] = useState(areaInitialData?.icon ||"Home");
    const [type, setType] = useState(areaInitialData?.type || "out");

    const presetColors = ["#cd9323", "#1a53d8", "#9a2151", "#0d6416", "#8d2808"];

    useEffect(() => {
        if (areaInitialData) {
            init('areaForm', areaInitialData);
            setColor(areaInitialData?.color);
            console.log("inicializacion de userData", areaInitialData);
        }

    }, [init, areaInitialData]);

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        const dataToSave = {
            id: areaForm?.values?.id,
            name: areaForm?.values?.name,
            description: areaForm?.values?.description || '',
            type,
            color,
            icon,
            deleted: areaForm?.values?.deleted,
            is_active: areaForm?.values?.is_active,
            unitId: unit.id
        }
        console.log("formulario a guardar:", dataToSave);
        createEditArea(dataToSave)
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

    }, [router, areaForm?.values, unit, color, icon, type]);

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
                title="Editar Area"
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
                iconColor={color}
            >
                {/* <ProfileEditForm handleEdit={handleSave} userData={{}} /> */}
                {/* <UnitEditForm units={units} /> */}
                <AreaCreateEditForm
                    handleEdit={handleSave}
                    areaData={areaForm?.values}
                    color={color}
                    setColor={setColor}
                    icon={icon}
                    setIcon={setIcon}
                    type={type}
                    setType={setType}
                    presetColors={presetColors}
                />
            </SectionCard>
        </Box>
    );
}

const AreaCreateEditFormReduxed = reduxForm({
    form: 'areaForm',
    enableReinitialize: true,
})(AreaCreateEditView);

const mapDispatchToProps = (dispatch: any) => ({
    init: bindActionCreators(initialize, dispatch),
});

const AreaCreateEditViewForm = connect(
    (state: any) => ({
        areaForm: state.form.areaForm,
        unit: state.units.unitActive,
    }),
    mapDispatchToProps
)(AreaCreateEditFormReduxed);

export default AreaCreateEditViewForm;