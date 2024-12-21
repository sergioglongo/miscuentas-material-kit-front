import { useState, useCallback, useMemo } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { signUp } from 'src/services/api/modules/user.module';
import { setUser } from 'src/redux/slices/user.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import SignUpForm from './sign-up-form';

// ----------------------------------------------------------------------

const SignUpView = ({ signUpForm, setUserData }: any) => {
    const router = useRouter();


    const [alertMessage, setAlertMessage] = useState({
        message: '',
        show: false,
        color: 'success'
    });



    const handleSignUp = useMemo(() => (e: any) => {
        e.preventDefault();
        console.log("formulario:", signUpForm?.values);

        signUp(signUpForm?.values)
            .then((res) => {
                if (res?.success) {
                    // setUserData({ userData: res?.user?.user, isAuthorized: true, accessToken: res?.user?.accessToken });
                    setAlertMessage({
                        message: "Registrado con exito",
                        show: true,
                        color: 'success'
                    })
                    setTimeout(() => {
                        router.push('/sign-in');
                    }, 3000);
                } else {
                    setAlertMessage({
                        message: res?.message,
                        show: true,
                        color: 'error'
                    })
                    console.log("error else", res)
                }
            }
            )
            .catch((err: any) => {
                setAlertMessage({
                    message: err?.message,
                    show: true,
                    color: 'error'
                })
                console.log("error catch", err)
            });

    }, [signUpForm, router]);


    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Inicia sesión</Typography>
                <Typography variant="body2" color="text.secondary">
                    auú no tienes cuenta?
                    <Link href="/" variant="subtitle2" sx={{ ml: 0.5 }}>
                        volver
                    </Link>
                </Typography>
            </Box>

            <SignUpForm handleSignUp={handleSignUp} signUpForm={signUpForm} alertMessage={alertMessage} setAlertMessage={setAlertMessage} /> 

            <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
                >
                    O inicia sesión con
                </Typography>
            </Divider>

            <Box gap={1} display="flex" justifyContent="center">
                <IconButton color="inherit">
                    <Iconify icon="logos:google-icon" />
                </IconButton>
                <IconButton color="inherit">
                    <Iconify icon="eva:github-fill" />
                </IconButton>
                <IconButton color="inherit">
                    <Iconify icon="ri:twitter-x-fill" />
                </IconButton>
            </Box>
        </>
    );
}

const SingUpFormReduxed = reduxForm({
    form: 'signUpForm',
    enableReinitialize: true,
})(SignUpView);

const mapDispatchToProps = (dispatch: any) => ({
    setUserData: bindActionCreators(setUser, dispatch),
});

const SignUpViewForm = connect(
    (state: any) => ({
        signUpForm: state.form.signUpForm,
    }),
    mapDispatchToProps
)(SingUpFormReduxed);

export default SignUpViewForm;