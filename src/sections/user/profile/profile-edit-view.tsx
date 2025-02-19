import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { createEditUser } from 'src/services/api/modules/user.module';
import { Button } from '@mui/material';
import { Iconify } from 'src/components/iconify';
import { setUser } from 'src/redux/slices/user.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Breakpoint } from '@mui/material/styles';
import { setUnits } from 'src/redux/slices/units.slice';
import { getUnitsByUserId } from 'src/services/api/modules/unit.module';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import ProfileEditForm from './profile-edit-form';
import ProfileUnitList from './profile-unit-list';

const ProfileEditView = ({ profileForm, user, userData, setUserData, init }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);

    const onNewUnit = () => {
        router.push('/unitEdit');
    }

    useEffect(() => {
        if (userData) {
            init('profileForm', userData);
            console.log("inicializacion de userData");
        }

    }, [userData, init])

    const handleSave = useMemo(() => (e: any) => {
        e.preventDefault();
        console.log("formulario a guardar:", profileForm?.values);
        createEditUser({
            id: profileForm?.values?.id,
            firstname: profileForm?.values?.firstname,
            lastname: profileForm?.values?.lastname,
            email: profileForm?.values?.email
        })
            .then((res) => {
                if (res?.success) {
                    const userUpdateState = { ...user, userData: res?.user };
                    console.log("User to update state", userUpdateState);
                    setUserData(userUpdateState);
                    router.replace('/');
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

    }, [router, user, setUserData, profileForm?.values]);

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
                title="Perfil de usuario"
                subtitle=""
                iconName="DocumentOk"
                iconSize={50}
                iconColor={theme.palette.primary.main}
            >
                <ProfileEditForm handleEdit={handleSave} userData={userData} />
                {/* <UnitEditForm units={units} /> */}
            </SectionCard>
            {/* </FormLayout> */}
            <Box display="flex" width='100%' sx={{ justifyContent: 'flex-end', marginRight: 2 }}>
                <Button
                    variant="contained"
                    color="inherit"
                    startIcon={<Iconify icon="mingcute:add-line" />}
                    onClick={onNewUnit}
                >
                    Nueva Unidad
                </Button>
            </Box>
            <SectionCard
                title="Unidades"
                subtitle="Unidades a gestionar"
                iconName="Document"
                iconSize={50}
                iconColor={theme.palette.primary.main}
            >
                <ProfileUnitList />
            </SectionCard>
        </Box>
    );
}

const ProfileEditFormReduxed = reduxForm({
    form: 'profileForm',
    enableReinitialize: true,
})(ProfileEditView);

const mapDispatchToProps = (dispatch: any) => ({
    setUserData: bindActionCreators(setUser, dispatch),
    init: bindActionCreators(initialize, dispatch),
});

const ProfileEditViewForm = connect(
    (state: any) => ({
        profileForm: state.form.profileForm,
        userData: state.user.userData,
        user: state.user
    }),
    mapDispatchToProps
)(ProfileEditFormReduxed);

export default ProfileEditViewForm;