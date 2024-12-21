import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab'
import { Avatar, Fab, FormControl, Grid } from '@mui/material'
import { Field, Form } from 'redux-form'
import { TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import AddIcon from '@mui/icons-material/Add';
import Dropzone from 'react-dropzone';
import profileImage from 'src/assets/images/profile.svg';
import classes from './profile.module.css';

function ProfileEditForm({ handleEdit, userData }: any) {
    let dropzoneRef: any;
    const acceptedFiles = { 'image/*': ['.png','.jpg', '.jpeg'],};
    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
            <Grid item xs={12} sm={12} >
                   <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center' }}>
                       <div style={{
                           position: 'relative',
                           display: 'flex',
                           width: 200,
                           height: 200,
                           alignItems: 'center',
                           justifyContent: 'center'
                       }}>
                           <Avatar
                               alt={userData?.firstname[0].toUpperCase() || userData?.lastname[0].toUpperCase() || ''}
                               src={userData?.photo || profileImage}
                               sx={{ width: 180, height: 180 }}
                               
                           />
                           <Dropzone
                               // className={classes.hiddenDropzone}
                               accept={acceptedFiles}
                               // onDrop={onDrop}
                               // maxSize={fileSizeLimit}
                               ref={(node) => { dropzoneRef = node; }}
                               multiple={false}
                           >
                               {({ getRootProps, getInputProps }) => (
                                   <div {...getRootProps()}>
                                       <input {...getInputProps()} />
                                   </div>
                               )}
                           </Dropzone>
                               <Fab
                                   color="primary"
                                   aria-label="edit"
                                   style={{ position: 'absolute', bottom: 0, right: 0 }}
                                   id="raised-button-file"
                                   onClick={() => {
                                       dropzoneRef.open();
                                   }}
                               >
                                   <AddIcon color='inherit'/>
                               </Fab>
                       </div>
                   </div>
               </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="firstname"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese su nombre'
                            label="Nombre"
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={userData?.firstname || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="lastname"
                            component={TextFieldErrorRedux}
                            label="Apellido"
                            placeholder='Ingrese su apellido'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={userData?.lastname || ''}
                        />
                    </FormControl>
                </Grid>

                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            component={TextFieldErrorRedux}
                            name="email"
                            label="Email address"
                            placeholder='email@email.com'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={userData?.email || ''}
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
                        Guardar
                    </LoadingButton>
                </Grid>
            </Grid>
        </Form>
    )
}

export default ProfileEditForm;