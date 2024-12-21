import { LoadingButton } from '@mui/lab'
import { FormControl, FormHelperText, Grid, IconButton, InputAdornment, Snackbar } from '@mui/material'
import { useState } from 'react'
import Link from '@mui/material/Link';
import { Field, Form } from 'redux-form'
import { TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { Iconify } from 'src/components/iconify'
import { AlertSnack } from 'src/components/notifications/AlertSnack'

function SignUpForm({handleSignUp, signUpForm, alertMessage, setAlertMessage}: any) {
    
    const [showPassword, setShowPassword] = useState(false);
    const [showPassword2, setShowPassword2] = useState(false);
    const [passMatch, setPassMatch] = useState(true);

    const passValidate = (value: any) => {
        console.log("passValidate", signUpForm?.values?.password, value, signUpForm?.values?.password === value);
        if(signUpForm?.values?.password.length < value.length) {
            setPassMatch(signUpForm?.values?.password === value)
        }
    };

    return (
        <Form onSubmit={handleSignUp} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            component={TextFieldErrorRedux}
                            name="firstname"
                            label="Nombre"
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            component={TextFieldErrorRedux}
                            name="lastname"
                            label="Apellido"
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            component={TextFieldErrorRedux}
                            name="email"
                            label="Email address"
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
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
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            component={TextFieldErrorRedux}
                            fullWidth
                            name="password2"
                            label="Repetir contraseña"
                            // defaultValue="@demo1234"
                            InputLabelProps={{ shrink: true }}
                            type={showPassword2 ? 'text' : 'password'}
                            onChange={(e: any) => passValidate(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={() => setShowPassword2(!showPassword2)} edge="end">
                                            <Iconify icon={showPassword2 ? 'solar:eye-bold' : 'solar:eye-closed-bold'} />
                                        </IconButton>
                                    </InputAdornment>
                                ),
                            }}
                        />
                        {!passMatch && <FormHelperText style={{ position: 'absolute', bottom: '-22px', color: '#d32f2f' }}>Contraseñas no coinciden</FormHelperText>}
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            component={TextFieldErrorRedux}
                            name="name"
                            label="Nombre de la Unidad (Ej: Hogar, Oficina)"
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', marginTop: '10px' }}>
                    <LoadingButton
                        fullWidth
                        size="large"
                        type="submit"
                        color="inherit"
                        variant="contained"
                    // onClick={handleSignUp}
                    >
                        Registrarse
                    </LoadingButton>
                </Grid>
            </Grid>
            <Snackbar
                open={alertMessage?.show}
                // message={errorMessage}
                autoHideDuration={3000}
                onClose={() => setAlertMessage({ ...alertMessage, show: false })}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
            >
                <AlertSnack onClose={() => setAlertMessage({ ...alertMessage, show: false })} severity={alertMessage?.color}>
                    {alertMessage?.message}
                </AlertSnack>
            </Snackbar>
        </Form>
    )
}

export default SignUpForm