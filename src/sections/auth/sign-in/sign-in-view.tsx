import { useState, forwardRef, useMemo } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { setUnitActive, setUnitMain, setUnits } from 'src/redux/slices/units.slice';
import { signIn } from 'src/services/api/modules/user.module';
import { setUser } from 'src/redux/slices/user.slice';
import { bindActionCreators } from '@reduxjs/toolkit';
import { setUnitsList } from 'src/redux/slices/lists.slice';
import SignInForm from './sign-in-form';

const SignInView = ({ signInForm, setUserData, setUnitsData, setUnitMainData, setUnitActiveData, setUnitsListData }: any) => {
  const router = useRouter();
  const [errorMessage, setErrorMessage] = useState('');
  const [errorShow, setErrorShow] = useState<boolean>(false);


  const handleSignIn = useMemo(() => (e: any) => {
    e.preventDefault();
    console.log("formulario:", signInForm?.values);
    signIn({ email: signInForm?.values?.email, password: signInForm?.values?.password })
      .then((res) => {
        if (res?.success) {
          const user = res?.user?.user;
          const units = res?.user?.units;
          const mainUnit = res?.user?.main_unit;
          setUserData({ userData: user, isAuthorized: true, accessToken: res?.user?.accessToken });
          setUnitsData(units);
          setUnitMainData(mainUnit);
          setUnitActiveData(mainUnit);
          setUnitsListData(units);
          router.push('/');
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

  }, [setUnitsData, signInForm, router, setUserData, setUnitsListData, setUnitMainData, setUnitActiveData]);


  return (
    <>
      <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
        <Typography variant="h5">Inicia sesión</Typography>
        <Typography variant="body2" color="text.secondary">
          auú no tienes cuenta?
          <Link href="/sign-up" variant="subtitle2" sx={{ ml: 0.5 }}>
            Crea una aqui..
          </Link>
        </Typography>
      </Box>

      <SignInForm handleSignIn={handleSignIn} errorMessage={errorMessage} errorShow={errorShow} setErrorShow={setErrorShow}/>

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

const SingInFormReduxed = reduxForm({
  form: 'signInForm',
  enableReinitialize: true,
})(SignInView);

const mapDispatchToProps = (dispatch: any) => ({
  setUserData: bindActionCreators(setUser, dispatch),
  setUnitsData: bindActionCreators(setUnits, dispatch),
  setUnitsListData: bindActionCreators(setUnitsList, dispatch),
  setUnitActiveData: bindActionCreators(setUnitActive, dispatch),
  setUnitMainData: bindActionCreators(setUnitMain, dispatch),
});

const SignInViewForm = connect(
  (state: any) => ({
    signInForm: state.form.signInForm,
  }),
  mapDispatchToProps
)(SingInFormReduxed);

export default SignInViewForm;