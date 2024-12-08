import { LoadingButton } from '@mui/lab'
import { FormControl, Grid, IconButton, InputAdornment, Snackbar } from '@mui/material'
import { useState } from 'react'
import Link from '@mui/material/Link';
import { Field, Form } from 'redux-form'
import { TextFieldErrorRedux } from 'src/components/forms/fields/textFieldError'
import { Iconify } from 'src/components/iconify'
import { AlertSnack } from 'src/components/notifications/AlertSnack'

function SignInForm({handleSignIn, errorMessage, errorShow, setErrorShow}: any) {
    const [showPassword, setShowPassword] = useState(false);
  
    return (
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
                    <Link color="inherit" sx={{ mb: 1.5 }}>
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
    )
}

export default SignInForm