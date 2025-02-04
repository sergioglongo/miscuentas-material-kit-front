import { useCallback, useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import IconList from 'src/components/list/IconList';
import { IArea, ICategory, IPayMethod } from 'src/config/types/types';
import { AutocompleteRedux, CheckboxRedux, SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, Checkbox, FormControl, Grid, ListItemIcon, MenuItem, Select, Switch, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import ModalConfirm from 'src/components/modal/ModalConfirm';
import CategoryIcon, { CategoryIconsList } from 'src/components/icon/CategoryIcon';
import PayMethodIcon from 'src/components/icon/PayMethodIcons';

interface PayMethodEditProps {
    handleEdit: any;
    payMethodData: IPayMethod;
    isActive: boolean;
    setIsActive: any;
    onCancel: any;
}

function PayMethodEditForm({ handleEdit, payMethodData, isActive, setIsActive, onCancel }: PayMethodEditProps) {

    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} gap={5} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', flexWrap: 'wrap' }}>
                    <FormControl fullWidth>
                        <Field
                            name="name"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese el nombre'
                            label="Nombre"
                            value={payMethodData?.name || ''}
                        />
                    </FormControl>
                    
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6">Activado:</Typography>
                        <Checkbox
                            size="large"
                            onChange={(e: any) => setIsActive(e.target.checked)}
                            checked={isActive}
                        />
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                    <Grid item xs={12} sm={6} width='100%' marginTop='10px'>
                        <Button fullWidth size="large" color="inherit" variant="contained" onClick={() => onCancel()}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} width='100%' marginTop='10px' >

                        <LoadingButton
                            fullWidth
                            size="large"
                            type="submit"
                            color="primary"
                            variant="contained"
                        // onClick={handleSignUp}
                        >
                            Guardar
                        </LoadingButton>
                    </Grid>

                </Grid>
            </Grid>
        </Form >
    )
}

export default PayMethodEditForm;