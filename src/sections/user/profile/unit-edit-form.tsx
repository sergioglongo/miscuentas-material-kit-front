import { useEffect } from 'react';
import { LoadingButton } from '@mui/lab'
import { Avatar, Fab, FormControl, Grid } from '@mui/material'
import { Field, Form } from 'redux-form'
import { TextFieldErrorRedux } from 'src/components/forms/fields/textFieldError'
import AddIcon from '@mui/icons-material/Add';
import Dropzone from 'react-dropzone';
import houseImage from 'src/assets/images/house.svg';

function UnitEditForm({ handleSave, unitData }: any) {
    let dropzoneRef: any;
    const acceptedFiles = { 'image/*': ['.png','.jpg', '.jpeg'],};
    return (
        <Form onSubmit={handleSave} style={{ margin: '10px' }}>
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
                               alt={unitData?.unitName}
                               src={unitData?.photo || houseImage}
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
                           {/* <label > */}
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
                           {/* </label> */}
                       </div>
                   </div>
               </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="name"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese el nombre de la unidad'
                            label="Nombre de unidad"
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={unitData?.name || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            label="Descripción"
                            placeholder='Ingrese una descripcion sobre la unidad'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            aria-multiline
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={unitData?.description || ''}
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

export default UnitEditForm;