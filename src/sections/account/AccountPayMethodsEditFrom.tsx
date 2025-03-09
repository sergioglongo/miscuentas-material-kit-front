import { Card, CardContent, CardHeader, CardProps, Checkbox, Grid, Typography } from '@mui/material'
import React from 'react'
import { grey } from '../../theme/core/palette';

type Props = CardProps & {
    title?: string;
    subheader?: string;
    type?: string;
    payMethodsSelected: string[];
    setPayMethodsSelected: any;
};

const typesList = [
    { id: 'bank', name: 'Banco' },
    { id: 'electronic', name: 'Electrónica' },
    { id: 'cash', name: 'Efectivo' },
    { id: 'debt', name: 'Deuda' },
    { id: 'other', name: 'Otra' },
]

const methodsList = [
    { id: 'debit', name: 'Tarjeta Debito' },
    { id: 'credit', name: 'Tarjeta Credito' },
    { id: 'transfer', name: 'Transferencia' },
    // { id: 'other', name: 'Otro' },
]

function AccountPayMethodsEditFrom({ title = '', subheader = '', type = 'bank', payMethodsSelected, setPayMethodsSelected, sx, ...other }: Props) {

    return (
        <Card sx={sx} {...other}>
            <CardHeader title={title} subheader={subheader} sx={{ backgroundColor: grey[100] }} />
            {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}> */}
            <CardContent
            sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                backgroundColor: grey[100],
                height: '100%'
            }}>
                <Grid container spacing={2} marginTop='0px' justifyContent='center'>
                    {methodsList?.map((item) => (
                        <Grid key={item.id} item xs={6} sm={4} md={3}
                            width='100%' display='flex' flexDirection='row'
                            alignItems='center' justifyContent='center'>
                            <Typography variant="h6">{item.name}</Typography>
                            <Checkbox
                                size="large"
                                checked={payMethodsSelected.includes(item.id) || false}
                                onChange={(e) => setPayMethodsSelected(e.target.checked ? [...payMethodsSelected, item.id] : payMethodsSelected.filter((id) => id !== item.id))}
                            />
                        </Grid>
                    ))}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default AccountPayMethodsEditFrom