import { useState, useMemo, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { reduxForm, initialize } from 'redux-form';
import { connect } from 'react-redux';
import { createEditUser, getUnitsById, getUnitsByUserId } from 'src/services/api/apiClient';
import { setUser } from 'src/redux/slices/user.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { useTheme, Theme, SxProps, Breakpoint } from '@mui/material/styles';
import { layoutClasses } from 'src/layouts/classes';
import FormLayout from 'src/components/forms/formLayout';
import BasicCard from 'src/components/cards/basicCard.tsx/basicCard';
import PostCard from 'src/components/cards/postCard/postCard';
import SectionCard from 'src/components/cards/sectionCard.tsx/sectionCard';
import ProfileEditForm from './profile-edit-form';
import UnitEditForm from './unit-edit-form';
import ProfileUnitList from './profile-unit-list';

const ProfileEditView = ({ profileForm, user, userData, setUserData, init }: any) => {
    const router = useRouter();
    const [errorMessage, setErrorMessage] = useState('');
    const [errorShow, setErrorShow] = useState<boolean>(false);
    const [units, setUnits] = useState<any>([]);

    useEffect(() => {
        if (userData) {
            init('profileForm', userData);
            console.log("inicializacion de userData");
        }

    }, [userData, init])

    const handleSignIn = useMemo(() => (e: any) => {
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
                <ProfileEditForm handleEdit={handleSignIn} userData={userData} />
                {/* <UnitEditForm units={units} /> */}
            </SectionCard>
            {/* </FormLayout> */}

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