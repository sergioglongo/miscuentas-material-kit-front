import { useState, forwardRef, useMemo } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';
import { useRouter } from 'src/routes/hooks';
import { Iconify } from 'src/components/iconify';
import { Grid, FormControl, Snackbar } from '@mui/material';
import { AlertSnack } from 'src/components/notifications/AlertSnack';
import { Field, Form, reduxForm } from 'redux-form';
import { TextFieldErrorRedux } from 'src/components/forms/fields/textFieldError';
import { connect } from 'react-redux';
import { signIn } from 'src/services/api/apiClient';
import { setUser } from 'src/redux/slices/user.slice';
import { bindActionCreators } from '@reduxjs/toolkit';

const SignInView = ({ signInForm, setUserData }: any) => {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [errorShow, setErrorShow] = useState<boolean>(false);

  const handleSignIn = useMemo(() => (e: any) => {
    e.preventDefault();
    console.log("formulario:", signInForm?.values);
    signIn({ email: signInForm?.values?.email, password: signInForm?.values?.password })
      .then((res) => {
        if (res?.success) {
          setUserData({ userData: res?.user?.user, isAuthorized: true, accessToken: res?.user?.accessToken });
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

  }, [signInForm, router, setUserData]);

  const renderForm = (
    <Form onSubmit={handleSignIn}>
      <Grid container rowSpacing={1} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
        <Grid item xs={12} sm={12} >
          <FormControl>
            <Field
              component={TextFieldErrorRedux}
              name="email"
              label="Email address"
              // defaultValue= "hello@gmail.com"
              // InputProps={{  }}
              InputLabelProps={{ shrink: true }}
              sx={{ mb: 3, width: '200px' }}
            />
          </FormControl>
        </Grid>
        <Grid item xs={12} sm={12} alignItems='center'>
          <Link variant="body2" color="inherit" sx={{ mb: 1.5 }}>
            Forgot password?
          </Link>
        </Grid>
        <Grid item xs={12} sm={12}>
          <FormControl>
            <Field
              component={TextFieldErrorRedux}
              fullWidth
              name="password"
              label="Password"
              // defaultValue="@demo1234"
              InputLabelProps={{ shrink: true }}
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                      <Iconify icon={showPassword ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ mb: 3, width: '200px' }}
            />
          </FormControl>
        </Grid>
        <LoadingButton
          fullWidth
          size="large"
          type="submit"
          color="inherit"
          variant="contained"
          sx={{ mb: 3, width: '200px' }}
        // onClick={handleSignIn}
        >
          Sign in
        </LoadingButton>
      </Grid>
      <Snackbar
        open={errorShow}
        // message={errorMessage}
        autoHideDuration={3000}
        onClose={() => setErrorShow(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}

      >
        <AlertSnack onClose={() => setErrorShow(false)} severity="error">
          {errorMessage}
        </AlertSnack>
      </Snackbar>
    </Form>
  );

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

      {renderForm}

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
});

const SignInViewForm = connect(
  (state: any) => ({
    signInForm: state.form.signInForm,
  }),
  mapDispatchToProps
)(SingInFormReduxed);

export default SignInViewForm;