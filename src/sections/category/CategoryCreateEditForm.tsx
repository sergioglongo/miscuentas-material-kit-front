import { useCallback, useEffect, useState } from 'react';
import { Iconify } from 'src/components/iconify';
import IconList from 'src/components/list/IconList';
import { IArea, ICategory } from 'src/config/types/types';
import { AutocompleteRedux, CheckboxRedux, SelectRedux, TextFieldErrorRedux } from 'src/components/forms/fields/ReduxFields'
import { LoadingButton } from '@mui/lab'
import { Box, Button, FormControl, Grid, ListItemIcon, MenuItem, Switch, Typography } from '@mui/material'
import { useRouter } from 'src/routes/hooks';
import { Field, Form } from 'redux-form'
import ModalConfirm from 'src/components/modal/ModalConfirm';
import CategoryIcon, { CategoryIconsList } from 'src/components/icon/category-icons';
import AreaIcon from 'src/components/icon/area-icons';

interface CategoryEditProps {
    handleEdit: any;
    categoryData: ICategory;
    color: string;
    setColor: any;
    icon: string;
    setIcon: any;
    presetColors: string[],
    areasList: IArea[]
}

function CategoryCreateEditForm({ handleEdit, categoryData, color, setColor, icon, setIcon, presetColors, areasList }: CategoryEditProps) {

    const [openmodal, setOpenmodal] = useState(false);
    const [type, setType] = useState(categoryData?.type || 'out');
    const [areasListToShow, setAreasListToShow] = useState<IArea[]>([]);
    const router = useRouter();
    const styles:any = {
        container: {
          display: 'flex',
          flexWrap: 'wrap',
          width: '300px',
          height: 'auto',
          justifyContent: 'space-around',
        },
        icon: {
            width: 'auto',
            height: 'auto',
            margin: '4px',
            boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.1)',
        },
      };

    const onSelectIcon = (iconSelected: string) => {
        console.log("icono seleccionado", iconSelected);
        setOpenmodal(false);
        setIcon(iconSelected);
    }
    // useEffect(() => {
    //    console.log("categoryData al inicio", categoryData);

    // },[])
    const areasFilter = useCallback(
        () => areasList.filter((area: IArea) => area.type === type),
        [areasList, type]
    );

    useEffect(() => {
        setType(categoryData?.type || 'out');
    }, [categoryData?.type])

    useEffect(() => {
        console.log("limitadas areas", type, areasFilter());

        setAreasListToShow(areasFilter());
    }, [type, areasFilter])

    useEffect(() => {
        if (categoryData) {
            console.log(categoryData);
        }
    }, [categoryData])

    useEffect(() => {
        console.log("color", color);
    }, [color])
    useEffect(() => {
        console.log("icon", icon);
    }, [icon])
    return (
        <Form onSubmit={handleEdit} style={{ margin: '10px' }}>
            <Grid container rowSpacing={1} rowGap={2} columnSpacing={2} display='flex' flexDirection='column' alignItems='center'>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="name"
                            component={TextFieldErrorRedux}
                            placeholder='Ingrese el nombre'
                            label="Nombre"
                            // InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={categoryData?.name || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%' }}>
                    <FormControl fullWidth>
                        <Field
                            name="description"
                            component={TextFieldErrorRedux}
                            label="Descripción"
                            placeholder='Ingrese la descripción'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            InputLabelProps={{ shrink: true }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={categoryData?.description || ''}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Grid container spacing={2} style={{ width: '80%' }}>
                        <Grid item xs={12} sm={12} style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-start' }} >
                            <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', flexWrap: 'wrap', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                                <Typography variant="h6">Elija un color:</Typography>
                                {presetColors.map((presetColor) => (
                                    <Button
                                        key={presetColor}
                                        className={styles.pickerSwatches}
                                        style={{
                                            background: presetColor,
                                            border: `3px solid ${presetColor !== color ? presetColor : '#FAAC40'}`,
                                            height: '30px',
                                        }}
                                        onClick={() => setColor(presetColor)}
                                    />
                                ))}
                            </Grid>
                        </Grid>
                        <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                            <Typography variant="h6">Elija un icono:</Typography>
                            <Button variant='contained' style={{ width: '200px' }} onClick={() => setOpenmodal(true)} >Elegir</Button>

                        </Grid>
                    </Grid>
                    <Box sx={{ width: '20%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                        {(!!categoryData?.icon || !!icon) &&
                            <CategoryIcon
                                iconName={icon || categoryData?.icon}
                                styles={{
                                    fontSize: 100,
                                    display: 'flex',
                                    color: color || 'black',
                                    borderRadius: '5px',
                                    // border: '1px solid #ccc',
                                    boxShadow: '0px 0px 5px rgba(0,0,0,0.2)',
                                    padding: '5px'
                                }}
                            />}
                    </Box>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Typography variant="h6">Activado:</Typography>
                    <FormControl fullWidth>
                        <Field
                            name="is_active"
                            component={CheckboxRedux}
                            label="Activado"
                            size="large"
                            style={{ width: '50px' }}
                            onChange={(e: any) => console.log(e.target.value)}
                            value={categoryData?.is_active || true}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} style={{ width: '100%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                    <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                        <Typography variant="h6">Entrada</Typography>
                        <Switch
                            // defaultChecked
                            onClick={(e: any) => setType(e.target.checked ? "out" : "in")}
                            checked={type === 'out'}
                        />
                        <Typography variant="h6" style={{ marginLeft: '0px' }}>Salida</Typography>
                    </Box>
                    <Typography variant="h6" style={{ marginLeft: '16px' }}>Area:</Typography>
                    <FormControl >
                        <Field
                            name="areaId"
                            component={SelectRedux}
                            // label="Area"
                            style={{ minWidth: '200px', marginLeft: '10px' }}
                            // placeholder='Ingrese area'
                            // defaultValue= "hello@gmail.com"
                            // InputProps={{  }}
                            // InputLabelProps={{ shrink: true }}
                            variant="outlined"
                            size='small'
                            // onChange={(e: any) => console.log(e.target.id)}
                            value={categoryData?.areaId || ''}
                        >
                            {areasListToShow.map((item, index) => (
                                <MenuItem
                                    value={item.id} key={index}
                                    defaultValue={categoryData?.areaId === item?.id ? categoryData?.areaId : ''}
                                // style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
                                >
                                    <ListItemIcon style={{ display: 'flex', gap: '10px', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}>
                                        <AreaIcon iconName={item?.icon} styles={{ fontSize: '30', display: 'flex', color: item?.color }} />
                                        {item?.name}
                                    </ListItemIcon>

                                </MenuItem>
                            ))}
                        </Field>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12} gap={2} style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-arround' }}>
                    <Grid item xs={12} sm={6} style={{ width: '100%', marginTop: '10px' }}>
                        <Button fullWidth size="large" color="inherit" variant="contained" onClick={() => router.back()}>Cancelar</Button>
                    </Grid>
                    <Grid item xs={12} sm={6} style={{ width: '100%', marginTop: '10px' }}>

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
            <ModalConfirm
                openmodal={openmodal}
                setOpenmodal={setOpenmodal}
                titulo="Elija un icono"
                children={
                    // <IconList
                    //     icons={CategoryIconsList}
                    //     width="300px"
                    //     height="auto"
                    //     separation="4px"
                    //     onSelectIcon={onSelectIcon}
                    // >
                    //     <CategoryIcon iconName={icon} />
                    // </IconList>
                        <div style={styles.container}>
                        {CategoryIconsList.map((iconCategory:any, index:any) => (
                          <Button key={index} style={styles.icon} onClick={() => onSelectIcon(iconCategory)}>
                            {/* <Iconify icon={icon} /> */}
                            <CategoryIcon iconName={iconCategory} styles={{ color: '#343434FF'}} />
                          </Button>
                        ))}
                      </div>
                }
                buttonPrimaryAction={() => setOpenmodal(false)}
                buttonSecondaryAction={() => setOpenmodal(false)}
                loading={false}
                buttonSecondaryText="Cancelar"
                buttonPrimaryText="Aceptar"
                buttonSecondaryShow={false}
                buttonPrimaryShow={false}
            />
        </Form >
    )
}

export default CategoryCreateEditForm;