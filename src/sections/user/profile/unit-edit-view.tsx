import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import { useLocation } from 'react-router-dom';
import { createEditUnit } from 'src/services/api/modules/unit.module';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import { updateUnit } from 'src/redux/slices/units.slice';
import { setUnitsList } from 'src/redux/slices/lists.slice';
import UnitEditForm from './unit-edit-form';

const ProfileEditView = ({ unitData, unitForm, init, userData, setUnitData, setUnitsDataList }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const location = useLocation();
    const estado = location?.state;
    const [icon, setIcon] = useState(unitData?.photo || "Home");

    useEffect(() => {
        if (estado) {
            init('unitForm', estado);
            console.log("inicializacion de unitData", estado);
            setIcon(estado?.photo);
        }
        // console.log("unitData en unit-edit-view", estado);

    }, [estado, init])

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        console.log("formulario a guardar:", unitForm?.values);

        createEditUnit({
            id: unitForm?.values?.id,
            name: unitForm?.values?.name,
            description: unitForm?.values?.description,
            userid: userData?.id,
            photo: icon || '',
            type: 'owner',
            permissions: {
                owner: true,
                user: true,
                guest: true
            }
        })
            .then((res) => {
                if (res?.success) {
                    console.log("User to update state", res);
                    setUnitData(res.unit);
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
    }, [router, unitForm?.values, userData?.id, icon, setUnitData]);

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
                title="Edicion de Unidad"
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
                iconColor={theme.palette.primary.main}
            >
                <UnitEditForm handleSave={handleSave} unitData={estado} icon={icon} setIcon={setIcon} />
            </SectionCard>
            {/* </FormLayout> */}
        </Box>
    );
}

const UnitEditFormReduxed = reduxForm({
    form: 'unitForm',
    enableReinitialize: true,
})(ProfileEditView);

const mapDispatchToProps = (dispatch: any) => ({
    // setUserData: bindActionCreators(setUser, dispatch),
    init: bindActionCreators(initialize, dispatch),
    setUnitData: bindActionCreators(updateUnit, dispatch),
    setUnitsDataList: bindActionCreators(setUnitsList, dispatch),
});

const UnitEditViewForm = connect(
    (state: any) => ({
        unitForm: state.form.unitForm,
        userData: state.user.userData
    }),
    mapDispatchToProps
)(UnitEditFormReduxed);

export default UnitEditViewForm;