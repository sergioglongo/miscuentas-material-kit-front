import { Card, CardContent, CardHeader, CardProps, Grid, Table, IconButton, TableBody, Paper, TableCell, TableContainer, TableHead, TableRow, Tooltip, Box, Typography, Button } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import React from 'react'
import CategoryIcon from 'src/components/icon/CategoryIcon';
import CommonIcon from 'src/components/icon/CommonIcons';
import { Iconify } from 'src/components/iconify';

type Props = CardProps & {
    title?: string;
    subheader?: string;
    type?: string;
    categoriesList: any[];
    onEditCategory: any;
    onNewCategory: any;
};

function AreaCategoriesAdminForm({ title = '', subheader = '', type = 'bank', categoriesList, onEditCategory, onNewCategory, sx, ...other }: Props) {
    const router = useRouter();
    const onEdit = (categoryData: any) => {
        console.log("presionado editar category", categoryData.id);
        onEditCategory(categoryData.id);
        // router.navigateState('/categoryEdit', categoryInitialData);

    };
    const onNew = () => { 
        onNewCategory();
    };
    return (
        <Card sx={sx} {...other}>
            {/* <CardHeader title={title} subheader={subheader} /> */}
            {/* <Box display="grid" gap={2} gridTemplateColumns="repeat(2, 1fr)" sx={{ p: 3 }}> */}
            <CardContent sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                alignItems: 'center',
                height: '100%',
                width: '100%'
            }}>
                <Box sx={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Typography variant="h5">{title}</Typography>
                    <Button
                        variant="contained"
                        color="success"
                        startIcon={<Iconify icon="mingcute:add-line" />}
                        onClick={onNew}
                    >
                        Nueva Categoría
                    </Button>
                </Box>
                <Grid container spacing={2} sx={{ marginTop: '10px', marginLeft: '10px' }}>
                    {/* <TableContainer component={Paper} > */}
                    <Card sx={{ boxShadow: 2 }}>
                        <Table size='small' aria-label="simple table" >
                            <TableHead >
                                <TableRow>
                                    <TableCell>Nombre</TableCell>
                                    <TableCell >Icono</TableCell>
                                    <TableCell align='center'>Acciones</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {categoriesList.map((row) => (
                                    <TableRow
                                        key={row.name}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ overflow: 'visible', whiteSpace: 'normal' }}>
                                           {row.name}  
                                        </TableCell>
                                        <TableCell component="th" >
                                            <CategoryIcon iconName={row?.icon} styles={{ fontSize: '20', display: 'flex', color: row?.color }} />
                                        </TableCell>
                                        <TableCell component="th" align='center' sx={{ display: 'flex', flexDirection: 'row', width: '100%'}}>
                                            <Box display='flex' flexDirection='row' gap={0} flexWrap='wrap' justifyContent='center'>
                                                <Tooltip title="Ver detalle">
                                                    <IconButton aria-label="Ver" onClick={() => { }}>
                                                        <CommonIcon color='gray' iconName="View" styles={{ fontSize: '20' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Editar">
                                                    <IconButton aria-label="Ver" onClick={() => onEdit(row)}>
                                                        <CommonIcon color='gray' iconName="Edit" styles={{ fontSize: '20' }} />
                                                    </IconButton>
                                                </Tooltip>
                                                <Tooltip title="Eliminar">
                                                    <IconButton aria-label="Ver" onClick={() => { }}>
                                                        <CommonIcon color='gray' iconName="Delete" styles={{ fontSize: '20' }} />
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Card>
                    {/* </TableContainer> */}
                </Grid>
            </CardContent>
        </Card>
    )
}

export default AreaCategoriesAdminForm