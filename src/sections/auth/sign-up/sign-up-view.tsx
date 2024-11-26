import { useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Divider from '@mui/material/Divider';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import InputAdornment from '@mui/material/InputAdornment';

import { useRouter } from 'src/routes/hooks';

import { Iconify } from 'src/components/iconify';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { FormControl, Grid } from '@mui/material';
import { TextFieldErrorRedux } from 'src/components/forms/fields/textFieldError';

// ----------------------------------------------------------------------

const SignUpView = () => {
    const router = useRouter();

    const [showPassword, setShowPassword] = useState(false);

    const handleSignIn = useCallback(() => {
        router.push('/');
    }, [router]);

    const renderForm = (
        <Grid container rowSpacing={1} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
            <Grid item xs={12} sm={12} >
                <FormControl>
                    <Field
                        component={TextFieldErrorRedux}
                        name="email"
                        label="Email address"
                        defaultValue="hello@gmail.com"
                        InputLabelProps={{ shrink: true }}
                        sx={{ mb: 3, width:'200px' }}
                    // required
                    // validate={[required]}
                    // onChange={(event) => handleInputChange('marca', event.target.value)}
                    // value={formData?.marca || ''}
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
                        defaultValue="@demo1234"
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
                        sx={{ mb: 3, width:'200px' }}
                    />
                </FormControl>
            </Grid>
            <LoadingButton
                fullWidth
                size="large"
                type="submit"
                color="inherit"
                variant="contained"
                sx={{ mb: 3, width:'200px' }}
                onClick={handleSignIn}
            >
                Sign in
            </LoadingButton>
        </Grid>
    );

    return (
        <>
            <Box gap={1.5} display="flex" flexDirection="column" alignItems="center" sx={{ mb: 5 }}>
                <Typography variant="h5">Sign in</Typography>
                <Typography variant="body2" color="text.secondary">
                    Don’t have an account?
                    <Link variant="subtitle2" sx={{ ml: 0.5 }}>
                        Get started
                    </Link>
                </Typography>
            </Box>

            {renderForm}

            <Divider sx={{ my: 3, '&::before, &::after': { borderTopStyle: 'dashed' } }}>
                <Typography
                    variant="overline"
                    sx={{ color: 'text.secondary', fontWeight: 'fontWeightMedium' }}
                >
                    OR
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

const ReduxFormMapped = reduxForm({
    form: 'signUpForm',
    enableReinitialize: true,
})(SignUpView);

const SignUpViewForm = connect(
    // state => ({
    //     formValues: state.form.signUpForm,
    // }),
)(ReduxFormMapped);

export default SignUpViewForm;